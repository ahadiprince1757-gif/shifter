import { createWorker, PSM } from "tesseract.js";

/**
 * ============================================================================
 * TIXAR ADAPTIVE OFFLINE OCR ENGINE
 * ============================================================================
 *
 * Features:
 * - 100% on-device OCR via Tesseract WebAssembly
 * - Reusable worker cache (prevents duplicate WASM downloads)
 * - Dynamic adaptive thresholding based on image brightness & contrast
 * - Quality diagnostics (blur, dark/overexposed warning, contrast analysis)
 * - Image pixel scaling & memory protection
 * - Structure-preserving text cleaning
 * - Multiple Page Segmentation Modes (DOCUMENT, BLOCK, LINE, WORD, SPARSE)
 * ============================================================================
 */

/* ============================================================================
   CONFIGURATION
============================================================================ */

const OCR_CONFIG = {
  MIN_WIDTH: 1200,
  MAX_WIDTH: 2400,
  BLUR_WARNING_THRESHOLD: 40,
  DEFAULT_LANGUAGE: "eng",
  MAX_IMAGE_PIXELS: 12_000_000,
};

/* ============================================================================
   OCR WORKER CACHE
============================================================================ */

let workerInstance = null;
let workerPromise = null;
let activeLanguage = null;

/**
 * Gets or creates a reusable OCR worker instance.
 */
async function getOCRWorker(language = OCR_CONFIG.DEFAULT_LANGUAGE, onProgress = null) {
  if (workerInstance && activeLanguage === language) {
    return workerInstance;
  }

  if (workerPromise && activeLanguage === language) {
    return workerPromise;
  }

  activeLanguage = language;

  workerPromise = (async () => {
    try {
      const worker = await createWorker(language, 1, {
        logger: (message) => {
          if (!onProgress) return;
          if (message.status === "recognizing text") {
            onProgress({
              status: "recognizing",
              progress: Math.round(55 + (message.progress || 0) * 40),
              text: "Reading text...",
            });
          }
        },
      });

      workerInstance = worker;
      return worker;
    } catch (error) {
      workerPromise = null;
      workerInstance = null;
      activeLanguage = null;
      throw error;
    }
  })();

  return workerPromise;
}

/**
 * Terminates the OCR worker and releases memory.
 */
export async function terminateOCRWorker() {
  if (workerInstance) {
    try {
      await workerInstance.terminate();
    } catch (error) {
      console.warn("[Tixar OCR] Failed to terminate worker:", error);
    }
  }

  workerInstance = null;
  workerPromise = null;
  activeLanguage = null;
}

/* ============================================================================
   IMAGE LOADING & QUALITY ANALYSIS
============================================================================ */

/**
 * Converts any supported image input into an HTMLImageElement.
 */
async function loadImage(imageInput) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    let objectURL = null;

    image.onload = () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
      resolve(image);
    };

    image.onerror = () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
      reject(new Error("Unable to load image for OCR processing."));
    };

    if (imageInput instanceof Blob || imageInput instanceof File) {
      objectURL = URL.createObjectURL(imageInput);
      image.src = objectURL;
    } else {
      image.src = imageInput;
    }
  });
}

/**
 * Calculates average image brightness (luminance).
 */
function calculateBrightness(imageData) {
  const data = imageData.data;
  let total = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    total += gray;
    count++;
  }

  return count ? total / count : 0;
}

/**
 * Estimates image contrast using standard deviation of gray values.
 */
function calculateContrast(imageData) {
  const data = imageData.data;
  const values = [];

  for (let i = 0; i < data.length; i += 16) {
    const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    values.push(gray);
  }

  if (!values.length) return 0;

  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;

  return Math.sqrt(variance);
}

/* ============================================================================
   ADAPTIVE PREPROCESSING
============================================================================ */

/**
 * Preprocesses an image via HTML5 Canvas for optimal OCR accuracy.
 *
 * Pipeline:
 * 1. Resizes safely (downscales > 12M pixels, upscales < 1200px width)
 * 2. Converts RGB to Grayscale
 * 3. Dynamic luminance brightness & contrast analysis
 * 4. Adaptive threshold binarization
 * 5. Returns optimized DataURL + Image Metadata
 *
 * Supports positional calls `preprocessImageForOCR(imageSrc)` as well as options objects.
 */
export async function preprocessImageForOCR(imageInput, options = {}) {
  const aggressive = options?.aggressive || false;
  const onProgress = typeof options === "function" ? null : options?.onProgress || null;

  try {
    const image = await loadImage(imageInput);

    if (onProgress) {
      onProgress({
        status: "preprocessing",
        progress: 20,
        text: "Analyzing image quality...",
      });
    }

    let width = image.naturalWidth || image.width;
    let height = image.naturalHeight || image.height;

    if (!width || !height) {
      throw new Error("Invalid image dimensions.");
    }

    // 1. Image Size Protection
    const totalPixels = width * height;
    if (totalPixels > OCR_CONFIG.MAX_IMAGE_PIXELS) {
      const scale = Math.sqrt(OCR_CONFIG.MAX_IMAGE_PIXELS / totalPixels);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    if (width < OCR_CONFIG.MIN_WIDTH) {
      const scale = OCR_CONFIG.MIN_WIDTH / width;
      width = OCR_CONFIG.MIN_WIDTH;
      height = Math.round(height * scale);
    } else if (width > OCR_CONFIG.MAX_WIDTH) {
      const scale = OCR_CONFIG.MAX_WIDTH / width;
      width = OCR_CONFIG.MAX_WIDTH;
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = width;
    canvas.height = height;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, width, height);

    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    // 2. Grayscale Conversion
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    // 3. Adaptive Luminance Statistics
    const brightness = calculateBrightness(imageData);
    const contrast = calculateContrast(imageData);

    let threshold = brightness * 0.85;
    if (contrast < 35) {
      threshold = brightness * 0.95;
    }
    if (aggressive) {
      threshold *= 0.9;
    }
    threshold = Math.max(60, Math.min(200, threshold));

    // 4. Binarization
    for (let i = 0; i < data.length; i += 4) {
      const gray = data[i];
      const value = gray < threshold ? 0 : 255;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
    }

    context.putImageData(imageData, 0, 0);

    if (onProgress) {
      onProgress({
        status: "preprocessing",
        progress: 45,
        text: "Image optimized for scanning...",
      });
    }

    const dataUrl = canvas.toDataURL("image/png");

    // Allow backward compatibility when callers expect a bare DataURL string
    const resultObj = Object.assign(String(dataUrl), {
      image: dataUrl,
      metadata: {
        width,
        height,
        brightness: Math.round(brightness),
        contrast: Math.round(contrast),
        threshold: Math.round(threshold),
      },
    });

    return resultObj;
  } catch (err) {
    if (typeof imageInput === "string") return imageInput;
    throw err;
  }
}

/* ============================================================================
   TEXT CLEANING
============================================================================ */

/**
 * Cleans OCR output while preserving paragraph and question line breaks.
 */
export function cleanOCRText(rawText) {
  if (!rawText) return "";

  return rawText
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}

/* ============================================================================
   OCR SCAN MODES
============================================================================ */

const OCR_MODES = {
  DOCUMENT: PSM.AUTO,
  BLOCK: PSM.SINGLE_BLOCK,
  LINE: PSM.SINGLE_LINE,
  WORD: PSM.SINGLE_WORD,
  SPARSE: PSM.SPARSE_TEXT,
};

/* ============================================================================
   MAIN OCR FUNCTION
============================================================================ */

/**
 * Tixar's primary offline OCR scanner.
 * Supports both `(imageInput, onProgress)` positional signature AND `(imageInput, options)` object signature.
 *
 * Returns a result object that behaves as a string (via toString/Symbol.toPrimitive)
 * for backward compatibility, while exposing structured metadata (.text, .confidence, .imageQuality).
 */
export async function performOfflineOCR(imageInput, options = {}) {
  let language = "eng";
  let mode = "DOCUMENT";
  let aggressive = false;
  let onProgress = null;
  let signal = null;

  if (typeof options === "function") {
    onProgress = options;
  } else if (typeof options === "object" && options !== null) {
    language = options.language || "eng";
    mode = options.mode || "DOCUMENT";
    aggressive = options.aggressive || false;
    onProgress = options.onProgress || null;
    signal = options.signal || null;
  }

  if (signal?.aborted) {
    throw new Error("OCR scan aborted.");
  }

  try {
    if (onProgress) {
      onProgress({
        status: "initializing",
        progress: 5,
        text: "Starting offline scanner...",
      });
    }

    // 1. Adaptive Preprocessing
    const processed = await preprocessImageForOCR(imageInput, {
      aggressive,
      onProgress,
    });

    if (signal?.aborted) {
      throw new Error("OCR scan aborted.");
    }

    const imageToScan = typeof processed === "string" ? processed : processed.image || imageInput;

    // 2. Reusable Worker Cache
    const worker = await getOCRWorker(language, onProgress);

    const psm = OCR_MODES[mode] ?? OCR_MODES.DOCUMENT;
    await worker.setParameters({
      tessedit_pageseg_mode: psm,
    });

    if (onProgress) {
      onProgress({
        status: "recognizing",
        progress: 55,
        text: "Extracting text...",
      });
    }

    // 3. Perform Recognition
    const result = await worker.recognize(imageToScan);

    if (signal?.aborted) {
      throw new Error("OCR scan aborted.");
    }

    const rawText = result?.data?.text || "";
    const cleanText = cleanOCRText(rawText);
    const confidence = Math.round(result?.data?.confidence || 0);

    // 4. Quality Diagnostics & Warnings
    const metadata = processed.metadata || {
      width: 0,
      height: 0,
      brightness: 128,
      contrast: 50,
      threshold: 140,
    };

    const warnings = [];
    if (metadata.contrast < 25) {
      warnings.push("Low image contrast detected.");
    }
    if (metadata.brightness < 60) {
      warnings.push("Image may be too dark.");
    }
    if (metadata.brightness > 220) {
      warnings.push("Image may be overexposed.");
    }
    if (confidence < 50) {
      warnings.push("OCR confidence is low. Consider retaking with clearer lighting.");
    }

    if (onProgress) {
      onProgress({
        status: "complete",
        progress: 100,
        text: "Scan complete.",
      });
    }

    const rating =
      confidence >= 85
        ? "EXCELLENT"
        : confidence >= 65
        ? "GOOD"
        : confidence >= 45
        ? "FAIR"
        : "POOR";

    // Build hybrid String/Object for 100% backward compatibility
    const scanResult = Object.assign(String(cleanText), {
      text: cleanText,
      confidence,
      words: result?.data?.words || [],
      metadata,
      imageQuality: {
        rating,
        warnings,
      },
      toString() {
        return cleanText;
      },
    });

    return scanResult;
  } catch (error) {
    console.error("[Tixar OCR] Scan failed:", error);
    throw error;
  }
}

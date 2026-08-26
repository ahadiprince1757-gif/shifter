import { createWorker } from "tesseract.js";

/**
 * Preprocesses an image via HTML5 Canvas for optimal OCR accuracy:
 * 1. Grayscale conversion
 * 2. Contrast & brightness amplification
 * 3. Threshold binarization (sharpens dark text on light background)
 */
export function preprocessImageForOCR(imageSrc) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Scale image if it's extremely small to improve OCR recognition
        let width = img.width;
        let height = img.height;
        if (width < 600) {
          const scale = 600 / width;
          width = 600;
          height = Math.round(height * scale);
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Contrast adjustment factor (1.4 = 40% boost)
        const contrast = 1.4;
        const factor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));

        for (let i = 0; i < data.length; i += 4) {
          // 1. Grayscale (Luminance weights)
          const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];

          // 2. Contrast enhancement
          let color = factor * (gray - 128) + 128;
          color = Math.min(255, Math.max(0, color));

          // 3. Adaptive threshold binarization (sharp black/white for text)
          const binarized = color < 140 ? 0 : 255;

          data[i] = binarized;     // Red
          data[i + 1] = binarized; // Green
          data[i + 2] = binarized; // Blue
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch (err) {
        // Fallback to original image if canvas manipulation fails
        resolve(imageSrc);
      }
    };

    img.onerror = (err) => reject(err);
    img.src = imageSrc;
  });
}

/**
 * Runs 100% on-device WebAssembly Tesseract OCR on an image.
 * @param {string|Blob|File} imageInput Image URL, DataURL, or File
 * @param {function} onProgress Callback receiving progress status (0 - 100)
 * @returns {Promise<string>} Clean extracted text string
 */
export async function performOfflineOCR(imageInput, onProgress) {
  let worker = null;
  try {
    if (onProgress) onProgress({ status: "initializing", progress: 5, text: "Initializing OCR engine..." });

    // Create Tesseract.js Wasm worker
    worker = await createWorker("eng");

    if (onProgress) onProgress({ status: "preprocessing", progress: 25, text: "Enhancing image contrast..." });

    // Preprocess image if passed as DataURL or Image element
    let finalImage = imageInput;
    if (typeof imageInput === "string") {
      finalImage = await preprocessImageForOCR(imageInput);
    }

    if (onProgress) onProgress({ status: "recognizing", progress: 55, text: "Extracting text from image..." });

    // Recognize text
    const ret = await worker.recognize(finalImage);

    if (onProgress) onProgress({ status: "complete", progress: 100, text: "Extraction complete" });

    await worker.terminate();
    worker = null;

    // Clean up extracted text (remove excessive trailing empty lines)
    const rawText = ret?.data?.text || "";
    return rawText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n");
  } catch (err) {
    if (worker) {
      try { await worker.terminate(); } catch (_) {}
    }
    throw err;
  }
}

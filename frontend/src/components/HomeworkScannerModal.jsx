import { useState, useRef, useEffect } from "react";
import { performOfflineOCR, preprocessImageForOCR } from "../services/ocrScanner";

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" opacity="0.6" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

export default function HomeworkScannerModal({ isOpen, onClose, onInsertText, onSubmitPrompt }) {
  const [activeTab, setActiveTab] = useState("camera"); // 'camera' | 'upload'
  const [imagePreview, setImagePreview] = useState(null);
  const [preprocessedPreview, setPreprocessedPreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progressInfo, setProgressInfo] = useState({ status: "", progress: 0, text: "" });
  const [extractedText, setExtractedText] = useState("");
  const [cameraError, setCameraError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Start/Stop Camera WebRTC stream
  useEffect(() => {
    if (isOpen && activeTab === "camera" && !imagePreview) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, activeTab, imagePreview]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.warn("Camera access warning:", err);
      setCameraError("Camera unavailable or permission denied. Please upload an image file instead.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleCapturePhoto = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    setImagePreview(dataUrl);
    stopCamera();

    // Automatically trigger OCR scan on captured photo
    processImageForOCR(dataUrl);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setImagePreview(dataUrl);
      processImageForOCR(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setImagePreview(dataUrl);
      processImageForOCR(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const processImageForOCR = async (dataUrl) => {
    setIsScanning(true);
    setExtractedText("");
    try {
      // 1. Enhanced Canvas preprocessing
      const enhanced = await preprocessImageForOCR(dataUrl);
      setPreprocessedPreview(enhanced);

      // 2. Local Tesseract.js Wasm OCR
      const text = await performOfflineOCR(enhanced, (progress) => {
        setProgressInfo(progress);
      });

      setExtractedText(text);
    } catch (err) {
      console.error("OCR scan error:", err);
      setExtractedText("Unable to extract text automatically. You can type or edit your question manually below.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    setPreprocessedPreview(null);
    setExtractedText("");
    setIsScanning(false);
    if (activeTab === "camera") {
      startCamera();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="scanner-modal-backdrop" onClick={onClose}>
      <div className="scanner-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="scanner-modal-header">
          <div className="scanner-modal-title">
            <SparklesIcon />
            <span>Offline Homework & Diagram Scanner</span>
          </div>
          <button type="button" className="scanner-modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* Tab Selection */}
        {!imagePreview && (
          <div className="scanner-tab-bar">
            <button
              type="button"
              className={`scanner-tab-btn ${activeTab === "camera" ? "active" : ""}`}
              onClick={() => setActiveTab("camera")}
            >
              <CameraIcon />
              <span>Camera Snap</span>
            </button>
            <button
              type="button"
              className={`scanner-tab-btn ${activeTab === "upload" ? "active" : ""}`}
              onClick={() => setActiveTab("upload")}
            >
              <UploadIcon />
              <span>Upload File</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="scanner-modal-body">
          {/* Tab 1: Live WebRTC Camera Viewfinder */}
          {!imagePreview && activeTab === "camera" && (
            <div className="scanner-camera-wrapper">
              {cameraError ? (
                <div className="scanner-camera-error">
                  <p>{cameraError}</p>
                  <button
                    type="button"
                    className="scanner-btn-secondary"
                    onClick={() => setActiveTab("upload")}
                  >
                    Switch to File Upload
                  </button>
                </div>
              ) : (
                <div className="scanner-viewfinder-container">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="scanner-viewfinder-video"
                  />
                  <div className="scanner-viewfinder-grid" />
                  <button
                    type="button"
                    className="scanner-snap-btn"
                    onClick={handleCapturePhoto}
                    disabled={!isCameraActive}
                    title="Take photo of homework"
                  >
                    <div className="scanner-snap-inner" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: File Drag and Drop Upload */}
          {!imagePreview && activeTab === "upload" && (
            <div
              className="scanner-dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <UploadIcon />
              <p className="scanner-dropzone-text">
                Drag and drop your homework photo or click to browse
              </p>
              <span className="scanner-dropzone-sub">Supports PNG, JPG, WEBP (Processed 100% on-device)</span>
            </div>
          )}

          {/* Image & Scan Results View */}
          {imagePreview && (
            <div className="scanner-results-container">
              <div className="scanner-preview-row">
                <div className="scanner-preview-card">
                  <span className="scanner-preview-label">Captured Photo</span>
                  <img src={imagePreview} alt="Captured homework" className="scanner-preview-img" />
                </div>
                {preprocessedPreview && (
                  <div className="scanner-preview-card">
                    <span className="scanner-preview-label">Enhanced Canvas OCR Layer</span>
                    <img src={preprocessedPreview} alt="Preprocessed OCR" className="scanner-preview-img" />
                  </div>
                )}
              </div>

              {/* Progress Indicator */}
              {isScanning && (
                <div className="scanner-progress-box">
                  <div className="scanner-progress-bar-bg">
                    <div
                      className="scanner-progress-bar-fill"
                      style={{ width: `${progressInfo.progress || 10}%` }}
                    />
                  </div>
                  <span className="scanner-progress-text">{progressInfo.text || "Scanning text with local WebAssembly..."}</span>
                </div>
              )}

              {/* Scanned Text Preview Textarea */}
              {!isScanning && (
                <div className="scanner-text-box">
                  <label className="scanner-text-label">
                    <span>Extracted Problem Text (Editable):</span>
                    <button type="button" className="scanner-reset-btn" onClick={handleReset}>
                      Snap / Upload Another
                    </button>
                  </label>
                  <textarea
                    className="scanner-textarea"
                    rows={4}
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                    placeholder="Extracted text will appear here. You can edit or refine it before submitting to Socrates Tutor..."
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        {imagePreview && !isScanning && extractedText && (
          <div className="scanner-modal-footer">
            <button
              type="button"
              className="scanner-btn-secondary"
              onClick={() => {
                onInsertText(extractedText);
                onClose();
              }}
            >
              Pre-fill Chat Input
            </button>
            <button
              type="button"
              className="scanner-btn-primary"
              onClick={() => {
                onSubmitPrompt(extractedText);
                onClose();
              }}
            >
              Ask Socrates Tutor →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

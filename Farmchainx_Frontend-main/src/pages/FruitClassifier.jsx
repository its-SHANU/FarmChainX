import React, { useState, useEffect } from "react";
import "../styles/components/fruitClassifierModal.css";

export default function FruitClassifier({ onClose }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (!onClose) return;
    setIsClosing(true);
    setTimeout(onClose, 250);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleClassify = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    const res = await fetch("https://saicode18-fruit-classifier.hf.space/api/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div
      className={`fc-modal-overlay ${isClosing ? "fc-closing" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={`fc-modal-card ${isClosing ? "fc-closing" : ""}`}>
        <button className="fc-close-btn" onClick={handleClose} aria-label="Close">
          ×
        </button>

        <h2 className="fc-title">🍎 Fruit Classifier</h2>
        <p className="fc-subtitle">Upload an image to classify the fruit.</p>

        <div className="fc-upload-box">
          <input type="file" accept="image/*" onChange={handleImage} />
        </div>

        {preview && <img src={preview} alt="preview" className="fc-preview-image" />}

        <button className="fc-classify-btn" onClick={handleClassify} disabled={!image || loading}>
          {loading ? "Classifying..." : "Classify"}
        </button>

        {result && (
          <>
            <div className="fc-prediction-header">
              <h3 className="fc-prediction-title">
                {result.prediction} — {result.confidence_score}
                <span className="fc-model-version">(model: {result.model_version})</span>
              </h3>
            </div>

            <div className="fc-result-box">
              <h3>📊 Prediction Result</h3>
              <pre className="fc-pre">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

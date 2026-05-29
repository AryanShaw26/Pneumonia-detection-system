import { useState } from "react";
import Upload from "./Upload";
import Result from "./Result";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (image) => {
    if (!image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🩺 Pneumonia Detection System</h1>

      <p className="subtitle">
        Upload a Chest X-Ray image and let the VGG19 model
        detect whether pneumonia is present.
      </p>

      <Upload onPredict={handlePredict} />

      {loading && (
        <p className="loading">
          Analyzing X-Ray...
        </p>
      )}

      <Result result={result} />
    </div>
  );
}

export default App;
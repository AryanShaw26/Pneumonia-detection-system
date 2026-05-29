import { jsPDF } from "jspdf";

function Result({ result }) {
  if (!result) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Pneumonia Detection Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Prediction: ${result.prediction}`, 20, 50);
    doc.text(`Confidence: ${result.confidence}%`, 20, 65);
    doc.text(
      `Generated On: ${new Date().toLocaleString()}`,
      20,
      80
    );

    doc.text("Model Used: VGG19", 20, 95);

    doc.save("Pneumonia_Report.pdf");
  };

  return (
    <div className="result-card">
      <h2>Prediction Result</h2>

      <div
        className={
          result.prediction === "Pneumonia"
            ? "pneumonia"
            : "normal"
        }
      >
        {result.prediction}
      </div>

      <p className="confidence">
        Confidence: {result.confidence}%
      </p>

      <button onClick={downloadPDF}>
        Download Report PDF
      </button>
    </div>
  );
}

export default Result;
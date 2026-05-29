import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function Result({ result, uploadedImage }) {
  if (!result) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(
      "PNEUMONIA DETECTION REPORT",
      20,
      20
    );

    if (uploadedImage) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imgData = e.target.result;

        doc.addImage(
          imgData,
          "JPEG",
          55,
          30,
          100,
          100
        );

        autoTable(doc, {
          startY: 140,
          head: [["Parameter", "Value"]],
          body: [
            ["Prediction", result.prediction],
            [
              "Confidence",
              `${result.confidence}%`,
            ],
            ["Model Used", "VGG19"],
            [
              "Generated On",
              new Date().toLocaleString(),
            ],
          ],
        });

        const finalY =
          doc.lastAutoTable.finalY + 20;

        doc.text(
          "Remarks:",
          14,
          finalY
        );

        doc.text(
          "The uploaded chest X-ray was analyzed",
          14,
          finalY + 10
        );

        doc.text(
          "using a VGG19 deep learning model.",
          14,
          finalY + 18
        );

        doc.line(
          130,
          finalY + 40,
          190,
          finalY + 40
        );

        doc.text(
          "AI Diagnostic System",
          138,
          finalY + 50
        );

        doc.save(
          "Pneumonia_Detection_Report.pdf"
        );
      };

      reader.readAsDataURL(uploadedImage);
    }
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
        Download PDF Report
      </button>
    </div>
  );
}

export default Result;
import { useState } from "react";

function Upload({ onPredict }) {
  const [image, setImage] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
    onPredict(null);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          width="300"
        />
      )}

      <button onClick={() => onPredict(image)}>
        Detect Pneumonia
      </button>
    </div>
  );
}

export default Upload;
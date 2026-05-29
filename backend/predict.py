import tensorflow as tf
import numpy as np
from PIL import Image

# Load model
model = tf.keras.models.load_model("vgg19_model_02.h5")

def predict_image(image_path):

    # Open image
    img = Image.open(image_path).convert("RGB")

    # Same size used during training
    img = img.resize((128, 128))

    # Normalize
    img_array = np.array(img) / 255.0

    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)

    # Predict
    prediction = model.predict(img_array, verbose=0)

    predicted_class = np.argmax(prediction[0])

    confidence = float(np.max(prediction[0])) * 100

    # IMPORTANT:
    # Assuming:
    # NORMAL = 0
    # PNEUMONIA = 1

    if predicted_class == 1:
        label = "Pneumonia"
    else:
        label = "Normal"

    return {
        "prediction": label,
        "confidence": round(confidence, 2)
    }
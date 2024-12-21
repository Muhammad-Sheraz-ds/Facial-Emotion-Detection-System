from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.applications import ResNet50V2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dropout, BatchNormalization, Flatten, Dense
import numpy as np
import cv2

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
def create_model():
    base_model = ResNet50V2(include_top=False, weights=None, input_shape=(224, 224, 3))
    model = Sequential([
        base_model,
        Dropout(0.25),
        BatchNormalization(),
        Flatten(),
        Dense(64, activation='relu'),
        BatchNormalization(),
        Dropout(0.5),
        Dense(7, activation='softmax')  # Adjust for 7 emotion classes
    ])
    return model

model = create_model()
weights_path = "./backend/weights/model_weights.weights.h5"
model.load_weights(weights_path)

# Emotion labels
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

@app.post("/predict-image/")
async def predict_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Preprocess the image
        image = cv2.resize(image, (224, 224))
        image = image.astype("float32") / 255.0
        image = np.expand_dims(image, axis=0)

        # Predict the emotion
        predictions = model.predict(image)[0]
        emotion = emotion_labels[np.argmax(predictions)]

        return JSONResponse(content={"emotion": emotion})
    except Exception as e:
        return JSONResponse(content={"error": str(e)})

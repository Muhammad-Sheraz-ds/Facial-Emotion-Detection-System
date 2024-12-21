import cv2
import numpy as np
from tensorflow.keras.applications import ResNet50V2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dropout, BatchNormalization, Flatten, Dense

# Define the model architecture (same as used during training)
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
        Dense(7, activation='softmax')  # Adjust based on the number of classes
    ])
    return model

# Load the model and weights
model = create_model()
weights_path = "./backend/weights/model_weights.weights.h5"
model.load_weights(weights_path)
print(f"Model loaded with weights from {weights_path}")

# Define emotion labels
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

# Initialize Haar Cascade for face detection
face_cascade_path = "haarcascade_frontalface_default.xml"  # Ensure this file is in the same folder
face_classifier = cv2.CascadeClassifier(face_cascade_path)

# Start video capture
cap = cv2.VideoCapture(0)  # 0 for default webcam; replace with video file path for testing

print("Press 'q' to quit the video feed.")
while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert frame to grayscale for face detection
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        # Draw a rectangle around the detected face
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # Extract the face ROI (Region of Interest)
        face = frame[y:y + h, x:x + w]
        face = cv2.resize(face, (224, 224))
        face = face.astype("float32") / 255.0
        face = np.expand_dims(face, axis=0)

        # Predict the emotion
        predictions = model.predict(face)[0]
        emotion = emotion_labels[np.argmax(predictions)]

        # Display the predicted emotion on the frame
        cv2.putText(frame, emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)

    # Show the video feed with emotion predictions
    cv2.imshow("Real-Time Emotion Detector", frame)

    # Exit the video feed on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture and close OpenCV windows
cap.release()
cv2.destroyAllWindows()

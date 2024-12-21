
# **EmotionAI: Facial Emotion Detection System**

## **Overview**
**Facial Emotion Detection System** is an open-source project designed to identify human emotions from images and real-time video streams using advanced Convolutional Neural Networks (CNNs). The project is modular, containerized using Docker, and made accessible for global use.

---

## **Features**
1. **Backend**: A RESTful API built with **FastAPI** for image-based emotion detection.
2. **Frontend**: A static web interface for uploading images and viewing predictions.
3. **Real-Time Video Detection**: Real-time emotion detection from video streams using **OpenCV**.
4. **Dockerized Deployment**: Pre-built Docker containers for easy local and remote usage.

---

## **Folder Structure**
```plaintext
Emotion-Detection-Using-CNN-and-FER-2013-Dataset/
├── backend/                      # Backend service
│   ├── main.py                   # FastAPI implementation
│   ├── requirements.txt          # Dependencies
│   ├── weights/                  # Pretrained model weights (not in repo)
│   │   └── ResNet50_final_weights.weights.h5
│   └── Dockerfile                # Dockerfile for backend
├── frontend/                     # Frontend service
│   ├── index.html                # Main HTML file
│   ├── app.css                   # Styling
│   ├── app.js                    # Frontend logic
│   └── Dockerfile                # Dockerfile for frontend
├── video_prediction/             # Real-time video prediction
│   ├── video_emotion_detector.py # Video detection script
│   ├── haarcascade_frontalface_default.xml # Haar cascade file
│   ├── requirements.txt          # Dependencies
│   └── Dockerfile                # Dockerfile for video service
├── docker-compose.yml            # Docker Compose configuration
└── README.md                     # Comprehensive documentation
```

---

## **How to Use**

### **Open-Source Docker Containers**
This project is containerized and available as pre-built Docker images for global use. Follow these steps to pull and run the containers:

#### **1. Pull the Docker Images**
Run the following commands:
```bash
docker pull your-dockerhub-username/emotion-detection-backend
docker pull your-dockerhub-username/emotion-detection-frontend
docker pull your-dockerhub-username/emotion-detection-video
```

#### **2. Run the Containers**

1. **Backend**:
   ```bash
   docker run -d -p 8000:8000 your-dockerhub-username/emotion-detection-backend
   ```
   - Accessible at: [http://localhost:8000/docs](http://localhost:8000/docs)

2. **Frontend**:
   ```bash
   docker run -d -p 3000:3000 your-dockerhub-username/emotion-detection-frontend
   ```
   - Accessible at: [http://localhost:3000](http://localhost:3000)

3. **Video Prediction**:
   ```bash
   docker run -it --rm your-dockerhub-username/emotion-detection-video
   ```

---

### **Local Setup (Without Docker)**

#### **1. Clone the Repository**
```bash
git clone git@github.com:Muhammad-Sheraz-ds/Emotion-Detection-Using-CNN-and-FER-2013-Dataset.git
cd Emotion-Detection-Using-CNN-and-FER-2013-Dataset
```

#### **2. Install Dependencies**

**Backend**:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

**Frontend**:
No installation required. Open `frontend/index.html` in your browser.

**Video Prediction**:
```bash
cd video_prediction
pip install -r requirements.txt
cd ..
```

#### **3. Run the Application**
1. **Start Backend**:
   ```bash
   cd backend
   uvicorn main:app --reload
   cd ..
   ```

2. **Run Video Prediction**:
   ```bash
   cd video_prediction
   python video_emotion_detector.py
   ```

3. Open the frontend `index.html` in your browser.

---

## **Accessing the Model**

### **Backend API**
The backend is deployed as a RESTful API and can be accessed via Swagger UI:
- [http://localhost:8000/docs](http://localhost:8000/docs)

#### **Endpoint: `/predict-image/`**
- **Method**: POST
- **Description**: Predict emotion from an uploaded image.
- **Input**: An image file (`multipart/form-data`).
- **Output**: JSON response with the detected emotion.

Example cURL Command:
```bash
curl -X POST "http://localhost:8000/predict-image/" \
-H "accept: application/json" \
-H "Content-Type: multipart/form-data" \
-F "file=@path/to/image.jpg"
```

**Response**:
```json
{
  "emotion": "Happy"
}
```

### **Frontend**
- Open the frontend in your browser ([http://localhost:3000](http://localhost:3000)).
- Upload an image and view the predicted emotion.

### **Real-Time Video Prediction**
Run the video prediction container:
```bash
docker-compose up video_prediction
```

---

## **Model Weights**
The pretrained model weights are **not included** in the repository due to size limitations. To use this project:
1. Download the weights from the provided [Google Drive link](#).
2. Place the downloaded `ResNet50_final_weights.weights.h5` file in the `backend/weights/` directory.

```plaintext
Emotion-Detection-Using-CNN-and-FER-2013-Dataset/
├── backend/
│   ├── weights/
│   │   └── ResNet50_final_weights.weights.h5
```

---

## **Testing the Application**
1. Use **Swagger UI** to test backend endpoints ([http://localhost:8000/docs](http://localhost:8000/docs)).
2. Verify the frontend by uploading images and viewing predictions.
3. Test real-time video emotion detection by running the video module.

---

## **Future Enhancements**
- Cloud deployment for global accessibility.
- GPU acceleration for real-time video prediction.
- Improved frontend with mobile responsiveness.

---

## **License**
This project is licensed under the MIT License.

---

Let me know if this aligns with your requirements! 😊
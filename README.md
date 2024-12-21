Here is a **comprehensive README.md** for your project, including all necessary setup steps, dependency installation, Docker commands, and usage instructions.

---

# **Emotion Detection Using CNN and FER-2013 Dataset**

## **Overview**
This project detects human emotions from facial images and real-time video using CNNs. It includes:
1. **Backend**: A FastAPI server for image-based emotion detection.
2. **Frontend**: A React web application for user interaction.
3. **Video Prediction**: A real-time video emotion detection script.

---

## **Business Problem**
Emotion detection is a vital component in areas like:
- **Human-Computer Interaction**: Enhancing user experience.
- **Healthcare**: Providing mental health insights.
- **Marketing**: Understanding customer emotions.
- **Security**: Identifying unusual behavior.

---

## **Folder Structure**
```plaintext
Emotion-Detection-Using-CNN-and-FER-2013-Dataset/
├── backend/                      # FastAPI backend
│   ├── main.py                   # API implementation
│   ├── requirements.txt          # Backend dependencies
│   ├── weights/                  # Pretrained model weights
│   │   └── ResNet50_final_weights.weights.h5
│   └── Dockerfile                # Dockerfile for backend
├── frontend/                     # React frontend
│   ├── public/                   # Public assets
│   ├── src/                      # React source files
│   ├── package.json              # Frontend dependencies
│   ├── Dockerfile                # Dockerfile for frontend
│   └── README.md                 # Frontend-specific README
├── video_prediction/             # Video emotion prediction module
│   ├── video_emotion_detector.py # Real-time video emotion detection
│   ├── haarcascade_frontalface_default.xml # Haar cascade file
│   ├── requirements.txt          # Dependencies for video processing
│   ├── Dockerfile                # Dockerfile for video prediction
│   └── README.md                 # Video-specific README
├── docker-compose.yml            # Docker Compose configuration
└── README.md                     # Comprehensive project documentation
```

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/Muhammad-Sheraz-ds/Emotion-Detection-Using-CNN-and-FER-2013-Dataset.git
cd Emotion-Detection-Using-CNN-and-FER-2013-Dataset
```

---

## **Installing Dependencies**
Follow these steps for each module:

### **1. Backend**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Navigate back to the root directory:
   ```bash
   cd ..
   ```

### **2. Frontend**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Navigate back to the root directory:
   ```bash
   cd ..
   ```

### **3. Video Prediction**
1. Navigate to the video prediction directory:
   ```bash
   cd video_prediction
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Navigate back to the root directory:
   ```bash
   cd ..
   ```

---

## **Running the Project**

### **Option 1: Using Docker Compose**
The easiest way to run the project is by using Docker Compose.

1. **Build the Docker Images**:
   ```bash
   docker-compose build
   ```
2. **Start the Containers**:
   ```bash
   docker-compose up
   ```
3. **Access the Application**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:8000/docs](http://localhost:8000/docs)
   - **Video Prediction**: The script will run in its container and process real-time video input.

---

### **Option 2: Running Locally**

#### **1. Start the Backend**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

#### **2. Start the Frontend**
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Start the React development server:
   ```bash
   npm start
   ```

#### **3. Start the Video Prediction**
1. Navigate to the `video_prediction` directory:
   ```bash
   cd video_prediction
   ```
2. Run the video emotion detection script:
   ```bash
   python video_emotion_detector.py
   ```

---

## **Docker Deployment Details**

### **1. Backend Dockerfile**
```dockerfile
# Backend Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### **2. Frontend Dockerfile**
```dockerfile
# Frontend Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
```

### **3. Video Prediction Dockerfile**
```dockerfile
# Video Prediction Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "video_emotion_detector.py"]
```

### **4. Docker Compose File**
```yaml
version: "3.8"

services:
  backend:
    build:
      context: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
      - ./backend/weights:/app/weights

  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app

  video:
    build:
      context: ./video_prediction
    volumes:
      - ./video_prediction:/app
      - ./backend/weights:/app/weights
```

---

## **Testing the Application**

1. Use **Swagger UI** to test the backend: [http://localhost:8000/docs](http://localhost:8000/docs)
2. Use the React UI to upload images and view predictions.
3. Run the video module to detect emotions in real-time.

---

## **Future Enhancements**
- Add batch processing support in the backend.
- Optimize frontend for mobile responsiveness.
- Enable cloud deployment with Docker images.

---

## **License**
This project is licensed under the MIT License.

---

Let me know if you need further modifications! 😊

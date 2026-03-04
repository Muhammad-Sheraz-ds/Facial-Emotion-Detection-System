// Backend API URL (Hugging Face Spaces)
const API_BASE_URL = "https://muhammadsheraza002-facial-emotion-detection-backend.hf.space";

// DOM Elements
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const video = document.getElementById("webcamVideo");
const videoPlaceholder = document.getElementById("videoPlaceholder");
const liveResult = document.getElementById("liveResult");
const liveEmotion = document.getElementById("liveEmotion");
const fpsCounter = document.getElementById("fpsCounter");
const statusDiv = document.getElementById("webcamStatus");

// Emotion emoji map
const emotionEmojis = {
    'Angry': '😠',
    'Disgust': '🤢',
    'Fear': '😨',
    'Happy': '😊',
    'Neutral': '😐',
    'Sad': '😢',
    'Surprise': '😲'
};

// State
let stream = null;
let isRunning = false;
let captureInterval = null;

// Capture canvas for sending frames
const captureCanvas = document.createElement("canvas");
const captureCtx = captureCanvas.getContext("2d");

// Start Camera
startBtn.addEventListener("click", async () => {
    try {
        statusDiv.textContent = "Requesting camera access...";
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: "user"
            }
        });

        video.srcObject = stream;
        video.style.display = "block";
        videoPlaceholder.style.display = "none";

        video.onloadedmetadata = () => {
            captureCanvas.width = video.videoWidth;
            captureCanvas.height = video.videoHeight;
        };

        isRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        liveResult.style.display = "flex";
        statusDiv.textContent = "Camera active — detecting emotions...";

        startDetection();

    } catch (err) {
        console.error("Camera error:", err);
        statusDiv.textContent = "⚠️ Camera access denied.";
    }
});

stopBtn.addEventListener("click", stopCamera);

function stopCamera() {
    isRunning = false;
    if (captureInterval) clearInterval(captureInterval);
    if (stream) stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
    video.style.display = "none";
    videoPlaceholder.style.display = "flex";
    liveResult.style.display = "none";
    startBtn.disabled = false;
    stopBtn.disabled = true;
    statusDiv.textContent = "Camera stopped.";
}

function startDetection() {
    // Prediction frequency: 400ms interval for responsive updates
    const FRAME_INTERVAL_MS = 400;

    captureInterval = setInterval(async () => {
        if (!isRunning) return;

        try {
            captureCtx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
            const blob = await new Promise(resolve => captureCanvas.toBlob(resolve, "image/jpeg", 0.7));

            if (!blob || !isRunning) return;

            const formData = new FormData();
            formData.append("file", blob, "frame.jpg");

            const startTime = performance.now();
            const response = await fetch(`${API_BASE_URL}/predict-image/`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            const latency = Math.round(performance.now() - startTime);

            if (response.ok && isRunning && data.emotion) {
                const emoji = emotionEmojis[data.emotion] || '🎭';
                liveEmotion.textContent = `${emoji} ${data.emotion}`;
                fpsCounter.textContent = `${latency}ms latency`;
            }
        } catch (error) {
            console.error("Prediction error:", error);
        }
    }, FRAME_INTERVAL_MS);
}

window.addEventListener("beforeunload", stopCamera);

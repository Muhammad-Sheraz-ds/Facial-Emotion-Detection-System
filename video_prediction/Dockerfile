# Use a lightweight Python image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the video predictor code
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Command to run the video predictor script
CMD ["python", "video_emotion_detector.py"]

# Use Python as the base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy video prediction files to container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run the video emotion detection script
CMD ["python", "video_emotion_detector.py"]

FROM python:3.9-slim

WORKDIR /app

# Copy video prediction code and weights
COPY . /app

# Upgrade pip and install dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Expose the video prediction service port (optional)
EXPOSE 5000

# Command to run the video prediction script
CMD ["python", "video_emotion_detector.py"]

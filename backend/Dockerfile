FROM muhammadsheraza002/ai_facial_emotion_prediction_system_backend:latest

# HF Spaces requires port 7860
EXPOSE 7860

# Install missing dependencies
RUN pip install --no-cache-dir python-multipart

# Copy local main.py and cascade file
COPY main.py /app/main.py
COPY haarcascade_frontalface_default.xml /app/haarcascade_frontalface_default.xml

# Fix the model weights path - create the expected directory structure
# The original main.py looks for ../backend/weights/model_weights.weights.h5
# from WORKDIR /app, so we need /backend/weights/
RUN mkdir -p /backend/weights && \
    if [ -d /app/weights ]; then \
        WEIGHT_FILE=$(find /app/weights -name "*.h5" | head -n 1); \
        if [ -n "$WEIGHT_FILE" ]; then \
            ln -sf "$WEIGHT_FILE" /backend/weights/model_weights.weights.h5; \
            echo "Linked $WEIGHT_FILE to /backend/weights/model_weights.weights.h5"; \
        fi \
    fi

# Override the default CMD to use HF Spaces required port
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]

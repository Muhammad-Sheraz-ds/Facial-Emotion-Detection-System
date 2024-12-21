# Use Python 3.9 as the base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the application code
COPY . .

# Copy the pre-downloaded dependencies
COPY ./packages /tmp/packages

# Install the dependencies
RUN pip install --no-cache-dir /tmp/packages/*

# Expose the backend port
EXPOSE 8000

# Command to run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

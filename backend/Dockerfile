# Use a lightweight Python image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the backend code
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the backend port
EXPOSE 8000

# Command to run the backend server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

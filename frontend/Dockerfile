FROM node:18-slim

WORKDIR /app

# Copy frontend files
COPY . /app

# Install http-server
RUN npm install -g http-server

# Expose the frontend port
EXPOSE 3000

# Command to serve static files
CMD ["http-server", ".", "-p", "3000"]

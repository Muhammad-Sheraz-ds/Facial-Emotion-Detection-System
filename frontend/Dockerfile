# Use an Nginx base image
FROM nginx:alpine

# Copy frontend files to the Nginx HTML directory
COPY . /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

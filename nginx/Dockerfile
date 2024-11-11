# Use official NGINX image
FROM nginx:latest

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy frontend static files into NGINX's default root
COPY /frontend/build /usr/share/nginx/html

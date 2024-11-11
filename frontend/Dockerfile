# Stage 1: Build the frontend app
FROM node:alpine AS build

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app's source code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Set up NGINX to serve the built app
FROM nginx:alpine

# Copy the built frontend app into the NGINX container
COPY --from=build /frontend/build /usr/share/nginx/html

# Copy the custom NGINX configuration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (default NGINX port)
EXPOSE 80

# Start NGINX when the container runs
CMD ["nginx", "-g", "daemon off;"]


# docker build -t mern_frontend:latest .    

# docker run -d -p 5173:5173 --env-file .env --network mern_network -v mern_volume:/app/data --name mern_frontend_app mern_frontend:latest

# docker run -d -p 5173:5173 --network mern_network -v mern_volume:/app/data --name mern_frontend_app mern_frontend:latest

# docker run -d -p 5173:5173 --env-file .env --network mern_network -v "./testing_m_pro/frontend:/app" --name mern_frontend_app mern_frontend:latest

# docker run -d -p 5173:5173 --network mern_network -v "D:/study/major minar project/testing_m_pro/frontend:/app" --name mern_frontend_app mern_frontend:latest
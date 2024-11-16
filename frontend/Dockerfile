# ------------------- Stage 1: Build Stage ------------------------------#
FROM node:21 AS frontend-builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# ------------------- Stage 2: Final Stage ------------------------------#
FROM node:21-slim AS final

WORKDIR /app

COPY --from=frontend-builder /app .

EXPOSE 5173

CMD ["npm", "run", "dev"]

# docker build -t mern-frontend:latest .
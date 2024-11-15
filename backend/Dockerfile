# devlopment image
FROM node:20.18.0 AS devlopment

WORKDIR /app 

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

# production image 
FROM node:alpine AS production 

WORKDIR /app

COPY --from=devlopment /app/package*.json ./

COPY --from=devlopment /app/dist ./dist

RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]

# docker build -t mern_backend:latest .

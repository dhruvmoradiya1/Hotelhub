FROM node:20.18.0 AS build

WORKDIR /app 

COPY package*.json .

COPY .env .env

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# docker build -t mern_backend:latest .

# docker run -d -p 3000:3000 --env-file .env --network mern_network -v mern_volume:/app/data --name mern_backend_app mern_backend:latest

# docker run -d -p 3000:3000 --network mern_network -v mern_volume:/app/data --name mern_backend_app mern_backend:latest

# docker run -d -p 3000:3000 --env-file .env --network mern_network -v "./testing_m_pro/backend:/app" --name mern_backend_app mern_backend:latest   

# docker run -d -p 3000:3000 --network mern_network -v "D:/study/major minar project/testing_m_pro/backend:/app" --name mern_backend_app mern_backend:latest
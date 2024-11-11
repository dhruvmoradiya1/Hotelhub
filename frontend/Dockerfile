FROM node:alpine AS build

WORKDIR /app 

COPY package*.json .

COPY .env .env

RUN npm ci 

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"] 

# docker build -t mern_frontend:latest .    

# docker run -d -p 5173:5173 --env-file .env --network mern_network -v mern_volume:/app/data --name mern_frontend_app mern_frontend:latest

# docker run -d -p 5173:5173 --network mern_network -v mern_volume:/app/data --name mern_frontend_app mern_frontend:latest

# docker run -d -p 5173:5173 --env-file .env --network mern_network -v "./testing_m_pro/frontend:/app" --name mern_frontend_app mern_frontend:latest

# docker run -d -p 5173:5173 --network mern_network -v "D:/study/major minar project/testing_m_pro/frontend:/app" --name mern_frontend_app mern_frontend:latest
# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build the backend (and shared)
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]

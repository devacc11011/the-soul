# 1단계: 빌드 단계
FROM node:lts-alpine AS build-stage
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]

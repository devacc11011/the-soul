# 1단계: 빌드 단계
FROM node:lts-alpine AS build-stage
WORKDIR /app

RUN npm install

RUN npm run build
RUN npm run start

EXPOSE 3000
CMD ["npm", "run", "start"]

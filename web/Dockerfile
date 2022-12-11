FROM node:16-alpine

WORKDIR /app

COPY . .

WORKDIR /app/web

RUN npm i --registry=http://registry.npmmirror.com

RUN npm run build

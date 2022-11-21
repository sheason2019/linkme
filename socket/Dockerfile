FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm i --registry=http://registry.npmmirror.com

RUN npm run build

CMD [ "node", "dist/main.js", "-product" ]
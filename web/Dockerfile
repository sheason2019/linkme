FROM node:16-alpine

WORKDIR /app

COPY . .

WORKDIR /app/web

RUN rm -rf node_modules

RUN npm i --registry=http://registry.npmmirror.com

CMD [ "npm", "run", "build" ]

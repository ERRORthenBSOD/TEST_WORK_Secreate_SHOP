FROM node:12.2.0-alpine as build

WORKDIR /app

COPY package*.json ./

RUN yarn install --silent

COPY . /app

EXPOSE 9006

CMD [ "node", "server.js" ]
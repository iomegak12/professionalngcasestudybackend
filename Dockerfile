FROM node:latest

COPY . /app

WORKDIR /app

RUN npm install --save-dev

EXPOSE 8080

ENTRYPOINT node .
FROM node:latest

WORKDIR /usr/src/front
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .

CMD yarn start

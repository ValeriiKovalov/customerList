FROM node:latest

WORKDIR /usr/src/server
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .

RUN yarn build

CMD [ "node", "dist/main.js" ]

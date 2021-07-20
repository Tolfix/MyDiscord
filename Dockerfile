FROM node:14-alpine

LABEL author="Tolfix" maintainer="support@tolfix.com"

RUN apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y

RUN npm install -g @types/node \
    && npm install -g typescript

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . ./

RUN tsc -b

ENV TOKEN ""

EXPOSE 8080

CMD [ "node", "./build/Server.js" ]
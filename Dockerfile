FROM node

COPY package.json /home/app/package.json

WORKDIR /home/app

RUN yarn install

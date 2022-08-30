FROM node:16.15.0-stretch-slim

WORKDIR /app

COPY . /app

RUN yarn install \
  && yarn build

CMD [ "yarn", "start"]
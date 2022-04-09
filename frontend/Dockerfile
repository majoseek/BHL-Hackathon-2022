FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

COPY ./package.json ./package.json

COPY ./package-lock.json ./package-lock.json

RUN yarn install
COPY ./src ./src
COPY ./public ./public
COPY ./yarn.lock ./yarn.lock
COPY ./tsconfig.json ./tsconfig.json

EXPOSE 3030
CMD [ "npm", "start" ]

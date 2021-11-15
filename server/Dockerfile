FROM node:14-alpine

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

# install dependencies
RUN yarn --frozen-lockfile

COPY . .

# lint & test
RUN yarn lint & yarn test

EXPOSE 4202

CMD ["yarn", "start:dev"]
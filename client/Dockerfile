FROM node:14-alpine

WORKDIR /app
COPY package.json yarn.lock ./

# install dependencies
RUN yarn --frozen-lockfile --silent

COPY . .

EXPOSE 4201

CMD ["yarn", "start"]
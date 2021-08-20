FROM node:14.16.0

WORKDIR /usr/src/app

ENV NODE_ENV development

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --silent

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY ./src/ ./src/

CMD ["yarn", "start:dev"]
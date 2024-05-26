FROM node:20.12.2-alpine AS base
WORKDIR /srv/app

FROM base AS development
ENV NODE_ENV=development
RUN apk update && apk add python3 make
RUN yarn global add @nestjs/cli
CMD yarn && yarn start:dev
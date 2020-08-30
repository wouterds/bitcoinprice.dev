FROM node:14-alpine AS builder
WORKDIR /code

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./dist ./dist

RUN yarn --pure-lockfile --production

FROM node:14-alpine
WORKDIR /code

COPY --from=builder /code /code

ARG PORT
ARG APP_HOST
ARG API_HOST

ENV PORT=$PORT
ENV APP_HOST=$APP_HOST
ENV API_HOST=$API_HOST

EXPOSE $PORT

CMD ["yarn", "start"]

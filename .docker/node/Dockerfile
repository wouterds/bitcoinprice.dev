FROM node:14-alpine AS builder
WORKDIR /code

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./dist ./dist

RUN yarn --pure-lockfile --production

FROM node:14-alpine
WORKDIR /code

COPY --from=builder /code /code

ARG HOST
ARG PORT

ENV HOST=$HOST
ENV PORT=$PORT

EXPOSE $PORT

CMD ["yarn", "start"]

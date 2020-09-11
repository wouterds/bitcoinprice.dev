FROM node:14-alpine AS builder
WORKDIR /code

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./dist ./dist
COPY ./.docker/node/crons ./crons
COPY ./.docker/node/entrypoint.sh ./entrypoint.sh

RUN yarn --pure-lockfile --production

FROM node:14-alpine
WORKDIR /code

COPY --from=builder /code /code

RUN crontab ./crons

ARG PORT
ARG APP_HOST
ARG API_HOST

ENV PORT=$PORT
ENV APP_HOST=$APP_HOST
ENV API_HOST=$API_HOST
ENV DD_AGENT_HOST=datadog-agent
ENV DD_TRACE_AGENT_PORT=8126

EXPOSE $PORT

CMD ["./entrypoint.sh"]

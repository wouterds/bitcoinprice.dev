#!/bin/sh

# start tickers
yarn start:ticker:binance > /proc/1/fd/1 2>&1 &
yarn start:ticker:bitfinex > /proc/1/fd/1 2>&1 &
yarn start:ticker:bitstamp > /proc/1/fd/1 2>&1 &
yarn start:ticker:coinbase > /proc/1/fd/1 2>&1 &
yarn start:ticker:kraken > /proc/1/fd/1 2>&1 &

# start cron deamon
crond

# start application
yarn start

#!/bin/sh

# start tickers
yarn ticker:binance > /proc/1/fd/1 2>&1 &
yarn ticker:bitfinex > /proc/1/fd/1 2>&1 &
yarn ticker:bitstamp > /proc/1/fd/1 2>&1 &
yarn ticker:coinbase > /proc/1/fd/1 2>&1 &
yarn ticker:kraken > /proc/1/fd/1 2>&1 &

# wait for tickers to connect
sleep 10

# take minutely average sample
yarn minutely-average:sample

# clean minutely average
yarn minutely-average:clean

# start cron deamon
crond

# start application
yarn start

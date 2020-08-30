import redis from 'redis';
import WebSocket from 'ws';

const url = 'wss://fstream.binance.com/stream?streams=btcusdt@markPrice';
const connection = new WebSocket(url);
const redisClient = redis.createClient();

connection.onmessage = (e: { data: any }) => {
  const { data } = JSON.parse(e.data);

  redisClient.hset('ticker', 'binance', data.p);
};

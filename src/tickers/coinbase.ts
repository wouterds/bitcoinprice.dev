import redis from 'redis';
import WebSocket from 'ws';

const url = 'wss://ws-feed.pro.coinbase.com';
const connection = new WebSocket(url);
const redisClient = redis.createClient();

connection.on('open', () => {
  connection.send(
    JSON.stringify({
      type: 'subscribe',
      product_ids: ['BTC-USD'],
      channels: [
        {
          name: 'ticker',
          product_ids: ['BTC-USD'],
        },
      ],
    }),
  );
});

connection.onmessage = (e: { data: any }) => {
  const data = JSON.parse(e.data);

  const price = parseFloat(data?.price)?.toFixed(2) || null;

  if (price) {
    redisClient.set('ticker.coinbase', price, 'EX', 60);
    redisClient.hset('ticker', 'coinbase', price);
  }
};

import redis from 'redis';
import WebSocket from 'ws';

const url = 'wss://ws.kraken.com/ticker';
const connection = new WebSocket(url);
const redisClient = redis.createClient();

connection.on('open', () => {
  connection.send(
    JSON.stringify({
      event: 'subscribe',
      pair: ['XBT/USD'],
      subscription: { name: 'ticker' },
    }),
  );
});

connection.onmessage = (e: { data: any }) => {
  const data = JSON.parse(e.data);
  if (
    Array.isArray(data) &&
    data?.[2] === 'ticker' &&
    data?.[3] === 'XBT/USD'
  ) {
    const price = parseFloat(data[1]?.c?.[0])?.toFixed(2) || null;

    if (price) {
      redisClient.set('ticker.kraken', price, 'EX', 60);
      redisClient.hset('ticker', 'kraken', price);
    }
  }
};

import redis from 'redis';
import { promisify } from 'util';
import WebSocket from 'ws';

(async () => {
  const redisClient = redis.createClient({ host: 'redis' });
  const getAsync = promisify(redisClient.get).bind(redisClient);

  const data = await getAsync('ticker.kraken');
  if (data) {
    process.exit(0);
  }

  const url = 'wss://ws.kraken.com/ticker';
  const connection = new WebSocket(url);

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
})();

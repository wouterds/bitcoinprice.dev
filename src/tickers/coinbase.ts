import redis from 'redis';
import { promisify } from 'util';
import WebSocket from 'ws';

(async () => {
  const redisClient = redis.createClient({ host: 'redis' });
  const getAsync = promisify(redisClient.get).bind(redisClient);

  const data = await getAsync('ticker.coinbase');
  if (data) {
    process.exit(0);
  }

  const url = 'wss://ws-feed.pro.coinbase.com';
  const connection = new WebSocket(url);

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

  connection.on('close', () => {
    process.exit(1);
  });
})();

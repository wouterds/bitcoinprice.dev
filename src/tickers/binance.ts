import redis from 'redis';
import { promisify } from 'util';
import WebSocket from 'ws';

(async () => {
  const redisClient = redis.createClient();
  const getAsync = promisify(redisClient.get).bind(redisClient);

  const data = await getAsync('ticker.binance');
  if (data) {
    process.exit(0);
  }

  const url = 'wss://fstream.binance.com/stream?streams=btcusdt@markPrice';
  const connection = new WebSocket(url);

  connection.onmessage = (e: { data: any }) => {
    const { data } = JSON.parse(e.data);

    const price = parseFloat(data?.p)?.toFixed(2) || null;

    if (price) {
      redisClient.set('ticker.binance', price, 'EX', 60);
      redisClient.hset('ticker', 'binance', data.p);
    }
  };

  connection.on('close', () => {
    process.exit(1);
  });
})();

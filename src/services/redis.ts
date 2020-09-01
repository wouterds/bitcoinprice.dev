import Redis from 'redis';
import { promisify } from 'util';

const redisClient = Redis.createClient({ host: 'redis' });

const get = promisify(redisClient.get).bind(redisClient);
const set = redisClient.set.bind(redisClient);
const hset = redisClient.hset.bind(redisClient);
const hgetall = promisify(redisClient.hgetall).bind(redisClient);

const redis = {
  get,
  set,
  hset,
  hgetall,
};

export default redis;

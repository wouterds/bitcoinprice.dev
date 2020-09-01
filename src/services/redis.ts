import Redis from 'redis';

const redis = Redis.createClient({ host: 'redis' });

export default redis;

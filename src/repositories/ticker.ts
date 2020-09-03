import redis from 'services/redis';

import Sources from '../tickers/sources';

class TickerRepository {
  private ttl = 60;

  getPriceForSource = async (source: Sources): Promise<string | null> => {
    const data = await redis.get(`ticker.${source}`);
    if (!data) {
      return null;
    }

    return data;
  };

  setPriceForSource = async (price: string, source: Sources): Promise<void> => {
    if (!price) {
      return;
    }

    redis.set(`ticker.${source}`, price, 'EX', this.ttl);
  };
}

export default TickerRepository;

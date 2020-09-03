import redis from 'services/redis';
import Sources from 'tickers/sources';

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

  getAveragePriceForSources = async (
    sources: Sources[],
  ): Promise<string | null> => {
    const prices: string[] = [];
    for (const source of sources) {
      const price = await this.getPriceForSource(source);
      if (!price) {
        continue;
      }

      prices.push(price);
    }

    if (!prices.length) {
      return null;
    }

    const average = (
      prices.reduce(
        (total: number, value: string) => total + parseFloat(value),
        0,
      ) / prices.length
    ).toFixed(2);

    return average;
  };

  addMinutelyAverage = async (time: string, average: string): Promise<void> => {
    redis.hset('minutely', time, average);
  };

  getMinutelyAverages = async (): Promise<{ [key: string]: string }> => {
    const data = await redis.hgetall('minutely');
    if (!data) {
      return {};
    }

    return data;
  };
}

export default TickerRepository;

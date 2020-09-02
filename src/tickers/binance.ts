import AbstractTicker from './abstract';

class BinanceTicker extends AbstractTicker {
  get source(): string {
    return 'binance';
  }

  get endpoint(): string {
    return 'wss://fstream.binance.com/stream?streams=btcusdt@markPrice';
  }

  parsePrice = (json: any): string => {
    if (!json) {
      return '';
    }

    const { data } = json || {};

    if (!data?.p) {
      return '';
    }

    return data?.p;
  };
}

new BinanceTicker().start();

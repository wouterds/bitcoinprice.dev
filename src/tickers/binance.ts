import AbstractTicker from './abstract';

class BinanceTicker extends AbstractTicker {
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

const ticker = new BinanceTicker({
  source: 'binance',
  ws: 'wss://fstream.binance.com/stream?streams=btcusdt@markPrice',
});

ticker.start();

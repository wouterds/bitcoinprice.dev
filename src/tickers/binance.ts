import AbstractTicker from './abstract';
import Sources from './sources';

class BinanceTicker extends AbstractTicker {
  get source(): Sources {
    return Sources.Binance;
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

export default BinanceTicker;

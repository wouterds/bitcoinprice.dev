import AbstractTicker from './abstract';
import Sources from './sources';

class BitstampTicker extends AbstractTicker {
  get source(): Sources {
    return Sources.Bitstamp;
  }

  get endpoint(): string {
    return 'wss://ws.bitstamp.net';
  }

  get subscriptionMessage(): any {
    return {
      event: 'bts:subscribe',
      data: {
        channel: 'live_trades_btcusd',
      },
    };
  }

  parsePrice = (json: any): string => {
    if (!json?.data?.price) {
      return '';
    }

    return `${json?.data?.price}`;
  };
}

export default BitstampTicker;

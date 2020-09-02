import AbstractTicker from './abstract';

class BitstampTicker extends AbstractTicker {
  get source(): string {
    return 'bitstamp';
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

new BitstampTicker().start();

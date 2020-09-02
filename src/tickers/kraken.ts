import AbstractTicker from './abstract';

class KrakenTicker extends AbstractTicker {
  get source(): string {
    return 'kraken';
  }

  get endpoint(): string {
    return 'wss://ws.kraken.com/ticker';
  }

  get subscriptionMessage(): any {
    return {
      event: 'subscribe',
      pair: ['XBT/USD'],
      subscription: { name: 'ticker' },
    };
  }

  parsePrice = (json: any): string => {
    if (!Array.isArray(json)) {
      return '';
    }

    if (json?.[2] !== 'ticker') {
      return '';
    }

    if (json?.[3] !== 'XBT/USD') {
      return '';
    }

    if (!json[1]?.c?.[0]) {
      return '';
    }

    return json[1]?.c?.[0];
  };
}

new KrakenTicker().start();

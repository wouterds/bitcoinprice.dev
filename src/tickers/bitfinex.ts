import AbstractTicker from './abstract';

class BitfinexTicker extends AbstractTicker {
  get source(): string {
    return 'bitfinex';
  }

  get endpoint(): string {
    return 'wss://api-pub.bitfinex.com/ws/2';
  }

  get subscriptionMessage(): any {
    return {
      event: 'subscribe',
      channel: 'ticker',
      symbol: 'tBTCUSD',
    };
  }

  parsePrice = (json: any): string => {
    if (!Array.isArray(json)) {
      return '';
    }

    if (!Array.isArray(json[1])) {
      return '';
    }

    const price = json[1][6];
    if (!price) {
      return '';
    }

    return `${price}`;
  };
}

new BitfinexTicker().start();

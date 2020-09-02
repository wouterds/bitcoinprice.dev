import AbstractTicker from './abstract';

class CoinbaseTicker extends AbstractTicker {
  get source(): string {
    return 'coinbase';
  }

  get endpoint(): string {
    return 'wss://ws-feed.pro.coinbase.com';
  }

  get subscriptionMessage(): any {
    return {
      type: 'subscribe',
      product_ids: ['BTC-USD'],
      channels: [
        {
          name: 'ticker',
          product_ids: ['BTC-USD'],
        },
      ],
    };
  }

  parsePrice = (json: any): string => {
    if (!json?.price) {
      return '';
    }

    return `${json?.price}`;
  };
}

new CoinbaseTicker().start();

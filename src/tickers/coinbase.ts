import AbstractTicker from './abstract';

class CoinbaseTicker extends AbstractTicker {
  parsePrice = (json: any): string => {
    if (!json?.price) {
      return '';
    }

    return `${json?.price}`;
  };
}

const ticker = new CoinbaseTicker({
  source: 'coinbase',
  ws: 'wss://ws-feed.pro.coinbase.com',
  subscriptionMessage: {
    type: 'subscribe',
    product_ids: ['BTC-USD'],
    channels: [
      {
        name: 'ticker',
        product_ids: ['BTC-USD'],
      },
    ],
  },
});

ticker.start();

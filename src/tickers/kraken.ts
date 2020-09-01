import AbstractTicker from './abstract';

class KrakenTicker extends AbstractTicker {
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

const ticker = new KrakenTicker({
  source: 'kraken',
  ws: 'wss://ws.kraken.com/ticker',
  subscriptionMessage: {
    event: 'subscribe',
    pair: ['XBT/USD'],
    subscription: { name: 'ticker' },
  },
});

ticker.start();

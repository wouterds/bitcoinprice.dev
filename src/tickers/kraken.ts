import AbstractTicker from './abstract';
import Sources from './sources';

class KrakenTicker extends AbstractTicker {
  get source(): Sources {
    return Sources.Kraken;
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

export default KrakenTicker;

import chalk from 'chalk';
import redis from 'services/redis';
import WebSocket from 'ws';

abstract class AbstractTicker {
  abstract get source(): string;
  abstract get endpoint(): string;
  abstract parsePrice: (json: any) => string;

  get ttl(): number {
    return 60;
  }

  get subscriptionMessage(): any | null {
    return null;
  }

  private formatPrice = (raw: string): string | null => {
    if (!raw) {
      return null;
    }

    const value = parseFloat(raw);
    if (isNaN(value)) {
      return null;
    }

    if (!value) {
      return null;
    }

    return value.toFixed(2);
  };

  private messageHandler = ({ data: json }: { data: WebSocket.Data }): void => {
    let data;
    try {
      data = JSON.parse(json as string);
    } catch {
      return;
    }

    if (!data) {
      return;
    }

    const price = this.formatPrice(this.parsePrice(data));
    if (!price) {
      return;
    }

    redis.set(`ticker.${this.source}`, price, 'EX', this.ttl);
    redis.hset('ticker', this.source, price);

    console.log(chalk.yellow(`[ticker][${this.source}] price: ${price}`));
  };

  public start = async (): Promise<void> => {
    if (this.endpoint.substr(0, 6) !== 'wss://') {
      console.log(
        chalk.red(`[ticker][${this.source}] websocket must start with wss://`),
      );
      process.exit(0);
    }

    const data = await redis.get(`ticker.${this.source}`);
    if (data) {
      console.log(
        chalk.red(`[ticker][${this.source}] is already running, abort`),
      );
      process.exit(0);
    }

    console.log(chalk.green(`[ticker][${this.source}] starting`));

    const connection = new WebSocket(this.endpoint);
    connection.on('open', () => {
      console.log(chalk.green(`[ticker][${this.source}] connection opened`));

      if (this.subscriptionMessage) {
        console.log(
          chalk.green(`[ticker][${this.source}] dispatch subscription message`),
        );
        const message = JSON.stringify(this.subscriptionMessage);
        connection.send(message);
      }
    });
    connection.on('close', () => {
      console.log(chalk.red(`[ticker][${this.source}] connection closed`));
      process.exit(0);
    });
    connection.onmessage = this.messageHandler;
  };
}

export default AbstractTicker;

import chalk from 'chalk';
import redis from 'redis';
import { promisify } from 'util';
import WebSocket from 'ws';

const redisClient = redis.createClient({ host: 'redis' });
const get = promisify(redisClient.get).bind(redisClient);

interface AbstractTickerOptions {
  source: string;
  ws: string;
  ttl?: number;
  subscriptionMessage?: any;
}

abstract class AbstractTicker {
  private ws: string;
  private source: string;
  private ttl: number;
  private subscriptionMessage: any;

  constructor(options: AbstractTickerOptions) {
    const { source, ws, ttl = 60, subscriptionMessage } = options;
    console.log(`[${chalk.magenta('ticker')}][${chalk.yellow(source)}] init`);

    if (ws.substr(0, 6) !== 'wss://') {
      console.log(
        chalk.red(
          `[${chalk.magenta('ticker')}][${chalk.yellow(
            source,
          )}] websocket must start with wss://`,
        ),
      );
      process.exit(0);
    }

    this.source = source;
    this.ws = ws;
    this.ttl = ttl;
    this.subscriptionMessage = subscriptionMessage;
  }

  abstract parsePrice: (json: any) => string;

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

    redisClient.set(`ticker.${this.source}`, price, 'EX', this.ttl);
    redisClient.hset('ticker', this.source, price);

    console.log(
      `[${chalk.magenta('ticker')}][${chalk.yellow(
        this.source,
      )}] price: ${price}`,
    );
  };

  public start = async (): Promise<void> => {
    console.log(
      `[${chalk.magenta('ticker')}][${chalk.yellow(this.source)}] starting`,
    );

    const data = await get(`ticker.${this.source}`);
    if (data) {
      console.error(
        chalk.red(
          `[${chalk.magenta('ticker')}][${chalk.yellow(
            this.source,
          )}] is already running, abort`,
        ),
      );
      process.exit(0);
    }

    const connection = new WebSocket(this.ws);
    connection.on('open', () => {
      console.log(
        `[${chalk.magenta('ticker')}][${chalk.yellow(
          this.source,
        )}] connection opened`,
      );

      if (this.subscriptionMessage) {
        console.log(
          `[${chalk.magenta('ticker')}][${chalk.yellow(
            this.source,
          )}] dispatch subscription message`,
        );
        const message = JSON.stringify(this.subscriptionMessage);
        connection.send(message);
      }
    });
    connection.on('close', () => {
      console.log(
        `[${chalk.magenta('ticker')}][${chalk.yellow(
          this.source,
        )}] connection closed`,
      );
      process.exit(0);
    });
    connection.onmessage = this.messageHandler;
  };
}

export default AbstractTicker;

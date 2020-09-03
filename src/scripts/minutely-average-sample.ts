import chalk from 'chalk';
import { roundToNearestMinutes } from 'date-fns';
import TickerRepository from 'repositories/ticker';
import Sources from 'tickers/sources';

const sources = Object.values(Sources);

(async () => {
  console.log(chalk.green('Sampling minutely average'));
  const repository = new TickerRepository();

  const time = roundToNearestMinutes(new Date()).getTime() / 1000;
  const average = await repository.getAveragePriceForSources(sources);
  if (!average) {
    process.exit(1);
  }

  repository.addMinutelyAverage(time.toString(), average);
  console.log(chalk.yellow(`Saving minutely average: $${average}`));

  process.exit(0);
})();

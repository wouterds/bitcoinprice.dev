import chalk from 'chalk';
import { roundToNearestMinutes, subHours } from 'date-fns';
import TickerRepository from 'repositories/ticker';

(async () => {
  console.log(chalk.green('Cleaning up old minutely averages'));
  const repository = new TickerRepository();

  const time = roundToNearestMinutes(subHours(new Date(), 24)).getTime() / 1000;
  const averages = await repository.getMinutelyAverages();

  const toDelete = [];
  for (const average of Object.entries(averages)) {
    if (parseInt(average[0]) > time) {
      continue;
    }

    toDelete.push(average[0]);
  }

  if (toDelete.length === 0) {
    process.exit(0);
  }

  console.log(chalk.yellow(`Delete averages for: ${toDelete.join(', ')}`));
  repository.deleteMinutelyAverages(toDelete);

  process.exit(0);
})();

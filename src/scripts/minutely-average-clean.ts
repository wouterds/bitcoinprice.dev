import { roundToNearestMinutes, subHours } from 'date-fns';
import TickerRepository from 'repositories/ticker';

(async () => {
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

  repository.deleteMinutelyAverages(toDelete);

  process.exit(0);
})();

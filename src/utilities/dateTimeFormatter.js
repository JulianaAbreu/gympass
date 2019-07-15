import moment from 'moment';
import momentTz from 'moment-timezone';

function formatDate(isoTime, type) {
  const obj = moment(isoTime);
  const isoTimeUtc = obj.add(moment().utcOffset(), 'minutes');
  const timezone = momentTz.tz.guess();
  let formattedDate;

  switch (type) {
    case 'relative':
      formattedDate = momentTz
        .tz(isoTimeUtc, timezone)
        .startOf('minutes')
        .fromNow();
      return formattedDate;
    case 'simple':
      return isoTimeUtc.format('DD/MM/YYYY');
    case 'dateTime':
      formattedDate = momentTz
        .tz(isoTimeUtc, timezone)
        .format('DD/MM/YYYY HH:mm');
      return formattedDate;
    case 'full':
    default:
      return obj
        .add(moment().utcOffset(), 'minutes')
        .format('DD/MM/YYYY HH:mm');
  }
}

export default formatDate;

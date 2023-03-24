import { MONITOR_API } from 'constants/APIUri';
import { POST } from './Clients';

const collectEvent = (event, metadata) => POST({ url: MONITOR_API.COLLECTOR, body: { event, metadata } });

export default {
  collectEvent,
};

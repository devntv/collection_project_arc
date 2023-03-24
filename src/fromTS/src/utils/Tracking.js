import { TrackingActionClient } from 'clients';

export async function trackingFunc(eventAction, body) {
  return TrackingActionClient.tracking({ ...body, eventAction });
}
export default { trackingFunc };

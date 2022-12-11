/* eslint-disable @typescript-eslint/unbound-method */
import * as Types_1 from "@amplitude/analytics-types";
import client from "./browser-client";
export { Identify, Revenue } from "@amplitude/analytics-core";
export { createInstance } from "./browser-client";
export { runQueuedFunctions } from "./utils/snippet-helper";
export { Types_1 as Types };
export var add = client.add,
  flush = client.flush,
  getDeviceId = client.getDeviceId,
  getSessionId = client.getSessionId,
  getUserId = client.getUserId,
  groupIdentify = client.groupIdentify,
  identify = client.identify,
  init = client.init,
  logEvent = client.logEvent,
  remove = client.remove,
  reset = client.reset,
  revenue = client.revenue,
  setDeviceId = client.setDeviceId,
  setGroup = client.setGroup,
  setOptOut = client.setOptOut,
  setSessionId = client.setSessionId,
  setTransport = client.setTransport,
  setUserId = client.setUserId,
  track = client.track;
//# sourceMappingURL=index.js.map

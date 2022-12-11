import {
  CampaignTracker,
  getAnalyticsConnector,
  IdentityEventSender,
} from "@amplitude/analytics-client-common";
import {
  AmplitudeCore,
  Destination,
  Identify,
  returnWrapper,
  Revenue,
  UUID,
} from "@amplitude/analytics-core";
import { __assign, __awaiter, __extends, __generator } from "tslib";
import {
  createFlexibleStorage,
  createTransport,
  useBrowserConfig,
} from "./config";
import { parseOldCookies } from "./cookie-migration";
import { Context } from "./plugins/context";
import {
  convertProxyObjectToRealObject,
  isInstanceProxy,
} from "./utils/snippet-helper";
var AmplitudeBrowser = /** @class */ (function (_super) {
  __extends(AmplitudeBrowser, _super);
  function AmplitudeBrowser() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  AmplitudeBrowser.prototype.init = function (apiKey, userId, options) {
    var _a, _b, _c;
    if (apiKey === void 0) {
      apiKey = "";
    }
    return __awaiter(this, void 0, void 0, function () {
      var oldCookies, browserOptions, isNewSession, connector;
      var _this = this;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            // Step 0: Block concurrent initialization
            if (this.initializing) {
              return [2 /*return*/];
            }
            this.initializing = true;
            return [4 /*yield*/, parseOldCookies(apiKey, options)];
          case 1:
            oldCookies = _d.sent();
            return [
              4 /*yield*/,
              useBrowserConfig(
                apiKey,
                userId || oldCookies.userId,
                __assign(__assign({}, options), {
                  deviceId:
                    (_a = oldCookies.deviceId) !== null && _a !== void 0
                      ? _a
                      : options === null || options === void 0
                      ? void 0
                      : options.deviceId,
                  sessionId:
                    (_b = oldCookies.sessionId) !== null && _b !== void 0
                      ? _b
                      : options === null || options === void 0
                      ? void 0
                      : options.sessionId,
                  optOut:
                    (_c =
                      options === null || options === void 0
                        ? void 0
                        : options.optOut) !== null && _c !== void 0
                      ? _c
                      : oldCookies.optOut,
                  lastEventTime: oldCookies.lastEventTime,
                })
              ),
            ];
          case 2:
            browserOptions = _d.sent();
            return [
              4 /*yield*/,
              _super.prototype._init.call(this, browserOptions),
            ];
          case 3:
            _d.sent();
            isNewSession = !this.config.lastEventTime;
            if (
              !this.config.sessionId ||
              (this.config.lastEventTime &&
                Date.now() - this.config.lastEventTime >
                  this.config.sessionTimeout)
            ) {
              // Either
              // 1) No previous session; or
              // 2) Previous session expired
              this.setSessionId(Date.now());
              isNewSession = true;
            }
            connector = getAnalyticsConnector();
            connector.eventBridge.setEventReceiver(function (event) {
              void _this.track(event.eventType, event.eventProperties);
            });
            connector.identityStore.setIdentity({
              userId: this.config.userId,
              deviceId: this.config.deviceId,
            });
            // Step 4: Install plugins
            // Do not track any events before this
            return [4 /*yield*/, this.add(new Context())];
          case 4:
            // Step 4: Install plugins
            // Do not track any events before this
            _d.sent();
            return [4 /*yield*/, this.add(new IdentityEventSender())];
          case 5:
            _d.sent();
            return [4 /*yield*/, this.add(new Destination())];
          case 6:
            _d.sent();
            this.initializing = false;
            // Step 5: Track attributions
            return [
              4 /*yield*/,
              this.runAttributionStrategy(
                browserOptions.attribution,
                isNewSession
              ),
            ];
          case 7:
            // Step 5: Track attributions
            _d.sent();
            // Step 6: Run queued dispatch functions
            return [4 /*yield*/, this.runQueuedFunctions("dispatchQ")];
          case 8:
            // Step 6: Run queued dispatch functions
            _d.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  AmplitudeBrowser.prototype.runAttributionStrategy = function (
    attributionConfig,
    isNewSession
  ) {
    if (isNewSession === void 0) {
      isNewSession = false;
    }
    return __awaiter(this, void 0, void 0, function () {
      var track, onNewCampaign, storage, campaignTracker;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            track = this.track.bind(this);
            onNewCampaign = this.setSessionId.bind(this, Date.now());
            return [4 /*yield*/, createFlexibleStorage(this.config)];
          case 1:
            storage = _a.sent();
            campaignTracker = new CampaignTracker(
              this.config.apiKey,
              __assign(__assign({}, attributionConfig), {
                storage: storage,
                track: track,
                onNewCampaign: onNewCampaign,
              })
            );
            return [4 /*yield*/, campaignTracker.send(isNewSession)];
          case 2:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  AmplitudeBrowser.prototype.getUserId = function () {
    var _a;
    return (_a = this.config) === null || _a === void 0 ? void 0 : _a.userId;
  };
  AmplitudeBrowser.prototype.setUserId = function (userId) {
    if (!this.config) {
      this.q.push(this.setUserId.bind(this, userId));
      return;
    }
    this.config.userId = userId;
  };
  AmplitudeBrowser.prototype.getDeviceId = function () {
    var _a;
    return (_a = this.config) === null || _a === void 0 ? void 0 : _a.deviceId;
  };
  AmplitudeBrowser.prototype.setDeviceId = function (deviceId) {
    if (!this.config) {
      this.q.push(this.setDeviceId.bind(this, deviceId));
      return;
    }
    this.config.deviceId = deviceId;
  };
  AmplitudeBrowser.prototype.reset = function () {
    this.setUserId(undefined);
    this.setDeviceId(UUID());
  };
  AmplitudeBrowser.prototype.getSessionId = function () {
    var _a;
    return (_a = this.config) === null || _a === void 0 ? void 0 : _a.sessionId;
  };
  AmplitudeBrowser.prototype.setSessionId = function (sessionId) {
    if (!this.config) {
      this.q.push(this.setSessionId.bind(this, sessionId));
      return;
    }
    this.config.sessionId = sessionId;
    this.config.lastEventTime = undefined;
  };
  AmplitudeBrowser.prototype.setTransport = function (transport) {
    if (!this.config) {
      this.q.push(this.setTransport.bind(this, transport));
      return;
    }
    this.config.transportProvider = createTransport(transport);
  };
  AmplitudeBrowser.prototype.identify = function (identify, eventOptions) {
    if (isInstanceProxy(identify)) {
      var queue = identify._q;
      identify._q = [];
      identify = convertProxyObjectToRealObject(new Identify(), queue);
    }
    if (
      eventOptions === null || eventOptions === void 0
        ? void 0
        : eventOptions.user_id
    ) {
      this.setUserId(eventOptions.user_id);
    }
    if (
      eventOptions === null || eventOptions === void 0
        ? void 0
        : eventOptions.device_id
    ) {
      this.setDeviceId(eventOptions.device_id);
    }
    return _super.prototype.identify.call(this, identify, eventOptions);
  };
  AmplitudeBrowser.prototype.groupIdentify = function (
    groupType,
    groupName,
    identify,
    eventOptions
  ) {
    if (isInstanceProxy(identify)) {
      var queue = identify._q;
      identify._q = [];
      identify = convertProxyObjectToRealObject(new Identify(), queue);
    }
    return _super.prototype.groupIdentify.call(
      this,
      groupType,
      groupName,
      identify,
      eventOptions
    );
  };
  AmplitudeBrowser.prototype.revenue = function (revenue, eventOptions) {
    if (isInstanceProxy(revenue)) {
      var queue = revenue._q;
      revenue._q = [];
      revenue = convertProxyObjectToRealObject(new Revenue(), queue);
    }
    return _super.prototype.revenue.call(this, revenue, eventOptions);
  };
  return AmplitudeBrowser;
})(AmplitudeCore);
export { AmplitudeBrowser };
export var createInstance = function () {
  var client = new AmplitudeBrowser();
  return {
    init: returnWrapper(client.init.bind(client)),
    add: returnWrapper(client.add.bind(client)),
    remove: returnWrapper(client.remove.bind(client)),
    track: returnWrapper(client.track.bind(client)),
    logEvent: returnWrapper(client.logEvent.bind(client)),
    identify: returnWrapper(client.identify.bind(client)),
    groupIdentify: returnWrapper(client.groupIdentify.bind(client)),
    setGroup: returnWrapper(client.setGroup.bind(client)),
    revenue: returnWrapper(client.revenue.bind(client)),
    flush: returnWrapper(client.flush.bind(client)),
    getUserId: client.getUserId.bind(client),
    setUserId: client.setUserId.bind(client),
    getDeviceId: client.getDeviceId.bind(client),
    setDeviceId: client.setDeviceId.bind(client),
    reset: client.reset.bind(client),
    getSessionId: client.getSessionId.bind(client),
    setSessionId: client.setSessionId.bind(client),
    setOptOut: client.setOptOut.bind(client),
    setTransport: client.setTransport.bind(client),
  };
};
export default createInstance();
//# sourceMappingURL=browser-client.js.map

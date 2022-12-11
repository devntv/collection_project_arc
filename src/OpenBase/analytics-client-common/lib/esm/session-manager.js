import { __assign, __awaiter, __generator } from "tslib";
import { getCookieName as getStorageKey } from "./cookie-name";
var SessionManager = /** @class */ (function () {
  function SessionManager(storage, apiKey) {
    this.storage = storage;
    this.isSessionCacheValid = true;
    this.storageKey = getStorageKey(apiKey);
    this.cache = { optOut: false };
  }
  /**
   * load() must be called immediately after instantation
   *
   * ```ts
   * await new SessionManager(...).load();
   * ```
   */
  SessionManager.prototype.load = function () {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = this;
            return [4 /*yield*/, this.storage.get(this.storageKey)];
          case 1:
            _b.cache =
              (_a = _c.sent()) !== null && _a !== void 0
                ? _a
                : {
                    optOut: false,
                  };
            return [2 /*return*/, this];
        }
      });
    });
  };
  SessionManager.prototype.setSession = function (session) {
    this.cache = __assign(__assign({}, this.cache), session);
    void this.storage.set(this.storageKey, this.cache);
  };
  SessionManager.prototype.getSessionId = function () {
    var _this = this;
    this.isSessionCacheValid = true;
    void this.storage.get(this.storageKey).then(function (userSession) {
      // Checks if session id has been set since the last get
      if (_this.isSessionCacheValid) {
        _this.cache.sessionId =
          userSession === null || userSession === void 0
            ? void 0
            : userSession.sessionId;
      }
    });
    return this.cache.sessionId;
  };
  SessionManager.prototype.setSessionId = function (sessionId) {
    // Flags session id has been set
    this.isSessionCacheValid = false;
    this.setSession({ sessionId: sessionId });
  };
  SessionManager.prototype.getDeviceId = function () {
    return this.cache.deviceId;
  };
  SessionManager.prototype.setDeviceId = function (deviceId) {
    this.setSession({ deviceId: deviceId });
  };
  SessionManager.prototype.getUserId = function () {
    return this.cache.userId;
  };
  SessionManager.prototype.setUserId = function (userId) {
    this.setSession({ userId: userId });
  };
  SessionManager.prototype.getLastEventTime = function () {
    return this.cache.lastEventTime;
  };
  SessionManager.prototype.setLastEventTime = function (lastEventTime) {
    this.setSession({ lastEventTime: lastEventTime });
  };
  SessionManager.prototype.getOptOut = function () {
    return this.cache.optOut;
  };
  SessionManager.prototype.setOptOut = function (optOut) {
    this.setSession({ optOut: optOut });
  };
  return SessionManager;
})();
export { SessionManager };
//# sourceMappingURL=session-manager.js.map

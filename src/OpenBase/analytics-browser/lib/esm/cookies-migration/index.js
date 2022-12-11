import {
  CookieStorage,
  getOldCookieName,
} from "@amplitude/analytics-client-common";
import { __awaiter, __generator, __read } from "tslib";
import { LocalStorage } from "../storage/local-storage";
export var parseOldCookies = function (apiKey, options) {
  return __awaiter(void 0, void 0, void 0, function () {
    var storage,
      oldCookieName,
      cookies,
      _a,
      deviceId,
      userId,
      optOut,
      sessionId,
      lastEventTime;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          storage = new CookieStorage();
          return [4 /*yield*/, storage.isEnabled()];
        case 1:
          if (
            !_b.sent() ||
            (options === null || options === void 0
              ? void 0
              : options.disableCookies)
          ) {
            storage = new LocalStorage();
          }
          return [4 /*yield*/, storage.isEnabled()];
        case 2:
          if (!_b.sent()) {
            return [
              2 /*return*/,
              {
                optOut: false,
              },
            ];
          }
          oldCookieName = getOldCookieName(apiKey);
          return [4 /*yield*/, storage.getRaw(oldCookieName)];
        case 3:
          cookies = _b.sent();
          if (!cookies) {
            return [
              2 /*return*/,
              {
                optOut: false,
              },
            ];
          }
          return [4 /*yield*/, storage.remove(oldCookieName)];
        case 4:
          _b.sent();
          (_a = __read(cookies.split("."), 5)),
            (deviceId = _a[0]),
            (userId = _a[1]),
            (optOut = _a[2]),
            (sessionId = _a[3]),
            (lastEventTime = _a[4]);
          return [
            2 /*return*/,
            {
              deviceId: deviceId,
              userId: decode(userId),
              sessionId: parseTime(sessionId),
              lastEventTime: parseTime(lastEventTime),
              optOut: Boolean(optOut),
            },
          ];
      }
    });
  });
};
export var parseTime = function (num) {
  var integer = parseInt(num, 32);
  if (isNaN(integer)) {
    return undefined;
  }
  return integer;
};
export var decode = function (value) {
  if (!atob || !escape || !value) {
    return undefined;
  }
  try {
    return decodeURIComponent(escape(atob(value)));
  } catch (_a) {
    return undefined;
  }
};
//# sourceMappingURL=index.js.map

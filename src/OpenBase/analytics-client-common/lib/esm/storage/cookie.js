import { __assign, __awaiter, __generator } from "tslib";
import { getGlobalScope } from "../global-scope";
var CookieStorage = /** @class */ (function () {
  function CookieStorage(options) {
    this.options = __assign({}, options);
  }
  CookieStorage.prototype.isEnabled = function () {
    return __awaiter(this, void 0, void 0, function () {
      var random, testStrorage, testKey, value, _a;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            /* istanbul ignore if */
            if (!getGlobalScope()) {
              return [2 /*return*/, false];
            }
            random = String(Date.now());
            testStrorage = new CookieStorage(this.options);
            testKey = "AMP_TEST";
            _b.label = 1;
          case 1:
            _b.trys.push([1, 4, 5, 7]);
            return [4 /*yield*/, testStrorage.set(testKey, random)];
          case 2:
            _b.sent();
            return [4 /*yield*/, testStrorage.get(testKey)];
          case 3:
            value = _b.sent();
            return [2 /*return*/, value === random];
          case 4:
            _a = _b.sent();
            /* istanbul ignore next */
            return [2 /*return*/, false];
          case 5:
            return [4 /*yield*/, testStrorage.remove(testKey)];
          case 6:
            _b.sent();
            return [7 /*endfinally*/];
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
  CookieStorage.prototype.get = function (key) {
    return __awaiter(this, void 0, void 0, function () {
      var value;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.getRaw(key)];
          case 1:
            value = _a.sent();
            if (!value) {
              return [2 /*return*/, undefined];
            }
            try {
              try {
                value = decodeURIComponent(atob(value));
              } catch (_b) {
                // value not encoded
              }
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return [2 /*return*/, JSON.parse(value)];
            } catch (_c) {
              /* istanbul ignore next */
              return [2 /*return*/, undefined];
            }
            return [2 /*return*/];
        }
      });
    });
  };
  CookieStorage.prototype.getRaw = function (key) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var globalScope, cookie, match;
      return __generator(this, function (_b) {
        globalScope = getGlobalScope();
        cookie =
          (_a =
            globalScope === null || globalScope === void 0
              ? void 0
              : globalScope.document.cookie.split("; ")) !== null &&
          _a !== void 0
            ? _a
            : [];
        match = cookie.find(function (c) {
          return c.indexOf(key + "=") === 0;
        });
        if (!match) {
          return [2 /*return*/, undefined];
        }
        return [2 /*return*/, match.substring(key.length + 1)];
      });
    });
  };
  CookieStorage.prototype.set = function (key, value) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var expirationDays, expires, expireDate, date, str, globalScope;
      return __generator(this, function (_b) {
        try {
          expirationDays =
            (_a = this.options.expirationDays) !== null && _a !== void 0
              ? _a
              : 0;
          expires = value !== null ? expirationDays : -1;
          expireDate = undefined;
          if (expires) {
            date = new Date();
            date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
            expireDate = date;
          }
          str = ""
            .concat(key, "=")
            .concat(btoa(encodeURIComponent(JSON.stringify(value))));
          if (expireDate) {
            str += "; expires=".concat(expireDate.toUTCString());
          }
          str += "; path=/";
          if (this.options.domain) {
            str += "; domain=".concat(this.options.domain);
          }
          if (this.options.secure) {
            str += "; Secure";
          }
          if (this.options.sameSite) {
            str += "; SameSite=".concat(this.options.sameSite);
          }
          globalScope = getGlobalScope();
          if (globalScope) {
            globalScope.document.cookie = str;
          }
        } catch (_c) {
          //
        }
        return [2 /*return*/];
      });
    });
  };
  CookieStorage.prototype.remove = function (key) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.set(key, null)];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  CookieStorage.prototype.reset = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/];
      });
    });
  };
  return CookieStorage;
})();
export { CookieStorage };
//# sourceMappingURL=cookie.js.map

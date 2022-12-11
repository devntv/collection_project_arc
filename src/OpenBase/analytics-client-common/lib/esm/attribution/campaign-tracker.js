import { createIdentifyEvent, Identify } from "@amplitude/analytics-core";
import { __assign, __awaiter, __generator, __read, __rest } from "tslib";
import { getCookieName as getStorageKey } from "../cookie-name";
import { CampaignParser } from "./campaign-parser";
import { BASE_CAMPAIGN, EMPTY_VALUE, MKTG } from "./constants";
var CampaignTracker = /** @class */ (function () {
  function CampaignTracker(apiKey, options) {
    var _a, _b;
    this.storage = options.storage;
    this.storageKey = getStorageKey(apiKey, MKTG);
    this.parser = new CampaignParser();
    this.track = options.track;
    this.onNewCampaign = options.onNewCampaign;
    this.disabled = Boolean(options.disabled);
    this.trackNewCampaigns = Boolean(options.trackNewCampaigns);
    this.trackPageViews = Boolean(options.trackPageViews);
    this.excludeReferrers =
      (_a = options.excludeReferrers) !== null && _a !== void 0 ? _a : [];
    if (typeof location !== "undefined") {
      this.excludeReferrers.unshift(location.hostname);
    }
    this.initialEmptyValue =
      (_b = options.initialEmptyValue) !== null && _b !== void 0
        ? _b
        : EMPTY_VALUE;
  }
  CampaignTracker.prototype.isNewCampaign = function (current, previous) {
    var _referrer = current.referrer,
      currentCampaign = __rest(current, ["referrer"]);
    var _a = previous || {},
      _previous_referrer = _a.referrer,
      previousCampaign = __rest(_a, ["referrer"]);
    var isReferrerExcluded = Boolean(
      currentCampaign.referring_domain &&
        this.excludeReferrers.includes(currentCampaign.referring_domain)
    );
    var hasNewCampaign =
      JSON.stringify(currentCampaign) !== JSON.stringify(previousCampaign);
    return !isReferrerExcluded && (!previous || hasNewCampaign);
  };
  CampaignTracker.prototype.saveCampaignToStorage = function (campaign) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.storage.set(this.storageKey, campaign)];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  CampaignTracker.prototype.getCampaignFromStorage = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.storage.get(this.storageKey)];
          case 1:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  };
  CampaignTracker.prototype.createCampaignEvent = function (campaign) {
    var _this = this;
    var campaignParameters = __assign(__assign({}, BASE_CAMPAIGN), campaign);
    var identifyEvent = Object.entries(campaignParameters).reduce(function (
      identify,
      _a
    ) {
      var _b = __read(_a, 2),
        key = _b[0],
        value = _b[1];
      identify.setOnce(
        "initial_".concat(key),
        value || _this.initialEmptyValue
      );
      if (value) {
        return identify.set(key, value);
      }
      return identify.unset(key);
    },
    new Identify());
    var pageViewEvent = {
      event_type: "Page View",
      event_properties: {
        page_title:
          /* istanbul ignore next */ (typeof document !== "undefined" &&
            document.title) ||
          "",
        page_location:
          /* istanbul ignore next */ (typeof location !== "undefined" &&
            location.href) ||
          "",
        page_path:
          /* istanbul ignore next */ (typeof location !== "undefined" &&
            location.pathname) ||
          "",
      },
    };
    return __assign(
      __assign({}, createIdentifyEvent(identifyEvent)),
      this.trackPageViews && pageViewEvent
    );
  };
  CampaignTracker.prototype.send = function (isNewSession) {
    return __awaiter(this, void 0, void 0, function () {
      var currentCampaign, previousCampaign;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this.disabled) {
              return [2 /*return*/];
            }
            return [4 /*yield*/, this.parser.parse()];
          case 1:
            currentCampaign = _a.sent();
            return [4 /*yield*/, this.getCampaignFromStorage()];
          case 2:
            previousCampaign = _a.sent();
            if (!isNewSession) {
              if (
                !this.trackNewCampaigns ||
                !this.isNewCampaign(currentCampaign, previousCampaign)
              ) {
                return [2 /*return*/];
              }
              this.onNewCampaign(currentCampaign);
            }
            return [
              4 /*yield*/,
              this.track(this.createCampaignEvent(currentCampaign)),
            ];
          case 3:
            _a.sent();
            return [4 /*yield*/, this.saveCampaignToStorage(currentCampaign)];
          case 4:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  return CampaignTracker;
})();
export { CampaignTracker };
//# sourceMappingURL=campaign-tracker.js.map

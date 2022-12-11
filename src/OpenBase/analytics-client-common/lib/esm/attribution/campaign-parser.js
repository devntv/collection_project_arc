import { __assign, __awaiter, __generator } from "tslib";
import { getQueryParams } from "../query-params";
import {
  BASE_CAMPAIGN,
  DCLID,
  FBCLID,
  GBRAID,
  GCLID,
  KO_CLICK_ID,
  MSCLKID,
  TTCLID,
  TWCLID,
  UTM_CAMPAIGN,
  UTM_CONTENT,
  UTM_MEDIUM,
  UTM_SOURCE,
  UTM_TERM,
  WBRAID,
} from "./constants";
var CampaignParser = /** @class */ (function () {
  function CampaignParser() {}
  CampaignParser.prototype.parse = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          __assign(
            __assign(
              __assign(__assign({}, BASE_CAMPAIGN), this.getUtmParam()),
              this.getReferrer()
            ),
            this.getClickIds()
          ),
        ];
      });
    });
  };
  CampaignParser.prototype.getUtmParam = function () {
    var params = getQueryParams();
    var utmSource = params[UTM_SOURCE];
    var utmMedium = params[UTM_MEDIUM];
    var utmCampaign = params[UTM_CAMPAIGN];
    var utmTerm = params[UTM_TERM];
    var utmContent = params[UTM_CONTENT];
    return {
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
    };
  };
  CampaignParser.prototype.getReferrer = function () {
    var _a, _b;
    var data = {
      referrer: undefined,
      referring_domain: undefined,
    };
    try {
      data.referrer = document.referrer || undefined;
      data.referring_domain =
        (_b =
          (_a = data.referrer) === null || _a === void 0
            ? void 0
            : _a.split("/")[2]) !== null && _b !== void 0
          ? _b
          : undefined;
    } catch (_c) {
      // nothing to track
    }
    return data;
  };
  CampaignParser.prototype.getClickIds = function () {
    var _a;
    var params = getQueryParams();
    return (
      (_a = {}),
      (_a[DCLID] = params[DCLID]),
      (_a[FBCLID] = params[FBCLID]),
      (_a[GBRAID] = params[GBRAID]),
      (_a[GCLID] = params[GCLID]),
      (_a[KO_CLICK_ID] = params[KO_CLICK_ID]),
      (_a[MSCLKID] = params[MSCLKID]),
      (_a[TTCLID] = params[TTCLID]),
      (_a[TWCLID] = params[TWCLID]),
      (_a[WBRAID] = params[WBRAID]),
      _a
    );
  };
  return CampaignParser;
})();
export { CampaignParser };
//# sourceMappingURL=campaign-parser.js.map

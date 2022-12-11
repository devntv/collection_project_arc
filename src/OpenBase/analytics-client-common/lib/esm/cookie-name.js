import { AMPLITUDE_PREFIX } from "@amplitude/analytics-core";
export var getCookieName = function (apiKey, postKey, limit) {
  if (postKey === void 0) {
    postKey = "";
  }
  if (limit === void 0) {
    limit = 10;
  }
  return [AMPLITUDE_PREFIX, postKey, apiKey.substring(0, limit)]
    .filter(Boolean)
    .join("_");
};
export var getOldCookieName = function (apiKey) {
  return ""
    .concat(AMPLITUDE_PREFIX.toLowerCase(), "_")
    .concat(apiKey.substring(0, 6));
};
//# sourceMappingURL=cookie-name.js.map

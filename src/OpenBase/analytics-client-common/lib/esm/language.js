export var getLanguage = function () {
  var _a, _b, _c, _d;
  if (typeof navigator === "undefined") return "";
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  var userLanguage = navigator.userLanguage;
  return (_d =
    (_c =
      (_b =
        (_a = navigator.languages) === null || _a === void 0
          ? void 0
          : _a[0]) !== null && _b !== void 0
        ? _b
        : navigator.language) !== null && _c !== void 0
      ? _c
      : userLanguage) !== null && _d !== void 0
    ? _d
    : "";
};
//# sourceMappingURL=language.js.map

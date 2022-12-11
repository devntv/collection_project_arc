import { BaseTransport } from "@amplitude/analytics-core";
import { __awaiter, __extends, __generator } from "tslib";
var FetchTransport = /** @class */ (function (_super) {
  __extends(FetchTransport, _super);
  function FetchTransport() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  FetchTransport.prototype.send = function (serverUrl, payload) {
    return __awaiter(this, void 0, void 0, function () {
      var options, response, responsePayload;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            /* istanbul ignore if */
            if (typeof fetch === "undefined") {
              throw new Error("FetchTransport is not supported");
            }
            options = {
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
              },
              body: JSON.stringify(payload),
              method: "POST",
            };
            return [4 /*yield*/, fetch(serverUrl, options)];
          case 1:
            response = _a.sent();
            return [4 /*yield*/, response.json()];
          case 2:
            responsePayload = _a.sent();
            return [2 /*return*/, this.buildResponse(responsePayload)];
        }
      });
    });
  };
  return FetchTransport;
})(BaseTransport);
export { FetchTransport };
//# sourceMappingURL=fetch.js.map

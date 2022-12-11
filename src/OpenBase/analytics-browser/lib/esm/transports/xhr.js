import { BaseTransport } from "@amplitude/analytics-core";
import { __awaiter, __extends, __generator } from "tslib";
var XHRTransport = /** @class */ (function (_super) {
  __extends(XHRTransport, _super);
  function XHRTransport() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      done: 4,
    };
    return _this;
  }
  XHRTransport.prototype.send = function (serverUrl, payload) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          new Promise(function (resolve, reject) {
            /* istanbul ignore if */
            if (typeof XMLHttpRequest === "undefined") {
              reject(new Error("XHRTransport is not supported."));
            }
            var xhr = new XMLHttpRequest();
            xhr.open("POST", serverUrl, true);
            xhr.onreadystatechange = function () {
              if (xhr.readyState === _this.state.done) {
                try {
                  var responsePayload = xhr.responseText;
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  var parsedResponsePayload = JSON.parse(responsePayload);
                  var result = _this.buildResponse(parsedResponsePayload);
                  resolve(result);
                } catch (e) {
                  reject(e);
                }
              }
            };
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "*/*");
            xhr.send(JSON.stringify(payload));
          }),
        ];
      });
    });
  };
  return XHRTransport;
})(BaseTransport);
export { XHRTransport };
//# sourceMappingURL=xhr.js.map

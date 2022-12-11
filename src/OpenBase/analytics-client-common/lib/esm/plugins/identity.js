import { PluginType } from "@amplitude/analytics-types";
import { __awaiter, __generator } from "tslib";
import { getAnalyticsConnector } from "../analytics-connector";
var IdentityEventSender = /** @class */ (function () {
  function IdentityEventSender() {
    this.name = "identity";
    this.type = PluginType.BEFORE;
    this.identityStore = getAnalyticsConnector().identityStore;
  }
  IdentityEventSender.prototype.execute = function (context) {
    return __awaiter(this, void 0, void 0, function () {
      var userProperties;
      return __generator(this, function (_a) {
        userProperties = context.user_properties;
        if (userProperties) {
          this.identityStore
            .editIdentity()
            .updateUserProperties(userProperties)
            .commit();
        }
        return [2 /*return*/, context];
      });
    });
  };
  IdentityEventSender.prototype.setup = function (_) {
    return Promise.resolve(undefined);
  };
  return IdentityEventSender;
})();
export { IdentityEventSender };
//# sourceMappingURL=identity.js.map

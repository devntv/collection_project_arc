import { getLanguage } from "@amplitude/analytics-client-common";
import { UUID } from "@amplitude/analytics-core";
import { PluginType } from "@amplitude/analytics-types";
import UAParser from "@amplitude/ua-parser-js";
import { __assign, __awaiter, __generator } from "tslib";
import { VERSION } from "../version";
var BROWSER_PLATFORM = "Web";
var IP_ADDRESS = "$remote";
var Context = /** @class */ (function () {
  function Context() {
    this.name = "context";
    this.type = PluginType.BEFORE;
    this.eventId = 0;
    this.library = "amplitude-ts/".concat(VERSION);
    var agent;
    /* istanbul ignore else */
    if (typeof navigator !== "undefined") {
      agent = navigator.userAgent;
    }
    this.uaResult = new UAParser(agent).getResult();
  }
  Context.prototype.setup = function (config) {
    this.config = config;
    return Promise.resolve(undefined);
  };
  Context.prototype.execute = function (context) {
    return __awaiter(this, void 0, void 0, function () {
      var time, osName, osVersion, deviceModel, deviceVendor, event;
      return __generator(this, function (_a) {
        /**
         * Manages user session triggered by new events
         */
        if (!this.isSessionValid()) {
          // Creates new session
          this.config.sessionId = Date.now();
        } // else use previously creates session
        // Updates last event time to extend time-based session
        this.config.lastEventTime = Date.now();
        time = new Date().getTime();
        osName = this.uaResult.browser.name;
        osVersion = this.uaResult.browser.version;
        deviceModel = this.uaResult.device.model || this.uaResult.os.name;
        deviceVendor = this.uaResult.device.vendor;
        event = __assign(
          __assign(
            __assign(
              __assign(
                __assign(
                  __assign(
                    __assign(
                      __assign(
                        __assign(
                          __assign(
                            __assign(
                              __assign(
                                {
                                  user_id: this.config.userId,
                                  device_id: this.config.deviceId,
                                  session_id: this.config.sessionId,
                                  time: time,
                                },
                                this.config.appVersion && {
                                  app_version: this.config.appVersion,
                                }
                              ),
                              this.config.trackingOptions.platform && {
                                platform: BROWSER_PLATFORM,
                              }
                            ),
                            this.config.trackingOptions.osName && {
                              os_name: osName,
                            }
                          ),
                          this.config.trackingOptions.osVersion && {
                            os_version: osVersion,
                          }
                        ),
                        this.config.trackingOptions.deviceManufacturer && {
                          device_manufacturer: deviceVendor,
                        }
                      ),
                      this.config.trackingOptions.deviceModel && {
                        device_model: deviceModel,
                      }
                    ),
                    this.config.trackingOptions.language && {
                      language: getLanguage(),
                    }
                  ),
                  this.config.trackingOptions.ipAddress && { ip: IP_ADDRESS }
                ),
                {
                  insert_id: UUID(),
                  partner_id: this.config.partnerId,
                  plan: this.config.plan,
                }
              ),
              this.config.ingestionMetadata && {
                ingestion_metadata: {
                  source_name: this.config.ingestionMetadata.sourceName,
                  source_version: this.config.ingestionMetadata.sourceVersion,
                },
              }
            ),
            context
          ),
          { event_id: this.eventId++, library: this.library }
        );
        return [2 /*return*/, event];
      });
    });
  };
  Context.prototype.isSessionValid = function () {
    var lastEventTime = this.config.lastEventTime || Date.now();
    var timeSinceLastEvent = Date.now() - lastEventTime;
    return timeSinceLastEvent < this.config.sessionTimeout;
  };
  return Context;
})();
export { Context };
//# sourceMappingURL=context.js.map

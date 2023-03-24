'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var uuid = require('uuid');
var ClearIcon = require('@mui/icons-material/Clear');
var jsxRuntime = require('react/jsx-runtime');
var SmsIcon = require('@mui/icons-material/Sms');
var AttachFileIcon = require('@mui/icons-material/AttachFile');
var SellIcon = require('@mui/icons-material/Sell');
var Stack = require('@mui/material/Stack');
var Box = require('@mui/material/Box');
var CircularProgress = require('@mui/material/CircularProgress');
var Grid = require('@mui/material/Grid');
var Chip = require('@mui/material/Chip');
var Avatar = require('@mui/material/Avatar');
var Divider = require('@mui/material/Divider');
var Typography = require('@mui/material/Typography');
var ErrorIcon = require('@mui/icons-material/Error');
var RadioButtonUncheckedIcon = require('@mui/icons-material/RadioButtonUnchecked');
var CheckCircleIcon = require('@mui/icons-material/CheckCircle');
require('@mui/icons-material/HighlightOff');
var InsertDriveFileOutlinedIcon = require('@mui/icons-material/InsertDriveFileOutlined');
var CardMedia = require('@mui/material/CardMedia');
var IconButton = require('@mui/material/IconButton');
var Slider = require('@mui/material/Slider');
var PlayCircleOutlineIcon = require('@mui/icons-material/PlayCircleOutline');
var PauseIcon = require('@mui/icons-material/Pause');
var VolumeUpIcon = require('@mui/icons-material/VolumeUp');
var VolumeMuteIcon = require('@mui/icons-material/VolumeMute');
var Modal = require('@mui/material/Modal');
var DownloadIcon = require('@mui/icons-material/Download');
var PlayArrowIcon = require('@mui/icons-material/PlayArrow');
var Menu = require('@mui/material/Menu');
var MenuItem = require('@mui/material/MenuItem');
var LaunchIcon = require('@mui/icons-material/Launch');
var queryString = require('query-string');
require('memory-cache');
var Paper = require('@mui/material/Paper');
var ImageList = require('@mui/material/ImageList');
var ImageListItem = require('@mui/material/ImageListItem');
var ButtonBase = require('@mui/material/ButtonBase');
var NavigateBeforeIcon = require('@mui/icons-material/NavigateBefore');
var CloseIcon = require('@mui/icons-material/Close');
var fontawesomeSvgCore = require('@fortawesome/fontawesome-svg-core');
var freeBrandsSvgIcons = require('@fortawesome/free-brands-svg-icons');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var styles = require('@mui/styles');
var useWebSocket = require('react-use-websocket');
var ExpandMoreIcon = require('@mui/icons-material/ExpandMore');
var TableRow = require('@mui/material/TableRow');
var TableCell = require('@mui/material/TableCell');
var KeyboardArrowDownIcon = require('@mui/icons-material/KeyboardArrowDown');
var Grow = require('@mui/material/Grow');
var Badge = require('@mui/material/Badge');
var styles$1 = require('@mui/material/styles');
var Fade = require('@mui/material/Fade');
var Button = require('@mui/material/Button');
var ArrowForwardIosIcon = require('@mui/icons-material/ArrowForwardIos');
var ArrowBackIosNewIcon = require('@mui/icons-material/ArrowBackIosNew');
var system = require('@mui/system');
var reactHookForm = require('react-hook-form');
var SendIcon = require('@mui/icons-material/Send');
require('@mui/icons-material/Widgets');
require('@mui/icons-material/Mood');
require('@mui/icons-material/HelpOutline');
var SmartToyOutlinedIcon = require('@mui/icons-material/SmartToyOutlined');
var ContentEditable = require('react-contenteditable');
var ReplyIcon = require('@mui/icons-material/Reply');
var YouTube = require('@mui/icons-material/YouTube');
var InsertDriveFileIcon = require('@mui/icons-material/InsertDriveFile');
var List = require('@mui/material/List');
var ListItemButton = require('@mui/material/ListItemButton');
var ListItem = require('@mui/material/ListItem');
var SupportAgentIcon = require('@mui/icons-material/SupportAgent');
var dynamic = require('next/dynamic');
var MoreVertIcon = require('@mui/icons-material/MoreVert');
var AccountCircleOutlinedIcon = require('@mui/icons-material/AccountCircleOutlined');
var LocalPhoneOutlinedIcon = require('@mui/icons-material/LocalPhoneOutlined');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ClearIcon__default = /*#__PURE__*/_interopDefaultLegacy(ClearIcon);
var SmsIcon__default = /*#__PURE__*/_interopDefaultLegacy(SmsIcon);
var AttachFileIcon__default = /*#__PURE__*/_interopDefaultLegacy(AttachFileIcon);
var SellIcon__default = /*#__PURE__*/_interopDefaultLegacy(SellIcon);
var Stack__default = /*#__PURE__*/_interopDefaultLegacy(Stack);
var Box__default = /*#__PURE__*/_interopDefaultLegacy(Box);
var CircularProgress__default = /*#__PURE__*/_interopDefaultLegacy(CircularProgress);
var Grid__default = /*#__PURE__*/_interopDefaultLegacy(Grid);
var Chip__default = /*#__PURE__*/_interopDefaultLegacy(Chip);
var Avatar__default = /*#__PURE__*/_interopDefaultLegacy(Avatar);
var Divider__default = /*#__PURE__*/_interopDefaultLegacy(Divider);
var Typography__default = /*#__PURE__*/_interopDefaultLegacy(Typography);
var ErrorIcon__default = /*#__PURE__*/_interopDefaultLegacy(ErrorIcon);
var RadioButtonUncheckedIcon__default = /*#__PURE__*/_interopDefaultLegacy(RadioButtonUncheckedIcon);
var CheckCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckCircleIcon);
var InsertDriveFileOutlinedIcon__default = /*#__PURE__*/_interopDefaultLegacy(InsertDriveFileOutlinedIcon);
var CardMedia__default = /*#__PURE__*/_interopDefaultLegacy(CardMedia);
var IconButton__default = /*#__PURE__*/_interopDefaultLegacy(IconButton);
var Slider__default = /*#__PURE__*/_interopDefaultLegacy(Slider);
var PlayCircleOutlineIcon__default = /*#__PURE__*/_interopDefaultLegacy(PlayCircleOutlineIcon);
var PauseIcon__default = /*#__PURE__*/_interopDefaultLegacy(PauseIcon);
var VolumeUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(VolumeUpIcon);
var VolumeMuteIcon__default = /*#__PURE__*/_interopDefaultLegacy(VolumeMuteIcon);
var Modal__default = /*#__PURE__*/_interopDefaultLegacy(Modal);
var DownloadIcon__default = /*#__PURE__*/_interopDefaultLegacy(DownloadIcon);
var PlayArrowIcon__default = /*#__PURE__*/_interopDefaultLegacy(PlayArrowIcon);
var Menu__default = /*#__PURE__*/_interopDefaultLegacy(Menu);
var MenuItem__default = /*#__PURE__*/_interopDefaultLegacy(MenuItem);
var LaunchIcon__default = /*#__PURE__*/_interopDefaultLegacy(LaunchIcon);
var queryString__default = /*#__PURE__*/_interopDefaultLegacy(queryString);
var Paper__default = /*#__PURE__*/_interopDefaultLegacy(Paper);
var ImageList__default = /*#__PURE__*/_interopDefaultLegacy(ImageList);
var ImageListItem__default = /*#__PURE__*/_interopDefaultLegacy(ImageListItem);
var ButtonBase__default = /*#__PURE__*/_interopDefaultLegacy(ButtonBase);
var NavigateBeforeIcon__default = /*#__PURE__*/_interopDefaultLegacy(NavigateBeforeIcon);
var CloseIcon__default = /*#__PURE__*/_interopDefaultLegacy(CloseIcon);
var useWebSocket__default = /*#__PURE__*/_interopDefaultLegacy(useWebSocket);
var ExpandMoreIcon__default = /*#__PURE__*/_interopDefaultLegacy(ExpandMoreIcon);
var TableRow__default = /*#__PURE__*/_interopDefaultLegacy(TableRow);
var TableCell__default = /*#__PURE__*/_interopDefaultLegacy(TableCell);
var KeyboardArrowDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(KeyboardArrowDownIcon);
var Grow__default = /*#__PURE__*/_interopDefaultLegacy(Grow);
var Badge__default = /*#__PURE__*/_interopDefaultLegacy(Badge);
var Fade__default = /*#__PURE__*/_interopDefaultLegacy(Fade);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var ArrowForwardIosIcon__default = /*#__PURE__*/_interopDefaultLegacy(ArrowForwardIosIcon);
var ArrowBackIosNewIcon__default = /*#__PURE__*/_interopDefaultLegacy(ArrowBackIosNewIcon);
var SendIcon__default = /*#__PURE__*/_interopDefaultLegacy(SendIcon);
var SmartToyOutlinedIcon__default = /*#__PURE__*/_interopDefaultLegacy(SmartToyOutlinedIcon);
var ContentEditable__default = /*#__PURE__*/_interopDefaultLegacy(ContentEditable);
var ReplyIcon__default = /*#__PURE__*/_interopDefaultLegacy(ReplyIcon);
var YouTube__default = /*#__PURE__*/_interopDefaultLegacy(YouTube);
var InsertDriveFileIcon__default = /*#__PURE__*/_interopDefaultLegacy(InsertDriveFileIcon);
var List__default = /*#__PURE__*/_interopDefaultLegacy(List);
var ListItemButton__default = /*#__PURE__*/_interopDefaultLegacy(ListItemButton);
var ListItem__default = /*#__PURE__*/_interopDefaultLegacy(ListItem);
var SupportAgentIcon__default = /*#__PURE__*/_interopDefaultLegacy(SupportAgentIcon);
var dynamic__default = /*#__PURE__*/_interopDefaultLegacy(dynamic);
var MoreVertIcon__default = /*#__PURE__*/_interopDefaultLegacy(MoreVertIcon);
var AccountCircleOutlinedIcon__default = /*#__PURE__*/_interopDefaultLegacy(AccountCircleOutlinedIcon);
var LocalPhoneOutlinedIcon__default = /*#__PURE__*/_interopDefaultLegacy(LocalPhoneOutlinedIcon);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$k = ".ChatOverlay-module_chat-overlay__iVuiF {\n  position: fixed;\n  z-index: 1300;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n}";
var style$j = {"chat-overlay":"ChatOverlay-module_chat-overlay__iVuiF"};
styleInject(css_248z$k);

var ChatOverlay = function ChatOverlay(_ref) {
  var children = _ref.children,
      childrenRef = _ref.childrenRef,
      handleOutSideClick = _ref.handleOutSideClick;
  var chatOverlayRef = React.useRef(null);

  var onOverlayClick = function onOverlayClick(e) {
    if (handleOutSideClick && childrenRef !== null && childrenRef !== void 0 && childrenRef.current && e.target.contains(childrenRef.current)) {
      handleOutSideClick();
    }
  };

  return /*#__PURE__*/jsxRuntime.jsx(material.Stack, {
    className: style$j["chat-overlay"],
    ref: chatOverlayRef,
    onClick: onOverlayClick,
    children: children
  });
};

var APIStatus = {
  OK: "OK",
  INVALID: "INVALID",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  ERROR: "ERROR",
  EXISTED: "EXISTED"
};
var KEYCODE = {
  DOWN: 40,
  UP: 38,
  LEFT: 37,
  RIGHT: 39
};
var ConversationStatus = {
  WAIT_TO_PROCESS: "WAIT_TO_PROCESS",
  WAIT_TO_COMPLETE: "WAIT_TO_COMPLETE",
  COMPLETED: "COMPLETED",
  PROCESSING: "PROCESSING"
};
var ConversationType = {
  GUEST_WITH_CS: "GUEST_WITH_CS",
  CUSTOMER_WITH_CS: "CUSTOMER_WITH_CS",
  CUSTOMER_WITH_SELLER: "CUSTOMER_WITH_SELLER"
};
var UserType = {
  CUSTOMER: "CUSTOMER",
  GUEST: "GUEST",
  EMPLOYEE: "EMPLOYEE"
};
var PHONE_PATTERN = /^(0|84|\+84)+(9|8|7|5|3)\d{8}$/i;
var getImageProxy = function getImageProxy(url) {
  return url ? encodeURI(url.replace(/\s/g, '%20')).replace("storage.googleapis.com", 'img-proxy.thuocsi.vn') : url;
};
var isNumeric = function isNumeric(value) {
  return /^-?\d+$/.test(value);
};
var printLog = function printLog() {
  if (getChatConf().isShowLog) {
    var _console;

    (_console = console).log.apply(_console, arguments);
  }
};
var isClientSite = function isClientSite() {
  return (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object';
};
var getChatConf = function getChatConf() {
  if (isClientSite()) {
    return window.buyerchat || {};
  }

  return {};
};
var setChatConf = function setChatConf(conf) {
  if (isClientSite()) {
    // const currentConf = window.buyerchat || {};
    return window.buyerchat = conf;
  }
};
var ZALO_URL = "https://zalo.me";

var img$o = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3crect width='24' height='24' fill='url(%23pattern0)'/%3e%3cdefs%3e%3cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3e%3cuse xlink:href='%23image0_1409_21885' transform='scale(0.00195312)'/%3e%3c/pattern%3e%3cimage id='image0_1409_21885' width='512' height='512' xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAgAAAAIAEAYAAACk6Ai5AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAACAAElEQVR42uzdeZzN1R/H8c%2b5s2AMhllsIfuSJDvZI1SyZFYhElKWSKKQbO2WEiopyyx3ZKlEyRoiW5Zkl90sdobZ7vn9Md2m9FOWmTl3eT0fD48ew8y973uJ%2bby/55yvEgAAcBdmTO/1rJeX/%2bL8my7VCwy0zPVoY8kXFCSf2iamFw8K0ifVIMubfn7SWGmVz89PDdCtRQoW1GF6p17v5ycj1DpZ7uenmkgxmVaggBSTqdIgb179m7yl2/v4SEWZpRrkzasiJY8c9/aWJRKkVxYooGdJH/WNp6faL77yQ4ECN42XLnnkF19fmSoL5GEvr5t%2b3vPSUVakpoqHXJPqV67c7NN0Y5mkx164oNpImvimp8tjEq%2baX7yoI%2bSalEhJkX3SXW%2b4elVVlqFqUVKSnJLnZcPVq/q4flK3vXBBvWUpqHwvXJAF%2bkFd6cIF/YwabOlz4YISW7ro8%2bdVNYtFL75wQU%2bwVbcVj4%2b3ndFvqlcSEs62K/LZ6R7x8SLN1BqVlmb6dx0AAGekTAcAAMCEIt2tMcGdAgPTxqaP83jtnnv0Fo/XZGuJEpa5oi1DSpbU3fQqW6977lEV1A8y%2bp57ZJr4q13Fi8uDuokuFxSkK0pxtT4wUD0uRWRuYKDp1%2bMu9DdyRp5KSJCV8ppExsereFVFXkxI0Mm6l3x34oQ8Kpv15ZMn1ReqmeXjEydsM/VJvfjoUcsz6h51%2bvhxzxZpy/X5EydO9474JKp3YqLp1wMAQE6iAAAAOCmrNTjYw6NwS5Hca0qW1Omi066UKycndTX9Qdmy%2bmdVR6WVK6ff0nNkdtmyUkGqyLvlykl1WS9Ly5ZVLcVHDuTJY/pVwAy9XJKk/LVrEic79aiDB2WNNFGNDx2SjbJKeRw8qD%2bXKfqhgwc9vpHe6vdDh9RztmnpkQcPxqm9UkmOHRMZrUYrm8306wAA4HZQAAAAHIr/4qjuYTOLFfM4acll%2baFKFdt9qrmeft99Stue1D9UqaLLq21S9r77JEjuU12qV1fF5Gupmjev6dxwE29IshRJSZG8sluPOnhQBqmv5cyvv0qC3qMq7tkjgTpaRfz6q%2bUHm4%2b%2bsmdPXHXP5LTce/eKhITExqanm44PAHBvFAAAgGyWsUe%2b8C/5il4%2bU6GCLdlSSSbXrCm91BxVtWZN/a20s22oWVNEhivfBx9U1aWnjPDxMZ0ayBL2sxXKyKt6/4ED%2bozMspTZulXqqqn6yNat6kPREr11q2eLPG9drrlt2%2bnebbd9UyspyXRsAIBrogAAANyhjCX4QWtEey%2bqUsX2ne1x24d166oDyk971qune8oL8nSdOuorOah%2brFxZrPKUzPD0NJ0acEghMld6p6Xp3uqKWPfsUZFyUNb//LOuK%2b%2bpDhs3enxkK5C%2bftOmuOW/PVLp%2bz172IIAALgTFAAAgP%2brUJu5kzv3y5/f8orXRdvYhg3V83JEz3joIekhz0iP%2bvXlY3lNzteqJWflOTUyXz7TeQG3UFkek6OXLulqqpnM3bxZxdnGSujGjbJEPra9vH69LSrP6bw/r1t3tl27DZ%2b9c/my6bgAAMdCAQAAbsp/8eIGPYbky%2bdx8nq16yfq1rWVFLGVatFCHpRnJKxhQ/WJVFeP1Knzn7ePA%2bA4mv5xe8a2skO/s2%2bflNQTZMW6ddJJrJb5P/zgOc62UjddtYq7IACAe6IAAAAXdc%2bLVmtwcJ48KTtEey5p2NBW3lZBpGVLNUt9JtKypZSTExLzwAOSIGESqfj3AHAHVaSTLLbZ5KhqLgN27ND9ZLPUW77ckkd3VdHLl%2bd5LmmaV%2bS6dUdVd/WFun7ddFwAQNbiGz4AcHKBm6L3hZZ/4AE5o7qqra1a6d/kLcnTsqXUkPqqQsOGqrMsknq5c5vOCcDx/Xl7xIvqQxn844%2bW9vp7Hbx8uSxSP3is%2bu67%2bCYhofNSd%2b0ynRMAcGcoAADAwZXSs3Q3nTv3tWk%2bz6VGNGyoZ0iALG7bVgaIj97bvr0MlbIytGRJ0zkBuD49QobL5qNHVTW9X7/13Xe2GmqyCvrmG998SS96N1y%2bnJUDAODYKAAAwEEUu7SwYtf2/v4pl1Pmprzerp28onpI3BNPyGd6k3qpRQvudw/AUelT0lZ2X70qM%2bUhmfz992qFGqYSv/oq%2bbhIauxXX13aGBISG3vunOmcAODuKAAAIIcVnRH5bPiMgIC06paXpOWjj4rVEqK3BgdLPr1FPd%2bqFYfuAXAZfxxKqCdJBf38xo1yUB1RpWNj5TvP5zzqWq2J4zuenbv39GnTMQHAXVAAAEA2CWoeeSXcp3BhfdSjvNQOCZHD0lS8Q0KkscyV9Q0ayB6ZL%2b0sFtM5ASDH2e9WcFzK6GHr10t7CZIoq9Vjn9qSvt1qPTMrJDR2fkKC6ZgA4GooAADgLtlP20%2beY0v38nz8celmedPWsWtXrugDwG26ccXAA%2bqI5e3Zs/XMXJNyF4%2bKOtuu3YbP3rl82XRMAHBWFAAAcMtW6Sba0zOgdtwLxS%2b3bq20aqj7demiP5XrUqptW9VSfORAnjymUwKAq9G/yKcyJilJTVLHtO9XX2kvGSN75s5NHC%2bSPm3ZMpGQkNjY9HTTOQHA0VEAAMBN%2bC%2b2WjufrFjR8oQOthULD5dZMkGOd%2b/OqfsA4CD8ZJwsPn1afOQJJbGxyj/9FS0zZ8avjPCNStq503Q8AHA0FAAA3J7/4sUNegzJl09NvT4tqVlYmDwn76tR3burXvKolKtf33Q%2bAMDt0b9IGT10/Xr5WR2xLJo1S0WKTt0dE5MQGxIaO//KFdP5AMAUCgAAbse/5vwt4TMqVVKj0z/VR55%2bWm2Xt9W2Xr1kiiwV/4IFTecDAGQxf5mm37h8WabrFbIzKkryyEH9ykcfJdQNqxhzYMcO0/EAIKdQAABwYdaY4E7e3oEBNpuXV7t2%2biVV1Da7Vy/1nsSpri1amE4HADCsqaySVVu36lWquWr%2b8ce5u4ikps6Zc2JiSEhs7LVrpuMBQFajAADgMvwXR3UPm1msmGWuClPT%2b/bVL6m98nqvXupxKSJzAwNN5wMAODa9Wd7S8%2bLj1Wdqhzr18cc6zdPPo8VHHyWO73h27t7Tp03nA4C7RQEAwGkFDI%2b%2bGpqnRg31iORWc3v31ikqTb3UtavqLIukXu7cpvMBAJzcG5IsRVJSZISaoHsvXqyeltEqZeLE%2bHdDQqKq/fST6XgAcLsoAAA4gVF6lLZYAoPvs%2b7r0bGjHiJTVOsXX1SP6f6yqEED0%2bkAAG4mURZJ4rp1sk83VC0mTkyo8Fvf8i8vWiQyWo1WNpvpeABwMxQAABzQH3v3N9mqe74dFibzVAMZMGyYRMlH4lupkul0AAD8lV4nQ2Tv4cNyRr0rq6dMydv4arB3/hkzjqru6gt1/brpfABgRwEAwLg/b8Pnlzzw2ms9eqgP9e9ydMgQWS2lZELx4qbzAQBwO/QxaSG54uJUbikks6ZPTxFv8ZZJky6qDuoLdeGC6XwA3BcFAIAcl7%2be1RocXKhQrkck3HPiiy/Kb3qqLOnXT1ZLQVldoIDpfAAAZKlQ%2bUC/f%2bGC9NEvql5TpqQ8lH5d5Zs06eLFzp0jI8%2bfNx0PgPugAACQ7YpdWlixa3t//9R8KXtTF/brJ/2kkT4zYIDESD81yM/PdD4AAHJUmlyWGleu6DmyRZ%2bdOjVlrGqefujtty9tDAmJjT13znQ8AK6LAgBAlis6I/LZ8BkBAWm9PD6WXi%2b8ICEyQz4eOJAr/AAA/B9/FAJSUn5Xoz77TPmnv6Jl/Pj4lRG%2bUUlxcabjAXAdFAAA7lpgsDUmuJOvr1TTbby8n39edkqkbjJsGAM/AAB34IYVAulPqWbpBydMOH8hJDR2/sWLpuMBcF4UAADuQMYp/QEBory8n35ajuuHtfcbb6iS8oMkFy5sOh0AAK5ET5D39YyzZ9VpWW7p8847Pq8l5fOaN3kydxkAcLsoAADcglW6ifb0DHgkfmfRpd27q4oSprqPHCnR8ro0v%2bce0%2bkAAHArb8kheevYMd1KWupzo0cnFldH0sd98YVISEhsbHq66XgAHBcFAICbCvoopk9EeIsWtrKSxzb3/ffVU1JPPXX//aZzAQCAvwiXvnJl7175VDe1dR00KCEp7MuY4KVLTccC4HgoAAD8qVAbq7VzvypVPM7p/LYv33lHDstFafLoo6ZzAQCA29BVjdcdv/lGRtp8dLGBAxMKhP0U89ChQ6ZjATCPAgBwY4WSrNbg4OLFLdf1Mx71xo5VHeSCGtG1q%2byR%2bdLOYjGdDwAA3Dk9ST6XIcnJckatkeOTJ9t%2bSJlg%2bWHcuHNLnxow74NLl0znA5DzKAAAtzJjeq9nvbwC1hQsdPndvn1Vb/2Rjh8zRs7Kc2pkvnym0wEAgOxjP0xQyqvBSo8Zk9hEJK3nhx9ydgDgPigAADcQlBhdIvToww/rb1W4KjBligyWmuq5KlVM5wIAAAblVR/Jvdu363HaR3UZODCxc%2bjSyCpr15qOBSD7UAAALijwYnT90PVly0pZywXlP2GCKP26Gh0cbDoXAABwYH%2bcHWDZKa96Pd%2b/f9zykJA58UeOmI4FIOtQAAAu4Y%2bl/al%2bXa/8OmSIrBIPfXrECNVZFkm93LlNpwMAAM5DL5ckKX/tmjoq0/VLr7%2be0C5o4%2bl8778v0kytUWlppvMBuHMUAIATCwy2WiOs1auL6JW6/6efymppJs1q1jSdCwAAuA69Qk2Xgjt36tf1lvQJPXueXRB62Vpg82bTuQDcPgoAwInc86LVGhycJ8/1h/VKj7KjRqkvpJE6%2b9JLslo85YqHh%2bl8AADAhYXIXOmdlibr5AH16EcfWYKSX/DwHT48bnnXInPir141HQ/Af6MAAJxAwLyYNhF7GjdW02Sa3vnJJ7JPNsniChVM5wIAAO5Lr5MhsvfwYcsKeVRV6t07vm/o9MioH34wnQvAzVEAAA6ogF6ou2k/P%2b81ybbkBW%2b9JX1VJ%2bX97LOSIGESqfj/FgAAOB6tXtejYmO9DnvZvF957rlT%2bTvsm73o7FnTsQBkYpAAHIj/pZj3w39s29byjKRJgWnTZLWUkgnFi5vOBQAAcKv0MWkhueLi1E6dKCNffjmhbljFqDKzZ5vOBYACADCqUJLVGhxcvLjHCBnnETJ9uszWw9WCxx83nQsAACCr6NZqrH568WIp4XnKc8BzzyWO73h27t7Tp03nAtyRxXQAwB0FlbJaw0Z26GCJ1O95zNyxg8EfAAC4KrVMv6Y%2bb9dOXUqtnLZqz56ALtHfRVQLCzOdC3BHrAAAcoD99P7klXqn15I335RTcr9u17%2b/6VwAAACm6CHygvpuzhy1WX2Y2rxv34TYkNDY%2bVeumM4FuDIKACAb%2bS%2bO6h42s1YtyzuWUSrvvHmc3g8AAPB3er7s0y8eOWL5WlVSuTt3jn83JCSq2k8/mc4FuCK2AABZSmsRpQLWWK3hFwcMsJyyNFO7169n8AcAAPj/VCepqCaWLq2v6Tlybu3aQB2jw/Xrr4tYrcHBHh6m8wGuhBUAQBYo6GeNCe5UsqRnSx3rKbNny2oJFq8mTUznAgAAcFb6Y/lWDv70k8dH6jHPo507xy0PCZkTf%2bSI6VyAM2MFAHAXAoOtMWHdO3XyfFsnej65fTuDPwAAQNZQveRRKVe/vs1Pn0sbs327/%2bLoTRFenTubzgU4M1YAALehUJu5kzv3y5/f0sxrrJ734YfqHflQt%2brSxXQuAAAAd6H3SU9d6/PPVW/1afpP/fpxeCBw6ygAgFvgv9hq7XyyYkXLRb0lPe%2bCBTJYaqrnqlQxnQsAAMBtVZS60m7/fsuH6TtkXseOcdUj2kV9/euvpmMBjowCAPgX/out1rCZTzxhmavPqbTZs2W1FJTVBQqYzgUAAIA/%2bMs0/cbly3K/ek7G9%2biREBsSGj1r/nzTsQBHRAEA/E3GabMB3%2biVHmXHjVMvS5x66OWXJUHCJFLx/wsAAICjCpRoidBavOQ%2bFfrBBwk7gsacvDp4sEgztUalpZmOBzgCBhpARIrOiHw2fEZAQKqvxwk5FBmpBsrTcrxlS9O5AAAAcIeaSqykrlmjzqZ/Lt%2bGhsavjPCNSoqLMx0LMIm7AMCtBQyPvhqap0aNVD%2bP0XJx82YGfwAAABfxx92Z9H0etSXfli2FW0ZNDBtQt67pWIBJrACAWwrcFL0v/HDXrjqX2iCfT5%2buWoqPHMiTx3QuAAAAZA89ST6XIcnJ8oW8qc/065f4fegD0Y9%2b8onpXEBOogCAWyg35dv9bcrlynXR5/I3frM%2b%2bECGSXH56NlnTecCAACAGXqIvKC%2bmzMn92k1NfXh3r1PTAwJiY29ds10LiA7UQDApfkvjuoeNrNYMct%2by0ApumiRvC171ZzatU3nAgAAgGPQz6oPpOmmTeqA9E/7oX37hNiQkNjYM2dM5wKyAwUAXFLhltHfhbasWtUWrrZaZi5ZIkOlrAwtWdJ0LgAAADiopnJUhp08KaLuVXsffzwhNiQkMuSXX0zHArISBQBcStBHMX0iwlu00Kukum46f76sloKyukAB07kAAADgJPxlmn7j8mU5pv31L6GhCUlhX8YEL11qOhaQFbgLAFxC4D3Rp8OXd%2b%2bu4%2bUDveLbbxn8AQAAcEfOynNqZL580l2lWAK/%2bsr/WIwKH9a7t%2blYQFZgBQCclNYiSgVqq4TrUaMkSKwSMWqU6VQAAABwUcVkl1o8ZUrCjpAxkUkDB4oolfE9KeA8KADgVP48zb/1lUcL/Dpzpjykx6mnO3c2nQsAAABuQqvX9ajYWJ%2bEq3tyVeza9ajqrr5Q16%2bbjgXcCgoAOIX89azW4OBChXKV0FZPvWCBrJZg8WrSxHQuAAAAuCe9RE2R9hs2eG1PqyIX2rU73Tvik6jeiYmmcwH/hgIADi3ooy%2brRkSUKaP3pp3Wl5cskSj5SHwrVTKdCwAAABARkavyqx5x8KBe6jFcFX/00cQmnXJHFThwwHQs4P%2bhAIBDKpRkjYkoVKeOZZc%2bo%2bd88416XIrI3MBA07kAAACA/0cfkxaSKy5OSqgVKuWxxxITQ0IiI7duNZ0L%2bCsKADgUfx2lQ3XTppYmlquWhxYvlt9kiZTKn990LgAAAOCWpMllqXHliu1zWaF8nnjibLvQqMjnV60yHQsQ4TaAcBD%2bl2LeD/%2bxbVu13JJiKbN0KYM/AAAAnJKn5JNtvr6qliTqVt98E3gxun7o%2bkceMR0LEGEFAAwLah7zQ7jPU0/pyjJZvp01S6zylMzw9DSdCwAAAMgSb0iyFElJUW%2bq3DpfWFj80ZCQ6DcWLjQdC%2b6JAgBGBDwTcyYs4sUX1U/ynAp/7z1JkDCJVPx5BAAAgGt6XjrKitRUXUQt1NW7dEnsExIS/X1MjOlYcC8MXMhRgUetMeFLhgyRWlpk7ttvm84DAAAA5Kimkia%2b6ek6Qnmp4r17J3YICYl8feZM07HgHjgDADkicEzMpYiIoUMZ/AEAAODWVounXPHwUK/qKF3zk08CpsSUDS83cKDpWHAPrABAtgrUMTpcv/66BIlVIkaNMp0HAAAAcETaX6J12OuvJ%2b4NXRjdbvRo03ngmjxMB4BrChxp9Qg/MWaMhEol6TNypOk8AAAAgCNT16Sq2t20qY81OKDq43nyJEXO37J73Q8/mM4F10IBgCwVWDWme9jb48bJahmqZr/6quk8AAAAgDNRi6W0utiwYd5ZwV5VX/TwSJo/f/fur1atMp0LroEzAJAl/rziHyet1fbhw03nAQAAAJzaC9Je/TBiRGCw1Ro%2b45VXTMeBa%2bAMANyVgA5Wa/izI0eqdVrLFfYqAQAAANlB36uUDBs8OHFzSEhUtfffN50HzokVALgjAbljqoX7DB7M4A8AAABkP3VVR8nRd98NeCRmR9i3zz5rOg%2bcEysAcFvstylRY2S81J440XQeAAAAwK00lTTxTU/XDysvfbRz58Q%2bISHR38fEmI4F58AKANySIC%2brNSywSxc1XarJRJYcAQAAAEasFk%2b54uGhzugO6pc5c/wvxbwf/mPbtqZjwTmwAgD/KmhB9OsRy9u10yvUVu01f75Y5SmZ4elpOhcAAAAAEXlDkqVISooM1ottDdq3T0gK%2bzImeOlS07HgmCgA8H/597Raw2s3b65CdDtJXLJEdZZFUi93btO5AAAAAPyT/kU%2blTFJSbJaPFVKmzaJnUOXRlZZu9Z0LjgWCgD8TaEka0xEoTp1PIrry3rYihXiKflkm6%2bv6VwAAAAAbkFTOS9NL17Uq1QhtebhhxMTQ0IiI7duNR0LjoEzACAiIoVbWq1dgkqXtsTrt2yJX3/N4A8AAAA4odVSUFYXKCCf6Ud08rJlgcHWmKdeLFfOdCw4BgoAN5e/ntUaHFyokM1P/5K6delSVVuGqs5BQaZzAQAAALhz6hn5TrwDAqSo7pt%2b8OuvCxSYNy8iomBB07lgFgWA27LGBHfy9s41WM/z9IuNldXygHq5YkXTqQAAAABkoSj5SHwrVfKu7FnGNnbRonJTvt3fplyuXKZjwQwKALejtYhSAW/rF7xWfvqp9JUIudK8uelUAAAAALLRITmmXm3c%2bOLxK20LrPv8c/tcYDoWcha/4W4msGpM97C3x42TOGmttg8fbjoPAAAAAAPiJUQiR49OUKEqSr3%2buuk4yBmsAHATASdjNof90qMHgz8AAAAAuU86yjcjRwa%2bH7MuLLFbN9NxkDMoAFycv47SobppU/WV/Ka%2bmDbNdB4AAAAADiBBwiRSKbkkdVWVTz4J%2biimT0R4ixamYyF7UQC4qEJtrNbO/apUsfSzNFJnFi6UkZJLznh7m84FAAAAwIFMlQXysJeXjpZ39dEvvwxaY43p7HX//aZjIXtwBoCLCRi%2bwP%2bpSkWLqnKpg9O/37hRhkpZGVqypOlcAAAAAByf/lAayYO//67mq3Vpm%2bvXT4gNCYmNPXPGdC5kDVYAuIhSepbupnPnVgVTV6a9v3gxgz8AAACA26VekB9l%2b7336qa6nEf/hQu5baBroQBwEUkhPt7Jn334obwte9Wc2rVN5wEAAADgvNTrckB9VK/exY5XmvqVmjzZdB5kDbYAOLmAAKs1IqJXL6W01nrGDNN5AAAAALge/bFSqmLPnokdQkIiX58503Qe3BlWADipQknWmIhCderIZD1LvzRliuk8AAAAAFxYXt1Of/Hhh/6Lo7qHzaxVy3Qc3BlWADiZYpcWVuza3t8/ZWnKqtQGW7bY9%2biYzgUAAADADbwlh%2bStY8c8U9OPyNKaNU/3jvgkqndioulYuDWsAHAaVmtwsIdHyvZU39QvIiMZ/AEAAADkuD8OG0/d5fmLtIyOts8ppmPh1vAb5SQCmncqVj3g7bfVhxIma7t0MZ0HAAAAgPtSv0oDWVmmTN4yskzV9PRMip//y%2b7lK1eazoV/xwoABxfUK2Z6%2bIz27dUZOaaHDB5sOg8AAAAA/MkmF1TlYcMCg60xYd07dTIdB/%2bOMwAclP9iq7XzyYoVLe/pR23BP/8sv8kSKZU/v%2blcAAAAAPAP/jJNv3H5cnpp1ddjSr1655aGhMz7YM8e07Hwd6wAcDCF2syd3Llf/vyWufqXdNvixQz%2bAAAAABzeWXlOjcyXzyNcb0kfExsbGGyNCe7k62s6Fv6OAsDBWJp5jdXzPvxQVssD6uWKFU3nAQAAAIBbNlhqqueqVBHRT3m0mTTJdBz8HVsAHMSfe2ZWa1HXY2NN5wEAAACAu6XHKKXPhoUl9gkJif4%2bJsZ0HnfHCgDDCrX58tvO/e65R1rqRPXIjBmm8wAAAABAVlG79RT5Yvr0gn7WmOBOJUuazuPuKACMGaVHaYvFo2Va/vRRs2fLqxIgXxUqZDoVAAAAAGSZGOmnBvn5eVbSJT3enjNHxGoNDvbgdvSGUAAYEvDLfbH7Rw0bJhPkpOrXrJnpPAAAAACQbQ7JMfVq48aBi/V7HjO5vbkpFAA5LCDAao2IqFlT/aSvy%2bWRI03nAQAAAIAcs13WqXJjxxZKssZEFKpTx3Qcd0MBkEMKt5x9pktQ3ryqmf7F9ta8eTJScskZb2/TuQAAAAAgx0yVBfKwl5dHgP7Vtm7ePG4XmLMoAHKIzS9XidQJkydzez8AAAAAbi%2bv3KfGlCunPfQRz/HvvGM6jrvgNoDZLKiU1Ro2skMHnaS1OrBggek8AAAAAOBo1Az9m%2brRvn18x7DXI1suXmw6j6tiBUA2KZRktQYHFy9uG6Hfk5c%2b%2bcR0HgAAAABwVDZPNVBP//TTgOEL/J%2bqVLSo6TyuigIgm1h6yxiPnlOnqmEySPX29zedBwAAAAAclXpGvhPvgAB1ILVK%2botcQM0ubAHIYgFdor%2bLqBYWppapC/q%2bqCjTeQAAAADA2dh2K6V3d%2b58tnBISPSuyEjTeVwFKwCySP56VmtwcKFC8rGqpWtMmmQ6DwAAAAA4K/W1fk/WT5kS1DzySrhP4cKm87gKCoAs4v2hPufZ4v33VUn5QZL5AwoAAAAAd8q%2bldpW3LO%2bXjhjhuk8roItAHfJf3FMeMTUZs0sw%2bS6LrlihSRImEQq3lcAAAAAyCpNlejcwcEJsSGh0bPmzzcdx1kxqN6hojO%2brvH4Fh%2bf1LCkxfm27typyskGWV22rOlcAAAAAOBq9DFpIbni4lKLpC1TKZUrX7zYuXNk5PnzpnM5G7YA3KG06lejfKuMGcPgDwAAAADZy77V2quN53H9%2bvjxpvM4KwqA2%2bTfMSZfyMXateVdtUUNGDDAdB4AAAAAcBfqtAyR6r16BRWMWhb2SIMGpvM4GwqAW7ZKN9GenpZtqobHmzNmyGrxlCseHqZTAQAAAIDb2CPzpZ3FYptoKaNGz5ghMmN6r2e9vEzHchYUALcoIDX%2bWvGHXn5Zruq%2b8vuDD5rOAwAAAADuSg2R7TKlatXAMX4RV64OGmQ6j7OgAPgPgRej64euL1tWVomHPj1ihOk8AAAAAIAMuoc8qd8YObLIhi/7RuwpVcp0HkdHAfBfvlCvWp6dOFF1lkVSL3du03EAAAAAABlUdekpI3x80h5IW63T3n3XdB5Hx20AbyLjyv8jj0g5NdDy4Xffmc4DAAAAAPgP78lW9XPr1gldQ9%2bOPMQcdyNP0wEcjzUmuJO3t/TUO1TJKVNMpwEAAIBrKFw4d24/P5GyZfPlK1pUpHRpX9/ChUWKFfPx8fcXyZPHw8PbWyR/fm/vvHkzv%2b7KldTUa9dErl9PT09JETlz5tq18%2bdFfv/96tX4eJEjRy5fPnNG5Nixq1cTEkS0zvgBuKVT0lt/OHGiyIwyvRY88IBI7z4ff5KaajqWo2AFwA0CK8U0DTswbJiclefUSO4vCQAAgFvj758rV/78Io89Vrx4rVoi9esHBVWuLFKvXkBApUoixYtnDPrZ5fz5lJQrV0Q2bUpM3LdPZOPGhIS9e0W%2b%2bebEiZ9/ziwIAHeg71VKhg0enLg5JCSq2vvvm87jKCgA/lAoyWoNDi5e3KO4vuRZZ%2b9e8ZR8ss3X13QuAAAAOBZPT6U8PETati1Rok4dkfDwe%2b9t0kSkYcPChe%2b7L/PXHc22befOHTokMn/%2b0aPr1olERR05smaNyNWraWnXr5tOB2SxyvKYHL10SXmmi/xSoUL8ygjfqKS4ONOxTKMA%2bEPAlpjp4TM%2b/1y1kYKyuls303kAAADgGHLl8vDw8hLp3r1s2ZYtRXr1qlChdWuRe%2b7x8QkIMJ3uzl24kJJy9arI7NmHD69YIfLRR/v2LVkicu5ccvLly6bTAVkkVnfSnT7%2bOKFpmEf0k717m45jmtsXAIGboveFln/gAXlZlbOc3LZN9sh8aWfh7ggAAABurlWrYsVq1BAZO/bBB7t2FSlVKm/eoCDTqbLPxYupqUlJIlOm/Pbb4sUiM2bs3790qUhKis2WlmY6HXCHmkqa%2bKanqxeUp%2bXzBx%2bMbxISOi911y7TsUxx%2bwIg4M2Y1WGpy5er9yROdW3RwnQeAAAAmBEQkLGHf8qUOnX69BFp0aJo0erVTacy59dfL1w4elSkT5%2bNGz/8UGTfvkuXTp40nQq4Qx9JpPiuXJkQHLo46pOHHzYdxxQH3J2UMwJqRz8fcenxx9VSFSDPvPaa6TwAAAAwo0mTwoXvv18kNrZJk2HDRO6/v2DBe%2b81ncq8oKCMuxaEh5cu3aRJ5taAHTvOnz9yxHQ64DYtkfslpXTpvNODy1S7tnFj0sL563edP3TIdKyc5oYFwCrdRHt65u2fVCnfqgUL5Cc5JTsCA02nAgAAQM4KC7v33saNRT75pEGD/v1F8uXz8vLxMZ3K8Xh5WSyeniKPPJKxJaJQoVy58uUTWbXqzJkdO7jlIJyLbimPyVvVqyctCmlU%2bdLHH4vExu7Z4z5/it2uAAgIeOy%2bhw707Kl%2bklOyo3t303kAAACQs4YMue%2b%2bJ5/M3NtvsSjFCVC3rkaNQoXKlhUpXz5//uLFRb777tSpbdtE0tO1ttlMpwP%2bnVouZ2RTUFDex5TyePLIkaQ9sbG7Yn/5xXSunOI2f9WV0rN0N507t3pRN9ZlWPIPAADgboYNu//%2bkJDMAgB3p127EiXq1ROZPbthw0GDMu%2bWADgD3UgP08Nff73clG/3tymXK5fpPDnFbQqAa4V8ziW3euEFmSRr5FCJEqbzAAAAIGcMH37//aGhIi%2b%2bWLly%2b/am07ie5s2LFHngAZEvvnjoIYoAOAs1RsZL7VKlLnS7nKfAY%2b5ze0CXLwD8Fy9u0GNIvny27dJSlg0ZYjoPAAAAcsarr2YM/gMHVq7crp3pNK6PIgBOaa8sUI%2b89pp9bjQdJ7u5fAFg2Zq86dqAl19WtWWo6uzKd24FAACASObgP2AAg78JFAFwJupxKSJzAwPVlesFktoPGGA6T3Zz2UMAi86IfDZ8RkCAbaby1SWiouSa1Far3GdvBwAAgLt57bVq1cLCGPwdRenSvr5FiohUr16oUJkyIl9/feLEzz9zWCAck7oupZRPzZpeJzuEV8s/Y0Zy8oIFu3Zdv246V1Zz2RUAqcU9PPSRl16Ss/KcGun6SzkAAADclX3w79%2b/UqUnnjCdBjdiRQCcwmopKKsLFPBe75FbXx440HSc7OJyBUCxSwsrdm3v769ekr3yTN%2b%2bpvMAAAAgaymV8cN%2bGz8Gf%2bdAEQCn0Fe1krMDBxYoMG9eRETBgqbjZDWXKwBSC6YeSR0%2beDBX/gEAAFyLffAfM%2bbBB7t0EenVq3z51q1Np8LtogiAQ/tNlkip/Pm9L3hG6HmudyaAy5wBkL%2be1RocXKiQZ159Rj0eGcmefwAAANfw1yv%2bDP6ugzMC4NA2yzo5%2b%2bCDrnYmgMusAMhVwlbA8/dBg7jyDwAA4Brsg/%2b4cRlL/Z99lsHfFbEiAA7pjzMBvIp6zreF9u9vOk5WcfoCoFCbuZM798ufXwqrMfqr5583nQcAAAB358bBv2fP8uVbtTKdCtmNIgCOSHWWL9TUAQMCg60xwZ18fU3nuVtOXwB4%2bHoXtVXt21dipJ8a5OdnOg8AAADujH3wHz%2b%2bRo1u3Rj83RVFABzKFFkq/gULyjY90DOhe3fTce6W0xYA5aZ8u79NuVy55Bc9Vl50nSUZAAAA7ubGwf%2bZZ8qVe%2bQR06lgGkUAHIn%2bTJ7T77z4osgq3UR7eprOc6ectgA43/5yRb/gp5%2bWC/KqtCta1HQeAAAA3B774D9hAoM/bo4iAI5AdZKKamLp0oEBcdHFIzp0MJ3nTjlhAWC1Bgd7eFiaSRHZMHiw6TQAAAC4PfbB/803a9R4%2bmmRHj0Y/PHfKALgEIaqKrYuQ4aYjnGnnK4ACAwW7eHboYNckklSrHx503kAAABwa24c/Lt3L1euZUvTqeBsKAJg1NuyV82pXTsw2BoTPqNhQ9NxbpfTFQA6Qn%2brdg8aZDoHAAAAbg2DP7IDRQBM0uV1LpntfCvSlekAtyogwGqNiKhZUymttd6yxXQeAAAA/Dv74P/WWzVrdu8u8vTTZcu2aGE6FVzVypVnzuzYIdKt2/r1778vkpycnp6aajoVXFagREuE1umTdQvbt/fdd65l2PMx0377zXSs/%2bI0KwDUXD1Iz%2bbKPwAAgKNj8IcJrAhAjkqQMIlUyjJTXbY40V3pHH4FgP/iqO5hM4sVs5yyNFO7jxyRkZJLznh7m84FAACAv7MP/m%2b/nTH4d%2bvG4A9zWBGAnKDnSXvZeP265c30VIm79974lRG%2bUUlxcaZz3YzDrwCwvGoROfv88wz%2bAAAAjumvg3%2bPHgz%2bcAysCEBOUJ1lkdTLndt2yqOLjurTx3Se/%2bKwBUC5Kd/ub1MuVy49U6qr%2b5591nQeAAAA/J3FopRSIlOm1KnTu3fG4P/ww6ZTAX9HEYAcsUyOStu%2bfe1zrOk4N%2bOwBcClRZeP%2bZ0KDlaPSxGZGxhoOg8AAAAy2Af/yZNr1%2b7dWyQ09N57Gzc2nQr4dxQByE6qtgxVnYOCLky6vN/Pu2NH03luxmELANubapTMeu450zkAAACQwcNDKYtFZMqU2rX79GHwh3OyFwGffFKvXv/%2bmX%2bugayggsRff%2bO4WwEc7hDAoOaRV8J9qlXTuzyWSLsdO0znAQAAcHf2Acl%2bxT8k5N57GzUynQrIGnPnHj68apXIoEFbtnzyiek0cBWW6trPlnj//XHLw1rFLN%2b923SeP3OZDnAjW5DHh/ILV/4BAABMsw/%2bH3xQp06fPgz%2bcE1PPVWmTLNmIi%2b%2bWLly%2b/am08BV2OLVjx7rHe8sO4cpAAKDrTHBnXx91Sl5QZ6OiDCdBwAAwF1lLvXPONyvU6dSpRo2NJ0KyF5Dh1atGhws0rBhUFCVKqbTwOlVkHv0xG7dCrecfaZLUN68puPYOUwBoC/qSh49wsPlN1kipfLnN50HAADA3dgH/w8/rFv3uedEgoNLleKKP9yF/XDLDz6oU%2be550T8/Ly9HWdsg9NZLQVldYECNr/ca9M/DA42HcfOYQoAaSfpkq9HD9MxAAAA3M2NS/2ffLJkyYceMp0KMKN4cR8ff3%2bRYcOqVg0JMZ0GTu%2b4LmGr1b276Rh2xgsA/8VWa%2beTFSuqqTJGXahb13QeAAAAd3Hj4M9SfyBT165lyz78sEiVKn5%2bJUuaTgOndUneVr82ahQYbI156sVy5UzHMV4AqG9t5W3ln3lGEiRMIpXD3ZUAAADA1Xh6KuXhITJtWr16zz/P4A/8P/aCbNSoatU4oQx37M851%2baXvu7pp03HMVgArNJNtKenWqm6iTz1lOk3AgAAwNX99XC/Pn1E2rcvUaJ%2bfdOpAMfWrFmRItWqiVSt6udXqpTpNHBeaofMfPppEas1ONjDw1QKYwWA/6X4icXWtWkjF%2bRVaVe0qKkcAAAAru7Gw/06dSpVij3%2bwO3p06dChUcfNZ0CTmu1lJIJxYsHztZbvLa1aGEqhrECwFJGfaIDu3Qx9fwAAACuzj74T51at27fvhzuB9yN9u1Llqxfn7sD4C7VUwtse8zNwTleAPgvXtygx5B8%2bfQP%2bmUV%2bfjjpl44AACAq7px8O/YsWTJBg1MpwKcm7e3xeLpKdKqVbFiNWuaTgNnpUvrnapW%2b/aBwdaY4E6%2bvjn9/DleAFgOXX87aWjHjqql%2bMiBPHly%2bvkBAABclZeXxeLhIfLpp/XrDxjA4A9khyeeKFGCe5fhTqli8rVUzZtXb9V5Pfe0bZvTz5/jBYCuqQYoL87RBAAAyCr2wf%2bTT%2brX799f5LHH7rmndm3TqQDX9NBDgYFVqmTeTQO4E2qgiEh4eE4/b44VAIVbLni7S1BQkLLqYrK9efOcfqEAAACu5sbB/9FHixdn8Aeyl4%2bPp2euXCJVqxYsyF0BcMfOSStJbN262KWFFbu29/fPqafNsQIgfX5qeGp4WJhY5SmZ4emZU88LAADgaux7kWfOrF9/4EAGf8CE2rX9/StUMJ0CTmuqLJCHvbzSaqcsSmkbHJxTT5tzWwCuyBnpHhKSY88HAADgYuyDv/2Kf%2bvWxYtzGBlgRrly%2bfJxM3PcLT1WXlEbXagACAy2WoODixRREVJDNahfP6deGAAAgKuwD/72w/3atClevFYt06kA91a6tK9v4cKmU8DpWSVEpEkT%2b5b57H667F8B0Fs/4%2bndsaPskfnSzpLjhw4CAAA4K29vi8XLS%2bSzzxo0ePFFrvgDjqREibx5AwNNp4DTWy2ecsXDI712yvNpY554IrufLvsH8vPSXHyefDLbnwcAAMBFZF7xb9Cgf3%2bRRx4pVuzBB02nAvBX%2bfJ5eXFTc2SZ0eoJOZf9c3O2FQB/nma4WmzSuXHj7H4hAAAAzu6vg/%2bAASKtWxcrxhV/wDHlzevpmTu36RRwFWqcLJOJDz9coMC8eRERBQtm1/NkWwGQWiV5derzTzzBqf8AAAD/zr7U//PPH3po0CAGf8AZeHllFHZAlvjjrgC5kry8bMsffzy7nib7tgBMVe3lQvv22fb4AAAATi7zdn4ZV/xbtChatHp106kA3IqkpLS05GTTKeBqbBf062pF9p0FkOUFQLkp3%2b5vUy5XLnlanpXfmzfP3rcHAADA%2bdgHf/vhfq1aFStWo4bpVABux9WraWnXr5tOAVej7pFB8l3r1n/O1VksywuACw9cjvbb%2bvDD4in5ZJuvb868TQAAAI4vVy4PDy8vkTlzGjZ86SUO9wOc2dmzycmXLplOAZfzxxx9yfPy%2bwVrN2qU1Q%2bf9VsAvtOD9dbs27MAAADgbOx7/GfOrF9/4ECRZs2KFKlWzXQqAHfjyJErV%2bLiTKeAq9InVYyu/NhjWf24WV8AFFHVVK9HH82RdwUAAMCB2Qf/WbMeemjgQK74A67k998pAJB9dFedTxZm/VkAWVYABDWPvBLuU62aGiPjpXapUjn79gAAADiO3Lk9PLy9RSIjGzUaMkSkZcuiRRn8Adeye/eFC0ePmk4BV6UayjtSqUwZ/5rzt4TPqFQpqx43ywoAPcDjYX2mdWszbw8AAIB59sF/7tyMPf6NGxcuXLWq6VQAssOmTYmJ%2b/aZTgFXp7qlh8o7WTdnZ10B8Ju8JXlatjTztgAAAJiTJ4%2bHR65cIvPmMfgDrs6%2b9P/MmWvXzp83nQauTs2TqZKUdXP2XRcApfQs3U3nzi2t5Yga89BDZt8eAACAnGMf/OfObdhw8GCRRo0Y/AFX9%2b23J09u2WI6BdyFXieNxb9Jk6y6LeBdFwBJl/I0uL6hcWPVUnzkQJ48pt8gAACA7MbgD7ivr746cWLTJtMp4C5UMflaqubNe77fxfL5D9Svf7ePd9cFgO6g6ngMY%2bk/AABwfT4%2bnp65cmUe7sfgD7iPo0evXo2PF9m%2b/ezZQ4dMp4G7sdxv6aHeufu5%2b%2b7PALBKH/0xBQAAAHBd9iv%2bc%2bZk7PF/6KGgoCpVTKcCkJM%2b/nj//mXLRLTO%2bAHkqG4yUKoaLADy17Nag4MLFVJPSgWpcf/9pt8PAACArJZ5uJ/9in9Q0H33mU4FICdduJCScvWqSGTkkSOrV5tOA7f1jVRVnWrWLKAX6m7az%2b9OH%2baOC4Dc1fQ5zxaNG8semS/tLFl2NwEAAADT8ub19MydWyQ6unHjoUNFGjbkij/grqZN27dvyRKRq1fT0q5fN50GbuuPudvr1dTY5FV3fvj%2bHQ/uuqEcVm83bmz6fQAAAMgq9j3%2b9qX%2b9esHBlaqZDoVABOOHbt6NSFB5KOP9u9fssR0GuAP/vK0unznc/idX7mfLl31hiZNTL9%2bAACAu%2bXrm3HFPyamceNXXuGKPwCRkSN/%2bWXuXJHk5PT01FTTaYA/nJUacubO5/DbLgAKtZk7uXO//PmluOyQ1x54wPTrBwAAuFM3XvGvWzcgoGJF06kAmBQd/fvva9eKfPvtyZObN5tOA/yduqgLSsWaNf0XL27QY0i%2bfLf79bddAFhe8bpoG9uwoawWT7ni4WH6DQAAALhdf72d38svc6o/AJEjR65ciYsTGT5827bPPzedBrgJqzwlMzw9PSYnD7g2tV692/3y2y4AVHM1VvY1bGj6dQMAANyufPm8vPLkEYmNbdx42DCRBg0CAytXNp0KgEn2U/67dl237r33RK5c4bA/OD7dWy/SHzRqdLtfd/tnALyjV%2boyt980AAAAmGIf/O17/GvXDgioUMF0KgAm2ff2d%2b26fv1774ns23fp0okTplMBt0YXUftVp7p1b/frbqMAGKVHaYtFFkl19UTNmqZfMAAAwH%2bxD/5Wa8YV/1q1/P3LlzedCoBJKSk2W1qayLPPbtw4ZYrIxo0JCXv3mk4F3B71oX5WouvW/XNOv0Wet/qJQc0rXt2ft2pVvUuWSLv8%2bU2/YAA5J1cuDw8vL5F7782bt3BhkdKl8%2bUrXFgkKChXrgIFRHx9vbx8fETy5Mn4vPR0rW02kevXM5r1K1fS0q5dEzl5Minp7FmR33/P2GN34kRSUmKiSGqqzZaebvpVAnAl%2bfNn/L1kv%2bJfs6a/f7lyplMBMClz8P/ppylTRJYtO3ly61bTqYA7tFoKyuoCBQq1uS/24O5Klc4tFRHZs%2be/vuyWCwCbp8chPb9uXSUiao7pVwsgK9m/UW7RomjR6tVF6tXLuO91vXoZp2FXqJA//z33iFgsSimVdc9r/4d4587z548cEdm0KTFx3z6Rdevi4/fsEfnxx7i43bszPw8A/ov97zOrNWPwr1GDwR9wdzcO/kuXnjy5ZYvpVO5B64z/ZuX3j/g7y6e6dPoz9epJcRH5IAsLAFVAasnpunVFZK7pFwngznh4KGWxiLRuXbx4zZoiISGlSjVqJNK8eZEiDzyQeaU/p3h7WyyenplLcu3/ff75ihUffzzzUB77bXiioo4cWbMmsygAADsGfwA3sg/%2bPXv%2b9NPkyVzxN4HBP/upA7qGHLKfBfDZZ//5%2bbf6wAHfxbwYlr5zp3pK6qmn7r/f9AsF8N9y5/bw8PYWeeqpMmWaNRPp3btChTZtREqVyps3KMh0uju3bdu5c4cOiUydunfvN9%2bIfPPNiRM//5zRMtubZgDugcEfwI0Y/OFO9G9STUbt2JEYEFo5qlL16v/1%2bf9ZAJTSs3Q3nTt30gs%2bT6SsuXzZft9B0y8UwM21alWsWI0aIuPGPfhgt24iJUvmzRsYaDpV9tmxI2MLwauvbt/%2bxRciP/%2bcmLh/v%2blUALJT5uDfpMmwYSI1ahQqVLas6VQATMoc/DdsyBj8T51i8IfLe146yorUVJ9RSZ7ecfnzH1Xd1Rfq5jey/M8CoFCSNSaiUJ06HqW06FabNpl%2bfQD%2bqWjRPHkKFRL54IM6dfr0EWncuHDhqlVNp8p59hUAs2cfOrRypcjIkb/8MneuyLVr6enJyabTAcgKBQrYD/dj8AeQgcEfENHP6sdti2rWTBwfljfm2rZtN/u8/7xdgErUYbr3gw%2bafkEA/ql162LFatYUWb26Vas333Tfwd9OqYwf3bqVLfvwwyI//PDII%2bPGiVSt6udXqpTpdADuBoM/gBvZB/9nntmwYdIkBn%2b4udqWJR5D/3tu/88CwGJRReVnCgDAkfTqVb5869YiX3zRsOGgQSIFC3p7%2b/qaTuV4ypfPl69YMZFly1q0eOMNkbZt77nHfkQKAOdgH/xZ6g/A7sbB/7vvTp26%2bfVOwE0U0nv1i1lQAEiUXqoH16hh%2bvUA7sx%2bZfv11x94ICJCZOzYBx/s2jXz5/HvvL0tFi8vkY8/rl%2b/X7/MFQIAHNeNg/%2bDDzL4A%2b6OwR/4F3nUd7LsrgoAqzU42MNDt5RtaqM7LyoGzLEP%2bG%2b/XbNm9%2b4ifftm3B4Pd8Z%2bG8S3365Zs0cPkZ49y5dv1cp0KgB/ZR/8Y2ObNBk%2bnMEfQMbgn5oq0qPHhg0TJzL4A/%2bPaqW7y7Fq1URG6VHactM5/6a/EFDbtsbSuGxZ1VJ85ECePKZfEOBObhz8u3UrW7ZFC9OpXIf9/R03LmMlxTPPlCv3yCOmUwHuzc/P2ztv3szBv3r1QoXKlDGdCoBJ9sG/e/f16ydNEvn%2b%2b1Ontm83nQpwUJ6ST7b5%2bhZueV/s4cI3P/3q5s1AvKWJSrjvPtOvA3AnDP45y/5%2bjx9fo0a3biI9elAEADnNPvhbrY0bDxvG4A/gn4P/8uWnTzP4A7cm/YJtTfrBm8/xNy0AbItFlFSpYvoFAO6Awd8s%2b/s/YUJGEdC9e7lyLVuaTgW4Nq74A7jR9evp6SkpIhERP/74zjsM/sCdUK%2bpLbZ/meNvWgCoM3qQjKQAALITg79jsf9%2bvPlmjRpPP00RAGQHf/9cufLnF1m0qGnTESNEHnigYMHSpU2nAmCSffB/6ql16959V2Tt2ri43btNpwKcky4u3VXUHRQA8oR0kPwUAEB2YPB3bDcWAU8/ze8PcLfsg/%2bCBU2bvvqqSJUqfn4lS5pOBcCka9fS05OTGfyBrKRWSX1d4rYKgIxTA/XPUkNeqljR9AsAXAmDv3Ox/3699Ra/X8CdunHwr1y5QIESJUynAmDSXwf/995j8Aey1HjZrH6tXFlE6/93w/B/FAD2UwM5/R/IOgz%2bzu3//f49/LDpVIBjY/AHcKPMwf/HH999V%2bTHHxn8gSz3x90ACrVZsLRzv%2bLFb/zlfxQAOl102pVy5UznBlwBg79ryVwRUKNGjx4ioaH33tu4selUgGMJCGDwB/B3/xz84%2bN//dV0KsC1qW9T2qRN%2bedc/88CYKEodR8FAHA3GPxdm8WilFIikyfXrt27t0hIyL33NmpkOhVgFoM/gBsx%2bAPmqFdVkuXjWygAROQZ3bNsWdOBAWfE4O9ebiwCgoNLlaIIgLu5cfCvVInBH3B39sG/c%2beM2/kx%2bAMGdJftMv6fc/0/VwC8IPfqe1kBANwOBn/35uGhlMUiMmVKnTq9e4t06lSqVMOGplMB2cs%2b%2bC9c2LTpa68x%2bAP45%2bC/bl18/J49plMBbqqY6iVf38oKgCr6dzWbAgC4FX8d/Hv0YPB3d/Yi4IMP6tTp04ciAK4pMDB37gIFMgf/ihULFLjnHtOpAJiUlJSWxuAPOBZVUB6Wev9aAPxxm4CuUk9Gly5tOjDgyP7f4M%2bp8LD7f0XAQw%2bZTgXcHfvgv2BBkyavvsrgD%2bCvg/%2b6dQz%2bgIMpI7v0jn9uAfjzvoBFultjgjsFBqZ/o8XTKz7edF7AETH4406kp2tts4m88MKmTdOmiXz55bFj69ebTgXcmszB337FP3/%2bf95UCIA7uXHwX7%2bewR9wVCkpaWlKFSp08WLnzpGR58//uQIgrajtccsSdu8B/w%2bDP%2b6GfUXAhx/WrfvccyIdO5Ys2aCB6VTAv2PwB3Aj%2b%2bAfEfHjj2%2b/zeAPOINcNVU7vShzzv%2bzALDUknc8vqIAAP6KwR9ZyV4ETJ1at27fviIdOpQsWb%2b%2b6VTA3wUF5c7t58fgDyDTjYP/hg0JCb/9ZjoVgFthq%2bf5rf7m/xQAOspSWUIpAAARBn9kr8wVAXXq9O0r0qZN8eK1aplOBXf318E/Y48/gz/g7i5fTk29dk2kU6c1a8aPZ/AHnJEaKmIZWrKk/ePMAqCedNezKADg3hj8kZO8vCwWDw%2bRTz%2btX3/AAIoAmHHj4F%2bhAoM/4O4uXUpNTUoSCQlZu3bCBJEtW86ePXDAdCoAd6SQPKWn/p8VAOo%2bXUge4zxfuCcGf5hkLwI%2b%2baR%2b/f79RVq3Ll68Zk3TqeDqihXLk6dQIZGvv27efNQoBn8AmYN/aOjatW%2b%2bKbJ169mzBw%2baTgXgbujeepos/z8FgHynissvxYqZDgjkJAZ/OBJvb4vF0zNzRUDr1sWKUQQgqxUv7uPj7y%2bycGGzZiNGiJQu7etbuLDpVABM%2busVfwZ/wMVY1HQJL1r0zw///IXCOlIS%2bBYA7oHBH44sswho0GDAAJFWrYoVq1HDdCo4u8zBP%2bNwPwZ/ADcO/tu2MfgDLqeWnidxmf/iZxYAhWSZXOBbAbg2Bn84E3sRMHNmgwYDB1IE4M7cOPjfey%2bDP%2bDuGPwBN9JUwnTdoCD7hxaRGdN7PevlJZPkB/EtWNB0PiA72Af/996rVatnTwZ/OJcbtwY0a1akSLVqplPB0TH4A7hR5uC/Zs2ECQz%2bgDtQ3WSz8g0IEFmlm2hPT0uhpIKFzl8ICpIECZNIpUwHBLLD8OH33x8SIvLUU2XKNGtmOg1wZ3Ll8vDw8hKZM6dhw8GDRVq2LFr0wQdNp4KjueceH5%2bAAAZ/AJkuXrxx8D937tAh06kA5Ig9Ml/aWSxBzU9fLZbX399iOZ8%2b1uPVzCUBgCvp1q1s2RYtRAYMqFy5XTvTaYCs4e1tsXh5ZWwNGDBApHHjwoWrVjWdCqZlDv7NmjH4AxD5%2b%2bA/fjyDP4DChS3KV%2bXVVwMDTUcBslLlygUKlCghMnZs9epduphOA2SP3Lk9PLy9RebObdjwpZdEGjWiCHBHNw7%2bpUrlzUutD7i3Gwf/7dvPnTt82HQqAEZZLZVtvwUGWnSU5UU1mr3/cA0%2bPp6euXJlnp5uXzINuLK/FgGDB4s0ahQUdN99plMhu9kH/0WLMm7nx%2bAPgMEfwM3oWDXOMsnPz6If1aGqpp%2bf6UBAVhgy5L77nnxSpHz5fPmKFTOdBshZefJ4eOTKJTJ3bqNGGSsCKAJc0Y2Df8mSefOyjg9wb/bBPziYwR/A/6eP6yelUsGCFstgFSP3sgIAzs2%2b1/XZZ8uXb9XKdBrArBuLgIYNg4KqVDGdCneLwR/AjS5cSEm5ejVz8P/lFwZ/AP%2bfZZq6rr/087Po8bZiMr5AAdOBgLsxalS1ahERmYejAcgsAubMyTgjoF69wMBKlUynwu1i8AdwI/vgHxKydu2ECQz%2bAP6b7qeC1GcFClhkhFony9kCAOdUtmy%2bfEWLirRpU7x4rVqm0wCOKW9eT8/cuUWioxs1GjpU5KGHWBHgDOyD/%2bLFDP4AMnDFH8Cd0g/rUZKvYEGLaiLFZBorAOCcnnuuYsXHHhOxWJRSynQawLHZD8mcN69hwyFDRBo0CAysXNl0KtyoRImMQd8%2b%2bNs/BuC%2bzp5NTr50SaR9%2b9Wrx4wR2bHj/PkjR0ynAuBMVFE1W%2bf287NIqhSS73x9TQcCbof9imZwcKlSDz1kOg3gXOxFgH1rQK1a/v7ly5tOhTJlfH2LFBH5%2buvmzUeNYvAHkDn4d%2by4evW4cSJ79ly4cOyY6VQAnJH%2bXL%2brmufNa9H71Wj5xsfHdCDgdrRuXaxYzZqZe5wB3L58%2bby88uQRiYlp3PiVV0Rq1vT3L1fOdCr3Yx/8Fy5s1uy110SKFcuTp1Ah06kAmHTj4P/bbxcvHj9uOhUAp9ZKjZFvfXws0lW8ZXOePKbzALfjiSdKlKhb13QKwDXcWATUqFGoUNmyplO5vhsH/6JFGfwBd5eYyOAPIHuozuItP%2bfJY1ENdQ3pzgoAOAcPD6UsFpFGjQoXrlrVdBrAteTP7%2bXl4yNitTZpMmwYRUB2YfAHcCMGfwDZrr5%2bQLr4%2bFikjgyWzygA4ByqVvXzK1VKxNc34wwAAFmPIiB72O9awuAPwO7GwX/vXgZ/ANmkqMSqZ/PmtUgbyS272QIA58BhZUDOsRcB0dEZWwOqVStYsHRp06mcT%2bbg37Qpgz8AEQZ/ADlP95B3tSpVyqJbSIzU51oqnEPFigUK3HOP6RSAe/Hz8/bOm1fkyy%2bbNn31VZHq1QsVKlPGdCrHV67c3wf/IkXy5ClY0HQqACbZB/8OHVatGjuWwR9AzlEtxUcO5MljUd9Ld5ns6Wk6EHArSpf29S1c2HQKwD0VKJCxIiA2tkmT4cMpAm7GPvgvWMDgDyBDQsL16xcvZg7%2b%2b/ZdunTihOlUANyRRebJE3oqBQCcA/fFBsyzFwHR0Y0aDR0qct99GWdzuDsGfwA3sg/%2b9qX%2bDP4ATLPoFeKllIeH6SDArbDvSQZgXqFCuXLlyyfy5ZcZKwIqVy5QoEQJ06lyXuZS/2bNRoxg8Afw98GfK/4AHIlFVounXKIAgHPIm9fTM1cu0ykA/JW9CFiwIOOMAHcpAsqXz5evWLHMwb9w4dy5/fxMpwJg0v8b/E%2beNJ0KADJZ1AYKADgPLy%2bLhQ0rgGPy98%2bVK3/%2bzMMCK1bMn98VD%2b20D/4LFmTczo/BH0B8/PXrFy4w%2bANwfBZZJZ5ymQIAzuH69fT01FTTKQD8m4CAjCLAfr/7SpVcY0XAX6/4M/gDEPn74G/f48/gD8CRWUwHAG7H1atpadevm04B4FbYiwD71gBnXRFQoUL%2b/MWLZw7%2bQUEM/oC7u3Hw37%2bfwR%2bAc7BIM0mTfOnppoMAt%2bL8%2beTky5dNpwBwO%2bxFwJdfNm06fHjmlXRHZx/87QUGgz%2bAU6euXTt3TqRt25UrR49m8AfgfCy6gaRJfgoAOIfff796NT7edAoAd8I%2bQC9alHFoXsWKGQO2o6lSxc%2bvZEmRr75q1mzkSAZ/ACInTyYlnT0r0qHDqlVjxogcOXLlSlyc6VQAcPss0pQCAM6Df3AB5xcYmDt3gQIZV9Zfey3zSrtp993n51eqlMiCBU2avPpq5t0NALivzME/43A/vg8B4LQClVUitLaohyVVawoAOIc9ey5cOHbMdAoAWcFeBMTGNmkybJhI6dK%2bvoUL53wO%2b%2bD/5ZdNmgwfzuAP4J%2bD/%2b%2b/M/gDcHKBtigJ1doineUr9Xxamuk8wK34%2befExH37TKcAkJWKFs2Tp1ChjEP2RozIuSKgalUGfwB/x%2bAPwFXpPy75W/QjMksGUADAOdiX3sXFZZy%2bC8B1FCuWUQTYtwaUKpU3b1BQ1j9P5uCfcbgfgz%2bAEyeSkhITGfwBuC5VVMXqUK0t6gcJlZ%2b4sRqcy/ffnzq1bZvpFACyQ/HiPj7%2b/pmHBd57b9asCLhx8C9Y0Nvb19f0qwVgUubgv2oVgz8Al3afbq%2bW2GwWWSrXpeq1a6bzALdj0aLjxzduNJ0CQHayFwELF97digAGfwA3unHwP3qUuwwBcG26gfJUgenpFvlZ3pMeSUmmAwG3Y8OG%2bPg9e0Ti49kKALg6exGwYEHGAH/PPT4%2bAQH//XX331%2bw4L33MvgDyGQf/Nu3z7idH4M/AHdheULStSU93aLXqW0yiwIAziU9XWubTWTWrIMHly83nQZATihRIm/ewECRr75q3nzkSJGSJTM%2bvpF98J8/P%2bNwPwZ/ADcO/seOXb2akGA6FQDkHF1HbJIvPd0isyVFarMFAM7ps88yCoCkpLS05GTTaQDkBPsKAPsZAfZioFq1ggVLl2bwB5CJwR8AMuiuKlwvS031yPtUp4/vX96pk6yVVClSsaLpYMDtuH49PT0lRcTPL%2bMb/dq1AwIqVDCdCkBOyJ/fy8vHR6Rt23vuqVtX5KmnypZt3jzj74O8eU2nA2ASgz8A/J1KVw9I/vPnLeIl56TVlSumAwF347339uxZsIAzAQB3VKyYj0%2bhQiIFCmQUAgDc1/HjGYN%2bu3YM/gDwV%2bp3vVvKXrtm0cf1k7otIxOc2%2bXLqanXrom89dbu3fPnm04DAABykn3wb99%2b9eqxYzM/BgBk0F4SovwvXbKotywFlS8FAFzD3LmHD69aJfLdd6dObdtmOg0AAMhOhw9fuXLmjEjbtitXjh7N4A8AN/WivCqvXbhgkQX6QV2JAgCuQeuMHwMHbt788ccicXFsCQAAwNXYB/8OHVatGjtW5NSpa9fOnTOdCgAcl/ZVB9XhCxcs%2bhk12NKHEQmu5ezZ5ORLl0R69tywYfJkkeTk9PTUVNOpAADA3bhx8D99msEfAG5JF9tOW9/ERIus1UpfpgCAa9q0KTFx3z6Rnj1/%2bmnyZJG0NK3T002nAgAAt4PBHwDujupr8VZ14%2bMtlheUTVacP286EJCd7GcCDB26deusWZlbBQAAgOM6dOjy5dOnGfwB4G5Z6thaq2pxcRbtL0p9znEpcA9z5hw%2bvHKlyODBW7Z8%2bilFAAAAjihz8M841Z/BHwDuTlpj9bBefPSoRZf3fM4yMi7OdCAgJ9nvFvDSS1u2zJxJEQAAgCM4ePDvg/%2bZM9eusU4VAO6e52GPIvL24cNKZJVuoj09A5vE24rlTU6WPTJf2lkspgMCOalr1zJlmjcXeeedWrWeeUZEqYwfAAAg%2b9kH/44dGfwBIDskJOR78MLm3LktIs3UGpWWpgfLZWnD4iq4p9mzM7YGjBixffucOawIAAAgJzD4A0A2q6I7yGKbTeTRCksPJif/eaVfXZDxemZ8vOl8gEkff3zgwLJlIiNH/vLL3Lmm0wAA4Joyl/qvWjVmDIM/AGSbrywhesP16/YPM5f6J8oTksZZAICIyIwZ%2b/cvXSoyYsQvv8yZYzoNAACu4cCBy5dPncoc/OPirl/nZtQAkH30Xt1Mtl69av84swCoImHK7/Rp0wEBR2IvAlgRAADAnbMP/h07ZtzOj8EfAHKGeld/L49kbvX/swDQafK4fu34cdMBAUc0ffr%2b/d9%2bKzJqFEUAAAC36q9X/Bn8AcCA%2bmqY5Dl1yv5h5hkAu2WI5KMAAP7NtGkZRcDrr%2b/YMW%2be6TQAADim/fsvXTp5MnPwj49n8AcAI95QnVX133%2b3f/hnAWCrrLZKEQoA4FZ89NG%2bfUuWZBQBkZGm0wAA4Bjsg3/HjqtXjxvH4A8AptlSdGm96sAB%2b8eZKwBqpY%2bVmhQAwO346KN9%2b775RmT0aIoAAID7%2bvXXCxeOHhV54olVq954g8EfAByFGqj6yvGdO%2b0f/1kAeOfLnez9%2brFjpgMCzmjq1Iwi4I03du6MijKdBgCAnGEf/J98cs2a8eNFzp1LTr582XQqAICdrptrkhzZvt3%2bsbrxEwJOxrQMP3j1qqouPWWEj4/pwIAzGjLkvvuefDLzvwAAuBIGfwBwcIESLRFaJ%2bwJXRjV1vLnhX/LPz5xuUyVhMOHTecFnNk77/z665dfirz77p49CxaYTgMAQNbYvZvBHwCcgV6utFS%2bdu3Gn/9nAbBf9shLBw%2baDgy4grff3r17/nyR997bs2fhQtNpAAC4M5mDf8bhfgz%2bAODY1Od6uh559uyNP//PAmCjrFIeFABAVnrrrd27Y2NF3n%2bfIgAA4DxuHPzPn09JuXLFdCoAwH96TV5UCUeP3vjT/ygALCelj63boUOm8wKu6M03M4qAiRN/%2b23RItNpAAD4/3btOn/%2b998Z/AHAWdl%2b0SXU5L17b/z5f64AKK52qn4UAEB2mjBh1y6rVWTSpN9%2bW7zYdBoAADLYB/9OnTL2%2bDP4A4CT%2bl0npHXYuvXGn/5HAaA8RHn6sgUAyAnjx%2b/aFRMjMnkyRQAAwBwGfwBwLXp6nu5ej6xde%2bPP/6MAiFv%2ba3CZuKNH9XJJkvL/PDUQQNYbNy6jCJgyZe/er74ynQYA4C527jx//sgRBn8AcBmByioRWp9b2q7RvA9%2b%2b%2b3GX/7nFgAZrUYrm021V59L6j/3DADIPmPH7twZHS3ywQd79379tek0AABXZR/8g4PXrJkwgcEfAFyGTZ/Vla5cEVFKROsbf9ly0y/8Xk7q1/fsMZ0fcEf2IuCTTw4cWLbMdBoAgKtg8AcAFxcgn6utp0/f7JdvWgDo0nqnpRkFAGCC1hk/Xntt%2b/Y5c0Q%2b/fTAge%2b%2bM50KAOCsduxg8AcAt5Aqe2XQzc/0u2kBYHleZutuFACASfYi4NVXt2%2bfPVtk5syDB7//3nQqAICz%2bOvgzx5/AHB9tuGWj/WYf57%2bb3fTAsC2Xe%2bypVAAAI7AXgQMH75t2xdfiHz2GUUAAODmbhz8L1xISbl61XQqAEB283g6rZen/803Ed%2b0AEjcbGliW3vokP5FPpUxSUmmXwiAzCJg2LCMImDWrIMHly83nQoA4Ci2bDl79sABkY4dV68eO5bBHwDchfaXaB2mdfz5va3Kttu48Wafd/NDACUkJDY2PV2mqmuyYtcu0y8IQCZ7EfDKK9u2ff65yOefHzr0ww%2bmUwEATNm8OTFx/36R0NC1a998U%2bTy5dRUbuYMAG7kQUmQOhcv2u/qd7NPs/znAx3Wj0uz7dtNvx4A/2QvAoYO3bp11iyRL76gCAAAd2If/MPCfvzxrbcY/AHAXak0qaoePHTovz7vvwuAH1QZ9ToFAODI7EXAyy9nFgErVphOBQDILj//zBV/AEAm/bv6yvbqli3/9Xn/WQDomelLbQ9v22b6BQH4b38tAj77TGT27MOHV640nQoAkFXsg39YWMbgf%2bVKWtr166ZTAQBM07a0x/Sumx/%2bZ/efBUDBowWGXZywa5c8Lx1lRWqq6RcG4L/9tQiYOVPEav399x9/NJ0KAHCnGPwBAP8mT2PPlvr8d9/91%2bepW33AgJ3WZuF9d%2bxQD%2bs%2bcr5aNdMvEMCt8/BQymIRmTKlTp3evUWCg0uVatTIdCoAwH/ZtCkxcd8%2bkfDwtWvfeovBHwDwd/qUtJXdV68meoX6RO3y9f2vz//vMwD%2boH7WbSV80ybTLxDA7UtP19pmE%2bnf/%2befZ8wQiY09epQVAQDguBj8AQC3ZKW8qnIfPnyrn37LBYD2V/eoFRQAgDO7sQiYP//o0XXrTKcCANjZB/%2bwMAZ/AMB/U5%2bq%2buL788%2b3%2bvm3XAB4fGQrkL6eAgBwBfYioF%2b/n3%2bePj2jCFi/3nQqAHBfGzcmJOzdmzn4X73K4A8A%2bG%2b6vIhtxMKFt/r5t1wAxC3/7ZFK3%2b/ZI03lvDS9eNH0CwVw9/5aBEybJvLll8eOUQQAQM5Zty4%2bfs%2bejNv5MfgDAG5ZoERLhNaJ40XSp/336f92t1wAiIxWo5XNpgurmdLyv%2b8vCMB52IuAF17YtGnaNJEFC44d27DBdCoAcF0//ZRxxb9Ll3Xr3n1X5Nq19PTkZNOpAADOQn8rR/VjCQkiISGxsenpt/p1t1EAZFBxtrESunGj6RcMIOvduCJgyZITJzZvNp0KAFzHjz/Gxe3ezVJ/AMBdOqqUuvzLL7f7ZbddAMgS%2bdj2MouEAVeWmmqzpaeL9Oq1ceOUKSLffnvyJEUAANy5zCv%2b69e/9x5X/AEAd0d9aCuiSn/99e1%2b3W0XALaoPKfz/rxunYTIXOmdlmb6hQPIPplFwE8/ffCByLJlJ09u3Wo6FQA4jzVr4uJ27crY4//mmyJJSWlpDP4AgLuV8n16hLSeN%2b92v%2b62C4Cz7dpt%2bOydy5fFS12UTbe/5ACA80lJsdnS0kSeeeannyZNoggAgP%2byevWZMzt3Zuzxf%2b89kevX09NTUkynAgA4vT8O5b94sXPnyMjz52/3y29/C4BduO0T3W/tWtOvH0DOsa8I6Nnzp58mTxb5/vtTp7ZvN50KAByHffDv2nX9%2bvffZ/AHAGQtPUlq6rq7d9/p199xAaBOSpRlPQUA4I7sKwJ69NiwYeJEkWXLTp1iRQAAd7Zqlf2Kf8YefwZ/AEC2CJL7LH2//fZOv/yOC4Drb1uqpH78449SRTrJYpvN9PsAIOfZi4CePTdsmDxZ5LvvTp3ats10KgDIOfbBv2vXjME/OTk9PTXVdCoAgKuyPeG52id09uw7/Xp1twEC77U2CR%2b2bZtc1X3l9wcfNP2GADAnVy4PDy8vkS%2b%2beOihQYNEmjcvUuSBB0ynAoCsx%2bAPAMhRaUpJjStXEs6HhEQNyZfvTh/mzs8A%2bIPuJ5ul3vLlpt8PAObZvwHu2jXj0Kvly0%2bf5owAAK7khx9On/7ll8zD/Rj8AQA5Iq%2btkVS/%2b%2b%2bs77oAsOTRXVU0BQCATPatAd27r18/aRJFAADnt3LlmTM7doh0755x9klKis3G4A8AyDGfe0yWz6Oj7/Zh7roAyPNc0jSvyHXr9HJJkvLXrpl%2bXwA4Dvs3yM88k3FGwI8/xsXd%2bZmlAJDzVqzIuOLfrVvGqf5c8QcA5KhAZZUIrT0P5f7%2b8ouff363D3fXBcBR1V19oa5fl1/FKtfXrTP9/gBwPPbTsDt3Xrfu3XcpAgA4Pvuhpgz%2bAACj/PV0WX769Onebbd9Uysp6W4f7q4LADvVUD0tTdgKAODm7EXAU09l7J1dvz4%2bfs8e06kAIJP9ir995ZJ9SxMAAEa8qlbJ%2b6tXZ9XDZVkBYOlp87NNWrrUyJsCwKlcu5aenpwsEhHx44/vvCOybh1FAACz7If7deu2fj17/AEAjkI/nF7TI3T69Kx6vLu%2bDeCNAtbEvBH28%2bHDqpNUVBNLl87ZtweAM8qTx8MjVy6RefMaNRoyRKRhw6CgKlVMpwLgDuyD/9NPM/gDAByHniSf6xeSkxM7hy6Nfih37qx63CxbAfCncrqveC9ZkqPvDgCnZl8R0KVLxhkBmzYlJu7bZzoVAFdmvzsJgz8AwBEpJcVUjx07svpxs7wAUAMtK8WfAgDA7bt6NS3t%2bnWR0NC1a998U2TDhoSE334znQqAK/n225MnN2/OGPzff5/BHwDgmPQKGadr3v1t/26U5QVAgUa%2b1S82W7VK/GWafuPy5Zx5ewC4kqSktDT7GQFvvy3y008JCXv3mk4FwJktWXLixObNIs8%2b%2b9NPU6aIpKbabOnpplMBAHCDP277lzgzWbx%2b%2bPjjrH74LC8ADvZ/tMLSg8nJeqBcVMd/%2bCFn3iUArsheBDz11Lp177wjsnXr2bMHD5pOBcCZfPPNiRM//yzSq9fGjQz%2bAABHp/voX%2bTFY8dEuhaZE3/1alY/ftafAfAHtUINU4lffZW9bw8Ad3D5cmrqtWsiISFr106YILJtG0UAgH/39dcnTmzaJNK798aNH3zA4A8AcA4qTp2TrgsXZtfjZ1sBkGL1CvYKXrRI3pBkKZKSkl3PA8B9/LUIePNNigAA/2Qf/Pv02bjxww8Z/AEAzkJrERFbnVyVdfF33smuZ8m2AuCi6qC%2bUBcu6PwSJV5r1mTX8wBwP5cupaYmJWUeFvjLL%2bfOHT5sOhUAkzKv%2bP/0E4M/AMDpVFIPS%2bCpU2fbtdsQ/cypU9n1NNlWANjpRrJMPL78MrufB4D7uXgxowjo1GnNmvHjRbZvP3fu0CHTqQDkpEWLjh//6afMwT8tTWsGfwCAs9GNtI/yWrw4u58n2wsAj6fTL8vkRYukqaSJL/8kA8h69hUBISFr1kyYQBEAuIOvvjp%2bfNMmkb59N2786CMGfwCAc/N8PL2mPPPWW9n9PNleAMSvjPCNSoqLk%2bNSRg9bvz67nw%2bA%2b7KvCAgLW7v2rbdEdu%2b%2bcOHoUdOpAGSlxYuPH9%2b4MXOPP4M/AMCZ6c3ylloZH3%2bmQee9kVWy/zvXbC8A/lRCHbPUio3NsecD4LbOn09JuXJFpEOHVavGjBHZseP8%2bSNHTKcCcDe%2b/PLYsfXrGfwBAK5FL5bueto33%2bTU8%2bVYAeDhK5LaPCZGQmSu9E5Ly6nnBeC%2b7CsCgoMzzgigCACcj32Pf79%2bmzZNny6Snq61zWY6FQAAWcPzG1XYs8/YsTn1fDlWAJyZFRIaOz8hQU%2bSJPnphx9y6nkB4MKFlJSrVzO3Bvz228WLx4%2bbTgXg39gHf/b4AwBcUrJSut2ZM3HLQ0LmxOfcJaqc2wJgf0If1Vu/HxmZ088LAGfPJidfuiTSsePq1ePGUQQAjig29ujRH38Uee65jRunTmXwBwC4qH7SW%2b2Pjs7pp83xAkA1vd7YSy1YoE9JW9l99WpOPz8A2IuAJ5/MKAL27bt06eRJ06kA97Zw4bFjP/0kMmDAzz9//DFL/QEALipQoiVC61xJMiNt15gxOf30OV4AxC3vWmRO/NWrKkLul%2b9z7rADALhRYmJGEWA/LHDfvosXT5wwnQpwL/bBv2/fTZu44g8AcHU6VSqrbvv3n5gYEhIbe%2b5cTj9/jhcAf77w8mqC/m3OHFPPDwB2mUXA6tVjx1IEADkhOvr339euFXnuuU2bPvyQK/4AAPegqqsHRD780NTzGysAEseLpE9btkzC5HVZybfaAMyzFwGdOmXcNeDgwcuXT582nQpwLVFRR46sWSMycODmzTNmiNhsWmttOhUAANnseekoK1JTE2JFpT48bZqpGMYKAJGQkNjY9HTdSpro7vPmmcsBAH8XF3f9%2boULIu3arVr1xhucEQBkhcjII0dWrxZ58cUtWz7%2bmMEfAOBm2ujD%2boW1a%2b1zsKkYBguAP4zWHrr4Z5/ZD0MwHQcA7BISrl%2b/eDHjrgFjx4rs308RANwu%2b%2bA/aNCWLZ98wuAPAHBPKtayQ7UfMcJ4DtMB7AJ%2btj4UHrN%2bvXpM95dFDRqYzgMANypWLE%2beQoVEFi5s1mzECJHSpX19Cxc2nQpwTAz%2bAACIyKdqrp5x9mxCu5Cvo/MHBJiOY34FgN1JGaB%2b%2b%2bwz0zEA4GZOnbp27dy5zLsG/P77lStxcaZTAY6FwR8AgEzaT9dWOjradA47hykAVKTo1N0xMVJZHpOjly6ZzgMAN5NZBGRsDTh69OrV%2bHjTqQCzVq%2bOi9u1i8EfAAAREe0v0TpM69yLVKW0niNHms5j5zAFQEJsSGjs/CtXdDdVVkrMnWs6DwD8l5Mnk5LOnhVp3z5jRQBFANzRgQOXLp06JRIaumbNm28y%2bAMAICKiWmurTN269cTEkJDY2HPnTOexc5gCwM42Xz6wBE2dyqGAAJyFvQjo0GHVKlYEwF1cvpyaeu2aSJs2K1aMGCGidcYPAAAgIqOlsUfFV181HeNGDnMI4I0CVUx4eMsff5QAaS8BDRuazgMAt6pEibx5AwNFFi/OOCzwnnt8fMwf%2bQJkjeRkmy01VaRly%2b%2b/f/VVkb17L106ccJ0KgAAHIOeKa0kJTEx8YlQv6gvAwNN57mRw60AsLMt0gPV6unTTecAgNt1/PjVqwkJIk88sXLlG2%2bIHDuW8THgzNLTtbbZRIKDV68eP57BHwCA/0fNUd/LsRkzTOe4GYctAAoezV/wfKn58/U3ckae4ltnAM7nxImkpMREkSefXL163LjMrQKAM7Hv6e/RY8OGiRNFNm5MTNy3z3QqAAAcTFN9XXzT0xNifatfOD9mjOk4N%2bOwBcDB/o9WWHowOVn9Lhv1GVYCAHBe9jMB2rZduXL06MwVAoAju3HwX7r05MmtW02nAgDAQa2TSrre99%2bLZMyxpuPcjMMWAHZ6h9f3nu9MmyZvSLIUSUkxnQcA7pR9RUCnTmvWjB8vcvp0xu0EAUdy4%2bD/7bcnT27ZYjoVAACOTd8js3XSwIGmc/wXhy8AEsd3PDt37%2bnTepekSoDVajoPANytI0euXImLy7xrAEUAHAGDPwAAt09XUp/Ilb17EzeHTY3pt3%2b/6Tz/xeELgD/56TDb2IkTTccAgKxy%2bPCVK2fOZBYBZ85cu3b%2bvOlUcDcM/gAA3Dn1m%2b0Z5TtypOkct8ppCoDE8WF5Y65t2yaJskgS160znQcAskpmEbB6NUUAcop98O/encEfAIDbpQdKoq5/7lxCYlh4ZFRsrOk8t8ppCoA/7dMNVQtWAgBwPYcOXb58%2brRIx44ZRUBc3PXrFy6YTgVXc%2bPgv3Qpgz8AALfL1sXWWia%2b957pHLfL6QqAhAq/9S3/8qJF8p5s1dP27DGdBwCy2sGDGUVAhw6rVo0ZQxGArMHgDwBAFlgvSVL%2b2rVzJfeWqXj4zTdNx7ldTlcAiIxWo5XNpvOpWpZJ779vOg0AZBd7EdCxY8YZAfHxFAG4fQz%2bAABkoS/UIPGcMcM%2bl5qOc7ucsADIkNjh/Dnfk7Nny0BpImWPHzedBwCyy4EDly%2bfOpV5WCBFAG4Fgz8AAFnoeemofkxNTRh39Zz3iGHDTMe5U05bAIj07vPxJ6mp6l3x0j9PmWI6DQBkN3sREBKydu2bb4qcO5ecfPmy6VRwNAz%2bAABkgwhV2XbIahXprr5Q16%2bbjnOnnLgAyJD%2bee62Pg/MmCH9pY2c5dxsAK5vz54LF44dE%2bnYcc2aceMoApCBwR8AgGxQRTrJYpstpXbqaEv3fv1Mx7lbTl8AnG3XbsNn71y%2bLB30csn1wQem8wBATrEXAU8%2buWbN%2bPEi58%2bnpFy5YjoVchqDPwAA2ShIfSkTly69eLFz58hI57/g7PQFgF1aQ0taWq7335dQ%2bUC/z%2b5YAO7j118vXDh6VOTJJ1evHjeOIsBdMPgDAJCNAiVah2mty%2beP8pj47LOm42QVlykAzl8ICY2df/GiFFI/qfQPPzSdBwBy2u7dFAHugMEfAIDsp7vKAHl0xYrE8a0Xzt17%2brTpPFnFZQoAu5TRXmnexd97j5UAANyVvQjo1ImtAa6EwR8AgBwQKNESobVtjWeS70fdu5uOk9VcrgC4qDqoL9SFC7Jaysucjz4ynQcATNm16/z533%2bnCHB2DP4AAOQcvUMuye7vvju39MlHPx1w4oTpPFnN5QoAO68N3hu8N7z/vlSWx%2bTopUum8wCAKfYiIDh4zZoJE0QuXEhJuXrVdCr8FwZ/AAByUBXppL6x2VSEb0HvV1zvyr%2bdyxYAp/J32Dd70dmzOl666KHvv286DwCYtnPn%2bfNHjmQUAePHUwQ4KgZ/AAByng6XWnrx4sUJsY/N/0KdOWM6T3Zx2QLATt2vwtLnvPeePiYtJFdcnOk8AGDajh0ZRUBExI8/vv22yOXLqanXrplOhfR0rW02Bn8AAHJUU0nTudPTUz5Xw3y29%2bxpOk52c/kCICE2JDR2/pUr8onUkXVvvmk6DwA4ii1bzp49cEAkNHTt2jffFLlyJS3t%2bnXTqdyPffDv0WPDhkmTGPwBAMhJeobykqpz5lzaGBIyc/C5c6bzZDeXLwDsEvur8WnVP/pIz5d9%2bsUjR0znAQBHQRFgBoM/AADm6OFKSZGUlNxjRNI39u1rOk9OcZsCQCQkNHZ%2bSoqUkzbiPXas6TQA4Gg2b05M3L9fJCyMIiA7MfgDAGCex3u2eqr%2btGknJoaExMa6z2ZINyoAMiQWV0fSx33xhV6hpkvBnTtN5wEAR/PzzxlFQOfOGWcEXL1KEZAV0tK0Tk9njz8AACbpX1SUjElKijtRuMTJ4JdeMp0np7ldASASEhIbm56uj%2bgi6r6BA02nAQBH9dNPCQl794p06LB69dixIgkJ169fvGg6lfO5di09PSUl49DFd94RWbbs5MmtW02nAgDAPamBEq7qDB0q0kytUWlppvPk%2bOs3HcC0gOExi8IfWrhQfSLJUrJ9e9N5AMBRlS7t61u4sEhUVOPGQ4eKlCnj61ukiOlUjuv06WvXzp0TCQ/PWEmxZ8%2bFC8eOmU4FAICb%2bkLNks1HjyY8GrIs6uC995qOY4obrgC44Q24x/M1VWrwYD1JPpchycmm8wCAozpy5MqVuDiRFi2%2b/374cJHZsw8fXrnSdCrHY7/C37Tpd9%2b98gqDPwAAjkB1tuzXZSIiTOcwzcN0ANOuLrHG79p1/rzPQyGn7n80Xz61TtrL7oceMp0LABxVSorNlpYm8v33p05t2yZy6NDly6dPi9SpExBQoYJI3ryenrlzm06Zc86fT0m5ckVkxIjt22fPFnn99Z07IyNFrl/PWPoPAAAMaqqUpK5Zk7A1%2bOPor8eMMR3HNLcvAOzyPP9U7TolNm1Sa9NWpM15%2bmm5Lo2lUr58pnMBgKP77beLF48fF5k9%2b9ChFStEPDyUslhEqlcvVKhMmYyPPVzoXxv7YX6ff37o0A8/iHTvvn79xIkimzYlJu7bZzodAAAQEZGmkia%2b6emWC17HrxepV%2b/q4ZjlezdcvWo6lmlufwbAjQIWWq0Rrz/zjOqltd736aem8wCAswoIyJUrf36R7t3LlWvZUqRnz/LlW7USKVjQ29vX13S6W2e/C0Jk5JEjq1eLTJu2b9%2b334qcOJGUlJhoOh0AAPh/9HzZpw9PnZrYJHRk9KYXXjCdx1FQAPzDKD1KWyyB71TZuW/pxo3ytuxVc2rXNp0KAJydj4%2bnZ65cIm3aFCtWq5ZIu3YlStSrJ9KsWZEi1aqJ5Mrl4eHlZS5faqrNlp4usnZtXNyuXSKLFx8/vnGjyLffZtyu79Kl1NSkJNPvIgAA%2bFf%2bKlImX76csDd4UVSQn5%2bIUiI2m%2blYjoIC4CaCCkYtC3ukQQNd1DJD9Vu3ThIkTCIV7xcAZDH7mQE1avj7lysnUq9eQEDFiiI1a2Z8bL/bwD335M0bECDi6Xl7WwrS07W22UROnkxKOntW5PffMw4z3Lr13LmDB0V%2b/jkxcf/%2bjP/u2ydy%2bXJq6rVrpt8VAABwJ/SDUkl36dUr8fvQB6If/eQT03kcDQPtfwisFRMV3i0mRo6KRVJCQkznAQB35eVlsXh4iAQF5c7t5yeSJ4%2bHh7f3Pw8dvHYt4/C9pKS0tORkkfj469cvXMg8vBAAALigq/Krij54MCEp9I1IXb686TiOytN0AEfnMcXzRzX05ZfTfNJq6%2bi2bVVL8ZEDefKYzgUA7sa%2bRN9%2bJR8AAED7S7QO09pyv0fNlNJPPikrRWS86VSOy2I6gKM70%2bDJjyKrHD2qvpYn1cHRo03nAQAAAABkUF%2bpXdI6MjJ%2bZafXvhy/c6fpPI6OAuAWJYwIyndy3nvvSVNZJau2bjWdBwAAAADclv2wvwqBB057P/206TjOggLgljVTa1RamrykX7Tle%2bYZeV46yorUVNOpAAAAAMDdpG9Lf1B/2K3bn3MabgkFwG1KqBtWMebAjh06nyogn0ycaDoPAAAAALiNYVJcJa5adc4n/PXoNxYuNB3H2VAA3KHcJ%2bTztLmvvy5X5Vc94uBB03kAAAAAwFXp4fqSFElJSV%2beulVVat/edB5nxW0A75K/jtKhumlTy32WjpZvVq6UBAmTSMX7CgAAAABZRB%2bUBqrvgAGJBUJLRDaaMsV0HmfFCoC7dFaFqxi1erXkluaSOmuW6TwAAAAA4Cr0IOkpll9/ZfDPGhQAWSTtsApKixw0SJrKURl28qTpPAAAAADgtJpKmvimp6e/pT71fOPRR03HcRUUAFnk/IWQ0Nj5Fy/KKl1CTXjxRdN5AAAAAMBpVVZdbe9MmHD%2bQkjonLLHjpmO4yrYq55NAobHLAp/aOFC9YkkS0kOqQAAAACA//THIesJSaFvRFcpX950HFfDCoBs4/WMx9m%2bffVMaSUpiYmm0wAAAACAw/pjyb96N62iZWyrVqbjuCoKgGySOL7j2bl7T5%2b2pOlJqk/PnqbzAAAAAICjUj9IaxX0yivxfTt3jow8fNh0HlfFFoAcErg6Oj3syxkzJFjNV/N79TKdBwAAAACM66ymSvUtWxImhayNGlq7tuk4ro4VADnEc1/e2ldKvfiihEtfubJ3r%2bk8AAAAAGCKniftZeP16ykTvdYkvdyypek87oICIIec7t122ze1kpK0rz5m%2b6FzZ3lDkqVISorpXAAAAACQc7QWEVEReoGq17XrRdVBLVYXLphO5S4oAHJY4viwvDHXtm2TlSq3VBo1ynQeAAAAAMgxI5Sv7Pj664TEsPDIqNhY03HcDQWAIQmxvwZX6PX22/KRRIrvypWm8wAAAABAthknifLEuXMJ/S%2bcyPfQk0%2bajuOuOATQsEJJVmtwcPHiHnN1gmfHnTvlVQmQrwoVMp0LAAAAAO5aFekki202/ZC%2bbtO1a/%2b5IhpGsALAsHM%2bISGxsSdPSlMt6tizz5rOAwAAAABZpq%2btp/5g3DgGf8fACgAHE3AuJl/Ye7NmqYryqdry9NOm8wAAAADAbeusO%2bqzW7YkTArziv6e2/s5ClYAOBjVW32a/lO/fvKebNXT9uwxnQcAAAAAbpU%2bpZvJ7qtX0/elfeRR8eGHTefB37ECwEEF1I5%2bPvSDChXUvep%2bi/fPP8tqKSirCxQwnQsAAAAA/iFQonWY1upR7z3esx56KP7dDvtmL/rpJ9Ox8HesAHBQiZvDpsb027/f9pQqpD27dpVAiZaIjHtmAgAAAIAjURaLl8Vz9GgGf8fGCgAnEehh9Q7/efx4KaTnyMRhw0znAQAAAAB5Sr0vg1evTpgYsimqVrNmpuPg37ECwEkkpP%2baXKH2a6/pU/KxVFu2zHQeAAAAAO5Lz5RWqmBiYsLE893zzXjkEdN5cGsoAJzGaDVa2WwpjVTvtG2dO%2bv5sk%2b/eOSI6VQAAAAA3Mjz0lH9mJqqmug2XrH16on07vPxJ6mppmPh1rAFwEkFBlutEdbq1fWr%2bqrevWGDaik%2bciBPHtO5AAAAALgirbUWES3aokJCEhLDwiOjYmNNp8LtoQBwckFeVmtYYJcu2k9r1WL2bNN5AAAAALigprq%2b6jB5ckJsWMnIkIEDTcfBnaEAcBGBJ6zFwh%2bePl0e1BMlqHdv03kAAAAAOD%2b9RLfUnhs2JNYJKxQ956GHTOfB3eEMABdRYIHv6gtHBwzQz6oPpOmmTabzAAAAAHBeeoK8rxaePZtYJ3/ixZ%2baNzedB1mDAsBFHOz/aIWlB5OT1QHpn/ZD%2b/Z6hAyXzUePms4FAAAAwHno4ZIsRVJSPJ6xbUy/VquWSMacYToXsgYFgItJiA0JiY09c8ZWWQ%2bytWzTRvpLGzl7/rzpXAAAAAAcWKBES4TWllyyIb38Y4/FqXAVo37/3XQsZC0KABd1rmXY8zHTfvtNb1PLpFSHDnqSfC5DaO4AAAAA/JPlbZ2iuvXvH983dLq17w8/mM6D7MEhgG4ioEzMN%2bFVwsNVbpkpb82bJwkSJpGK338AAADAnRWTXWrxlCkJO0LHRiYNGGA6DrKXh%2bkAyBlJ5%2bdH7k7YvTvvqk7j7r9iscgXyibeTZqYzgUAAADAgDJSQNZ8%2b23C1tBeUee6dDEdBzmDK8BuR2sRpQJiY8uG%2b3z%2bueqrJ0i7rl1NpwIAAACQA96TrXranj0JXUPeivarWlVEqYwZAe6AMwDcTsb/4InB51/O17lnTx2q3pVxK1aYTgUAAAAgG51Qc/S8%2bPhc21Wt9Gdr1WLwd0%2bsAHBzBf2sMcGdChTwmKQf9By8bp0aIttlStWqpnMBAAAAuHv6F/lUD01KUgPVs%2bnjypa13zXMdC6YQQEAEREprKN0qL733vTrlnOW7hs3qpLygyQXLmw6FwAAAIDbp9vLXOmdlmY55FFXHq1ZM35lp9eiknbuNJ0LZrEFACIi8ud9PkuoFSrlscekqZyXphcvms4FAAAA4DZU0R1ksc2mGkll9czjjzP4468oAPA3iYkhIZGRW7eqUqqQ1G/TRtLkstS4csV0LgAAAAD/IlCiJUJrm5c%2br7Y8/XRC19C3Iw99953pWHAsbAHAvwpKjC4RevThh23b1EFL02%2b%2bUZ1lkdTLndt0LgAAAAAiEqisEqG1jpdQW7k%2bfRITQ0JiKn/8selYcEysAMC/ig8IOx5TasUKdUZGKEv79nqSfC5DkpNN5wIAAAAgovPaikipl15i8MetoADALbEvIVK19eNqeUSEhGQcKmI6FwAAAOCObJ/alukWY8Ykbg6bGlXt/fdN54FzYAsA7kjg%2bzHrwhK7dZPFUl%2bV/Owz2SPzpZ2FQgkAAADITsVkl1o8ZUrCjtCxkUkDBpiOA%2bfCwIY7kjAotGF0wBdfSBv5Xb/av7/pPAAAAIAr0/eqFyV%2bxgwGf9wNCgDclYRXQstGvzp1qh4hw2Xziy%2bazgMAAAC4lDckWYpERSVuDjkVtaJPH9Nx4NzYAoAsFTjS6hF%2bYswYmaYjZchrr5nOAwAAADgjlaaUPLtwYfz5kJCo5h07ms4D18AKAGSphDdC0qPuGTFC%2bksbpV55xXQeAAAAwKl0VeN1x2%2b%2bYfBHdqAAQLZIGBGaPzLyrbfkU3lfzxg61HQeAAAAwKE9ra%2bqItHRCe%2bF7IgObtvWdBy4JrYAIEcEVYz5LWxmnz66iFRQ/aZO5a4BAAAAgIjtB/WS7Pn007MPhByP2vHss6bzwLUxgCFHxO8LrRz9zPTptkF6i0rt2lVCZK70TksznQsAAAAwQXnKBnXy3XcZ/JGTWAEAIwL2xMSGtw0JUVZpL5vmzpWpskAe9vIynQsAAADITrZ4CZHI0aPPqlAVpV5/3XQeuBdWAMCIxCqhwVFfW606RS3U0R066OWSJOWvXTOdCwAAAMhaWmstIp/K%2b5b1Q4cy%2bMMkCgAYlTg%2bJCS6%2bZIlMlrlldNt2oi/TNNvXL5sOhcAAABwVwKVVSK0VoX0d9LyuecS2oVumnfs7bdNx4J7YwsAHIp/x5h8IRdr17a0ljc9vl22TF6VAPmqUCHTuQAAAIBbUkV3kMU2mw7XK3XDiIjEPuGto7%2bPiTEdCxChAICDCgiwWiMiataU4/ph7b1kiSopP0hy4cKmcwEAAAD/1/P6cVmRmqpekEqWmW3axAeEHZ/XdsUK07GAv2ILABxSYmJISGTk1q0eT6gVnt/Wry%2bDpZZ0/e0307kAAACAv0mTy1LjyhWPo7m3WkKrV2fwhyNjBQCcQoEC8%2bZFRBQs6D3Ks5RtypdfygQ5qfo1a2Y6FwAAANyUn5oti0%2bfvhaV57RMrFbtSq2226J6JyaajgX8GwoAOBlrTHAnb%2b%2bAWBnm%2be0nn6i%2beoK069rVdCoAAAC4Bz1XNuq5u3YltlL10kNr1RIJCY2dn5JiOhdwKygA4KS0FlEqUFslXI8aJfdJR/lm5EhJkDCJVPy5BgAAQNbqqsar1d98k/Be8C%2bRp594QkSpjO9JAefBGQBwUhl/4SbY76PaUwbr%2bt27yxuSLEVoYAEAAJA1lKds0PnefTfhvZAdkafbtmXwhzPjSilcin9PqzW8dvPmltx6iv7qyy8lRvqpQX5%2bpnMBAADASfxxG7/0mepnfaxHj3PlQhtGB3zxhelYQFagAIBLKtTGau3cr0oVy9O6oa3EkiXqBflRtt97r%2blcAAAAcEx6uSRJ%2bWvXbNtsF/TFZs3O9Qh/MXrypk2mcwFZiQIALi0w2GoNDi5SRDfV5Tz6L1yoXpcD6qN69UznAgAAgGPQx3QVyRUXZ9OW37wG1qx5zickZHb1kydN5wKyA2cAwKUlxIaExMaeOZP4fNCDpxs2aqRnySpd6q23TOcCAACAYWWlpB63dm1iHsuetCslSzL4wx2wAgBuKah5zA/hPk89ZZsjb8nOGTNUdekpI3x8TOcCAABANglUVonQWj8jS22l3nkncXBIUky1oUNNxwJyEgUA3FpgsNUaYa1eXb%2bg99ruXbBAdZKKamLp0qZzAQAAIIu8oZQUSUmxddYn0nWnTmfzhw6yTvr6a9OxABMoAAARKXZpYcWu7f39UxJTpqZ%2bP2%2beqitnpV2rVqZzAQAA4M7oe%2bWoDDt50rYm7ydpY%2brWPefz%2bIHYWJb4w71RAAB/o7WIUoFjrJcjIl5%2bWX6QvHrR%2bPGyR%2bZLOwtnZgAAADg4fUo%2blmrLliV67fmhwiuPPSYyWo1WNpvpXIAjoAAA/kVA7ejnIy49/riqq3bYrs6ZIzHSTw3y8zOdCwAAAH%2boojvIYptNfaoqS7HBg%2bPLhx6KOjhpkulYgCOiAABuQcCa%2bdfDL5YvL0fSj8meBQvUENkuU6pWNZ0LAADAXemi%2biE5eumSPC4FbdubNUscH5Y35tq2baZzAY6MJc3ALUhs0il3VIEDB9QStT3tvfr1pYTES/Bnn5nOBQAA4G70x0rJwZ9%2b8iic4ul5sFgxBn/g1rECALgLgfujp0a81bGjXqtm2577%2bGM1TAap3v7%2bpnMBAAC4jCrSSRbbbNLCtk1XHj48YUR47eitb71lOhbgjCgAgCwQGGy1BgcXKaIj9QzPGrNmqWLSS3a2bm06FwAAgNOqJM0l8NQpfV2/bivfrFni5rCpMf327zcdC3BmFABAlsq4i0DAmtjY8Iv9%2b8sJPUsOvfWWGihPyzu5cplOBwAA4OjUBhku78fExJffc7BCkYgITvEHsg4FAJCNCreM/i60ZdWq6S%2bpZWpZZKR6Suqpp%2b6/33QuAAAAR6FPSVvZffWqStIP26Z37JhQIOynmIe%2b/950LsAVcQggkI3iloe1ilm%2be3fuZap%2beljdulJMdqnFU6ZIoERLhNam8wEAAJiiH5RK8sXmzSpCfZ1WsUgRBn8g%2b7ECADAgcHbMyxFlW7WSF6SI/vzzzyWXFJePihQxnQsAACC76Gelo/oxNVXXtfWyje7f/2y78FnRz0yfbjoX4E4oAACDAoYv8H%2bqUtGiqm5qufQx06dLTxkkC554wnQuAACArKIHqRli%2bfVXXSW9lG7%2byCMZg/%2bpU6ZzAe6IAgBwIIEB0VER4cHB%2bjPVRqd89JF6Rr4T74AA07kAAABu2fMZV/rlQUsf257XXktoFzwzOv/bb5uOBYACAHBIhVsueLtLUFBQesvUd9LT3n1XvSMf6lZdupjOBQAAcFPl5T6ZtG3btST1a9rzrVtf%2bSUkNHZ%2bQoLpWAAyUQAATiAw2BoT1r1TJ/lOn1Q9PviAMwMAAIBp%2bpRuJruvXlVFPVarqt27JyQGh0RGxcaazgXg5igAACdS0M8aE9ypQAHPUnqX17dvvCEVpLLu/Pzzslo85YqHh%2bl8AADADTSVD6XpkiU%2b1qS13r06dTqquqsv1PXrpmMB%2bG8UAIATCxgefTU0T40a6oAabCnw8ceyWppJs5o1TecCAAAuJFTN0%2b9fuKBet2332NKpU3xA2PF5bVesMB0LwO2zmA4A4M4ljg/LG3Nt27aE2AvV87WtX1/6SxulXnlF/yKfypikJNP5AACAE6oindQ3NpueL/tk%2btSpCR/KU%2bn9AwIY/AHnxwoAwAUVSrJag4OLF7d8qJ/3WjFhAocIAgCA/6LnykY9d9cu9WnuYM%2bXOnZMiG3XYO7EgwdN5wKQdSgAADfgvzgmPGJqs2bqvIzWNaZMUUNku0ypWtV0LgAAYI6eIO%2brhWfPesSke%2brl3bvHLY9YH9Xo669N5wKQfSgAALeySjfRnp4BaxJii116/nn1oT4n0aNHy2opKKsLFDCdDgAAZKM3JFmKpKToErJBxU2cmPj4nmnl5w0fLjJajVY2m%2bl4ALIfBQDgxoKaR14J9ylcWI%2b05NFz3nhDpqpoteyZZ7irAAAALiBQWSVCa5mgT8j1r7%2bWuWpQWkznzgmxIaGx869cMR0PQM6jAADwJ/%2ba87eEz6hUyXLU1kU3eeMNUfp1NTo42HQuAABwG/KrT%2bXUgQOWL9NekPwdOsRVj2gX9fWvv5qOBcA8CgAANxX0UUyfiPAWLWwhMkCPevddVVl2yugHHjCdCwAA/MU30kpSEhPTL%2bl5qk7v3udahj0fOXTBAtOxADgeCgAAt8BqDQ728Ai8x9bIs1fXrvpl1VCeGzVKjZHxUrtUKdPpAABwJ/qUtJXdV6%2bqU%2bpreXP06IRSv4ZUePS999jLD%2bC/UAAAuAPWmOBO3t4BAaK8vJ9%2bWqXoE/q50aMllxSXj4oUMZ0OAABXop%2bVjrIiNVUtkdHqyrRpPr8kjfG6OnToUdVdfaGuXzedD4DzoAAAcNcKt5x9pktQ3ry2xrl80lu88ILEyaO29155RWKknxrk52c6HwAAzkQ3lDTxTU%2bX/cpL%2b8TE2EqmnPawPffcuaVPDZj3waVLpvMBcF4UAACynP/ixQ16DMmXz7Lz%2brLrJ/v2pRAAAOBfNP1j4F%2blLXrwggUpqek2yxu9e1%2b82LlzZOT586bjAXAdFAAAst0/CgER0YlDh8oUWSr%2bBQuazgcAQI5qKmk6d3q6Hi3eKnHRotT6aSkq37PPMvADyG4UAAByXAG9UHfTfn5elVM6Jn81YIAaJC1UUv/%2b8qoEyFeFCpnOBwBAVvpzD79NvypFv/gibbqlZlr5l146fyEkNHb%2bxYum8wFwHxQAAIwrpWfpbjp37qSf8%2bxPORISIu%2bqL7TX8OGyWh5QL1esaDofAAC3ZbqK1i8kJ8t53UjZZs9Oe0kVT5s8ZAgDPwDTKAAAOKBRepS2WPwvVZm4f91jj6m96ks59cor6jHdXxY1aGA6HQAAf%2bMv02Ty5ctyQG2Q3z/8sI5IcYgAAAmcSURBVMBE390XIkaPPtj/0QpLDyYnm44HAHYUAACcRmCwNSZ8RsOGurzOJbMHD1brpa1sf%2bIJ2SPzpZ3FYjofAMA96GflkH722DHbdmkphUaPPrc0pFZ09VmzRJQS0dp0PgC4GQoAAE4r6KMvq0ZElCmjZ6S1l0UDBuhvZZPe2bOnqi49ZYSPj%2bl8AAAnF6isEqG1jpdQeXbbNs%2bv9Kz0mYMGnWkQutT62Nq1puMBwO2iAADgMop0t8YEdwoMTLsgyrPgc8/JRP2mnvH886q2DFWdg4JM5wMAOLg/9u6rQXqdpa3VKmXTj%2bjrQ4bEr4zwjUqKizMdDwDuFgUAABdmjQnu5O0dGGCzeXm1a6dfUkVts3v1UrNlslr28MOSIGESqfh7EADcVbKc1O3OnLGVV/eoi5Mn52kskvbD5MknJoaExMZeu2Y6HgBkNb7xBeB2/BdbrZ1PVqyoPPTK9A%2b6d5czsl2G9%2byphskg1dvf33Q%2bAEDW0u1VjPROS1M9bROk5Jo1nu0tO9RrQ4eePh0SEhm5davpfACQUygAALi9wi1nn%2bkSlDevzS/32vQPg4PlJ5moC/boIfl1EbnesCErBQDAuegndAmtjh%2b3HFF9POInT/YI9fG8%2bOa0aad7t932Ta2kJNP5AMAUvqEFgJsoGBW1LOyREiU8D1oaWAIiInRjmWQb2Lu36iQV1cTSpU3nAwB3p5dLkpS/dk2Nk7H6%2bFdf6Rc8flWTRoxIbNIpd1SBAwdM5wMAR0MBAAC3bJQepS2WwNlVhh4o17Kl1FMLbHu6dNGl9U5Vq317VUy%2blqp585pOCQAup6mkiW96um4qlXXXzZstRfVXlutvvhnf8bdR5Vt8/bXIaDVa2WymYwKAo6MAAIC7VErP0t107txXLvtMTFnXsqWljPpEB3bpImP0MDWjXTsZKbnkjLe36ZwA4Ay0FtHr1Gdq3%2bHDKrethoydPl1eslRPmzVtWkJsSGjs/CtXTGcEAGdFAQAA2aTYpYUVu7b390%2b%2bkLI/tXKnTpZN8oQkhoSIVUJEmjSR1eIpVzw8TOcEgBwXKNE6TGu9UCWp148ckWvyjLT97LOUPiJpv02bdmljSEhs7LlzpmMCgKuhAACAHJa/ntUaHFyoUK7Jtgc833r8cbFaQvTW4GAppwerDY88wooBAK5EaxEZKE1UuePH5Re1Vr6bPVudTXtUfv3gg/iVEb5RSXFxpjMCgLugAAAAB1FAL9TdtJ9fLu/U2OSgtm1tO7RS9dq1Ux1lqn7/kUfkrDynRubLZzonAPxDiMyV3mlpskRdku927VITdIwqP2dO6nNqTeq3n312/kJIaOz8ixdNxwQAd0cBAAAOz2oNDvbwCAwW7dmifn3dTa/S/2vv3oKirMMwgD/vx0FEiUXaDAezBA0XKg1tCRQqxFEjyWKhaLLpIh3LmtGyyWZKveg0nWzEMTMrNVJYLQ9NVkJGYoKBg2NLYotmgIobsRxlEb63G7uqZho7rLrP7/a7ef6X/%2bf7z/sez86W77FYMmbNwuuoxoZx4/ydkogCwDhNw4mODhTjOS0/cEDbZGZw9tq1v9jE9EVs2wbk5Tu39PX5OyYREf05FgBERJe46OQt1fevSUiQhwby8er06VKEVejJytIKpCM6I4PbCYjob7PpbGw3TTTJKExqaNA%2b6ULBjh1aiHX9pWvXtubk5Tmd9fX%2bjklERBeGBQAR0WWrpNiRGxoarQN5hjM11QgOGmR8N20aHkcK9mRloVnnwT1hAocREgWQ8%2bv0cAuSdPbBgzigp2Xpl19Kq%2bGFq7z8zFdA/8zycv7JJyK6PLEAICIKUFZHSbEjd%2bhQuV33hISkpOh8rNaPJk/WV1Cu/WlpEomf5en0dA4lJLqE/H7BB/ZiZ20tjuJK6di3D82aiJyKCl%2b8EXSuv6yMU/aJiAITCwAiIvpTvxcEeNdcYSxMTcXncq0cmTxZr5ajkmu3S6E%2bgs12O75GFL6OjPR3XqKAkI%2bV%2bobXq4uwTOKqquQ6ZKK7slJWY74UVFTIJ75lQWX797fsnnP1xjPd3f6OS0REFxcWAEREdIGW6lI1jGEzEp3uJxISgg6bU8xZdjs%2bxFXakZKiSXJUEu12KUQ80m02rMLHyAwJ8XdqoovSY7gHZefO4UUsQpfLhWOyFbdWVWEhVsi8ysqBuaZnYE9V1a9Z%2bY8Wrz5yBBA5v2CPiIjob2MBQERE/7E1b899JCRkeG1ETOfpsWNNn5GAt5KTMVc2SlJysn6GHPPb5GRJwiHZfdNNCEYEDg4d6u/URP%2bKfnTi5q4uTEU1Xq%2bv10nYKn11dbDLKj1eUyOFUGyuqRkUC%2bkvralpejMvz%2bk8e9bfsYmI6PLEAoCIiC4q0ds3PXzfuhEjgpqNQUapzWYmyh36dmKiqHmvltpsOkYOIi4xUTKxGENuvBGtmC/PR0T4OzcFBl2BD7DY55MB3KCjGxqwSHbitMsFj9bJ9XV1sOpmKXC5jFIzXLvq6lrG188au%2bOHH4DlslxM09/5iYgosLEAICKiS5QqIBK1afMX902LjTXCjfVGTny8VOm7GhwXh1R5Uo/Hx2M0MsUVHy/j8Q3K4uIwGof1UFwci4MANw534kRHByqxBLXHjmkbylDpduOkvoO73G68jwl4tqFBX9Bwc67brTNDdwU/4Xb/uuueGUUrm5v5BJ%2bIiC5FLACIiCggRUYWFRUUREUN2hESLM7YWPMp8xttHTVKSo0MZI4ciTTdZTpiY3UOPjVeHjkSP8u1Wj1iBCZqEVqGD0c%2borHGapXpsKDEakUdtiDHMPx9rsuWDbnYbpr6ObzI83hQjFbM83hQLQ9geEsLrtGfZOLJk7IB2eYzjY1yDk8jurHRvEILDUdTk/GakS7RJ0740kPygvsaG9tltqwXr9ffxyIiIvo/sQAgIiL6R0pKHI6gIKsDAKxWWQAN3Wa1DmyEmOOtVqMdqknDhukYM1tSLBZjtfTqVotFp2q1tFksukCqUGqxSIxs0DCLRb/SCNkXHg4v3tQpERGyBGtkZlgYchGJw4MHIwZOTBoyRB/DEDSFhmIvYrQ8MlJOYbfk/rGA0LuwFSlhYZKFcPw4ePBfnUJ3owdjzp6VnbgXlb29f/gegyzdYpqYglOS0d4uq9CN2L4%2bnIID33V3Y78cwsaeHl2gL%2bltPh8sWCh7OzvlDunUtJ4ePaVzpNfrlUK1Y6rXK6UyUaO8XvM9KTNS29rktPZqu9dr1kgYKtragh6EGrUejxZC%2bu72eDxOl8NWcuYMn9ITERFduN8Ax3aQbn25Ru0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDgtMDJUMDk6NTc6MTUrMDA6MDAmQQV%2bAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA4LTAyVDA5OjU3OjE1KzAwOjAwVxy9wgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMi0wOC0wMlQwOTo1NzoxNSswMDowMAAJnB0AAAAASUVORK5CYII='/%3e%3c/defs%3e%3c/svg%3e";

var css_248z$j = ".ChatTabHeader-module_chat-header__kUL4i {\n  background-color: white;\n  position: relative;\n  padding-left: 10px;\n  width: 100%;\n  height: 100%;\n  align-items: center;\n}\n.ChatTabHeader-module_chat-header__kUL4i .ChatTabHeader-module_avatar__Nsvxw {\n  position: relative;\n}\n.ChatTabHeader-module_chat-header__kUL4i .ChatTabHeader-module_avatar__Nsvxw .ChatTabHeader-module_badge__ZpRBF {\n  position: absolute;\n  right: 5px;\n  bottom: 4px;\n  width: 8px;\n  height: 8px;\n  background: rgb(21, 169, 89);\n  border-radius: 50%;\n}\n.ChatTabHeader-module_chat-header__kUL4i .ChatTabHeader-module_conversation-name__8-VcD {\n  font-weight: bold;\n  display: flex;\n  align-items: center;\n  font-size: 18px;\n}\n.ChatTabHeader-module_chat-header__kUL4i .ChatTabHeader-module_conversation-name__8-VcD .ChatTabHeader-module_real-check__Arjxb {\n  width: 24px;\n  height: 24px;\n  margin-left: 10px;\n}\n.ChatTabHeader-module_chat-header__kUL4i .ChatTabHeader-module_tabs__GARur {\n  position: relative;\n  min-height: 16px;\n}\n.ChatTabHeader-module_chat-header__kUL4i .ChatTabHeader-module_tabs__GARur [class~=MuiTabs-indicator] {\n  display: none;\n}\n.ChatTabHeader-module_chat-header__kUL4i .ChatTabHeader-module_tabs__GARur [class~=MuiTabs-scroller]::-webkit-scrollbar {\n  display: block;\n}\n.ChatTabHeader-module_chat-header__kUL4i .ChatTabHeader-module_tabs__GARur .ChatTabHeader-module_tab__OUiUG {\n  font-size: 13px;\n  text-transform: none;\n  color: #BEBDBD;\n  background-color: white;\n  padding: 0 0 2px 2px;\n  min-height: 16px;\n  min-width: inherit;\n}\n.ChatTabHeader-module_chat-header__kUL4i .ChatTabHeader-module_tabs__GARur .ChatTabHeader-module_tab__OUiUG[class~=Mui-selected] {\n  color: #15A959 !important;\n  border-bottom: 3px solid #15A959;\n}\n.ChatTabHeader-module_chat-header__kUL4i .ChatTabHeader-module_tabs__GARur .ChatTabHeader-module_divider__arW-g {\n  width: 1px;\n  height: auto;\n  margin: 4px 6px;\n  padding: 2px 0;\n  background: rgba(0, 0, 0, 0.12);\n}";
var style$i = {"chat-header":"ChatTabHeader-module_chat-header__kUL4i","avatar":"ChatTabHeader-module_avatar__Nsvxw","badge":"ChatTabHeader-module_badge__ZpRBF","conversation-name":"ChatTabHeader-module_conversation-name__8-VcD","real-check":"ChatTabHeader-module_real-check__Arjxb","tabs":"ChatTabHeader-module_tabs__GARur","tab":"ChatTabHeader-module_tab__OUiUG","divider":"ChatTabHeader-module_divider__arW-g"};
styleInject(css_248z$j);

var ChatTabHeader = function ChatTabHeader(_ref) {
  var tab = _ref.tab,
      handleTabChange = _ref.handleTabChange,
      conversation = _ref.conversation;
  var prefixId = "chat-tab";

  var a11yProps = function a11yProps(index) {
    return {
      id: "".concat(prefixId, "-tab-").concat(index),
      'aria-controls': "".concat(prefixId, "-tabpanel-").concat(index)
    };
  };

  var Divider = function Divider() {
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      className: style$i["divider"]
    });
  };

  var TabsContent = React.useMemo(function () {
    var el = [/*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
      title: "Chat",
      value: 0,
      children: /*#__PURE__*/jsxRuntime.jsx(material.Tab, _objectSpread2(_objectSpread2({
        className: style$i["tab"],
        icon: /*#__PURE__*/jsxRuntime.jsx(SmsIcon__default["default"], {})
      }, a11yProps(0)), {}, {
        label: "Chat",
        iconPosition: "start"
      }))
    }, 1)];

    if (conversation.conversationType !== ConversationType.CUSTOMER_WITH_SELLER) {
      el = el.concat([/*#__PURE__*/jsxRuntime.jsx(Divider, {}, 2), /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
        title: "Files & h\xECnh \u1EA3nh",
        value: 1,
        children: /*#__PURE__*/jsxRuntime.jsx(material.Tab, _objectSpread2(_objectSpread2({
          className: style$i["tab"],
          icon: /*#__PURE__*/jsxRuntime.jsx(AttachFileIcon__default["default"], {})
        }, a11yProps(1)), {}, {
          label: "Files & h\xECnh \u1EA3nh",
          iconPosition: "start"
        }))
      }, 3)]);
    }

    if (conversation.conversationType === ConversationType.CUSTOMER_WITH_CS) {
      el = el.concat([/*#__PURE__*/jsxRuntime.jsx(Divider, {}, 4), /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
        title: "C\xE1c tags \u0111\xE3 g\u1EEDi \u0111\xEDnh k\xE8m trong chat",
        value: 2,
        children: /*#__PURE__*/jsxRuntime.jsx(material.Tab, _objectSpread2(_objectSpread2({
          className: style$i["tab"],
          icon: /*#__PURE__*/jsxRuntime.jsx(SellIcon__default["default"], {})
        }, a11yProps(2)), {}, {
          label: "Li\xEAn k\u1EBFt thuocsi.vn",
          iconPosition: "start"
        }))
      }, 5)]);
    }

    return el;
  }, [conversation.conversationID]);
  React.useEffect(function () {
    if (conversation.conversationType === ConversationType.CUSTOMER_WITH_SELLER) {
      handleTabChange(null, 0);
    }
  }, [conversation.conversationID]);
  return /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
    direction: "row",
    className: style$i["chat-header"],
    children: [/*#__PURE__*/jsxRuntime.jsx(material.Box, {
      className: style$i["avatar"],
      children: /*#__PURE__*/jsxRuntime.jsx(material.Avatar, {
        sx: {
          width: 60,
          height: 60,
          padding: '8px',
          border: '1px solid #d9d9d9'
        },
        src: conversation === null || conversation === void 0 ? void 0 : conversation.customerSupportAvatar
      })
    }), /*#__PURE__*/jsxRuntime.jsxs(material.Grid, {
      paddingLeft: 2,
      flexDirection: "column",
      item: true,
      xs: 12,
      sx: {
        display: 'flex',
        height: '100%'
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(material.Grid // xs={3}
      // item
      , {
        flexDirection: "column",
        alignItems: "flex-end",
        sx: {
          marginTop: '12px'
        },
        children: /*#__PURE__*/jsxRuntime.jsxs(material.Box, {
          className: style$i["conversation-name"],
          children: [conversation === null || conversation === void 0 ? void 0 : conversation.conversationName, /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
            title: "thuocsi.vn Store",
            children: /*#__PURE__*/jsxRuntime.jsx("img", {
              className: style$i["real-check"],
              src: img$o
            })
          })]
        })
      }), /*#__PURE__*/jsxRuntime.jsx(material.Grid // xs={3}
      // item
      , {
        flexDirection: "column",
        sx: {
          marginBottom: '2px'
        },
        children: /*#__PURE__*/jsxRuntime.jsx(material.Rating, {
          name: "read-only",
          value: 5,
          readOnly: true,
          sx: {
            fontSize: "12px"
          }
        })
      }), /*#__PURE__*/jsxRuntime.jsx(material.Grid // xs={5}
      // item
      , {
        flexDirection: "column",
        sx: {
          display: 'flex',
          justifyContent: 'flex-end'
        },
        children: /*#__PURE__*/jsxRuntime.jsx(material.Tabs, {
          className: style$i["tabs"],
          value: conversation.conversationType === ConversationType.CUSTOMER_WITH_SELLER ? 0 : tab,
          onChange: handleTabChange,
          children: TabsContent
        })
      })]
    })]
  });
};

var _excluded = ["children", "value", "index", "prefixId"];

function TabPanel(props) {
  var children = props.children,
      value = props.value,
      index = props.index,
      prefixId = props.prefixId,
      other = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/jsxRuntime.jsx(material.Box, _objectSpread2(_objectSpread2({
    role: "tabpanel",
    hidden: value !== index,
    id: "".concat(prefixId, "-tabpanel-").concat(index),
    "aria-labelledby": "".concat(prefixId, "-tab-").concat(index)
  }, other), {}, {
    children: value === index ? /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: children
    }) : null
  }));
}

var ddmmyyyy = function ddmmyyyy(date) {
  var mm = date.getMonth() + 1; // Months start at 0!

  var dd = date.getDate();
  var yy = date.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  if (yy < 10) yy = '0' + yy;
  return "".concat(dd, "/").concat(mm, "/").concat(yy);
};
var ddmmyyHHMM = function ddmmyyHHMM(date) {
  var mm = date.getMonth() + 1; // Months start at 0!

  var dd = date.getDate();
  var yy = date.getFullYear() % 100;
  var hh = date.getHours();
  var MM = date.getMinutes();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  if (yy < 10) yy = '0' + yy;
  if (hh < 10) hh = '0' + hh;
  if (MM < 10) MM = '0' + MM;
  return "".concat(dd, "/").concat(mm, "/").concat(yy, " ").concat(hh, ":").concat(MM);
};
var isLeapYear = function isLeapYear(y) {
  if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0) return true;
  return false;
};
var isBetween = function isBetween(mid, start, end) {
  return mid.getTime() > start.getTime() && mid.getTime() < end.getTime();
};
var isEqualDate = function isEqualDate(d1, d2) {
  if (!d1 || !d2) {
    return false;
  }

  return d1.date === d2.date && d1.year === d2.year && d1.month === d2.month;
};
var getFormattedDate$1 = function getFormattedDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'DD/MM/YYYY';
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return format.replace('DD', String(day).padStart(2, '0')).replace('MM', String(month).padStart(2, '0')).replace('YYYY', year).replace('HH', String(hour).padStart(2, '0')).replace('mm', String(minute).padStart(2, '0')).replace('ss', String(second).padStart(2, '0'));
};
var isGreaterThan = function isGreaterThan(d1, d2) {
  var date1 = {
    date: d1.getDate(),
    month: d1.getMonth(),
    year: d1.getFullYear()
  };
  var date2 = {
    date: d2.getDate(),
    month: d2.getMonth(),
    year: d2.getFullYear()
  };
  return new Date(date1.year, date1.month, date1.date).getTime() > new Date(date2.year, date2.month, date2.date).getTime();
};

var css_248z$i = ".VideoController-module_video-controller__Lc7-h {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 5;\n  display: flex;\n  flex-direction: column;\n}\n.VideoController-module_video-controller__Lc7-h .VideoController-module_controller__KMvlu {\n  padding: 1;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.53);\n  display: none;\n}\n.VideoController-module_video-controller__Lc7-h .VideoController-module_controller__KMvlu .VideoController-module_slider__N2lQS [class~=MuiSlider-rail] {\n  background: #333;\n}\n.VideoController-module_video-controller__Lc7-h .VideoController-module_controller__KMvlu .VideoController-module_slider__N2lQS [class~=MuiSlider-track] {\n  background: #fff;\n}\n.VideoController-module_video-controller__Lc7-h .VideoController-module_controller__KMvlu .VideoController-module_slider__N2lQS [class~=MuiSlider-thumb] {\n  background: #fff;\n}\n.VideoController-module_video-controller__Lc7-h .VideoController-module_controller__KMvlu .VideoController-module_volume-wrapper__cwyGk {\n  position: relative;\n}\n.VideoController-module_video-controller__Lc7-h .VideoController-module_controller__KMvlu .VideoController-module_volume-wrapper__cwyGk .VideoController-module_volume-slider__fiVeP {\n  height: 4rem;\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  display: none;\n}\n.VideoController-module_video-controller__Lc7-h .VideoController-module_controller__KMvlu .VideoController-module_volume-wrapper__cwyGk:hover .VideoController-module_volume-slider__fiVeP {\n  display: block;\n}\n.VideoController-module_video-controller__Lc7-h:hover .VideoController-module_controller__KMvlu {\n  display: flex;\n}";
var style$h = {"video-controller":"VideoController-module_video-controller__Lc7-h","controller":"VideoController-module_controller__KMvlu","slider":"VideoController-module_slider__N2lQS","volume-wrapper":"VideoController-module_volume-wrapper__cwyGk","volume-slider":"VideoController-module_volume-slider__fiVeP"};
styleInject(css_248z$i);

var VideoController = function VideoController(_ref) {
  var isPlay = _ref.isPlay,
      play = _ref.play,
      pause = _ref.pause,
      videoClick = _ref.videoClick,
      progress = _ref.progress,
      volume = _ref.volume,
      max = _ref.max,
      handleProgressChange = _ref.handleProgressChange,
      handleProgressChangeEnd = _ref.handleProgressChangeEnd,
      handleVolumeChange = _ref.handleVolumeChange,
      mute = _ref.mute,
      toggleMute = _ref.toggleMute;
  return /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
    className: style$h["video-controller"],
    children: [isPlay && /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        sx: {
          flex: '1 1 auto',
          cursor: 'pointer'
        },
        onClick: videoClick
      }), /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
        direction: 'row',
        className: style$h["controller"],
        alignItems: "center",
        spacing: 1,
        children: [/*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
          size: "small",
          onClick: function onClick(e) {
            e.stopPropagation();
            pause();
          },
          children: /*#__PURE__*/jsxRuntime.jsx(PauseIcon__default["default"], {
            sx: {
              color: "white"
            }
          })
        }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
          sx: {
            flex: '1 1 auto',
            display: 'flex',
            alignItems: 'center'
          },
          children: /*#__PURE__*/jsxRuntime.jsx(Slider__default["default"], {
            className: style$h["slider"],
            defaultValue: 0,
            value: progress,
            size: "small",
            min: 0,
            max: max,
            onChange: function onChange(e) {
              handleProgressChange(e);
            },
            onChangeCommitted: function onChangeCommitted(e) {
              handleProgressChangeEnd();
            }
          })
        }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
          className: style$h["volume-wrapper"],
          children: [/*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
            size: "small",
            onClick: function onClick(e) {
              toggleMute();
            },
            children: !mute && volume ? /*#__PURE__*/jsxRuntime.jsx(VolumeUpIcon__default["default"], {
              sx: {
                color: "white"
              }
            }) : /*#__PURE__*/jsxRuntime.jsx(VolumeMuteIcon__default["default"], {
              sx: {
                color: "white"
              }
            })
          }), /*#__PURE__*/jsxRuntime.jsx(Slider__default["default"], {
            orientation: "vertical",
            defaultValue: 100,
            min: 0,
            max: 100,
            className: "".concat(style$h["slider"], " ").concat(style$h["volume-slider"]),
            size: "small",
            value: mute ? 0 : volume,
            onChange: function onChange(e) {
              handleVolumeChange(e);
            },
            sx: {
              '& .MuiSlider-thumb': {
                width: '.5rem',
                height: '.5rem',
                '&::after': {
                  display: 'none'
                },
                '&:hover': {
                  boxShadow: 'none'
                },
                '&.Mui-active': {
                  '&::after': {
                    boxShadow: 'none'
                  }
                }
              }
            }
          })]
        })]
      })]
    }), !isPlay && /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
      sx: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      onClick: play,
      children: /*#__PURE__*/jsxRuntime.jsx(PlayCircleOutlineIcon__default["default"], {
        sx: {
          color: "white",
          fontSize: '4rem'
        }
      })
    })]
  });
};

var MessageVideo = function MessageVideo(_ref) {
  var message = _ref.message;
      _ref.handleDownload;
      var setIsErrorMedia = _ref.setIsErrorMedia,
      item = _ref.item;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPlay = _useState2[0],
      setIsPlay = _useState2[1];

  var _useState3 = React.useState(100),
      _useState4 = _slicedToArray(_useState3, 2),
      volume = _useState4[0],
      setVolume = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      mute = _useState6[0],
      setMute = _useState6[1];

  var _useState7 = React.useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      progress = _useState8[0],
      setProgress = _useState8[1];

  var videoRef = React.useRef();
  var intervalRef = React.useRef();
  var isPlayRef = React.useRef(false);

  var play = function play(e) {
    e.stopPropagation();

    if (videoRef && videoRef.current) {
      setIsPlay(true);
      isPlayRef.current = true;
    }
  };

  var pause = function pause() {
    if (videoRef && videoRef.current) {
      setIsPlay(false);
      isPlayRef.current = false;
    }
  };

  var videoClick = function videoClick() {
    if (isPlay) {
      pause();
    } else {
      e.stopPropagation();
      play();
    }
  };

  var startInterval = function startInterval() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(function () {
      if (videoRef.current.ended) {
        setProgress(videoRef.current.duration);
      } else {
        setProgress(videoRef.current.currentTime || 0);
      }
    }, 0);
  };

  var handleProgressChange = function handleProgressChange(e) {
    if (videoRef && videoRef.current) {
      clearInterval(intervalRef.current);
      setProgress(e.target.value);
    }
  };

  var handleProgressChangeEnd = function handleProgressChangeEnd(e) {
    if (videoRef && videoRef.current) {
      videoRef.current.currentTime = progress;

      if (isPlay) {
        startInterval();
      }
    }
  };

  var handleVideoEnded = function handleVideoEnded(e) {
    setIsPlay(false);
    setProgress(0);
  };

  var handleVolumeChange = function handleVolumeChange(e) {
    if (videoRef && videoRef.current) {
      if (e.target.value) {
        setMute(false);
      }

      setVolume(e.target.value);
      videoRef.current.volume = e.target.value / 100;
    }
  };

  var toggleMute = function toggleMute(e) {
    if (videoRef && videoRef.current) {
      setMute(function (prev) {
        return !prev;
      });
    }
  };

  React.useEffect(function () {
    if (videoRef.current) {
      videoRef.current.muted = mute;
    }
  }, [mute]);
  React.useEffect(function () {
    if (videoRef.current) {
      if (isPlay) {
        videoRef.current.play();
        startInterval();
      } else {
        clearInterval(intervalRef.current);
        videoRef.current.pause();
      }
    }
  }, [isPlay]);
  React.useEffect(function () {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEnded);
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio !== 1 && videoRef.current && !videoRef.current.paused) {
            setIsPlay(false);
          } else {
            if (isPlayRef.current) {
              setIsPlay(true);
            }
          }
        });
      }, {
        threshold: 0.3
      });
      observer.observe(videoRef.current);
    }

    return function () {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnded);
        videoRef.current.pause();
      }

      clearInterval(intervalRef.current);
    };
  }, []);
  return /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
    sx: {
      position: 'relative'
    },
    children: [/*#__PURE__*/jsxRuntime.jsx(CardMedia__default["default"], {
      component: "video",
      autoPlay: false,
      src: item.blobURL ? getImageProxy(item.blobURL) : getImageProxy(item.url),
      sx: {
        display: 'block',
        maxWidth: '100%',
        marginBottom: message.content ? '1rem' : '0.1em',
        height: 'auto',
        borderTopLeftRadius: '0.85rem',
        borderTopRightRadius: '0.85rem',
        background: 'black'
      },
      ref: videoRef,
      onError: function onError(e) {
        setIsErrorMedia(true);
      }
    }), /*#__PURE__*/jsxRuntime.jsx(VideoController, {
      isPlay: isPlay,
      pause: pause,
      play: play,
      progress: progress,
      volume: volume,
      mute: mute,
      toggleMute: toggleMute,
      max: videoRef && videoRef.current ? videoRef.current.duration : 0,
      videoClick: videoClick,
      handleProgressChange: handleProgressChange,
      handleProgressChangeEnd: handleProgressChangeEnd,
      handleVolumeChange: handleVolumeChange
    })]
  });
};

var css_248z$h = ".VideoControllerBig-module_controller-wrapper__p-v8w {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 5;\n  display: flex;\n  flex-direction: column;\n}\n.VideoControllerBig-module_controller-wrapper__p-v8w .VideoControllerBig-module_controller__nBjll {\n  padding: 1;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.53);\n  display: none;\n}\n.VideoControllerBig-module_controller-wrapper__p-v8w .VideoControllerBig-module_controller__nBjll .VideoControllerBig-module_slider__Ettpf [class~=MuiSlider-rail] {\n  background: #333;\n}\n.VideoControllerBig-module_controller-wrapper__p-v8w .VideoControllerBig-module_controller__nBjll .VideoControllerBig-module_slider__Ettpf [class~=MuiSlider-track] {\n  background: #fff;\n}\n.VideoControllerBig-module_controller-wrapper__p-v8w .VideoControllerBig-module_controller__nBjll .VideoControllerBig-module_slider__Ettpf [class~=MuiSlider-thumb] {\n  background: #fff;\n}\n.VideoControllerBig-module_controller-wrapper__p-v8w .VideoControllerBig-module_controller__nBjll .VideoControllerBig-module_volume-wrapper__Liv5- {\n  position: relative;\n}\n.VideoControllerBig-module_controller-wrapper__p-v8w .VideoControllerBig-module_controller__nBjll .VideoControllerBig-module_volume-wrapper__Liv5- .VideoControllerBig-module_volume-slider__T8cz7 {\n  height: 4rem;\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  display: none;\n}\n.VideoControllerBig-module_controller-wrapper__p-v8w .VideoControllerBig-module_controller__nBjll .VideoControllerBig-module_volume-wrapper__Liv5-:hover .VideoControllerBig-module_volume-slider__T8cz7 {\n  display: block;\n}\n.VideoControllerBig-module_controller-wrapper__p-v8w:hover .VideoControllerBig-module_controller__nBjll {\n  display: flex;\n}";
var style$g = {"controller-wrapper":"VideoControllerBig-module_controller-wrapper__p-v8w","controller":"VideoControllerBig-module_controller__nBjll","slider":"VideoControllerBig-module_slider__Ettpf","volume-wrapper":"VideoControllerBig-module_volume-wrapper__Liv5-","volume-slider":"VideoControllerBig-module_volume-slider__T8cz7"};
styleInject(css_248z$h);

var VideoControllerBig = function VideoControllerBig(_ref) {
  var isPlay = _ref.isPlay,
      play = _ref.play,
      pause = _ref.pause,
      progress = _ref.progress,
      volume = _ref.volume,
      max = _ref.max,
      handleProgressChange = _ref.handleProgressChange,
      handleProgressChangeEnd = _ref.handleProgressChangeEnd,
      handleVolumeChange = _ref.handleVolumeChange,
      mute = _ref.mute,
      toggleMute = _ref.toggleMute;
  return /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
    className: style$g["controller-wrapper"],
    children: [/*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
      sx: {
        flex: '1 1 auto'
      }
    }), /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
      direction: 'row',
      className: style$g["controller"],
      alignItems: "center",
      spacing: 1,
      children: [isPlay ? /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
        size: "small",
        onClick: function onClick(e) {
          e.stopPropagation();
          pause();
        },
        children: /*#__PURE__*/jsxRuntime.jsx(PauseIcon__default["default"], {
          sx: {
            color: "white"
          }
        })
      }) : /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
        size: "small",
        onClick: function onClick(e) {
          e.stopPropagation();
          play();
        },
        children: /*#__PURE__*/jsxRuntime.jsx(PlayArrowIcon__default["default"], {
          sx: {
            color: "white"
          }
        })
      }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        sx: {
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center'
        },
        children: /*#__PURE__*/jsxRuntime.jsx(Slider__default["default"], {
          className: style$g["slider"],
          defaultValue: 0,
          value: progress,
          size: "small",
          min: 0,
          max: max,
          onChange: function onChange(e) {
            handleProgressChange(e);
          },
          onChangeCommitted: function onChangeCommitted(e) {
            handleProgressChangeEnd();
          }
        })
      }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
        className: style$g["volume-wrapper"],
        children: [/*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
          size: "small",
          onClick: function onClick(e) {
            toggleMute();
          },
          children: !mute && volume ? /*#__PURE__*/jsxRuntime.jsx(VolumeUpIcon__default["default"], {
            sx: {
              color: "white"
            }
          }) : /*#__PURE__*/jsxRuntime.jsx(VolumeMuteIcon__default["default"], {
            sx: {
              color: "white"
            }
          })
        }), /*#__PURE__*/jsxRuntime.jsx(Slider__default["default"], {
          orientation: "vertical",
          defaultValue: 100,
          min: 0,
          max: 100,
          className: "".concat(style$g["slider"], " ").concat(style$g["volume-slider"]),
          size: "small",
          value: mute ? 0 : volume,
          onChange: function onChange(e) {
            handleVolumeChange(e);
          },
          sx: {
            '& .MuiSlider-thumb': {
              width: '.5rem',
              height: '.5rem',
              '&::after': {
                display: 'none'
              },
              '&:hover': {
                boxShadow: 'none'
              },
              '&.Mui-active': {
                '&::after': {
                  boxShadow: 'none'
                }
              }
            }
          }
        })]
      })]
    })]
  });
};

var MainContent = function MainContent(_ref) {
  var media = _ref.media;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPlay = _useState2[0],
      setIsPlay = _useState2[1];

  var _useState3 = React.useState(100),
      _useState4 = _slicedToArray(_useState3, 2),
      volume = _useState4[0],
      setVolume = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      mute = _useState6[0],
      setMute = _useState6[1];

  var _useState7 = React.useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      progress = _useState8[0],
      setProgress = _useState8[1];

  var videoRef = React.useRef();
  var intervalRef = React.useRef();
  var isPlayRef = React.useRef(false);

  var play = function play() {
    if (videoRef && videoRef.current) {
      setIsPlay(true);
      isPlayRef.current = true;
    }
  };

  var pause = function pause() {
    if (videoRef && videoRef.current) {
      clearInterval(intervalRef.current);
      setIsPlay(false);
      isPlayRef.current = false;
    }
  };

  var startInterval = function startInterval() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(function () {
      if (videoRef.current.ended) {
        setProgress(videoRef.current.duration);
      } else {
        setProgress(videoRef.current.currentTime || 0);
      }
    }, 0);
  };

  var handleProgressChange = function handleProgressChange(e) {
    if (videoRef && videoRef.current) {
      clearInterval(intervalRef.current);
      setProgress(e.target.value);
    }
  };

  var handleProgressChangeEnd = function handleProgressChangeEnd(e) {
    if (videoRef && videoRef.current) {
      videoRef.current.currentTime = progress;

      if (isPlay) {
        startInterval();
      }
    }
  };

  var handleVideoEnded = function handleVideoEnded(e) {
    setIsPlay(false);
    setProgress(0);
  };

  var handleVolumeChange = function handleVolumeChange(e) {
    if (videoRef && videoRef.current) {
      if (e.target.value) {
        setMute(false);
      }

      setVolume(e.target.value);
      videoRef.current.volume = e.target.value / 100;
    }
  };

  var toggleMute = function toggleMute(e) {
    if (videoRef && videoRef.current) {
      setMute(function (prev) {
        return !prev;
      });
    }
  };

  React.useEffect(function () {
    if (videoRef.current) {
      videoRef.current.muted = mute;
    }
  }, [mute]);
  React.useEffect(function () {
    if (videoRef.current) {
      if (isPlay) {
        videoRef.current.play();
        startInterval();
      } else {
        clearInterval(intervalRef.current);
        videoRef.current.pause();
      }
    }
  }, [isPlay]);
  React.useEffect(function () {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEnded);
    }

    return function () {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnded);
        videoRef.current.pause();
      }

      clearInterval(intervalRef.current);
    };
  }, []);
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [media.type.toUpperCase() === "IMAGE" && /*#__PURE__*/jsxRuntime.jsx(CardMedia__default["default"], {
      component: 'img',
      src: media.url,
      sx: {
        maxHeight: '100%',
        maxWidth: '100%',
        width: 'auto',
        height: 'auto',
        objectFit: 'cover'
      }
    }), media.type.toUpperCase() === "VIDEO" && /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
      sx: {
        position: 'relative',
        maxHeight: '100%',
        maxWidth: '100%'
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(CardMedia__default["default"], {
        ref: videoRef,
        component: 'video',
        src: media.url,
        sx: {
          maxHeight: '100%',
          maxWidth: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover'
        }
      }), /*#__PURE__*/jsxRuntime.jsx(VideoControllerBig, {
        isPlay: isPlay,
        pause: pause,
        play: play,
        progress: progress,
        volume: volume,
        mute: mute,
        toggleMute: toggleMute,
        max: videoRef && videoRef.current ? videoRef.current.duration : 0,
        handleProgressChange: handleProgressChange,
        handleProgressChangeEnd: handleProgressChangeEnd,
        handleVolumeChange: handleVolumeChange
      })]
    })]
  });
};

var ImagePopup = function ImagePopup(_ref) {
  var open = _ref.open,
      handleClose = _ref.handleClose,
      media = _ref.media;
  var downloadLinkRef = React.useRef(null);

  var handleDownload = function handleDownload() {
    if (downloadLinkRef && downloadLinkRef.current) {
      downloadLinkRef.current.click();
    }
  };

  if (!open) {
    return "";
  }

  return /*#__PURE__*/jsxRuntime.jsx(Modal__default["default"], {
    sx: {
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      "& .MuiBackdrop-root": {
        backgroundColor: "rgb(0 0 0 / 90%)"
      }
    },
    "aria-labelledby": "modal-modal-title",
    "aria-describedby": "modal-modal-description",
    open: open,
    onClose: handleClose,
    children: /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
      sx: {
        width: "100%",
        height: "100%"
      },
      children: [/*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
        sx: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem 0',
          maxHeight: '100%',
          height: '100%',
          width: "80%",
          margin: "0 auto",
          boxSizing: "border-box"
        },
        children: [/*#__PURE__*/jsxRuntime.jsx(MainContent, {
          media: {
            type: media.type || "IMAGE",
            name: media.name,
            url: getImageProxy(media.url)
          }
        }), /*#__PURE__*/jsxRuntime.jsx("a", {
          ref: downloadLinkRef,
          target: "_blank",
          href: getImageProxy(media.url),
          download: true,
          style: {
            display: 'none'
          }
        })]
      }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
        size: "large",
        sx: {
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          color: '#9a9a9a',
          borderRadius: '100%',
          '&:hover': {
            '& .MuiSvgIcon-root': {
              color: 'white'
            },
            background: '#00000078'
          }
        },
        onClick: handleClose,
        children: /*#__PURE__*/jsxRuntime.jsx(ClearIcon__default["default"], {
          sx: {
            color: 'white',
            fontSize: '2rem'
          }
        })
      }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
        size: "large",
        sx: {
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          color: '#9a9a9a',
          borderRadius: '100%',
          '&:hover': {
            '& .MuiSvgIcon-root': {
              color: 'white'
            },
            background: '#00000078'
          }
        },
        onClick: function onClick() {
          handleDownload();
        },
        children: /*#__PURE__*/jsxRuntime.jsx(DownloadIcon__default["default"], {
          sx: {
            color: 'white',
            fontSize: '2rem'
          }
        })
      })]
    })
  });
};

var ImagePopupWrapper = function ImagePopupWrapper(_ref) {
  var children = _ref.children,
      media = _ref.media,
      onClose = _ref.onClose;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var handleClose = function handleClose() {
    setOpen(false);

    if (onClose) {
      onClose();
    }
  };

  var handleOpen = function handleOpen() {
    setOpen(true);
  };

  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx("div", {
      onClick: handleOpen,
      children: children
    }), /*#__PURE__*/jsxRuntime.jsx(ImagePopup, {
      media: media,
      handleClose: handleClose,
      open: open
    })]
  });
};

var MessageMedia = function MessageMedia(_ref) {
  var message = _ref.message,
      isErrorMedia = _ref.isErrorMedia,
      setIsErrorMedia = _ref.setIsErrorMedia,
      isOther = _ref.isOther,
      item = _ref.item;
  var downloadLinkRef = React.useRef();

  var handleDownload = function handleDownload() {
    if (downloadLinkRef && downloadLinkRef.current) {
      downloadLinkRef.current.click();
    }
  };

  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx("a", {
      ref: downloadLinkRef,
      target: "_blank",
      href: getImageProxy(item.url),
      download: item.name || "",
      style: {
        display: 'none'
      }
    }), item.type === "image" && /*#__PURE__*/jsxRuntime.jsx(ImagePopupWrapper, {
      media: item,
      children: /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        component: "img",
        alt: item.name || "",
        srcSet: "".concat(item.blobURL ? getImageProxy(item.blobURL) : getImageProxy(item.url), " 3x"),
        sx: {
          display: 'block',
          maxWidth: '100%',
          marginBottom: message.content ? '1rem' : '0.1em',
          height: 'auto',
          // borderTopLeftRadius: '0.85rem',
          // borderTopRightRadius: '0.85rem',
          cursor: 'pointer',
          minHeight: '70px'
        }
      })
    }), item.type === "video" && !isErrorMedia && /*#__PURE__*/jsxRuntime.jsx(ImagePopupWrapper, {
      media: item,
      children: /*#__PURE__*/jsxRuntime.jsx(MessageVideo, {
        message: message,
        item: item,
        setIsErrorMedia: setIsErrorMedia // handleDownload={() => {
        //     if (isRaw) {
        //         handleDownload()
        //     }
        //     if(!isRaw && !isError){
        //         handleMediaClick(message.messageID)
        //     }
        // }}

      })
    }), (item.type === "file" || isErrorMedia) && /*#__PURE__*/jsxRuntime.jsx(Chip__default["default"], {
      onClick: handleDownload // icon={<InsertDriveFileIcon />}
      ,
      icon: /*#__PURE__*/jsxRuntime.jsx(InsertDriveFileOutlinedIcon__default["default"], {}),
      sx: _objectSpread2(_objectSpread2({
        fontSize: '14px',
        fontWeight: 'bold'
      }, !isOther && _defineProperty({}, "& .MuiSvgIcon-root", {
        // color: "white",
        // color: '#bdbdbd',
        // color: '#808080',
        color: 'black'
      })), {}, {
        marginBottom: message.content ? '.3rem' : '0.1em'
      }),
      label: item.name
    })]
  });
};

var MessageContextMenu = function MessageContextMenu(_ref) {
  var contextMenu = _ref.contextMenu,
      setContextMenu = _ref.setContextMenu,
      menu = _ref.menu;
  return /*#__PURE__*/jsxRuntime.jsx(Menu__default["default"], {
    open: !!contextMenu,
    onClose: function onClose() {
      setContextMenu(null);
    },
    anchorReference: "anchorPosition",
    anchorPosition: contextMenu ? {
      top: contextMenu.mouseY,
      left: contextMenu.mouseX
    } : undefined,
    children: menu.map(function (item, index) {
      return /*#__PURE__*/jsxRuntime.jsx(MenuItem__default["default"], {
        onClick: function onClick() {
          item.onClick();
          setContextMenu(null);
        },
        children: item.text
      }, index);
    })
  });
};

var css_248z$g = ".EllipsisText-module_text-overflow-dynamic-container__XuNnB {\n  position: relative;\n  max-width: 100%;\n  padding: 0 !important;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: flex;\n  vertical-align: text-bottom !important;\n}\n\n.EllipsisText-module_text-overflow-dynamic-ellipsis__V4YEu {\n  position: absolute;\n  white-space: nowrap;\n  overflow-y: visible;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  -ms-text-overflow: ellipsis;\n  -o-text-overflow: ellipsis;\n  max-width: 100%;\n  min-width: 0;\n  width: 100%;\n  top: 0;\n  left: 0;\n}\n\n.EllipsisText-module_text-overflow-dynamic-container__XuNnB:after,\n.EllipsisText-module_text-overflow-dynamic-ellipsis__V4YEu:after {\n  content: \"-\";\n  display: inline;\n  visibility: hidden;\n  width: 0;\n}";
var style$f = {"text-overflow-dynamic-container":"EllipsisText-module_text-overflow-dynamic-container__XuNnB","text-overflow-dynamic-ellipsis":"EllipsisText-module_text-overflow-dynamic-ellipsis__V4YEu"};
styleInject(css_248z$g);

var EllipsisText = function EllipsisText(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return /*#__PURE__*/jsxRuntime.jsx("span", {
    className: "".concat(className || '', " ").concat(style$f["text-overflow-dynamic-container"]),
    children: /*#__PURE__*/jsxRuntime.jsx("span", {
      className: style$f["text-overflow-dynamic-ellipsis"],
      children: children
    })
  });
};

/**
 *
 */

var APIClient = /*#__PURE__*/function () {
  /**
   * @description
   * getClient() | getClient(null, { ... }) for using in Client side
   * getClient(ctx) | getClient(ctx, { ... }) for using in Server side
   * 
   * client.makeRequest(method, url, data, { useAPIKey: true }) for using API key in a specific request
   * 
   * @param ctx
   * @param data = { useAPIKey, session }
   * 
   */
  function APIClient(ctx, data) {
    _classCallCheck(this, APIClient);

    if (ctx) {
      this.ctx = ctx;
      this.session = "Bearer ".concat(getChatConf().accessToken); // this.userAgent = ctx.req.headers['user-agent']
      // this.xForwardedFor = ctx.req.headers['x-forwarded-for']
    }

    if (data) {
      this.data = data;
      this.data.props = data.props || {};

      if (data.useAPIKey === true && data.session) {
        this.session = data.session;
      }
    }
  }

  _createClass(APIClient, [{
    key: "newHeaders",
    value: function newHeaders(apiKey) {
      var hasWindow = true;

      try {
        window;
      } catch (error) {
        hasWindow = false;
      }

      return {
        "Authorization": apiKey || this.session,
        "User-Agent": hasWindow ? navigator.userAgent : this.userAgent,
        'X-Forwarded-For': hasWindow ? navigator.xForwardedFor : this.xForwardedFor
      };
    }
    /**
     *
     * @param method
     * @param url
     * @param data
     * @returns {Promise<any>}
     */

  }, {
    key: "makeRequest",
    value: function () {
      var _makeRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(method, url, data) {
        var option,
            req,
            resp,
            result,
            _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                option = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
                req = {
                  method: method,
                  headers: {
                    Authorization: "Bearer ".concat(getChatConf().accessToken)
                  }
                };

                if (option.useAPIKey === true && this.data && this.data.session) {
                  if (!req.headers) {
                    req.headers = this.newHeaders(this.data.session);
                  } else {
                    req.headers["Authorization"] = this.data.session;
                  }

                  req.headers = {};
                  req.headers["Authorization"] = this.data.session;
                } // serialize data


                if (data) {
                  if (method == "GET" || method == "DELETE") {
                    url = url + "?" + queryString__default["default"].stringify(data, {
                      arrayFormat: 'comma',
                      skipNull: true,
                      skipEmptyString: true
                    });
                  } else {
                    req.body = JSON.stringify(data);
                  }
                } // make call


                _context.next = 6;
                return fetch(url, req);

              case 6:
                resp = _context.sent;
                _context.next = 9;
                return resp.json();

              case 9:
                result = _context.sent;

                // return object
                if (result) {
                  if (result.status === APIStatus.UNAUTHORIZED && this.data) {
                    this.data.props.loggedIn = false;
                  }
                }

                return _context.abrupt("return", result);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function makeRequest(_x, _x2, _x3) {
        return _makeRequest.apply(this, arguments);
      }

      return makeRequest;
    }()
  }, {
    key: "call",
    value: function call(method, url, data, option) {
      return this.makeRequest(method, "".concat(getChatConf().apiChatUrl).concat(url), data, option);
    }
  }]);

  return APIClient;
}();

var URI_CHAT$1 = "/integration/chat/v1";

var ChatClient = /*#__PURE__*/function (_APIClient) {
  _inherits(ChatClient, _APIClient);

  var _super = _createSuper(ChatClient);

  function ChatClient(ctx, data) {
    _classCallCheck(this, ChatClient);

    return _super.call(this, ctx, data);
  }

  _createClass(ChatClient, [{
    key: "getListConversation",
    value: function getListConversation(params) {
      var stringified = queryString__default["default"].stringify(params);
      var res = this.call("GET", "".concat(URI_CHAT$1, "/conversation/list?").concat(stringified));
      return res;
    }
  }, {
    key: "getMessageInTheConversationCustomer",
    value: function getMessageInTheConversationCustomer(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/list"), params);
    }
  }, {
    key: "getMessageInTheConversationGuest",
    value: function getMessageInTheConversationGuest(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/list-for-guest"), params);
    }
  }, {
    key: "getMessageInTheConversationScrollDownCustomer",
    value: function getMessageInTheConversationScrollDownCustomer(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/list-scroll-down"), data);
    }
  }, {
    key: "getMessageInTheConversationScrollDownGuest",
    value: function getMessageInTheConversationScrollDownGuest(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/list-scroll-down-for-guest"), data);
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/create"), params);
    }
  }, {
    key: "sendMessageFromCSToCustomer",
    value: function sendMessageFromCSToCustomer(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/create-from-cs-to-customer"), params);
    }
  }, {
    key: "sendMessageFromCustomerToCS",
    value: function sendMessageFromCustomerToCS(params) {
      console.log(this);
      return this.call("POST", "".concat(URI_CHAT$1, "/message/customer-to-cs"), params);
    }
  }, {
    key: "sendMessageFromCustomerToSeller",
    value: function sendMessageFromCustomerToSeller(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/customer-with-seller/customer-to-seller"), params);
    }
  }, {
    key: "sendMessageFromGuestToCS",
    value: function sendMessageFromGuestToCS(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/guest-to-cs"), params);
    }
  }, {
    key: "getConversationById",
    value: function getConversationById(params) {
      var stringified = queryString__default["default"].stringify(params);
      return this.call("GET", "".concat(URI_CHAT$1, "/conversation/one?").concat(stringified));
    }
  }, {
    key: "pingToStayInConnectCustomer",
    value: function pingToStayInConnectCustomer(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/ping"), params);
    }
  }, {
    key: "pingToStayInConnectGuest",
    value: function pingToStayInConnectGuest(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/ping-for-guest"), params);
    }
  }, {
    key: "createConversation",
    value: function createConversation(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/create"), params);
    }
  }, {
    key: "handleSeenMessageCustomer",
    value: function handleSeenMessageCustomer(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/seen"), params);
    }
  }, {
    key: "handleSeenMessageGuest",
    value: function handleSeenMessageGuest(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/guest/seen"), params);
    }
  }, {
    key: "getMessageByIdForCustomer",
    value: function getMessageByIdForCustomer(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/one"), params);
    }
  }, {
    key: "getMessageByIdForGuest",
    value: function getMessageByIdForGuest(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/one-for-guest"), params);
    }
  }, {
    key: "getConversationResourceCustomer",
    value: function getConversationResourceCustomer(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/resource"), data);
    }
  }, {
    key: "getConversationResourceGuest",
    value: function getConversationResourceGuest(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/resource-for-guest"), data);
    }
  }, {
    key: "removeMemberInconversation",
    value: function removeMemberInconversation(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/member/remove"), data);
    }
  }, {
    key: "getListConversationSeller",
    value: function getListConversationSeller(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/something"), data);
    }
  }, {
    key: "getListConversationCustomer",
    value: function getListConversationCustomer(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/list-for-customer"), data);
    }
  }, {
    key: "getListConversationGuest",
    value: function getListConversationGuest(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/list-for-guest"), data);
    }
  }, {
    key: "updateConversationStatusToWaitToComplete",
    value: function updateConversationStatusToWaitToComplete(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/topic/transfer-to-wait-to-complete"), data);
    }
  }, {
    key: "pinConversation",
    value: function pinConversation(conversationID) {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/pin"), {
        conversationID: conversationID
      });
    }
  }, {
    key: "unpinConversation",
    value: function unpinConversation(conversationID) {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/un-pin"), {
        conversationID: conversationID
      });
    }
  }, {
    key: "reactMessage",
    value: function reactMessage(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/react"), data);
    }
  }, {
    key: "unReactMessage",
    value: function unReactMessage(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/un-react"), data);
    }
  }, {
    key: "getUserOnlineStatus",
    value: function getUserOnlineStatus(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/users/online-status"), data);
    }
  }, {
    key: "getRatingStatusCustomer",
    value: function getRatingStatusCustomer(conversationID) {
      return this.call("POST", "".concat(URI_CHAT$1, "/topic/rating-status"), {
        conversationID: conversationID
      });
    }
  }, {
    key: "getRatingStatusGuest",
    value: function getRatingStatusGuest(conversationID) {
      return this.call("POST", "".concat(URI_CHAT$1, "/topic/rating-status-for-guest"), {
        conversationID: conversationID
      });
    }
  }, {
    key: "sendRatingCustomer",
    value: function sendRatingCustomer(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/topic/rating"), data);
    }
  }, {
    key: "sendRatingGuest",
    value: function sendRatingGuest(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/topic/guest-rating"), data);
    }
  }, {
    key: "getConversationTag",
    value: function getConversationTag(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/tag/list"), params);
    }
  }, {
    key: "findMessageByDateCustomer",
    value: function findMessageByDateCustomer(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/date"), data);
    }
  }, {
    key: "findMessageByDateGuest",
    value: function findMessageByDateGuest(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/date-for-guest"), data);
    }
  }, {
    key: "searchMessage",
    value: function searchMessage(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/message/search"), data);
    }
  }, {
    key: "getChatConfiguration",
    value: function getChatConfiguration() {
      return this.call("POST", "".concat(URI_CHAT$1, "/configuration/list"));
    }
  }, {
    key: "sendGuestInfo",
    value: function sendGuestInfo(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/guest/upsert"), data);
    }
  }, {
    key: "integrateSearchTicket",
    value: function integrateSearchTicket(params) {
      return this.call("POST", "".concat(URI_CHAT$1, "/search/ticket"), params);
    }
  }, {
    key: "getSellerDetail",
    value: function getSellerDetail(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/proxy/seller/detail"), data);
    }
  }, {
    key: "findConversationBySellerCode",
    value: function findConversationBySellerCode(data) {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/belong-to-seller"), data);
    }
  }, {
    key: "getChatMetadata",
    value: function getChatMetadata() {
      return this.call("POST", "".concat(URI_CHAT$1, "/conversation/customer/metadata"));
    }
  }]);

  return ChatClient;
}(APIClient);

function getChatClient(ctx, data) {
  return new ChatClient(ctx, data);
}

var CONVERSATION_STATUS = {
  WAIT_TO_PROCESS: "WAIT_TO_PROCESS",
  PROCESSING: "PROCESSING",
  WAIT_TO_COMPLETE: "WAIT_TO_COMPLETE",
  COMPLETED: "COMPLETED"
};
var DEFAULT_ZALO_PHONE = "0932036749";
var handleConversationUnReadMessage = function handleConversationUnReadMessage(conversation) {
  var result = 0;

  if (conversation.seenMessageOrder && conversation.seenMessageOrder > 0) {
    var totalUnreadBuzzMessage = conversation.totalUnreadBuzzMessage || 0;
    result = Math.abs(conversation.totalMessage - totalUnreadBuzzMessage - conversation.seenMessageOrder);
  }

  conversation.unreadMessage = result;
  return result;
};
var sortConversationListByLastMessage = function sortConversationListByLastMessage(conversations) {
  var copy = _toConsumableArray(conversations);

  copy.sort(function (a, b) {
    if (a.lastMessage && b.lastMessage) {
      return b.lastMessage.messageID - a.lastMessage.messageID;
    } else {
      if (a.lastMessage) {
        return 1;
      }

      if (b.lastMessage) {
        return -1;
      }
    }
  });
  return copy;
};
var sortConversationListByStatus = function sortConversationListByStatus(conversations, status) {
  var notPins = conversations.filter(function (conversation) {
    return !conversation.isPinned && conversation.conversationType !== ConversationType.CUSTOMER_WITH_CS;
  });
  var newList = notPins.filter(function (conversation) {
    return conversation.conversationStatus === status;
  });
  var sortedList = sortConversationListByLastMessage(newList);
  return sortedList;
};
var sortConversationList = function sortConversationList(conversations) {
  var csConversations = conversations.filter(function (conversation) {
    return conversation.conversationType === ConversationType.CUSTOMER_WITH_CS;
  });
  var pins = conversations.filter(function (conversation) {
    return conversation.isPinned && conversation.conversationType !== ConversationType.CUSTOMER_WITH_CS;
  });
  var sortedWaitToProcessing = sortConversationListByStatus(conversations, CONVERSATION_STATUS.WAIT_TO_PROCESS);
  var sortedProcessing = sortConversationListByStatus(conversations, CONVERSATION_STATUS.PROCESSING);
  var sortedWaiToComplete = sortConversationListByStatus(conversations, CONVERSATION_STATUS.WAIT_TO_COMPLETE);
  var sortedComplete = sortConversationListByStatus(conversations, CONVERSATION_STATUS.COMPLETED);
  var copy = [].concat(_toConsumableArray(csConversations), _toConsumableArray(pins), _toConsumableArray(sortedProcessing), _toConsumableArray(sortedWaitToProcessing), _toConsumableArray(sortedWaiToComplete), _toConsumableArray(sortedComplete));
  return copy;
};
var isSameMember = function isSameMember(member1, member2) {
  return member1.accountType === member2.accountType && member1.userID === member2.userID;
};
var hasSeenMessage = function hasSeenMessage(conversation, message, user) {
  if (!message) {
    return true;
  }

  var members = conversation.members;

  for (var i = 0; i < members.length; i++) {
    if (isSameMember(members[i], {
      userID: user.accountID,
      accountType: user.type
    })) {
      if (members[i].seenMessageOrder >= message.messageOrder) {
        return true;
      }
    }
  }

  return false;
};
var isFirstOfDateMessage = function isFirstOfDateMessage(message, previousMessage) {
  if (!previousMessage) {
    return true;
  }

  return isGreaterThan(new Date(message.createdTime), new Date(previousMessage.createdTime));
};
var isAtBottomOfConversation = function isAtBottomOfConversation(conversation, listMessage) {
  if (listMessage && conversation && listMessage.length) {
    var message = conversation.lastMessage;
    return listMessage[listMessage.length - 1].status === "RAW" || listMessage[listMessage.length - 1].status === "ERROR" || message.messageOrder === listMessage[listMessage.length - 1].messageOrder;
  }

  return true;
};
var handleZaloSellerConversation = function handleZaloSellerConversation(conversation) {
  if (conversation.conversationType === ConversationType.CUSTOMER_WITH_SELLER) {
    var sellerInfo = conversation.sellerInfo;

    if (sellerInfo && !sellerInfo._allowUseBuymedChat) {
      window.open("".concat(ZALO_URL, "/").concat(getChatConf().zaloPhone || DEFAULT_ZALO_PHONE), "_blank");
      return true;
    }
  }

  return false;
};

var URI$2 = '/marketplace/order/v2';

var OrderClient = /*#__PURE__*/function (_APIClient) {
  _inherits(OrderClient, _APIClient);

  var _super = _createSuper(OrderClient);

  function OrderClient(ctx, data) {
    _classCallCheck(this, OrderClient);

    return _super.call(this, ctx, data);
  }

  _createClass(OrderClient, [{
    key: "getCustomerOrder",
    value: function getCustomerOrder(params) {
      return this.call("GET", "".concat(URI$2, "/order/list"), params);
    }
  }, {
    key: "searchCustomerOrderById",
    value: function searchCustomerOrderById(params) {
      return this.call("GET", "".concat(URI$2, "/order/search"), params);
    }
  }]);

  return OrderClient;
}(APIClient);

function getOrderClient(ctx, data) {
  return new OrderClient(ctx, data);
}

var URI$1 = "/core/master-data/v1";

var MasterDataClient = /*#__PURE__*/function (_APIClient) {
  _inherits(MasterDataClient, _APIClient);

  var _super = _createSuper(MasterDataClient);

  function MasterDataClient(ctx, data) {
    _classCallCheck(this, MasterDataClient);

    return _super.call(this, ctx, data);
  }

  _createClass(MasterDataClient, [{
    key: "getProvinceByCode",
    value: function getProvinceByCode(params) {
      return this.call("GET", "".concat(URI$1, "/province"), params);
    }
  }, {
    key: "getDistrictByCode",
    value: function getDistrictByCode(params) {
      return this.call("GET", "".concat(URI$1, "/district"), params);
    }
  }, {
    key: "getWardByCode",
    value: function getWardByCode(params) {
      return this.call("GET", "".concat(URI$1, "/ward"), params);
    }
  }]);

  return MasterDataClient;
}(APIClient);

function getMasterDataClient(ctx, data) {
  return new MasterDataClient(ctx, data);
}

var setSessionStorage = function setSessionStorage(key, value) {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    window.sessionStorage.setItem(key, value);
  }
};
var getSessionStorage = function getSessionStorage(key) {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    return window.sessionStorage.getItem(key);
  }

  return null;
};

var PROVINCE_PREFIX = "province";
var DISTRICT_PREFIX = "district";
var WARD_PREFIX = "ward";
var getProvinceByCode = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var ctx, params, client, newParams, code, data, res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx = _ref.ctx, params = _ref.params;
            client = getMasterDataClient(ctx, {});
            newParams = _objectSpread2({}, params);
            code = newParams.code;
            data = getSessionStorage(PROVINCE_PREFIX + code);

            if (data) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return client.getProvinceByCode(newParams);

          case 8:
            res = _context.sent;

            if (res.status === APIStatus.OK) {
              setSessionStorage(PROVINCE_PREFIX + code, res.data[0].name);
            }

            return _context.abrupt("return", res);

          case 11:
            return _context.abrupt("return", {
              status: APIStatus.OK,
              data: [{
                code: code,
                name: data
              }]
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getProvinceByCode(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var getDistrictByCode = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref3) {
    var ctx, params, client, newParams, code, data, res;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ctx = _ref3.ctx, params = _ref3.params;
            client = getMasterDataClient(ctx, {});
            newParams = _objectSpread2({}, params);
            code = newParams.code;
            data = getSessionStorage(DISTRICT_PREFIX + code);

            if (data) {
              _context2.next = 11;
              break;
            }

            _context2.next = 8;
            return client.getDistrictByCode(newParams);

          case 8:
            res = _context2.sent;

            if (res.status === APIStatus.OK) {
              setSessionStorage(DISTRICT_PREFIX + code, res.data[0].name);
            }

            return _context2.abrupt("return", res);

          case 11:
            return _context2.abrupt("return", {
              status: APIStatus.OK,
              data: [{
                code: code,
                name: data
              }]
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getDistrictByCode(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
var getWardByCode = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref5) {
    var ctx, params, client, newParams, wardCode, data, res;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            ctx = _ref5.ctx, params = _ref5.params;
            client = getMasterDataClient(ctx, {});
            newParams = _objectSpread2({}, params);
            wardCode = newParams.wardCode;
            data = getSessionStorage(WARD_PREFIX + wardCode);

            if (data) {
              _context3.next = 11;
              break;
            }

            _context3.next = 8;
            return client.getWardByCode(newParams);

          case 8:
            res = _context3.sent;

            if (res.status === APIStatus.OK) {
              setSessionStorage(WARD_PREFIX + wardCode, res.data[0].name);
            }

            return _context3.abrupt("return", res);

          case 11:
            return _context3.abrupt("return", {
              status: APIStatus.OK,
              data: [{
                code: wardCode,
                name: data
              }]
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getWardByCode(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var orderStatus = {
  "WAIT_TO_CONFIRM": "Chờ xác nhận",
  "CONFIRMED": "Đã xác nhận",
  "CANCEL": "Đã hủy",
  "PROCESSING": "Đang xử lý",
  "WAIT_TO_PACK": "Chờ đóng gói",
  "WAIT_TO_DELIVER": "Chờ giao hàng",
  "COMPLETED": "Đã hoàn tất",
  "DELIVERING": "Đang giao hàng",
  "RETURNED": "Đã trả hàng",
  "DELIVERED": "Đã giao",
  "RESERVING": "RESERVING"
};
var orderPaymentMethod = {
  "PAYMENT_METHOD_BANK": "Chuyển khoản",
  "PAYMENT_METHOD_BANK_1": "Chuyển khoản",
  "PAYMENT_METHOD_COD": "Tiền mặt",
  "PAYMENT_METHOD_NORMAL": "Tiền mặt",
  "PAYMENT_METHOD_CREDIT": "Hợp đồng"
};
var orderUrl = function orderUrl(order) {
  return "".concat(getChatConf().clientWebUrl, "/my-order/").concat(order.orderId || order.orderID);
};
var searchCustomerOrderById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref3) {
    var _res$data;

    var ctx, params, client, res, n, i;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ctx = _ref3.ctx, params = _ref3.params, _ref3.customerID, _ref3.accountID;
            client = getOrderClient(ctx, {});
            _context2.next = 4;
            return client.searchCustomerOrderById(_objectSpread2(_objectSpread2({}, params), {}, {
              offset: params.offset || (params.page - 1) * params.limit || 0
            }));

          case 4:
            res = _context2.sent;

            if (!(res.status === APIStatus.OK && (_res$data = res.data) !== null && _res$data !== void 0 && _res$data.length)) {
              _context2.next = 15;
              break;
            }

            n = res.data.length;
            i = 0;

          case 8:
            if (!(i < n)) {
              _context2.next = 15;
              break;
            }

            _context2.next = 11;
            return getOrderDetail(res.data[i], ctx);

          case 11:
            res.data[i] = _context2.sent;

          case 12:
            i++;
            _context2.next = 8;
            break;

          case 15:
            return _context2.abrupt("return", res);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function searchCustomerOrderById(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
var getOrderDetail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(order, ctx) {
    var result, _yield$Promise$all, _yield$Promise$all2, wardRes, districtRes, provinceRes;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            result = _objectSpread2(_objectSpread2({}, order), {}, {
              detailAddress: {}
            });
            _context3.next = 3;
            return Promise.all([getWardByCode({
              params: {
                wardCode: order.customerWardCode
              },
              ctx: ctx
            }), getDistrictByCode({
              params: {
                code: order.customerDistrictCode
              },
              ctx: ctx
            }), getProvinceByCode({
              params: {
                code: result.customerProvinceCode
              },
              ctx: ctx
            })]);

          case 3:
            _yield$Promise$all = _context3.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 4);
            wardRes = _yield$Promise$all2[0];
            districtRes = _yield$Promise$all2[1];
            provinceRes = _yield$Promise$all2[2];
            _yield$Promise$all2[3];

            if (provinceRes.status === APIStatus.OK) {
              result.detailAddress.province = provinceRes.data[0].name;
            }

            if (districtRes.status === APIStatus.OK) {
              result.detailAddress.district = districtRes.data[0].name;
            }

            if (wardRes.status === APIStatus.OK) {
              result.detailAddress.ward = wardRes.data[0].name;
            }

            return _context3.abrupt("return", result);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getOrderDetail(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();

var initialState = {
  totalUnreadMessage: 0,
  listConversation: [],
  listMessage: [],
  listResource: [],
  listTags: [],
  currentConversation: null,
  conversationPagination: {
    page: 1,
    limit: 10,
    isOver: true
  },
  messagePagination: {
    limit: 20,
    isOver: false,
    isOverBottom: true
  },
  resourcePagination: {
    page: 1,
    limit: 20,
    isOver: false,
    total: 0
  },
  tagPagination: {
    page: 1,
    limit: 20,
    isOver: false
  },
  loading: {
    messageList: false,
    resourceList: false,
    tagList: false,
    conversationList: false
  },
  error: {},
  conversationFilter: {
    text: ''
  },
  foundMessage: null
};

var img$n = "data:image/svg+xml,%3csvg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.83863 7.23639C1.29415 7.23639 0.0419922 8.52644 0.0419922 10.1177V12.9989H5.63643V10.1177C5.63528 8.52644 4.38312 7.23639 2.83863 7.23639Z' fill='%2315A959'/%3e%3cpath d='M6.97363 10.1199C6.97363 11.7111 8.22579 13 9.76912 13H12.5646V7.23865H9.77027C8.22579 7.23865 6.97363 8.5287 6.97363 10.1199Z' fill='%2315A959'/%3e%3cpath d='M6.97559 0V2.88009C6.97559 4.47132 8.22775 5.76018 9.77108 5.76018C11.3144 5.76018 12.5666 4.47013 12.5666 2.88009V0H6.97559Z' fill='%2315A959'/%3e%3cpath d='M2.80124 0.00476074H0V5.76613H2.80124C4.34227 5.76613 5.59213 4.47845 5.59213 2.89078V2.88011C5.59213 1.29244 4.34227 0.00476074 2.80124 0.00476074Z' fill='%2315A959'/%3e%3c/svg%3e";

var img$m = "data:image/png;base64,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";

var handleGetMessageOrderDetail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(messages) {
    var n, i, _messages$i$orderInfo;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            n = messages.length;
            i = 0;

          case 2:
            if (!(i < n)) {
              _context.next = 10;
              break;
            }

            if (!((_messages$i$orderInfo = messages[i].orderInfo) !== null && _messages$i$orderInfo !== void 0 && _messages$i$orderInfo.orderID)) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return getOrderDetail(messages[i].orderInfo, null);

          case 6:
            messages[i].orderInfo = _context.sent;

          case 7:
            i++;
            _context.next = 2;
            break;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleGetMessageOrderDetail(_x) {
    return _ref.apply(this, arguments);
  };
}();
var prepareConventionListData = function prepareConventionListData(conversations) {
  if (conversations !== null && conversations !== void 0 && conversations.length) {
    conversations.forEach(function (item) {
      var _sellerStore$logo;

      var sellerInfo = item.sellerInfo || {};
      var sellerStore = sellerInfo.sellerStore || {};
      item.customerSupportAvatar = item.conversationType === ConversationType.CUSTOMER_WITH_SELLER ? ((_sellerStore$logo = sellerStore.logo) === null || _sellerStore$logo === void 0 ? void 0 : _sellerStore$logo[0]) || sellerInfo.avatar || img$m : img$n;
      item.conversationName = item.conversationType === ConversationType.CUSTOMER_WITH_SELLER ? sellerStore.name || sellerInfo.name : item.conversationName;
      item = handleConversationUnReadMessage(item);
    });
  }
};
function getMessageByIdForCustomer(_x2) {
  return _getMessageByIdForCustomer.apply(this, arguments);
}

function _getMessageByIdForCustomer() {
  _getMessageByIdForCustomer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(_ref2) {
    var _res$data8;

    var ctx, params, client, res;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            ctx = _ref2.ctx, params = _ref2.params;
            client = getChatClient(ctx, {});
            _context21.next = 4;
            return client.getMessageByIdForCustomer(params);

          case 4:
            res = _context21.sent;

            if (!(res.status === APIStatus.OK && (_res$data8 = res.data) !== null && _res$data8 !== void 0 && _res$data8.length)) {
              _context21.next = 8;
              break;
            }

            _context21.next = 8;
            return handleGetMessageOrderDetail(res.data);

          case 8:
            return _context21.abrupt("return", res);

          case 9:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  }));
  return _getMessageByIdForCustomer.apply(this, arguments);
}

function getMessageByIdForGuest(_x3) {
  return _getMessageByIdForGuest.apply(this, arguments);
}

function _getMessageByIdForGuest() {
  _getMessageByIdForGuest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(params) {
    var client, res;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            client = getChatClient(null, {});
            _context22.next = 3;
            return client.getMessageByIdForGuest(params);

          case 3:
            res = _context22.sent;
            return _context22.abrupt("return", res);

          case 5:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  }));
  return _getMessageByIdForGuest.apply(this, arguments);
}

function getMessageInTheConversationCustomer(_x4) {
  return _getMessageInTheConversationCustomer.apply(this, arguments);
}

function _getMessageInTheConversationCustomer() {
  _getMessageInTheConversationCustomer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(_ref3) {
    var _res$data9;

    var ctx, params, client, newParams, res;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            ctx = _ref3.ctx, params = _ref3.params;
            client = getChatClient(ctx, {});
            newParams = _objectSpread2({}, params);

            try {
              JSON.parse(newParams.q);
            } catch (_unused) {
              delete newParams.q;
            } // newParams.offset =
            // 	!params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 5);


            newParams.getTotal = false;
            _context23.next = 7;
            return client.getMessageInTheConversationCustomer(newParams);

          case 7:
            res = _context23.sent;

            if (!(res.status === APIStatus.OK && (_res$data9 = res.data) !== null && _res$data9 !== void 0 && _res$data9.length)) {
              _context23.next = 11;
              break;
            }

            _context23.next = 11;
            return handleGetMessageOrderDetail(res.data);

          case 11:
            return _context23.abrupt("return", res);

          case 12:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23);
  }));
  return _getMessageInTheConversationCustomer.apply(this, arguments);
}

function getMessageInTheConversationGuest(_x5) {
  return _getMessageInTheConversationGuest.apply(this, arguments);
}

function _getMessageInTheConversationGuest() {
  _getMessageInTheConversationGuest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(_ref4) {
    var ctx, params, client, newParams, res;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            ctx = _ref4.ctx, params = _ref4.params;
            client = getChatClient(ctx, {});
            newParams = _objectSpread2({}, params);

            try {
              JSON.parse(newParams.q);
            } catch (_unused2) {
              delete newParams.q;
            } // newParams.offset =
            // 	!params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 5);


            newParams.getTotal = false;
            _context24.next = 7;
            return client.getMessageInTheConversationGuest(newParams);

          case 7:
            res = _context24.sent;
            return _context24.abrupt("return", res);

          case 9:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24);
  }));
  return _getMessageInTheConversationGuest.apply(this, arguments);
}

function handleSeenMessageCustomer(_x6) {
  return _handleSeenMessageCustomer.apply(this, arguments);
}

function _handleSeenMessageCustomer() {
  _handleSeenMessageCustomer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(_ref5) {
    var ctx, params, client, res;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            ctx = _ref5.ctx, params = _ref5.params;
            client = getChatClient(ctx, {});
            _context25.next = 4;
            return client.handleSeenMessageCustomer(params);

          case 4:
            res = _context25.sent;
            return _context25.abrupt("return", res);

          case 6:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25);
  }));
  return _handleSeenMessageCustomer.apply(this, arguments);
}

function handleSeenMessageGuest(_x7) {
  return _handleSeenMessageGuest.apply(this, arguments);
}

function _handleSeenMessageGuest() {
  _handleSeenMessageGuest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(_ref6) {
    var ctx, params, client, res;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            ctx = _ref6.ctx, params = _ref6.params;
            client = getChatClient(ctx, {});
            _context26.next = 4;
            return client.handleSeenMessageGuest(params);

          case 4:
            res = _context26.sent;
            return _context26.abrupt("return", res);

          case 6:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26);
  }));
  return _handleSeenMessageGuest.apply(this, arguments);
}

function pingToStayInConnectCustomer(_x8) {
  return _pingToStayInConnectCustomer.apply(this, arguments);
}

function _pingToStayInConnectCustomer() {
  _pingToStayInConnectCustomer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(_ref7) {
    var ctx, params, client, res;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            ctx = _ref7.ctx, params = _ref7.params;
            client = getChatClient(ctx, {});
            _context27.next = 4;
            return client.pingToStayInConnectCustomer(params);

          case 4:
            res = _context27.sent;
            return _context27.abrupt("return", res);

          case 6:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27);
  }));
  return _pingToStayInConnectCustomer.apply(this, arguments);
}

function pingToStayInConnectGuest(_x9) {
  return _pingToStayInConnectGuest.apply(this, arguments);
}

function _pingToStayInConnectGuest() {
  _pingToStayInConnectGuest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(_ref8) {
    var ctx, params, client, res;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            ctx = _ref8.ctx, params = _ref8.params;
            client = getChatClient(ctx, {});
            _context28.next = 4;
            return client.pingToStayInConnectGuest(params);

          case 4:
            res = _context28.sent;
            return _context28.abrupt("return", res);

          case 6:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28);
  }));
  return _pingToStayInConnectGuest.apply(this, arguments);
}

function getConversationResourceCustomer(_x10) {
  return _getConversationResourceCustomer.apply(this, arguments);
}

function _getConversationResourceCustomer() {
  _getConversationResourceCustomer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(_ref9) {
    var ctx, params, client, res;
    return _regeneratorRuntime().wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            ctx = _ref9.ctx, params = _ref9.params;
            client = getChatClient(ctx, {});
            _context29.next = 4;
            return client.getConversationResourceCustomer(params);

          case 4:
            res = _context29.sent;
            return _context29.abrupt("return", res);

          case 6:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29);
  }));
  return _getConversationResourceCustomer.apply(this, arguments);
}

function getConversationResourceGuest(_x11) {
  return _getConversationResourceGuest.apply(this, arguments);
}

function _getConversationResourceGuest() {
  _getConversationResourceGuest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(params) {
    var client, res;
    return _regeneratorRuntime().wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            client = getChatClient(null, {});
            _context30.next = 3;
            return client.getConversationResourceGuest(params);

          case 3:
            res = _context30.sent;
            return _context30.abrupt("return", res);

          case 5:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30);
  }));
  return _getConversationResourceGuest.apply(this, arguments);
}

function sendChatMessage(_x12) {
  return _sendChatMessage.apply(this, arguments);
}

function _sendChatMessage() {
  _sendChatMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31(_ref10) {
    var ctx, params, conversationType, client, newParams;
    return _regeneratorRuntime().wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            ctx = _ref10.ctx, params = _ref10.params, conversationType = _ref10.conversationType;
            client = getChatClient(ctx, {});
            newParams = _objectSpread2({}, params);
            newParams.type = newParams.type || "TEXT";

            if (!(conversationType === ConversationType.CUSTOMER_WITH_CS)) {
              _context31.next = 10;
              break;
            }

            _context31.next = 7;
            return client.sendMessageFromCustomerToCS(newParams);

          case 7:
            return _context31.abrupt("return", _context31.sent);

          case 10:
            if (!(conversationType === ConversationType.CUSTOMER_WITH_SELLER)) {
              _context31.next = 16;
              break;
            }

            _context31.next = 13;
            return client.sendMessageFromCustomerToSeller(newParams);

          case 13:
            return _context31.abrupt("return", _context31.sent);

          case 16:
            _context31.next = 18;
            return client.sendMessageFromGuestToCS(newParams);

          case 18:
            return _context31.abrupt("return", _context31.sent);

          case 19:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31);
  }));
  return _sendChatMessage.apply(this, arguments);
}

var pinConversation = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref11) {
    var ctx, conversationID, client, res;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ctx = _ref11.ctx, conversationID = _ref11.conversationID;
            client = getChatClient(ctx, {});
            _context2.next = 4;
            return client.pinConversation(conversationID);

          case 4:
            res = _context2.sent;
            return _context2.abrupt("return", res);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function pinConversation(_x13) {
    return _ref12.apply(this, arguments);
  };
}();
var unpinConversation = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref13) {
    var ctx, conversationID, client, res;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            ctx = _ref13.ctx, conversationID = _ref13.conversationID;
            client = getChatClient(ctx, {});
            _context3.next = 4;
            return client.unpinConversation(conversationID);

          case 4:
            res = _context3.sent;
            return _context3.abrupt("return", res);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function unpinConversation(_x14) {
    return _ref14.apply(this, arguments);
  };
}();
var reactMessage = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref15) {
    var ctx, data, client, res;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ctx = _ref15.ctx, data = _ref15.data;
            client = getChatClient(ctx, {});
            _context4.next = 4;
            return client.reactMessage(data);

          case 4:
            res = _context4.sent;
            return _context4.abrupt("return", res);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function reactMessage(_x15) {
    return _ref16.apply(this, arguments);
  };
}();
var unReactMessage = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref17) {
    var ctx, data, client, res;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            ctx = _ref17.ctx, data = _ref17.data;
            client = getChatClient(ctx, {});
            _context5.next = 4;
            return client.unReactMessage(data);

          case 4:
            res = _context5.sent;
            return _context5.abrupt("return", res);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function unReactMessage(_x16) {
    return _ref18.apply(this, arguments);
  };
}();
var getConversationTag = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref19) {
    var _res$data;

    var ctx, data, client, res;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            ctx = _ref19.ctx, data = _ref19.data;
            client = getChatClient(ctx, {});
            _context6.next = 4;
            return client.getConversationTag(_objectSpread2({
              offset: 0,
              limit: 10
            }, data));

          case 4:
            res = _context6.sent;

            if (!(res.status === APIStatus.OK && (_res$data = res.data) !== null && _res$data !== void 0 && _res$data.length)) {
              _context6.next = 8;
              break;
            }

            _context6.next = 8;
            return handleGetMessageOrderDetail(res.data);

          case 8:
            return _context6.abrupt("return", res);

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getConversationTag(_x17) {
    return _ref20.apply(this, arguments);
  };
}();
var getMessageScrollDownCustomer = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_ref21) {
    var _res$data2;

    var ctx, data, client, res;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            ctx = _ref21.ctx, data = _ref21.data;
            client = getChatClient(ctx, {});
            _context7.next = 4;
            return client.getMessageInTheConversationScrollDownCustomer(data);

          case 4:
            res = _context7.sent;

            if (!(res.status === APIStatus.OK && (_res$data2 = res.data) !== null && _res$data2 !== void 0 && _res$data2.length)) {
              _context7.next = 8;
              break;
            }

            _context7.next = 8;
            return handleGetMessageOrderDetail(res.data);

          case 8:
            return _context7.abrupt("return", res);

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getMessageScrollDownCustomer(_x18) {
    return _ref22.apply(this, arguments);
  };
}();
var getMessageScrollDownGuest = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref23) {
    var ctx, data, client, res;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            ctx = _ref23.ctx, data = _ref23.data;
            client = getChatClient(ctx, {});
            _context8.next = 4;
            return client.getMessageInTheConversationScrollDownGuest(data);

          case 4:
            res = _context8.sent;
            return _context8.abrupt("return", res);

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getMessageScrollDownGuest(_x19) {
    return _ref24.apply(this, arguments);
  };
}();
var findMessageByDate = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(_ref25) {
    var ctx, data, conversationType, client, message, _res$data3, _client, res, _res$data4, _res;

    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            ctx = _ref25.ctx, data = _ref25.data, conversationType = _ref25.conversationType;
            client = getChatClient(ctx, {});

            if (!(conversationType === ConversationType.GUEST_WITH_CS)) {
              _context9.next = 10;
              break;
            }

            _client = getChatClient(ctx, {});
            _context9.next = 6;
            return _client.findMessageByDateGuest(data);

          case 6:
            res = _context9.sent;

            if (res.status === APIStatus.OK && (_res$data3 = res.data) !== null && _res$data3 !== void 0 && _res$data3.length) {
              message = res.data[0];
            }

            _context9.next = 17;
            break;

          case 10:
            _context9.next = 12;
            return client.findMessageByDateCustomer(data);

          case 12:
            _res = _context9.sent;

            if (!(_res.status === APIStatus.OK && (_res$data4 = _res.data) !== null && _res$data4 !== void 0 && _res$data4.length)) {
              _context9.next = 17;
              break;
            }

            _context9.next = 16;
            return handleGetMessageOrderDetail(_res.data);

          case 16:
            message = _res.data[0];

          case 17:
            return _context9.abrupt("return", message);

          case 18:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function findMessageByDate(_x20) {
    return _ref26.apply(this, arguments);
  };
}();
function getListConversationCustomer(_x21) {
  return _getListConversationCustomer.apply(this, arguments);
}

function _getListConversationCustomer() {
  _getListConversationCustomer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32(_ref27) {
    var _res$data10;

    var ctx, params, client, newParams, res;
    return _regeneratorRuntime().wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            ctx = _ref27.ctx, params = _ref27.params;
            client = getChatClient(ctx, {});
            newParams = _objectSpread2({}, params);

            try {
              JSON.parse(newParams.q);
            } catch (_unused3) {
              delete newParams.q;
            }

            newParams.offset = 0;
            newParams.limit = initialState.conversationPagination.limit;
            _context32.next = 8;
            return client.getListConversationCustomer(newParams);

          case 8:
            res = _context32.sent;

            if (!(res.status === APIStatus.OK && (_res$data10 = res.data) !== null && _res$data10 !== void 0 && _res$data10.length)) {
              _context32.next = 12;
              break;
            }

            prepareConventionListData(res.data);
            return _context32.abrupt("return", res.data);

          case 12:
            return _context32.abrupt("return", []);

          case 13:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32);
  }));
  return _getListConversationCustomer.apply(this, arguments);
}

function getListConversation(_x22) {
  return _getListConversation.apply(this, arguments);
}

function _getListConversation() {
  _getListConversation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(_ref28) {
    var _res$data11;

    var ctx, params, client, newParams, res;
    return _regeneratorRuntime().wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            ctx = _ref28.ctx, params = _ref28.params;
            client = getChatClient(ctx, {});
            newParams = _objectSpread2({}, params);
            _context33.next = 5;
            return client.getListConversationCustomer(newParams);

          case 5:
            res = _context33.sent;

            if (res.status === APIStatus.OK && (_res$data11 = res.data) !== null && _res$data11 !== void 0 && _res$data11.length) {
              prepareConventionListData(res.data);
            }

            return _context33.abrupt("return", res);

          case 8:
          case "end":
            return _context33.stop();
        }
      }
    }, _callee33);
  }));
  return _getListConversation.apply(this, arguments);
}

function getListConversationGuest(_x23) {
  return _getListConversationGuest.apply(this, arguments);
}

function _getListConversationGuest() {
  _getListConversationGuest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee34(_ref29) {
    var _res$data12;

    var ctx, params, client, res;
    return _regeneratorRuntime().wrap(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            ctx = _ref29.ctx, params = _ref29.params;
            client = getChatClient(ctx, {});
            _context34.next = 4;
            return client.getListConversationGuest(params);

          case 4:
            res = _context34.sent;

            if (!(res.status === APIStatus.OK && (_res$data12 = res.data) !== null && _res$data12 !== void 0 && _res$data12.length)) {
              _context34.next = 7;
              break;
            }

            return _context34.abrupt("return", res.data.map(function (conversation) {
              return _objectSpread2(_objectSpread2({}, conversation), {}, {
                customerSupportAvatar: img$n
              });
            }));

          case 7:
            return _context34.abrupt("return", []);

          case 8:
          case "end":
            return _context34.stop();
        }
      }
    }, _callee34);
  }));
  return _getListConversationGuest.apply(this, arguments);
}

var getRatingStatusCustomer = /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(ctx, conversationID) {
    var client, res;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            client = getChatClient(ctx, {});
            _context10.next = 3;
            return client.getRatingStatusCustomer(conversationID);

          case 3:
            res = _context10.sent;
            return _context10.abrupt("return", res);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function getRatingStatusCustomer(_x24, _x25) {
    return _ref30.apply(this, arguments);
  };
}();
var getRatingStatusGuest = /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(ctx, conversationID) {
    var client, res;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            client = getChatClient(ctx, {});
            _context11.next = 3;
            return client.getRatingStatusGuest(conversationID);

          case 3:
            res = _context11.sent;
            return _context11.abrupt("return", res);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function getRatingStatusGuest(_x26, _x27) {
    return _ref31.apply(this, arguments);
  };
}();
var sendRatingCustomer = /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(ctx, data) {
    var client, res;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            client = getChatClient(ctx, {});
            _context12.next = 3;
            return client.sendRatingCustomer(data);

          case 3:
            res = _context12.sent;
            return _context12.abrupt("return", res);

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function sendRatingCustomer(_x28, _x29) {
    return _ref32.apply(this, arguments);
  };
}();
var sendRatingGuest = /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(ctx, data) {
    var client, res;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            client = getChatClient(ctx, {});
            _context13.next = 3;
            return client.sendRatingGuest(data);

          case 3:
            res = _context13.sent;
            return _context13.abrupt("return", res);

          case 5:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function sendRatingGuest(_x30, _x31) {
    return _ref33.apply(this, arguments);
  };
}();
var sendGuestInfo = /*#__PURE__*/function () {
  var _ref35 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(_ref34) {
    var ctx, params, client, res;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            ctx = _ref34.ctx, params = _ref34.params;
            client = getChatClient(ctx, {});
            _context14.next = 4;
            return client.sendGuestInfo(params);

          case 4:
            res = _context14.sent;
            return _context14.abrupt("return", res);

          case 6:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function sendGuestInfo(_x32) {
    return _ref35.apply(this, arguments);
  };
}();
var getChatConfiguration = /*#__PURE__*/function () {
  var _ref36 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(ctx) {
    var client, res;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            client = getChatClient(ctx, {});
            _context15.next = 3;
            return client.getChatConfiguration();

          case 3:
            res = _context15.sent;
            return _context15.abrupt("return", res);

          case 5:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function getChatConfiguration(_x33) {
    return _ref36.apply(this, arguments);
  };
}();
var integrateSearchTicket = /*#__PURE__*/function () {
  var _ref38 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(_ref37) {
    var ctx, params, client, res;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            ctx = _ref37.ctx, params = _ref37.params;
            client = getChatClient(ctx);
            _context16.next = 4;
            return client.integrateSearchTicket(params);

          case 4:
            res = _context16.sent;
            return _context16.abrupt("return", res);

          case 6:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));

  return function integrateSearchTicket(_x34) {
    return _ref38.apply(this, arguments);
  };
}();
var findConversationBySellerCode = /*#__PURE__*/function () {
  var _ref42 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(_ref41) {
    var _res$data5;

    var ctx, data, client, res;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            ctx = _ref41.ctx, data = _ref41.data;
            client = getChatClient(ctx, {});
            _context18.next = 4;
            return client.findConversationBySellerCode(data);

          case 4:
            res = _context18.sent;

            if (!((res === null || res === void 0 ? void 0 : res.status) === APIStatus.OK && (_res$data5 = res.data) !== null && _res$data5 !== void 0 && _res$data5.length)) {
              _context18.next = 8;
              break;
            }

            prepareConventionListData(res.data);
            return _context18.abrupt("return", res.data[0]);

          case 8:
            return _context18.abrupt("return", null);

          case 9:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));

  return function findConversationBySellerCode(_x36) {
    return _ref42.apply(this, arguments);
  };
}();
var getChatMetadata = /*#__PURE__*/function () {
  var _ref43 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
    var _res$data6;

    var client, res;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            client = getChatClient(null, {});
            _context19.next = 3;
            return client.getChatMetadata();

          case 3:
            res = _context19.sent;

            if (!((res === null || res === void 0 ? void 0 : res.status) === APIStatus.OK && (_res$data6 = res.data) !== null && _res$data6 !== void 0 && _res$data6.length)) {
              _context19.next = 6;
              break;
            }

            return _context19.abrupt("return", res.data[0]);

          case 6:
            return _context19.abrupt("return", null);

          case 7:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));

  return function getChatMetadata() {
    return _ref43.apply(this, arguments);
  };
}();
var createSellerConversation = /*#__PURE__*/function () {
  var _ref45 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(_ref44) {
    var _res$data7;

    var ctx, data, client, res, _sellerStore$logo2, sellerInfo, sellerStore;

    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            ctx = _ref44.ctx, data = _ref44.data;
            client = getChatClient(ctx, {});
            _context20.next = 4;
            return client.getSellerDetail(data);

          case 4:
            res = _context20.sent;

            if (!((res === null || res === void 0 ? void 0 : res.status) === APIStatus.OK && (_res$data7 = res.data) !== null && _res$data7 !== void 0 && _res$data7.length)) {
              _context20.next = 9;
              break;
            }

            sellerInfo = res.data[0] || {};
            sellerStore = sellerInfo.sellerStore || {};
            return _context20.abrupt("return", {
              rawID: uuid.v4(),
              sellerID: sellerInfo.accountID,
              sellerInfo: sellerInfo,
              customerSupportAvatar: ((_sellerStore$logo2 = sellerStore.logo) === null || _sellerStore$logo2 === void 0 ? void 0 : _sellerStore$logo2[0]) || sellerInfo.avatar || img$m,
              conversationName: sellerStore.name || sellerInfo.name,
              conversationType: ConversationType.CUSTOMER_WITH_SELLER,
              conversationStatus: ConversationStatus.WAIT_TO_PROCESS,
              members: []
            });

          case 9:
            return _context20.abrupt("return", null);

          case 10:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }));

  return function createSellerConversation(_x37) {
    return _ref45.apply(this, arguments);
  };
}();

var ChatSettingContext = /*#__PURE__*/React.createContext();
var SETTING_KEY = {
  EMOJI: "emoji",
  CHAT_BOT: "chatBot",
  GIF: "gif",
  STICKER: "sticker",
  REACTION: "reaction"
};

var ChatSettingProvider = function ChatSettingProvider(_ref) {
  var children = _ref.children,
      user = _ref.user,
      chatSetting = _ref.chatSetting,
      _ref$listTags = _ref.listTags,
      listTags = _ref$listTags === void 0 ? [] : _ref$listTags;

  var _useState = React.useState(chatSetting),
      _useState2 = _slicedToArray(_useState, 2),
      config = _useState2[0],
      setConfig = _useState2[1];

  var isShow = function isShow(type) {
    if (!config) {
      return true;
    }

    return config[type];
  };

  var getConfig = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var res;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getChatConfiguration();

            case 2:
              res = _context.sent;

              if (res.status === APIStatus.OK) {
                setConfig(res.data[0]);
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getConfig() {
      return _ref2.apply(this, arguments);
    };
  }();

  React.useEffect(function () {
    if (!chatSetting) {
      if (user.type === UserType.CUSTOMER) {
        getConfig();
      } else {
        var _setConfig;

        setConfig((_setConfig = {}, _defineProperty(_setConfig, SETTING_KEY.EMOJI, true), _defineProperty(_setConfig, SETTING_KEY.CHAT_BOT, false), _defineProperty(_setConfig, SETTING_KEY.GIF, true), _defineProperty(_setConfig, SETTING_KEY.STICKER, false), _defineProperty(_setConfig, SETTING_KEY.TATSTC, false), _setConfig));
      }
    }
  }, []);
  return /*#__PURE__*/jsxRuntime.jsx(ChatSettingContext.Provider, {
    value: {
      isShow: isShow,
      listTags: listTags
    },
    children: children
  });
};

var URI_CUSTOMER = '/marketplace/customer/v1';
var URI_ACCOUNT = "/core/account/v1";

var CustomerClient = /*#__PURE__*/function (_APIClient) {
  _inherits(CustomerClient, _APIClient);

  var _super = _createSuper(CustomerClient);

  function CustomerClient(ctx, data) {
    _classCallCheck(this, CustomerClient);

    return _super.call(this, ctx, data);
  }

  _createClass(CustomerClient, [{
    key: "getCustomerInfo",
    value: function getCustomerInfo() {
      return this.call("GET", "".concat(URI_CUSTOMER, "/me"));
    }
  }, {
    key: "getAccountInfo",
    value: function getAccountInfo() {
      return this.call("GET", "".concat(URI_ACCOUNT, "/me?getPermissions=true"));
    }
  }, {
    key: "getAccountInfoByID",
    value: function getAccountInfoByID(params) {
      var stringified = queryString__default["default"].stringify(params);
      return this.call("GET", "".concat(URI_ACCOUNT, "/account/list?").concat(stringified));
    }
  }]);

  return CustomerClient;
}(APIClient);

function getCustomerClient(ctx, data) {
  return new CustomerClient(ctx, data);
}

var URI = "/marketplace/product/v2";
var URI_SELLER = "/seller/core/v1";
var URI_CHAT = "/integration/chat/v1";

var ProductClient = /*#__PURE__*/function (_APIClient) {
  _inherits(ProductClient, _APIClient);

  var _super = _createSuper(ProductClient);

  function ProductClient() {
    _classCallCheck(this, ProductClient);

    return _super.apply(this, arguments);
  }

  _createClass(ProductClient, [{
    key: "searchProduct",
    value: function searchProduct(params) {
      return this.call("POST", "".concat(URI, "/search-component/fuzzy"), params);
    }
  }, {
    key: "searchProductV2",
    value: function searchProductV2(data) {
      return this.call("POST", "".concat(URI_CHAT, "/search/fuzzy"), data);
    }
  }, {
    key: "getSeller",
    value: function getSeller(params) {
      return this.call("GET", "".concat(URI_SELLER, "/account/list"), params);
    }
  }, {
    key: "getManufacturer",
    value: function getManufacturer(params) {
      return this.call("GET", "".concat(URI, "/manufacturer/list"), params);
    }
  }, {
    key: "getProductDetail",
    value: function getProductDetail(params) {
      return this.call("GET", "".concat(URI, "/product/detail"), params);
    }
  }, {
    key: "getProductNameByCode",
    value: function getProductNameByCode(params) {
      return this.call("GET", "".concat(URI, "/product/list"), params);
    } // /marketplace/product/v2/tag/list

  }, {
    key: "getTags",
    value: function getTags(params) {
      return this.call("GET", "".concat(URI, "/tag/list"), params);
    }
  }]);

  return ProductClient;
}(APIClient);

function getProductClient(ctx, data) {
  return new ProductClient(ctx, data);
}

var isUpdatingText = "Đang cập nhật";
var DEAL_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
};

var isInUseDeal = function isInUseDeal(deal) {
  var d = new Date();

  if (!deal.endTime) {
    return false;
  }

  var end = new Date(deal.endTime);

  if (!deal.readyTime && !deal.startTime) {
    return false;
  }

  var ready = new Date(deal.readyTime || deal.startTime);
  return deal.status === DEAL_STATUS.ACTIVE && d.getTime() <= end.getTime() && d.getTime() >= ready.getTime();
};

var productUrl = function productUrl(product) {
  return "".concat(getChatConf().clientWebUrl, "/product/").concat(product.slug);
};
var handleSellerInfo = function handleSellerInfo(sellerInfo) {
  if (sellerInfo) {
    return {
      name: sellerInfo.name || "",
      code: sellerInfo.code,
      sellerType: sellerInfo.sellerType,
      sellerClass: sellerInfo.sellerClass,
      sellerID: sellerInfo.sellerID
    };
  }

  return {
    name: "",
    code: "",
    sellerType: "",
    sellerClass: "",
    sellerID: 0
  };
};
var handleSkuInfo = function handleSkuInfo(_ref) {
  var product = _ref.product,
      skuItem = _ref.skuItem,
      displayPrice = _ref.displayPrice,
      moreInfo = _ref.moreInfo,
      nextPriceLevel = _ref.nextPriceLevel,
      campaign = _ref.campaign,
      deal = _ref.deal;
  return {
    name: product.name,
    productID: product.productID,
    sku: skuItem.sku,
    status: skuItem.status,
    type: skuItem.type,
    statusData: skuItem.statusData,
    lotDates: skuItem.lotDates,
    dealCode: skuItem.dealCode,
    campaignCode: skuItem.campaignCode,
    isActive: skuItem.isActive,
    campaign: (skuItem === null || skuItem === void 0 ? void 0 : skuItem.campaign) || campaign,
    deal: (skuItem === null || skuItem === void 0 ? void 0 : skuItem.deal) || deal,
    price: {
      originalPrice: displayPrice.originalPrice,
      //Giá gốc
      currentPrice: displayPrice.currentPrice,
      //Giá sau giảm giá
      percentageDiscount: displayPrice.percentageDiscount //Phần trăm giảm giá

    },
    nextPrice: nextPriceLevel ? nextPriceLevel.price || 0 : 0,
    //Giá khi thăng hạng
    tagTime: new Date(),
    tags: skuItem.tags,
    //danh sách tag của sản phẩm,
    amountInCart: moreInfo.amountInCart || -1,
    //Số lượng trong giỏ hàng
    volume: product.volume,
    //Cách thức đóng gói
    manufacturer: moreInfo.manufacturer,
    //Nhà sản xuất
    seller: moreInfo.seller,
    //Nhà bán hàng,
    sellerInfo: handleSellerInfo(skuItem.sellerInfo),
    slug: skuItem.slug || product.slug,
    imageUrls: product.imageUrls,
    productCode: product.code
  };
};
var searchProductV2 = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref7) {
    var ctx, data, customerID, client, res, products, n, i;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            ctx = _ref7.ctx, data = _ref7.data, customerID = _ref7.customerID;
            client = getProductClient(ctx);
            _context5.next = 4;
            return client.searchProductV2(_objectSpread2(_objectSpread2({}, data), {}, {
              offset: data.page && data.limit ? (data.page - 1) * data.limit : 0
            }));

          case 4:
            res = _context5.sent;

            //call other API to get all infomation
            if (res.status === "OK") {
              products = res.data;
              n = products.length;

              for (i = 0; i < n; i++) {
                products[i].moreInfo = {
                  seller: isUpdatingText,
                  manufacturer: isUpdatingText
                };
              }

              if (customerID && products.length) {
                products.forEach(function (product) {
                  product.displayPrice = handleProductPrice(product);
                  product.skuItem = product.sku;
                  delete product.sku;
                });
              }
            }

            return _context5.abrupt("return", res);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function searchProductV2(_x9) {
    return _ref8.apply(this, arguments);
  };
}();

var findDiscountPercent = function findDiscountPercent(salePrice, displayPrice) {
  if (salePrice === displayPrice || displayPrice > salePrice) return 0;
  var percentDiscountProduct = (salePrice - displayPrice) / salePrice * 100;
  if (percentDiscountProduct > 100) percentDiscountProduct = 100;
  return Math.floor(percentDiscountProduct);
};

var handleProductPrice = function handleProductPrice(product) {
  var price = {};

  if (product.sku) {
    price.originalPrice = product.sku.retailPriceValue || product.sku.purchasePrice || product.sku.rawPrice;
  } else if (product.skuItem) {
    price.originalPrice = product.skuItem.retailPriceValue || product.skuItem.purchasePrice || product.skuItem.rawPrice;
  } else {
    price.originalPrice = 0;
  }

  price.currentPrice = price.originalPrice;
  price.percentageDiscount = 0;

  if (product.campaign && product.campaign.isActive && product.campaign.isValid) {
    price.originalPrice = product.campaign.price;
    price.currentPrice = product.campaign.retailPriceValue; // price.percentageDiscount = product.campaign.percentageDiscount || (Math.round((price.originalPrice - price.currentPrice)/price.originalPrice * 100));
  }

  if (product.deal && isInUseDeal(product.deal)) {
    price.currentPrice = product.deal.price;

    if (product.deal.name) {
      product.product.name = product.deal.name;
    }

    if (product.deal.imageUrls && product.deal.imageUrls.length) {
      product.product.imageUrls = product.deal.imageUrls;
    } // price.percentageDiscount = product.deal.percentageDiscount || (Math.round((price.originalPrice - price.currentPrice)/price.originalPrice * 100));

  }

  price.percentageDiscount = findDiscountPercent(price.originalPrice, price.currentPrice);
  return price;
};
var getProductBySlug = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref9) {
    var ctx, data, customerID, client, res, product, price;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            ctx = _ref9.ctx, data = _ref9.data, customerID = _ref9.customerID;
            client = getProductClient(ctx, {});
            _context6.next = 4;
            return client.getProductDetail({
              employeeViewCustomerID: customerID,
              q: data.slug
            });

          case 4:
            res = _context6.sent;

            if (res.status === APIStatus.OK) {
              res.data[0].moreInfo = {
                seller: isUpdatingText,
                manufacturer: isUpdatingText
              };
              res.data[0].skuItem = res.data[0].sku; // await getSeller(res.data, client)
              // await getManufacturer(res.data, client);

              product = _objectSpread2({}, res.data[0]);
              price = handleProductPrice(product); // price.originalPrice = product.sku.retailPriceValue || product.sku.purchasePrice || product.sku.rawPrice;
              // price.currentPrice = price.originalPrice;
              // price.percentageDiscount = 0;
              // if(product.campaign){
              //     price.currentPrice = product.campaign.retailPriceValue || product.campaign.price;
              //     price.percentageDiscount = product.campaign.percentageDiscount;
              // }
              // if(product.deal){
              //     price.currentPrice = product.deal.retailPriceValue || product.deal.price;
              //     price.percentageDiscount = product.campaign.percentageDiscount || (Math.round((price.originalPrice - price.currentPrice)/price.originalPrice * 100));
              // }

              res.data[0].displayPrice = price;
            }

            return _context6.abrupt("return", res);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getProductBySlug(_x10) {
    return _ref10.apply(this, arguments);
  };
}(); // Get all tags

var getTags = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_ref11) {
    var ctx, client, res, _ref13, _ref13$total, total, getAllTags, data, i, resTags;

    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            ctx = _ref11.ctx;
            client = getProductClient(ctx, {});
            _context7.next = 4;
            return client.getTags({
              offset: 0,
              limit: 1,
              getTotal: true,
              total: true
            });

          case 4:
            res = _context7.sent;

            if (!(res.status === "OK")) {
              _context7.next = 15;
              break;
            }

            _ref13 = res || {}, _ref13$total = _ref13.total, total = _ref13$total === void 0 ? 0 : _ref13$total;
            getAllTags = [];
            data = [];

            for (i = 0; i < total; i += 50) {
              getAllTags.push(client.getTags({
                offset: i,
                limit: 50
              }));
            }

            _context7.next = 12;
            return Promise.all(getAllTags);

          case 12:
            resTags = _context7.sent;
            resTags.map(function (resTagItem) {
              if ((resTagItem === null || resTagItem === void 0 ? void 0 : resTagItem.status) === "OK") {
                data = data.concat((resTagItem === null || resTagItem === void 0 ? void 0 : resTagItem.data) || []);
              }
            });
            return _context7.abrupt("return", data);

          case 15:
            return _context7.abrupt("return", []);

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getTags(_x11) {
    return _ref12.apply(this, arguments);
  };
}();

var ticketStatus = {
  "PENDING": "Chưa xử lý",
  "IN_PROCESS": "Đang xử lý",
  "REPLIED": "Đã phản hồi",
  "DONE": "Đã xử lý",
  "CANCELLED": "Đã hủy"
};
var ticketType = {
  "ORDER": "Đơn hàng",
  "PRODUCT": "Sản phẩm",
  "ACCOUNT": "Tài khoản",
  "PROBLEM": "Vấn đề",
  "COMMENT": "Bình luận",
  "PROMOTION": "Khuyến mãi",
  "OTHER": "Khác"
};
var ticketUrl = function ticketUrl(ticket) {
  return "".concat(getChatConf().clientWebUrl, "/users/my-ticket?id=").concat(ticket.ticketId || ticket.ticketID);
};
var displayTicketReason = function displayTicketReason(ticket) {
  if (ticket.reasonsInfo) {
    return ticket.reasonsInfo.map(function (item) {
      return item.name;
    }).filter(function (item) {
      return item;
    }).join(", ");
  }

  return "-";
};

var img$l = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3crect width='24' height='24' fill='url(%23pattern0)'/%3e%3cdefs%3e%3cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3e%3cuse xlink:href='%23image0_1714_1471' transform='scale(0.00195312)'/%3e%3c/pattern%3e%3cimage id='image0_1714_1471' width='512' height='512' xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAgAAAAIAEAYAAACk6Ai5AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAABjK0lEQVR42u3dd3SU1dbH8f1MSSPUgBRFQBRBwQoiKoIFC4oFuIq9d/S1X%2btV7FdFvVZUbIgFpYMgvUgTQi8JCTUhvWdmMv057x/jiIIoJcmZ8v2slZWFIP7C9Qp7n332EQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/WPoDgAAAID4kD204DNltmjhf8DyintLx47%2bdeZTzlNPPtkcJP/xPn/ssdJbBQIPt2ql5kiSXNm8uVxh2M3cZs3MtcETzLwmTdSn6trghIYN1dtGhXlUUpKxXe5WH9lsaqRcZT5utYqIKJ%2bIbFT3y1SbzewubVU3wxARUWp3DsMQsVhE5F1ZKqNN07jdmGA8HwwaayXXkqOUOkZGyOWBgGE3nrc95PcbmbJJbne5jBPUlfaXqqpkndxgdK2stLot59neLi01ehptLVcXFVnetNyfcHhurjwiZySNW7/e%2bp66PHFiVpa/g7xhd%2b3YceLwVhcahsul%2b38HAPGLBgAAAAAOSObI0gHKbNgw%2bLMMqHq2Rw9/of9t1%2bLzzzefMtf7z%2b3Rw2whfXx9O3RQFSop8HXz5uZX6i5fg4YNg/ep033XWixKKRUIhIryPxbmscZiMQybLdRsSEoSsb5rvcCW7fVafpCz7d9UVBj95Hn7jQUFlhGGJ%2bGzjRttnaVfgxPnz7eeafkwZfKvv7pebdnPvnbz5u49DIth8ft1fz0Aoh8NAAAAAIiISMZ7ealKpaV575T1Rc9efnlQjLbuoy%2b91LxPtfe7u3Uz%2b6mffS%2b3aRNsazZyT0hJMU2lfD7dqWOPxWIYdruIbYRlRfIE0zSulsMS7igvt31rGZXQYetWy8eW71Pyf/kluZ%2b1plnB5Mn2Jc6A7dQVKzoYHQzD8Hh05wcQuWgAAAAAxDillFLKMDZ/Vnhr9ZmnnuqeFnyvst211wafMtZ6T%2bzTx3zCXObr16lT4AX1L1cgNdU0Qyf0iGyGYRhWq4j9Y8uK1Kmmad1puSV5eH6%2b5Uk1MvG49PSEkXbVIH3SJMtPRnbCwhkzurhbPNOgT0GB7twA9KEBAAAAECPCd%2bxdfdT/cnJvvdV/hGrmKRw4UA1Sv3g/PeEE/4/Bba7bkpKUEjFN3WlRX2w2i6VBAxH7dsvg1E2VlbZ7LJ%2bkzFu82HqGdG/Y9vPPG/zk8aU%2bO20aEwRA7KMBAAAAEGXWqxJVovr29a/3uasvfugh/5Wqac1nvXsHRgWzXLlNmyolEgzqTolIF16GaL/VOrHhf4NB2/%2bMYIMzN2%2b2ZVt%2baLT9u%2b8Sku0tkmd//nnn25tPScnKz9edF8ChowEAAAAQodY2KR5TPOass/yz/YZz4iOPmE%2boKted55/ve9680JGYmhoa7tedErHKajWM5GQRW1tLWcOq3NzEc4yHGg0aPTqpLGlZw4c%2b%2bKBTeZon5dm8PN05Aew/GgAAAACabcra9b%2bijqef7j5dCqomv/BCwJQ3ap7t3ds/NbjN9UhSku58wB%2bFGwN2u2VVo5KcnMTnrWVNA599ZkkKVDbr//77x49t%2b4hhlJfrzglgbzQAAAAA6kn%2bHfl3KJWSUniTyM7/PPFEsMRc4jrt9tt9hwWnVTdv3Zq7%2bYhm9o%2bs6anjTdP2sOFu3HX1arvNcm6TK/77324ntGrduMn48YZhGIbB5RRAJxoAAAAAdWTtcQX2AvvAgb57zM6V855/3u8NflS9qmtX83TVNnCqwZ/DENPCrxQk3m79oUmaw2EPGNc2mf7dd5Zp6rPGH7/0UrdjDn82eWNuru6cQDzhNx4AAIBDFHpmz2JZ/XLBidvef%2byxQBvzA/fmRx/1Hxs8svra5s2VEuGuPhBisxlGSopIwjz7LWnD1qxJ6iauFkP/7/%2bOu7T1suTzFy7UnQ%2bIZTQAAAAADtDaRwpnFM447DB/cnC286a33vKfHMyomnnVVcGW6gOPw27XnQ%2bIJhaLYdjtIgkJ1jubfVRQkDDHujxt28svlz3esrTJvI8/PscwLIYlENCdE4gFNAAAAAD%2bwZpNeal5qZ06BR5S6c4uX37pPc8srbzh9NPVGYzyA3XBYhFJPMH2dlpKdXXKbOvFLc557TX5tuzTJqXDhx8/9vixhsXn050RiEb8hgUAALCHtY/scBfO6NDBe5o1qerTL74I5KrFlWeffTZ39wE9DEMkaZ11U7NrXa6EI23fNu/21lsNL3GPSpv8yisdjA6GYXg8ujMC0YDfwAAAQNwLn/B7GwVLKmeMHBn4VlY6Vpx1ljpDtQ32oOAHIo1hiCS%2bZZ3Z/FKnM2mccXvTsuHDk%2b6vub%2b5evXVY94/5n3D4vXqzghEIn5DAwAAcWfdup07KyubNvVNtN9UNnvUKF%2bK/4WywksuMU%2bXdv6TKfiB6GIYhiGSdIdlZLMWDkfSlbbHDzv94YePf7llg6aln30Wen6QNZyACA0AAAAQB8Jb%2btN/znNlH/3mm/7jzH9XZd5/v5mrHvctt9l05wNQewzDMGw2kaS%2b1saHXZ%2bbm%2bJLaNQ868YbuxgtjIbG/Pm68wE60QAAAAAxK33ArpLsZnff7V9lvu%2b45403gmPUre7%2bqam6cwGoPxaLYSQmiiQfbWvXqmjJkqQWhpnW/7rruhitjWRjxw7d%2bYD6RAMAAADEjJWFu47f9skJJwRvljtr3JMn%2b54JXlHVvV073bkARI6E26wTG70aDCbfaX295Q3vv29ZWt6rxb8ef5zXBRAPaAAAAICoFR7tX9kh/4wtJ330kW9o4L/lt91xh3m6tGNbP4C/F9odkDzO2qvFtxUViRcb3x7W6Zprul7Qpk/jB2bM0J0OqAv8xggAAKJOeqOi2ds%2b6dcvYPFfUt10zJjA1GCWq03TprpzAYhe4asCKZfbnzj8rdmz7X0Cp7b65uqrjx/b9hHDKC/XnQ%2boDTQAAABAxEtPz78j/46UFHOrqqj6ZNo03%2bGB4RVL%2b/QREWG3N4C6kFBlKUh7uaamwRcJj7V%2b5o47jh/b8pfGZ3z7re5cwKGgAQAAACJWeqP8hG2f9OsX7BJ8tapi/Hj/cHNwzVks8QNQfywWw0hIEGnwlvXhI7ovWGD%2bmPJjK7niipONpoZhVFbqzgccCBoAAAAgYvx%2bp79r/oDsy776yvtJ4IPSJ6%2b/XilO%2bgFEhsQTbG%2b3SK2uTrnVenGbN6688vixrS5MHT13ru5cwP6gAQAAALRbMSqnYOthXbsGT7a84Hxn9uxAVfAJZ7uWLXXnAoB9saVb8pIzlEq51vr44ZlffWW9t6LVYa/fdRevCSCSWXQHAAAA8WtFTYF9y2dPP%2b2fKPNL%2b61dS%2bEPIFoEupuHu7sYhiPb/822QTff7L2s6T05ls2bNw7Ov8P9%2bJFH6s4H/BUmAAAAQL0Jj/iveDP/gs2fTZ3q6xUYWdbl4ot15wKA2pL4oe3CZh6vN/FCW%2bdWja6%2b%2boSbWk5s2mPSJN25ABEaAAAAoB6sVgVqu2rf3lceuLxq%2bLJl/gzzPVcvTvoBxC6r1TCSkkQa9LM/13bLZ591c7T6vMVVd95pGIZhGKapOx/iEw0AAABQZ9Z0zR%2bXPfS662p%2bCv5S8fqXX5q55kP%2b1Tab7lwAUF8MwzCsVpGUi222tltWrrQuSklpc12/fiec0KSJYVRU6M6H%2bEIDAAAA1Lr0B/MGZ4155x3vvwLDy478v/9TSoTzLgAQSX7cfnLL98vLU66xT29b1KtXl/tb9Eycm5WlOxfiAw0AAABwyEJ3%2bw1jxa95YzNnTZrkCwRPK28wYIDuXAAQqRLTrdc1SfP5kt9MWNv%2bhAEDuu46zNHAN3Om7lyIbTQAAADAQUtPz78jPT0lJTg%2b2NnuW7XK398c7FTHHqs7FwBEC/tH1vTU8abZ4Hjr8UeOvv/%2brk%2b17ty06MMPdedCbKIBAAAADtiKpLwXt0xo29acaV7keG71ar/FPKzmo7Q03bkAIFpZrYaRmCiS2see1%2b6hDz7o6m11evOF998fWhqolO58iA0W3QEAAED0WLUo57HMkd27B3uZ71dOyc6m8AeA2hEMKuX1ilTP87XZ9uZ9963zFQ4vCk6aFLpiZbXqzofYwAQAAAD4R%2bkrcjpsHnHWWf4c4xRH97lzgy3Nt7xeu113LgCIZRaLSMN37Mva5SxY4P9363%2b1/le/ft17GBbD4vfrzoboRAMAAADsU3qjnCsyTuzXz5csvRye6dPNcWqI/3NOogCgvhhGqBHQ4HXbL0duXbky7WyzqM11vXu3faTtI4bhduvOh%2bhCAwAAAOwl/cRd/8u8efBgb/tgWpV/zBj1mPQO3Gvh6iAAaGQYIg3usZW2/SYzM/n/Ep8/4r3TTut8e/MphsXh0J0N0YEGAAAA%2bN3yRbvaZjx0xx3%2bJeZ3Ve0%2b/lidodoGexj8eQEAIoRhhD5Smic8esTW7OxG1sQRba/r0aPj0c3SDEtVle58iGx08gEAgKzov%2bu2jIw77/QvCX5T2ZbCHwAilVKhD1eJ783co445pvo8zxO5RStXbhxcPEaZqam68yGy0QAAACCO/dox97zMNbfe6usbvKlqxogR6gxpZ/ak8AeAaFHzrf%2bZXds7dvRfE2yW13rp0u1qu1IqKUl3LkQmGgAAAMShcOEfuMt8rnL%2byJHqDGnHiT8ARJ/wRICzpf/YnAldu1a9mZRQmLB4cfbQ7KHKTEzUnQ%2bRhd/oAQCIIxT%2bABD7DEMktUfCgA53L15ckdBqTas1ffueYxgWwxII6M4GvfgNHwCAOLBi5a7vM8%2b46y7fHPOIisEffaTOUG0Z9QeA2GUYIlarSKPbE15t32zy5G4ZrUe06nT55bpzQS%2buAAAAEMN%2bv%2bM/J9im8ioKfwCIF0qJBIMi1SN9T%2b6suOyytY/klxe/%2bPbbunNBLxoAAADEIEb9AQAioUZAICBSMzjgzLn4wQc/2rW2eNF5H36oOxf0oAEAAEAMofAHAPyVykq/v6pK5LUzsxeObHvPPc%2bpXztOOeXNN3XnQv2iAQAAQAyg8AcA/J0FC0pLN28WqakJBr1eke%2bO3fX6pFMeeWT4jlXfzOs1aJDufKgfNAAAAIhi4eV%2bgbvUsIq5FP4AgL82b15JSWbm7m9XVAQCLpfID2/lLZj8w48/vnf72kcWVHTooDsn6hYNAAAAohDL/QAA%2byM3t6amvFxk2zaXq6Rk7%2b/f9l3NeYWPG8bPY4pGLRyTmfnDD0r98IPVqjs36gYNAAAAogij/gCAAzFnTklJRsY//7jlSRXvb1qQkDDnyIWzKrOzs3XnRt2gAQAAQBSg8AcAHIhgUCnTDN39z8ra/79v0hWFFQs2dejwnFreZvIrI0bo/jpQu2gAAAAQwSj8AQAHY/XqqqqcnND2f5dr//%2b%2bYFDENEXGdNn1/tQdd931wfdrZi8qOecc3V8PagcNAAAAIlD6hfkdN/e47TYKfwDAwdhz6d%2bBKivz%2bx0OkUkPFhw1I3XWrHcvUmb20MRE3V8XDg0NAAAAIkj4xN97nv%2bLius%2b/ZTCHwBwIJzOQMDrFVm%2bvLx8%2b/ZD//lWB6tXbLnVat10%2b8L7F354IJcJEIloAAAAEAEY9QcA1IZFi8rKsrNFAgGlgsHa%2b3kn3V/UZ%2b41Rx75XJMlTSe9%2bN//6v46cXBoAAAAoBGFPwCgNs2dW1q6P1v/D1QgEFoqOKl98Rezih5//G21Wi1V7dvr/npxYGgAAACgAYU/AKA25ee73ZWVItnZDkdRUd39c/LyvN6yMpGVK8u3pZ%2b6Zo3urxsHhgYAAAD1iOV%2bAIC6MGdOSUldnPzvy6xLylYu7dy48bD3l02c/M6oUbq/fuwfGgAAANSDFf133ZaRceed3vP8X5Rfw3I/AEDtME2llBJZuLCsbPPm%2bv/n/vBRgZq%2b%2bYYb/pu5LnVRybHH6v71wN%2bjAQAAQB0Kj/r7%2bgZvqpoxYoQ6Q9qZPSn8AQC1Y/366updu0RKS71ep7P%2b//nFxT5fZaXI2odLElc8vXy57l8P/D0aAAAA1AHu%2bAMA6kN9j/7vM8fKso9WOBs1evGXpa9Mnfraa7rz4K/RAAAAoBZR%2bAMA6oPD4fd7PCJLl5aVbd2qO83uKwE/jSvLmXvy44%2bPKlz7SOGMBg1058Kf0QAAAKAWsNwPAFCfZs0qKdm4MfQ8XzCoO81uW79xnVPwqGGsmuC4eLZ15UrdefBnNAAAADgELPcDANSn8En7jBlFRRs26E6zb5PfKKqa882xx7715a8d5x5/wQW68yCEBgAAAAeB5X4AAB1Wr66qyskRKS72eh0O3Wn2zeEIBDwekcVfVndbccrEibrzIIQGAAAAB4A7/gAAnX7%2buaho/XrdKfbfooyKa9cGk5OHVSxeM/X6l17SnSfe0QAAAGA/UPgDAHQKP/O3alVl5c6dutPsv/CVhYVbqgcvbfHkk0oppRS/f%2bpCAwAAgL9B4Q8AiAQzZxYXb9iwu6CONuv6V7%2b8rdBieV6WvzNp%2bLhxuvPEKxoAAAD8Bbb6AwAiQSCglGmKzJlTUpKRoTvNofvpnuKM%2bf%2b64oqPP05Pz78jJUV3nnhDAwAAgD9gqz8AIJL8%2bmt5%2bbZtIuXlPp/LpTvNods5rua8oicMI3O%2bd%2bS8rvPm6c4Tb2gAAAAgbPUHAESmGTOia%2bnf/pq1vuSixZtPO%2b3DD9et%2b%2bWXpk1154kXNAAAAHGNO/4AgEi0a5fHU1EhsmFDdXV%2bvu40ta%2boyOutqBDZOsexM/ecGTN054kXNAAAAHGJwh8AEMlmzCgs3LBBRKnQR6yas7UkuOTuHj0mnbGoJHNkw4a688Q6GgAAgLjCcj8AQCTz%2bUwzEBCZP7%2b0NDNTd5q6l5fn9ZaViSy7zMhb14hJgLpGAwAAEBdY7gcAiAYLF5aVZWeLOJ2BgNerO039mTW2LGfJkl69pmVlD80empioO0%2bsogEAAIhpLPcDAESTWF3690927nS7i4pEFt5Y8uHa9uPH684Tq2gAAABiEnf8AQDRJCvL6SwqEtmyxeksLtadRp9lr1cdtSrnoot054hVNAAAADGFwh8AEI0mTszPX7VKdwr9Ng6qfnl7icXyasMVH854%2bLnndOeJNTQAAAAxgcIfABCNiou9XodD5NdfKyq2bdOdJnKsHli9en3Kv/%2btO0esoQEAAIhqbPUHAESzyZMLClavFjFNpWL5ub8DtWRO%2bQXrcpKT31Or1S%2bqb1/deWIFDQAAQFRiqz8AIJqFt/zPmVNSkpGhO03k8XpN0%2b8X2TTEsTHrkVGjdOeJFTQAAABRha3%2bAIBYMGtWcfHGjSIeTzDo9%2btOE7kWbSrLXulp2/aHMRsHbxyckKA7T7SjAQAAiArc8QcAxIJAQCnTFJk2raho3TrdaSJfYaHPV1Ehkrm5eum2Ke%2b9pztPtKMBAACIaBT%2bAIBYsnhxWVlWlkhpqdfrdOpOEz02vOh8JiPrxht154h2NAAAABGJwh8AEIsmTy4oWLtWd4ros6x1VYuN/0lK%2bmDzhv5LV3bpojtPtKIBAACIKGz1BwDEonXrqqpyc0W2bXO5Skp0p4k%2bbncw6POJ7JxUNXnnCSwFPFg23QEAABD5w1b/vv6byqf/ttyPwh8AECMmTy4oWLNGd4rot/Kc6s7rHz/lFN05ohUTAAAArdjqDwCIZXl5Hk9lpcjq1VVVOTm600S/DZc6XtleZLG89eWvHecef8EFuvNEGxoAAAAtuOMPAIgHEyfm5a1cKWKaSimlO030C/867jR9p%2bR9Pny47jzRhgYAAKBeUfgDAOJBVVUg4HaLLFgQ2vqP2pX5H9fwrBNYBnigaAAAAOoFhT8AIJ5Mn15QsG6diN9vmsGg7jSxZ12wetmOO63WT55a/dDqh844Q3eeaEEDAABQp9jqDwCIJ16vafr9ItOnFxdv2KA7TewKBJQKBES2nu3unVX99tu680QLGgAAgDrx%2b1b/8/xflF/z6acU/gCAeDBzZlHRxo0i1dV%2bv9utO03s27TCUZV9Kq8C7C8aAACAWsVWfwBAPAoElAoGRSZN4rm/%2brThc0fDrStsth/GpK/YuqVxY915Ih0NAABAreCOPwAgns2aVVy8caNIWZnP53TqThM/nM5g0OMRyWjrvyLziWHDdOeJdDQAAACHhMIfABDPAgGlTFNkwoS8vNWrdaeJX/nVPnNX6pAhunNEOhoAAICDQuEPAIDI3LklJRkZIiUlPp/DoTtN/Mpc4hq0/X%2bHHaY7R6SjAQAAOCBs9QcAQMQ0lVJKZOLE/HxO/vXLHuk8e9d9hvH1pvT09HSWAu4LDQAAwH5hqz8AALstXFhaunmzSEGBx1NZqTsN/P7QEsas033rds1/5hndeSIVDQAAwN9iqz8AALuFT/7Hjs3LS0/XnQZ7yk/znVKwvXdv3TkiFQ0AAMBf4o4/AAB7W7y4rCw7WyQvj5P/SLRznHtwXnKzZrpzRCoaAACAP6HwBwBgb0qFPsaNy89fuVJ3GuzLloGu13aVWiwT1Gq1XTVpojtPpKEBAAAQEQp/AAD%2bzrJl5eXbtons3FlTU1amOw32xeUKBr1ekewuga5bnQ88oDtPpKEBAABxjq3%2bAAD8s3HjuPMfTQrtvoqiwquv1p0j0tAAAIA4xVZ/AAD%2bWXp6RcWOHSJbt7pcJSW602B/5V/ouaTwxw4ddOeINDQAACDOsNUfAID9x53/6JSf5E0suispSXeOSEMDAADiBHf8AQDYf6tXV1bm5IhkZjocBQW60%2bBA7frWfU7pY4YxT21XStEICKMBAAAxjsIfAID9F972/913eXm//qo7DQ6WwxEIuN0iG78pnbL05H/9S3eeSEEDAABiFIU/AAAHbunSsrKtW0Wysx2OoiLdaXCoik7ztyrsf9VVunNEChoAABBjKPwBADhwpqmUUiLff79r1/LlutOgtpRd4/%2bkPPGUU3TniBQ0AAAgRqxYuev7zDPuuitwlxpWMZfCHwCAAzFnTklJRoZIbq7bXV6uOw1qS%2bkLvqfK16al6c4RKWy6AwAADs3vW/3nBNtUzv/oI3WGtDUp/AEA2C9%2bv2kGgyI//JCXx8l/7ClNC1xQ1c5u150jUjABAABRilF/AAAO3bRpRUVr14qUlnq9TqfuNKhtpXf6hlf6LNS9v%2bEXAgCiDIU/AACHzu02Tb9fZMKEvLzVq3WnQV0pKfF6q6tFJrdY/2TR7JYtdefRjQYAAEQJCn8AAGrPhAl5eatWiVRVhZ6LQ2wKBJQKBES2r/J7t/e44ALdeXSjAQAAEY7CHwCA2hMu%2bKdMKSxcs0Z3GtSXqrd8R5SP79tXdw7dWAIIABEqvNXfN8c8omLub8v9elL4AwBwKH78cdeuFStEPJ5g0O/XnQb1pWaHmeHKO/543Tl0YwIAACLMn7b6X/XRR%2boMReEPAMAhKi4O3QWfMaOoaONG3WlQ3zwnmoU1Q9gBQAMAACIEo/4AANSdb7/NzV2%2bPHQnPBjUnQb1zfV4cKn7sIYNdefQjQYAAGhG4Q8AQN3JyampKSsT%2beWXsrLNm3WngS6uqmBLT5/kZN05dKMBAACaUPgDAFD3vvkmN3fZMhHTVEop3Wmgi8sdOKXGYbfrzqEbDQAAqGcU/gAA1L3MTIejoEBk%2bfKKiu3bdaeBbo7i4FLXAKtVdw7daAAAQD1JvzC/4%2bYet91G4Q8AQN1RKvTxxRc7dy5apDsNIoVnbPB87xP8uYsGAADUsfCJv/c8/xcV1336KYU/AAB1Z%2bHC0tLNm0WyspzOoiLdaRAp/AvM/v5X%2bPMXDQAAqCOM%2bgMAUH98PtMMBES%2b%2bSYn59dfdadBpPH7TZPXH2gAAECto/AHAKD%2bjRuXl7dypUhJic/ncOhOg0jj9Srl9%2btOoR8NAACoJRT%2bAADUv9JSn8/pFJk0qaBgzRrdaRCp/P7QhEi8owEAAIeIwh8AAH1GjcrJWbJExOs1TU54sS8%2bX%2bjfj%2beUUkpZ4rYOjtsvHAAOFYU/AAD6bN7sdBYWiixaVFqana07DaLF80qUxHEDwKY7AABEmxUrd32fecZdd/nmmEdUzP3oI3WGtDV7UvgDAFAfws/8ff75jh2//LL728DfsVgMw2IRWblSRCR%2b/9xGAwAA9lP4xN83J9imcv5vhT8n/gAA1Kv580tKeOYPB8owQh/dexgWwxK/l0XidvQBAPYXo/4AAOgXvuP/7be7di1bpjsNoo3VGpoAiHdMAADAPqSn75q484JLLvHODTbLnxsq/Bn1BwBAj3Hj8vJWrRIpLfV6nU7daRBtLBbD4E9xTAAAwF42Di4e4xtz0kkNmiR81uq0r75KPt/Wsc0gfssAAECHkhKfz%2bEIPfO3erXuNIhWFkvoI94xAQAAvwkX/pbXZLRaP3u2%2bNVIeTYtLTnZJq3%2b8ONqagKBXbt0pwUAID6MGrVz55IloWfceMcdByspyWJJSNCdQj96IADiXkZyyUu%2bHaecYp0is1TWnDnhwn/PH5ecbLO1ahX63KaN7tQAAMS28DN/ixeXlW3ZojsNol1yss2WmKg7hX40AADErfCJv6xXv6qRM2eqNeplebxZs3/6%2b1JSQg2AlBSb7YgjdH8VAADEFtNUSimRTz/dvn3BAp75Q%2b1IvsQ6M/EF/k2iAQAg7uxr1P9Af57wRACNAAAAas%2b0aUVF69aJbN3qcpWU6E6DWJEy1vJEUjPT1J1DNxoAAOJGbRX%2be6IRAADAoaus9PtdLpHvv8/N/fVX3WkQa5KftUriuWyRoAEAIObVVeG/JxoBAAAcvM8%2b27Fj0SIRlysY9Pl0p0GsSX7C8mLi1/ybRQMAQMyqr8J/TzQCAADYf2vWVFbm5IgsWlRWlp2tOw1iVepU242pVqdTdw7daAAAiDn7u9W/rvFqAAAA%2bxYIKBUMiowcuWPHwoW60yDWNdpkK03tX1qqO4duNAAAxIyD3epf13g1AACAvf34465d6ekieXkeT2Wl7jSIdQ2HWwoaDN28WXcO3WgAAIh6ukb9DxRXAwAAECkoCBX8EyYUFKxapTsN4kXys0ZCw5IlS3Tn0I0GAICoFS2F/55oBAAA4tlHH23fvmCBiN9vmsGg7jSIF2k/NLk3rWjOHN05dKMBACDqRGvhvycaAQCAeLJgQWnp5s0i69dXVeXm6k6DeJGaarUmJYlsG9nJ1fWVDRt059GNBgCAqBErhf%2beaAQAAGKZ0xkIeL0iX3wReuYPqE%2btByXPbfaKUsMMwzAM09SdRzcaAAAiXqwW/nvi1QAAQCwaPTo3d%2blSkaqqQMDt1p0G8aZV54Q%2baTO4bBJGAwBAxIqU5/zqG68GAABiQXa201lUJDJrVnHxxo260yBeHXZc4qLmm6qrdeeIFDQAAEScSH3Or75xNQAAEI2CQaVMU2TEiO3b588XMU2llNKdCvGqaa7t9cbXbd2qO0ekoAEAIGLEy6j/gaIRAACIJlOnFhauXSuybZvLVVKiOw3iXaNW9h8bD505U3eOSEEDAIB2FP77h0YAACCSFRR4PFVVIt99l5u7fLnuNIh3VquIxSLS8FH1RLOto0bpzhMpaAAA0IbC/%2bDQCAAARJLwiP8HH2zbNmeOiNdrmn6/7lSId4cfnpzcrJnI0BWn5Z%2bWn5WlO0%2bkoAEAoN5R%2bNcOXg0AAESCadOKitatE9m4sbo6P193GiCk/aKU6a2n04raEw0AAPUmXrf61zVeDQAA6FBc7PU6HCLffJObu2yZ7jTAnx1xVeLTh60oLdWdI9LQAABQ59jqXz%2b4GgAAqA9KhT4%2b%2bGDbtrlzRTyeYJBzVkSaFgOTxrZ6bv583TkiDQ0AAHWGUX89aAQAAOrSzz8XFa1fL7JuXVVVbq7uNMCfWSyGYRgijZtau7e45623dOeJNDQAANQ6Cv/IQCMAAFCbiou93upqka%2b/3rlz6VLdaYC/1qZNYmJamsj9V5xyVs8u6em680QaGgAAag2Ff2SiEQAAOBThkf%2bPPtq%2bff58EbebLf%2bIXMcWpHqPfNbj0Z0jUtEAAHDIKPyjA68GAAAOxsyZRUUbN4qsWVNZmZOjOw3w9zpMbHDPEZszMnTniFQ0AAAcNLb6RydeDQAA7I%2byMp/P6RT5%2buucnCVLdKcB9s/h9yfee/g5//uf7hyRigYAgAPGVv/YwNUAAMDf%2beCDbdvmzRNxuYJBn093GuDvtWmTlNS0qcjQFSe/eHbgq69054lUNAAA7DdG/WMTjQAAwB/Nnl1SkpEhsnp1ZeXOnbrTAPun844GFe0e4O7/P6EBAOAfUfjHBxoBABDfyst9PpdL5Kuvdu5ctEh3GuDAHHV38oh2o1eu1J0j0tEAALBPFP7xiUYAAMSX8Jb/Dz/ctm3uXBGnMxDwenWnAvaPzWYYFotIm162Lzpc9%2bCDuvNEOhoAAPZC4Q8RXg0AgHgxY0Zh4YYNIitXMvKP6NP5noaL2n6o1P1X9OzSs0t6uu48kY4GAIDfsdUff4VXAwAgNuXmut3l5SJffsmWf0Svrt0bzjj6iqIi3TmiBQ0AAGz1x37hagAAxIZAQCnTFHnvva1bZ88W8XpN0%2b/XnQo4OIevs918eA%2be/dtfhu4AAPRh1B%2bHwu0OBAoLRWpqAoFdu3SnAQDsry%2b/3LlzyRKRSZMKClat0p0GODitWycmNm0qsnbt5Zd/8IHFYhiGYRhK6c4V6ZgAAOIQhT9qAxMBABBdNm6srs7LE5kypbBw9WrdaYBD0/36ximdB1dWUvgfGBoAQByh8EddoBEAAJEtvNX/f//bsmX2bBHTVIpyCdHumH8ldzjm9vfe050j2tAAAOIAhT/qA68GAEBkGjFi%2b/Z580RKSnw%2bh0N3GuDQHHFEUlJamsgT7XsefdHW557TnSfa0AAAYhhb/aEDrwYAQGSYObO4eONGkcWLy8q2bNGdBqgdPT9oOrvrzvJyRv8PDg0AIAax1R%2bRgKsBAKBHYaHHU1Ul8uWXO3YsWqQ7DVC72l%2bS9MpRw154QXeOaEUDAIghjPojEtEIAID6EX7e7623tmyZMUPE7eZ5P8SOY25qMK/1m0o9UXFawwtO4dm/g0UDAIgBFP6IBjQCAKBuff/9rl2//iqSne10FhfrTgPUrtNvbeo98ePMTN05oh0NACCKUfgjGtEIAIDatWlTdXV%2bvsiECfn5q1bpTgPUruRki8VuF2n5avIPbdYNGqQ7T7Sz6Q4A4MBR%2bCMWhBsBSomYpojbHQjk5%2btOBQDRw%2bUKBn0%2bkXfe2bJl1iye90NsOuO7pmd2dXq9/z7zFFe/iRkZuvNEOyYAgCjCVn/EIl4NAICD8%2bGH27bNncvzfohtJzZpnHX88k8/1Z0jVtAAAKIAW/0RD7gaAAD7Z9q0oqL160WWLOF5P8Sujtc1mNfqdaWePL5H30t23X%2b/7jyxggYAEMEY9Uc8ohEAAH8tO9vpLCoS%2beILnvdD7Otd3eyYkx9ZvVp3jlhDAwCIQBT%2bAI0AAAhzOgMBr1fkzTezs3/%2bOfTcXzCoOxVQN9LS7PbUVJGUz4y3DnuzXz/deWINDQAgglD4A3ujEQAgXikV%2bnjvvW3b5swRKS72ernrj1h37qTmrbt3LygYZvTKu%2bjI8nLdeWINDQAgAlD4A/8s3AhITg4tDQSAWBd%2b1m/58vLybdt0pwHqVkqK1ZqQIHJUr6TDOi65/HLdeWIVDQBAI7b6AweOVwMAxLrNm53OwkKR777Lzf31V91pgPrRd25a45OdTuej5ad1PP%2brFSt054lVNAAADdjqDxw6rgYAiDWVlX5/TY3I669nZU2fHrrrb5q6UwF1y263WKxWkW6DUu7u%2bPQtt%2bjOE%2btoAAD1iFF/oPbRCAAQ7UxTKaVE3nlny5ZZs0TKy30%2bl0t3KqB%2bnNM17cKTL3S5Hl3Tc%2buAU8aO1Z0n1tEAAOoBhT9Q92gEAIhWY8bs2rV8ucjatVVVubm60wD1I3zyf3Jxo95det58s%2b488cKmOwAQyyj8gfoXbgSE1dQEArt26U4FAHtbty5U8I8dm5%2bfnq47DVC/%2bv3SvMmpxU7nox27r%2b3fiZP/%2bsIEAFAHWO4H6MerAQAiVWmpz%2bd0igwfvmXLzJm7rwAA8SApyWKx20VO%2bk/Tp7o%2bNmSI7jzxhgYAUItY7gdEHl4NABApwkv9hg/Pzp4xQ6S62u93u3WnAupXv/ubNz51QGXlQ9%2bctKJfv59%2b0p0n3tAAAGoBo/5A5GNHAADdRo/OyVmyRCQz0%2bEoKNCdBqhfjRvb7SkpIicca23Y9Y0%2bfXTniVc0AIBDQOEPRB8aAQDq25Il5eVbtohMnlxQsHat7jSAHpcd19Lb%2b9rMzAcvP7vXecvXrdOdJ17RAAAOAoU/EP1oBACoa9u2uVwlJSLvvrtly5w5IkqFPoB40r59cnKLFiLHXpJ4TNpjp56qO0%2b8owEAHAAKfyD2sCwQQG2rrPT7a2pEXn01K%2bunn0S8XtP0%2b3WnAvQYkNy6oM8ZY8fedVf37gNW1dTozhPvaAAA%2b4Gt/kDsY1kggEMVXvL35pvZ2T//LFJa6vU6nbpTAXr0vKep/9gugcB/Fva4a9CQf/1Ldx6E0AAA/gZb/YH4w9UAAAfrk0%2b2b58/X2Tjxurq/HzdaQA9kpNDz/ydcVujASeNufVW3XnwZzQAgL/AqD8AGgEA9tdPPxUWrlsnMmtWcfGmTbrTAHpd9kjr/N6Nd%2b58qt3pja/Y%2bPXXuvPgz2gAAH9A4Q9gTzQCAOzLpk2hk/6vvtq5c/Fi3WkAvY6%2bIXVBy9eU6paUdGarxccdpzsP/hoNAEAo/AH8MxoBAMJKSnw%2bh0Pkv//Nzp4%2bXcTvVyoY1J0K0MNqNQyLRWSAatG1b%2bnw4Sz7i2yG7gCATuHlfoapdqivZ83ijj%2bA/VVTEwjk54u43aHPAGKfxxMM%2bv0iTzyxadO4cSI7d7pcpaW6UwF6XTq65Sc921ZXf3Fh3zkPvt64se48%2bHtMACAusdwPwKHi1QAgfigV%2bnj33a1bZ8%2bm8AdERI44IikpLU3kFHejYceP7NJFdx7sHxoAiCuM%2bgOobVwNAGLfmDG7dq1YIbJ0aXn51q260wB62WyGYbWKDHqqjf%2b8Xq%2b/fv8Vp5zVr5xZuGhh1R0AqA8U/gDqmt1usaSmihiGiMUi4vebZnW17lQADsXy5eXl27eLfPLJjh0LFoSmAIB4N%2bi9NlP7PJGX99%2brej1zfb/%2b/XXnwYFhAgAxjcIfQH1jIgCIfjk5NTVlZSLvvLNly8yZIqapFMU/4l3X%2bxstPvJDpVr8q%2bDSs1446ijdeXBwaAAgJoWX%2b1mnyCyVNWcOhT%2bA%2bhZuBCQnh3YFAIh81dV%2bv9st8tprWVnTpom43abp9%2btOBeiVmmqzJSaKXJjQ7OU%2bh19//TDjqquPH%2bvz6c6Fg0MDADGF5X4AIg3LAoHI5/WGtvu/%2bOLmzVOmiBQUeDxVVbpTAXoZRujj2jNaX9Rv6MKFTzzRs2H/mm%2b/1Z0Lh4YdAIgJjPoDiHTsCAAiT3i0/803t2yZMUNk/fqqql27dKcCIsOlt7Xs2LNvZeW7H/Vuf%2bdlnTvrzoPawQQAohqFP4Bow44AIHJ8/vnOnb/8Elr2t22b7jRAZOh6f8NfjvxQqXMebPrdce/zO1WssekOABwMCn8A0S7cCAirqQkEOHkE6sekSQUFq1eL/PRTYeG6dbrTAJGhefOEhIYNRQYOPHxKX8fFF9/Y6sSdF6x3uXTnQu1iAgBRhcIfQKxhWSBQf1asqKjYsUNk1KicnCVLdKcBIoPNZhgWi8jVY1p1Pn/6yJH3dz1x58VHzpihOxfqhqE7ALA/KPwBxAu3OxAoLGQiAKhNWVlOZ1GRyLPPbto0YYKIz2eagYDuVEBkuDGj7U0X9t24cXjzMzw339W1q%2b48qFtcAUBEo/AHEG%2b4GgDUnuJir9fhEHn11c2bf/qJwh/4owHbW24/fUtFxfDUMzw3f0fhHy%2b4AoCIROEPIN6xLBA4eA5HIODxiLzwQkbGpEkilZV%2bf02N7lRAZDj9gab%2bY7sEAo5b%2bvy79WMtWujOg/pFAwARhcIfAP6MRgCw//x%2bpYJBkTfeyMqaPl0kL8/jqazUnQqIDJ3vSF1w%2bDtK9T%2bp/QO9j2zf/scfDeOqq4JB3blQv2gAICJkJJe85NtxyinWKTJLZc2ZQ%2bEPAH/GskBg35QKfbz77pYts2eLrF9fXZ2XpzsVEBnatElKatpU5PLC1kn9dvXte8%2bATuXn3cz/Q%2bIVOwCgVfjEX15To9XImTOVX42UZ5s1050LACJVSkqoAWAYIhYLOwIAEZGvv87JWbpUZNGisrLsbN1pgMiQlma3p6aKXDOhddrFb9x556NHnfLWhQ0WLtSdC3rRAIAWjPoDwKFhWSAgMmNGUdGGDSITJuTnr1qlOw0QGZo0sdtTUkRuub7N5ZcOfOqpfx91mnVAg08/1Z0LkYErAKhXFP4AULvYEYB4tHx5efm2bSKffrpjB%2beZQEhKitWamChy831HvHxxhzfe%2bPczp1svv/jVV3XnQmQxdAdAfKDwB4D64XYHAoWFTAQgNq1bV1WVmyvy4ouZmVOnigQCoaV/QDxLTLRY7HaR2ye1O%2bXSS7/88vlTT%2bt41VW33KI7FyITDQDUqfByP8NUO9TXs2apNepleZw7/gBQ12pqAoH8/FBDID9fdxrg0Gze7HQWFoo891xGxsSJIl5vMBgI6E4F6BUu/G/LPfKJi/uMGTPM6Ln1mtuGDNGdC5GNBgDqBCf%2bABAZmAhANMvJqakpKxN55plNmyZMEHE4AgGPR3cqQK/dhX/b%2by6%2bdsKEYcbpxddcNHCg7lyIDlbdARBbKPwBILLY7RZLauruVwP8ftOsrtadCvh7hYUeT1WVyLPPhgr/qqpAwO3WnQrQi8IftYEGAGoFhT8ARDYaAYgG5eU%2bn8sVOvEfP16krCz0bSCeUfijNtEAwCGh8AeA6EIjAJHI5QoGfT6RYcMyMiZNEsnL83gqK3WnAvSi8EddoAGAg0LhDwDRjUYAIoHXa5p%2bv8gLL2RmTpkismWLy1VcrDsVoBeFP%2boSDQAcEAp/AIgtNAKgg98fer7vtdeysqZPF9mwobqaJZWIdxT%2bqA8W3QEQHcKFv3WKzFJZc%2bZQ%2bANAbElOttlatRJJSbHZjjhCdxrEKtNUSimRd97ZsmXWLJHVqysrd%2b7UnQrQ6/fCv9MRrfsPHD%2bewh91yaY7ACJbxnslv3rP7dTJmGweLWt//lmtkb7yXLNmunMBAOpGuBEQxvOBqA1KhT5GjNi%2bfd48kSVLysq2bNGdCtDrr078h1w0aJDuXIhtXAHAX8oeWtzQM75jR/McdbqlcsEC%2bZd0UK%2b1bq07FwCgfnA1ALVp1KidO5csEZk2raho/XrdaQC9GPWHTlwBwJ9kDy37qSbriCMCp0my5c1Zs6SlXKD%2b16aN7lwAAD24GoBD8f33ubm//ioycWJBwerVutMAeu0e9W/X6NKVjPpDD64AQEREsocWfKbMFi0C%2bcEFfvvMmdJDrVc1HTrozgUAiAxcDcCB%2bP77XbuWLxcZMyYvb8UK3WkAvfY%2b8T%2bt%2bKpRjPpDDxoAcS57aNlPymzUKHBsoLdv5%2bzZcp9yS02XLrpzAQAiE40A/J3wSf%2bYMaEGABDP/mq5H3f8oRsNgDillFJKWa2ZzpI3/Rd%2b843sku4y5YQTdOcCAEQHGgH4o0mTCgpWrRL56qvQXX8gnrHcD5GMHQBxavPTxT/42r/7ruxSN6opl16qOw8AIDqxIyC%2bTZoUOvH/8ksKf4DlfogGNADiTObI4rbeBx57TN0gfSXr3nt15wEAxAYaAfFl0qSCgjVrQoX/4sW60wB6UfgjmnAFIE5kvFd4r/fcSy9V89WZ8sSrr8qZuhMBAGIRVwNi2%2bTJuwv/RYt0pwH02n3H/8j3Qnf8ezLqj4hn6A6AurXp1JLWvsUnn2xpqZzKtWiRGq62SJ%2bUFN25AADxwe0OBAoLaQREuylTQoX/559T%2bAN7Lfeb2%2busIVdQ%2bCM60ACIUevWVVYq1bSpfZQ31d8jPV1ukzK1%2bKijdOcCAMQnGgHRicIf2I1Rf8QCdgDEmNB2f8NIGOdr6%2b/0%2becU/gCASMCOgOgydWph4dq1Il98wR1/gMIfsYQGQIzJvKH4W1/Bs8%2bqIWqL2nDFFbrzAADwRzQCItvMmcXFGzeKfP75jh2LFokoFfoA4hGFP2IRDYAYsdFd1Mxz7Xnnhb71n//ozgMAwN%2bhERBZwoX/iBHbts2fT%2bGP%2bEbhj1jGKwBRLqtZWVLNi4cfHpwR7GhUf/%2b9PK3OlzSrVXcuAAD2B68G6BW%2b4x8e9afwRzwLF/633tluXv8148YNM04rHjJq8GDduYDaRAMgSoXv%2bmf2KP6P/6ZPP5VjZaj6tHlz3bkAADgYNALq14QJ%2bfmrVomMGpWTs2SJ7jSAXnuf%2bFP4I3bxCkCUylxeWO5N%2b7//Uw0Nv%2bS/847uPAAA1CZeDahd4ZP9r77auXPpUpFJkwoKVq3SnQrQi1F/xCMaAFEm67UCu3d%2bly7BndZ2IitXygNqsfRKTtadCwCAukAj4NCYplJKiXz88fbt8%2bfvvusPxDMKf8Qz7opHiXlKmcq02RqMd1cHf506Ve5Vn0u/du105wIAoC7Z7RZLaqqIYYhYLCJ%2bv2lWV%2btOFfnChf/772/bNmeOyJw5JSUZGbpTAXpR%2bAPsAIgarfqV/Og/8fnn5T31uKT36KE7DwAA9YkdAfsnEFAqGBR5882srJkzRX79taJi61bdqQC9fi/8Ox3Ruv/A8eOHGacXD7lo0CDduQAdeAYwwmV2Lertu6xbN2OFWqXGPf647jwAAOjE84F/zesNBv1%2bkZdeysycOpXCHxD5Y%2bF/5Hv9B44fP2xur7OGXEHhj/jGBECECm35t1gyS0rsvv9%2b/LGUqbHSzm7XnQsAgEjARECIyxUM%2bnwiL76YkTF5ssjmzU5nYaHuVIBee4/69%2bTEH/gNEwARKnNQyb%2b96%2b65R8pUnjzUq5fuPAAARKJ4nQiorPT7a2pEnnlm48bx4yn8ARHu%2bAP7gyWAEWbj4OIxrsGtWllSVJVVjR8vvaWHdE9K0p0LAIBIFi/LAktKfD6HQ%2bQ//8nImDhRJDfX7S4v150K0IvCH9h/XAGIMJY%2baqd9/HvvqfPlHvVNkya68wAAEE1i9WpAcbHXGyr8N22aMEGkqMjrjcUGB3AgKPyBA8cVgAiRsai4oWf8BRfI%2bXKTcg8erDsPAADRLFauBuzYUVNTWiry739v2PDjjxT%2bgMjuwv/WO9vN679m3DgKf2D/MQGgWWjZn9Waubikka/gzTd15wEAIJZE60TAunXV1bt2ibz%2b%2bubN06eHlv15vbpTAXrtfeJ/WvGQURycAQeCCQDNMh8uPslffuutkqa2SFq3brrzAAAQi6JlImDJkrKyLVtCz/lNmULhD4gw6g/UJkN3gHi1cXDxGGWmplo%2bVmn%2bB7OypFi6qTdat9adCwCAeOB2BwKFhZEzETB1amHh2rUiX3yxc%2beiRSKmqZRSulMBelH4A7WPKwCaWH0yzJ/62GOqWOapCgp/AADqk%2b6rAeEC/9NPd%2b5cuFDk558LC9ev1/2rAkQGCn%2bg7nAFoJ5ljiwdUNOpTRtZp9LVmEce0Z0HAIB4Vt9XA/x%2b0wwGRYYP37JlxgwKf%2bCPfi/8Ox3Ruv/A8eMp/IHaxwRAPVP/CjayffHkk3KmOFT3Bg105wEAAHU/EeBwBAIej8grr2ze/NNPIpmZDkdBge6vGogMuwv/I9/rP3D8%2bGFzey4ccsWgQbpzAbGICYB6snFw8RjX4Fat5AnjV%2bW/7TbdeQAAwN5qeyKguNjrdThEnnxyw4axYyn8gT/aa9Sfwh%2boc0wA1BPLUhH7v554QmarxapXcrLuPAAAYN8OdSIgO9vpLCoSefnlzMypU0WqqgIBt1v3VwVEBu74A/rQAKhj4ZN/o0ZuV03vuEOJbNGdCQAA7J8DbQSsWVNZmZMj8vrrWVnTp4u43abp9%2bv%2bKoDIQOEP6EcDoI5ZZ8ib9tMfe0wtV1tUn5QU3XkAAMCB%2b6dGwJw5JSWbNol89NG2bfPniwSDSpmm7tRAZKDwByIHDYA6snlE/h3KbN5cTZbvfbPvvlt3HgAAcOjCjQClQh%2bffbZ9%2b/jxIj/%2bmJe3YoXudEBk2Wu5n9GzeMhF3PEHdKIBUEdUtvUn38K77lLD1Rbh5B8AgJgQDJqmaYpUVFRWpqSIWK2m2aiR7lRAZNn7xJ/CH4gUVt0BYk36CmUq0263L3HtMp/5%2bmvpJb3lcv5oAABANPN6/f5AQCQvr6ysqkrE5wsEgkGRjh0TE485RiQ5OSEhGBTZsMHp3L5dd1pAD0b9gcjHBEAta1BRZPr7Dh4sDxtPqlm18YAQAADQxeFwu71ekeLiykqnU0QppZTa%2b8ddcEHDhhdfvPvb339fUDBnju70QP2g8Aeih0V3gFhjfGTpq679v//TnQMAAByMUHlfWlpd7XKJFBVVVDgc%2by789xRuBAwZ0rr1eefp/lqAukXhD0QfrgDUksyRpQP8zbp3V7eY36jRw4bpzgMAAPZf%2bG5/QUFFRXW1iNMZOvk/WFwNQCyj8AeiFxMAtWVU8P/Md%2b6/X3cMAACw/zweny8QEMnNLSmprBRxu71ev7/2fn4mAhBL/lD4n9t/zbhxFP5A9KEBcIg2Di4eo8zUVPWzdJQU/gMIAEA0cDhqajwekfz80FK/QCAYNM26%2b%2bfRCEA0%2b4sT/7Qh6wYP1p0LwIFjCeAhsvxkXuLPGTJEdhouGZCaqjsPAADYW/gOf0lJVZXLJVJdHWoA1DeWBSKaMOoPxB4mAA7VOMOhvrjlFt0xAADA3vz%2b0HN9u3aVllZV6Sv898REACIZhT8Qu1gCeJAy3iv51Xtup06Sonzy7n//Ky0kVWyGoTsXAAAQcbm8Xp9PJD%2b/vNzhCI34B4O6U%2b2NZYGIJBT%2bQOxjAuAgGR%2bbjxqpt9wiXaSlJFL4AwCgV%2biRvrKy0PN9BQVlZdXVIqYZ2u4f6ZgIgE6/F/6djnyv/8Dx4yn8gdhFA%2bAAhe4QGoZabzQQ3zXX6M4DAEA8Cy/vy8sLLfOrqHA63W7dqQ4ejQDUp92F/xGt%2bw8cP37Y3J4Lh1wxaJDuXADqDksAD1B2WtElgXN79JDFxlfq53btdOcBACAeuVwej88nUlRUUeF0ipimUtFw0r%2b/WBaIuvRXo/5DLqLwB%2bIBDYADZLYxHKrhlVfqzgEAQDxRKvQRHvGvrHQ6I2GZX12jEYDaxB1/ADQADpB6VXrLLzQAAACoD35/aMS/sDC0zM/r9fv9ft2p6h%2bNABwKCn8AYbwCsJ8yuxb19l3WrZvcLW%2bp5c8%2bqzsPAACxzOl0u71ekYKCyN7iX994NQAHgsIfwJ6YANhP6gX5QI3mP5gAANQF01RKKZHS0qoql0ukurqmJh5G/A8WEwH4OxT%2bAPaFVwD2V408JXMvvVR3DAAAYonHExrpz80tKamspPA/ULwagD/aa6s/hT%2bAPfB%2b/T/IeC8vVam0NKm2TfSVFRfLQOkmDS00TgAAOChKiYhUVrpcbrdIaanDUVMT%2buuh78GhmDnT4Zg%2bnYmAeMOJP4D9xRWAf2CZkXCEv8F555lvmN2kgsIfAICDEV7mV1xcUeFwiLjdPl88LvOra1wNiC8U/gAOFA2Af6AaqxvVNf366c4BAEA0Ci/zKy4O3e03TdM0Td2pYh%2bNgNhG4Q/gYHGi/Q/UhfKOkcGtOgAA9kcwGCrwCwsrKqqrQ58dDgp/XdgREFt23/E/8j3u%2bAM4GEwA7MOmp0t6e9OOOUZ6mGPVvA4ddOcBACCS1dR4PD6fSFFRVZXTKRIMhkb%2bERmYCIhue5/49ywectGgQbpzAYg%2bTADsg/FWcLqxsk8f3TkAAIhE4RP94uLKSqdTJD%2b/vLy6msI/0jEREF3Y6g%2bgttEA2JdTjJ7q4169dMcAACCS1NR4vX6/SE4Oz/ZFMxoBkW2vE/%2b5vc4acgUn/gAOHVcA9sFoY5wsL55%2buhIlEtSdBgAAPUzTNJUSKS2trna5KPhjDVcDIgvL/QDUNavuAJFm65byMmU2bhwsC7YKVrzxhnSRlpJoGLpzAQBQn1wuj8fvFykoKC%2bvquLZvljXsWNi4jHHiCQnJyQEgyIbNjid27frThU/9lrud/Ppm665lBN/ALWPCYA9%2bAb5V3s/OO00%2bV66GXdauCIBAIgL4Tv9paXV1TU1nPTHKyYC6hfL/QDUNxoAe8qSWcaFp58uIt10RwEAoK45nW631ytSWhra3h8IhEb%2bEd9oBNQtRv0B6MIJ957ONKYZg049VXcMAADqQnhLf0FBaGt/YWFFhcNB4Y%2b/xrLA2sVWfwC6MQGwFzVNpGtX3SkAAKhNDkdopL%2bkpKqqpkbENJXiuT7sLyYCDs1fnfgz6g9ABxoAv0lPz79DqZQUmSGbfWUdOghXAAAAUcznCwSCQZHi4tBov8cTer4POBQ0Ag7MXsv9uOMPQDMaAL9p0MD%2bit/fpYsMNE1pyPI/AEB0MU2llBKprHQ63W6RigqHw%2b0WUSr0AdQmGgF/j%2bV%2bACIVhW7YZaq/vHv88bpjAABwIGpqPB6fTyQ3t7i4okKkvNzhqKmh8Ef9YEfAn7HcD0CkYwLgN8ZIdYNkHH88f1YCAESyQCC0xK%2bszOFwuUJ3%2b71e3akQ7%2bJ9IoDCH0C0oAHwG%2bU1siS7SxcRWgAAgEgSOsevrKypcbtFysurq8NL/DjhR6SJt0bAHwr/c/uvGTdumHF68ZBRgwfrzgUA%2b0IDIGyzekV91a6dtBW37igAALjdoaV9paXV1S6XiNfr9wcCulMB%2byfWGwF/udWfwh9AFGAHQFiufCsz2rXTHQMAEJ/Co/1FRZWVDodIXl5ZWVUVhT%2biW6ztCGDUH0C0i/sJgOyhZT8ps1GjwC2B7j5/48a68wAA4kV4a3/oDn95eeikn9F%2bxKJonwig8AcQK%2bJ%2bAiA4P/Ca/wpO/gEA9SM82p%2bTU1JSWSlSWlpV5XRS%2bCM%2bRNtEAIU/gFgT9xMA6i7VTTnbtRMxdEcBAMQgn8/vDwZDW/udThGXy%2bPx%2b3WnAvSK9ImA3wv/Tke%2b13/g%2bPHDjJ7FQy4aNEh3LgA4VHHfADCSjfsta444QomIqTsMACDqmaZSpilSXu5wuN0iVVVOp8cT2uXPCT/wZ5HWCNhd%2bB/Ruv/A8eOHze25cMgVFP4AYkfcNwDU/fKluaxFC1klD%2bvOAgCIPuHCvqrK5Qrd5Xc4Qs/0maZJZxnYL7obAX%2b51Z8TfwAxKO4bAMalRp4xu2lTJUrUbbrTAACihcvl9fp8IqWllZVOp4jfH9riD%2bDg1XcjgDv%2bAOJN3DcA1A/qLGVp1kwydScBAEQyjyf0HF9paVWVyyXi8fh83OUH6kZdNwIo/AHEq7hvAIjTcBjj09JElKhbdIcBAESK8PK%2b8nKn0%2bUScTrdbp9PdyogvtR2I4DlfgDiHQ2AX9T1qlezZtJBdxAAgE6BQGiEP3yHv7ra7fZ4RFjdB%2bh3qI2AvU/8KfwBxCeL7gDajTTeNl5q2lR3DABA/Qpv6y8tra52uURycoqLKypEqqtraij8gcgUbgQMGdK69Xnn/fOP32urP6P%2bAOIcEwDPyQw5OzlZRB7RHQUAUHeUUiq8rd/jCY32u91s6wei0T9NBLDVHwD%2bGg2ACvWoHJuQIC11BwEA1Kbw83zV1eHn%2bZzOmhqRYJBt/UCs2LMRMGFCUdHChdzxB4B9oQGwyHhKJdjtMkhdoDsKAOBQhE74HQ63O1Twh%2b7y8zwfEPsuCjbe0f8kpU4ob5DTqeU779wx99SFZw94%2bGHduQAg0tAAqFZPy3EJCbpjAAAO1J4Ff2ik3%2b8PBIJB3dkA1AfLdMt6o0Cp1OX2yxJ2DB16R82JTc4e/OGHunMBQKSiAeAw3pTOCQki6krdUQAAf4eCH0DInoV/n/TjmjSn8AeAf0QDwKGGSScmAAAg8oQK/urqUMFfUcFIPxDvwoV/Sk1yi4Qr7rmnT3qnJs13ffyx7lwAEC3ivgFgbJEi8SneegIAzcJL%2b5zOmhpO%2bAH80d4n/hT%2bAHAw4r4BIM2M5yTL5xNR10lrG78eAFBPTDN8wh8q%2bCsrQ1v6AwFO%2bAGEMOoPALWLgjdNPSIZPp%2bIiPRJSdEdBwBilWmaZrjg93hCW/rd7lAjgIIfwB9R%2bANA3bDoDqCb8hsvGxW/NQAAALUmGAyd5JeVVVe7XCI7dhQVlZeLlJaGvk3hD2BP4cK/wckpy5OOuu8%2bCn8AqF1MADRU90k2DQAAOFThu/pVVTU1brdIdbXL5fXuHvUHgH3Z68T/w2NubNb9o4905wKAWEMDoLG8KZt9PhEp0x0FAKKJ2%2b3z%2bf0ilZWhUX6Xy%2bulnQrgQDDqDwD1iwZAO6lRPzqdumMAQOQKneA7nR6Pzxda1ufxiHg8fr/frzsbgGj0%2b3N%2bHyT6Eobde28fo3OT5lNGjNCdCwBiHQ2A04xPjV/Ky0XU9epq3WEAQD/TNE3T/ON2fpfL7WY7P4BDt%2bcd/77GMe83o/AHgHpDAyBBHSl3l4XG/2kAAIhDe97dr6oK3d1Xirv7AGoHd/wBIDLEfQPA6G9MV5eVl6u56mzdWQCgLoWLeY/H6w3d3Xc6ubsPoC5xxx8AIkvcNwDkRpVgGOXlIiIcdAGIJbtH%2bd1un0%2bkqsrprKkR8fsZ5QdQtyj8ASAyxX0DwLzcyFMdy8sNyn8AUc7r9fkCgdAov8cj4nS63TzDB6A%2b7XnHn1F/AIgscd8AMHrJ9Ua34mLJZAIAQHQIF/ThAj9c8IcbAABQ3/bc6s9yPwCITHHfALCcZjYx38/JMUcZYlyhOw0A7I2TfQCRaq9Rf57zA4CIFvcNgEA7S6V8k5Nj4fwfgGac7AOIFtzxB4DoFPcNgIRWVb8kHpGbGxjfKM1XbpoyULpJQ4tFdy4Asc/t9vn8fhGHo6bG6%2bVkH0Dk444/AEQ3Q3eASJFRVjTb90B%2bvhRLN/VG69a68wCIHYFAaOv%2bnif7fn8gEAzqTgcA/4wTfwCIDXE/ARBm3G48r47LyVGvqHEiNAAAHDilQif3LpfH4/PtPtl3uXw%2bny/0I3RnBIADQeEPALGFBkDYOhkg/bZvD32jZ0/dcQBEvr1H%2bD2e0Ai/aVLqA4hmv2/1r0lukXDFPff0Se/UpPmujz/WnQsAcGhoAPxG5atyCW7apDsHgMjj84VG9cMj/A5H6DMj/ABizd4n/hT%2bABBLaAD8Ru2Qu2Xdhg1GuYi0050GgA677%2brvHuEPbeH3%2b9nCDyCWMeoPAPGBBsBvjB8sxfLhxo1yvtleBuhOA6AuBYOmaZp739UPj/QDQLyg8AeA%2bMIrAL8JLe%2byWjPvLTnGt8DhkAfUYumVnKw7F4CDFwwGg0qFTvQ9nt0n%2bx5PqNDnsT0A8WrP5/z63nHM%2b82a8ZwfAMQ6JgB%2bYxiGYRjBYOZ9RbO9azZvDlUFJ52kOxeAfxYe3a%2bp8Xp9PhGXy%2b0OfWb7PgD80V4n/h8ec2Oz7hT%2bABAvaADsqZl0lC3r14uISBcaAEAk2fOOvssVWsbH6D4A/L3ft/p/kOhLGHbvvX2Mzk2aTxkxQncuAED9ogGwB3WasVydtny5iOpryA036M4DxKPw0j2XK3yiHyr4vV6fj2V8ALD/9hr1N455vxmFPwDELRoAezCKLKOtJy1bpo4O9jULdKcBYlVoJN/t9vv9/t0Ffvgzz%2bsBwKFh1B8A8FdYAriH9BXKVKbdnvpcSWPf7MpKNVxtkT4pKbpzAdEovG3f7fZ6Q4X%2b7hN9v1/ENEPfDwCoHWz1BwD8HYvuAJGmew/DYlj8fmVRX8rUVat05wEiWXi1Xng0v6LC6XS7RfLySkurqkR27CgqKi8XKSysqHA4dj%2b3R%2bEPALVrz1F/Cn8AwF/hCsC%2bnCCnGynLlomIKDnrLN1xAJ32PMmvqdn92efbvZwPAFC/GPUHABwIGgD7MtR4QV23bJlUqRd0RwHqmlKhs3yfb8/le6HPPl/ohJ/H9AAgMrDVHwBwMNgBsA8Z7%2bWlKpWWJtW2ib6y4mIZKN2koYUrE4hK4cI9XOCHn81zu0N38cPfNs1wKwAAEIn22up/xzHvN2vGiT8AYP/QAPgHGaOLLvVOXLFCTpXP5OLu3XXnAf6O3x8axXe7Qyf34VH98Oh%2beJQfABBdWO4HAKgNXAH4J2fJEuO9WbPELaJoAEAzn8/vDwZDz%2bf5fKET/PCJvs8XKvA5wQeA2LHXcj/u%2bAMADgENgH9gzFaXmNmzZqkzDTHkySd150GsCpXtXm94RD/02eMJj%2bpzgg8A8YTlfgCAukAD4B8Efy5zJ%2b5YvNj6UvOGvp9cLjVdHHJBgwa6cyG6hO/Wh5/L230HP/Q5/Ne5gw8A8Y1RfwBAXaIB8A%2bOH3v8WMPi82XeXpTsu2rBAhF5U13Qv7/uXIgU4ZP7QCAQ2H2C7/GECvrwZ78/9P0U9wCAv/L7Vv%2ba5BYJV9xzT5/0Tk2a7/r4Y925AACxhQbAflKPSAMZPWlS6Bs0AOJF%2bH373QX%2bn0/wwwW%2bUpzcAwAO3N4n/hT%2bAIC6wysA%2b2nziPw7lNm8ufrS2sWXU1CgvpDrpLWNBkqUCm/LDz%2bLFz6593r9/nBhHwxy5x4AUDd4zg8AoAMNgAOUoYoGewfPny%2bZ8oF806eP7jwIC52/%2b3zBYDC4u7D3%2bQKBYHD3yX24wA8E2JYPAKh/3PEHAOjECfYBMlaoT2TehAmqoeEXoQFQ18In8OFCPvwM3u4T%2b9Bovs8XOrFXinv2AIDIw3N%2bAIBIwATAAcoeWvZTTdYRRwTODbS1tsrJkS7SUhINfh33k2mGCnqvN1TQ%2b/3hwn73Er3wt0Mj%2bKFRfQAAohEn/gCASELhepAyryw%2byzti2TL1ihont/TsqTtP/Quds/v94ZH7QMA0d397d2H/51F87tQDAOLBnlv9z/my08Us9wMA6MYVgINkfiEJlndHjTIKRMwYaAD83cl8MLh7G/7uAj90Us%2b79QAA7MZWfwBAJGMC4CBt3VJepszGjX3DAz19CwsK5AG1WHolJ%2bvKEwwGg0qFCvRAILTkzjRFAoHdJ/Phz6HvD//10GfuzgMAcPDY6g8AiAZMABykjkc3SzMsVVWZNxeP8eZPnhyqna%2b%2b%2bkB/nvD78eFCPBhU6o%2bFe/jkPVzQ713Ah76fd%2bgBAKh/FP4AgGjCBMAh2rgtv1nNBZdf7i73rw6OmzgxXLCHl9f5/eGT%2bNDofPivhwt60%2bQ5OgAAog2FPwAgGtEAOETzlDKVabN5P93QvugNt9vfOjApeL2NyQoAAGIQW/0BANHMojtAtDvHMCyGJRBIXpAwP2HhggW68wAAgNr3%2b1b/DxJ9CcPuvZfCHwAQjWgA1JKGExMLlef%2b%2bw3DMAzmKgAAiAl7nvifY3S%2bvfmUESN05wIA4GDQAKglp7jan5E2JyOjwdDE0fY%2b27bpzgMAAA4eo/4AgFhEA6CWJfkT7rH%2b%2buyzunMAAIADR%2bEPAIhlNABqWa%2b8jh2bNfv226T/2tfYch0O3XkAAMA/o/AHAMQDGgB1xP61Pd1a9uWXunMAAIB9o/AHAMQTGgB1JLWsoc838Ykn7AW2yy1fBAK68wAAgN1%2b3%2bpfk9wi4Yp77qHwBwDEA/bV17Ffjsx6rXz96NGVH7gudDe77jrdeQAAiGec%2bAMA4hkTAHUseXzqVs%2b7d95py2ESAAAAXSj8AQCgAVDnundv82mbT2tqkk9MGJTg/fFH3XkAAIgnFP4AAOxGA6CetHgnkBvseued9gLb5dbRTAIAAFCXKPwBANgbDYB6cvzY48cedrXTmZKW8Ja9ydixuvMAABCLfl/u90GiL2HYvfdS%2bAMAsBsNgHrWeIlnqb/97bfbP7d2sL7p9%2bvOAwBALNjzxP8co/PtzaeMGKE7FwAAkYQGQD07cfiJw1td6HIlnpPYxF7w2We68wAAEM3ChX%2bDk1OWJx11332c%2bAMAsG88A6jJDz8opZTV2njehvlF6yorff0DTYLNU1N15wIAIBpwxx8AgAPHBIAmV11lGIYRDCYfk3xP0tqHHtKdBwCAaEDhDwDAwWMCIELM3rYxv/jmnTvdG31F/pePPFJ3HgAAIgmFPwAAh44JgAjR6KwG3ycdM2SIxWLQlAEA4Dds9QcAoPZQbEaYed9lXlK6YdYsZ6r7JW/T88/XnQcAAB048QcAoPYxARBh7OfLlfLkwIH2wVaH9VGfT3ceAADqE4U/AAB1hwZAhDmrRefbm09xOBI99qm2h597TnceAADqA8/5AQBQ97gCEOHm3JDRotiZnV1zlWemv%2broo3XnAQCgNnHiDwBA/WECIMLZ3rW0T3j1ggtsD1m/s6w1Td15AACoDSz3AwCg/tEAiHB9mh67osnL27enXpByfeLkV17RnQcAgEOx54n/OUbn25tPGTFCdy4AAOIBVwCizOxhmw4vabhli/sU71RfZseOuvMAALA/GPUHAEA/JgCijPqfZZjR9%2byzrVut/S1fBAK68wAA8Hco/AEAiBw0AKJMv/LOtzefkp%2bf4k%2bakuh96indeQAA%2bCsU/gAARB6uAES52bmbAsXbVq1yr/Gu9yeefLLuPACA%2bLbnc3597zjm/WbNPvpIdy4AAMAEQNRLSrJ8afm/Pn0SxH681e5y6c4DAIhPe271p/AHACDy0ACIcme16Hx78ykOR4NtiQ%2bn3Hj%2b%2bTwXCACoT2z1BwAgetAAiBFn/d8x7zf6edmylIKkXxLufPZZ3XkAALGNO/4AAEQfGgAxpo%2br09K0Xa%2b8kupJejbx7kWLdOcBAMQWCn8AAKIXDYAY1bC967m0Seeem7DcNs02sKxMdx4AQHSj8AcAIPrRAIhR3Xt072FY/P6Ut5IKbP85%2b2xbjrW/dXQgoDsXACC6/L7crya5RcIV99xD4Q8AQPSiARDjeruOeT/tkk2bkvskD0rcNHCgZbqx1ihQSncuAEBk22u535edLm6%2b6%2bOPdecCAAAHz9AdAPVrnsrsV371o486p3recL/1xhsiNAMAALsx6g8AQOyiARCn5m/IbF2a%2bsknju3uad7Nd9yhOw8AQC8KfwAAYh9XAOJU366dC5o777wzdWBSQeLIJUt05wEA6EHhDwBA/KABEOfm%2bzpfnPaf3r2T7rO/Yzt6xw7deQAA9eP35X4fJPoSht17L4U/AACxjwZAnBtmGIZhmKZtp%2bEyvuzWLeFZ2yu2XqWlunMBAOpGuPBvcHLK8qSj7rvvHKPz7c2njBihOxcAAKh77ADAn/zyy7p1lZVNm7qqjFzvzVu2%2bFWgTeCDZs105wIAHBpG/QEAAA0A/KVfGqw%2bq%2bCzFi1qhttqjOLsbN/hgc%2bCNzZurDsXAODAUPgDAIAwrgDgL/V2nbyo9W0lJWqGLcMa7NIlYZqt0lrqdOrOBQDYPxT%2bAABgT0wAYL/88kvWNZWVRx3l7Oid7k5Yvz6wMjDPrEhJ0Z0LAPBnlunG2tByv2SP/ec77zzHOPbuFs%2bMHKk7FwAA0I8JAOyX3r07fdekybZttg2W8xPdXbrYv7fmMhEAAJHD%2boBltGWtaTaclBRIGHbDDRT%2bAABgT0wA4KAs7L4%2bu/zqtm3dreVYX8t163x3BlYG/92kie5cABBvLB2tT1p%2bDgYbTU/pnPjJpZf2fuTod5r9%2bvPPunMBAIDIQwMAh2TWzK1byssaN1Yu9%2bv%2baZs2eW3%2bewLntmmjOxcAxDrbCGsH65t%2bf0NP4veW088996w5x9592NWLFunOBQAAIhdXAHBI%2bl3Q8ehmaVVVDYc2PtZXfPTRyauSHkvovHWr7lwAEKvsy2xfWM/zeBouTyxPPK1HDwp/AACwv5gAQK16TimllMXSe8qmJSW58%2be7DV%2bK39q7t%2b5cABDt7O1t71pnVVcnH5GwISn7pJP6ND12RZOXt2/XnQsAAEQPGgCoU/NOzHi2dPjnnztf8gz0DrnlFt15ACDaJJ2XONaavH27LEq8JUGdfHJ48kp3LgAAEH1oAKBezPp4k6v4%2bRdf9K72/Ri49Omn1SXqRNXa4N8/ANiHBhXJkxOT58w554Zj/5PWtF8/wzAMw1BKdy4AABC9KMBQr%2bZvyB5acdOAAe5/u1/yNhs3LnB3cHvwUbtddy4A0C/UFG14atLLSc3efrtvm84/piU//LDuVAAAIHbQAIAWv/ySdU1l5VFH1fT05fq6LVvmm%2bF/z7%2bsRQvduQCgvtlyrP2towOBhuOTS2xv3nTTWXOOCTQv%2bfZb3bkAAEDs4RUAaNG7d6fvmjTZti1treftFjsPPzzlq8Qs%2b6IFC3TnAoD6YmsSWupnHWE/PsE4%2bWQKfwAAUNeYAEBEmacyzi/95KWXau7zXu875amnzIvZFQAgtiRNTXzd1nDdOtsI5Temn3nmOcbxYw%2b72unUnQsAAMQ%2bCitEpDk3bL6v/PGLL/Yf6bP6Jo8f7z89cEtwTlKS7lwAcKBsD1m/s6w1zQb3Jn6RkPX882c/fGxJ2oMvvqg7FwAAiD80ABDRJp2RObJ0QMOGDZ9V96ues2a5Ap4lvlt69tSdCwD%2bSeJxdr/9ufLyhmuSbjTa9%2bvXa9DRmS2eWbVKdy4AABC/aAAgqiy8aHPHsp8efNB5kc/v3/DGG8GOgUnB62023bkAILzFP7U68bPEl37%2bWa4tfDftgwEDzjHOMQxLIKA7HQAAAA0ARKWZ3dY%2bUvl0hw5qhbXUN3XuXN8s/4P%2bae3b684FIP7YUqyLLIO83oTWSYm20bfcct5xne5scfR33%2bnOBQAAsCcaAIgJ81TG4aUPvvOO6x7vy77rH3hAXcLyQAB1I/xflqRXE162L1q50rEo5Uf7Veeff6XRwWhqVFbqzgcAALAvFEiIKTPHZI2pUCedpC73TfOfNGECkwEAakuC2NpZ7S5XwqWJfazTb7/9HKPT%2bhY3ff%2b97lwAAAD7iwYAYtr8N7LSy5997DH3fPeR3vKXXw7cbeaZT9ntunMBiHyW6Zb1RoFSKWcmrEj4bMYMuTbpXceHV155jtHB6GB4PLrzAQAAHCgaAIgL07Kyh5b91KhR8oqAoaaOGeNq7LnV9%2bxFFyklopTudAAiScKFCS/b2peU2CvUhcZFV155bsuudxw2ZfFi3bkAAAAOFQ0AxKX52zffV%2by8%2bGLf3X5DHTdqlHeo/7bA0ubNdecCUP9sA6wOy/0%2bX0IH%2b5HWMcOHn7utc7sWtqefNgzDMAxahAAAIHbQAEBcU0oppQxj3r8zU0pffuYZb8A3MPDpU08FzjEfNZckJenOB6D2WR%2bwjLasNc2UPoldEg4fOzZxVoOqmtk339wrr%2b0jbR9xu3XnAwAAqCs0AIA/SF%2bRviJ9hd3u6J56X/tub7/t/p%2b/MPC/u%2b4KdgxMCl5vs%2bnOB%2bDAGUboIyUlcYntl5UrVY7tWetNl19%2b3s2dytM8eXm68wEAANQXGgDA3/jll3XrKiubNg28lDjEX/rVVzUZnosDWZdcYn5gXm%2beaLHozgdgb78/0zc08UX7j5mZDYYnbDKc113Xa9DRmS2eWbVKdz4AAABdaAAAB%2bDnK9PTS15q3dp2XLKoWz77zFvh3xAouOgi82J1ompt8P8nQBPDEEm5LOlF%2b8KMDHsjdatMuvvus6uOu7TFdwsX6s4GAAAQKShYgEMwq1nmyNIBbdpYl4uIvP22Z6r/hcBZAwdyZQCoO%2bGR/qShiS/afsjMNH6wONQNt9123mmdZ7VMW7JEdz4AAIBIRQMAqEVLD88dnjs8OdnzkKNfYs0rr3gaBRoHr73jjkDrYLmZ1KCB7nxANLJMN9YaBUolD0i8x/7z8uWyQl1s/fy22879z3Hjm23buFF3PgAAgGhBAwCoQ88ppZSyWM5esfmCso4PP%2bx/2v9hYOKjj/ofCDiDaS1b6s4HRCL7MtsXtks9noSP7T9Zd0yc6DrSeMw3%2bP77B6w69u42n5aW6s4HAAAQrWgAABrMOzrrkZKXLrnE/DFwler7wguey/0/BCpOOsn8wLxencJyQcSH8Ch/4rkJL9uv3r7dlpww12jy%2but95eiytMkff2wYhmEYSunOCQAAECtoAAARID09PT3/jpQU57SGF9vbPfKId76/vZlw112%2bh/yfBK47/HDd%2bYDaYEuxLrJe7/Umf5lYbRv200%2bBbcYG2wmPPXb%2b4k7fNWmybZvufAAAALGOBgAQweaO2ryt4rsTT5QqdZmZ9fLLng6%2bu3zTzz8/qIJnmeMSE3XnA/6KpaPlMcvPwWDiHfYrralr1liGWD6yDH3rrXOGHrs%2brfi77zjZBwAA0IMGABBFwjsFzlyd8Uzp2RddZBmgWqjX77vP/1zwyuBhffqwbBD1ydLR%2bqTl52Aw6QFrX%2bsbGRmJixLesd42cqTfvaug2SMffHCOcY5hWAIB3TkBAAAQQgMAiCEz393wafnXZ55pu9LiMts9/LD/XvOl4Nxzz/Xd6Z8VuKNJE935EJ1sAyyllvt9Pvt/bGdZE9assW6wjJRWH35YMmR9yxZvjx591VVXXWUYwaDunAAAAPh7NACAODDj5vXZeS%2b2bWvta/vZfvndd6ul5nDV/tJLfe8GPg1e07mzOdNsrj5JSNCdE3pYH7CMtqw1TXvQ1sz6ZE6O/WLr1Zaz584N9go%2bYXz68cfn3Xz82DTP8uW6cwIAAODQ0AAAIPPU1tdKB3TvrqZ5z1TNb7nF/EG6qZ19%2bvj%2bFfg6WHP00ewciG6W%2b4yvZIVp2s%2b3LbZlFRTY2lvaWg9ftsx41npB0DF6dMmPa5sddteUKZzkAwAAxDYaAAD%2b0bSsDUcUN%2bzYMfEN29XW04YMUS%2bbT5mn9u1rLjafNLsdd1zgg%2bBLalWLFsH/M/OCj9rtuvPGC8t9xlfGKtO0NbMFrPeVl9uPt%2b6wnpiZaYwWjwxYsMA70PetKh4/fun4E1o0f3rNmmGGYRiGaerODQAAAD1oAACoNTO7rX2kcMZhh1kuS%2bxiLOrXz3jEbGWd2LevypcnzAtOPDF4fbCL%2brFDh8Cv5p3qzEaNzJlm8%2bCbXD0Is/7PcrjlFb/fdpnlU0t6dbXRxZpoaZSfL3eaSbJo82ZJlNvVw%2bnpgf94K9U506cvu%2baUloedt2EDhT0AAAD2Bw0AANpMy8oemj00MVGlBI5tckO7dsmfq3ly00knGc9ac623nnCC9DE7mDs7dQqeoNLUr4cfbvY3O5pPt2hhNpQUVZmaapytLpdpSUnmMeoKmZmUpO5V280H7XYzU72pLrFa1SXqRDncqPX/zlnus4w2Vpmm8aG0srzl91vWW74zrvZ4jGvkQjm6psZyiyXbKKuutmw2njfmV1SocTJJ3ikttfxX3SRr8vLUFfKg2rFhg%2bUm60XBn5ctc57qPEnZNm0asKp79zaf1tTo/t8FAAAAsYkGAICYN3XqunU7dzZtaukkj1snNmhgZsnr9oyEBP8jnosCo6uq7MOTfg5s3PcJuqWT%2b8rUDcFg/049t6ZdUl2t%2b%2bsBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECj/wcsTwcgvWcuwQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wOC0wM1QwODoxNDo1NCswMDowMCxsgKUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDgtMDNUMDg6MTQ6NTQrMDA6MDBdMTgZAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIyLTA4LTAzVDA4OjE0OjU0KzAwOjAwCiQZxgAAAABJRU5ErkJggg=='/%3e%3c/defs%3e%3c/svg%3e";

var img$k = "data:image/svg+xml,%3csvg width='21' height='24' viewBox='0 0 21 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M20.5377 6.96401C20.5377 6.92668 20.5377 6.89868 20.5377 6.88001C20.5377 6.86134 20.5377 6.83334 20.5377 6.79601V6.68401L20.4519 6.51601C20.4138 6.46001 20.3756 6.41334 20.3375 6.37601L20.2517 6.29201H20.1945L15.4745 3.38001L11.0405 0.720009C10.9452 0.626675 10.8308 0.561342 10.6973 0.524009H10.6114C10.497 0.505343 10.3921 0.505343 10.2968 0.524009H10.1823C10.0488 0.561342 9.91536 0.617342 9.78186 0.692009L0.885372 6.09601L0.770948 6.18001L0.484887 6.43201L0.399069 6.60001V6.79601C0.379998 6.87068 0.379998 6.94534 0.399069 7.02001V17.212C0.399069 17.4173 0.446746 17.604 0.542099 17.772C0.656523 17.94 0.799554 18.08 0.97119 18.192L9.92489 23.624L10.0965 23.68H10.1823C10.3921 23.7547 10.6019 23.7547 10.8117 23.68H10.8975L11.0691 23.624L19.937 18.276C20.1086 18.164 20.2422 18.024 20.3375 17.856C20.4519 17.688 20.5091 17.5013 20.5091 17.296V7.10401L20.5377 6.96401ZM10.4112 3.07201L12.528 4.36001L5.86283 8.39201L3.74598 7.10401L10.4112 3.07201ZM9.20974 20.572L2.65895 16.652V9.17601L9.20974 13.152V20.572ZM10.4112 11.108L8.12271 9.76401L14.7879 5.70401L17.0764 7.10401L10.4112 11.108ZM18.1634 16.596L11.6126 20.6V13.152L18.1634 9.17601V16.596Z' fill='%2315A959'/%3e%3c/svg%3e";

var img$j = "data:image/svg+xml,%3csvg version='1.2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='20' height='20'%3e%3cstyle%3e%3c/style%3e%3cpath fill-rule='evenodd' d='m13.8 0.8c1.2 0.5 2.3 1.2 3.3 2.1 0.9 1 1.6 2.1 2.1 3.3 0.5 1.2 0.8 2.5 0.8 3.8 0 1.3-0.3 2.6-0.8 3.8-0.5 1.2-1.2 2.3-2.1 3.3-1 0.9-2.1 1.6-3.3 2.1-1.2 0.5-2.5 0.8-3.8 0.8-1.3 0-2.6-0.3-3.8-0.8-1.2-0.5-2.3-1.2-3.3-2.1-0.9-1-1.6-2.1-2.1-3.3-0.5-1.2-0.8-2.5-0.8-3.8 0-1.3 0.3-2.6 0.8-3.8 0.5-1.2 1.2-2.3 2.1-3.3 1-0.9 2.1-1.6 3.3-2.1 1.2-0.5 2.5-0.8 3.8-0.8 1.3 0 2.6 0.3 3.8 0.8zm4.2 9.2c0-4.4-3.6-8-8-8-4.4 0-8 3.6-8 8 0 4.4 3.6 8 8 8 4.4 0 8-3.6 8-8zm-9 4h2v2h-2zm2.5-9.7q0.8 0.3 1.3 0.9 0.6 0.5 0.9 1.3 0.3 0.7 0.3 1.5c0 2.5-3 2.8-3 5h-2c0-3.3 3-3 3-5q0-0.4-0.2-0.8-0.1-0.3-0.4-0.6-0.3-0.3-0.6-0.4-0.4-0.2-0.8-0.2-0.4 0-0.8 0.2-0.3 0.1-0.6 0.4-0.3 0.3-0.4 0.6-0.2 0.4-0.2 0.8h-2q0-0.8 0.3-1.5 0.3-0.8 0.9-1.3 0.5-0.6 1.3-0.9 0.7-0.3 1.5-0.3 0.8 0 1.5 0.3z' fill='%2315A959'/%3e%3c/svg%3e";

var TagCode = {
  SP: "@SP_",
  DH: "@DH_",
  HOTRO: "@HOTRO_",
  MAKM: "@MAKM_",
  CTKM: "@CTKM_"
};
var tagList = [{
  code: TagCode.SP,
  image: img$l,
  title: "Tìm kiếm và tag một sản phẩm",
  guide: "@SP_<Tên sản phẩm>"
}, {
  code: TagCode.DH,
  image: img$k,
  title: "Tìm kiếm và tag một đơn hàng của khách hàng",
  guide: "@DH_<Mã đơn hàng>"
}, // {
//     code: "@MAKM_",
//     image: promoCodeImg,
//     title: "Tìm kiếm và tag một mã giảm giá",
//     guide: "@MAKM_<Mã giảm giá>",
// },
// {
//     code: "@CTKM_",
//     image: tagImg,
//     title: "Tìm kiếm và tag chương trình khuyến mãi",
//     guide: "@CTKM_<CT khuyến mãi>",
// },
{
  code: TagCode.HOTRO,
  image: img$j,
  title: "Tìm kiếm và tag một phiếu hỗ trợ",
  guide: "@HOTRO_<Mã phiếu hỗ trợ>"
}];
var isStartTag = function isStartTag(text) {
  var n = tagList.length;
  var first = text.length;
  var j = -1;

  for (var i = 0; i < n; i++) {
    var index = text.indexOf(tagList[i].code);
    index = index >= 0 ? index : text.indexOf(tagList[i].code.toLowerCase());

    if (index >= 0 && index < first) {
      first = index;
      j = i;
    }
  }

  if (first < text.length && j >= 0) {
    return tagList[j];
  }

  return null;
};
var startTagAt = function startTagAt(text) {
  var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  if (tag.length > 0) {
    var index = text.indexOf(tag);
    index = index >= 0 ? index : text.indexOf(tag.toLowerCase());
    return {
      start: index,
      tag: tag
    };
  }

  var n = tagList.length;
  var first = text.length;
  var resultTag = null;

  for (var i = 0; i < n; i++) {
    var _index = text.indexOf(tagList[i].code);

    _index = _index >= 0 ? _index : text.indexOf(tagList[i].code.toLowerCase());

    if (_index >= 0 && _index < first) {
      first = _index;
      resultTag = tagList[i];
    }
  }

  if (first === text.length || first < 0) {
    return null;
  }

  return {
    start: first,
    tag: resultTag.code
  };
};
var startTagMenuCommandAt = function startTagMenuCommandAt(text) {
  var n = tagList.length;
  text.length;
  var index = -1;

  while (true) {
    index = text.indexOf("@", index + 1);

    if (index < 0) {
      return -1;
    } else {
      var sub = text.substring(index);

      for (var i = 0; i < n; i++) {
        if (index >= 0 && tagList[i].code.includes(sub.toUpperCase())) {
          return index;
        }
      }
    }
  }

  return -1;
};

var ALL_DOMAIN_ROOT = [".aaa", ".aarp", ".abarth", ".abb", ".abbott", ".abbvie", ".abc", ".able", ".abogado", ".abudhabi", ".ac", ".academy", ".accenture", ".accountant", ".accountants", ".aco", ".active", ".actor", ".ad", ".adac", ".ads", ".adult", ".ae", ".aeg", ".aero", ".aetna", ".af", ".afamilycompany", ".afl", ".africa", ".ag", ".agakhan", ".agency", ".ai", ".aig", ".aigo", ".airbus", ".airforce", ".airtel", ".akdn", ".al", ".alfaromeo", ".alibaba", ".alipay", ".allfinanz", ".allstate", ".ally", ".alsace", ".alstom", ".am", ".amazon", ".americanexpress", ".americanfamily", ".amex", ".amfam", ".amica", ".amsterdam", ".an", ".analytics", ".android", ".anquan", ".anz", ".ao", ".aol", ".apartments", ".app", ".apple", ".aq", ".aquarelle", ".ar", ".arab", ".aramco", ".archi", ".army", ".arpa", ".art", ".arte", ".as", ".asda", ".asia", ".associates", ".at", ".athleta", ".attorney", ".au", ".auction", ".audi", ".audible", ".audio", ".auspost", ".author", ".auto", ".autos", ".avianca", ".aw", ".aws", ".ax", ".axa", ".az", ".azure", ".ba", ".baby", ".baidu", ".banamex", ".bananarepublic", ".band", ".bank", ".bar", ".barcelona", ".barclaycard", ".barclays", ".barefoot", ".bargains", ".baseball", ".basketball", ".bauhaus", ".bayern", ".bb", ".bbc", ".bbt", ".bbva", ".bcg", ".bcn", ".bd", ".be", ".beats", ".beauty", ".beer", ".bentley", ".berlin", ".best", ".bestbuy", ".bet", ".bf", ".bg", ".bh", ".bharti", ".bi", ".bible", ".bid", ".bike", ".bing", ".bingo", ".bio", ".biz", ".bj", ".bl", ".black", ".blackfriday", ".blanco", ".blockbuster", ".blog", ".bloomberg", ".blue", ".bm", ".bms", ".bmw", ".bn", ".bnl", ".bnpparibas", ".bo", ".boats", ".boehringer", ".bofa", ".bom", ".bond", ".boo", ".book", ".booking", ".boots", ".bosch", ".bostik", ".boston", ".bot", ".boutique", ".box", ".bq", ".br", ".bradesco", ".bridgestone", ".broadway", ".broker", ".brother", ".brussels", ".bs", ".bt", ".budapest", ".bugatti", ".build", ".builders", ".business", ".buy", ".buzz", ".bv", ".bw", ".by", ".bz", ".bzh", ".ca", ".cab", ".cafe", ".cal", ".call", ".calvinklein", ".cam", ".camera", ".camp", ".cancerresearch", ".canon", ".capetown", ".capital", ".capitalone", ".car", ".caravan", ".cards", ".care", ".career", ".careers", ".cars", ".cartier", ".casa", ".case", ".caseih", ".cash", ".casino", ".cat", ".catering", ".catholic", ".cba", ".cbn", ".cbre", ".cbs", ".cc", ".cd", ".ceb", ".center", ".ceo", ".cern", ".cf", ".cfa", ".cfd", ".cg", ".ch", ".chanel", ".channel", ".charity", ".chase", ".chat", ".cheap", ".chintai", ".chloe", ".christmas", ".chrome", ".chrysler", ".church", ".ci", ".cipriani", ".circle", ".cisco", ".citadel", ".citi", ".citic", ".city", ".cityeats", ".ck", ".cl", ".claims", ".cleaning", ".click", ".clinic", ".clinique", ".clothing", ".cloud", ".club", ".clubmed", ".cm", ".cn", ".co", ".coach", ".codes", ".coffee", ".college", ".cologne", ".com", ".comcast", ".commbank", ".community", ".company", ".compare", ".computer", ".comsec", ".condos", ".construction", ".consulting", ".contact", ".contractors", ".cooking", ".cookingchannel", ".cool", ".coop", ".corsica", ".country", ".coupon", ".coupons", ".courses", ".cpa", ".cr", ".credit", ".creditcard", ".creditunion", ".cricket", ".crown", ".crs", ".cruise", ".cruises", ".csc", ".cu", ".cuisinella", ".cv", ".cw", ".cx", ".cy", ".cymru", ".cyou", ".cz", ".dabur", ".dad", ".dance", ".data", ".date", ".dating", ".datsun", ".day", ".dclk", ".dds", ".de", ".deal", ".dealer", ".deals", ".degree", ".delivery", ".dell", ".deloitte", ".delta", ".democrat", ".dental", ".dentist", ".desi", ".design", ".dev", ".dhl", ".diamonds", ".diet", ".digital", ".direct", ".directory", ".discount", ".discover", ".dish", ".diy", ".dj", ".dk", ".dm", ".dnp", ".do", ".docs", ".doctor", ".dodge", ".dog", ".doha", ".domains", ".doosan", ".dot", ".download", ".drive", ".dtv", ".dubai", ".duck", ".dunlop", ".duns", ".dupont", ".durban", ".dvag", ".dvr", ".dz", ".earth", ".eat", ".ec", ".eco", ".edeka", ".edu", ".education", ".ee", ".eg", ".eh", ".email", ".emerck", ".energy", ".engineer", ".engineering", ".enterprises", ".epost", ".epson", ".equipment", ".er", ".ericsson", ".erni", ".es", ".esq", ".estate", ".esurance", ".et", ".etisalat", ".eu", ".eurovision", ".eus", ".events", ".everbank", ".exchange", ".expert", ".exposed", ".express", ".extraspace", ".fage", ".fail", ".fairwinds", ".faith", ".family", ".fan", ".fans", ".farm", ".farmers", ".fashion", ".fast", ".fedex", ".feedback", ".ferrari", ".ferrero", ".fi", ".fiat", ".fidelity", ".fido", ".film", ".final", ".finance", ".financial", ".fire", ".firestone", ".firmdale", ".fish", ".fishing", ".fit", ".fitness", ".fj", ".fk", ".flickr", ".flights", ".flir", ".florist", ".flowers", ".flsmidth", ".fly", ".fm", ".fo", ".foo", ".food", ".foodnetwork", ".football", ".ford", ".forex", ".forsale", ".forum", ".foundation", ".fox", ".fr", ".free", ".fresenius", ".frl", ".frogans", ".frontdoor", ".frontier", ".ftr", ".fujitsu", ".fujixerox", ".fun", ".fund", ".furniture", ".futbol", ".fyi", ".ga", ".gal", ".gallery", ".gallo", ".gallup", ".game", ".games", ".gap", ".garden", ".gay", ".gb", ".gbiz", ".gd", ".gdn", ".ge", ".gea", ".gent", ".genting", ".george", ".gf", ".gg", ".ggee", ".gh", ".gi", ".gift", ".gifts", ".gives", ".giving", ".gl", ".glade", ".glass", ".gle", ".global", ".globo", ".gm", ".gmail", ".gmbh", ".gmo", ".gmx", ".gn", ".godaddy", ".gold", ".goldpoint", ".golf", ".goo", ".goodhands", ".goodyear", ".goog", ".google", ".gop", ".got", ".gov", ".gp", ".gq", ".gr", ".grainger", ".graphics", ".gratis", ".green", ".gripe", ".grocery", ".group", ".gs", ".gt", ".gu", ".guardian", ".gucci", ".guge", ".guide", ".guitars", ".guru", ".gw", ".gy", ".hair", ".hamburg", ".hangout", ".haus", ".hbo", ".hdfc", ".hdfcbank", ".health", ".healthcare", ".help", ".helsinki", ".here", ".hermes", ".hgtv", ".hiphop", ".hisamitsu", ".hitachi", ".hiv", ".hk", ".hkt", ".hm", ".hn", ".hockey", ".holdings", ".holiday", ".homedepot", ".homegoods", ".homes", ".homesense", ".honda", ".honeywell", ".horse", ".hospital", ".host", ".hosting", ".hot", ".hoteles", ".hotels", ".hotmail", ".house", ".how", ".hr", ".hsbc", ".ht", ".htc", ".hu", ".hughes", ".hyatt", ".hyundai", ".ibm", ".icbc", ".ice", ".icu", ".id", ".ie", ".ieee", ".ifm", ".iinet", ".ikano", ".il", ".im", ".imamat", ".imdb", ".immo", ".immobilien", ".in", ".inc", ".industries", ".infiniti", ".info", ".ing", ".ink", ".institute", ".insurance", ".insure", ".int", ".intel", ".international", ".intuit", ".investments", ".io", ".ipiranga", ".iq", ".ir", ".irish", ".is", ".iselect", ".ismaili", ".ist", ".istanbul", ".it", ".itau", ".itv", ".iveco", ".iwc", ".jaguar", ".java", ".jcb", ".jcp", ".je", ".jeep", ".jetzt", ".jewelry", ".jio", ".jlc", ".jll", ".jm", ".jmp", ".jnj", ".jo", ".jobs", ".joburg", ".jot", ".joy", ".jp", ".jpmorgan", ".jprs", ".juegos", ".juniper", ".kaufen", ".kddi", ".ke", ".kerryhotels", ".kerrylogistics", ".kerryproperties", ".kfh", ".kg", ".kh", ".ki", ".kia", ".kids", ".kim", ".kinder", ".kindle", ".kitchen", ".kiwi", ".km", ".kn", ".koeln", ".komatsu", ".kosher", ".kp", ".kpmg", ".kpn", ".kr", ".krd", ".kred", ".kuokgroup", ".kw", ".ky", ".kyoto", ".kz", ".la", ".lacaixa", ".ladbrokes", ".lamborghini", ".lamer", ".lancaster", ".lancia", ".lancome", ".land", ".landrover", ".lanxess", ".lasalle", ".lat", ".latino", ".latrobe", ".law", ".lawyer", ".lb", ".lc", ".lds", ".lease", ".leclerc", ".lefrak", ".legal", ".lego", ".lexus", ".lgbt", ".li", ".liaison", ".lidl", ".life", ".lifeinsurance", ".lifestyle", ".lighting", ".like", ".lilly", ".limited", ".limo", ".lincoln", ".linde", ".link", ".lipsy", ".live", ".living", ".lixil", ".lk", ".llc", ".llp", ".loan", ".loans", ".locker", ".locus", ".loft", ".lol", ".london", ".lotte", ".lotto", ".love", ".lpl", ".lplfinancial", ".lr", ".ls", ".lt", ".ltd", ".ltda", ".lu", ".lundbeck", ".lupin", ".luxe", ".luxury", ".lv", ".ly", ".ma", ".macys", ".madrid", ".maif", ".maison", ".makeup", ".man", ".management", ".mango", ".map", ".market", ".marketing", ".markets", ".marriott", ".marshalls", ".maserati", ".mattel", ".mba", ".mc", ".mcd", ".mcdonalds", ".mckinsey", ".md", ".me", ".med", ".media", ".meet", ".melbourne", ".meme", ".memorial", ".men", ".menu", ".meo", ".merckmsd", ".metlife", ".mf", ".mg", ".mh", ".miami", ".microsoft", ".mil", ".mini", ".mint", ".mit", ".mitsubishi", ".mk", ".ml", ".mlb", ".mls", ".mm", ".mma", ".mn", ".mo", ".mobi", ".mobile", ".mobily", ".moda", ".moe", ".moi", ".mom", ".monash", ".money", ".monster", ".montblanc", ".mopar", ".mormon", ".mortgage", ".moscow", ".moto", ".motorcycles", ".mov", ".movie", ".movistar", ".mp", ".mq", ".mr", ".ms", ".msd", ".mt", ".mtn", ".mtpc", ".mtr", ".mu", ".museum", ".music", ".mutual", ".mutuelle", ".mv", ".mw", ".mx", ".my", ".mz", ".na", ".nab", ".nadex", ".nagoya", ".name", ".nationwide", ".natura", ".navy", ".nba", ".nc", ".ne", ".nec", ".net", ".netbank", ".netflix", ".network", ".neustar", ".new", ".newholland", ".news", ".next", ".nextdirect", ".nexus", ".nf", ".nfl", ".ng", ".ngo", ".nhk", ".ni", ".nico", ".nike", ".nikon", ".ninja", ".nissan", ".nissay", ".nl", ".no", ".nokia", ".northwesternmutual", ".norton", ".now", ".nowruz", ".nowtv", ".np", ".nr", ".nra", ".nrw", ".ntt", ".nu", ".nyc", ".nz", ".obi", ".observer", ".off", ".office", ".okinawa", ".olayan", ".olayangroup", ".oldnavy", ".ollo", ".om", ".omega", ".one", ".ong", ".onl", ".online", ".onyourside", ".ooo", ".open", ".oracle", ".orange", ".org", ".organic", ".orientexpress", ".origins", ".osaka", ".otsuka", ".ott", ".ovh", ".pa", ".page", ".pamperedchef", ".panasonic", ".panerai", ".paris", ".pars", ".partners", ".parts", ".party", ".passagens", ".pay", ".pccw", ".pe", ".pet", ".pf", ".pfizer", ".pg", ".ph", ".pharmacy", ".phd", ".philips", ".phone", ".photo", ".photography", ".photos", ".physio", ".piaget", ".pics", ".pictet", ".pictures", ".pid", ".pin", ".ping", ".pink", ".pioneer", ".pizza", ".pk", ".pl", ".place", ".play", ".playstation", ".plumbing", ".plus", ".pm", ".pn", ".pnc", ".pohl", ".poker", ".politie", ".porn", ".post", ".pr", ".pramerica", ".praxi", ".press", ".prime", ".pro", ".prod", ".productions", ".prof", ".progressive", ".promo", ".properties", ".property", ".protection", ".pru", ".prudential", ".ps", ".pt", ".pub", ".pw", ".pwc", ".py", ".qa", ".qpon", ".quebec", ".quest", ".qvc", ".racing", ".radio", ".raid", ".re", ".read", ".realestate", ".realtor", ".realty", ".recipes", ".red", ".redstone", ".redumbrella", ".rehab", ".reise", ".reisen", ".reit", ".reliance", ".ren", ".rent", ".rentals", ".repair", ".report", ".republican", ".rest", ".restaurant", ".review", ".reviews", ".rexroth", ".rich", ".richardli", ".ricoh", ".rightathome", ".ril", ".rio", ".rip", ".rmit", ".ro", ".rocher", ".rocks", ".rodeo", ".rogers", ".room", ".rs", ".rsvp", ".ru", ".rugby", ".ruhr", ".run", ".rw", ".rwe", ".ryukyu", ".sa", ".saarland", ".safe", ".safety", ".sakura", ".sale", ".salon", ".samsclub", ".samsung", ".sandvik", ".sandvikcoromant", ".sanofi", ".sap", ".sapo", ".sarl", ".sas", ".save", ".saxo", ".sb", ".sbi", ".sbs", ".sc", ".sca", ".scb", ".schaeffler", ".schmidt", ".scholarships", ".school", ".schule", ".schwarz", ".science", ".scjohnson", ".scor", ".scot", ".sd", ".se", ".search", ".seat", ".secure", ".security", ".seek", ".select", ".sener", ".services", ".ses", ".seven", ".sew", ".sex", ".sexy", ".sfr", ".sg", ".sh", ".shangrila", ".sharp", ".shaw", ".shell", ".shia", ".shiksha", ".shoes", ".shop", ".shopping", ".shouji", ".show", ".showtime", ".shriram", ".si", ".silk", ".sina", ".singles", ".site", ".sj", ".sk", ".ski", ".skin", ".sky", ".skype", ".sl", ".sling", ".sm", ".smart", ".smile", ".sn", ".sncf", ".so", ".soccer", ".social", ".softbank", ".software", ".sohu", ".solar", ".solutions", ".song", ".sony", ".soy", ".spa", ".space", ".spiegel", ".sport", ".spot", ".spreadbetting", ".sr", ".srl", ".srt", ".ss", ".st", ".stada", ".staples", ".star", ".starhub", ".statebank", ".statefarm", ".statoil", ".stc", ".stcgroup", ".stockholm", ".storage", ".store", ".stream", ".studio", ".study", ".style", ".su", ".sucks", ".supplies", ".supply", ".support", ".surf", ".surgery", ".suzuki", ".sv", ".swatch", ".swiftcover", ".swiss", ".sx", ".sy", ".sydney", ".symantec", ".systems", ".sz", ".tab", ".taipei", ".talk", ".taobao", ".target", ".tatamotors", ".tatar", ".tattoo", ".tax", ".taxi", ".tc", ".tci", ".td", ".tdk", ".team", ".tech", ".technology", ".tel", ".telecity", ".telefonica", ".temasek", ".tennis", ".teva", ".tf", ".tg", ".th", ".thd", ".theater", ".theatre", ".tiaa", ".tickets", ".tienda", ".tiffany", ".tips", ".tires", ".tirol", ".tj", ".tjmaxx", ".tjx", ".tk", ".tkmaxx", ".tl", ".tm", ".tmall", ".tn", ".to", ".today", ".tokyo", ".tools", ".top", ".toray", ".toshiba", ".total", ".tours", ".town", ".toyota", ".toys", ".tp", ".tr", ".trade", ".trading", ".training", ".travel", ".travelchannel", ".travelers", ".travelersinsurance", ".trust", ".trv", ".tt", ".tube", ".tui", ".tunes", ".tushu", ".tv", ".tvs", ".tw", ".tz", ".ua", ".ubank", ".ubs", ".uconnect", ".ug", ".uk", ".um", ".unicom", ".university", ".uno", ".uol", ".ups", ".us", ".uy", ".uz", ".va", ".vacations", ".vana", ".vanguard", ".vc", ".ve", ".vegas", ".ventures", ".verisign", ".versicherung", ".vet", ".vg", ".vi", ".viajes", ".video", ".vig", ".viking", ".villas", ".vin", ".vip", ".virgin", ".visa", ".vision", ".vista", ".vistaprint", ".viva", ".vivo", ".vlaanderen", ".vn", ".vodka", ".volkswagen", ".volvo", ".vote", ".voting", ".voto", ".voyage", ".vu", ".vuelos", ".wales", ".walmart", ".walter", ".wang", ".wanggou", ".warman", ".watch", ".watches", ".weather", ".weatherchannel", ".webcam", ".weber", ".website", ".wed", ".wedding", ".weibo", ".weir", ".wf", ".whoswho", ".wien", ".wiki", ".williamhill", ".win", ".windows", ".wine", ".winners", ".wme", ".wolterskluwer", ".woodside", ".work", ".works", ".world", ".wow", ".ws", ".wtc", ".wtf", ".xbox", ".xerox", ".xfinity", ".xihuan", ".xin", ".测试", ".कॉम", ".परीक्षा", ".セール", ".佛山", ".ಭಾರತ", ".慈善", ".集团", ".在线", ".한국", ".ଭାରତ", ".大众汽车", ".点看", ".คอม", ".ভাৰত", ".ভারত", ".八卦", "‏.ישראל‎", "‏.موقع‎", ".বাংলা", ".公益", ".公司", ".香格里拉", ".网站", ".移动", ".我爱你", ".москва", ".испытание", ".қаз", ".католик", ".онлайн", ".сайт", ".联通", ".срб", ".бг", ".бел", "‏.קום‎", ".时尚", ".微博", ".테스트", ".淡马锡", ".ファッション", ".орг", ".नेट", ".ストア", ".アマゾン", ".삼성", ".சிங்கப்பூர்", ".商标", ".商店", ".商城", ".дети", ".мкд", "‏.טעסט‎", ".ею", ".ポイント", ".新闻", ".工行", ".家電", "‏.كوم‎", ".中文网", ".中信", ".中国", ".中國", ".娱乐", ".谷歌", ".భారత్", ".ලංකා", ".電訊盈科", ".购物", ".測試", ".クラウド", ".ભારત", ".通販", ".भारतम्", ".भारत", ".भारोत", "‏.آزمایشی‎", ".பரிட்சை", ".网店", ".संगठन", ".餐厅", ".网络", ".ком", ".укр", ".香港", ".亚马逊", ".诺基亚", ".食品", ".δοκιμή", ".飞利浦", "‏.إختبار‎", ".台湾", ".台灣", ".手表", ".手机", ".мон", "‏.الجزائر‎", "‏.عمان‎", "‏.ارامكو‎", "‏.ایران‎", "‏.العليان‎", "‏.اتصالات‎", "‏.امارات‎", "‏.بازار‎", "‏.موريتانيا‎", "‏.پاکستان‎", "‏.الاردن‎", "‏.موبايلي‎", "‏.بارت‎", "‏.بھارت‎", "‏.المغرب‎", "‏.ابوظبي‎", "‏.البحرين‎", "‏.السعودية‎", "‏.ڀارت‎", "‏.كاثوليك‎", "‏.سودان‎", "‏.همراه‎", "‏.عراق‎", "‏.مليسيا‎", ".澳門", ".닷컴", ".政府", "‏.شبكة‎", "‏.بيتك‎", "‏.عرب‎", ".გე", ".机构", ".组织机构", ".健康", ".ไทย", "‏.سورية‎", ".招聘", ".рус", ".рф", ".珠宝", "‏.تونس‎", ".大拿", ".ລາວ", ".みんな", ".グーグル", ".ευ", ".ελ", ".世界", ".書籍", ".ഭാരതം", ".ਭਾਰਤ", ".网址", ".닷넷", ".コム", ".天主教", ".游戏", ".vermögensberater", ".vermögensberatung", ".企业", ".信息", ".嘉里大酒店", ".嘉里", "‏.مصر‎", "‏.قطر‎", ".广东", ".இலங்கை", ".இந்தியா", ".հայ", ".新加坡", "‏.فلسطين‎", ".テスト", ".政务", ".xperia", ".xxx", ".xyz", ".yachts", ".yahoo", ".yamaxun", ".yandex", ".ye", ".yodobashi", ".yoga", ".yokohama", ".you", ".youtube", ".yt", ".yun", ".za", ".zappos", ".zara", ".zero", ".zip", ".zippo", ".zm", ".zone", ".zuerich", ".zw"];
var validURLEndCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/?#=-_';
var convertURLtoHTML = function convertURLtoHTML(str) {
  var result = str;
  var lastStart = 0;
  ALL_DOMAIN_ROOT.forEach(function (domain) {
    if (lastStart >= result.length) {
      return;
    }

    var index = result.toLowerCase().indexOf(domain, lastStart);

    var _loop = function _loop() {
      if (index < 0) {
        return "break";
      }

      var end = -1;
      var resultLength = result.length;

      for (var i = index; i < resultLength; i++) {
        if (result[i] && result[i].trim() === '') {
          end = i;
          break;
        }
      }

      if (end < 0) {
        end = result.indexOf('\n', index);
      }

      if (end < 0) {
        end = result.length;
      }

      if (end > 0 && !validURLEndCharacter.includes(result[end - 1])) {
        end = end - 1;
      }

      var start = 0;

      for (var _i = index - 1; _i >= 0; _i--) {
        if (result[_i] && result[_i].trim() === '' || result[_i] === '\n') {
          start = _i + 1;
          break;
        }
      }

      if (!validURLEndCharacter.includes(result[start])) {
        start = start + 1;
      }

      var url = result.substring(start, end);

      var href = function () {
        if (url.startsWith('https://') || url.startsWith('http://')) {
          return url;
        }

        return 'https://' + url;
      }();

      var html = "<a href=\"".concat(href, "\" target=\"_blank\">").concat(url, "</a>");
      result = replaceAfterIndex(result, url, html, lastStart);
      lastStart = start + html.length;

      if (start + html.length >= result.length) {
        return "break";
      } else {
        index = result.toLowerCase().indexOf(domain, start + html.length);
      }
    };

    while (true) {
      var _ret = _loop();

      if (_ret === "break") break;
    }
  });
  return result;
};

var escapeHTML = function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};
var replaceCaseInsensitive = function replaceCaseInsensitive(str, toReplace, replaceTo) {
  var pos = str.toLowerCase().indexOf(toReplace.toLowerCase());
  return pos === -1 ? str : str.substr(0, pos) + replaceTo + str.substr(pos + toReplace.length);
};
var replaceCaseInsensitiveAll = function replaceCaseInsensitiveAll(str, toReplace, replaceTo) {
  var pos = str.length;
  var result = str;

  do {
    pos = result.toLowerCase().lastIndexOf(toReplace.toLowerCase(), pos - 1);

    if (pos >= 0) {
      result = result.substr(0, pos) + replaceTo + result.substr(pos + toReplace.length);
    }
  } while (pos > 0);

  return result;
};
var splitTextMessage = function splitTextMessage(string) {
  return string.split(/\r?\n/).filter(function (item) {
    return item;
  });
};

var handleMessageByCode = function handleMessageByCode(code, message, text, url) {
  var result = "";
  var copy = message.replaceAll('\n', '<br>');
  var index = 0;
  var startIndex = copy.indexOf(code + text, index);

  if (startIndex < 0) {
    startIndex = copy.indexOf(code.toLowerCase() + text, index);
  }

  if (startIndex >= 0) {
    result += copy.substring(0, startIndex);
    var tagLength = (code + text).length;
    result += "<span style=\"color: #161FF4\">".concat(copy.substring(startIndex, startIndex + tagLength), "</span>");
    index = startIndex + tagLength;
  }

  if (index === 0) {
    startIndex = copy.indexOf(url);

    if (startIndex >= 0) {
      result += copy.substring(0, startIndex);
      var _tagLength = url.length;
      result += "<span style=\"color: #161FF4\">".concat(copy.substring(startIndex, startIndex + _tagLength), "</span>");
      index = startIndex + _tagLength;
    }
  }

  result += copy.substring(index); // const regex = emojiRegex();
  // const matchs = result.matchAll(regex);
  // for(const match of matchs){
  //     const emoji = match[0];
  //     result = result.replace(emoji, `${emojiHtml(emoji)}`)
  // }

  return result;
};

var messageObjToHTML = function messageObjToHTML(message, selectedTagItem) {
  var copy = escapeHTML(message).replaceAll('\n', '<br>');
  var result = copy; // let index = 0;

  if (selectedTagItem) {
    var tag = selectedTagItem.tag,
        item = selectedTagItem.item;

    switch (tag.code) {
      case TagCode.SP:
        {
          result = handleMessageByCode(tag.code, message, item.product.name, productUrl(item.skuItem));
          break;
        }

      case TagCode.DH:
        {
          result = handleMessageByCode(tag.code, message, (item.orderId || item.orderID).toString(), orderUrl(item));
          break;
        }

      case TagCode.HOTRO:
        {
          result = handleMessageByCode(tag.code, message, item.code.toString(), ticketUrl(item));
          break;
        }
    }
  } // const regex = emojiRegex();
  // const matchs = result.matchAll(regex);
  // for(const match of matchs){
  //     const emoji = match[0];
  //     result = result.replace(emoji, `${emojiHtml(emoji)}`)
  // }


  return result;
};
function numberFormatDotSeperated() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    isPrefix: false,
    unit: "đ"
  };

  // remove sign if negative
  if (!val) {
    val = 0;
  }

  var sign = 1;

  if (val < 0) {
    sign = -1;
    val = -val;
  } // trim the number decimal point if it exists


  var num = val.toString().includes('.') ? val.toString().split('.')[0] : val.toString();
  var len = num.toString().length;
  var result = '';
  var count = 1;

  for (var i = len - 1; i >= 0; i--) {
    result = num.toString()[i] + result;

    if (count % 3 === 0 && count !== 0 && i !== 0) {
      result = ',' + result;
    }

    count++;
  } // add number after decimal point


  if (val.toString().includes('.')) {
    result = result + '.' + val.toString().split('.')[1];
  }

  if (currency.isPrefix) {
    result = currency.unit + result;
  } else {
    result = result + currency.unit;
  } // return result with - sign if negative


  return sign < 0 ? '-' + result : result;
}
var getDisplayContentMessage = function getDisplayContentMessage(message) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var result = escapeHTML(message.content || "");

  if (!option.disabledLink) {
    result = convertURLtoHTML(result);
  }

  return result;
};
var insertToString = function insertToString(source, index, str) {
  return source.slice(0, index) + str + source.slice(index);
};
var replaceAfterIndex = function replaceAfterIndex(str, toReplace, replaceTo, index) {
  var pos = str.toLowerCase().indexOf(toReplace.toLowerCase(), index);
  return pos === -1 ? str : str.substr(0, pos) + replaceTo + str.substr(pos + toReplace.length);
};

var img$i = "data:image/png;base64,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";

var _path$6, _path2$2;
function _extends$7() { _extends$7 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }
var SvgCreateTicket = function SvgCreateTicket(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$7({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$6 || (_path$6 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M7.883 8.679a.355.355 0 0 0 .361.37h1.238c.207 0 .372-.169.399-.374.134-.985.81-1.702 2.012-1.702 1.03 0 1.971.515 1.971 1.753 0 .952-.56 1.39-1.447 2.056-1.01.733-1.809 1.59-1.752 2.98l.005.326a.375.375 0 0 0 .374.369h1.217a.375.375 0 0 0 .375-.375v-.158c0-1.076.41-1.39 1.515-2.229.914-.694 1.866-1.465 1.866-3.084 0-2.266-1.914-3.361-4.01-3.361-1.9 0-3.982.885-4.124 3.429Zm2.335 8.644c0 .8.637 1.391 1.515 1.391.913 0 1.542-.591 1.542-1.39 0-.829-.63-1.41-1.543-1.41-.877 0-1.514.582-1.514 1.41ZM19 23a4 4 0 0 0 3.69-5.547c-.23.45-.49.888-.776 1.308a.375.375 0 0 1-.289.614h-.159a12.014 12.014 0 0 1-2.091 2.091v.159a.375.375 0 0 1-.614.29c-.42.286-.857.545-1.308.775.476.2.998.31 1.547.31Z",
    fill: "#757575"
  })), _path2$2 || (_path2$2 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 22.5a10.5 10.5 0 1 1 10.05-7.462c.453.35.845.774 1.155 1.256a11.997 11.997 0 0 0-2.72-12.78 12 12 0 1 0-4.19 19.691 5.026 5.026 0 0 1-1.257-1.154c-.976.295-2 .449-3.038.449Zm9.691-6.46c.428.39.771.871.999 1.413-.23.45-.49.888-.776 1.308a.375.375 0 0 0-.29-.136h-2.249v-2.25a.375.375 0 0 0-.75 0v2.25h-2.25a.375.375 0 0 0 0 .75h2.25v2.25a.375.375 0 0 0 .136.29c-.42.286-.857.545-1.308.775A4.01 4.01 0 0 1 15 19a4 4 0 0 1 6.691-2.96Zm-.225 3.335h-2.091v2.091a12.014 12.014 0 0 0 2.091-2.091Z",
    fill: "#757575"
  })));
};

var css_248z$f = ".style-module_title__-yCd2 {\n  font-size: 14px;\n  font-weight: bold;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.style-module_product-name__H0xsG {\n  display: block;\n  font-size: 14px;\n  font-weight: bold;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  cursor: pointer;\n  color: rgba(0, 0, 0, 0.87);\n  text-decoration: none;\n}\n.style-module_product-name__H0xsG:hover {\n  text-decoration: underline;\n}\n\n.style-module_uppercase__aWQyn {\n  text-transform: uppercase;\n}\n\n.style-module_product-label__dhtmZ {\n  font-weight: bold;\n}\n\n.style-module_product_tag__b3PRJ {\n  width: 15px !important;\n  height: 15px !important;\n  margin-right: 4px !important;\n  display: flex;\n  align-items: center;\n}\n\n.style-module_product_tag_image__aSl9C {\n  width: 15px !important;\n  height: 15px !important;\n}\n\n.style-module_product_tag_addition_item__imbTV {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #09884d;\n  border-radius: 50%;\n  background-color: #f2f4fd;\n  font-weight: 500;\n  font-size: 12px;\n  height: 15px;\n  width: 15px;\n  cursor: pointer;\n}\n\n.style-module_product_tag_addition_item__imbTV:hover {\n  opacity: 0.5;\n}\n\n.style-module_product_tag_addition__3DT6j {\n  border-radius: 50%;\n  font-weight: 500;\n  font-size: 12px;\n  display: inline-flex;\n  align-items: center;\n  line-height: 15px;\n  vertical-align: top;\n  cursor: pointer;\n  padding: 4px 8px;\n  height: 15px;\n  padding: 4px 12.5px;\n}\n\n.style-module_product_tag_name__qWXeS {\n  font-size: 10px !important;\n  line-height: 15px !important;\n  text-transform: capitalize !important;\n  font-weight: 400 !important;\n  padding-left: 3px !important;\n  padding-right: 3px !important;\n}\n\n.style-module_product_tag_name_block__rsJkp {\n  height: 15px !important;\n  margin-right: 4px !important;\n  border-radius: 3px !important;\n}\n\n.style-module_content__tF0L6 {\n  font-size: 13px;\n  line-height: 18px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  font-weight: 400;\n  color: #000;\n}\n\n.style-module_label__jjDbI {\n  color: #676565;\n}\n\n.style-module_ellipsis__M3tQN {\n  white-space: normal !important;\n  max-width: 270px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n\n.style-module_url__kRYcw {\n  color: #161FF4;\n  display: block;\n  margin-top: 0.3rem;\n  text-decoration: underline;\n}\n\n.style-module_original-price__l4JzQ {\n  font-size: 0.7rem;\n  color: #676565;\n  text-decoration: line-through;\n}\n\n.style-module_percentage-discount__Kjyhy {\n  font-size: 13px;\n  color: #DC3545;\n  font-weight: 600;\n}\n\n.style-module_image-viewer__p7FMd {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 70%;\n  width: 940px;\n  height: 651px;\n  padding: 3rem;\n  border-radius: 10px !important;\n  outline: none;\n}\n.style-module_image-viewer__p7FMd .style-module_image-wrapper__klZHx {\n  width: 72%;\n  height: 100%;\n  outline: 1px solid #dcdbdb;\n  border-radius: 8px;\n  position: relative;\n}\n.style-module_image-viewer__p7FMd .style-module_image-wrapper__klZHx .style-module_nav-left-button__vctTR {\n  position: absolute;\n  left: 0;\n  top: 50%;\n  font-size: 2rem;\n  transform: translate(-50%, -50%);\n  color: #AAA;\n  background-color: #fff;\n  border: 1px solid #dcdbdb;\n}\n.style-module_image-viewer__p7FMd .style-module_image-wrapper__klZHx .style-module_nav-left-button__vctTR:hover {\n  background-color: #f0f0f0;\n}\n.style-module_image-viewer__p7FMd .style-module_image-wrapper__klZHx .style-module_nav-right-button__bsDvQ {\n  position: absolute;\n  right: 0;\n  top: 50%;\n  font-size: 2rem;\n  transform: translate(50%, -50%) rotate(180deg);\n  color: #AAA;\n  background-color: #fff;\n  border: 1px solid #dcdbdb;\n}\n.style-module_image-viewer__p7FMd .style-module_image-wrapper__klZHx .style-module_nav-right-button__bsDvQ:hover {\n  background-color: #f0f0f0;\n}\n.style-module_image-viewer__p7FMd .style-module_right-nav__9Ai-k {\n  padding: 4px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.style-module_image-viewer__p7FMd .style-module_right-nav__9Ai-k .style-module_modal-title__T2ZK4 {\n  font-size: 1.1rem;\n  word-break: break-word;\n  margin-top: 0;\n  margin-bottom: 12px;\n  width: 0;\n  min-width: 100%;\n}\n.style-module_image-viewer__p7FMd .style-module_right-nav__9Ai-k .style-module_image-button__5iYCu {\n  width: 64px;\n  height: 64px;\n  padding: 8px;\n  border: 1px solid #dcdbdb;\n  border-radius: 8px;\n}\n.style-module_image-viewer__p7FMd .style-module_right-nav__9Ai-k .style-module_image-button__5iYCu:hover {\n  border: 1px solid #2cd888;\n}\n\n.style-module_image__-iunX {\n  height: 100%;\n  width: 100%;\n  object-fit: contain;\n}\n\n.style-module_discount-code__NAWYg {\n  color: #DC3545;\n}\n\n.style-module_seller-image__LujZP {\n  width: 14px;\n  height: 16px;\n  padding-top: 4px;\n  display: inherit;\n}";
var style$e = {"title":"style-module_title__-yCd2","product-name":"style-module_product-name__H0xsG","uppercase":"style-module_uppercase__aWQyn","product-label":"style-module_product-label__dhtmZ","product_tag":"style-module_product_tag__b3PRJ","product_tag_image":"style-module_product_tag_image__aSl9C","product_tag_addition_item":"style-module_product_tag_addition_item__imbTV","product_tag_addition":"style-module_product_tag_addition__3DT6j","product_tag_name":"style-module_product_tag_name__qWXeS","product_tag_name_block":"style-module_product_tag_name_block__rsJkp","content":"style-module_content__tF0L6","label":"style-module_label__jjDbI","ellipsis":"style-module_ellipsis__M3tQN","url":"style-module_url__kRYcw","original-price":"style-module_original-price__l4JzQ","percentage-discount":"style-module_percentage-discount__Kjyhy","image-viewer":"style-module_image-viewer__p7FMd","image-wrapper":"style-module_image-wrapper__klZHx","nav-left-button":"style-module_nav-left-button__vctTR","nav-right-button":"style-module_nav-right-button__bsDvQ","right-nav":"style-module_right-nav__9Ai-k","modal-title":"style-module_modal-title__T2ZK4","image-button":"style-module_image-button__5iYCu","image":"style-module_image__-iunX","discount-code":"style-module_discount-code__NAWYg","seller-image":"style-module_seller-image__LujZP"};
styleInject(css_248z$f);

var ProductImageModal = function ProductImageModal(_ref) {
  var skuInfo = _ref.skuInfo,
      open = _ref.open,
      handleCloseModal = _ref.handleCloseModal;

  var _useState = React.useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      selectedImgIdx = _useState2[0],
      setSelectedImgIdx = _useState2[1];

  return /*#__PURE__*/jsxRuntime.jsx(Modal__default["default"], {
    open: open,
    onClose: handleCloseModal,
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    sx: {
      "& .MuiBackdrop-root": {
        backgroundColor: "rgba(0, 0, 0, 0.3)"
      }
    },
    children: /*#__PURE__*/jsxRuntime.jsxs(Paper__default["default"], {
      variant: "outlined",
      elevation: 0,
      className: style$e["image-viewer"],
      children: [/*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
        onClick: handleCloseModal,
        sx: {
          position: "absolute",
          top: "1rem",
          right: "1rem",
          color: "#AAA"
        },
        children: /*#__PURE__*/jsxRuntime.jsx(CloseIcon__default["default"], {})
      }), /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
        direction: "row",
        alignItems: "start",
        spacing: 3,
        sx: {
          height: "100%"
        },
        children: [/*#__PURE__*/jsxRuntime.jsxs("div", {
          className: style$e["image-wrapper"],
          children: [/*#__PURE__*/jsxRuntime.jsx("img", {
            className: style$e["image"],
            src: getImageProxy(skuInfo.imageUrls[selectedImgIdx]),
            alt: skuInfo.name,
            loading: "lazy"
          }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
            className: style$e["nav-left-button"],
            onClick: function onClick(e) {
              setSelectedImgIdx(function (prev) {
                return (prev - 1 + skuInfo.imageUrls.length) % skuInfo.imageUrls.length;
              });
            },
            children: /*#__PURE__*/jsxRuntime.jsx(NavigateBeforeIcon__default["default"], {})
          }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
            className: style$e["nav-right-button"],
            onClick: function onClick(e) {
              setSelectedImgIdx(function (prev) {
                return (prev + 1) % skuInfo.imageUrls.length;
              });
            },
            children: /*#__PURE__*/jsxRuntime.jsx(NavigateBeforeIcon__default["default"], {})
          })]
        }), /*#__PURE__*/jsxRuntime.jsxs("div", {
          className: style$e["right-nav"],
          children: [/*#__PURE__*/jsxRuntime.jsx("h2", {
            className: style$e["modal-title"],
            children: skuInfo.name
          }), /*#__PURE__*/jsxRuntime.jsx(ImageList__default["default"], {
            cols: 3,
            gap: 8,
            children: skuInfo.imageUrls.map(function (url, index) {
              return /*#__PURE__*/jsxRuntime.jsx(ImageListItem__default["default"], {
                children: /*#__PURE__*/jsxRuntime.jsx(ButtonBase__default["default"], {
                  className: style$e["image-button"],
                  onClick: function onClick() {
                    return setSelectedImgIdx(index);
                  },
                  sx: _objectSpread2({}, selectedImgIdx === index && {
                    background: "#edfdf6!important",
                    border: "1px solid #2cd888!important"
                  }),
                  children: /*#__PURE__*/jsxRuntime.jsx("img", {
                    className: style$e["image"],
                    loading: "lazy",
                    src: getImageProxy(url),
                    alt: skuInfo.name,
                    style: {
                      width: "42px",
                      height: "42px"
                    }
                  })
                })
              }, index);
            })
          })]
        })]
      })]
    })
  });
};

var img$h = "data:image/svg+xml,%3csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.02864 0.323923C5.11747 0.126945 5.31567 0 5.53438 0C6.1215 0 6.68458 0.229868 7.09974 0.639036C7.5149 1.0482 7.74813 1.60315 7.74813 2.18181V3.81816H10.3243C10.5638 3.81598 10.801 3.86489 11.0195 3.96155C11.2391 4.05868 11.4346 4.2017 11.5926 4.3807C11.7505 4.5597 11.8671 4.77041 11.9342 4.99821C12.0013 5.22602 12.0173 5.46548 11.9812 5.7L11.2175 10.609C11.2174 10.6091 11.2174 10.6093 11.2174 10.6094C11.1573 10.9994 10.9562 11.3549 10.6512 11.6104C10.347 11.8653 9.95975 12.0036 9.56054 11.9999H1.66031C1.21997 11.9999 0.797664 11.8275 0.486295 11.5207C0.174925 11.2138 0 10.7976 0 10.3636V6.54542C0 6.11143 0.174925 5.69522 0.486295 5.38834C0.797664 5.08146 1.21997 4.90906 1.66031 4.90906H2.96096L5.02864 0.323923ZM3.87407 5.57027L5.87078 1.1425C6.03757 1.19495 6.19096 1.28614 6.31706 1.41042C6.52464 1.615 6.64126 1.89248 6.64126 2.18181V4.36361C6.64126 4.66486 6.88904 4.90906 7.19469 4.90906H10.3272L10.3334 4.90903C10.4136 4.90813 10.4931 4.92444 10.5663 4.95681C10.6395 4.98919 10.7047 5.03686 10.7573 5.09653C10.81 5.1562 10.8488 5.22643 10.8712 5.30237C10.8935 5.37823 10.8989 5.45797 10.8869 5.53608C10.8869 5.53601 10.8869 5.53615 10.8869 5.53608L10.1231 10.4454C10.1031 10.5755 10.0361 10.694 9.93435 10.7792C9.83265 10.8644 9.70313 10.9105 9.56966 10.9091L9.56341 10.909H3.87407V5.57027ZM2.76719 10.909V5.99996H1.66031C1.51353 5.99996 1.37276 6.05743 1.26897 6.15972C1.16518 6.26202 1.10688 6.40075 1.10688 6.54542V10.3636C1.10688 10.5082 1.16518 10.647 1.26897 10.7493C1.37276 10.8516 1.51353 10.909 1.66031 10.909H2.76719Z' fill='%2309884D'/%3e%3c/svg%3e";

var img$g = "data:image/svg+xml,%3csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_13269_15079)'%3e%3cpath d='M11.5002 8H1.34068L1.34768 7.9925L2.46968 6.85C2.51877 6.80388 2.55804 6.74832 2.58513 6.68664C2.61221 6.62496 2.62656 6.55845 2.6273 6.49109C2.62804 6.42374 2.61516 6.35693 2.58944 6.29467C2.56372 6.23241 2.52568 6.176 2.47761 6.1288C2.42954 6.08161 2.37244 6.04462 2.30972 6.02005C2.247 5.99548 2.17996 5.98383 2.11263 5.98581C2.0453 5.98779 1.97906 6.00336 1.91789 6.03157C1.85673 6.05979 1.80189 6.10007 1.75668 6.15L0.63718 7.2885C0.55568 7.37 0.44168 7.49501 0.32518 7.62651C0.115971 7.86306 0.000488281 8.16796 0.000488281 8.48376C0.000488281 8.79955 0.115971 9.10445 0.32518 9.341C0.44168 9.472 0.55568 9.597 0.63418 9.676L1.75668 10.818C1.85078 10.9064 1.97543 10.955 2.10453 10.9536C2.23364 10.9521 2.35719 10.9008 2.44932 10.8104C2.54145 10.7199 2.59502 10.5973 2.59882 10.4683C2.60261 10.3392 2.55634 10.2137 2.46968 10.118L1.37218 9H11.5002C11.6328 9 11.76 8.94733 11.8537 8.85356C11.9475 8.75979 12.0002 8.63261 12.0002 8.5C12.0002 8.3674 11.9475 8.24022 11.8537 8.14645C11.76 8.05268 11.6328 8 11.5002 8Z' fill='%2309884D'/%3e%3cpath d='M0.5 4H10.6275L9.5305 5.1165C9.48141 5.16262 9.44214 5.21819 9.41505 5.27986C9.38797 5.34154 9.37362 5.40805 9.37288 5.47541C9.37214 5.54276 9.38502 5.60957 9.41074 5.67183C9.43646 5.73409 9.4745 5.7905 9.52257 5.8377C9.57063 5.88489 9.62774 5.92188 9.69046 5.94645C9.75318 5.97102 9.82022 5.98267 9.88755 5.98069C9.95488 5.97871 10.0211 5.96314 10.0823 5.93493C10.1435 5.90671 10.1983 5.86643 10.2435 5.8165L11.363 4.677C11.4445 4.5955 11.5585 4.4705 11.675 4.3395C11.8842 4.10294 11.9997 3.79804 11.9997 3.48225C11.9997 3.16645 11.8842 2.86155 11.675 2.625C11.5585 2.4935 11.4445 2.3685 11.366 2.29L10.2435 1.15C10.1494 1.06159 10.0248 1.01301 9.89565 1.01443C9.76654 1.01585 9.64299 1.06716 9.55086 1.15761C9.45873 1.24807 9.40516 1.37065 9.40136 1.49971C9.39757 1.62876 9.44384 1.75429 9.5305 1.85L10.656 2.995L10.66 3H0.5C0.367392 3 0.240215 3.05267 0.146447 3.14644C0.0526784 3.24021 0 3.36739 0 3.5C0 3.6326 0.0526784 3.75978 0.146447 3.85355C0.240215 3.94732 0.367392 4 0.5 4Z' fill='%2309884D'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_13269_15079'%3e%3crect width='12' height='12' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

var img$f = "data:image/svg+xml,%3csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6.00619 8.09993C5.88461 8.09993 5.77239 8.13348 5.66951 8.20061C5.57599 8.26773 5.50586 8.35882 5.4591 8.47388C5.41234 8.58895 5.40298 8.70881 5.43104 8.83346C5.4591 8.94852 5.51521 9.04921 5.59938 9.1355C5.68354 9.2218 5.78174 9.27933 5.89396 9.3081C6.01554 9.32728 6.13244 9.31289 6.24466 9.26495C6.35689 9.20742 6.44105 9.13071 6.49717 9.03482C6.56263 8.92935 6.59536 8.81428 6.59536 8.68963C6.59536 8.52662 6.53457 8.38759 6.413 8.27252C6.30077 8.15746 6.16517 8.09993 6.00619 8.09993ZM6.00619 0.00227104C5.89396 0.00227104 5.78642 0.0118596 5.68354 0.0310368C4.62677 0.059803 3.65416 0.361847 2.76573 0.937169C1.89599 1.48372 1.2133 2.21726 0.717641 3.13777C0.212634 4.07747 -0.025841 5.09387 0.00221494 6.18698C0.0396229 7.2705 0.33421 8.26773 0.885977 9.17865C1.42839 10.0608 2.14382 10.756 3.03226 11.2642C3.9581 11.782 4.94941 12.0265 6.00619 11.9977C6.11841 11.9977 6.22596 11.9881 6.32883 11.969C7.3856 11.9402 8.35821 11.6382 9.24665 11.0628C10.1164 10.5163 10.7991 9.78274 11.2947 8.86223C11.7997 7.92253 12.0335 6.91093 11.9961 5.8274C11.9681 4.73429 11.6782 3.73227 11.1264 2.82135C10.584 1.93919 9.86856 1.24401 8.98012 0.735806C8.05427 0.218016 7.06296 -0.0264952 6.00619 0.00227104ZM6.00619 10.7896C5.37025 10.7896 4.76237 10.6601 4.18255 10.4012C3.60273 10.1423 3.09304 9.78274 2.6535 9.32248C2.21396 8.85264 1.87729 8.31088 1.64349 7.6972C1.41904 7.08352 1.32084 6.45546 1.3489 5.81302C1.37696 5.16099 1.52659 4.54252 1.7978 3.95761C2.069 3.36311 2.44308 2.85011 2.92003 2.41862C2.77975 2.91723 2.75637 3.42064 2.84989 3.92884C2.94341 4.42745 3.1398 4.88292 3.43907 5.29523C3.74768 5.70755 4.12644 6.02877 4.57533 6.25889C5.02423 6.48902 5.50118 6.60409 6.00619 6.60409C6.35221 6.63285 6.67018 6.74792 6.96009 6.94928C7.25 7.14106 7.47445 7.39036 7.63343 7.6972C7.80177 8.00404 7.88593 8.33964 7.88593 8.70401C7.88593 9.05879 7.80177 9.3896 7.63343 9.69644C7.47445 10.0033 7.25 10.2574 6.96009 10.4587C6.67018 10.6505 6.35221 10.7608 6.00619 10.7896ZM9.09234 9.58138C9.23262 9.08277 9.256 8.58415 9.16248 8.08554C9.06896 7.57734 8.86789 7.11708 8.55928 6.70477C8.26001 6.29246 7.88593 5.97123 7.43704 5.74111C6.98814 5.51098 6.51119 5.39591 6.00619 5.39591C5.66016 5.36715 5.3422 5.25688 5.05228 5.0651C4.76237 4.86374 4.53325 4.60964 4.36491 4.3028C4.20593 3.99596 4.12644 3.66515 4.12644 3.31037C4.12644 2.946 4.20593 2.6104 4.36491 2.30356C4.53325 1.99672 4.76237 1.74741 5.05228 1.55564C5.3422 1.35428 5.66016 1.23921 6.00619 1.21045C6.64212 1.21045 7.25 1.33989 7.82982 1.59879C8.40965 1.85768 8.91933 2.22205 9.35887 2.6919C9.79841 3.15216 10.1304 3.68912 10.3549 4.3028C10.5887 4.91648 10.6915 5.54933 10.6635 6.20136C10.6354 6.8438 10.4858 7.46228 10.2146 8.05678C9.94337 8.64169 9.56929 9.14989 9.09234 9.58138ZM6.00619 2.70628C5.88461 2.70628 5.77239 2.73984 5.66951 2.80696C5.57599 2.87409 5.50586 2.96518 5.4591 3.08024C5.41234 3.19531 5.40298 3.31517 5.43104 3.43982C5.4591 3.55488 5.51521 3.65556 5.59938 3.74186C5.68354 3.82816 5.78174 3.88569 5.89396 3.91446C6.01554 3.93364 6.13244 3.91925 6.24466 3.87131C6.35689 3.81378 6.44105 3.73707 6.49717 3.64118C6.56263 3.53571 6.59536 3.42064 6.59536 3.29599C6.59536 3.13298 6.53457 2.99394 6.413 2.87888C6.30077 2.76381 6.16517 2.70628 6.00619 2.70628Z' fill='%2309884D'/%3e%3c/svg%3e";

var img$e = "data:image/svg+xml,%3csvg width='10' height='12' viewBox='0 0 10 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.50012 12C0.460619 12.0585 -1.16688 8.181 1.00012 6.055V2.5C1.10562 -0.8045 5.89562 -0.8 6.00012 2.5V6.055C8.16762 8.1815 6.53862 12.0585 3.50012 12ZM3.50012 1C3.10229 1 2.72076 1.15804 2.43946 1.43934C2.15815 1.72064 2.00012 2.10218 2.00012 2.5V6.2685C2.00011 6.33868 1.98532 6.40808 1.95672 6.47217C1.92812 6.53626 1.88635 6.59362 1.83412 6.6405C1.46291 6.98032 1.20247 7.42392 1.08663 7.91368C0.970798 8.40343 1.00492 8.9167 1.18458 9.38681C1.36423 9.85692 1.68111 10.2621 2.09404 10.5498C2.50698 10.8375 2.99688 10.9944 3.50012 11C4.00335 10.9944 4.49326 10.8375 4.9062 10.5498C5.31913 10.2621 5.63601 9.85692 5.81566 9.38681C5.99531 8.9167 6.02944 8.40343 5.91361 7.91368C5.79777 7.42392 5.53733 6.98032 5.16612 6.6405C5.11389 6.59362 5.07212 6.53626 5.04352 6.47217C5.01492 6.40808 5.00013 6.33868 5.00012 6.2685V2.5C5.00012 2.10218 4.84208 1.72064 4.56078 1.43934C4.27948 1.15804 3.89794 1 3.50012 1ZM3.50012 10C3.14872 9.99558 2.80997 9.86821 2.54272 9.64001C2.27546 9.41181 2.09659 9.09721 2.03717 8.75084C1.97775 8.40447 2.04153 8.04824 2.21745 7.74401C2.39336 7.43978 2.67029 7.20679 3.00012 7.0855V6C3.00012 5.86739 3.0528 5.74022 3.14657 5.64645C3.24033 5.55268 3.36751 5.5 3.50012 5.5C3.63273 5.5 3.7599 5.55268 3.85367 5.64645C3.94744 5.74022 4.00012 5.86739 4.00012 6V7.0855C4.32995 7.20679 4.60688 7.43978 4.78279 7.74401C4.95871 8.04824 5.02249 8.40447 4.96307 8.75084C4.90365 9.09721 4.72478 9.41181 4.45752 9.64001C4.19027 9.86821 3.85152 9.99558 3.50012 10ZM3.50012 8C3.36751 8 3.24033 8.05268 3.14657 8.14645C3.0528 8.24022 3.00012 8.36739 3.00012 8.5C3.00012 8.63261 3.0528 8.75979 3.14657 8.85355C3.24033 8.94732 3.36751 9 3.50012 9C3.63273 9 3.7599 8.94732 3.85367 8.85355C3.94744 8.75979 4.00012 8.63261 4.00012 8.5C4.00012 8.36739 3.94744 8.24022 3.85367 8.14645C3.7599 8.05268 3.63273 8 3.50012 8ZM8.50012 3C8.10229 3 7.72076 2.84196 7.43946 2.56066C7.15815 2.27936 7.00012 1.89783 7.00012 1.5C7.00012 1.10218 7.15815 0.720644 7.43946 0.43934C7.72076 0.158035 8.10229 0 8.50012 0C8.89794 0 9.27948 0.158035 9.56078 0.43934C9.84208 0.720644 10.0001 1.10218 10.0001 1.5C10.0001 1.89783 9.84208 2.27936 9.56078 2.56066C9.27948 2.84196 8.89794 3 8.50012 3ZM8.50012 1C8.36751 1 8.24033 1.05268 8.14657 1.14645C8.0528 1.24021 8.00012 1.36739 8.00012 1.5C8.00012 1.63261 8.0528 1.75979 8.14657 1.85355C8.24033 1.94732 8.36751 2 8.50012 2C8.63273 2 8.7599 1.94732 8.85367 1.85355C8.94744 1.75979 9.00012 1.63261 9.00012 1.5C9.00012 1.36739 8.94744 1.24021 8.85367 1.14645C8.7599 1.05268 8.63273 1 8.50012 1Z' fill='%2309884D'/%3e%3c/svg%3e";

var img$d = "data:image/svg+xml,%3csvg width='19' height='12' viewBox='0 0 19 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.19719 9.87186H3.75428C3.55516 9.87186 3.39355 9.68928 3.39355 9.46431C3.39355 9.23934 3.55516 9.05676 3.75428 9.05676H5.19719C5.39631 9.05676 5.55792 9.23934 5.55792 9.46431C5.55792 9.68928 5.39631 9.87186 5.19719 9.87186Z' fill='%2309884D' stroke='%2309884D' stroke-width='0.2'/%3e%3cpath d='M17.4081 9.87137H16.4712C16.2643 9.87137 16.0965 9.6964 16.0965 9.48081C16.0965 9.26522 16.2643 9.09024 16.4712 9.09024H17.0971L17.6023 6.28442C17.5955 4.8487 16.4188 3.62232 14.9722 3.62232H12.5115L11.319 9.09024H13.4731C13.68 9.09024 13.8479 9.26522 13.8479 9.48081C13.8479 9.6964 13.68 9.87137 13.4731 9.87137H10.8498C10.7359 9.87137 10.6279 9.81748 10.5567 9.72452C10.4855 9.63235 10.4585 9.51049 10.484 9.39488L11.8467 3.14583C11.8856 2.96695 12.037 2.84119 12.2124 2.84119H14.9722C16.8317 2.84119 18.345 4.41829 18.345 6.35628L17.7761 9.55267C17.7432 9.7378 17.5888 9.87137 17.4081 9.87137Z' fill='%2309884D' stroke='%2309884D' stroke-width='0.2'/%3e%3cpath d='M15.0055 11.4001C13.9751 11.4001 13.1362 10.5321 13.1362 9.46429C13.1362 8.39648 13.9751 7.52844 15.0055 7.52844C16.0358 7.52844 16.8747 8.39648 16.8747 9.46429C16.8747 10.5321 16.0358 11.4001 15.0055 11.4001ZM15.0055 8.30278C14.3871 8.30278 13.8839 8.82391 13.8839 9.46429C13.8839 10.1047 14.3871 10.6258 15.0055 10.6258C15.6238 10.6258 16.127 10.1047 16.127 9.46429C16.127 8.82391 15.6238 8.30278 15.0055 8.30278Z' fill='%2309884D' stroke='%2309884D' stroke-width='0.2'/%3e%3cpath d='M6.73592 11.4001C5.70561 11.4001 4.8667 10.5321 4.8667 9.46429C4.8667 8.39648 5.70561 7.52844 6.73592 7.52844C7.76624 7.52844 8.60515 8.39648 8.60515 9.46429C8.60515 10.5321 7.76624 11.4001 6.73592 11.4001ZM6.73592 8.30278C6.11758 8.30278 5.61439 8.82391 5.61439 9.46429C5.61439 10.1047 6.11758 10.6258 6.73592 10.6258C7.35426 10.6258 7.85746 10.1047 7.85746 9.46429C7.85746 8.82391 7.35426 8.30278 6.73592 8.30278Z' fill='%2309884D' stroke='%2309884D' stroke-width='0.2'/%3e%3cpath d='M5.18296 2.84163H2.1922C1.98584 2.84163 1.81836 2.68187 1.81836 2.48502C1.81836 2.28818 1.98584 2.12842 2.1922 2.12842H5.18296C5.38933 2.12842 5.55681 2.28818 5.55681 2.48502C5.55681 2.68187 5.38933 2.84163 5.18296 2.84163Z' fill='%2309884D' stroke='%2309884D' stroke-width='0.2'/%3e%3cpath d='M5.191 5.18476H1.50174C1.29809 5.18476 1.13281 5.02501 1.13281 4.82816C1.13281 4.63132 1.29809 4.47156 1.50174 4.47156H5.191C5.39464 4.47156 5.55992 4.63132 5.55992 4.82816C5.55992 5.02501 5.39464 5.18476 5.191 5.18476Z' fill='%2309884D' stroke='%2309884D' stroke-width='0.2'/%3e%3cpath d='M5.18693 7.52791H0.717654C0.512068 7.52791 0.345215 7.36815 0.345215 7.1713C0.345215 6.97446 0.512068 6.8147 0.717654 6.8147H5.18693C5.39252 6.8147 5.55937 6.97446 5.55937 7.1713C5.55937 7.36815 5.39252 7.52791 5.18693 7.52791Z' fill='%2309884D' stroke='%2309884D' stroke-width='0.2'/%3e%3cpath d='M10.8853 9.87167H8.26317C8.0564 9.87167 7.88859 9.6986 7.88859 9.48535C7.88859 9.2721 8.0564 9.09903 8.26317 9.09903H10.5864L12.2885 1.37262H3.76814C3.56137 1.37262 3.39355 1.19955 3.39355 0.986296C3.39355 0.773047 3.56137 0.599976 3.76814 0.599976H12.7582C12.8721 0.599976 12.98 0.653288 13.0511 0.745232C13.1223 0.836404 13.1493 0.956936 13.1238 1.07129L11.2509 9.57035C11.2119 9.74728 11.0598 9.87167 10.8853 9.87167Z' fill='%2309884D' stroke='%2309884D' stroke-width='0.2'/%3e%3c/svg%3e";

var img$c = "data:image/svg+xml,%3csvg width='10' height='12' viewBox='0 0 10 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.47928 0.47928C0.786158 0.172402 1.20237 0 1.63636 0H6C6.14466 0 6.2834 0.0574674 6.38569 0.15976L9.65842 3.43249C9.76072 3.53478 9.81818 3.67352 9.81818 3.81818V10.3636C9.81818 10.7976 9.64578 11.2138 9.3389 11.5207C9.03202 11.8276 8.61581 12 8.18182 12H1.63636C1.20237 12 0.786157 11.8276 0.47928 11.5207C0.172402 11.2138 0 10.7976 0 10.3636V1.63636C0 1.20237 0.172402 0.786158 0.47928 0.47928ZM1.63636 1.09091C1.4917 1.09091 1.35296 1.14838 1.25067 1.25067C1.14838 1.35296 1.09091 1.4917 1.09091 1.63636V10.3636C1.09091 10.5083 1.14838 10.647 1.25067 10.7493C1.35296 10.8516 1.4917 10.9091 1.63636 10.9091H8.18182C8.32648 10.9091 8.46522 10.8516 8.56751 10.7493C8.66981 10.647 8.72727 10.5083 8.72727 10.3636V4.04412L5.77407 1.09091H1.63636Z' fill='%2309884D'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.99858 0C6.29983 0 6.54403 0.244208 6.54403 0.545455V3.27273H9.27131C9.57255 3.27273 9.81676 3.51694 9.81676 3.81818C9.81676 4.11943 9.57255 4.36364 9.27131 4.36364H5.99858C5.69733 4.36364 5.45312 4.11943 5.45312 3.81818V0.545455C5.45312 0.244208 5.69733 0 5.99858 0Z' fill='%2309884D'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.1875 6.54545C2.1875 6.24421 2.43171 6 2.73295 6H7.09659C7.39784 6 7.64205 6.24421 7.64205 6.54545C7.64205 6.8467 7.39784 7.09091 7.09659 7.09091H2.73295C2.43171 7.09091 2.1875 6.8467 2.1875 6.54545Z' fill='%2309884D'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.1875 8.72807C2.1875 8.42683 2.43171 8.18262 2.73295 8.18262H7.09659C7.39784 8.18262 7.64205 8.42683 7.64205 8.72807C7.64205 9.02932 7.39784 9.27353 7.09659 9.27353H2.73295C2.43171 9.27353 2.1875 9.02932 2.1875 8.72807Z' fill='%2309884D'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.1875 4.36284C2.1875 4.06159 2.43171 3.81738 2.73295 3.81738H3.82386C4.12511 3.81738 4.36932 4.06159 4.36932 4.36284C4.36932 4.66408 4.12511 4.90829 3.82386 4.90829H2.73295C2.43171 4.90829 2.1875 4.66408 2.1875 4.36284Z' fill='%2309884D'/%3e%3c/svg%3e";

var img$b = "data:image/svg+xml,%3csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M15.506 4.568C15.506 4.52 15.506 4.472 15.506 4.424L13.994 0.68C13.934 0.524 13.838 0.403999 13.706 0.319999C13.574 0.224 13.424 0.182 13.256 0.194H2.744C2.588 0.194 2.45 0.241999 2.33 0.337999C2.21 0.421999 2.12 0.536 2.06 0.68L0.548 4.424C0.548 4.472 0.548 4.52 0.548 4.568C0.524 4.604 0.506 4.646 0.494 4.694C0.506 5.222 0.644 5.714 0.908 6.17C1.184 6.626 1.55 6.986 2.006 7.25V14.45C2.006 14.654 2.078 14.828 2.222 14.972C2.366 15.128 2.54 15.206 2.744 15.206H13.256C13.46 15.206 13.634 15.128 13.778 14.972C13.922 14.828 13.994 14.654 13.994 14.45V7.286C14.462 7.022 14.828 6.662 15.092 6.206C15.368 5.738 15.506 5.234 15.506 4.694C15.518 4.646 15.518 4.604 15.506 4.568ZM8.756 13.694H7.244V10.706H8.756V13.694ZM12.5 13.694H10.25V9.95C10.25 9.746 10.172 9.572 10.016 9.428C9.872 9.272 9.698 9.194 9.494 9.194H6.506C6.302 9.194 6.122 9.272 5.966 9.428C5.822 9.572 5.75 9.746 5.75 9.95V13.694H3.5V7.7C3.932 7.7 4.34 7.61 4.724 7.43C5.12 7.238 5.462 6.98 5.75 6.656C6.038 6.98 6.374 7.232 6.758 7.412C7.154 7.58 7.568 7.664 8 7.664C8.432 7.664 8.84 7.58 9.224 7.412C9.62 7.232 9.962 6.98 10.25 6.656C10.538 6.98 10.874 7.238 11.258 7.43C11.654 7.61 12.068 7.7 12.5 7.7V13.694ZM12.5 6.206C12.08 6.206 11.726 6.062 11.438 5.774C11.15 5.474 11.006 5.114 11.006 4.694C11.006 4.49 10.928 4.316 10.772 4.172C10.628 4.016 10.454 3.938 10.25 3.938C10.046 3.938 9.866 4.016 9.71 4.172C9.566 4.316 9.494 4.49 9.494 4.694C9.494 5.102 9.344 5.456 9.044 5.756C8.756 6.044 8.408 6.188 8 6.188C7.592 6.188 7.238 6.044 6.938 5.756C6.65 5.456 6.506 5.102 6.506 4.694C6.506 4.49 6.428 4.316 6.272 4.172C6.128 4.016 5.954 3.938 5.75 3.938C5.546 3.938 5.366 4.016 5.21 4.172C5.066 4.316 4.994 4.49 4.994 4.694C5.006 5.102 4.874 5.462 4.598 5.774C4.322 6.074 3.974 6.236 3.554 6.26C3.146 6.272 2.786 6.14 2.474 5.864C2.174 5.576 2.018 5.228 2.006 4.82L3.266 1.706H12.734L13.994 4.82C13.97 5.216 13.814 5.546 13.526 5.81C13.238 6.074 12.896 6.206 12.5 6.206Z' fill='%2309884D'/%3e%3c/svg%3e";

var img$a = "data:image/svg+xml,%3csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M9.73522 3.01478H9.51958C9.66334 2.72725 9.73522 2.42535 9.73522 2.10907C9.74481 1.67777 9.6298 1.28482 9.39019 0.930204C9.15059 0.575587 8.82951 0.316813 8.42698 0.153881C8.03402 -0.00905167 7.62669 -0.0425966 7.20498 0.0532457C6.79286 0.139504 6.43825 0.335981 6.14113 0.642677C5.84402 0.335981 5.48461 0.139504 5.06291 0.0532457C4.65079 -0.0425966 4.24346 -0.00905167 3.84092 0.153881C3.44796 0.316813 3.13168 0.575587 2.89208 0.930204C2.65247 1.28482 2.53746 1.67777 2.54704 2.10907C2.54704 2.42535 2.61893 2.72725 2.76269 3.01478H2.54704C2.22118 3.01478 1.91928 3.09624 1.64133 3.25917C1.37298 3.42211 1.15733 3.64254 0.994398 3.92049C0.831466 4.18885 0.75 4.48596 0.75 4.81182V6.00506C0.75 6.16799 0.807505 6.31175 0.922516 6.43635C1.04711 6.55136 1.19088 6.60887 1.35381 6.60887H1.94324V10.203C1.94324 10.5288 2.0247 10.8259 2.18764 11.0943C2.35057 11.3722 2.56621 11.5927 2.83457 11.7556C3.11252 11.9185 3.41442 12 3.74028 12H8.54199C8.86785 12 9.16496 11.9185 9.43332 11.7556C9.71126 11.5927 9.9317 11.3722 10.0946 11.0943C10.2576 10.8259 10.339 10.5288 10.339 10.203V6.60887H10.9285C11.0914 6.60887 11.2304 6.55136 11.3454 6.43635C11.47 6.31175 11.5323 6.16799 11.5323 6.00506V4.81182C11.5323 4.48596 11.4508 4.18885 11.2879 3.92049C11.1249 3.64254 10.9045 3.42211 10.6266 3.25917C10.3582 3.09624 10.0611 3.01478 9.73522 3.01478ZM5.53733 10.7924H3.74028C3.57735 10.7924 3.43838 10.7349 3.32337 10.6199C3.20836 10.5049 3.15085 10.3659 3.15085 10.203V6.60887H5.53733V10.7924ZM5.53733 5.40125H1.94324V4.81182C1.94324 4.64889 2.00074 4.50992 2.11575 4.39491C2.24035 4.27031 2.38411 4.20801 2.54704 4.20801H5.53733V5.40125ZM5.53733 3.01478H4.64599C4.46389 3.01478 4.29617 2.96685 4.14282 2.87101C3.98947 2.76559 3.87446 2.63141 3.79779 2.46847C3.7307 2.29596 3.71153 2.11865 3.74028 1.93655C3.77862 1.75445 3.86009 1.6011 3.98468 1.47651C4.11886 1.34233 4.27221 1.25607 4.44472 1.21773C4.62682 1.17939 4.80413 1.19856 4.97665 1.27524C5.14917 1.34233 5.28335 1.45254 5.37919 1.60589C5.48461 1.75924 5.53733 1.92696 5.53733 2.10907V3.01478ZM6.74494 2.10907C6.74494 1.92696 6.79286 1.75924 6.88871 1.60589C6.99413 1.45254 7.1331 1.34233 7.30562 1.27524C7.47814 1.19856 7.65065 1.17939 7.82317 1.21773C8.00527 1.25607 8.15862 1.34233 8.28321 1.47651C8.41739 1.6011 8.49886 1.75445 8.52761 1.93655C8.56595 2.11865 8.54678 2.29596 8.47011 2.46847C8.40302 2.63141 8.2928 2.76559 8.13945 2.87101C7.9861 2.96685 7.81838 3.01478 7.63628 3.01478H6.74494V2.10907ZM9.13142 10.203C9.13142 10.3659 9.07391 10.5049 8.9589 10.6199C8.84389 10.7349 8.70492 10.7924 8.54199 10.7924H6.74494V6.60887H9.13142V10.203ZM10.339 5.40125H6.74494V4.20801H9.73522C9.89816 4.20801 10.0371 4.27031 10.1521 4.39491C10.2767 4.50992 10.339 4.64889 10.339 4.81182V5.40125Z' fill='%23D55D2A'/%3e%3c/svg%3e";

var img$9 = "data:image/svg+xml,%3csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.2014 0H1.79856C1.47242 0 1.17026 0.0815346 0.892086 0.244604C0.623501 0.407673 0.407674 0.628297 0.244604 0.906474C0.0815348 1.17506 0 1.47242 0 1.79856V10.2014C0 10.5276 0.0815348 10.8249 0.244604 11.0935C0.407674 11.3717 0.623501 11.5923 0.892086 11.7554C1.17026 11.9185 1.47242 12 1.79856 12H10.2014C10.5276 12 10.8249 11.9185 11.0935 11.7554C11.3717 11.5923 11.5923 11.3717 11.7554 11.0935C11.9185 10.8249 12 10.5276 12 10.2014V1.79856C12 1.47242 11.9185 1.17506 11.7554 0.906474C11.5923 0.628297 11.3717 0.407673 11.0935 0.244604C10.8249 0.0815346 10.5276 0 10.2014 0ZM10.7914 10.2014C10.7914 10.3645 10.7338 10.5036 10.6187 10.6187C10.5036 10.7338 10.3645 10.7914 10.2014 10.7914H1.79856C1.63549 10.7914 1.4964 10.7338 1.38129 10.6187C1.26619 10.5036 1.20863 10.3645 1.20863 10.2014V1.79856C1.20863 1.63549 1.26619 1.4964 1.38129 1.3813C1.4964 1.26619 1.63549 1.20863 1.79856 1.20863H10.2014C10.3645 1.20863 10.5036 1.26619 10.6187 1.3813C10.7338 1.4964 10.7914 1.63549 10.7914 1.79856V10.2014ZM8.99281 4.20144H7.79856V3.00719C7.79856 2.84412 7.73621 2.70504 7.61151 2.58993C7.4964 2.46523 7.35731 2.40288 7.19424 2.40288H4.80576C4.64269 2.40288 4.4988 2.46523 4.3741 2.58993C4.25899 2.70504 4.20144 2.84412 4.20144 3.00719V4.20144H3.00719C2.84413 4.20144 2.70024 4.26379 2.57554 4.38849C2.46043 4.5036 2.40288 4.64269 2.40288 4.80576V7.19424C2.40288 7.35731 2.46043 7.5012 2.57554 7.6259C2.70024 7.74101 2.84413 7.79856 3.00719 7.79856H4.20144V8.99281C4.20144 9.15588 4.25899 9.29976 4.3741 9.42446C4.4988 9.53957 4.64269 9.59712 4.80576 9.59712H7.19424C7.35731 9.59712 7.4964 9.53957 7.61151 9.42446C7.73621 9.29976 7.79856 9.15588 7.79856 8.99281V7.79856H8.99281C9.15588 7.79856 9.29496 7.74101 9.41007 7.6259C9.53477 7.5012 9.59712 7.35731 9.59712 7.19424V4.80576C9.59712 4.64269 9.53477 4.5036 9.41007 4.38849C9.29496 4.26379 9.15588 4.20144 8.99281 4.20144ZM8.40288 6.60432H7.19424C7.03118 6.60432 6.89209 6.66187 6.77698 6.77698C6.66187 6.89209 6.60432 7.03118 6.60432 7.19424V8.40288H5.39568V7.19424C5.39568 7.03118 5.33813 6.89209 5.22302 6.77698C5.10791 6.66187 4.96883 6.60432 4.80576 6.60432H3.59712V5.39568H4.80576C4.96883 5.39568 5.10791 5.33813 5.22302 5.22302C5.33813 5.10791 5.39568 4.96882 5.39568 4.80576V3.59712H6.60432V4.80576C6.60432 4.96882 6.66187 5.10791 6.77698 5.22302C6.89209 5.33813 7.03118 5.39568 7.19424 5.39568H8.40288V6.60432Z' fill='%2309884D'/%3e%3c/svg%3e";

var img$8 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13.95 13.95'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:%2300a55b%3b%7d.cls-2%7bfill:%23ef6235%3bstroke:white%3bstroke-miterlimit:10%3bstroke-width:1.98px%3b%7d%3c/style%3e%3c/defs%3e%3cg id='Layer_2' data-name='Layer 2'%3e%3cg id='Layer_1-2' data-name='Layer 1'%3e%3ccircle class='cls-1' cx='6.97' cy='6.97' r='6.97'/%3e%3cpath class='cls-2' d='M7%2c10.2A3.23%2c3.23%2c0%2c1%2c1%2c10.2%2c7%2c3.23%2c3.23%2c0%2c0%2c1%2c7%2c10.2Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

var img$7 = "data:image/svg+xml,%3csvg id='svg' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='400' height='399.52095808383234' viewBox='0%2c 0%2c 400%2c399.52095808383234'%3e%3cg id='svgg'%3e%3cpath id='path0' d='' stroke='none' fill='%23d4ac14' fill-rule='evenodd'%3e%3c/path%3e%3cpath id='path1' d='M192.066 9.406 C 179.351 14.542%2c168.112 18.873%2c167.091 19.029 C 166.070 19.186%2c153.097 18.916%2c138.262 18.431 C 108.853 17.468%2c106.648 17.529%2c102.802 19.410 C 99.889 20.834%2c99.802 20.960%2c83.399 47.153 C 75.347 60.010%2c68.348 71.019%2c67.846 71.617 C 67.344 72.216%2c57.223 79.257%2c45.355 87.264 C 17.969 105.741%2c18.585 105.301%2c17.215 107.370 C 14.705 111.158%2c14.422 115.259%2c15.605 130.669 C 15.816 133.417%2c16.163 138.362%2c16.375 141.658 C 16.588 144.955%2c17.140 153.047%2c17.604 159.640 C 18.634 174.310%2c18.816 172.808%2c14.602 184.416 C 12.688 189.690%2c8.619 200.898%2c5.561 209.321 L -0.000 224.637 -0.000 232.742 C 0.000 242.757%2c-4.798 235.706%2c31.561 279.121 C 39.251 288.304%2c37.572 284.414%2c44.978 310.199 C 54.075 341.867%2c54.413 342.997%2c55.380 344.915 C 57.631 349.380%2c57.146 349.204%2c89.910 357.428 C 104.525 361.096%2c117.203 364.425%2c118.082 364.825 C 118.961 365.225%2c129.477 373.213%2c141.451 382.576 L 163.221 399.600 174.248 399.600 L 185.275 399.600 208.222 390.310 L 231.169 381.019 242.557 381.093 C 248.821 381.134%2c261.409 381.430%2c270.529 381.751 C 289.958 382.435%2c293.418 382.261%2c297.180 380.410 C 300.561 378.748%2c299.501 380.325%2c328.826 333.282 C 332.352 327.626%2c331.377 328.393%2c356.843 311.218 C 380.835 295.036%2c381.722 294.392%2c383.112 292.152 C 385.588 288.158%2c385.624 285.682%2c383.609 257.143 C 383.174 250.989%2c382.611 242.987%2c382.358 239.361 C 382.105 235.734%2c381.883 231.059%2c381.865 228.971 L 381.834 225.175 390.917 200.314 L 400.000 175.454 399.996 167.148 L 399.992 158.841 398.297 156.606 C 397.366 155.377%2c388.961 145.248%2c379.620 134.097 C 370.280 122.947%2c362.336 113.242%2c361.967 112.531 C 361.338 111.319%2c359.249 104.253%2c349.665 70.929 C 345.263 55.624%2c345.063 55.065%2c343.243 52.992 C 340.999 50.437%2c339.165 49.853%2c311.084 42.753 C 296.165 38.981%2c283.259 35.615%2c282.404 35.273 C 281.548 34.930%2c270.841 26.854%2c258.610 17.325 L 236.372 0.000 225.778 0.033 L 215.185 0.067 192.066 9.406 M214.434 59.352 C 233.207 61.324%2c253.060 67.309%2c258.340 72.589 C 264.475 78.724%2c262.887 88.514%2c255.139 92.327 C 251.415 94.159%2c247.891 93.803%2c238.362 90.632 C 161.576 65.083%2c84.278 120.034%2c84.320 200.142 C 84.364 285.525%2c174.784 341.943%2c250.882 304.069 C 298.850 280.196%2c323.461 230.122%2c313.423 176.823 C 310.739 162.574%2c314.065 155.414%2c323.676 154.746 C 331.486 154.204%2c336.018 159.385%2c338.445 171.628 C 357.914 269.828%2c273.771 356.334%2c175.425 339.228 C 97.556 325.684%2c45.862 249.705%2c61.531 171.828 C 73.911 110.295%2c125.795 64.306%2c188.811 59.010 C 193.745 58.595%2c209.190 58.802%2c214.434 59.352 M309.536 85.091 C 316.901 88.339%2c318.781 96.574%2c313.965 104.496 C 311.477 108.587%2c210.822 252.362%2c208.681 254.883 C 201.728 263.067%2c192.117 262.686%2c185.064 253.946 C 182.686 250.999%2c144.315 196.212%2c142.105 192.607 C 127.703 169.120%2c157.436 148.256%2c174.372 169.966 C 175.661 171.618%2c180.286 178.057%2c184.650 184.275 C 196.501 201.160%2c197.718 202.204%2c202.797 199.837 C 205.320 198.661%2c206.202 197.608%2c250.190 143.282 C 273.135 114.944%2c292.750 90.836%2c293.780 89.708 C 298.681 84.339%2c304.178 82.728%2c309.536 85.091 ' stroke='none' fill='%23fcfcfb' fill-rule='evenodd'%3e%3c/path%3e%3cpath id='path2' d='M188.811 59.010 C 104.798 66.071%2c45.436 144.011%2c61.190 226.573 C 77.396 311.507%2c166.382 362.303%2c247.752 333.070 C 313.980 309.277%2c352.234 241.181%2c338.445 171.628 C 336.018 159.385%2c331.486 154.204%2c323.676 154.746 C 314.065 155.414%2c310.739 162.574%2c313.423 176.823 C 323.461 230.122%2c298.850 280.196%2c250.882 304.069 C 174.784 341.943%2c84.364 285.525%2c84.320 200.142 C 84.278 120.034%2c161.576 65.083%2c238.362 90.632 C 247.891 93.803%2c251.415 94.159%2c255.139 92.327 C 262.887 88.514%2c264.475 78.724%2c258.340 72.589 C 249.798 64.047%2c213.417 56.942%2c188.811 59.010 M301.019 84.636 C 295.968 86.440%2c299.719 82.112%2c250.190 143.282 C 206.202 197.608%2c205.320 198.661%2c202.797 199.837 C 197.718 202.204%2c196.501 201.160%2c184.650 184.275 C 180.286 178.057%2c175.661 171.618%2c174.372 169.966 C 157.436 148.256%2c127.703 169.120%2c142.105 192.607 C 144.315 196.212%2c182.686 250.999%2c185.064 253.946 C 192.117 262.686%2c201.728 263.067%2c208.681 254.883 C 210.822 252.362%2c311.477 108.587%2c313.965 104.496 C 320.731 93.365%2c312.392 80.573%2c301.019 84.636 ' stroke='none' fill='%23d6a816' fill-rule='evenodd'%3e%3c/path%3e%3c/g%3e%3c/svg%3e";

var img$6 = "data:image/svg+xml,%3csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4.80576 8.99281H5.39568V9.59712C5.39568 9.76019 5.45324 9.90408 5.56835 10.0288C5.69305 10.1439 5.83693 10.2014 6 10.2014C6.16307 10.2014 6.30216 10.1439 6.41727 10.0288C6.54197 9.90408 6.60432 9.76019 6.60432 9.59712V8.99281H7.19424C7.33813 8.97362 7.45803 8.90648 7.55396 8.79137C7.65947 8.67626 7.71223 8.54676 7.71223 8.40288C7.71223 8.2494 7.65947 8.11511 7.55396 8C7.45803 7.88489 7.33813 7.81775 7.19424 7.79856H6.60432V7.19424C6.60432 7.03118 6.54197 6.89209 6.41727 6.77698C6.30216 6.65228 6.16307 6.58993 6 6.58993C5.83693 6.58993 5.69305 6.65228 5.56835 6.77698C5.45324 6.89209 5.39568 7.03118 5.39568 7.19424V7.79856H4.80576C4.66187 7.81775 4.53717 7.88489 4.43166 8C4.33573 8.11511 4.28777 8.2494 4.28777 8.40288C4.28777 8.54676 4.33573 8.67626 4.43166 8.79137C4.53717 8.90648 4.66187 8.97362 4.80576 8.99281ZM10.2014 2.40288H8.99281V1.79856C8.99281 1.47242 8.91127 1.17506 8.7482 0.906474C8.58513 0.628297 8.36451 0.407673 8.08633 0.244604C7.81775 0.0815346 7.52038 0 7.19424 0H4.80576C4.47962 0 4.17746 0.0815346 3.89928 0.244604C3.6307 0.407673 3.41487 0.628297 3.2518 0.906474C3.08873 1.17506 3.00719 1.47242 3.00719 1.79856V2.40288H1.79856C1.47242 2.40288 1.17026 2.48441 0.892086 2.64748C0.623501 2.81055 0.407674 3.03117 0.244604 3.30935C0.0815348 3.57794 0 3.8753 0 4.20144V10.2014C0 10.5276 0.0815348 10.8249 0.244604 11.0935C0.407674 11.3717 0.623501 11.5923 0.892086 11.7554C1.17026 11.9185 1.47242 12 1.79856 12H10.2014C10.5276 12 10.8249 11.9185 11.0935 11.7554C11.3717 11.5923 11.5923 11.3717 11.7554 11.0935C11.9185 10.8249 12 10.5276 12 10.2014V4.20144C12 3.8753 11.9185 3.57794 11.7554 3.30935C11.5923 3.03117 11.3717 2.81055 11.0935 2.64748C10.8249 2.48441 10.5276 2.40288 10.2014 2.40288ZM4.20144 1.79856C4.20144 1.63549 4.25899 1.4964 4.3741 1.3813C4.4988 1.26619 4.64269 1.20863 4.80576 1.20863H7.19424C7.35731 1.20863 7.4964 1.26619 7.61151 1.3813C7.73621 1.4964 7.79856 1.63549 7.79856 1.79856V2.40288H4.20144V1.79856ZM10.7914 10.2014C10.7914 10.3645 10.7338 10.5036 10.6187 10.6187C10.5036 10.7338 10.3645 10.7914 10.2014 10.7914H1.79856C1.63549 10.7914 1.4964 10.7338 1.38129 10.6187C1.26619 10.5036 1.20863 10.3645 1.20863 10.2014V6H10.7914V10.2014ZM10.7914 4.80576H1.20863V4.20144C1.20863 4.03837 1.26619 3.89928 1.38129 3.78417C1.4964 3.65947 1.63549 3.59712 1.79856 3.59712H10.2014C10.3645 3.59712 10.5036 3.65947 10.6187 3.78417C10.7338 3.89928 10.7914 4.03837 10.7914 4.20144V4.80576Z' fill='%2309884D'/%3e%3c/svg%3e";

var iconList = [{
  label: "✯ Ngôi sao",
  value: "star",
  icon: freeSolidSvgIcons.faStar
}, {
  label: "＋ Cộng",
  value: "plus",
  icon: freeSolidSvgIcons.faPlus
}, {
  label: "♫ Nốt nhạc",
  value: "music",
  icon: freeSolidSvgIcons.faMusic
}, {
  label: "❄ Tuyết",
  value: "snowflake",
  icon: freeSolidSvgIcons.faSnowflake
}, {
  label: "✈ Máy bay",
  value: "plane",
  icon: freeSolidSvgIcons.faPlane
}, {
  label: "❤ Trái tim",
  value: "heart",
  icon: freeSolidSvgIcons.faHeart
}, {
  label: "ϟ Sét",
  value: "bolt",
  icon: freeSolidSvgIcons.faBolt
}, {
  label: "☀ Mặt trời",
  value: "sun",
  icon: freeSolidSvgIcons.faSun
}, {
  label: "☁ Mây",
  value: "cloud",
  icon: freeSolidSvgIcons.faCloud
}, {
  label: "♨ Lửa",
  value: "fab gripfire",
  icon: freeBrandsSvgIcons.faGripfire
}, {
  label: "Quà tặng",
  value: "gift",
  icon: freeSolidSvgIcons.faGift
}, {
  label: "Giao nhanh",
  value: "shipping-fast",
  icon: freeSolidSvgIcons.faShippingFast
}, {
  label: "Hóa đơn",
  value: "file-invoice-dollar",
  icon: freeSolidSvgIcons.faFileInvoiceDollar
}, {
  label: "Bánh sinh nhật",
  value: "birthday-cake",
  icon: freeSolidSvgIcons.faBirthdayCake
}, {
  label: "Huy chương",
  value: "medal",
  icon: freeSolidSvgIcons.faMedal
}, {
  label: "Thích",
  value: "thumbs-up",
  icon: freeSolidSvgIcons.faThumbsUp
}, {
  label: "Trẻ em",
  value: "baby",
  icon: freeSolidSvgIcons.faBaby
}, {
  label: "Giọt nước",
  value: "tint",
  icon: freeSolidSvgIcons.faTint
}, {
  label: "Bùng nổ",
  value: "bahai",
  icon: freeSolidSvgIcons.faBahai
}];
iconList.forEach(function (icon) {
  fontawesomeSvgCore.library.add(icon.icon);
});
fontawesomeSvgCore.dom.watch();
var defaultNewStyle = {
  border: "1px solid #00b46e",
  textColor: "#09884D",
  borderColor: "#F2F4FA",
  backgroundColor: "#F2F4FA",
  isStyleV2: true,
  styleName: {
    fontFamily: "ggsr"
  }
};
var TagDefaultTypeProps = {
  "default": {
    border: "1px solid #000",
    color: "#000"
  },
  HOADONNHANH: _objectSpread2(_objectSpread2({}, defaultNewStyle), {}, {
    name: "Hóa Đơn Nhanh",
    code: "HOADONNHANH",
    isTooltip: true,
    Icon: img$c,
    index: 99
  }),
  BAN_CHAY: _objectSpread2(_objectSpread2({}, defaultNewStyle), {}, {
    code: "BAN_CHAY",
    name: "Bán Chạy",
    isTooltip: true,
    Icon: img$h,
    index: 97
  }),
  DEAL: {
    border: "1px solid #dc3545",
    color: "#dc3545",
    name: "Khuyến mãi",
    textColor: "#fff",
    backgroundColor: "#dc3545",
    url: "/deals",
    code: "DEAL",
    visible: true
  },
  LIMIT: {
    code: "LIMIT",
    name: "Số lượng có hạn",
    textColor: "#D14900",
    backgroundColor: "#FFF8EA",
    url: "/products",
    visible: true
  },
  "2ABC": {
    code: "2ABC",
    textColor: "#FFF",
    color: "#D6A816",
    backgroundColor: "#D6A816",
    isTooltip: true,
    Icon: img$7,
    index: 99
  },
  DONG_Y: _objectSpread2(_objectSpread2({}, defaultNewStyle), {}, {
    name: "Đông Y",
    isTooltip: true,
    Icon: img$f,
    index: 93
  }),
  // NEAR_EXPIRATION: {
  //   ...defaultNewStyle,
  //   name: "Cận Date",
  //   isTooltip: true,
  //   Icon: TAG_CAN_DATE,
  // },
  NEAR_EXPIRATION: {
    code: "NEAR_EXPIRATION",
    name: "Cận date",
    textColor: "#DC5C00",
    backgroundColor: "#FFEEEF",
    index: 100,
    url: "/products",
    visible: true
  },
  GIAO_NHANH: _objectSpread2(_objectSpread2({}, defaultNewStyle), {}, {
    code: "GIAONHANH",
    name: "Giao Nhanh",
    isTooltip: true,
    Icon: img$d,
    index: 90
  }),
  YEU_CAU_GPP_GDP: _objectSpread2(_objectSpread2({}, defaultNewStyle), {}, {
    name: "Yêu Cầu Có GPP/GDP",
    index: 95
  }),
  SUC_KHOE_HAU_COVID: _objectSpread2(_objectSpread2({}, defaultNewStyle), {}, {
    name: "Sức Khoẻ Hậu Covid",
    isTooltip: true,
    Icon: img$9,
    index: 91
  }),
  THIET_BI_CAO_CAP: _objectSpread2(_objectSpread2({}, defaultNewStyle), {}, {
    name: "Thiết Bị Cao Cấp",
    isTooltip: true,
    Icon: img$6,
    index: 94
  }),
  QUA_TANG: _objectSpread2(_objectSpread2({}, defaultNewStyle), {}, {
    name: "Quà Tặng",
    isTooltip: true,
    Icon: img$a,
    index: 89
  }),
  GAM_HANG_LANH: _objectSpread2(_objectSpread2({}, defaultNewStyle), {}, {
    name: "Gam Hàng Lạnh",
    isTooltip: true,
    Icon: img$e,
    index: 92
  }),
  DOIMAU: _objectSpread2(_objectSpread2({}, defaultNewStyle), {}, {
    code: "DOIMAU",
    name: "Đổi Mẫu",
    isTooltip: true,
    Icon: img$g,
    index: 95
  }),
  FV2U: {
    code: "FV2U",
    name: "Có Ở Kho",
    textColor: "#09884D",
    backgroundColor: "#F3F3FC",
    Icon: img$b
  },
  Y7GB: _objectSpread2(_objectSpread2({}, defaultNewStyle), {}, {
    code: "Y7GB",
    name: "Hàng Điểm",
    isTooltip: true,
    Icon: img$8,
    index: 98
  })
};

var TagTypeProps = _objectSpread2(_objectSpread2({}, TagDefaultTypeProps), {}, {
  "3ABC": _objectSpread2(_objectSpread2({}, TagDefaultTypeProps.BAN_CHAY), {}, {
    code: "3ABC"
  }),
  "84AB": _objectSpread2(_objectSpread2({}, TagDefaultTypeProps.BAN_CHAY), {}, {
    code: "84AB"
  }),
  PABC: _objectSpread2(_objectSpread2({}, TagDefaultTypeProps.DONG_Y), {}, {
    code: "PABC"
  }),
  X7GB: _objectSpread2(_objectSpread2({}, TagDefaultTypeProps.YEU_CAU_GPP_GDP), {}, {
    code: "X7GB"
  }),
  LY7G: _objectSpread2(_objectSpread2({}, TagDefaultTypeProps.SUC_KHOE_HAU_COVID), {}, {
    code: "LY7G"
  }),
  "1U1Y": _objectSpread2(_objectSpread2({}, TagDefaultTypeProps.THIET_BI_CAO_CAP), {}, {
    code: "1U1Y"
  })
});

var ProductTagItem = function ProductTagItem(_ref) {
  var borderColor = _ref.borderColor,
      backgroundColor = _ref.backgroundColor,
      textColor = _ref.textColor,
      Icon = _ref.Icon,
      preIcon = _ref.preIcon,
      style = _ref.style,
      name = _ref.name;
      _ref.tag;

  if (preIcon) {
    if (typeof preIcon === "string") {
      if (preIcon.indexOf(" ") > 0) {
        preIcon = preIcon.split(" ");
      }
    } else if (_typeof(preIcon) === "object" && preIcon.value) {
      preIcon = preIcon.value;
    }
  }

  if (preIcon || Icon) {
    return /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
      title: name,
      children: /*#__PURE__*/jsxRuntime.jsxs(material.Box, {
        className: style$e.product_tag,
        sx: _objectSpread2({
          borderColor: borderColor || backgroundColor,
          color: textColor,
          backgroundColor: backgroundColor
        }, style || {}),
        children: [Icon && /*#__PURE__*/jsxRuntime.jsx("img", {
          src: Icon,
          className: style$e.product_tag_image
        }), !Icon && preIcon && /*#__PURE__*/jsxRuntime.jsx(reactFontawesome.FontAwesomeIcon, {
          className: style$e.product_tag_image,
          icon: preIcon
        })]
      })
    }, name);
  } else if (name) {
    // name not icon
    return /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
      title: name,
      children: /*#__PURE__*/jsxRuntime.jsx(material.Box, {
        className: style$e.product_tag_name_block,
        sx: _objectSpread2({
          borderColor: borderColor || backgroundColor,
          color: textColor,
          backgroundColor: backgroundColor
        }, style || {}),
        children: name && /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
          className: style$e.product_tag_name,
          children: name
        })
      })
    }, name);
  }

  return null;
};

function getFormattedDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "DD/MM/YYYY";
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return format.replace("DD", String(day).padStart(2, "0")).replace("MM", String(month).padStart(2, "0")).replace("YYYY", year).replace("HH", String(hour).padStart(2, "0")).replace("mm", String(minute).padStart(2, "0")).replace("ss", String(second).padStart(2, "0"));
}

var convertFormatExpiredDate = function convertFormatExpiredDate(expiredDate) {
  var date = new Date(expiredDate);
  return getFormattedDate(date, "DD-MM-YYYY");
};

var convertTag = function convertTag(_ref2) {
  var tag = _ref2.tag,
      listTags = _ref2.listTags,
      expiredDate = _ref2.expiredDate,
      statusData = _ref2.statusData;
  var tagObject = (listTags === null || listTags === void 0 ? void 0 : listTags.find(function (item) {
    return item.code === tag;
  })) || null;
  var tagTypeProps = TagTypeProps[tag] || null;

  if (!tagTypeProps && (!tagObject || !(tagObject !== null && tagObject !== void 0 && tagObject.visible))) {
    return null;
  }

  var newTag = _objectSpread2(_objectSpread2(_objectSpread2({}, tagObject), tagTypeProps), {}, {
    expiredDate: expiredDate,
    statusData: statusData
  });

  if (tag === "NEAR_EXPIRATION") newTag.name = "Cận Date " + (expiredDate ? convertFormatExpiredDate(expiredDate) : "");
  return newTag;
};

var HANG_DIEM = "Y7GB";
var HANG_HANG = "2ABC";
var HOADONNHANH = "HOADONNHANH";
var tagHideHoaDonNhanh = [HANG_DIEM, HANG_HANG];

var AdditionalTooltip = function AdditionalTooltip(_ref3) {
  var tags = _ref3.tags;
      _ref3.listTags;
      _ref3.expiredDate;
  var CustomizeTooltip = styles.withStyles({
    tooltip: {
      backgroundColor: "#ffffff",
      border: "1px solid #eaeaea",
      display: "flex",
      justifyContent: "space-beetwen",
      flexWrap: "wrap"
    },
    arrow: {
      "&:before": {
        border: "1px solid #eaeaea",
        backgroundColor: "#ffffff"
      }
    }
  })(material.Tooltip);
  var tagsElement = tags === null || tags === void 0 ? void 0 : tags.map(function (tag) {
    if (tag) return ProductTagItem(tag);
    return null;
  });
  return /*#__PURE__*/jsxRuntime.jsx(CustomizeTooltip, {
    title: tagsElement,
    disableFocusListener: true,
    disableTouchListener: true,
    arrow: true,
    className: style$e.product_tag_addition,
    children: /*#__PURE__*/jsxRuntime.jsx(material.Box, {
      className: style$e.product_tag_addition_item,
      children: /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
        style: {
          marginBottom: "8px"
        },
        children: "..."
      })
    })
  });
};

var ProductTags = function ProductTags(_ref4) {
  var _newTags$map, _newTagItems, _newTagItems2;

  var skuInfo = _ref4.skuInfo,
      listTags = _ref4.listTags;

  var _ref5 = skuInfo || {},
      _ref5$tags = _ref5.tags,
      tags = _ref5$tags === void 0 ? [] : _ref5$tags,
      status = _ref5.status,
      _ref5$lotDates = _ref5.lotDates,
      lotDates = _ref5$lotDates === void 0 ? [] : _ref5$lotDates,
      deal = _ref5.deal,
      campaign = _ref5.campaign;

  var newTags = _toConsumableArray(tags);

  var expiredDate = "";
  if (status !== "NORMAL") newTags === null || newTags === void 0 ? void 0 : newTags.push(status);

  if ((lotDates === null || lotDates === void 0 ? void 0 : lotDates.length) > 0) {
    var isNearExpiration = lotDates === null || lotDates === void 0 ? void 0 : lotDates.find(function (item) {
      return (item === null || item === void 0 ? void 0 : item.isNearExpired) === true;
    });

    if (isNearExpiration) {
      expiredDate = (isNearExpiration === null || isNearExpiration === void 0 ? void 0 : isNearExpiration.expiredDate) || "";
      newTags.push("NEAR_EXPIRATION");
    }
  } // if (isActive) newTags.push("DEAL");


  if (deal && deal.canUse) {
    newTags.push("DEAL");
  }

  if (campaign && campaign !== null && campaign !== void 0 && campaign.isValid) {
    newTags.push("DEAL");
  }

  if (newTags.some(function (tag) {
    return tagHideHoaDonNhanh.includes(tag);
  })) {
    var indexTagHoaDonNhanh = newTags.indexOf(HOADONNHANH);
    newTags.splice(indexTagHoaDonNhanh, 1);
  }

  var newTagItems = newTags === null || newTags === void 0 ? void 0 : (_newTags$map = newTags.map(function (tag) {
    return convertTag({
      tag: tag,
      listTags: listTags,
      expiredDate: expiredDate
    });
  })) === null || _newTags$map === void 0 ? void 0 : _newTags$map.filter(function (item) {
    return item;
  });
  newTagItems = newTagItems.sort(function (a, b) {
    return ((b === null || b === void 0 ? void 0 : b.index) || 10) - ((a === null || a === void 0 ? void 0 : a.index) || 10);
  });
  var tagPriorityCur = ((_newTagItems = newTagItems) === null || _newTagItems === void 0 ? void 0 : _newTagItems.splice(0, 3)) || [];
  var tagsElement = tagPriorityCur === null || tagPriorityCur === void 0 ? void 0 : tagPriorityCur.map(function (tag) {
    return ProductTagItem(tag);
  });
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [tagsElement, " ", ((_newTagItems2 = newTagItems) === null || _newTagItems2 === void 0 ? void 0 : _newTagItems2.length) > 0 && /*#__PURE__*/jsxRuntime.jsx(AdditionalTooltip, {
      tags: newTagItems,
      listTags: listTags,
      expiredDate: expiredDate
    })]
  });
};
 // @SP_Centrum Silver Adults 50+ (Demo)

var img$5 = "data:image/svg+xml,%3csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M15.506 4.568C15.506 4.52 15.506 4.472 15.506 4.424L13.994 0.68C13.934 0.524 13.838 0.403999 13.706 0.319999C13.574 0.224 13.424 0.182 13.256 0.194H2.744C2.588 0.194 2.45 0.241999 2.33 0.337999C2.21 0.421999 2.12 0.536 2.06 0.68L0.548 4.424C0.548 4.472 0.548 4.52 0.548 4.568C0.524 4.604 0.506 4.646 0.494 4.694C0.506 5.222 0.644 5.714 0.908 6.17C1.184 6.626 1.55 6.986 2.006 7.25V14.45C2.006 14.654 2.078 14.828 2.222 14.972C2.366 15.128 2.54 15.206 2.744 15.206H13.256C13.46 15.206 13.634 15.128 13.778 14.972C13.922 14.828 13.994 14.654 13.994 14.45V7.286C14.462 7.022 14.828 6.662 15.092 6.206C15.368 5.738 15.506 5.234 15.506 4.694C15.518 4.646 15.518 4.604 15.506 4.568ZM8.756 13.694H7.244V10.706H8.756V13.694ZM12.5 13.694H10.25V9.95C10.25 9.746 10.172 9.572 10.016 9.428C9.872 9.272 9.698 9.194 9.494 9.194H6.506C6.302 9.194 6.122 9.272 5.966 9.428C5.822 9.572 5.75 9.746 5.75 9.95V13.694H3.5V7.7C3.932 7.7 4.34 7.61 4.724 7.43C5.12 7.238 5.462 6.98 5.75 6.656C6.038 6.98 6.374 7.232 6.758 7.412C7.154 7.58 7.568 7.664 8 7.664C8.432 7.664 8.84 7.58 9.224 7.412C9.62 7.232 9.962 6.98 10.25 6.656C10.538 6.98 10.874 7.238 11.258 7.43C11.654 7.61 12.068 7.7 12.5 7.7V13.694ZM12.5 6.206C12.08 6.206 11.726 6.062 11.438 5.774C11.15 5.474 11.006 5.114 11.006 4.694C11.006 4.49 10.928 4.316 10.772 4.172C10.628 4.016 10.454 3.938 10.25 3.938C10.046 3.938 9.866 4.016 9.71 4.172C9.566 4.316 9.494 4.49 9.494 4.694C9.494 5.102 9.344 5.456 9.044 5.756C8.756 6.044 8.408 6.188 8 6.188C7.592 6.188 7.238 6.044 6.938 5.756C6.65 5.456 6.506 5.102 6.506 4.694C6.506 4.49 6.428 4.316 6.272 4.172C6.128 4.016 5.954 3.938 5.75 3.938C5.546 3.938 5.366 4.016 5.21 4.172C5.066 4.316 4.994 4.49 4.994 4.694C5.006 5.102 4.874 5.462 4.598 5.774C4.322 6.074 3.974 6.236 3.554 6.26C3.146 6.272 2.786 6.14 2.474 5.864C2.174 5.576 2.018 5.228 2.006 4.82L3.266 1.706H12.734L13.994 4.82C13.97 5.216 13.814 5.546 13.526 5.81C13.238 6.074 12.896 6.206 12.5 6.206Z' fill='%233958A9'/%3e%3c/svg%3e";

var TAG_HOA_DON_NHANH = "HOADONNHANH";

var SellerInfo = function SellerInfo(_ref) {
  var _ref$skuInfo = _ref.skuInfo,
      skuInfo = _ref$skuInfo === void 0 ? {} : _ref$skuInfo;

  var _ref2 = skuInfo || {},
      sellerInfo = _ref2.sellerInfo,
      tags = _ref2.tags;

  var sellerData = React.useMemo(function () {
    var sellerName = "";

    if (sellerInfo) {
      var _ref3 = sellerInfo || {},
          sellerType = _ref3.sellerType,
          sellerClass = _ref3.sellerClass,
          name = _ref3.name;

      var isVAT = (tags === null || tags === void 0 ? void 0 : tags.indexOf(TAG_HOA_DON_NHANH)) >= 0 || false;

      if (sellerClass === "INTERNAL") {
        if (isVAT) {
          sellerName = "MEDX";
        }
      } else if (sellerType === "ENTERPRISE") {
        sellerName = name || "";
      } else {
        sellerName = "Đối tác của thuocsi.vn";
      }
    }

    return {
      sellerName: sellerName
    };
  }, [skuInfo]);
  return sellerData !== null && sellerData !== void 0 && sellerData.sellerName ? /*#__PURE__*/jsxRuntime.jsx(EllipsisText, {
    children: /*#__PURE__*/jsxRuntime.jsx("p", {
      className: style$e.content,
      children: /*#__PURE__*/jsxRuntime.jsxs("span", {
        children: [/*#__PURE__*/jsxRuntime.jsx("img", {
          className: style$e["seller-image"],
          src: img$5
        }), " ", sellerData === null || sellerData === void 0 ? void 0 : sellerData.sellerName]
      })
    })
  }) : null;
};

var ProductItem = function ProductItem(_ref) {
  var isTagItem = _ref.isTagItem,
      skuInfo = _ref.skuInfo,
      action = _ref.action;
  var url = productUrl(skuInfo);

  var _useContext = React.useContext(ChatSettingContext),
      listTags = _useContext.listTags;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      openModal = _useState2[0],
      setOpenModal = _useState2[1];

  var handleOpenModal = function handleOpenModal(e) {
    e.stopPropagation();
    setOpenModal(true);
  };

  var handleCloseModal = function handleCloseModal(e) {
    setOpenModal(false);
  };

  return /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
    sx: {
      width: "100%"
    },
    children: [skuInfo.imageUrls && skuInfo.imageUrls.length > 0 && /*#__PURE__*/jsxRuntime.jsx(ProductImageModal, {
      skuInfo: skuInfo,
      open: openModal,
      handleCloseModal: handleCloseModal
    }), /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
      direction: "row",
      justifyContent: "space-between",
      sx: _objectSpread2({}, action && {
        paddingRight: "35px",
        position: "relative"
      }),
      children: [/*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
        direction: "row",
        spacing: 1,
        sx: {
          width: "100%"
        },
        children: [skuInfo.imageUrls && skuInfo.imageUrls.length > 0 ? /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
          component: "img",
          src: getImageProxy(skuInfo.imageUrls[0]),
          sx: {
            marinTop: "2px",
            width: isTagItem ? "52px" : "4rem",
            height: isTagItem ? "52px" : "4rem",
            objectFit: "cover",
            overflow: "hidden",
            flexShrink: 0,
            "&:hover": {
              cursor: "pointer"
            }
          },
          onClick: handleOpenModal
        }) : /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
          component: "img",
          src: img$i,
          sx: {
            marinTop: "2px",
            width: "4rem",
            height: "4rem",
            objectFit: "cover",
            overflow: "hidden",
            flexShrink: 0
          }
        }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
          sx: {
            width: "100%"
          },
          children: [/*#__PURE__*/jsxRuntime.jsx(EllipsisText, {
            children: /*#__PURE__*/jsxRuntime.jsx("a", {
              href: url,
              target: "_blank",
              className: style$e["product-name"],
              children: skuInfo.name
            })
          }), /*#__PURE__*/jsxRuntime.jsx(SellerInfo, {
            skuInfo: skuInfo
          }), /*#__PURE__*/jsxRuntime.jsx("p", {
            className: style$e.content,
            children: skuInfo.volume || "Đang cập nhật"
          }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
            className: style$e.content,
            children: [/*#__PURE__*/jsxRuntime.jsxs("span", {
              className: style$e["current-price"],
              children: [numberFormatDotSeperated(skuInfo.price.currentPrice), " "]
            }), skuInfo.price.currentPrice !== skuInfo.price.originalPrice && /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                className: style$e["original-price"],
                children: numberFormatDotSeperated(skuInfo.price.originalPrice)
              }), !!skuInfo.price.percentageDiscount && /*#__PURE__*/jsxRuntime.jsxs("span", {
                className: style$e["percentage-discount"],
                children: [" -", skuInfo.price.percentageDiscount, "%"]
              })]
            })]
          }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
            style: {
              display: 'flex'
            },
            children: /*#__PURE__*/jsxRuntime.jsx(ProductTags, {
              skuInfo: skuInfo,
              listTags: listTags
            })
          })]
        })]
      }), action && /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
        direction: "column",
        spacing: 1,
        sx: {
          position: "absolute",
          top: "-5px",
          right: "-5px"
        },
        children: [/*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
          href: url,
          target: "_blank",
          size: "small",
          children: /*#__PURE__*/jsxRuntime.jsx(LaunchIcon__default["default"], {
            sx: {
              color: "#15A959"
            }
          })
        }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
          onClick: function onClick() {
            action.openSupportTicketWindow(skuInfo);
          },
          size: "small",
          sx: {
            '& svg path': {
              fill: '#15A959'
            },
            '& svg': {
              transform: 'scale(calc(22/24))'
            }
          },
          children: /*#__PURE__*/jsxRuntime.jsx(SvgCreateTicket, {})
        })]
      })]
    })]
  });
};

var MessageImageList = function MessageImageList(_ref) {
  var images = _ref.images;
  return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
    children: /*#__PURE__*/jsxRuntime.jsx(ImageList__default["default"], {
      variant: "masonry",
      cols: 2,
      gap: 8,
      children: images.map(function (item, index) {
        var url = item.blobURL ? getImageProxy(item.blobURL) : getImageProxy(item.url);
        return /*#__PURE__*/jsxRuntime.jsx(ImageListItem__default["default"], {
          sx: {
            display: 'block'
          },
          children: /*#__PURE__*/jsxRuntime.jsx(ImagePopupWrapper, {
            media: item,
            children: /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
              component: "img",
              alt: item.name || "",
              src: url,
              srcSet: url,
              sx: {
                display: 'block',
                maxWidth: '100%',
                height: 'auto',
                // borderRadius: '0.85rem',
                cursor: 'pointer'
              }
            })
          })
        }, index);
      })
    })
  });
};

var ReactInfo = function ReactInfo(_ref) {
  var reactInfo = _ref.reactInfo;
  return /*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
    direction: "row",
    spacing: 0.5,
    alignItems: "center",
    children: reactInfo.map(function (item) {
      if (item.value > 0) {
        return /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
          direction: "row",
          alignItems: "center",
          spacing: 0.3,
          sx: {
            background: "#E8F5FC",
            padding: "2px",
            borderRadius: "2rem",
            '& span': {
              color: "black"
            }
          },
          children: [/*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
            dangerouslySetInnerHTML: {
              __html: item.key
            },
            sx: {
              fontSize: "1rem"
            }
          }), item.value > 1 && /*#__PURE__*/jsxRuntime.jsx("span", {
            children: item.value
          })]
        }, item.key);
      }

      return "";
    })
  });
};

var id = 0;
var SOCKET_ON_MESSAGE_CONVERSATION = id++;
var SOCKET_ON_MESSAGE_NOT_CONVERSATION = id++;
var SOCKET_ON_MESSAGE_SEEN = id++;
var HANDLE_REPLY_MESSAGE = id++;
var SEND_MESSAGE = id++;
var LEAVE_CONVERSATION = id++;
var DELETE_CONVERSATION = id++;
var SEND_RAW_MESSAGE = id++;
var RESET_DATA = id++;
var SEND_ERROR_MESSAGE = id++;
var HAS_ERROR = id++;
var SET_CURRENT_CONVERSATION = id++;
var TOGGLE_PIN = id++;
var UPDATE_SELECTED_CONVERSATION = id++;
var SOCKET_CONVERSATION_STATUS = id++;
var SOCKET_CONVERSATION_STATUS_NOT = id++;
var REACT_MESSAGE = id++;
var UNREACT_MESSAGE = id++;
var UPDATE_CONVERSATION_ONLINE_STATUS = id++;
var UPDATE_TOPICIDS = id++;
var LOADING_FILTER_MESSAGE_BY_DATE = id++;
var FILTER_MESSAGE_BY_DATE = id++;
var FIND_REPLY_MESSAGE = id++;
var LOADING_FIND_REPLY_MESSAGE = id++;
var HANDLE_MESSAGE_AROUND_MESSAGE = id++;
var UPDATE_FOUND_MESSAGE = id++;
var LOAD_MESSAGE = id++;
var LOADING_MESSAGE = id++;
var LOADING_TAG = id++;
var LOAD_TAG = id++;
var LOAD_RESOURCE = id++;
var LOADING_RESOURCE = id++;
var HANDLE_SEEN_MESSAGE = id++;
var ADD_CONVERSATION_ID = id++;
var UPDATE_SEEN = id++;
var CREATE_SELLER_CONVERSATION = id++;
var LOAD_CONVERSATION = id++;
var LOADING_CONVERSATION = id++;
var UPDATE_TOTAL_UNREAD_MESSAGE = id++;
var ACTION = {
  SOCKET_ON_MESSAGE_CONVERSATION: SOCKET_ON_MESSAGE_CONVERSATION,
  SOCKET_ON_MESSAGE_NOT_CONVERSATION: SOCKET_ON_MESSAGE_NOT_CONVERSATION,
  SOCKET_ON_MESSAGE_SEEN: SOCKET_ON_MESSAGE_SEEN,
  HANDLE_REPLY_MESSAGE: HANDLE_REPLY_MESSAGE,
  SEND_MESSAGE: SEND_MESSAGE,
  LEAVE_CONVERSATION: LEAVE_CONVERSATION,
  DELETE_CONVERSATION: DELETE_CONVERSATION,
  SEND_RAW_MESSAGE: SEND_RAW_MESSAGE,
  LOAD_RESOURCE: LOAD_RESOURCE,
  LOADING_RESOURCE: LOADING_RESOURCE,
  LOAD_TAG: LOAD_TAG,
  LOADING_TAG: LOADING_TAG,
  RESET_DATA: RESET_DATA,
  SEND_ERROR_MESSAGE: SEND_ERROR_MESSAGE,
  HAS_ERROR: HAS_ERROR,
  SET_CURRENT_CONVERSATION: SET_CURRENT_CONVERSATION,
  TOGGLE_PIN: TOGGLE_PIN,
  UPDATE_SELECTED_CONVERSATION: UPDATE_SELECTED_CONVERSATION,
  SOCKET_CONVERSATION_STATUS: SOCKET_CONVERSATION_STATUS,
  SOCKET_CONVERSATION_STATUS_NOT: SOCKET_CONVERSATION_STATUS_NOT,
  REACT_MESSAGE: REACT_MESSAGE,
  UNREACT_MESSAGE: UNREACT_MESSAGE,
  UPDATE_CONVERSATION_ONLINE_STATUS: UPDATE_CONVERSATION_ONLINE_STATUS,
  UPDATE_TOPICIDS: UPDATE_TOPICIDS,
  LOADING_FILTER_MESSAGE_BY_DATE: LOADING_FILTER_MESSAGE_BY_DATE,
  FILTER_MESSAGE_BY_DATE: FILTER_MESSAGE_BY_DATE,
  FIND_REPLY_MESSAGE: FIND_REPLY_MESSAGE,
  LOADING_FIND_REPLY_MESSAGE: LOADING_FIND_REPLY_MESSAGE,
  HANDLE_MESSAGE_AROUND_MESSAGE: HANDLE_MESSAGE_AROUND_MESSAGE,
  UPDATE_FOUND_MESSAGE: UPDATE_FOUND_MESSAGE,
  LOAD_MESSAGE: LOAD_MESSAGE,
  LOADING_MESSAGE: LOADING_MESSAGE,
  HANDLE_SEEN_MESSAGE: HANDLE_SEEN_MESSAGE,
  ADD_CONVERSATION_ID: ADD_CONVERSATION_ID,
  UPDATE_SEEN: UPDATE_SEEN,
  CREATE_SELLER_CONVERSATION: CREATE_SELLER_CONVERSATION,
  LOAD_CONVERSATION: LOAD_CONVERSATION,
  LOADING_CONVERSATION: LOADING_CONVERSATION,
  UPDATE_TOTAL_UNREAD_MESSAGE: UPDATE_TOTAL_UNREAD_MESSAGE
};

var handleSeenResult = function handleSeenResult(conversation, seenResult) {
  for (var i = 0; i < conversation.members.length; i++) {
    if (conversation.members[i].userID === seenResult.userID) {
      conversation.members[i] = seenResult;
      break;
    }
  }
}; //for debug only


var printAction = function printAction(action) {
  Object.keys(ACTION).forEach(function (item) {
    if (ACTION[item] === action.type) {
      printLog("Dispatch: ", {
        type: item,
        payload: action.payload
      });
    }
  });
}; //=============


var reducer = function reducer(state, action) {
  var type = action.type,
      payload = action.payload;
  printAction(action);

  switch (type) {
    case ACTION.SOCKET_ON_MESSAGE_CONVERSATION:
      {
        var message = payload.message;

        var conversationCopy = _objectSpread2({}, state.currentConversation);

        var conversationListCopy = _toConsumableArray(state.listConversation);

        var listMessage = _toConsumableArray(state.listMessage);

        var n = conversationCopy.length;
        var isNewForListFlag = isAtBottomOfConversation(conversationCopy, listMessage);
        conversationCopy.lastMessage = _objectSpread2({}, message);
        conversationCopy.totalMessage++;
        conversationCopy.unreadMessage = (conversationCopy.unreadMessage || 0) + 1;

        for (var j = 0; j < conversationCopy.members.length; j++) {
          if (conversationCopy.members[j].userID === message.senderID) {
            conversationCopy.members[j].lastMessageSeen = message.messageID;
            break;
          }
        }

        for (var i = 0; i < n; i++) {
          if (conversationListCopy[i].conversationID === conversationCopy.conversationID) {
            conversationListCopy[i] = _objectSpread2({}, conversationCopy);
            break;
          }
        }

        conversationListCopy = sortConversationList(conversationListCopy);
        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentConversation: _objectSpread2({}, conversationCopy),
          listConversation: _toConsumableArray(conversationListCopy)
        }, isNewForListFlag && {
          listMessage: [].concat(_toConsumableArray(listMessage), [_objectSpread2({}, message)])
        });
      }

    case ACTION.SOCKET_ON_MESSAGE_NOT_CONVERSATION:
      {
        var _message = payload.message,
            accountID = payload.accountID;

        var _conversationCopy = _toConsumableArray(state.listConversation).map(function (item) {
          return _objectSpread2({}, item);
        });

        var _n = _conversationCopy.length;

        for (var _i = 0; _i < _n; _i++) {
          if (_conversationCopy[_i].conversationID === _message.conversationID) {
            _conversationCopy[_i].lastMessage = _objectSpread2({}, _message);
            _conversationCopy[_i].totalMessage++;

            if (_message.senderID !== accountID) {
              _conversationCopy[_i].unreadMessage = (_conversationCopy[_i].unreadMessage || 0) + 1;
            }

            for (var _j = 0; _j < _conversationCopy[_i].members.length; _j++) {
              if (_conversationCopy[_i].members[_j].userID === _message.senderID) {
                _conversationCopy[_i].members[_j].lastMessageSeen = _message.messageID;
                _conversationCopy[_i].members[_j].seenMessageOrder = _message.messageOrder;
                _conversationCopy[_i].members[_j].seenAt = new Date();
                break;
              }
            }

            break;
          }
        }

        _conversationCopy = sortConversationList(_conversationCopy);
        return _objectSpread2(_objectSpread2({}, state), {}, {
          listConversation: _toConsumableArray(_conversationCopy)
        }, _message.senderID !== accountID && {
          totalUnreadMessage: state.totalUnreadMessage + 1
        });
      }

    case ACTION.SOCKET_ON_MESSAGE_SEEN:
      {
        var seenResult = payload.seenResult;
            payload.userID;

        var _conversationCopy2 = _toConsumableArray(state.listConversation);

        var _n2 = _conversationCopy2.length;

        for (var _i2 = 0; _i2 < _n2; _i2++) {
          if (_conversationCopy2[_i2].conversationID === seenResult.conversationID) {
            for (var _j2 = 0; _j2 < _conversationCopy2[_i2].members.length; _j2++) {
              if (_conversationCopy2[_i2].members[_j2].userID === seenResult.userID) {
                _conversationCopy2[_i2].members[_j2].lastMessageSeen = seenResult.messageID;
                break;
              }
            }

            break;
          }
        }

        _conversationCopy2 = sortConversationList(_conversationCopy2);
        return _objectSpread2(_objectSpread2({}, state), {}, {
          listConversation: _conversationCopy2
        });
      }

    case ACTION.LOAD_MESSAGE:
      {
        var _listMessage = payload.listMessage,
            _type = payload.type;
        var messagePagination = state.messagePagination,
            currentConversation = state.currentConversation;

        if (_type === "top") {
          var _listMessage$;

          return _objectSpread2(_objectSpread2({}, state), {}, {
            loading: _objectSpread2(_objectSpread2({}, state.loading), {}, {
              messageList: false
            }),
            listMessage: [].concat(_toConsumableArray(_listMessage), _toConsumableArray(state.listMessage)),
            messagePagination: _objectSpread2(_objectSpread2({}, state.messagePagination), {}, {
              isOver: _listMessage.length === 0 || ((_listMessage$ = _listMessage[0]) === null || _listMessage$ === void 0 ? void 0 : _listMessage$.messageOrder) === 1
            })
          });
        } else {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            loading: {
              messageList: false
            },
            listMessage: [].concat(_toConsumableArray(state.listMessage), _toConsumableArray(_listMessage)),
            messagePagination: _objectSpread2(_objectSpread2({}, messagePagination), {}, {
              isOverBottom: _listMessage.length < messagePagination.limit || _listMessage[_listMessage.length - 1].messageOrder === currentConversation.totalMessage
            })
          });
        }
      }

    case ACTION.HANDLE_SEEN_MESSAGE:
      {
        var _seenResult = payload.seenResult;

        var listConversationCopy = _toConsumableArray(state.listConversation);

        var _conversationCopy3 = _objectSpread2({}, state.currentConversation);

        if (_seenResult) {
          _conversationCopy3.unreadMessage = 0;
          handleSeenResult(_conversationCopy3, _seenResult);
          var _n3 = listConversationCopy.length;

          for (var _i3 = 0; _i3 < _n3; _i3++) {
            if (listConversationCopy[_i3].conversationID === _conversationCopy3.conversationID) {
              listConversationCopy[_i3] === _objectSpread2({}, _conversationCopy3);
              break;
            }
          }

          listConversationCopy = sortConversationList(listConversationCopy);
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentConversation: _objectSpread2({}, _conversationCopy3),
          listConversation: _toConsumableArray(listConversationCopy)
        });
      }

    case ACTION.SEND_MESSAGE:
      {
        var _message2 = payload.message,
            rawId = payload.rawId;
        var listConversation = state.listConversation;

        var copy = _toConsumableArray(listConversation);

        var _conversationCopy4 = _objectSpread2({}, state.currentConversation);

        var _n4 = copy.length;

        for (var _i4 = 0; _i4 < _n4; _i4++) {
          var _state$currentConvers;

          if (copy[_i4].conversationID === ((_state$currentConvers = state.currentConversation) === null || _state$currentConvers === void 0 ? void 0 : _state$currentConvers.conversationID)) {
            copy[_i4].lastMessage = _message2;
            copy[_i4].unreadMessage = 0;
            copy[_i4].seenMessageOrder = _message2.messageOrder;
            copy[_i4].totalMessage++;
            copy[_i4].conversationStatus = ConversationStatus.PROCESSING;
            copy[_i4].rawID = null;

            for (var _j3 = 0; _j3 < copy[_i4].members.length; _j3++) {
              if (copy[_i4].members[_j3].userID === _message2.senderID) {
                copy[_i4].members[_j3] = _objectSpread2(_objectSpread2({}, copy[_i4].members[_j3]), {}, {
                  lastMessageID: _message2.messageID,
                  lastMessageSeen: _message2.messageID,
                  seenAt: new Date(),
                  seenMessageOrder: _message2.messageOrder
                });
                break;
              }
            }

            _conversationCopy4 = _objectSpread2(_objectSpread2({}, _conversationCopy4), copy[_i4]);
            break;
          }
        }

        copy = sortConversationList(copy);

        var _loop = function _loop(_i5) {
          if (state.listMessage[_i5].messageID === rawId) {
            var media = null;

            if (_message2.media) {
              media = _toConsumableArray(_message2.media).map(function (item, index) {
                return _objectSpread2(_objectSpread2({}, item), {}, {
                  blobURL: state.listMessage[_i5].media[index].url
                });
              });
            }

            state.listMessage[_i5] = _objectSpread2(_objectSpread2({}, _message2), media && {
              media: media
            });
            return "break";
          }
        };

        for (var _i5 = state.listMessage.length - 1; _i5 >= 0; _i5--) {
          var _ret = _loop(_i5);

          if (_ret === "break") break;
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          listConversation: _toConsumableArray(copy),
          currentConversation: _objectSpread2({}, _conversationCopy4),
          listMessage: _toConsumableArray(state.listMessage)
        });
      }

    case ACTION.SEND_RAW_MESSAGE:
      {
        var _message3 = payload.message;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          listMessage: [].concat(_toConsumableArray(state.listMessage), [_objectSpread2({}, _message3)])
        });
      }

    case ACTION.SEND_ERROR_MESSAGE:
      {
        var _rawId = payload.rawId;

        for (var _i6 = state.listMessage.length - 1; _i6 >= 0; _i6--) {
          if (state.listMessage[_i6].messageID === _rawId) {
            state.listMessage[_i6] = _objectSpread2(_objectSpread2({}, state.listMessage[_i6]), {}, {
              status: "ERROR"
            });
            break;
          }
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          listMessage: _toConsumableArray(state.listMessage)
        });
      }

    case ACTION.LEAVE_CONVERSATION:
      {
        return _objectSpread2({}, state);
      }

    case ACTION.DELETE_CONVERSATION:
      {
        return _objectSpread2({}, state);
      }

    case ACTION.LOADING_RESOURCE:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          loading: _objectSpread2(_objectSpread2({}, state.loading), {}, {
            resourceList: true
          }),
          listResource: [],
          resourcePagination: initialState.resourcePagination
        });
      }

    case ACTION.LOAD_RESOURCE:
      {
        var res = payload.res;
        var resourcePagination = state.resourcePagination,
            listResource = state.listResource;
        var newListResource = [];

        if (res.status === "OK") {
          newListResource = (res === null || res === void 0 ? void 0 : res.data) || [];
        } else {
          resourcePagination.isOver = true;
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          loading: _objectSpread2(_objectSpread2({}, state.loading), {}, {
            resourceList: false
          }),
          listResource: [].concat(_toConsumableArray(listResource), _toConsumableArray(newListResource)),
          resourcePagination: _objectSpread2(_objectSpread2({}, resourcePagination), {}, {
            page: resourcePagination.page + 1
          })
        });
      }

    case ACTION.LOADING_TAG:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          loading: _objectSpread2(_objectSpread2({}, state.loading), {}, {
            tagList: true
          }),
          listTags: [],
          tagPagination: initialState.tagPagination
        });
      }

    case ACTION.LOAD_TAG:
      {
        var _res = payload.res;
        var newListTags = [];
        var tagPagination = state.tagPagination,
            listTags = state.listTags;

        if (_res.status === "OK") {
          newListTags = (_res === null || _res === void 0 ? void 0 : _res.data) || [];
        } else {
          tagPagination.isOver = true;
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          loading: _objectSpread2(_objectSpread2({}, state.loading), {}, {
            tagList: false
          }),
          listTags: [].concat(_toConsumableArray(listTags), _toConsumableArray(newListTags)),
          tagPagination: _objectSpread2(_objectSpread2({}, tagPagination), {}, {
            page: tagPagination.page + 1
          })
        });
      }

    case ACTION.RESET_DATA:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          listResource: {
            media: [],
            file: []
          },
          resourcePagination: {
            media: {
              page: 1,
              limit: 20,
              isOver: false,
              total: 0,
              fromMessageID: null
            },
            file: {
              page: 1,
              limit: 20,
              isOver: false,
              total: 0,
              fromMessageID: null
            }
          }
        });
      }

    case ACTION.HAS_ERROR:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          error: payload.error,
          loading: {}
        });
      }

    case ACTION.SET_CURRENT_CONVERSATION:
      {
        var conversation = payload.conversation;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentConversation: _objectSpread2(_objectSpread2({}, state.currentConversation), conversation)
        });
      }

    case ACTION.TOGGLE_PIN:
      {
        var _conversation = payload.conversation;

        var _copy = _toConsumableArray(state.listConversation);

        var newList = _copy.filter(function (item) {
          return item.conversationID !== _conversation.conversationID;
        });

        var listConversationResult = [_conversation].concat(_toConsumableArray(newList));
        listConversationResult = sortConversationList(listConversationResult);
        return _objectSpread2(_objectSpread2({}, state), {}, {
          listConversation: listConversationResult
        });
      }

    case ACTION.UPDATE_SELECTED_CONVERSATION:
      {
        var _conversation2 = payload.conversation;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          listMessage: [],
          foundMessage: null,
          messagePagination: initialState.messagePagination,
          currentConversation: _conversation2
        });
      }

    case ACTION.ADD_CONVERSATION_ID:
      {
        var _conversation3$member, _listConversationCopy2;

        var messageData = payload.messageData,
            accountType = payload.accountType;

        var _conversation3 = _objectSpread2(_objectSpread2({}, state.currentConversation), {}, {
          conversationID: messageData.conversationID
        });

        var _listConversationCopy = _toConsumableArray(state.listConversation);

        if (!((_conversation3$member = _conversation3.members) !== null && _conversation3$member !== void 0 && _conversation3$member.length)) {
          _conversation3.members = [{
            conversationID: messageData.conversationID,
            accountType: accountType,
            userID: messageData.senderID,
            status: "ACTIVATED",
            lastMessageID: messageData.messageID || null,
            lastMessageSeen: messageData.messageID || null
          }];
        }

        if ((_listConversationCopy2 = _listConversationCopy) !== null && _listConversationCopy2 !== void 0 && _listConversationCopy2.length) {
          _listConversationCopy = _listConversationCopy.map(function (conversationItem) {
            if (conversationItem.rawID === _conversation3.rawID) {
              return _conversation3;
            }

            return conversationItem;
          });
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentConversation: _conversation3,
          listConversation: _toConsumableArray(_listConversationCopy)
        });
      }

    case ACTION.LOADING_MESSAGE:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          listMessage: [],
          messagePagination: initialState.messagePagination,
          loading: {
            messageList: true
          }
        });
      }

    case ACTION.SOCKET_CONVERSATION_STATUS_NOT:
      {
        var statusData = payload.statusData;

        var _conversationCopy5 = _toConsumableArray(state.listConversation);

        var _n5 = _conversationCopy5.length;

        for (var _i7 = 0; _i7 < _n5; _i7++) {
          if (_conversationCopy5[_i7].conversationID === statusData.conversationID) {
            _conversationCopy5[_i7].conversationStatus = statusData.conversationStatus;

            if (statusData.issueTime) {
              _conversationCopy5[_i7].issueTime = statusData.issueTime;
            }

            if (statusData.customerSupportID) {
              _conversationCopy5[_i7].customerSupportID = statusData.customerSupportID;
            }

            break;
          }
        }

        _conversationCopy5 = sortConversationList(_conversationCopy5);
        return _objectSpread2(_objectSpread2({}, state), {}, {
          listConversation: _conversationCopy5
        });
      }

    case ACTION.SOCKET_CONVERSATION_STATUS:
      {
        var _statusData = payload.statusData;

        var _conversationCopy6 = _toConsumableArray(state.listConversation);

        var _currentConversation = _objectSpread2({}, state.currentConversation);

        var _n6 = _conversationCopy6.length;

        for (var _i8 = 0; _i8 < _n6; _i8++) {
          if (_conversationCopy6[_i8].conversationID === _statusData.conversationID) {
            _conversationCopy6[_i8].conversationStatus = _statusData.conversationStatus;

            if (_statusData.issueTime) {
              _conversationCopy6[_i8].issueTime = _statusData.issueTime;
            }

            if (_statusData.customerSupportID) {
              _conversationCopy6[_i8].customerSupportID = _statusData.customerSupportID;
            }

            _currentConversation = _conversationCopy6[_i8];
            break;
          }
        }

        _conversationCopy6 = sortConversationList(_conversationCopy6);
        return _objectSpread2(_objectSpread2({}, state), {}, {
          listConversation: _conversationCopy6,
          currentConversation: _currentConversation
        });
      }

    case ACTION.REACT_MESSAGE:
      {
        var emoji = payload.emoji,
            messageID = payload.messageID,
            _message4 = payload.message;

        var _listMessage2 = _toConsumableArray(state.listMessage).map(function (item) {
          return _objectSpread2({}, item);
        });

        var _n7 = _listMessage2.length;

        for (var _i9 = 0; _i9 < _n7; _i9++) {
          if (_listMessage2[_i9].messageID === messageID) {
            _listMessage2[_i9] = _objectSpread2(_objectSpread2({}, _listMessage2[_i9]), {}, {
              currentReact: emoji,
              reactInfo: _message4.reactInfo
            });
            break;
          }
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          listMessage: _toConsumableArray(_listMessage2)
        });
      }

    case ACTION.UNREACT_MESSAGE:
      {
        payload.emoji;
            var _messageID = payload.messageID,
            _message5 = payload.message;

        var _listMessage3 = _toConsumableArray(state.listMessage).map(function (item) {
          return _objectSpread2({}, item);
        });

        var _n8 = _listMessage3.length;

        for (var _i10 = 0; _i10 < _n8; _i10++) {
          if (_listMessage3[_i10].messageID === _messageID) {
            _listMessage3[_i10] = _objectSpread2(_objectSpread2({}, _listMessage3[_i10]), {}, {
              currentReact: null,
              reactInfo: _message5.reactInfo
            });
            break;
          }
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          listMessage: _toConsumableArray(_listMessage3)
        });
      }

    case ACTION.LOADING_FILTER_MESSAGE_BY_DATE:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          loading: _objectSpread2(_objectSpread2({}, state.loading), {}, {
            messageList: true
          }),
          messagePagination: _objectSpread2(_objectSpread2({}, state.messagePagination), {}, {
            // isOverBottom: false,
            isOver: false
          })
        });
      }

    case ACTION.LOADING_FIND_REPLY_MESSAGE:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          loading: _objectSpread2(_objectSpread2({}, state.loading), {}, {
            messageList: true
          }),
          messagePagination: _objectSpread2(_objectSpread2({}, state.messagePagination), {}, {
            // isOverBottom: false,
            isOver: false
          })
        });
      }

    case ACTION.HANDLE_MESSAGE_AROUND_MESSAGE:
      {
        var _listMessage4$;

        var _listMessage4 = payload.listMessage;
        var _currentConversation2 = state.currentConversation;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          loading: _objectSpread2(_objectSpread2({}, state.loading), {}, {
            messageList: false
          }),
          listMessage: _listMessage4,
          messagePagination: _objectSpread2(_objectSpread2({}, state.messagePagination), {}, {
            isOver: _listMessage4.length < 2 || ((_listMessage4$ = _listMessage4[0]) === null || _listMessage4$ === void 0 ? void 0 : _listMessage4$.messageOrder) === 1,
            isOverBottom: _listMessage4.length < 2 || _listMessage4[_listMessage4.length - 1].messageOrder === _currentConversation2.totalMessage
          })
        });
      }

    case ACTION.UPDATE_FOUND_MESSAGE:
      {
        var _message6 = payload.message;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          foundMessage: _message6
        });
      }

    case ACTION.UPDATE_SEEN:
      {
        var _seenResult2 = payload.seenResult;

        var _listConversationCopy3 = _toConsumableArray(state.listConversation);

        var _conversationCopy7 = _objectSpread2({}, state.currentConversation);

        var unreadMessage = state.currentConversation.unreadMessage || 0;
        handleSeenResult(_conversationCopy7, _seenResult2);
        _conversationCopy7.unreadMessage = 0;
        _conversationCopy7.seenMessageOrder = _seenResult2.messageOrder;
        var _n9 = _listConversationCopy3.length;

        for (var _i11 = 0; _i11 < _n9; _i11++) {
          if (_listConversationCopy3[_i11].conversationID === _seenResult2.conversationID) {
            _listConversationCopy3[_i11] = _objectSpread2({}, _conversationCopy7);
          }
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          listConversation: _toConsumableArray(_listConversationCopy3),
          currentConversation: _objectSpread2({}, _conversationCopy7),
          totalUnreadMessage: Math.max(0, state.totalUnreadMessage - unreadMessage)
        });
      }

    case ACTION.CREATE_SELLER_CONVERSATION:
      {
        var _sellerStore$logo;

        var sellerInfo = payload.sellerInfo;
        var sellerStore = sellerInfo.sellerStore || {};
        var sellerConversation = {
          sellerID: sellerInfo.accountID,
          sellerInfo: sellerInfo,
          customerSupportAvatar: ((_sellerStore$logo = sellerStore.logo) === null || _sellerStore$logo === void 0 ? void 0 : _sellerStore$logo[0]) || sellerInfo.avatar || img$m,
          conversationName: sellerStore.name || sellerInfo.name,
          conversationType: ConversationType.CUSTOMER_WITH_SELLER,
          conversationStatus: ConversationStatus.WAIT_TO_PROCESS,
          members: []
        };
        return _objectSpread2(_objectSpread2({}, state), {}, {
          listConversation: sortConversationList([].concat(_toConsumableArray(state.listConversation), [sellerConversation])),
          // listConversation: [...state.listConversation, sellerConversation],
          currentConversation: sellerConversation,
          listMessage: []
        });
      }

    case ACTION.LOADING_CONVERSATION:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          conversationPagination: initialState.conversationPagination,
          loading: _objectSpread2(_objectSpread2({}, state.loading), {}, {
            conversationList: true
          })
        });
      }

    case ACTION.LOAD_CONVERSATION:
      {
        var conversations = payload.conversations,
            isMore = payload.isMore,
            keyword = payload.keyword;
        var conversationPagination = state.conversationPagination,
            _listConversation = state.listConversation;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          listConversation: isMore ? [].concat(_toConsumableArray(_listConversation), _toConsumableArray(conversations.filter(function (conversation) {
            return !_listConversation.find(function (conversationItem) {
              return conversation.conversationID === conversationItem.conversationID;
            });
          }))) : conversations,
          conversationPagination: _objectSpread2(_objectSpread2({}, conversationPagination), {}, {
            isOver: conversations.length < conversationPagination.limit
          }),
          loading: _objectSpread2(_objectSpread2({}, state.loading), {}, {
            conversationList: false
          }),
          conversationFilter: {
            text: keyword
          }
        });
      }

    case ACTION.UPDATE_TOTAL_UNREAD_MESSAGE:
      {
        var totalUnreadMessage = payload.totalUnreadMessage;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          totalUnreadMessage: totalUnreadMessage
        });
      }

    default:
      return _objectSpread2({}, state);
  }
};

var URI_FILE_MANAGER = '/core/file-manager/v1';

var VideoClient = /*#__PURE__*/function (_APIClient) {
  _inherits(VideoClient, _APIClient);

  var _super = _createSuper(VideoClient);

  function VideoClient(ctx, data) {
    var _this;

    _classCallCheck(this, VideoClient);

    _this = _super.call(this, ctx, data);
    _this.ffmpeg = null;
    return _this;
  }

  _createClass(VideoClient, [{
    key: "createUploadFileLinkToGCSCustomer",
    value: function createUploadFileLinkToGCSCustomer(body) {
      return this.call("POST", "".concat(URI_FILE_MANAGER, "/upload/file-resumable"), body);
    }
  }, {
    key: "completeUploadToGCSCustomer",
    value: function completeUploadToGCSCustomer(body) {
      return this.call("PUT", "".concat(URI_FILE_MANAGER, "/upload/file-resumable"), body);
    }
  }, {
    key: "createUploadFileLinkToGCSGuest",
    value: function createUploadFileLinkToGCSGuest(body) {
      return this.call("POST", "".concat(URI_FILE_MANAGER, "/upload/file-resumable-without-auth"), body);
    }
  }, {
    key: "completeUploadToGCSGuest",
    value: function completeUploadToGCSGuest(body) {
      return this.call("PUT", "".concat(URI_FILE_MANAGER, "/upload/file-resumable-without-auth"), body);
    }
  }, {
    key: "uploadFileToGCS",
    value: function uploadFileToGCS(url, binaryBody, headers) {
      return fetch(url, {
        method: 'PUT',
        body: binaryBody,
        headers: headers
      });
    }
  }]);

  return VideoClient;
}(APIClient);

function getVideoClient(ctx, data) {
  return new VideoClient(ctx, data);
}

function uploadFileToGCS(_x, _x2, _x3) {
  return _uploadFileToGCS.apply(this, arguments);
}

function _uploadFileToGCS() {
  _uploadFileToGCS = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, binaryBody, headers) {
    var client;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client = getVideoClient();
            _context.next = 3;
            return client.uploadFileToGCS(url, binaryBody, headers);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _uploadFileToGCS.apply(this, arguments);
}

function createUploadFileLinkToGCSCustomer(_x4) {
  return _createUploadFileLinkToGCSCustomer.apply(this, arguments);
}

function _createUploadFileLinkToGCSCustomer() {
  _createUploadFileLinkToGCSCustomer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(body) {
    var client;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            client = getVideoClient();
            _context2.next = 3;
            return client.createUploadFileLinkToGCSCustomer(body);

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createUploadFileLinkToGCSCustomer.apply(this, arguments);
}

function completeUploadToGCSCustomer(_x5) {
  return _completeUploadToGCSCustomer.apply(this, arguments);
}

function _completeUploadToGCSCustomer() {
  _completeUploadToGCSCustomer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(body) {
    var client;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            client = getVideoClient();
            _context3.next = 3;
            return client.completeUploadToGCSCustomer(body);

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _completeUploadToGCSCustomer.apply(this, arguments);
}

function createUploadFileLinkToGCSGuest(_x6) {
  return _createUploadFileLinkToGCSGuest.apply(this, arguments);
}

function _createUploadFileLinkToGCSGuest() {
  _createUploadFileLinkToGCSGuest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(body) {
    var client;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            client = getVideoClient();
            _context4.next = 3;
            return client.createUploadFileLinkToGCSGuest(body);

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _createUploadFileLinkToGCSGuest.apply(this, arguments);
}

function completeUploadToGCSGuest(_x7) {
  return _completeUploadToGCSGuest.apply(this, arguments);
}

function _completeUploadToGCSGuest() {
  _completeUploadToGCSGuest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(body) {
    var client;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            client = getVideoClient();
            _context5.next = 3;
            return client.completeUploadToGCSGuest(body);

          case 3:
            return _context5.abrupt("return", _context5.sent);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _completeUploadToGCSGuest.apply(this, arguments);
}

function createChunks(file, cSize) {
  var startPointer = 0;
  var endPointer = file.size;
  var chunks = [];

  while (startPointer < endPointer) {
    var newStartPointer = startPointer + cSize;
    chunks.push(file.slice(startPointer, newStartPointer));
    startPointer = newStartPointer;
  }

  return chunks;
}
/**
 * Upload a file to Google Cloud Storage
 * @param file a file object to upload. Example: event.target.files[0]
 * @param beforeUploadHandler some action for before uploading, example: setLoadingScreen(false)
 * @param callAPIUploadLink this is the function call to backend service to get the uploadlink, params is the object for request body, make sure this function return the APIResponse object:
 *  - status
 *  - data
 *  - message
 * @param callAPIUploadFileToGCS this is the function for uploading file to GCS, params:
 * - url: the upload url
 * - body: the binary of file
 * - headers: the object for the headers to upload to GCS
 * this function return a fetch object like this:
 * ```javascript
 * fetch(url, {
 *  method: 'PUT',
 *  body,
 *  headers
 * })
 * ```
 * @param callAPICompleteUpload this is the function call to our backend service to get the update upload status, params is the object for request body, make sure this function return the APIResponse object:
 *  - status
 *  - data
 *  - message
 * @param onUploadSuccess the action when upload successfully, example: setLoading(false); alert('Successfully')
 * @param onUploadError the action when upload error, example: setLoading(false); alert('Upload fail....')
 */


function UploadFile(_x) {
  return _UploadFile.apply(this, arguments);
}

function _UploadFile() {
  _UploadFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var file, beforeUploadHandler, callAPIGetUploadLink, callAPIUploadFileToGCS, callAPICompleteUpload, onUploadSuccess, onUploadError, reqUploadVideo, resUploadVideo, data, uploadLink, chunks, chunkFirstByte, i, headers, _res, reqCompleUploadVideo, resCompleteUploadVideo;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            file = _ref.file, beforeUploadHandler = _ref.beforeUploadHandler, callAPIGetUploadLink = _ref.callAPIGetUploadLink, callAPIUploadFileToGCS = _ref.callAPIUploadFileToGCS, callAPICompleteUpload = _ref.callAPICompleteUpload, onUploadSuccess = _ref.onUploadSuccess, onUploadError = _ref.onUploadError;

            if (!(!file || !callAPIGetUploadLink || !callAPICompleteUpload || !callAPIUploadFileToGCS || !onUploadError)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            _context.prev = 3;

            if (beforeUploadHandler) {
              beforeUploadHandler();
            }

            reqUploadVideo = {
              filename: file.name,
              mime: file.type
            };
            _context.next = 8;
            return callAPIGetUploadLink(reqUploadVideo);

          case 8:
            resUploadVideo = _context.sent;

            if (!((resUploadVideo === null || resUploadVideo === void 0 ? void 0 : resUploadVideo.status) === "OK")) {
              _context.next = 38;
              break;
            }

            data = resUploadVideo.data[0];
            uploadLink = data.uploadLink;
            chunks = createChunks(file, 256 * 1024 * 1024);
            chunkFirstByte = 0;
            i = 0;

          case 15:
            if (!(i < chunks.length)) {
              _context.next = 29;
              break;
            }

            headers = {};
            headers["Content-Type"] = file.type;
            headers["Content-Range"] = "bytes ".concat(chunkFirstByte, "-").concat(chunkFirstByte + chunks[i].size - 1, "/").concat(file.size);
            _context.next = 21;
            return callAPIUploadFileToGCS(uploadLink, chunks[i], headers);

          case 21:
            _res = _context.sent;

            if (!(_res.status !== 308 && _res.status != 200 && _res.status != 201)) {
              _context.next = 25;
              break;
            }

            onUploadError(_res.message);
            return _context.abrupt("return", _res);

          case 25:
            chunkFirstByte += chunks[i].size;

          case 26:
            i++;
            _context.next = 15;
            break;

          case 29:
            reqCompleUploadVideo = {
              uploadCode: data.uploadCode
            };
            _context.next = 32;
            return callAPICompleteUpload(reqCompleUploadVideo);

          case 32:
            resCompleteUploadVideo = _context.sent;

            if ((resCompleteUploadVideo === null || resCompleteUploadVideo === void 0 ? void 0 : resCompleteUploadVideo.status) !== "OK") {
              onUploadError(res.message);
            }

            if (onUploadSuccess) {
              onUploadSuccess();
            }

            return _context.abrupt("return", resCompleteUploadVideo);

          case 38:
            onUploadError(resUploadVideo.message);
            return _context.abrupt("return", resUploadVideo);

          case 40:
            _context.next = 45;
            break;

          case 42:
            _context.prev = 42;
            _context.t0 = _context["catch"](3);
            onUploadError(_context.t0.message);

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 42]]);
  }));
  return _UploadFile.apply(this, arguments);
}

var sleep = function sleep() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var useAPIQueue = function useAPIQueue(_api) {
  var id = React.useRef(0);
  var queue = React.useRef({
    0: false
  });
  return {
    api: function () {
      var _api2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
        var currendID;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                currendID = id.current++;
                queue.current[currendID] = true;

              case 2:
                if (!queue.current[currendID - 1]) {
                  _context.next = 7;
                  break;
                }

                _context.next = 5;
                return sleep(0);

              case 5:
                _context.next = 2;
                break;

              case 7:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _api(data).then(function (result) {
                    queue.current[currendID] = false;
                    resolve(result);
                  })["catch"](function (error) {
                    reject(error);
                  });
                }));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function api(_x) {
        return _api2.apply(this, arguments);
      }

      return api;
    }(),
    resetQueue: function resetQueue() {
      id.current = 0;
      queue.current = {};
    }
  };
};

var ChatContext = /*#__PURE__*/React.createContext();

var handleMessageMedia = function handleMessageMedia(message) {
  if (message.URLMedia) {
    var n = message.URLMedia.length;
    message.media = [];

    for (var i = 0; i < n; i++) {
      message.media.push({
        url: message.URLMedia[i],
        type: message.type.toLowerCase(),
        name: message.fileName[i] || "",
        size: message.size ? message.size[i] || "" : ""
      });
    }
  }

  if (message.replyForMessage) {
    handleMessageMedia(message.replyForMessage);
  }
};

var handleSocketBaseOnCurrentConversation = function handleSocketBaseOnCurrentConversation(messageConversationId, currentId, conversationList, callbackObj) {
  if (callbackObj) {
    if (conversationList.find(function (value) {
      return value.conversationID === messageConversationId;
    })) {
      if (messageConversationId === currentId) {
        callbackObj["CURRENT"]();
      } else {
        callbackObj["NOT"]();
      }
    } else {
      if (messageConversationId === currentId) {
        callbackObj["CURRENT_NEW"]();
      } else {
        callbackObj["NEW"]();
      }
    }
  }
};

var ChatProvider = function ChatProvider(_ref) {
  var _pingToStayInConnect, _handleSeenMessage, _completeUploadToGCS, _createUploadFileLink, _getConversationResou, _handleGetMessageById, _handleGetMessage;

  var children = _ref.children,
      user = _ref.user,
      websocketChatUrl = _ref.websocketChatUrl,
      propsConversation = _ref.conversation,
      propsListConversation = _ref.listConversation,
      chatStarted = _ref.chatStarted,
      ticketData = _ref.ticketData,
      chatWithSellerCode = _ref.chatWithSellerCode,
      totalUnreadMessage = _ref.totalUnreadMessage,
      handlingError = _ref.handlingError,
      handleShowChatPopup = _ref.handleShowChatPopup,
      openSupportTicketCallbackFunc = _ref.openSupportTicketCallbackFunc,
      setChatWithSellerCode = _ref.setChatWithSellerCode;

  var _useReducer = React.useReducer(reducer, _objectSpread2(_objectSpread2({}, initialState), {}, {
    totalUnreadMessage: totalUnreadMessage
  })),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var getState = function getState() {
    return state || {};
  };

  var sessionRef = React.useRef(null);
  var conversationRef = React.useRef(null);
  var seenAPITimeOurRef = React.useRef(null);

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      csConversation = _useState2[0],
      setCsConversation = _useState2[1];

  var isCustomer = React.useMemo(function () {
    return (user === null || user === void 0 ? void 0 : user.type) === UserType.CUSTOMER;
  }, [user]);
  var isSellerConversation = React.useMemo(function () {
    var _state$currentConvers;

    return ((_state$currentConvers = state.currentConversation) === null || _state$currentConvers === void 0 ? void 0 : _state$currentConvers.conversationType) === ConversationType.CUSTOMER_WITH_SELLER;
  }, [state.currentConversation]);

  var handleGetMessageByIdForCustomer = function handleGetMessageByIdForCustomer(messageID) {
    return getMessageByIdForCustomer({
      params: {
        messageID: messageID
      }
    });
  };

  var handleGetMessageByIdForGuest = function handleGetMessageByIdForGuest(messageID) {
    return getMessageByIdForGuest({
      messageID: messageID
    });
  };

  var handleMessagesReply = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(messages) {
      var messageDictionary, messageIdsNotInDict, messagesRes, result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(messages !== null && messages !== void 0 && messages.length)) {
                _context.next = 11;
                break;
              }

              messageDictionary = {};
              messageIdsNotInDict = [];
              messages.forEach(function (message) {
                messageDictionary[message.messageID] = message;

                if (message.replyFor && !messages.find(function (msg) {
                  return msg.messageID === message.replyFor;
                })) {
                  messageIdsNotInDict.push(message.replyFor);
                }
              });

              if (!messageIdsNotInDict.length) {
                _context.next = 9;
                break;
              }

              _context.next = 7;
              return Promise.all(messageIdsNotInDict.map(function (messageId) {
                return services.handleGetMessageById[user.type](messageId);
              }));

            case 7:
              messagesRes = _context.sent;
              messagesRes.forEach(function (res) {
                var _res$data;

                if (res.status === 'OK' && (_res$data = res.data) !== null && _res$data !== void 0 && _res$data.length) {
                  var message = res.data[0];
                  messageDictionary[message.messageID] = message;
                }
              });

            case 9:
              result = messages.map(function (message) {
                if (message.replyFor) {
                  message.replyForMessage = messageDictionary[message.replyFor];
                }

                handleMessageMedia(message);
                return message;
              });
              return _context.abrupt("return", result);

            case 11:
              return _context.abrupt("return", []);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleMessagesReply(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleGetMessageCustomer = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(conversationID, lastMessageID) {
      var type,
          limit,
          messages,
          res,
          _args2 = arguments;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              type = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : "top";
              limit = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : initialState.messagePagination.limit;
              messages = [];
              _context2.prev = 3;
              res = null;

              if (!(type.toLowerCase() === "bottom")) {
                _context2.next = 11;
                break;
              }

              _context2.next = 8;
              return getMessageScrollDownCustomer({
                data: {
                  lastMessageID: lastMessageID,
                  conversationID: conversationID,
                  limit: limit
                }
              });

            case 8:
              res = _context2.sent;
              _context2.next = 14;
              break;

            case 11:
              _context2.next = 13;
              return getMessageInTheConversationCustomer({
                params: {
                  lastMessageID: lastMessageID,
                  conversationID: conversationID,
                  limit: limit
                }
              });

            case 13:
              res = _context2.sent;

            case 14:
              if (!(res.status === APIStatus.OK && res.data.length)) {
                _context2.next = 18;
                break;
              }

              _context2.next = 17;
              return handleMessagesReply(res.data);

            case 17:
              messages = _context2.sent;

            case 18:
              _context2.next = 23;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](3);
              printLog('handleGetMessage', _context2.t0);

            case 23:
              return _context2.abrupt("return", messages);

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 20]]);
    }));

    return function handleGetMessageCustomer(_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var handleGetMessageGuest = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(conversationID, lastMessageID) {
      var type,
          limit,
          messages,
          res,
          _args3 = arguments;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              type = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : "top";
              limit = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : initialState.messagePagination.limit;
              messages = [];
              _context3.prev = 3;
              res = null;

              if (!(type.toLowerCase() === "bottom")) {
                _context3.next = 11;
                break;
              }

              _context3.next = 8;
              return getMessageScrollDownGuest({
                data: {
                  guestID: user.accountID,
                  lastMessageID: lastMessageID,
                  conversationID: conversationID,
                  limit: limit
                }
              });

            case 8:
              res = _context3.sent;
              _context3.next = 14;
              break;

            case 11:
              _context3.next = 13;
              return getMessageInTheConversationGuest({
                params: {
                  lastMessageID: lastMessageID,
                  conversationID: conversationID,
                  guestID: user.accountID,
                  limit: limit
                }
              });

            case 13:
              res = _context3.sent;

            case 14:
              if (!(res.status === "OK" && res.data.length)) {
                _context3.next = 18;
                break;
              }

              _context3.next = 17;
              return handleMessagesReply(res.data);

            case 17:
              messages = _context3.sent;

            case 18:
              _context3.next = 23;
              break;

            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](3);
              printLog('handleGetMessage', _context3.t0);

            case 23:
              return _context3.abrupt("return", messages);

            case 24:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 20]]);
    }));

    return function handleGetMessageGuest(_x4, _x5) {
      return _ref4.apply(this, arguments);
    };
  }();

  var services = {
    pingToStayInConnect: (_pingToStayInConnect = {}, _defineProperty(_pingToStayInConnect, UserType.CUSTOMER, pingToStayInConnectCustomer), _defineProperty(_pingToStayInConnect, UserType.GUEST, pingToStayInConnectGuest), _pingToStayInConnect),
    handleSeenMessage: (_handleSeenMessage = {}, _defineProperty(_handleSeenMessage, UserType.CUSTOMER, handleSeenMessageCustomer), _defineProperty(_handleSeenMessage, UserType.GUEST, handleSeenMessageGuest), _handleSeenMessage),
    completeUploadToGCS: (_completeUploadToGCS = {}, _defineProperty(_completeUploadToGCS, UserType.CUSTOMER, completeUploadToGCSCustomer), _defineProperty(_completeUploadToGCS, UserType.GUEST, completeUploadToGCSGuest), _completeUploadToGCS),
    createUploadFileLinkToGCS: (_createUploadFileLink = {}, _defineProperty(_createUploadFileLink, UserType.CUSTOMER, createUploadFileLinkToGCSCustomer), _defineProperty(_createUploadFileLink, UserType.GUEST, createUploadFileLinkToGCSGuest), _createUploadFileLink),
    getConversationResource: (_getConversationResou = {}, _defineProperty(_getConversationResou, UserType.CUSTOMER, getConversationResourceCustomer), _defineProperty(_getConversationResou, UserType.GUEST, getConversationResourceGuest), _getConversationResou),
    handleGetMessageById: (_handleGetMessageById = {}, _defineProperty(_handleGetMessageById, UserType.CUSTOMER, handleGetMessageByIdForCustomer), _defineProperty(_handleGetMessageById, UserType.GUEST, handleGetMessageByIdForGuest), _handleGetMessageById),
    handleGetMessage: (_handleGetMessage = {}, _defineProperty(_handleGetMessage, UserType.CUSTOMER, handleGetMessageCustomer), _defineProperty(_handleGetMessage, UserType.GUEST, handleGetMessageGuest), _handleGetMessage)
  };

  var sendMessageWithDelay = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref5) {
      var _res$data2;

      var files, data, tagItem, rawUuid, isError, res;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              files = _ref5.files, data = _ref5.data, tagItem = _ref5.tagItem, rawUuid = _ref5.rawUuid;
              isError = false;
              _context4.next = 4;
              return sendChatMessage({
                params: _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
                  conversationID: conversationRef.current,
                  type: files.length > 0 ? files[0].type.toUpperCase() : "TEXT",
                  content: data.message.replace(/^\s+|\s+$/g, ''),
                  sessionID: sessionRef.current
                }, !isCustomer && {
                  senderID: user.accountID
                }), isSellerConversation && {
                  sellerID: state.currentConversation.sellerID
                }), tagItem), files.length && {
                  URLMedia: files.map(function (file) {
                    return file.url;
                  }),
                  fileName: files.map(function (file) {
                    return file.name;
                  }),
                  size: files.map(function (file) {
                    return "".concat(file.size);
                  })
                }), data.replyForMessage && {
                  replyFor: data.replyForMessage.messageID
                }),
                conversationType: state.currentConversation.conversationType
              });

            case 4:
              res = _context4.sent;

              if (res && res.status === "OK" && (_res$data2 = res.data) !== null && _res$data2 !== void 0 && _res$data2.length) {
                if (!conversationRef.current) {
                  addConversationID(res.data[0]);
                }

                if (state.messagePagination.isOverBottom) {
                  dispatch({
                    type: ACTION.SEND_MESSAGE,
                    payload: {
                      message: _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, res.data[0]), files.length && {
                        media: _toConsumableArray(files)
                      }), tagItem && {
                        tagItem: tagItem
                      }), data.tag && {
                        tagItem: data.tag.item
                      }), tagItem), data.replyForMessage && {
                        replyForMessage: data.replyForMessage
                      }),
                      rawId: rawUuid
                    }
                  });
                } else {
                  loadMessageInConversation('top', true);
                }
              } else {
                isError = true;
                printLog("Send fail");
                handlingError(res.message);
              }

              return _context4.abrupt("return", isError);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function sendMessageWithDelay(_x6) {
      return _ref6.apply(this, arguments);
    };
  }();

  var onMessageFromSocket = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(payload) {
      var data, _data$content, realData;

      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              data = JSON.parse(payload.data);
              printLog(data);

              try {
                if (data.topic === 'BUZZ_EVENT') {
                  handleBuzzMessgae(data === null || data === void 0 ? void 0 : (_data$content = data.content) === null || _data$content === void 0 ? void 0 : _data$content.data);
                } else if (data.topic !== 'AUTHORIZATION' && data.topic !== 'GUEST_CONNECTION') {
                  realData = data.content.data;

                  try {
                    if (data.topic === 'MESSAGE') {
                      messageToCurrentConversation(realData);
                    } else if (data.topic === 'SEEN') {
                      dispatch({
                        type: ACTION.SOCKET_ON_MESSAGE_SEEN,
                        payload: {
                          seenResult: realData,
                          userID: user.accountID
                        }
                      });
                    } else if (data.topic === "STATUS") {
                      handleSocketBaseOnCurrentConversation(realData.conversationID, conversationRef.current, getState().listConversation, {
                        "CURRENT": function CURRENT() {
                          dispatch({
                            type: ACTION.SOCKET_CONVERSATION_STATUS,
                            payload: {
                              statusData: realData
                            }
                          });
                        },
                        "NOT": function NOT() {
                          dispatch({
                            type: ACTION.SOCKET_CONVERSATION_STATUS_NOT,
                            payload: {
                              statusData: realData
                            }
                          });
                        }
                      });
                    }
                  } catch (error) {
                    printLog(error);
                    dispatch({
                      type: ACTION.HAS_ERROR,
                      payload: {
                        error: error
                      }
                    });
                  }
                } else {
                  printLog(data);
                  sessionRef.current = data.content.sessionID;
                }
              } catch (error) {
                printLog(error);
              }

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function onMessageFromSocket(_x7) {
      return _ref7.apply(this, arguments);
    };
  }();

  var closeSockerRef = React.useRef(false);

  var onCloseConnectionFromSocket = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              // TODO: call the api get list message in the conversation
              closeSockerRef.current = true;
              printLog("connection is closed");

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function onCloseConnectionFromSocket() {
      return _ref8.apply(this, arguments);
    };
  }();

  var onOpenConnectionFromSocket = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              closeSockerRef.current = false;

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function onOpenConnectionFromSocket() {
      return _ref9.apply(this, arguments);
    };
  }();

  var _useAPIQueue = useAPIQueue(sendMessageWithDelay),
      sendMessageQueue = _useAPIQueue.api;

  var _useWebSocket = useWebSocket__default["default"](websocketChatUrl, {
    onClose: onCloseConnectionFromSocket,
    onMessage: function onMessage(payload) {
      onMessageFromSocket(payload)["catch"](printLog);
    },
    onOpen: onOpenConnectionFromSocket,
    shouldReconnect: function shouldReconnect(closeEvent) {
      return true;
    },
    reconnectInterval: 1000
  }),
      sendMessage = _useWebSocket.sendMessage,
      readyState = _useWebSocket.readyState;

  var ping30 = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              services.pingToStayInConnect[user.type]({
                params: {
                  sessionID: sessionRef.current
                }
              });

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function ping30() {
      return _ref10.apply(this, arguments);
    };
  }();

  var messageToCurrentConversation = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(messageData) {
      var replyFor;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!(chatStarted && messageData.conversationID === conversationRef.current)) {
                _context9.next = 10;
                break;
              }

              if (!messageData.replyFor) {
                _context9.next = 6;
                break;
              }

              _context9.next = 4;
              return services.handleGetMessageById[user.type](messageData.replyFor);

            case 4:
              replyFor = _context9.sent;

              if (replyFor.status === "OK") {
                messageData.replyForMessage = replyFor.data[0];
              }

            case 6:
              handleMessageMedia(messageData);
              dispatch({
                type: ACTION.SOCKET_ON_MESSAGE_CONVERSATION,
                payload: {
                  message: messageData // seenResult: resSeen.status === "OK" ? resSeen.data[0] : null,

                }
              });
              _context9.next = 11;
              break;

            case 10:
              dispatch({
                type: ACTION.SOCKET_ON_MESSAGE_NOT_CONVERSATION,
                payload: {
                  message: messageData,
                  accountID: user.accountID
                }
              });

            case 11:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function messageToCurrentConversation(_x8) {
      return _ref11.apply(this, arguments);
    };
  }();

  var loadMessageInConversation = /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
      var type,
          isFirst,
          lastMessageID,
          _getState$listMessage,
          _getState$listMessage2,
          listMessage,
          _args10 = arguments;

      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              type = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : "top";
              isFirst = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : false;
              _context10.prev = 2;

              if (!(conversationRef.current && (isFirst || !getState().messagePagination.isOver && type.toLowerCase() === "top" || !getState().messagePagination.isOverBottom && type.toLowerCase() === "bottom"))) {
                _context10.next = 10;
                break;
              }

              if (isFirst) {
                dispatch({
                  type: ACTION.LOADING_MESSAGE
                });
              }

              if (!isFirst && type.toLowerCase() === "top") {
                lastMessageID = (_getState$listMessage = getState().listMessage[0]) === null || _getState$listMessage === void 0 ? void 0 : _getState$listMessage.messageID;
              } else if (type.toLowerCase() === "bottom") {
                lastMessageID = (_getState$listMessage2 = getState().listMessage[getState().listMessage.length - 1]) === null || _getState$listMessage2 === void 0 ? void 0 : _getState$listMessage2.messageID;
              }

              _context10.next = 8;
              return services.handleGetMessage[user.type](conversationRef.current, lastMessageID, type);

            case 8:
              listMessage = _context10.sent;
              dispatch({
                type: ACTION.LOAD_MESSAGE,
                payload: {
                  listMessage: listMessage,
                  type: type
                }
              });

            case 10:
              _context10.next = 16;
              break;

            case 12:
              _context10.prev = 12;
              _context10.t0 = _context10["catch"](2);
              printLog(_context10.t0);
              dispatch({
                type: ACTION.HAS_ERROR,
                payload: {
                  error: _context10.t0
                }
              });

            case 16:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[2, 12]]);
    }));

    return function loadMessageInConversation() {
      return _ref12.apply(this, arguments);
    };
  }();

  var handleMessageListAroundMessage = /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(message) {
      var _yield$Promise$all, _yield$Promise$all2, aboveMessages, belowMessages, listMessage;

      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return Promise.all([services.handleGetMessage[user.type](conversationRef.current, message.messageID), services.handleGetMessage[user.type](conversationRef.current, message.messageID, 'bottom')]);

            case 2:
              _yield$Promise$all = _context11.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              aboveMessages = _yield$Promise$all2[0];
              belowMessages = _yield$Promise$all2[1];
              listMessage = [].concat(_toConsumableArray(aboveMessages), [message], _toConsumableArray(belowMessages));
              dispatch({
                type: ACTION.HANDLE_MESSAGE_AROUND_MESSAGE,
                payload: {
                  listMessage: listMessage
                }
              });

            case 8:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function handleMessageListAroundMessage(_x9) {
      return _ref13.apply(this, arguments);
    };
  }();

  var getMessageByDate = /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(date) {
      var endDate, foundMessage;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              dispatch({
                type: ACTION.LOADING_FILTER_MESSAGE_BY_DATE
              });
              endDate = new Date(date);
              endDate.setHours(23);
              endDate.setMinutes(59);
              endDate.setSeconds(59);

              if (!conversationRef.current) {
                _context12.next = 15;
                break;
              }

              _context12.next = 9;
              return findMessageByDate({
                data: {
                  conversationID: conversationRef.current,
                  endTime: endDate,
                  startTime: date
                },
                conversationType: state.currentConversation.conversationType
              });

            case 9:
              foundMessage = _context12.sent;

              if (!foundMessage) {
                _context12.next = 15;
                break;
              }

              handleMessageMedia(foundMessage);
              _context12.next = 14;
              return handleMessageListAroundMessage(foundMessage);

            case 14:
              return _context12.abrupt("return", foundMessage);

            case 15:
              _context12.next = 22;
              break;

            case 17:
              _context12.prev = 17;
              _context12.t0 = _context12["catch"](0);
              printLog(_context12.t0);
              dispatch({
                type: ACTION.HAS_ERROR,
                payload: {
                  error: _context12.t0
                }
              });
              return _context12.abrupt("return", null);

            case 22:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[0, 17]]);
    }));

    return function getMessageByDate(_x10) {
      return _ref14.apply(this, arguments);
    };
  }();

  var getReplyMessage = /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(messageID) {
      var _getState$listMessage3;

      var foundMessage, _foundMessageRes$data, foundMessageRes;

      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              foundMessage = ((_getState$listMessage3 = getState().listMessage) === null || _getState$listMessage3 === void 0 ? void 0 : _getState$listMessage3.find(function (message) {
                return message.messageID === messageID;
              })) || null;

              if (foundMessage) {
                _context13.next = 19;
                break;
              }

              _context13.prev = 2;
              dispatch({
                type: ACTION.LOADING_FIND_REPLY_MESSAGE
              });

              if (!conversationRef.current) {
                _context13.next = 13;
                break;
              }

              _context13.next = 7;
              return services.handleGetMessageById[user.type](messageID);

            case 7:
              foundMessageRes = _context13.sent;

              if (!(foundMessageRes.status === APIStatus.OK && foundMessageRes !== null && foundMessageRes !== void 0 && (_foundMessageRes$data = foundMessageRes.data) !== null && _foundMessageRes$data !== void 0 && _foundMessageRes$data.length)) {
                _context13.next = 13;
                break;
              }

              foundMessage = foundMessageRes.data[0];
              handleMessageMedia(foundMessage);
              _context13.next = 13;
              return handleMessageListAroundMessage(foundMessage);

            case 13:
              _context13.next = 19;
              break;

            case 15:
              _context13.prev = 15;
              _context13.t0 = _context13["catch"](2);
              printLog(_context13.t0);
              dispatch({
                type: ACTION.HAS_ERROR,
                payload: {
                  error: _context13.t0
                }
              });

            case 19:
              return _context13.abrupt("return", foundMessage);

            case 20:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[2, 15]]);
    }));

    return function getReplyMessage(_x11) {
      return _ref15.apply(this, arguments);
    };
  }();

  var handleSelectConversation = /*#__PURE__*/function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(conversation) {
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (conversation) {
                try {
                  conversationRef.current = conversation.conversationID || null;
                  dispatch({
                    type: ACTION.UPDATE_SELECTED_CONVERSATION,
                    payload: {
                      conversation: conversation
                    }
                  });
                } catch (error) {
                  printLog(error);
                  dispatch({
                    type: ACTION.HAS_ERROR,
                    payload: {
                      error: error
                    }
                  });
                }
              } else {
                conversationRef.current = null;
                dispatch({
                  type: ACTION.UPDATE_SELECTED_CONVERSATION,
                  payload: {
                    conversation: null
                  }
                });
              }

            case 1:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function handleSelectConversation(_x12) {
      return _ref16.apply(this, arguments);
    };
  }();

  var addConversationID = function addConversationID(messageData) {
    conversationRef.current = messageData.conversationID;
    dispatch({
      type: ACTION.ADD_CONVERSATION_ID,
      payload: {
        messageData: messageData,
        accountType: user.type
      }
    });
  };

  var sendMessageToServer = /*#__PURE__*/function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(data) {
      var isError, rawUuid, rawId, rawFile, tagItem, _ref18, tag, item, _item$skuInfo, realFile, n, i, file, uploadFileObject, uploadRes;

      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              isError = false;
              rawUuid = "raw-message-" + uuid.v4();
              _context15.prev = 2;

              if (!((data.message || data.tag || data.files && data.files.length > 0) && getState().currentConversation)) {
                _context15.next = 50;
                break;
              }

              rawId = rawUuid;
              rawFile = [];

              if (data.files && data.files.length > 0) {
                data.files.forEach(function (file, index) {
                  var tempFile = null;

                  if (file.type.includes("image")) {
                    tempFile = {
                      name: file.name,
                      url: URL.createObjectURL(file),
                      type: "image",
                      file: file
                    };
                  } else if (file.type.includes("mp4") || file.type.includes("ogg")) {
                    tempFile = {
                      name: file.name,
                      url: URL.createObjectURL(file),
                      type: "video",
                      file: file
                    };
                  } else {
                    tempFile = {
                      name: file.name,
                      type: "file",
                      file: file
                    };
                  }

                  rawFile.push(tempFile);
                });
              }

              tagItem = {};

              if (!data.tag) {
                _context15.next = 22;
                break;
              }

              _ref18 = data.tag || {}, tag = _ref18.tag, item = _ref18.item;
              _context15.t0 = tag.code;
              _context15.next = _context15.t0 === "@SP_" ? 13 : _context15.t0 === "@DH_" ? 15 : _context15.t0 === "@HOTRO_" ? 17 : 21;
              break;

            case 13:
              tagItem.skuInfo = handleSkuInfo(item);
              return _context15.abrupt("break", 22);

            case 15:
              tagItem.orderInfo = item;
              return _context15.abrupt("break", 22);

            case 17:
              tagItem.ticketInfo = item || {};
              tagItem.ticketInfo.createdBy = item.createdByUser ? item.createdByUser.fullname : user.fullname;

              if (item.type === "PRODUCT" && (_item$skuInfo = item.skuInfo) !== null && _item$skuInfo !== void 0 && _item$skuInfo.sellerInfo) {
                tagItem.ticketInfo.skuInfo.sellerInfo = handleSellerInfo(item.skuInfo.sellerInfo);
              }

              return _context15.abrupt("break", 22);

            case 21:
              return _context15.abrupt("break", 22);

            case 22:
              dispatch({
                type: ACTION.SEND_RAW_MESSAGE,
                payload: {
                  message: _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
                    content: data.message.replace(/^\s+|\s+$/g, ''),
                    type: rawFile.length > 0 ? rawFile[0].type.toUpperCase() : "TEXT",
                    conversationID: conversationRef.current,
                    sessionID: sessionRef.current,
                    createdTime: new Date().toISOString(),
                    status: "RAW",
                    messageID: rawId,
                    senderID: user.accountID
                  }, rawFile.length && {
                    media: [].concat(rawFile)
                  }), data.tag && {
                    tagItem: data.tag.item
                  }), tagItem), data.replyForMessage && {
                    replyForMessage: data.replyForMessage
                  })
                }
              });
              realFile = [];

              if (!rawFile.length) {
                _context15.next = 42;
                break;
              }

              n = rawFile.length;
              i = 0;

            case 27:
              if (!(i < n)) {
                _context15.next = 42;
                break;
              }

              file = data.files[i];
              uploadFileObject = {
                file: file
              };

              uploadFileObject.callAPIGetUploadLink = function (body) {
                return services.createUploadFileLinkToGCS[user.type](body);
              };

              uploadFileObject.callAPIUploadFileToGCS = uploadFileToGCS;
              uploadFileObject.callAPICompleteUpload = services.completeUploadToGCS[user.type];

              uploadFileObject.onUploadError = function (errMsg) {
                printLog("Upload faild");
                isError = true;
                handlingError(errMsg);
                return;
              };

              uploadFileObject.onUploadSuccess = function () {
                printLog("upload video successfully");
              };

              _context15.next = 37;
              return UploadFile(uploadFileObject);

            case 37:
              uploadRes = _context15.sent;

              if (uploadRes.status === "OK") {
                // realFile = {
                // 	name: file.name,
                // 	url: uploadRes.data[0].link,
                // 	file: file,
                // 	type: rawFile[i].type,
                // };
                realFile.push({
                  name: file.name,
                  url: uploadRes.data[0].link,
                  file: file,
                  type: rawFile[i].type,
                  size: file.size
                });
              }

            case 39:
              i++;
              _context15.next = 27;
              break;

            case 42:
              if (sessionRef.current) {
                _context15.next = 46;
                break;
              }

              isError = true;
              _context15.next = 50;
              break;

            case 46:
              if (isError) {
                _context15.next = 50;
                break;
              }

              _context15.next = 49;
              return sendMessageQueue({
                files: realFile,
                data: data,
                tagItem: tagItem,
                rawUuid: rawUuid
              });

            case 49:
              isError = _context15.sent;

            case 50:
              _context15.next = 57;
              break;

            case 52:
              _context15.prev = 52;
              _context15.t1 = _context15["catch"](2);
              printLog(_context15.t1);
              printLog("try catch fail");
              isError = true;

            case 57:
              if (isError) {
                dispatch({
                  type: ACTION.SEND_ERROR_MESSAGE,
                  payload: {
                    rawId: rawUuid
                  }
                });
              }

            case 58:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[2, 52]]);
    }));

    return function sendMessageToServer(_x13) {
      return _ref17.apply(this, arguments);
    };
  }();

  var loadResource = /*#__PURE__*/function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
      var isFirst,
          page,
          offset,
          res,
          _args16 = arguments;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              isFirst = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : false;

              if (conversationRef.current) {
                _context16.next = 3;
                break;
              }

              return _context16.abrupt("return");

            case 3:
              _context16.prev = 3;

              if (isFirst) {
                dispatch({
                  type: ACTION.LOADING_RESOURCE
                });
              }

              if (!(!getState().resourcePagination.isOver || isFirst)) {
                _context16.next = 18;
                break;
              }

              page = isFirst ? initialState.resourcePagination.page : getState().resourcePagination.page;
              offset = (page - 1) * getState().resourcePagination.limit;

              if (!isCustomer) {
                _context16.next = 14;
                break;
              }

              _context16.next = 11;
              return getConversationResourceCustomer({
                params: _objectSpread2(_objectSpread2({}, getState().resourcePagination), {}, {
                  offset: offset,
                  conversationID: conversationRef.current
                })
              });

            case 11:
              res = _context16.sent;
              _context16.next = 17;
              break;

            case 14:
              _context16.next = 16;
              return getConversationResourceGuest(_objectSpread2(_objectSpread2({}, getState().resourcePagination), {}, {
                offset: offset,
                conversationID: conversationRef.current,
                guestID: user.accountID
              }));

            case 16:
              res = _context16.sent;

            case 17:
              dispatch({
                type: ACTION.LOAD_RESOURCE,
                payload: {
                  res: res
                }
              });

            case 18:
              _context16.next = 24;
              break;

            case 20:
              _context16.prev = 20;
              _context16.t0 = _context16["catch"](3);
              printLog(_context16.t0);
              dispatch({
                type: ACTION.HAS_ERROR,
                payload: {
                  error: _context16.t0
                }
              });

            case 24:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, null, [[3, 20]]);
    }));

    return function loadResource() {
      return _ref19.apply(this, arguments);
    };
  }();

  var loadTag = /*#__PURE__*/function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
      var isFirst,
          page,
          offset,
          res,
          _args17 = arguments;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              isFirst = _args17.length > 0 && _args17[0] !== undefined ? _args17[0] : false;

              if (conversationRef.current) {
                _context17.next = 3;
                break;
              }

              return _context17.abrupt("return");

            case 3:
              _context17.prev = 3;

              if (isFirst) {
                dispatch({
                  type: ACTION.LOADING_TAG
                });
              }

              if (!(!getState().tagPagination.isOver || isFirst)) {
                _context17.next = 12;
                break;
              }

              page = isFirst ? initialState.tagPagination.page : getState().tagPagination.page;
              offset = (page - 1) * getState().tagPagination.limit;
              _context17.next = 10;
              return getConversationTag({
                data: _objectSpread2(_objectSpread2({}, getState().tagPagination), {}, {
                  page: page,
                  offset: offset,
                  conversationID: conversationRef.current
                })
              });

            case 10:
              res = _context17.sent;
              dispatch({
                type: ACTION.LOAD_TAG,
                payload: {
                  res: res
                }
              });

            case 12:
              _context17.next = 18;
              break;

            case 14:
              _context17.prev = 14;
              _context17.t0 = _context17["catch"](3);
              printLog(_context17.t0);
              dispatch({
                type: ACTION.HAS_ERROR,
                payload: {
                  error: _context17.t0
                }
              });

            case 18:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[3, 14]]);
    }));

    return function loadTag() {
      return _ref20.apply(this, arguments);
    };
  }();

  var handleTogglePin = /*#__PURE__*/function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(conversation) {
      var res, isPinned, newConversation;
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              if (!conversation.isPinned) {
                _context18.next = 6;
                break;
              }

              _context18.next = 3;
              return unpinConversation({
                conversationID: conversation.conversationID
              });

            case 3:
              _context18.t0 = _context18.sent;
              _context18.next = 9;
              break;

            case 6:
              _context18.next = 8;
              return pinConversation({
                conversationID: conversation.conversationID
              });

            case 8:
              _context18.t0 = _context18.sent;

            case 9:
              res = _context18.t0;

              if (res.status === "OK") {
                isPinned = conversation.isPinned;
                newConversation = _objectSpread2(_objectSpread2({}, conversation), {}, {
                  isPinned: !isPinned
                });
                dispatch({
                  type: ACTION.TOGGLE_PIN,
                  payload: {
                    conversation: newConversation
                  }
                });
              }

            case 11:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    return function handleTogglePin(_x14) {
      return _ref21.apply(this, arguments);
    };
  }();

  var handleReactMessage = /*#__PURE__*/function () {
    var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(emoji, messageID) {
      var message, res, _res;

      return _regeneratorRuntime().wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              message = getState().listMessage.find(function (item) {
                return item.messageID === messageID;
              });

              if (!message) {
                _context19.next = 13;
                break;
              }

              if (!(emoji === message.currentReact)) {
                _context19.next = 9;
                break;
              }

              _context19.next = 5;
              return unReactMessage({
                data: {
                  messageID: messageID,
                  sessionID: sessionRef.current
                }
              });

            case 5:
              res = _context19.sent;

              if (res.status === "OK") {
                dispatch({
                  type: ACTION.UNREACT_MESSAGE,
                  payload: {
                    messageID: messageID,
                    emoji: emoji,
                    message: res.data[0]
                  }
                });
              }

              _context19.next = 13;
              break;

            case 9:
              _context19.next = 11;
              return reactMessage({
                data: {
                  messageID: messageID,
                  emojiCode: emoji,
                  sessionID: sessionRef.current
                }
              });

            case 11:
              _res = _context19.sent;

              if (_res.status === "OK") {
                dispatch({
                  type: ACTION.REACT_MESSAGE,
                  payload: {
                    messageID: messageID,
                    emoji: emoji,
                    message: _res.data[0]
                  }
                });
              }

            case 13:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }));

    return function handleReactMessage(_x15, _x16) {
      return _ref22.apply(this, arguments);
    };
  }();

  var setFoundMessage = function setFoundMessage(message) {
    dispatch({
      type: ACTION.UPDATE_FOUND_MESSAGE,
      payload: {
        message: message
      }
    });
  };

  var seenConversation = function seenConversation(message) {
    if (sessionRef.current) {
      clearTimeout(seenAPITimeOurRef.current);
      seenAPITimeOurRef.current = setTimeout(function () {
        services.handleSeenMessage[user.type]({
          params: _objectSpread2({
            conversationID: message.conversationID,
            lastMessageSeen: message.messageID,
            sessionID: sessionRef.current
          }, !isCustomer && {
            userID: user.accountID
          })
        }).then(function (resSeen) {
          if (resSeen.status === "OK" && !message.isBuzz) {
            var seenResult = resSeen.data[0];

            if (conversationRef.current === seenResult.conversationID) {
              dispatch({
                type: ACTION.UPDATE_SEEN,
                payload: {
                  seenResult: seenResult
                }
              });
            }
          }
        });
      }, 300);
    }
  };

  var handleBuzzMessgae = function handleBuzzMessgae(message) {
    if (message.conversationID !== conversationRef.current) {
      handleSelectConversation(csConversation);
    }

    if (!chatStarted) {
      handleShowChatPopup();
    }

    seenConversation(_objectSpread2(_objectSpread2({}, message), {}, {
      isBuzz: true
    }));
  };

  var searchConversation = /*#__PURE__*/function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(keyword, lastMessageID) {
      var res;
      return _regeneratorRuntime().wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              if (!lastMessageID) {
                dispatch({
                  type: ACTION.LOADING_CONVERSATION
                });
              }

              _context20.next = 3;
              return getListConversation({
                params: {
                  searchContent: keyword,
                  limit: initialState.conversationPagination.limit,
                  lastMessageID: lastMessageID
                }
              });

            case 3:
              res = _context20.sent;
              dispatch({
                type: ACTION.LOAD_CONVERSATION,
                payload: {
                  conversations: (res === null || res === void 0 ? void 0 : res.data) || [],
                  isMore: !!lastMessageID,
                  keyword: keyword
                }
              });

            case 5:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }));

    return function searchConversation(_x17, _x18) {
      return _ref23.apply(this, arguments);
    };
  }();

  React.useEffect(function () {
    if (readyState === 1 && user !== null && user !== void 0 && user.sessionToken) {
      printLog("send sesstion token on useEffect: ", user.sessionToken);
      var data = {};

      if (isCustomer) {
        data = {
          topic: 'AUTHORIZATION',
          content: {
            username: user.username,
            type: UserType.CUSTOMER,
            sessionToken: user.sessionToken
          }
        };
      } else {
        data = {
          topic: 'GUEST_CONNECTION',
          content: {
            phoneNumber: user.sessionToken
          }
        };
      }

      sendMessage(JSON.stringify(data));
    }
  }, [readyState, sendMessage, user === null || user === void 0 ? void 0 : user.sessionToken]);
  React.useEffect(function () {
    if (sessionRef.current) {
      var interval = setInterval(function () {
        ping30();
      }, 30000);
      return function () {
        clearInterval(interval);
      };
    }
  }, [sessionRef.current]);
  React.useEffect(function () {
    var _getState$error;

    if ((_getState$error = getState().error) !== null && _getState$error !== void 0 && _getState$error.message) {
      handlingError(getState().error);
    }
  }, [getState().error]);
  React.useEffect(function () {
    handleSelectConversation(propsConversation);

    if (propsConversation !== null && propsConversation !== void 0 && propsConversation.totalUnreadBuzzMessage) {
      seenConversation({
        messageID: propsConversation.lastBuzzMessageID,
        conversationID: propsConversation.conversationID,
        isBuzz: true
      });
    }
  }, [propsConversation]);
  React.useEffect(function () {
    dispatch({
      type: ACTION.LOAD_CONVERSATION,
      payload: {
        conversations: propsListConversation || []
      }
    });

    if (propsListConversation !== null && propsListConversation !== void 0 && propsListConversation.length && !csConversation) {
      setCsConversation(propsListConversation.find(function (conversation) {
        return conversation.conversationType === ConversationType.CUSTOMER_WITH_CS;
      }));
    }
  }, [propsListConversation]);
  React.useEffect( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
    var _ticketRes$data;

    var tag, ticketRes;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            if (!(ticketData !== null && ticketData !== void 0 && ticketData.code && conversationRef.current)) {
              _context21.next = 13;
              break;
            }

            tag = {
              tag: tagList.find(function (tag) {
                return tag.code === TagCode.HOTRO;
              })
            };
            _context21.t0 = ticketData.type;
            _context21.next = _context21.t0 === "PRODUCT" ? 5 : _context21.t0 === "ORDER" ? 5 : 10;
            break;

          case 5:
            _context21.next = 7;
            return integrateSearchTicket({
              params: {
                limit: 1,
                page: 1,
                offset: 0,
                search: ticketData.code
              }
            });

          case 7:
            ticketRes = _context21.sent;

            if (ticketRes.status === APIStatus.OK, (_ticketRes$data = ticketRes.data) !== null && _ticketRes$data !== void 0 && _ticketRes$data.length) {
              tag.item = ticketRes.data[0];
            }

            return _context21.abrupt("break", 12);

          case 10:
            tag.item = ticketData;
            return _context21.abrupt("break", 12);

          case 12:
            if (tag.item) {
              sendMessageToServer({
                message: '',
                tag: tag
              });
            }

          case 13:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  })), [ticketData === null || ticketData === void 0 ? void 0 : ticketData.code]);
  React.useEffect( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
    var conversationExists;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            if (!chatWithSellerCode) {
              _context22.next = 11;
              break;
            }

            conversationExists = state.listConversation.find(function (conversation) {
              var _conversation$sellerI;

              return ((_conversation$sellerI = conversation.sellerInfo) === null || _conversation$sellerI === void 0 ? void 0 : _conversation$sellerI.code) === chatWithSellerCode;
            });

            if (!conversationExists) {
              _context22.next = 10;
              break;
            }

            if (!handleZaloSellerConversation(conversationExists)) {
              _context22.next = 6;
              break;
            }

            setChatWithSellerCode(null);
            return _context22.abrupt("return");

          case 6:
            if (conversationRef.current !== conversationExists.conversationID) {
              handleSelectConversation(conversationExists);
            }

            handleShowChatPopup();
            _context22.next = 11;
            break;

          case 10:
            handleShowChatPopup(true, chatWithSellerCode);

          case 11:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  })), [chatWithSellerCode]);
  React.useEffect(function () {
    dispatch({
      type: ACTION.UPDATE_TOTAL_UNREAD_MESSAGE,
      payload: {
        totalUnreadMessage: totalUnreadMessage
      }
    });
  }, [totalUnreadMessage]);
  return /*#__PURE__*/jsxRuntime.jsx(ChatContext.Provider, {
    value: {
      listConversation: getState().listConversation,
      listMessage: getState().listMessage,
      conversationPagination: getState().conversationPagination,
      messagePagination: getState().messagePagination,
      resourcePagination: getState().resourcePagination,
      tagPagination: getState().tagPagination,
      sessionId: sessionRef.current,
      loading: getState().loading,
      listResource: getState().listResource,
      conversationFilter: getState().conversationFilter,
      listTags: getState().listTags,
      foundMessage: getState().foundMessage,
      currentConversation: getState().currentConversation,
      totalUnreadMessage: state.totalUnreadMessage,
      user: user,
      isCustomer: isCustomer,
      getReplyMessage: getReplyMessage,
      getMessageByDate: getMessageByDate,
      loadMessageInConversation: loadMessageInConversation,
      sendMessageToServer: sendMessageToServer,
      loadResource: loadResource,
      loadTag: loadTag,
      handleTogglePin: handleTogglePin,
      handleReactMessage: handleReactMessage,
      setFoundMessage: setFoundMessage,
      handlingError: handlingError,
      openSupportTicketCallbackFunc: openSupportTicketCallbackFunc,
      seenConversation: seenConversation,
      handleSelectConversation: handleSelectConversation,
      searchConversation: searchConversation
    },
    children: children
  });
};

var MessageOrder = function MessageOrder(_ref) {
  var _order$detailAddress, _order$detailAddress2, _order$detailAddress3;

  var order = _ref.order,
      action = _ref.action;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      expand = _useState2[0],
      setExpand = _useState2[1];

  var address = [];

  if (order.customerShippingAddress) {
    address.push(order.customerShippingAddress);
  }

  if ((_order$detailAddress = order.detailAddress) !== null && _order$detailAddress !== void 0 && _order$detailAddress.ward) {
    address.push(order.detailAddress.ward);
  }

  if ((_order$detailAddress2 = order.detailAddress) !== null && _order$detailAddress2 !== void 0 && _order$detailAddress2.district) {
    address.push(order.detailAddress.district);
  }

  if ((_order$detailAddress3 = order.detailAddress) !== null && _order$detailAddress3 !== void 0 && _order$detailAddress3.province) {
    address.push(order.detailAddress.province);
  }

  return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
    sx: {
      width: "100%"
    },
    children: /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
      direction: "row",
      justifyContent: "space-between",
      sx: _objectSpread2({}, action && {
        paddingRight: "35px",
        position: "relative"
      }),
      children: [/*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        sx: {
          width: "100%",
          flexShrink: 0
        },
        children: /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
          direction: "row",
          spacing: 1,
          sx: {
            width: "100%"
          },
          children: [/*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
            sx: {
              width: "4rem"
            },
            children: /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
              component: "img",
              src: img$k,
              sx: {
                objectFit: "cover",
                width: "100%"
              }
            })
          }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
            sx: {
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            },
            children: [/*#__PURE__*/jsxRuntime.jsx("p", {
              className: style$e.name,
              children: "#".concat(order.orderId || order.orderID, " (").concat(orderStatus[order.status], ")")
            }), /*#__PURE__*/jsxRuntime.jsxs("p", {
              className: style$e.content,
              children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                className: style$e.label,
                children: "H\xECnh th\u1EE9c thanh to\xE1n"
              }), ": ", orderPaymentMethod[order.paymentMethod]]
            }), /*#__PURE__*/jsxRuntime.jsxs("p", {
              className: style$e.content,
              children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                className: style$e.label,
                children: "Ng\xE0y mua"
              }), ": ", ddmmyyyy(new Date(order.createdTime))]
            }), /*#__PURE__*/jsxRuntime.jsxs("p", {
              className: style$e.content,
              children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                className: style$e.label,
                children: "S\u1ED1 l\u01B0\u1EE3ng s\u1EA3n ph\u1EA9m"
              }), ": ", order.totalItem]
            }), /*#__PURE__*/jsxRuntime.jsxs("p", {
              className: style$e.content,
              children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                className: style$e.label,
                children: "T\u1ED5ng ti\u1EC1n"
              }), ": ", numberFormatDotSeperated(order.totalPrice)]
            }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
              sx: {
                height: expand ? "auto" : 0,
                transition: "0.5s",
                overflow: 'hidden'
              },
              children: [/*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "T\u1EA1m t\xEDnh"
                }), ": ", numberFormatDotSeperated(order.price)]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "Ph\xED theo h\xECnh th\u1EE9c thanh to\xE1n"
                }), ": ", numberFormatDotSeperated(order.paymentMethodFee)]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "Ph\xED v\u1EADn chuy\u1EC3n"
                }), ": ", numberFormatDotSeperated(order.deliveryMethodFee)]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "Ph\u1EE5 ph\xED"
                }), ": ", numberFormatDotSeperated(order.extraFee)]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: "".concat(style$e.content, " ").concat(style$e.ellipsis),
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "\u0110\u1ECBa ch\u1EC9 giao"
                }), ": ", address.join(", ")]
              })]
            })]
          })]
        })
      }), /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
        direction: "column",
        spacing: 1,
        justifyContent: "space-between",
        children: [action ? /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
          direction: "column",
          spacing: 0.2,
          children: [/*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
            href: orderUrl(order),
            target: "_blank",
            size: "small",
            children: /*#__PURE__*/jsxRuntime.jsx(LaunchIcon__default["default"], {
              sx: {
                color: "#15A959"
              }
            })
          }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
            onClick: function onClick() {
              action.openSupportTicketWindow(order);
            },
            size: "small",
            sx: {
              '& svg path': {
                fill: '#15A959'
              },
              '& svg': {
                transform: 'scale(calc(22/24))'
              }
            },
            children: /*#__PURE__*/jsxRuntime.jsx(SvgCreateTicket, {})
          })]
        }) : /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {}), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
          onClick: function onClick() {
            setExpand(function (prev) {
              return !prev;
            });
          },
          size: "small",
          children: /*#__PURE__*/jsxRuntime.jsx(ExpandMoreIcon__default["default"], {
            sx: _objectSpread2({
              color: "#ACACAC",
              transition: '0.5s'
            }, expand && {
              transform: "rotate(180deg)"
            })
          })
        })]
      })]
    })
  });
};

var RowItem = function RowItem(_ref) {
  var left = _ref.left,
      right = _ref.right;
  return /*#__PURE__*/jsxRuntime.jsxs(TableRow__default["default"], {
    sx: {
      "& .MuiTableCell-root": {
        padding: 0,
        borderBottom: 0
      }
    },
    children: [/*#__PURE__*/jsxRuntime.jsx(TableCell__default["default"], {
      children: left || ""
    }), /*#__PURE__*/jsxRuntime.jsx(TableCell__default["default"], {
      style: {
        paddingLeft: "2px",
        width: "100%"
      },
      children: right || ""
    })]
  });
};

var TicketItem = function TicketItem(_ref) {
  var ticket = _ref.ticket,
      action = _ref.action;
  var product = ticket.skuInfo;
  var ticketInfo = React.useMemo(function () {
    switch (ticket.type) {
      case "ORDER":
        {
          return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [/*#__PURE__*/jsxRuntime.jsx(RowItem, {
              flexible: true,
              left: /*#__PURE__*/jsxRuntime.jsx("span", {
                className: "".concat(style$e.content, " ").concat(style$e.label),
                children: "M\xE3 \u0111\u01A1n h\xE0ng: "
              }),
              right: /*#__PURE__*/jsxRuntime.jsx("p", {
                className: style$e.content,
                children: ticket.orderId || "-"
              })
            }), /*#__PURE__*/jsxRuntime.jsx(RowItem, {
              flexible: true,
              left: /*#__PURE__*/jsxRuntime.jsx("span", {
                className: "".concat(style$e.content, " ").concat(style$e.label),
                children: "L\xFD do c\u1EA7n h\u1ED7 tr\u1EE3: "
              }),
              right: /*#__PURE__*/jsxRuntime.jsx(EllipsisText, {
                className: style$e.content,
                children: displayTicketReason(ticket)
              })
            }), /*#__PURE__*/jsxRuntime.jsx(RowItem, {
              flexible: true,
              left: /*#__PURE__*/jsxRuntime.jsx("span", {
                className: "".concat(style$e.content, " ").concat(style$e.label),
                children: "N\u1ED9i dung h\u1ED7 tr\u1EE3: "
              }),
              right: /*#__PURE__*/jsxRuntime.jsx(EllipsisText, {
                className: style$e.content,
                children: ticket.feedbackContent || "-"
              })
            })]
          });
        }

      case "PRODUCT":
        {
          return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [/*#__PURE__*/jsxRuntime.jsx(RowItem, {
              flexible: true,
              left: /*#__PURE__*/jsxRuntime.jsx("span", {
                className: "".concat(style$e.content, " ").concat(style$e.label),
                children: "S\u1EA3n ph\u1EA9m: "
              }),
              right: /*#__PURE__*/jsxRuntime.jsx(EllipsisText, {
                className: style$e.content,
                children: (product === null || product === void 0 ? void 0 : product.name) || "-"
              })
            }), /*#__PURE__*/jsxRuntime.jsx(RowItem, {
              flexible: true,
              left: /*#__PURE__*/jsxRuntime.jsx("span", {
                className: "".concat(style$e.content, " ").concat(style$e.label),
                children: "L\xFD do c\u1EA7n h\u1ED7 tr\u1EE3: "
              }),
              right: /*#__PURE__*/jsxRuntime.jsx(EllipsisText, {
                className: style$e.content,
                children: displayTicketReason(ticket)
              })
            }), /*#__PURE__*/jsxRuntime.jsx(RowItem, {
              flexible: true,
              left: /*#__PURE__*/jsxRuntime.jsx("span", {
                className: "".concat(style$e.content, " ").concat(style$e.label),
                children: "N\u1ED9i dung h\u1ED7 tr\u1EE3: "
              }),
              right: /*#__PURE__*/jsxRuntime.jsx(EllipsisText, {
                className: style$e.content,
                children: ticket.feedbackContent || "-"
              })
            })]
          });
        }

      default:
        {
          return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
            children: /*#__PURE__*/jsxRuntime.jsx(RowItem, {
              flexible: true,
              left: /*#__PURE__*/jsxRuntime.jsx("span", {
                className: "".concat(style$e.content, " ").concat(style$e.label),
                children: "N\u1ED9i dung h\u1ED7 tr\u1EE3: "
              }),
              right: /*#__PURE__*/jsxRuntime.jsx(EllipsisText, {
                className: style$e.content,
                children: ticket.feedbackContent || "-"
              })
            })
          });
        }
    }
  }, [ticket]);
  return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
    sx: {
      width: "100%"
    },
    children: /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
      direction: "row",
      justifyContent: "space-between",
      sx: _objectSpread2({
        width: "100%"
      }, action && {
        paddingRight: "35px",
        position: "relative"
      }),
      children: [/*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
        direction: "row",
        spacing: 1,
        sx: {
          width: "100%"
        },
        children: [/*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
          sx: {
            width: "4rem"
          },
          children: /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
            component: "img",
            src: img$j,
            sx: {
              objectFit: "cover",
              width: "52px",
              height: "52px"
            }
          })
        }), /*#__PURE__*/jsxRuntime.jsx(material.Table, {
          sx: {
            width: "100%",
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          },
          children: /*#__PURE__*/jsxRuntime.jsxs(material.TableBody, {
            children: [/*#__PURE__*/jsxRuntime.jsx(RowItem, {
              flexible: true,
              left: /*#__PURE__*/jsxRuntime.jsx("span", {
                className: "".concat(style$e.label, " ").concat(style$e.title),
                children: "Phi\u1EBFu h\u1ED7 tr\u1EE3"
              }),
              right: /*#__PURE__*/jsxRuntime.jsx("p", {
                className: "".concat(style$e.title, " ").concat(style$e.uppercase),
                children: " ".concat(ticketType[ticket.type])
              })
            }), /*#__PURE__*/jsxRuntime.jsx(RowItem, {
              flexible: true,
              left: /*#__PURE__*/jsxRuntime.jsx("span", {
                className: "".concat(style$e.content, " ").concat(style$e.label),
                children: "Ng\xE0y t\u1EA1o: "
              }),
              right: /*#__PURE__*/jsxRuntime.jsx("p", {
                className: style$e.content,
                children: ddmmyyyy(new Date(ticket.createdTime))
              })
            }), /*#__PURE__*/jsxRuntime.jsx(RowItem, {
              flexible: true,
              left: /*#__PURE__*/jsxRuntime.jsx("span", {
                className: "".concat(style$e.content, " ").concat(style$e.label),
                children: "Tr\u1EA1ng th\xE1i phi\u1EBFu: "
              }),
              right: /*#__PURE__*/jsxRuntime.jsx("p", {
                className: style$e.content,
                children: ticketStatus[ticket.status]
              })
            }), ticketInfo]
          })
        })]
      }), action && /*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
        direction: "column",
        spacing: 1,
        sx: {
          position: "absolute",
          top: "-5px",
          right: "-5px"
        },
        children: /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
          size: "small",
          href: ticketUrl(ticket),
          target: "_blank",
          children: /*#__PURE__*/jsxRuntime.jsx(LaunchIcon__default["default"], {
            sx: {
              color: "#15A959"
            }
          })
        })
      })]
    })
  });
};

var _path$5;
function _extends$6() { _extends$6 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }
var SvgWarning = function SvgWarning(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$6({
    width: 16,
    height: 15,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$5 || (_path$5 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M8.982 1.565a1.13 1.13 0 0 0-1.96 0L.165 13.232c-.457.778.09 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.565ZM8 4.999c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.994a.905.905 0 0 1 .9-.995Zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z",
    fill: "#664D03"
  })));
};

var css_248z$e = ".GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_reaction__8gljs {\n  position: absolute;\n  z-index: 5;\n  transition: 0.3s;\n  display: none;\n  bottom: 4px;\n  cursor: pointer;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_message-content__c4KRA:hover .GroupMessageItem-module_reaction__8gljs {\n  display: block;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_message__s-Rbe {\n  padding: 4px;\n  padding-bottom: 0;\n  border-radius: 8px;\n  flex-direction: column;\n  display: flex;\n  align-items: flex-end;\n  text-align: left;\n  max-width: 100%;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_message__s-Rbe .GroupMessageItem-module_time__Em0LO {\n  text-align: right;\n  align-self: flex-end;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_my-message__ai8QY {\n  background-color: #e8ebfa;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_my-message__ai8QY .GroupMessageItem-module_time__Em0LO {\n  color: #8d8d8d;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_another-message__UYAva {\n  background-color: white;\n  align-items: flex-start;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_another-message__UYAva .GroupMessageItem-module_time__Em0LO {\n  color: #8d8d8d;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_content__2UXRA {\n  word-break: break-word;\n  white-space: pre-wrap;\n  max-width: 480px;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_content__2UXRA span {\n  color: #161FF4;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_content__2UXRA a {\n  color: #161FF4;\n  text-decoration: underline;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_time__Em0LO {\n  font-size: 0.7em;\n  margin-top: 2px;\n  margin-bottom: 2px;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_error__LaAF5 {\n  font-size: 13px;\n  color: red;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 100%;\n  margin: 5px 0;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_warning-box__IVlY7 {\n  background: #FFF3CD;\n  border-radius: 8px;\n  padding: 8px 8px 0px 8px;\n  margin-top: 8px;\n  display: flex;\n  gap: 12px;\n  color: #664D03;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_warning-box__IVlY7 .GroupMessageItem-module_title__yORGq {\n  font-weight: 600;\n  margin-bottom: 2px;\n}\n.GroupMessageItem-module_group-message-item__OiRkc .GroupMessageItem-module_warning-box__IVlY7 .GroupMessageItem-module_time__Em0LO {\n  text-align: right;\n  color: #8D8D8D;\n  font-size: 0.7em;\n}";
var style$d = {"group-message-item":"GroupMessageItem-module_group-message-item__OiRkc","reaction":"GroupMessageItem-module_reaction__8gljs","message-content":"GroupMessageItem-module_message-content__c4KRA","message":"GroupMessageItem-module_message__s-Rbe","time":"GroupMessageItem-module_time__Em0LO","my-message":"GroupMessageItem-module_my-message__ai8QY","another-message":"GroupMessageItem-module_another-message__UYAva","content":"GroupMessageItem-module_content__2UXRA","error":"GroupMessageItem-module_error__LaAF5","warning-box":"GroupMessageItem-module_warning-box__IVlY7","title":"GroupMessageItem-module_title__yORGq"};
styleInject(css_248z$e);

var MESSAGE_MAX_SIZE$1 = "80%";

var GroupMessageItem = function GroupMessageItem(props) {
  var _conversation$custome, _message$reactInfo;

  var message = props.message;
      props.previousMessage;
      var nextMessage = props.nextMessage,
      seenBy = props.seenBy,
      isBigScreen = props.isBigScreen,
      handleReplyMessage = props.handleReplyMessage,
      replyFor = props.replyFor,
      handleClickReplyFor = props.handleClickReplyFor;

  var _useContext = React.useContext(ChatContext),
      user = _useContext.user,
      conversation = _useContext.currentConversation,
      openSupportTicketCallbackFunc = _useContext.openSupportTicketCallbackFunc;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isErrorMedia = _useState2[0],
      setIsErrorMedia = _useState2[1];

  var _useState3 = React.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      contextMenu = _useState4[0],
      setContextMenu = _useState4[1];

  var justifyContent = React.useMemo(function () {
    if (message.senderID === (user === null || user === void 0 ? void 0 : user.accountID) && !isBigScreen) {
      return "flex-end";
    }

    return "flex-start";
  }, [message, user, isBigScreen]);


  var _openSupportTicketWindow = function openSupportTicketWindow(type, data) {
    openSupportTicketCallbackFunc && openSupportTicketCallbackFunc(type, data);
  }; // const isMostPrevious = useMemo(() => {
  //     return (previousMessage == null)
  // }, [previousMessage]);


  var isLastest = React.useMemo(function () {
    return nextMessage == null;
  }, [nextMessage]); // const isFirstOfDate = useMemo(() => {
  //     if (isMostPrevious) {
  //         return false;
  //     }
  //     const d1 = new Date(message.createdTime).getDate();
  //     const d2 = new Date(previousMessage.createdTime).getDate();
  //     return d1 > d2;
  // }, [previousMessage, message, isMostPrevious]);

  var isLastOfDate = React.useMemo(function () {
    if (isLastest) {
      return false;
    }

    var d1 = new Date(message.createdTime).getDate();
    var d2 = new Date(nextMessage.createdTime).getDate();
    return d1 < d2;
  }, [nextMessage, message, isLastest]);
  var isShowAvatar = React.useMemo(function () {
    return nextMessage == null && ((user === null || user === void 0 ? void 0 : user.accountID) != message.senderID || isBigScreen) || nextMessage != null && nextMessage.senderID != message.senderID && ((user === null || user === void 0 ? void 0 : user.accountID) != message.senderID || isBigScreen) || isLastOfDate || nextMessage && nextMessage.type === "SYSTEM";
  }, [nextMessage, user, message, isBigScreen, isLastOfDate]);
  var isOther = React.useMemo(function () {
    return (user === null || user === void 0 ? void 0 : user.accountID) != message.senderID;
  }, [user, message]);
  var isRaw = React.useMemo(function () {
    return message.status === 'RAW';
  }, [message]);
  var isError = React.useMemo(function () {
    return message.status === 'ERROR';
  }, [message]);
  var hasVulgarWords = React.useMemo(function () {
    return message.hasVulgarWords;
  }, [message]);
  var hasForbiddenWords = React.useMemo(function () {
    return message.hasForbiddenWords;
  }, [message]);
  var content = React.useMemo(function () {
    return getDisplayContentMessage(message);
  }, [message]); // const onReact = (item) => {
  //     handleReactMessage(item, message.messageID);
  // }
  // const onReply = () => {
  //     handleReplyMessage(message);
  // }

  if (!message.content && !message.media && !message.skuInfo && !message.orderInfo && !message.ticketInfo) {
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {});
  }

  var hasSeen = !isOther && (seenBy === null || seenBy === void 0 ? void 0 : seenBy.some(function (seenByItem) {
    return seenByItem.accountType === UserType.EMPLOYEE;
  }));
  return /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
    id: "message-".concat(message.messageID),
    sx: _objectSpread2({}, !isBigScreen && !isOther && {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    }),
    className: "message-item ".concat(style$d["group-message-item"]),
    children: [/*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
      direction: "row",
      justifyContent: justifyContent,
      alignItems: "flex-end",
      sx: {
        maxWidth: MESSAGE_MAX_SIZE$1
      },
      onClick: function onClick(e) {
        e.stopPropagation();
      },
      children: [isShowAvatar && (isBigScreen || isOther) ? /*#__PURE__*/jsxRuntime.jsx(Avatar__default["default"], {
        sx: {
          width: 30,
          height: 30,
          flexShrink: 0,
          padding: "4px"
        },
        src: conversation.customerSupportAvatar
      }) : user.accountID !== message.senderID ? /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        sx: {
          width: 30,
          height: 30,
          flexShrink: 0
        }
      }) : null, /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        sx: {
          paddingLeft: 1,
          maxWidth: '100%'
        },
        children: /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
          sx: _objectSpread2(_objectSpread2({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }, isOther && {
            paddingRight: '4px'
          }), !isOther && {
            paddingLeft: '4px'
          }),
          className: style$d["message-content"],
          children: /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
            direction: 'row',
            alignItems: "center",
            margin: 0,
            sx: {
              width: '100%',
              position: 'relative'
            },
            children: [/*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
              sx: _objectSpread2({
                position: "absolute",
                bottom: 0,
                display: 'flex'
              }, isOther ? {
                right: hasSeen ? "-20px" : "-13px"
              } : {
                left: hasSeen ? "-20px" : "-13px"
              }),
              children: [isRaw && /*#__PURE__*/jsxRuntime.jsx(RadioButtonUncheckedIcon__default["default"], {
                sx: {
                  fontSize: 13,
                  color: "#00975c"
                }
              }), !isRaw && !isError && !hasSeen && !nextMessage && !isOther && !hasVulgarWords && !hasForbiddenWords && /*#__PURE__*/jsxRuntime.jsx(CheckCircleIcon__default["default"], {
                sx: {
                  fontSize: 13,
                  color: "#00975c"
                }
              }), isError && /*#__PURE__*/jsxRuntime.jsx(ErrorIcon__default["default"], {
                sx: {
                  fontSize: 13,
                  color: "red"
                }
              }), (hasVulgarWords || hasForbiddenWords) && /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
                title: "Tin nh\u1EAFn g\u1EEDi kh\xF4ng th\xE0nh c\xF4ng",
                children: /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
                  component: "span",
                  sx: {
                    backgroundColor: "red",
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  },
                  children: /*#__PURE__*/jsxRuntime.jsx(ClearIcon__default["default"], {
                    sx: {
                      fontSize: 11,
                      color: "#fff"
                    }
                  })
                })
              }), hasSeen ? /*#__PURE__*/jsxRuntime.jsx(material.AvatarGroup, {
                max: 10,
                sx: {},
                children: /*#__PURE__*/jsxRuntime.jsx(Avatar__default["default"], {
                  sx: {
                    borderWidth: "1px !important",
                    boxSizing: "border-box !important",
                    width: "18px",
                    height: "18px",
                    fontSize: "12px",
                    padding: "2px"
                  },
                  alt: seenBy[seenBy.length - 1].userID + "",
                  src: conversation.customerSupportAvatar
                }, seenBy[seenBy.length - 1].userID)
              }) : null]
            }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
              className: "".concat(style$d['message'], " ").concat(style$d["".concat(isOther ? 'another' : 'my', "-message")]),
              sx: {
                order: isOther ? 0 : 4
              },
              onContextMenu: function onContextMenu(e) {
              },
              children: [replyFor && /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
                sx: {
                  padding: '3px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                },
                direction: "row",
                spacing: 1,
                onClick: function onClick() {
                  handleClickReplyFor(replyFor);
                },
                children: [/*#__PURE__*/jsxRuntime.jsx(Divider__default["default"], {
                  orientation: "vertical",
                  flexItem: true,
                  sx: _objectSpread2({}, !isOther && {
                    background: 'white'
                  })
                }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
                  sx: {
                    width: '100%'
                  },
                  children: [/*#__PURE__*/jsxRuntime.jsx(Typography__default["default"], {
                    variant: "caption",
                    noWrap: true,
                    children: replyFor.senderID === conversation.customerID ? (_conversation$custome = conversation.customerInfo) === null || _conversation$custome === void 0 ? void 0 : _conversation$custome.name : conversation.conversationName
                  }), /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
                    direction: "column",
                    spacing: 0.5,
                    children: [/*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
                      alignItems: "center",
                      spacing: 0.5,
                      direction: "row",
                      children: replyFor.media && replyFor.media.map(function (item, index) {
                        if (item.type.toUpperCase() === "IMAGE") {
                          return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
                            component: "img",
                            sx: {
                              width: '3rem',
                              borderRadius: '5px'
                            },
                            alt: item.name,
                            src: getImageProxy(item.url)
                          }, index);
                        } else {
                          return /*#__PURE__*/jsxRuntime.jsx(Chip__default["default"], {
                            label: item.name
                          }, index);
                        }
                      })
                    }), /*#__PURE__*/jsxRuntime.jsx(Typography__default["default"], {
                      variant: "body2",
                      noWrap: true,
                      sx: {
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        paddingBottom: "0.1em"
                      },
                      children: replyFor.content
                    })]
                  })]
                })]
              }), message.media && /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
                children: message.type === "IMAGE" && message.media.length > 1 ? /*#__PURE__*/jsxRuntime.jsx(MessageImageList, {
                  images: message.media,
                  message: message,
                  isRaw: isRaw,
                  isError: isError
                }) : /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
                  children: message.media.map(function (item, index) {
                    return /*#__PURE__*/jsxRuntime.jsx(React__default["default"].Fragment, {
                      children: /*#__PURE__*/jsxRuntime.jsx(MessageMedia, {
                        isOther: isOther,
                        message: message,
                        item: item,
                        setIsErrorMedia: setIsErrorMedia,
                        isErrorMedia: isErrorMedia,
                        isRaw: isRaw,
                        isError: isError
                      })
                    }, index);
                  })
                })
              }), message.skuInfo && /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
                sx: {
                  background: "#F5f5f5",
                  padding: "4px",
                  borderRadius: ".5rem",
                  // width: '100%',
                  // width: '340px',
                  width: '434px'
                },
                children: /*#__PURE__*/jsxRuntime.jsx(ProductItem, {
                  action: {
                    openSupportTicketWindow: function openSupportTicketWindow(product) {
                      return _openSupportTicketWindow('PRODUCT', product);
                    }
                  },
                  skuInfo: message.skuInfo || handleSkuInfo(message.tagItem)
                })
              }), message.orderInfo && /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
                sx: {
                  background: "#F5f5f5",
                  borderRadius: ".5rem",
                  // width: '100%',
                  // width: '340px',
                  width: '434px',
                  padding: "4px"
                },
                children: /*#__PURE__*/jsxRuntime.jsx(MessageOrder, {
                  action: {
                    openSupportTicketWindow: function openSupportTicketWindow(order) {
                      return _openSupportTicketWindow('ORDER', order);
                    }
                  },
                  order: message.orderInfo
                })
              }), message.ticketInfo && /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
                sx: {
                  background: "#F5f5f5",
                  borderRadius: ".5rem",
                  // width: '100%',
                  // width: '340px',
                  width: '430px',
                  padding: "4px"
                },
                children: /*#__PURE__*/jsxRuntime.jsx(TicketItem, {
                  ticket: message.ticketInfo,
                  action: "link"
                })
              }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
                className: "".concat(style$d.content),
                dangerouslySetInnerHTML: {
                  __html: content
                }
              }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
                className: style$d.time,
                children: /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
                  direction: "row",
                  alignItems: "center",
                  spacing: 0.5,
                  children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                    children: getFormattedDate$1(new Date(message.createdTime), 'HH:mm')
                  }), message !== null && message !== void 0 && (_message$reactInfo = message.reactInfo) !== null && _message$reactInfo !== void 0 && _message$reactInfo.some(function (reactItem) {
                    return reactItem.value > 0;
                  }) ? /*#__PURE__*/jsxRuntime.jsx(ReactInfo, {
                    reactInfo: message.reactInfo || []
                  }) : null]
                })
              }), /*#__PURE__*/jsxRuntime.jsx(MessageContextMenu, {
                contextMenu: contextMenu,
                setContextMenu: setContextMenu,
                menu: [{
                  text: "Phản hồi",
                  onClick: function onClick() {
                    handleReplyMessage(message);
                  }
                }]
              })]
            })]
          })
        })
      })]
    }), isError && /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
      className: style$d.error,
      children: "Kh\xF4ng th\u1EC3 g\u1EEDi tin nh\u1EAFn n\xE0y"
    }), (hasForbiddenWords || hasVulgarWords) && /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
      className: style$d["warning-box"],
      children: [/*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
        direction: "row",
        children: /*#__PURE__*/jsxRuntime.jsx(SvgWarning, {})
      }), /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
        children: [/*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
          className: style$d.title,
          children: "C\u1EA3nh b\xE1o vi ph\u1EA1m"
        }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
          children: hasForbiddenWords ? 'Tin nhắn của bạn có chứa các từ ngữ cấm hoặc cố tình chia sẻ thông tin cá nhân vi phạm quy định của sàn, vui lòng điều chỉnh.' : 'Tin nhắn của bạn có chứa các từ ngữ thô tục nhạy cảm, vi phạm tiêu chuẩn cộng đồng, vui lòng bình tĩnh lại.'
        }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
          className: style$d.time,
          children: /*#__PURE__*/jsxRuntime.jsx("span", {
            children: getFormattedDate$1(new Date(message.createdTime), 'HH:mm')
          })
        })]
      })]
    })]
  });
};

var StyledBadge = styles$1.styled(Badge__default["default"])(function (_ref) {
  var theme = _ref.theme;
  return {
    '& .MuiBadge-badge': {
      right: -5,
      top: -3,
      border: "2px solid ".concat(theme.palette.white),
      padding: '0 4px',
      background: "#00975c"
    }
  };
});

var ScrollToBottom = function ScrollToBottom(_ref2) {
  var element = _ref2.element,
      conversation = _ref2.conversation,
      _onClick = _ref2.onClick;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isDisplay = _useState2[0],
      setIsDisplay = _useState2[1];

  var _useContext = React.useContext(ChatContext),
      messagePagination = _useContext.messagePagination,
      loadMessageInConversation = _useContext.loadMessageInConversation;

  var handleScroll = function handleScroll() {
    if (element) {
      var scrollBottom = element.scrollHeight - (element.clientHeight + element.scrollTop);

      if (scrollBottom >= 50) {
        setIsDisplay(true);
      } else {
        setIsDisplay(false);
      }
    } else {
      setIsDisplay(false);
    }
  };

  React.useEffect(function () {
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return function () {
        element.removeEventListener("scroll", handleScroll);
      };
    }
  }, [element]);
  React.useEffect(function () {}, [conversation.unreadMessage]);

  var scrollToBottom = function scrollToBottom() {
    if (!messagePagination.isOverBottom) {
      loadMessageInConversation('top', true);
    } else if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  if (!isDisplay) return null;
  return /*#__PURE__*/jsxRuntime.jsx(Grow__default["default"], {
    "in": isDisplay,
    children: /*#__PURE__*/jsxRuntime.jsx(Paper__default["default"], {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
        position: 'sticky',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '-16px',
        background: '#e4e6eb',
        width: '30px',
        height: '30px',
        zIndex: 5
      },
      children: /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
        onClick: function onClick() {
          if (_onClick) {
            _onClick();
          } else {
            scrollToBottom();
          }
        },
        children: /*#__PURE__*/jsxRuntime.jsx(StyledBadge, {
          badgeContent: isDisplay && !messagePagination.isOverBottom ? conversation.unreadMessage : 0,
          color: "secondary",
          children: /*#__PURE__*/jsxRuntime.jsx(KeyboardArrowDownIcon__default["default"], {
            sx: {
              color: '#000'
            }
          })
        })
      })
    })
  });
};

var MessageCarousel = function MessageCarousel(_ref) {
  var data = _ref.data;
      _ref.open;
      var handleClose = _ref.handleClose,
      selectedIndex = _ref.selectedIndex;
      _ref.loadMore;

  var _useState = React.useState(selectedIndex >= 0 ? selectedIndex : 0),
      _useState2 = _slicedToArray(_useState, 2),
      index = _useState2[0],
      setIndex = _useState2[1];

  var _useState3 = React.useState(20),
      _useState4 = _slicedToArray(_useState3, 2),
      limit = _useState4[0];
      _useState4[1];

  var downloadLinkRef = React.useRef(null);

  var handleDownload = function handleDownload() {
    if (downloadLinkRef && downloadLinkRef.current) {
      downloadLinkRef.current.click();
    }
  };

  React.useMemo(function () {
    var startIndex = index;
    var endIndex = index; // if(index < 0){
    //     return {
    //         startIndex: 0,
    //         endIndex: 0,
    //     }
    // }
    // while(!(endIndex - startIndex >= limit || endIndex - startIndex >= data.length)){
    //     if(startIndex > 0){
    //         startIndex -= 1;
    //     }
    //     if(endIndex < data.length){
    //         endIndex += 1;
    //     }
    // }

    return {
      startIndex: startIndex,
      endIndex: endIndex
    };
  }, [index, limit, data]);
  React.useEffect(function () {
    setIndex(selectedIndex);
  }, [selectedIndex]); // useEffect(()=>{
  //     if(index >= 0){
  //         if(Math.abs(slideIndex.endIndex - index) < Math.abs(index - slideIndex.startIndex)){
  //             loadMore();
  //         }
  //     }
  // },[index])

  return /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
    sx: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      color: '#fff',
      zIndex: 1200,
      backgroundColor: "rgb(0 0 0 / 91%)",
      display: 'flex',
      flexDirection: 'column'
    },
    children: [/*#__PURE__*/jsxRuntime.jsxs(Grid__default["default"], {
      container: true,
      sx: {
        height: 'calc(100%)',
        width: '100%'
      },
      columns: 18,
      children: [/*#__PURE__*/jsxRuntime.jsx(Grid__default["default"], {
        item: true,
        xs: 1,
        sx: {
          display: 'flex',
          alignItems: 'center'
        }
      }), /*#__PURE__*/jsxRuntime.jsx(Grid__default["default"], {
        item: true,
        xs: 16,
        sx: {
          maxHeight: '100%'
        },
        children: /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
          sx: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem 0',
            maxHeight: '100%',
            height: '100%'
          },
          children: [/*#__PURE__*/jsxRuntime.jsx(MainContent, {
            media: {
              type: data[index].type || "IMAGE",
              name: data[index].name,
              url: data[index].url
            }
          }), /*#__PURE__*/jsxRuntime.jsx("a", {
            ref: downloadLinkRef,
            target: "_blank",
            href: getImageProxy(data[index].url),
            download: true,
            style: {
              display: 'none'
            }
          })]
        })
      }), /*#__PURE__*/jsxRuntime.jsx(Grid__default["default"], {
        item: true,
        xs: 1,
        sx: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
      size: "large",
      sx: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        color: '#9a9a9a',
        borderRadius: '100%',
        '&:hover': {
          '& .MuiSvgIcon-root': {
            color: 'white'
          },
          background: '#00000078'
        }
      },
      onClick: handleClose,
      children: /*#__PURE__*/jsxRuntime.jsx(ClearIcon__default["default"], {
        sx: {
          color: 'white',
          fontSize: '2rem'
        }
      })
    }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
      size: "large",
      sx: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        color: '#9a9a9a',
        borderRadius: '100%',
        '&:hover': {
          '& .MuiSvgIcon-root': {
            color: 'white'
          },
          background: '#00000078'
        }
      },
      onClick: function onClick() {
        handleDownload();
      },
      children: /*#__PURE__*/jsxRuntime.jsx(DownloadIcon__default["default"], {
        sx: {
          color: 'white',
          fontSize: '2rem'
        }
      })
    })]
  });
};

var isElementInViewport = function isElementInViewport(el, parentRect) {
  // Special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }

  var rect = el.getBoundingClientRect();
  return rect.top + rect.height >= parentRect.top && rect.bottom - rect.height <= parentRect.bottom;
};
var onVisibilityChange = function onVisibilityChange(el, parentRect, callback) {
  var old = false;
  return function () {
    var visible = isElementInViewport(el, parentRect);

    if (visible !== old) {
      old = visible;

      if (typeof callback == 'function') {
        callback(visible);
      }
    }
  };
};

var ScrollDateChip = function ScrollDateChip(_ref) {
  var onClick = _ref.onClick,
      scrollEle = _ref.scrollEle,
      listMessage = _ref.listMessage,
      callback = _ref.callback;

  var _useState = React.useState(function () {
    if (listMessage && listMessage.length) {
      return new Date(listMessage[0].createdTime);
    }

    return new Date();
  }),
      _useState2 = _slicedToArray(_useState, 2),
      currentDate = _useState2[0],
      setCurrentDate = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isShow = _useState4[0],
      setIsShow = _useState4[1];

  var _useState5 = React.useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      onVisibilityChangeArray = _useState6[0],
      setOnVisibilityChangeArray = _useState6[1];

  var _useState7 = React.useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      didMount = _useState8[0],
      setDidMount = _useState8[1];

  var lastScrollTopRef = React.useRef(0);
  var timeoutRef = React.useRef(null);
  var directionRef = React.useRef(null);

  var handleMessageVisibilityChange = function handleMessageVisibilityChange(id, isVisible) {
    if (isVisible) {
      var message = listMessage.filter(function (item) {
        return item.messageID === id;
      })[0];

      if (message) {
        if (callback) {
          callback(message);
        }

        if (directionRef.current === "up") {
          setCurrentDate(new Date(message.createdTime));
        }
      }
    }
  };

  var handleCheckVisibility = function handleCheckVisibility(e) {
    onVisibilityChangeArray.forEach(function (item) {
      item();
    });
  };

  var handleScroll = function handleScroll(e) {
    if (!didMount) return;
    var st = scrollEle.scrollTop;

    if (lastScrollTopRef.current > st) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      directionRef.current = "up";
      setIsShow(true);
      timeoutRef.current = setTimeout(function () {
        if (didMount) {
          setIsShow(false);
        }
      }, 1000);
    } else {
      directionRef.current = "down";
      setIsShow(false);
    }

    lastScrollTopRef.current = st <= 0 ? 0 : st;
    handleCheckVisibility();
  };

  React.useEffect(function () {
    setDidMount(true);
    return function () {
      return setDidMount(false);
    };
  }, []);
  React.useEffect(function () {
    if (scrollEle) {
      lastScrollTopRef.current = scrollEle.scrollTop;
      scrollEle.addEventListener("scroll", handleScroll);
      return function () {
        scrollEle.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollEle, onVisibilityChangeArray]);
  React.useEffect(function () {
    if (scrollEle) {
      var messageItems = document.querySelectorAll(".message-item");

      if (messageItems) {
        var parentRect = scrollEle.getBoundingClientRect();
        messageItems.forEach(function (item, index) {
          if (isElementInViewport(item, parentRect)) {
            var messageItemId = item.id;

            if (messageItemId) {
              var splitMsg = messageItemId.split("-");

              if (splitMsg.length > 1) {
                handleMessageVisibilityChange(parseInt(splitMsg[1]), true);
              }
            }
          }
        });
      }

      setOnVisibilityChangeArray(function (prev) {
        var result = [];
        var messageItems = document.querySelectorAll(".message-item");

        if (messageItems) {
          var _parentRect = scrollEle.getBoundingClientRect();

          messageItems.forEach(function (item, index) {
            result.push(onVisibilityChange(item, _parentRect, function (isVisible) {
              var messageItemId = item.id;

              if (messageItemId) {
                var splitMsg = messageItemId.split("-");

                if (splitMsg.length > 1) {
                  handleMessageVisibilityChange(parseInt(splitMsg[1]), isVisible);
                }
              }
            }));
          });
        }

        return result;
      });
    }
  }, [listMessage, scrollEle]);
  return /*#__PURE__*/jsxRuntime.jsx(Fade__default["default"], {
    "in": isShow,
    children: /*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
      alignItems: "center",
      sx: {
        width: "100%",
        position: "absolute",
        top: "1rem",
        zIndex: 123123123
      },
      children: /*#__PURE__*/jsxRuntime.jsx(Chip__default["default"], {
        label: getFormattedDate$1(currentDate),
        size: "small",
        sx: {
          backgroundColor: "rgb(0 0 0 / 40%)",
          color: "white",
          fontWeight: "bold"
        },
        onClick: onClick
      })
    })
  });
};

var DateItem = function DateItem(_ref) {
  var dateData = _ref.dateData,
      selectedDate = _ref.selectedDate,
      setSelectedDate = _ref.setSelectedDate,
      selectedRange = _ref.selectedRange,
      startDate = _ref.startDate,
      endDate = _ref.endDate,
      onChange = _ref.onChange;
  var color = React.useMemo(function () {
    if (dateData.isOtherMonth) {
      return "#676565";
    }

    if (startDate && isEqualDate(dateData, startDate) || endDate && isEqualDate(dateData, endDate)) {
      return "#fff";
    }

    return "#000";
  }, [dateData, selectedDate, selectedRange, endDate, startDate]);
  var backgroundColor = React.useMemo(function () {
    if (dateData.isOtherMonth) {
      return "#fff";
    }

    if (startDate && isEqualDate(dateData, startDate) || endDate && isEqualDate(dateData, endDate)) {
      return "#15A959";
    }

    if (selectedRange && selectedRange.start && selectedRange.end && !dateData.isOtherMonth && isBetween(new Date(dateData.year, dateData.month, dateData.date), selectedRange.start, selectedRange.end)) {
      return "#C3F5DA";
    }

    return "#fff";
  }, [dateData, selectedDate, selectedRange, startDate, endDate]);
  return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
    sx: _objectSpread2({
      borderRadius: "100%",
      color: color,
      fontSize: "13px",
      backgroundColor: backgroundColor,
      width: "60%",
      paddingBottom: "60%",
      position: 'relative',
      transition: '.2s'
    }, !dateData.isOtherMonth && {
      cursor: 'pointer',
      "&:hover": {
        backgroundColor: backgroundColor === "#fff" ? "#e4e4e4" : backgroundColor
      }
    }),
    onClick: function onClick() {
      if (!dateData.isOtherMonth) {
        if (onChange) {
          onChange(dateData);
        }

        setSelectedDate(dateData);
      }
    },
    children: /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
      sx: _objectSpread2({
        borderRadius: "100%",
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        width: "100%",
        height: "100%"
      }, dateData.isToday && {
        border: "1px solid black"
      }),
      children: "".concat(dateData.date)
    })
  });
};

var row = 6;
var col = 7;
var CELL_SIZE = 45;

var DatePickerCore = function DatePickerCore(_ref) {
  var month = _ref.month,
      year = _ref.year,
      onChange = _ref.onChange,
      selectedRange = _ref.selectedRange,
      startDate = _ref.startDate,
      endDate = _ref.endDate,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate;

  var _useState = React.useState([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]),
      _useState2 = _slicedToArray(_useState, 2),
      months = _useState2[0],
      setMonths = _useState2[1];

  var _useState3 = React.useState([].concat(_toConsumableArray(_toConsumableArray(Array(6).keys()).map(function (item) {
    return "Th\u1EE9 ".concat(item + 2);
  })), ["CN"])),
      _useState4 = _slicedToArray(_useState3, 1),
      headers = _useState4[0];

  var _useState5 = React.useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedDate = _useState6[0],
      setSelectedDate = _useState6[1];

  var listDate = React.useMemo(function () {
    var now = new Date();
    var today = now.getDate();
    var today_month = now.getMonth() + 1;
    var today_year = now.getFullYear();
    var d = new Date();
    d.setFullYear(year, month, 1);
    var dow = d.getDay() || 7; //1

    var last_month = month - 1 >= 0 ? month - 1 : 11;
    var begin = months[last_month] - (dow - 1);
    var dem = begin;
    var present = false;
    var monthIndex = last_month;
    var yearIndex = year;
    return _toConsumableArray(Array(row * col).keys()).map(function (item) {
      dem = dem + 1;
      var result = {};

      if (dem > months[last_month] && present === false) {
        monthIndex = monthIndex === last_month ? month : monthIndex;
        dem = 1;
        present = true;
      } else if (dem > months[month] && present === true) {
        dem = 1;
        monthIndex = month + 1 > 11 ? 0 : month + 1;
        yearIndex = month + 1 > 11 ? year + 1 : year;
        present = false;
      }

      if (dem === today && month + 1 === today_month && today_year === year && present === true) {
        result.isToday = true;
      } else {
        result.isToday = false;
      }

      if (!present) {
        result.isOtherMonth = true;
      } else {
        result.isOtherMonth = false;
      }

      if (minDate) {
        if (new Date(yearIndex, monthIndex, dem).getTime() < minDate.getTime()) {
          result.isOtherMonth = true;
        }
      }

      if (maxDate) {
        if (new Date(yearIndex, monthIndex, dem).getTime() > maxDate.getTime()) {
          result.isOtherMonth = true;
        }
      }

      result = _objectSpread2(_objectSpread2({}, result), {
        date: dem,
        month: monthIndex,
        year: yearIndex
      });
      return result;
    });
  }, [month, year, maxDate, minDate, months]);
  React.useEffect(function () {
    if (isLeapYear(year)) {
      setMonths(function (prev) {
        var copy = _toConsumableArray(prev);

        copy[1] = 29;
        return copy;
      });
    } else {
      setMonths(function (prev) {
        var copy = _toConsumableArray(prev);

        copy[1] = 28;
        return copy;
      });
    }
  }, [year]);
  React.useEffect(function () {
    if (!isEqualDate(selectedDate, startDate) && !isEqualDate(selectedDate, endDate)) {
      setSelectedDate(null);
    }
  }, [startDate, endDate]);
  return /*#__PURE__*/jsxRuntime.jsxs(Grid__default["default"], {
    container: true,
    columns: col,
    sx: {
      width: "".concat(CELL_SIZE * col, "px"),
      height: "".concat(CELL_SIZE * (row + 1), "px")
    },
    children: [headers.map(function (item, index) {
      return /*#__PURE__*/jsxRuntime.jsx(Grid__default["default"], {
        item: true,
        xs: 1,
        sx: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: "center"
        },
        children: item
      }, index);
    }), listDate.map(function (item, index) {
      return /*#__PURE__*/jsxRuntime.jsx(Grid__default["default"], {
        item: true,
        xs: 1,
        sx: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: "center"
        },
        children: /*#__PURE__*/jsxRuntime.jsx(DateItem, {
          dateData: item,
          selectedDate: selectedDate,
          setSelectedDate: setSelectedDate,
          onChange: onChange,
          selectedRange: selectedRange,
          startDate: startDate,
          endDate: endDate
        })
      }, index);
    })]
  });
};

var createDate = function createDate(date) {
  return new Date(date.year, date.month, date.date);
};

var DatePicker = function DatePicker(_ref) {
  var onChange = _ref.onChange,
      initialMonth = _ref.initialMonth,
      initialYear = _ref.initialYear,
      value = _ref.value,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      selectedDate = _useState2[0],
      setSelectedDate = _useState2[1];

  var _useState3 = React.useState({
    month: initialMonth || new Date().getMonth(),
    year: initialYear || new Date().getFullYear()
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      month = _useState4[0],
      setMonth = _useState4[1];

  var increaseMonth = function increaseMonth() {
    setMonth(function (prev) {
      return {
        month: prev.month + 1 > 11 ? 0 : prev.month + 1,
        year: prev.month + 1 > 11 ? prev.year + 1 : prev.year
      };
    });
  };

  var decreaseMonth = function decreaseMonth() {
    setMonth(function (prev) {
      return {
        month: prev.month - 1 < 0 ? 11 : prev.month - 1,
        year: prev.month - 1 < 0 ? prev.year - 1 : prev.year
      };
    });
  };

  var datePickerChange = function datePickerChange(date) {
    if (date && onChange) {
      setSelectedDate(date);
    }
  };

  React.useEffect(function () {
    if (onChange && selectedDate) {
      onChange(createDate(selectedDate));
    }
  }, [selectedDate]);
  React.useEffect(function () {
    if (!value) {
      setSelectedDate(null);
    }
  }, [value]);
  return /*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
    direction: "row",
    spacing: 1,
    children: /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
      children: [/*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
        sx: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: "100%",
          fontWeight: 'bold',
          fontSize: "1.2rem",
          margin: "0.5rem 0"
        },
        children: ["Th\xE1ng ", month.month + 1, " - ", month.year, /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
          direction: "row",
          spacing: 1,
          children: [/*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
            size: "small",
            onClick: decreaseMonth,
            sx: {
              transform: "rotate(-90deg)"
            },
            children: /*#__PURE__*/jsxRuntime.jsx(ArrowForwardIosIcon__default["default"], {
              sx: {
                fontSize: "1rem"
              }
            })
          }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
            size: "small",
            onClick: increaseMonth,
            sx: {
              transform: "rotate(-90deg)"
            },
            children: /*#__PURE__*/jsxRuntime.jsx(ArrowBackIosNewIcon__default["default"], {
              sx: {
                fontSize: "1rem"
              }
            })
          })]
        })]
      }), /*#__PURE__*/jsxRuntime.jsx(DatePickerCore, {
        month: month.month,
        year: month.year,
        onChange: datePickerChange,
        startDate: selectedDate,
        minDate: minDate,
        maxDate: maxDate
      })]
    })
  });
};

var MessageDatePicker = function MessageDatePicker(_ref) {
  var open = _ref.open,
      onChange = _ref.onChange,
      handleClose = _ref.handleClose;

  var minDate = function () {
    var now = new Date();
    var result = new Date(now.setDate(now.getDate() - 180));
    result.setHours(0);
    result.setMinutes(0);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
  }();

  return /*#__PURE__*/jsxRuntime.jsx(Modal__default["default"], {
    sx: {
      "& .MuiBackdrop-root": {
        backgroundColor: "rgb(0 0 0 / 90%)"
      },
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    "aria-labelledby": "modal-modal-title",
    "aria-describedby": "modal-modal-description",
    open: open,
    onClose: handleClose,
    children: /*#__PURE__*/jsxRuntime.jsxs(Paper__default["default"], {
      sx: {
        borderRadius: "1rem",
        padding: "1rem"
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(DatePicker, {
        onChange: onChange,
        value: !open,
        minDate: minDate,
        maxDate: new Date()
      }), /*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
        direction: "row",
        spacing: 1,
        justifyContent: "flex-end",
        children: /*#__PURE__*/jsxRuntime.jsx(Button__default["default"], {
          sx: {
            color: 'black',
            fontSize: "1rem",
            textTransform: 'none'
          },
          onClick: handleClose,
          children: "\u0110\xF3ng"
        })
      })]
    })
  });
};

var useInfiniteScroll = function useInfiniteScroll(callback, direction) {
  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFetching = _useState2[0],
      setIsFetching = _useState2[1];

  var _useState3 = React.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      element = _useState4[0],
      setElement = _useState4[1];

  var handleScroll = function handleScroll() {
    if (direction === 'top') {
      if (element.scrollTop === 0) {
        printLog("top");
        setIsFetching(true);
      }
    } else {
      if (element.scrollHeight - element.clientHeight - element.scrollTop <= 2) {
        printLog("bottom");
        setIsFetching(true);
      }
    }
  };

  React.useEffect(function () {
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return function () {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [element]);
  React.useEffect(function () {
    if (isFetching && callback) {
      callback();
    }
  }, [isFetching]);
  return {
    isFetching: isFetching,
    setIsFetching: setIsFetching,
    element: element,
    setElement: setElement
  };
};

var img$4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAC/CAYAAADXecHiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAADJ0SURBVHgB7Z0JfBxHne//1df0nBppJEuKLzk4jtcJOTAhx0Li7MIuy5UQ1rHsLATYXfJYFgK78Nh9LIlgz/f5LITNLmETiElCsC05xA4vhJzYOTYXdmKHxLETOZZPSZYsjTSaq696VT3To57RnNLInumprz/tHvV093RX16/+//pXdRUAg8FwPAgYDMa84+tb28aTlQjCEoShHSHsMjDSAOFJHdCEaBiDSJGGhj/zsyjMA0zoDMY84N+0vtXFGZ8jAjsfEPeHZNPCsg5EaA82jH0Y8GMJI/5YdMMvh6EKMKEzGFUiuO3aoJB0fx441I0wvgSqAAbjGQzcxlNo72a4fp8Cs4QJncGYIy33X7eIF6W/JnK6mfwpw3yA0EmsGz9KuJJ3TF237SRUCBM6gzFL2u/7tNdwqX8HGH2FKCkApwEM6Ahg/bbR7t4fVHIcEzqDMQtCD3RfinS0kQhoFZwBSB3+FU3grgt/atPhcvbngMFgVERr7/q/RTo8d6ZETkGA3iNqeHdoy7q/Km9/BoNRHjvWCG3DnT1ENd+CGoJY957RdVu+U2wfZtEZjDJpHW7/l1oTOYVY957W3u7vF9uHBwaDURIipO8ixP091ChE7Jd71p7Pxx54fUf+7xkMRlFCvd3f5AD9G9QBiEM3nly76b4Z24HBYBSk9cF1K0Dl3iBCEaAOwBiPayJ3cW40ntXRGYwiIBX9ol5ETkEINQuqPsOiM6EzGAUg9fK/JNI5H+oMEku4snXLuhuytgGDwZjBqr610ojBHyCq6YI6BGM4LHPa7x27fmuc/s0sOoORh2EsrK9XkVMQgqUJ4D9k/c2EzmDkgcN4A9Q5GKO/tj4z153ByKHtgQ3ngI7fAgcQk6Ejes3mYWbRGYwcsKa/DypnkPjL4XJ3Jhb2FF3K3Z+cO2L+RoV44saVdM2EzmDkwCH00bJ3xnAHxsa5I+s2nzVy/aZmDnOXk62PFNzfgCeIaq86uW5zK12ARyswh24reHoMb2FAf7DkbF+I/gZv4GVk8/8xvykHxP2JuQIGg5FF65b1O0gwa03pPfG3R9Zt+ad834R6u/+LA/SlrL0x/tlo95bP5P3N3g3fRoC/m7U/oANaLHZZ+HPbZ3gKC3rXX0uUvg1K8wIpIK5gFp3ByAEhvLSM3Q4WEjnFQPq3iBm1C/RUUpK+Vmj/0XWb/hFheCnrOjT4eD6RU4g3sJ0UHHdDCTBgc6w6JnQGIxeEziq1i2HgjcW+H79+6wRR2UOZDRieiFx3X/E6OcL3TO8O+0Zu2PR2sd05DvVCCRCgNnNfYDAY2WAsldqFCKeM0VnRUeuTgXF/qb2xAYnMkQBjJfdP8oegJNgcw44JncGYAYqV2sNAqANKc27mjBxaXnJvnmuavgRUcnho3aUvK7UPYJSkKyZ0BiMHEs8eLbUPh+BPi33v7VvbQYJrf2jb9GE61jsU/WHjZttFLGvb3P2BYrsjo4xOPRwcTa0YDEYWiIMjZex2UWtvd0/eb3rWCG4sfJ/Us1sy5wQIunj8w0Ino1F3sleWhcYcbGy5/4ZF+fYP9a7/M9IM+FkoCT6e/n0Gg2Gnta/7ToTRF8rbG99Lot//Mtrd+1bq2PVXIYz/lUjr8rx7I3gVNO1roxu2Pk3/bu+74d0G1m8h++f3EDAeMDi45dTaLfcTteIFP17fbgTQ1xEYf2v2aC/NvaR57bNM6AxGDq2buzeQOvXPwQHoCK8du37LA8x1ZzByQAn9N2X3PKtxDDHxJF0zoTMYOYx8busQRmgH1DmkpPpV+JOpDjdM6AxGHjjA/wX1joE3WR+Z0BmMPGgK/xRZHYS6BR0aXb+FCZ3BKMbYn/18EgP+d6hTSNPct+1/s6g7g1EE0tT2ImlquxTqi0dIk1rWq7bMojMYRZBAuJEEtRSoExCgI4KAZky8yITOYBThxPX3H+Cw8TWoEzDWvz6YZyplNvcag1GC6ANv/Na79nyJ2MsPQA1jYOMfRrt7/zvfd8yiMxhlMBIO9JTz6uiZgk6dfKq7958Lfc+EzmCUw013qXRSBKg5MC5nfvS6mVOKwTjTYASTNdVMhWAcGbh7pLv38VK7MovOYJQJwlByiKnTBSlwfqOBdtHJMkROYRadwSiD4ObuLqKuc+AMg0nzGUb6v526vvdHlRzHhM5glIEI8IdwBiH18ONE5LfrsdhdhUaGLQYTOoNRDgj+oYJ9nybKvArmCkIxEmvbiQH+O+ifeLz/I79OwixhQmcwStDat/4bRLhdpfdEYR3DF8bWbdra3vfpZSqoqwUdrsEcXES+PJt87yl6NMAo+W/YMIwnAHG/0aKxZy3rXXIQu1JXBgwGoyCtfd2fQBg9VHJHjJ/lOPHG4et/VmgIZrRgy7qzDYSXYOCbEDa8mEMcxkYMGdwxpClHRj/9YMVzq5ULEzqDUQRizQdItL3YzC0DoOs9Ixv67oUahrnuDEYRSDv1MVJXzhI6nQWVuOj3Ix5vH127ZSfUAUzoDEYxOP1PdeDfz2Ek8tg4lMRoKNy9+TCdoA0YDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWDUJQ3dBTa47bNBUUleA6cJAxthxHFhLRrfO5tXDavNggf/7EJD1a4FB4AADYys21zT3VDPJA3dM05OJII6h+6B0wSHOHPmO9Hjhrbe9WGMjZ0Ycdt1Ae0M5xmid77BCfU9iOd6wAkgvJP8z4RegEYeSgphVT+THk0QIe5a8gDuETU80Lqle0eod/2NcPpAwDno8WPTO2VDoxWgUROGZgpkRJI1M649QmgNFX3blu5Dp0Hw9P55rBrOGdcfY/OegIk9L40sdJ6fUCWoNRDqsgQf/MWGpVB9UHoRQNWdI3SD1ovoiE9mnmZiz6FRE4TeN58cm6rdGAURvOnS93bfCtWFvnVF718gdXTnxGiIRW9tbWUWvQCNmChWvZzHSa3mLRqJJve0blm3LfjTa4NQHegzT7m5uuGc548xNzo6yoRegEZ23Tms1IfrSoN2JFK/wxxyuDqYYifxK6c9f/o82ahJeWhEoVsDBiBs4HrKFBcJCFXDsmfuHzTdQaLIjAOBenp6gJENc3PqCISI2N3yNqgOzhohBWcsOSZCZ1Y9h4ZuR4f6sugmtBmurfeG22DuLqqzxIDMgisjdmBk0cjBOAxcvY77ZXw1dP/auXRddZ4QMKLP1RI7s+g5MNe9TuFEYWPTHR9thgqhk+yCE4WAsFV4MWueh0YOxkE9uu42glKzvwcqfIYI2W6Zd1wXWNTZ2WlZdoaNxrbodeu6p+HQV5ruvHYZVI553w58+HhwcJCJPA+NXEd3BJLfdQtU9hytOiwywEmgzH+MmTDXvc7BPPcJf8+aFig/k0/XZXUnST3LkDPB59DIFt0RmYHcRNC9fAF9262xq2HI1hGI1dFn0MgW3aj7Onoag0OfANp3H5fnoSxfvpyunGX1MBN4MRpxhBkzg7e0tCANnAHiuSu9f3VJC4mon4QSmZ02r6Uj73TWXqe5uEzsBWhYd29sbKwue8YVQlq92LTqUMJSWyKn/xnYcI4osl13VkfPoZHrdXXcM24mnCBcCGVkcoxtt+ykdvRpmEXPA+sZ5xA4DrqgPIs+/b2jou4Z0Nq1a4GRDRO6Q8Aidz6UIXScZdIdxPTba7B161ZgZNPY7ejOognKGBwxbdAd2NcdWF/3IjRqO3oqozsoGEcETIVuDRNV7Lk6qh9BBuzQ+6oSDe26i6IIDsMSejEwWFbPecE4Zs0L0KhCNzOEqmtOyxjlDo7ovPZmhKx30TELxs2E1dGdgoEnoVK3PKFNgkMwktqx9EfEgnEzYW+vOQSkY5rRrTHbS2EWdtrw1HFwCFg3HFNozQesec0hYGxkLPqaNWtKFWami2u8MngMnEJMpYXWdPyBkUVjC91BUXcjpr1pfd65c2ep3U0xTO3oD0PKE6h7tJPRzP339PQwsefARphxCMbQ1EvWR4CsEVFzyQSt6NpIqPvBASSe6t8HaYvOxnWfSUMKffXq1eA01DeGqEWzF1zFCjGrMNAhkngJ6hycUF9WXjo2QT8uX76cWfM8NGTUfffu3eAkcFLbrz70FnXBja6uLkvEhbAsvW4e+uzhJ6HO0U/F6T3Q+zb6+/tZPT0PrI7uAPQj4Z8lk0lTuAMDA6UyOv3OeptFn3rg9aOkfv9bqGPUZw89BdNeChN5Hhp5kkXH1NGVXcep+62nl3LuyRI7XXTjVPQpqFNwXPnt1LZ9RyF170zsBWjUdnTHZAQcTvwyuj2T0e2ZvehhYNXRScB6astr20hjWwTqEP145CGYvvdyC7qGg/WMq3PiD+37EVlp6UUv8zBL5KbQ1V3HwtqJyM+hzsCacWL8W49vk2XZuv9yCrmGhPWMq2OM8fj/iz5ygFpzS+SWRS/r8PT+pkgi9+25H1R9EOoI7a3RO+kqkUiowIRelIaso69ataruxxWj1iy+7Q2a0VXbUkn91BI6XVRtz4nxxO+G/x3qBFrIhb/zFJ1C2rp3y21nQs9DQwp93759dZ8htAMjP4499vYR4rZaGd2y6mXf1+rVq430sQpdR/7v00+RwNzDUONg4nnkKeQsi87IA3sfvQ7RBie3hL/7m+3kY5K4rUlICbXSjE77E2Qsevoc6sQdL3+v1l345CvHv08LOfoRsu+dCb0ADS10VVWh3sBx9e3xr/7qe5ASp5XR6efZ1k9127mS2utD44n79vxVrUbh9aPjP0n858u0OVBJL/S61Z6eHibyIrC31+oJRR+K3b/nGzAtzER6TS3abERupI9V0+cyzxd5/K0jyV++9SVyxpoSuzowfvfY1x+9S02V0Na9m/VzJvTisOa1OgETkUfv2f3F2JP91GWlmTze1NQ0V2tunhpSVt2yjqaAJje9+mbswTe+XCtiVw+NbQx/89G7IH3vkPZAYPaFXEPBou51AJ5SXg1/98nPxJ46SJvSaOaO+/3+xMTEhJXRqyF03Tp3eklE+17bN3XnS5+jhQycQfQDo7eH/+6xH5OYimK7Rip4K9rOrHkJWNS9xtFPTPaFb3roS9rbY2Mwbc0SkUgk47bC3O/FIK6vFb3O/AZZkvEd7xyNbtz1JTwa/TWcbkgBE3/87S+P3fLEZnotxGO3W/PZBCAblkYcGpfeM51c0h34y0vOdX1w+ctQi9BMvvOdf566exd91c4SYMy20L+rmdFputDBJWlThEwWj21xkUVo/tbVH+VXtn0eSXwHzDP68cmtkz98YaN2cGwcUqK27j8KKbFbQmduexk04myqtY2Bp9S3Rn8avvXJPsgOlMW9Xm+UYAWhqu2yWi48Bdm2WS/AyOP/vONh95plr7o/df7n+QW+P4F5AEeUPYnnBzZObdz9CnHV6f0nJUlKKIpCxU1FXk1PpmFo1MHuqdWqKYtOM7h2fOLZqfteeYRYMTr+W1Y0nIg8ZhO5ldHnA9Pj6ezsFAcHB6klt6y79VkiC+++atlZ8gfP+QDfFVw7ZwtPC7fByKOkae8ZKnBIFSz25kNqye0uuxWAZJRJI7vuHiL0FWdM6CRz46jar41M7Uk+duDR+M6BEzBtpc0OLC6XK0kBW50ZTk+fbi690AKRCtwN00Knayp2wdov8BeXXMytbP2AEPQsR37porJ+gVRN1OHIc9qRiT3xX735in5wnEb3rXuzt5Fb925tY/XyWdDIQpelP1qx0PuxFV8imU7COuaJ+HgO0WnTUxribBOPGnnmJuQAIQOKT1qYOV9Sn8JxZcpI6JHkqyf6lWcODQqCgDVNM08PthdMwNbUFQgEEpOTk/ZMfroCidbUTlTsVNh2iy6nt9PFmjQiM8Gj57rzz0EBl0/q9HcYxrQm9bg2ZRyfHEy+enxYf2d8ErKrBmYBR9x0hQLZ/QSse2cinyUN6bqvXr1a3L17N82sfrL4yOKFdMApvUtm8MScQ+3bcM5+uMBx2HZOimWN7YMkWCK33NKkbbG/tHG6M7kldr69vV1MJBISadKj6WRZdcuyZ6y7bbGOt6cL2Nbm/ZN6uE6i6VndcCH73k2RY4x1hJwzmOfpppHr6DSz0ronFbubZDgXyXCWVconcovMd7SvfE43Wpzelu97DNkWLOudcJgWurXkCvxMWTI63zi3detWyxOyLLy1Fqw1scYcMcb2aaGyBE/Sw0inh2FbrPu3CzsjcNt+TORzoFGFblkhs/mI1IVlUhUW09tMIZNMi0imLTdz5bNcWZDzATmfFUCzxGt/qcQSumbbVksvaljWnUsH6vimpiaBWHhT6LIsC8Ti2914a8JHex6zIuXWfdnvVW1padHGxsbMQo8ULjopXKx9GXOkUYXOEfedJ+67Ve+0RG63QLnkc9EBZnoAhT7nuup2odstuw7ZTV21hiVefvny5Vx/f7/ddadryyuyXHh7WtirLYbf79cjkYj9vu3eS92/SlxLNKrQKQLJqHw6o1oWiC7F3HaA7MyX2Y8EzYAEzXIzJso5xp6BrQyfGeeNvphRRy9nINtipV2uyK39KHbh2l13e6HGXjWdJxpZ6LmZ1D4TaW4ADWCmdSlWh7d/bw9CoVWrVmFbF1zD9l09Wy+UZ8n9zn5/uQUes9yM+YdYUXt9MtdSoTksxY53MqXShcFgMBgMBoPBYDAYDAaDwWAwnAmLgM4TwZ9eG5TcrqUGxwXt2znDCJ/s7t0LDif4iw1LJVUP5t7/fNEo6TpbmNCrRGvf+qsA4zWkRXgNQoi+qlk0g2MMe0hz8gBG3HZdQDvDn9p0GOoUWqiJHvc1Brl/DtAakqu64HSD8M6R67dcDYy8MKHPAZrBBY98MwL0VSgh7FJgjHdihO45tW7zvVAnhLZuuAbpxldJwbYGzjj46ZF1GaGzDjg5MKHPguDm7i4ewa0cQp+FaoPxgIFQTy0Lvq1vw83kOntgjoVbVcHGMyPdvX8A2T0OGWmY0Cugmha8JFTwwH31VPemh6BGoNUTZOB7AKEuqDUM49mR9b1/BHMf596RsJlayoRaccHt2kFE3gOnw5IRMXEIb2/dsv42qAFae9ffhjDsrEmRUwxsvj23atUqHhgzYBa9DEK9628kbvoPiJU9M64qse6qyK05EwE7WsCJHN5GbEJ5Y8GdKTTjf0Zu6P0YZE/swEjDLHoJWnu7byWJdM8ZEzmFWFFRNXZS0cFpxBQ5gh01L3IKNuyvxjJyYAlThNbeDbemXfUzDxU7h3acLrFnRF6rrnouGNlfOWb18xyY0AtA6sZfRWBGlmsJU3zzLfaUu47qR+QUhPMOCMJIwYSeh7bN3RcT+1ATQbAZpCz7tqY7PtoM8wMSEK2Tn4FOL9WDWfQcmNBzaLr7urOBQw9CbXORFAzcCvNguVo3k+oKqoM6eS54xqg2DBtM6Nkgyee6BerBmvFwc+vPr18DVcT0ZDh8K9QlpraZJS9AY02ySIeMOvt5N8hNM0r81ogfca7wBSSn3Ah1AhL4jWS1HKrTlMSRe99Wr6aQXDsvr+nyC8sWc1MX+wTo8BXoHXdMh+tfiEOD0TAuTuvdn/DrflezS+fzejFGTOEMr+tpUjdfBHUE0o2/Pbmh9wcwx26fLfdf/3le5O+GOgUr+ivaznf+gl/cEucX+xTOIxVMD0VXtLHo4WG4abcKDUJjuO47egTB4wkVEjlWdYRc0mX1JnKKwXPfhrk/R4HjuVug3hHTa80oasAkXhJaWpe2A8YNY+gawnX3H9nbBJLL/CwM6sOBF97IuLrKlIIS4QSX/Mr7vwh1CMmpwZaNa68d+/zWX8Ds6qio5b61NyIOLYU6hjSFKsoD+4ZdAVfUf2VT0hP1zLTo550HxxfEvO5mf5OkSEL7zz7jGU7Nue54GkLoHj8JXSXN6UCUob/ZSuf4spfknO8fP3i2m0PvhzqF9whfJqvtkJrxpOLDOUH4DDiA2GhMJ4sx/s64NTFGNlv3AaxZE3Hf5G+ifyrxwYaJUTWC645wQs8SNmSPMc67Fgc/DvUMgit9X7+iBSp/npz/ex85G/FwJTiLMseUbwZokDiV04WOSmw3hY5Eob6FTpDP66StBRUL3dXmuwqcQ75ZYbKJRDJ5AsfUhqmjN4RFz7MtM22S+39dHkRC/brtGQT+QsieWqoUqX7hPPoEOIJMO7p9CqyZUz7F46jQwU6mUTvMZIQu/17oQnACIvcByJ4RthwExHN1HYSbBoPP57PP2Jq7pLa73eXOoecoGlHo9ofPCQHXBeAAEEJL3J+5nFY689RF88KFvvYHzWTPd4MjQDA1NVVo1trpxe9vyN5zDSF0pPHmwzWmFOt+ramRkYHqu1nJjrzCuwzKe6ZmbEJp55aBU0i9vZZvhtps133FdB0deaYaRvQN0byQ4BXVDS6QfJLg/69PBiNuXQke5fjwgX4X4lEXOATO5+kiq11QKiCVnulVEKXaGdxxjmCMBHlNl09YthhJFy9JjnUoM9vRI0nkE3m39af0Njeb5si6xMlCz5TcE9sPRb3XXUA7P/PekMvvJdv05imxucMvIw61gUMwJETbh8sJyJneDOcWHePNAO3rvrK1me9wy7w3rnToebrAejyZj1oMlNF/fzwBDULdCh2TInzrC8dkCEzwPlcn527SjYE3otrhp+9Venp6rDpaKsNv3Wec8MZGFl19SUiTeJF2ecVRA4FhOCoQwxHtQvlC55zWBRQb6fsp0QXWmIrFR2/rH8/3Xc8OLLwnsltK+OVUFcjVpLcl+9Wrr766rq1/XQmdivvX/WN+nNQ9j+4Zkv1ucvlqiCwKJKYAOoIydFxzE+z40xsTIyPRqX1PPxAjojcPhXsGtGNSaLzj6nMW0A3x4VMTsOn1Sf69SzSn5HZd1SoROgKMHBOjITekqA++OcQV6AI78pHzWniZl5Gh4JN/+ctT9u9IHuHfe93n/BzmvcgYEiC4MNNtnpJwr4THXj6uJ7mp+MdXrwiTwGfdib5uhP7QcyP+J3efaCbNQVypXJxQZdkflOX3ffgvtLsv/uDEn1/z/pj5RXy6g4Q3CnByJIo9CDl1sP9C9XQrKs9hXXeQRce0C6xWqAts+8fPpTU3608zbdasWYP+9/c3t2DAHk5Hxb0AkeNFCPiIgfE9tncoJo29OVZPVr7mhU6t+P7jkZaEqvuHwpWlK3LxwllL3hX65a4Dru/ctGFiN6TeSqSue0ThBHlVM0/Ozzkot1PyNq/RdLx653f4yFsnpJFDx13q60P+5KnEMejwgxPABnDkecri2W2Ga0EbjLZEsgpwomPentm/9v0+8UNXXBEi8hZQhU3pkoQ9rSsudT23fyT8/pVtEagDaj6PHzg+2Wpwoo9+TiQSEA4nYDYRFCWqKl944VsTaJHaRt8954cVKX5kyC2+/+yfgMi/BxwAGop9Y9Vj0v1/9JGPqRdcucbwugT+sy9/RxSESSGaNme0kNOPRUX96CmZa/K+i7u4vdaHzSqLzPvoncEEvyyQLPQ+OjI4/Mnw75/65KXXtmjEO4QKIbVDCAanGyuirvj4e1taJqDGqek62uHD4WZL5BRZliHYMbsWIckrSl88/zozwu7iRaSAAjiJUXqYYEfQLDcHrvj9qxcEWheGjDgOJmKcD/kUV9Tus4o8BvrGrkRCG2+NDoKBp6CBWOpZgD50xUdaqyFyijfpbn795Ekf1Dg1K/Qdr5/0xSRXU+52ktZm0E2Gyrm04zL4cPBSSJyMROO7jk4kDpycIPUzx7SlkiARVshaEMRM3TxYaPYosiPmSUGn6f3gBDDW4uR5xveNh5VJY0wZmcgsycOj43TxST7tpo4bYTa5J5/IMz+t+pp7duyo6WpwTV4crU++djxe0HRTy97RIcPAUBgq5ZqOa+HX3/xpJPbam9TKId9NlzsmIoWId0IMNWjadNCxC9phiPyzMEfT0TkMXrchjqnYiCT3ciGh/kZ9zYH4ZUbyuSPEeTkSjz24m445YA/Gmenxjb4+qUPuqDjPy0VEThE4xH9q6SWhHoBhqFFq0qK/MQJeiUclHwi17JVCS/Ovf7GH9pkxHz4xgo6KxdEqCbXoLjmVNrnWi7ruLq8bIx5hTTB0PDy1B5xDwWe5Zs1n+UtW/b4bKoQmY0ewdHVRcPPuRx552wU1Sk0K3YdiZYWCTcs+C7Ev6lpGu0il3mvEyDH9nbHZ31syPycTqZAlsWAz9lMEFSNRN5CbM5SXT7wKmlGzlqhCcM46wzU33yhr6mzq5eXnrwUXttdsE8acXXfqZg8MDLgGogOZcym6gkNqSHnve99b8SibfX19fFzjyi4ZzQAdKXBpNL5cRJ+HW/Ox9cLOhzc76qUGu+tOLbphYJJRs60RzbgtKACeWCtEYyeNaPiUcWpCe1wJSZ8GZ2B/qSXDwoVdFVsEMxZUgdBdxK5D6fcM8vLI24+43Em3vZ8OLDpvkXoOOicJVWBWQqfi3n1it1sTNP/zh56XOcQh2TudINRdVMm/548+r8ZQLMEv5CeuRuV1LpDPPrti98csdWXS9FZBu9uKC84Xdz4MBueYvmEpi2657tSi+yUXCUCuBJf8x6b72UUCczTjKknFGGwd1A+ig3q/1q8ffm1s2+tXSddhDrxQ3+QOOpGh2dMkaWr5mqlU5BRaV79z1y7hpjIN3I5DO2S/5PfFE+AROJXLVePowCi8+PaLmuAREk2xpsg558xe9BULfcehQ/L/HH21hddViUZuuSK9KJGGRC94RRgAPxH95OWLLh+nkeEip0d+PiTBLKDBknCZwTlNUZAs8bT0TBKjh52idWrRfV4vBN0cam+SIdBEGy0SpCBcOWNfnVTPJZ9kuGSX1jTCTbjH1O2xVvEGqG/yvpp65527eCLysh8zrQ1WKnKLTuik+UqDIlZ9B43Qd0ErLUpURSUFROHzYQELZB/fqDDqe+btZ6L6MX18Nj3yKsrjzx5+tlmGoQ5eT1YsRiL6wM7+nQt37dolFttP4GffUa3c+rogSbjN00Gvw1GuO80wXkkCr8+HpzPqzDSRXBJubmk2PD6PHvQFdbKvvmRXdDsy6n7oY7xo0aLc99GJ+k6IlZxktiKntCQifLHvn9v/nN+/wn+WDJX/iCiIXmGJcNbeob0Ve15lC33HgV2tgiE0wRyQBVnQOrT2vtdfz1dQzDn6bdbXy0g+atGlULNQjd+sKai3pCigqkrOfc1MFFESccAdMKjIZb+sNk+JE/5hZRPUKwiw3++HY8eOzagjS/7FZRum2bjsdqLRZMF3J4irHuRdfIhY6Fk7kQIncLF4rO2Jg09UpMWyfnBV35+3yJJald4/WMXCkuDUAhp8yPM1SijanF4yCZbTFEIsOhg6t3jxuTw4DWLRRVHCyWSi+GwlJA0CgYAeCAbUQFNA9Xg96oqdsW1C3Pgd1CMYUCQSSX2axkyDphZ/WUKX5blZc0oyeTgzepF9OxUmKUKqNtDHlKI1t9/36bIte0mht/1wrW9Mjwb2J4agWlCx+zk/sex9Mx7A4L7+OfdUC5Yw69Si84KAve9e5CNG0DnhOPp+edqiu1xyJsPLBdx30S9ib4tXd3vcGqmrq6Ioaotfitxejy480TmdZNEHn7vY13znWh/0mYsX7v6ED8dxWUIPzlHkFNICNWPiCGrJfZyvqvPZPza0HzicCJkTh5ZB0Z3WkqYuvSk13NBjA/uhmlAXpNPd2ZFr2Z977hcKzBH6wEo9Ml3TUNuKTiJ0VFH9rZbheB5bFj37m/yp4fV5jY6zOrQFoQVKsC2oSF5JDQ5qx0OvRf4N6g9zhJnQwlCrKOihDp1vNRePJ8S5hJJB52AVrLluYOMrX/lKltCpyKtpyS1eDO8FLPHcshXHyhohqajQt45sdUu8LqROfMB8e6yaULG3otYFdst+1113GYqO59Wqm647oQloNcc51XSDvl+u5Csn86eFadVJXb2pvUkLtYWU5kCz4pbcaufvYnu9RxMboV6xjTDTJXeV1bddroI1T0xEs5rVqu2uW+wc2gNDaS3G0ZR7+e1fLtkkXVTorS18wPpMXw59KFz93pI6r/NLgktonT0jdk6JzHk6W7mIVbdc94Vcu46x4Zypc2kwjlj0GcG4InmYWvXWQKsebAnSunrSH/An3S63suyJ8C/dJxJ9UCdYkywam3af8Gzec7zlwddO+O7bNfjh4KUl21yrYc0pesCVKWWJyAPVdtctHhs6nPX3qP9oya69BYW++gtfEAWrP2Wa7QN7q27VKVadveenPebvjY6FdagChR4etejUdZckkXNUA1u6jp5LMYtGrXqwM6g3NTdpxI1Pkma3pNfrVYilV971aHiTrz/6Q2TgGNQ8yJxkcfydcX1g54C+b+s+vf/X/doKWFzabQ9Wx+gefvMls/384dcebpovke8PD8H+xEDWtpDcTLveFnVNCwkdHblwfIY7MF9WnULd+A9d9aH222+/XYhr43Oup1MKue90NCpq0XmZRyIvOWskXClf3Km4taJib2tv01vbWrWOro5EoDUQbwo2JanYu56JPNHx+OjXOc0YgZrGLLFzJ1TkBK9c9PnO3Y5Pkxgc1Pqe72sK+UNzaoYuxr0DL83YFoU439PTMyuhg1dR8ybQfFl182IQhy77yGULBoffqJqdzWfVafdQl4uWY6IZrgVHoeQJxlGKZ+nmULPe3tWuUhd+UceihD/kj3sCHoVG40Mn9BOLHhz+hutk8hGoYYgnkplqy9rmM4JFhR4MVk/qLRe1SIs7FwdgnnhxaGCGNbfoW/VG0X4hBYU+7so/0yS16r1DL8J8QevsF55/adXcnnzPkbrusWiU3J/qNJWT1oRUz0IiUKgUWl9ftGSR2rakLbnkrCXxzvbOKKm3x2W3rDTHhfCSh4Y2Lvz1yS8JUX0f1CDRaHar4Nq1PYiOG1jsmGrUzVOEYT4tOaV36OmC300eg6J9QgomAo1IK5C/78qjQ3vhjzsugw65mo7PNCoX4WiBIlfBsUo9yGwPhAbjzA+Kw/rAkmAcrZLQYFwykSQueWViN+vrLUE9mZx+d8IwDGRwBo5H4gZpPZLE49qg5+fHbh27OHh+5F2eNUqLeBXUDtaUTOay9H3FX5AKzlP+nQ9opH0gUflAKxb5hG7Wb6a0cV2C/AUUlc29A4/BN1deA/NDR1VEbkEfaDhd3aAFyJgRxweNd/CbsddANwcicYhdJ8E42ikgn+tO07OcYTXNfvChZoNUbczWCI7nsCAIxgg/YvAcb5BCQOKSnBDaM/Ga/4WR1w7Ikz9B71nwbvHctj9GXuldpP51hsZPy0ybnOkC++x5v+X7B45DV5COs9NhvpvfYWvtqq7O56/QoHn33qGXiu4jTHqL2qyCFr0tLuJiQ1u+GB4gy364LLgSqkuQCLMDqkPCXIZgAHoHXoT9cJgkWhhisUnQj04iPRHGfHjhcyQid9zQVJ5kj9TsJbSZio5IgTiJrDlzqgN6ImsgydSEfqUxZ0KhtSODToDEYZzqoYUM4ktw6fHksYHcgltEPNmxks6/dIxibEYYMPC8gQRO8yjiUELX0My+7pTyM6LP7zNoF1lq2QUatOR5U+xhd1ifPDWpC6Igho+Etd+9+jtV00ig+akDR8lhtP6O/GvPfxfuDHRIZwWWGwLycbLgm54RhuPJJZsdlEgKJ800IPdP0gZnYiUl0xaZaZZqSwQXcBy99xho2sH0DplXVU8NTbkOu/eSuu1eWyrIZtv6yuBSuKnjw7NKn/zQPvIrSfxqAACqG8PqHXg6Y6gKMdBzT9Fm4oJCP9B3PNH5N+eSbF54epv/2P80dF2UXUrODSryLqiclKBTaRFOfc5sp2dNwM5ETokokMxFkkZ54u0HtJeGk/GhUxz4BDcRDU0TM7Pw7T4f7xFFMHSsHJ60+U0kj0U1A8xcXtQdyPR7FhZ4Za7T32Q2+L45GoakZjUhopYFC/jzVr07YCDECUjAGtaQteZJ1Yu+2kvHAKDeh/U3PZD+LXKSLsqy6vX7E2ctbJnizxYKCKWyjEwte3tnu05Ejz1eDyZ/G+6wW0vGk7Hfvvhb/dihY3Q3KlpaN+RIQYBIcqDI1tdpF0q6PA3Zfb45vsPj4dsDPjMNXh89RRLaIMfkDhSBaOFCz2VPR8EnCxqP+fT5sOARBK7D7wNO1Izw1AgX0065LwxJ8WV+FRaEMNy1Ox5WJwTBnd0KQXPG/sR+6EiAKcqELX0yXiTJz6nPlaWZeQzJv9UU+05iTB8NF++VqmmCVdey0mxGHigcqNi921CnlipCQCpYz6GJdicpbW6tigvfUaYlT6RkbKo6nCXoQtB6ehc590C6vz4dNw25OSw1yUZ8PG4AiZMKLQu9nIcjGSfd912nVp1kNiSoIAlIOndByiU1MyARm2boyddOnARbBoUc19G2nTNf3HeJCj1eEEHRkuZsEub0SWMnT8I78tv6yvMu8GPaaTv9WKw18SMw1siV8OL032Q/AcmYIxZNdkuqW5Q0QXQTS+wyPB7vTN9gZqiiKKQ+TgtCnTR76onxhL7vyD7jgfseMCLHI/Si6OKClMjNv4kw+cy9Tk8LlbUgThTAJah8ynonc0SeSbtU+WlLT7fAcyvbAh7iW2k6+Y7n6ei19L1NlTTU6K6uZjfX5A65Fza7vIt8Pq7Vo6JzQsMenyzFC7hJK4PtOVsS01WbRDiTVNOCt95qK14AmMUFEXu4CmIfItdBrXkpArGh2GjqY0FvqGhEcnTv/kjHBy4oGtDYQ1z4h0gU/hoSnJs9hUROEjwdgEikrfZsWSm3Z4ROH1hUiGIV6waSBVVs8hB7qSnEeic1q/Ot6W5KQIJbtF98ahu1pGL6fXkNUYsct/ZOr+1it0Ma7iUDSbyLHo94FBVFUVdV1TqGO37kSCISDkffd8XVTW5Z5oB2z07/LlEIEXbKszKvx/x9jY7rDCSorJOgmyr7/Gog4NH8gQCpX8/MiKk6egoqYiNmYM2lGcQVV0+NnTLCJ4hbzk8asZMx/am+p/TdpKC3H9/V1QVE5FTAlrgV6zNJT540udJt1ve5Yk8Vnm4OCW6XqOs6kTqKQ775y/Oln0RSzMUpZjRFcpnVKt7tMgs84Elp7HIpyC0qqsvQeeKp0YJ8wVmt0kgRb3RpmdVDe76ze88zCwC7V5sSeyIxt/dDqBEdKuGyI0U3jBe0kiPPFBJ6KrHv2JfULlyZLGbVKfeQRnyacBeRoEflFK6Th01hVscFMkfyTDvfSV3FROAG5/Vq2KspsNAPeMfBU2qb1w2CmMqUNDMtC3h5lyTwxFgl+0cmiDhB1VRMgl2gDYZpRrdGErFnztxS1czwSCKCDHlob0OIetCUMqHotv3NfSYnJ+HZHY+OX7B6tXvFORd4vU1eRCRJXWLyoISsp5WyegJ1FLBXljVvsFltbulQgi0hzaDFAnZhmkdik8dj/QcH9OjQsDEwsFd76qmZIs7DDM9kYGDA/FlIDaNseSOmqInI+fRna7FEnrVGsoh5n4ujlaMkx9GJIwzIM+yT7RpSTKiceDSZUDyYt54NETbHLfF5QRIxHo1PKrH4FG9oceLQK0iOqb8biRgd554DhVgZnFscKLsACM4Ymy/lxs++zn4viSlRI1qKqeNj0cF7dpZ8NySf0LMyrfzkYFjsXrYgrhSfivY/SOlz28qZN1yc4u56uZHicliac12c36VDNHVPUrMbtCePRKb6x6x5tJDX60Xc+e3NfNDlRsjQI796azjdXc9Ir+mx+VzPvK67pzNE6o5ejk7ty/v5CAyCmrOPuZAAGDpx+HD04ks/rPuag4KXeOsyL2M6Bh+JgCNe53EiPTkiicFhRaWz0EiG7PHqoi+kRzXBEHTRUMJWSMHrEQO++N0bfxDZ/fDDeQdOzEM+8Vl/28/Br1q1Cvbt22cXtF3omfq5mQYL3Tpa6kVApzfmeZrWOkyL3Z4WM6z61JGhrHRSFoWE4CVnAfJwRmJMGU/85iA9H01TmumNJXd8NFCoe2VHld8zKdRCNNs6+2OkKW17iSg7hYO4vvj+wUi6U0PBEXApxVx3M7GPbX1BO3v1ojAs5Yt2YqHR7L/f/xD868p1ZbZPllMnr16TRe7Dpe6dp6tZi49HSEDIQOK5CxTYPWUF11A0GkXNC9tdfJtAomDY7qbbM6Y98xcqCM3zaU0ylpeHZNPhPdgejb81kCt0a83dfMv3WiVPE91TsSZjoC6VNQNLc7p9PBadQh6yTRBFzLk9hkCa1dxeHxape2ujObTU/U//+GP3yJffif3Hf/7rFBF8IQuAS2zLHXzRICK3Xz9nW8/ojur6vQ6kNzelLt7lipHmD8sjMnLSwvodrrOzEwYHB1HO9wgCblFYEoqT1gHQTpquK01P3TpWRJJYSOhdVX+hrHp1djruwz3liDwO+okHXz51Yt9gWS1AxTJnrjtmf2iUQvXS3NI4X521UNAq97yQsw3y/Ga+c5SDdZzlQhs5v51rlazv7etc1xPTPsfpOdmt38hn5axpfY2c3+Nta8hzDbnXb0+zQhYY5/mM8+wDUFjUUOAc+TIZyllTeNvauicdpoVJ0w3b0i33XHaPwVqs7+2FrfU8EBQODOICa4D8earQNeVSKChb6jdLnSt3m/1vKx9ZiwEFrr2Y0K1Eyq13VSKmWidXtHbh2cWeb99SGR5s57LS0X6u3ELC+i272O0ZejbYry/fNecTdjmfy7IiNjiYKVIrk+Za9FxmeAYw89nk3lNuoZCv8KlnrPu0C1yHInmxWDDOckftbqlThZ4rBPt9IigumHKw74sKbKfnTfeuyfp+Lmme77pneCEFjiv291yvBaCyQsO+T25+zD235UXZ75vLc556JtfgFAtqmpR6RdNKVKu0cJrQC4kg183Lty9A+ZkU5RxTSFx2j8L6nbmMaZfPghe6/tzrrCb2c5cbEMx3bL5CGGBmIWL/DQ6cI3CLfHm2KKiM73PdpHKEXizDzDUzlVOHwhUck08M1jEI8ou00uu3n8t+HoDsc6ECSznnL2aZMcz9HuZCvnsplAblnIuSW0+3n6vSNLSn33wVdoV+bzZgKJxvC/5gORdVKLHsGbfalBJsbgAlH5VYjdzEypcxAWZ3r/kskH0NeX4XFThH7jWWm0FnK6xqgPJ8nuu15Bac1jo3rVGR4+3HWttwnnWp6yiUTwsdX875Sz3bfIV40YssF1TGBc2WM1GK5v5d6IEU+34211DqXJU8E/sxlRRqZ4rce5uvNJ1NGs43lebxcvLKmXyWdUEtZgTG6Wcu+eB05aGq/M7/B/AKqlTCvxmbAAAAAElFTkSuQmCC";

var EmptyContent = function EmptyContent() {
  return /*#__PURE__*/jsxRuntime.jsx(system.Box, {
    sx: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "#f5f5f5"
    },
    children: /*#__PURE__*/jsxRuntime.jsxs(system.Box, {
      borderRadius: "3px",
      padding: "3px",
      textAlign: "center",
      children: [/*#__PURE__*/jsxRuntime.jsx("img", {
        src: img$4,
        alt: "Empty"
      }), /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
        sx: {
          fontSize: "24px",
          fontWeight: "700",
          color: "#15A959"
        },
        children: "Xin ch\xE0o"
      })]
    })
  });
};

var css_248z$d = ".ListMessage-module_list-message__PhQpd {\n  overflow-y: auto;\n  overflow-x: hidden;\n  max-height: 100%;\n  height: 100%;\n  margin-bottom: 100px;\n  padding-top: 10px;\n  position: relative;\n}\n.ListMessage-module_list-message__PhQpd .ListMessage-module_message-row__-9gdL:hover .ListMessage-module_reaction__UVmZ4 {\n  display: block;\n}\n.ListMessage-module_list-message__PhQpd .ListMessage-module_reaction__UVmZ4 {\n  transition: 0.3s;\n  display: none;\n}\n.ListMessage-module_list-message__PhQpd .ListMessage-module_message-animation__-CgME {\n  animation: ListMessage-module_myEffect__k0KLx 2s linear 0.3s 1;\n  transform-origin: center;\n}\n@keyframes ListMessage-module_myEffect__k0KLx {\n  0% {\n    background-color: #68d3a4;\n  }\n  100% {\n    background-color: #f5f5f5;\n  }\n}";
var style$c = {"list-message":"ListMessage-module_list-message__PhQpd","message-row":"ListMessage-module_message-row__-9gdL","reaction":"ListMessage-module_reaction__UVmZ4","message-animation":"ListMessage-module_message-animation__-CgME","myEffect":"ListMessage-module_myEffect__k0KLx"};
styleInject(css_248z$d);

var ListMessage = function ListMessage(props) {
  var selectedMediaId = props.selectedMediaId,
      setSelectedMediaId = props.setSelectedMediaId,
      setReplyMessage = props.setReplyMessage;

  var _useContext = React.useContext(ChatContext),
      user = _useContext.user,
      listMessage = _useContext.listMessage,
      getMoreMessage = _useContext.loadMessageInConversation,
      pagination = _useContext.messagePagination,
      listResource = _useContext.listResource,
      loadResource = _useContext.loadResource,
      conversation = _useContext.currentConversation,
      getMessageByDate = _useContext.getMessageByDate,
      getReplyMessage = _useContext.getReplyMessage,
      foundMessage = _useContext.foundMessage,
      setFoundMessage = _useContext.setFoundMessage,
      seenConversation = _useContext.seenConversation;

  var _useState = React.useState(new Date()),
      _useState2 = _slicedToArray(_useState, 2),
      currentDate = _useState2[0],
      setCurrentDate = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isBigScreen = _useState4[0];
      _useState4[1]; //set to true for adaptive mode


  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      openCarousel = _useState6[0],
      setOpenCarousel = _useState6[1];

  var _useState7 = React.useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      openDatePicker = _useState8[0],
      setOpenDatePicker = _useState8[1];

  var scrollAutoBottom = React.useRef();
  var oldScrollHeight = React.useRef();

  var fetchMoreMessage = function fetchMoreMessage() {
    var scroll = oldScrollHeight.current;

    if (!pagination.isOver && !foundMessage) {
      getMoreMessage().then(function (list) {
        setIsFetching(false);
        var element = scrollAutoBottom.current;

        if (element) {
          element.scrollTop = element.scrollHeight - scroll;
          oldScrollHeight.current = element.scrollHeight;
        }
      });
    } else {
      setIsFetching(false);
    }
  };

  var fetchMoreMessageBottom = function fetchMoreMessageBottom() {
    if (!pagination.isOverBottom && !foundMessage) {
      getMoreMessage("bottom").then(function (list) {
        setIsBottomFetching(false);
      });
    } else {
      setIsBottomFetching(false);
    }
  };

  var _useInfiniteScroll = useInfiniteScroll(fetchMoreMessage, "top"),
      isFetching = _useInfiniteScroll.isFetching,
      setIsFetching = _useInfiniteScroll.setIsFetching,
      setElement = _useInfiniteScroll.setElement;

  var _useInfiniteScroll2 = useInfiniteScroll(fetchMoreMessageBottom, "bottom"),
      isBottomFetching = _useInfiniteScroll2.isFetching,
      setIsBottomFetching = _useInfiniteScroll2.setIsFetching,
      setBottomElement = _useInfiniteScroll2.setElement;

  var data = React.useMemo(function () {
    return listMessage || [];
  }, [listMessage]);
  var lengthData = data.length;

  var handleAutoScrollBottom = function handleAutoScrollBottom() {
    if (scrollAutoBottom.current) {
      scrollAutoBottom.current.scrollTop = scrollAutoBottom.current.scrollHeight;
      oldScrollHeight.current = scrollAutoBottom.current.scrollHeight;
    }
  };

  var handleClickReplyFor = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(message) {
      var foundMessageResult;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getReplyMessage(message.messageID);

            case 2:
              foundMessageResult = _context.sent;
              setFoundMessage(foundMessageResult);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleClickReplyFor(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var onDateSelected = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(date) {
      var foundMessageResult;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return getMessageByDate(new Date(date));

            case 2:
              foundMessageResult = _context2.sent;
              setOpenDatePicker(false);
              setFoundMessage(foundMessageResult);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function onDateSelected(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var onMessageVisible = function onMessageVisible(message) {
    if (message.senderID !== user.accountID && !hasSeenMessage(conversation, message, user)) {
      seenConversation(message);
    }
  };

  React.useEffect(function () {
    if (foundMessage) {
      setTimeout(function () {
        var msgEle = document.getElementById("message-".concat(foundMessage.messageID));
        msgEle && msgEle.scrollIntoView({
          block: 'center'
        });
      }, 200);
    }
  }, [foundMessage]);
  React.useEffect(function () {
    if (listMessage !== null && listMessage !== void 0 && listMessage.length && (listMessage[listMessage.length - 1].status === 'RAW' || !foundMessage) && pagination.isOverBottom) {
      handleAutoScrollBottom();
    }
  }, [listMessage === null || listMessage === void 0 ? void 0 : listMessage.length]);
  React.useEffect(function () {
    setElement(scrollAutoBottom.current);
    setBottomElement(scrollAutoBottom.current);
    handleAutoScrollBottom();
  }, [setBottomElement, setElement]);
  React.useEffect(function () {
    setCurrentDate(new Date());
    return function () {
      setFoundMessage(null);
    };
  }, []);
  React.useEffect(function () {
    if (selectedMediaId) {
      setOpenCarousel(true);
    } else {
      setOpenCarousel(false);
    }
  }, [selectedMediaId]);

  if (!conversation || !(listMessage !== null && listMessage !== void 0 && listMessage.length)) {
    return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
      className: style$c["list-message"],
      children: /*#__PURE__*/jsxRuntime.jsx(EmptyContent, {})
    });
  }

  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx(ScrollDateChip, {
      scrollEle: scrollAutoBottom === null || scrollAutoBottom === void 0 ? void 0 : scrollAutoBottom.current,
      onClick: function onClick() {
        setOpenDatePicker(true);
      },
      listMessage: listMessage,
      callback: onMessageVisible
    }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
      ref: scrollAutoBottom,
      className: style$c["list-message"],
      sx: {
        paddingBottom: !pagination.isOverBottom && isBottomFetching ? '0px' : '32px'
      },
      children: [/*#__PURE__*/jsxRuntime.jsxs(Grid__default["default"], {
        container: true,
        paddingX: 1,
        children: [!pagination.isOver && isFetching && /*#__PURE__*/jsxRuntime.jsx(CircularProgress__default["default"], {
          size: 30,
          color: "success",
          sx: {
            margin: "10px auto"
          }
        }), data.map(function (message, index) {
          var seenBy = conversation.members.filter(function (member) {
            return member.lastMessageSeen === message.messageID && member.userID !== user.accountID && message.senderID !== member.userID;
          });
          var previousMessage = index - 1 >= 0 ? data[index - 1] : null;
          var nextMessage = index + 1 < lengthData ? data[index + 1] : null;
          var isFirstOfDate = isFirstOfDateMessage(message, previousMessage);

          var messageClass = function () {
            var result = "".concat(style$c["message-row"]);

            if (foundMessage && message.messageID === foundMessage.messageID) {
              result += " ".concat(style$c["message-animation"]);
            }

            return result;
          }();

          return /*#__PURE__*/jsxRuntime.jsxs(React__default["default"].Fragment, {
            children: [isFirstOfDate && /*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
              alignItems: "center",
              sx: {
                width: isBigScreen ? MESSAGE_MAX_SIZE : "100%",
                marginY: "18px"
              },
              children: /*#__PURE__*/jsxRuntime.jsx(Chip__default["default"], {
                label: getFormattedDate$1(new Date(message.createdTime)),
                size: "small",
                sx: {
                  backgroundColor: "rgb(141 141 141 / 8%)",
                  color: "rgb(88 88 88 / 87%)" // color: "#9f9f9f",

                },
                onClick: function onClick() {
                  setOpenDatePicker(true);
                }
              })
            }), /*#__PURE__*/jsxRuntime.jsx(Grid__default["default"], {
              item: true,
              xs: 12,
              sm: 12,
              md: 12,
              lg: 12,
              p: 0.5,
              className: "".concat(messageClass),
              onAnimationEnd: function onAnimationEnd(e) {
                var _e$animationName;

                if ((_e$animationName = e.animationName) !== null && _e$animationName !== void 0 && _e$animationName.includes('ListMessage-module_')) {
                  setFoundMessage(null);
                }
              },
              children: /*#__PURE__*/jsxRuntime.jsx(GroupMessageItem, {
                currentDate: currentDate,
                reaction: style$c["reaction"],
                isBigScreen: isBigScreen,
                handleReplyMessage: setReplyMessage,
                seenBy: seenBy,
                message: message,
                previousMessage: previousMessage,
                nextMessage: nextMessage,
                replyFor: message.replyForMessage || null,
                handleClickReplyFor: handleClickReplyFor
              })
            })]
          }, message.messageID);
        })]
      }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        textAlign: "center",
        children: !pagination.isOverBottom && /*#__PURE__*/jsxRuntime.jsx(CircularProgress__default["default"], {
          size: 30,
          color: "success",
          sx: {
            margin: "10px auto",
            visibility: isBottomFetching ? "visible" : 'hidden'
          }
        })
      }), /*#__PURE__*/jsxRuntime.jsx(ScrollToBottom, {
        listMessage: data,
        conversation: conversation,
        element: scrollAutoBottom.current || null
      }), openCarousel && /*#__PURE__*/jsxRuntime.jsx(MessageCarousel, {
        data: listResource.filter(function (item) {
          return item.type !== "FILE";
        }).map(function (item) {
          return {
            name: item.fileName || "",
            url: item.URLMedia,
            messageID: item.messageID,
            type: item.type,
            content: item.content || null
          };
        }),
        open: openCarousel,
        handleClose: function handleClose() {
          setSelectedMediaId(null);
        },
        selectedIndex: listResource.filter(function (item) {
          return item.type !== "FILE";
        }).findIndex(function (item) {
          return item.messageID === selectedMediaId;
        }),
        loadMore: loadResource
      }), /*#__PURE__*/jsxRuntime.jsx(MessageDatePicker, {
        onChange: onDateSelected,
        open: openDatePicker,
        handleClose: function handleClose() {
          setOpenDatePicker(false);
        }
      })]
    })]
  });
};

ListMessage.propTypes = {};

var _path$4;
function _extends$5() { _extends$5 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }
var SvgAttach = function SvgAttach(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$5({
    width: 24,
    height: 28,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$4 || (_path$4 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M21.335 14.803 12.7 23.45a5.938 5.938 0 0 1-8.383-8.383L15.495 3.892a3.59 3.59 0 0 1 4.946 0 3.52 3.52 0 0 1 0 4.945l-9.64 9.626a1.07 1.07 0 0 1-1.509.056 1.068 1.068 0 0 1-.056-1.509l7.167-7.153a1.403 1.403 0 1 0-1.984-1.984l-7.167 7.181a3.83 3.83 0 0 0 0 5.435 3.94 3.94 0 0 0 5.435 0l9.626-9.64a6.286 6.286 0 0 0-8.886-8.885L2.251 13.14a8.732 8.732 0 0 0 12.42 12.252l8.648-8.633a1.403 1.403 0 0 0-1.984-1.984v.028Z",
    fill: "#757575"
  })));
};

var _path$3, _path2$1;
function _extends$4() { _extends$4 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }
var SvgTicket = function SvgTicket(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$4({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$3 || (_path$3 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M12 22.5a10.5 10.5 0 1 1 0-21 10.5 10.5 0 0 1 0 21Zm0 1.5a12 12 0 1 0 0-24 12 12 0 0 0 0 24Z",
    fill: "#757575"
  })), _path2$1 || (_path2$1 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M7.883 8.679a.355.355 0 0 0 .361.37h1.238c.207 0 .372-.169.399-.374.134-.985.81-1.702 2.012-1.702 1.03 0 1.971.515 1.971 1.753 0 .952-.56 1.39-1.447 2.056-1.01.733-1.809 1.59-1.752 2.98l.005.326a.375.375 0 0 0 .374.369h1.217a.375.375 0 0 0 .375-.375v-.158c0-1.076.41-1.39 1.515-2.229.914-.694 1.866-1.465 1.866-3.084 0-2.266-1.914-3.361-4.01-3.361-1.9 0-3.982.885-4.124 3.429Zm2.335 8.644c0 .8.637 1.391 1.515 1.391.913 0 1.542-.591 1.542-1.39 0-.829-.63-1.41-1.543-1.41-.877 0-1.514.582-1.514 1.41Z",
    fill: "#757575"
  })));
};

var _path$2, _path2;
function _extends$3() { _extends$3 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
var SvgEmoji = function SvgEmoji(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$3({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$2 || (_path$2 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M12 22.5a10.5 10.5 0 1 1 0-21 10.5 10.5 0 0 1 0 21Zm0 1.5a12 12 0 1 0 0-24 12 12 0 0 0 0 24Z",
    fill: "#757575"
  })), _path2 || (_path2 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M6.428 14.35a.75.75 0 0 1 1.024.275A5.247 5.247 0 0 0 12 17.25a5.248 5.248 0 0 0 4.548-2.625.751.751 0 1 1 1.299.75A6.747 6.747 0 0 1 12 18.75a6.747 6.747 0 0 1-5.847-3.375.75.75 0 0 1 .275-1.024Zm4.072-4.6C10.5 10.992 9.828 12 9 12s-1.5-1.008-1.5-2.25S8.172 7.5 9 7.5s1.5 1.008 1.5 2.25Zm6 0c0 1.242-.672 2.25-1.5 2.25s-1.5-1.008-1.5-2.25.672-2.25 1.5-2.25 1.5 1.008 1.5 2.25Z",
    fill: "#757575"
  })));
};

var _path$1;
function _extends$2() { _extends$2 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
var SvgProductTag = function SvgProductTag(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$2({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M22.001 2A6.62 6.62 0 0 0 19.812.54a6.437 6.437 0 0 0-2.6-.54c-.91 0-1.777.18-2.602.54A6.62 6.62 0 0 0 12.42 2L2.175 12.285a6.785 6.785 0 0 0-1.903 3.048 6.878 6.878 0 0 0-.064 3.587 6.749 6.749 0 0 0 1.777 3.11 6.506 6.506 0 0 0 3.109 1.747c1.205.317 2.4.296 3.584-.064a6.543 6.543 0 0 0 3.046-1.873L22 11.587a6.626 6.626 0 0 0 1.46-2.19A6.45 6.45 0 0 0 24 6.792c0-.91-.18-1.777-.54-2.603A6.626 6.626 0 0 0 22.002 2ZM9.851 20a4.215 4.215 0 0 1-1.871 1.047c-.698.169-1.407.169-2.126 0a4.224 4.224 0 0 1-1.84-1.048 4.092 4.092 0 0 1-.888-1.333 4.09 4.09 0 0 1-.317-1.587c0-.55.105-1.08.317-1.588.211-.508.507-.952.888-1.333l4.22-4.222 5.836 5.841L9.851 20ZM20.13 9.713l-4.22 4.19-5.805-5.81 4.188-4.221a3.844 3.844 0 0 1 1.84-1.048c.719-.19 1.427-.19 2.125 0 .72.17 1.343.519 1.872 1.048a3.85 3.85 0 0 1 1.047 1.873c.19.698.19 1.407 0 2.127a3.848 3.848 0 0 1-1.047 1.84Z",
    fill: "#757575"
  })));
};

var _path;
function _extends$1() { _extends$1 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var SvgBox = function SvgBox(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$1({
    width: 22,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M21.077 6.67v-.29l-.086-.174a.946.946 0 0 0-.114-.145l-.086-.086h-.058l-4.72-3.01L11.58.218a.778.778 0 0 0-.344-.203h-.086a.861.861 0 0 0-.314 0h-.115a1.8 1.8 0 0 0-.4.174L1.424 5.772l-.114.087-.286.26-.086.174v.202a.475.475 0 0 0 0 .232v10.532c0 .212.048.405.143.578.115.174.258.319.43.434l8.953 5.613.172.058h.085c.21.077.42.077.63 0h.086l.171-.058 8.868-5.526c.172-.116.305-.26.4-.434a1.03 1.03 0 0 0 .172-.579V6.814l.029-.145ZM10.95 2.646l2.117 1.331-6.665 4.167-2.117-1.331 6.665-4.167ZM9.75 20.731 3.198 16.68V8.955l6.55 4.108v7.667Zm1.201-9.78L8.662 9.562l6.665-4.195 2.289 1.447-6.666 4.137Zm7.753 5.671-6.551 4.137v-7.696l6.55-4.108v7.667Z",
    fill: "#757575"
  })));
};

var css_248z$c = ".MessageGeneratorMenu-module_message-generator-menu__06ToU .MessageGeneratorMenu-module_menu-item__Bgw5C {\n  width: 40px;\n  height: 40px;\n}\n.MessageGeneratorMenu-module_message-generator-menu__06ToU .MessageGeneratorMenu-module_menu-item__Bgw5C img {\n  height: 24px;\n  width: auto;\n}";
var style$b = {"message-generator-menu":"MessageGeneratorMenu-module_message-generator-menu__06ToU","menu-item":"MessageGeneratorMenu-module_menu-item__Bgw5C"};
styleInject(css_248z$c);

var MessageGeneratorMenu = function MessageGeneratorMenu(_ref) {
  _ref.widgetClick;
      var stickerClick = _ref.stickerClick,
      attachClick = _ref.attachClick,
      supportClick = _ref.supportClick,
      botClick = _ref.botClick,
      productTagClick = _ref.productTagClick,
      orderTagClick = _ref.orderTagClick,
      ticketTagClick = _ref.ticketTagClick,
      attachDisabled = _ref.attachDisabled,
      widgetDisabled = _ref.widgetDisabled,
      emojiButtonRef = _ref.emojiButtonRef,
      disabled = _ref.disabled;

  var _useContext = React.useContext(ChatSettingContext),
      isShow = _useContext.isShow;

  var _useContext2 = React.useContext(ChatContext),
      isCustomer = _useContext2.isCustomer;

  return /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
    direction: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingX: 0.5,
    className: style$b['message-generator-menu'],
    children: [/*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
      direction: "row",
      alignItems: "center",
      spacing: 0.5,
      children: [isCustomer && /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
        title: "T\xECm ki\u1EBFm v\xE0 tag m\u1ED9t s\u1EA3n ph\u1EA9m",
        children: /*#__PURE__*/jsxRuntime.jsx("span", {
          children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
            onClick: productTagClick,
            disabled: !!widgetDisabled || disabled,
            className: style$b['menu-item'],
            children: /*#__PURE__*/jsxRuntime.jsx(SvgProductTag, {})
          })
        })
      }), isCustomer && /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
        title: "T\xECm ki\u1EBFm v\xE0 tag m\u1ED9t \u0111\u01A1n h\xE0ng",
        children: /*#__PURE__*/jsxRuntime.jsx("span", {
          children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
            onClick: orderTagClick,
            disabled: !!widgetDisabled || disabled,
            className: style$b['menu-item'],
            children: /*#__PURE__*/jsxRuntime.jsx(SvgBox, {})
          })
        })
      }), isCustomer && /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
        title: "T\xECm ki\u1EBFm v\xE0 tag m\u1ED9t phi\u1EBFu h\u1ED7 tr\u1EE3",
        children: /*#__PURE__*/jsxRuntime.jsx("span", {
          children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
            onClick: ticketTagClick,
            disabled: !!widgetDisabled || disabled,
            className: style$b['menu-item'],
            children: /*#__PURE__*/jsxRuntime.jsx(SvgTicket, {})
          })
        })
      }), /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
        title: "\u0110\xEDnh k\xE8m file",
        children: /*#__PURE__*/jsxRuntime.jsx("span", {
          children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
            onClick: attachClick,
            disabled: !!attachDisabled || disabled,
            className: style$b['menu-item'],
            children: /*#__PURE__*/jsxRuntime.jsx(SvgAttach, {
              style: {
                transform: 'scale(calc(24/28))'
              }
            })
          })
        })
      }), isCustomer && /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
        title: "T\u1EA1o phi\u1EBFu h\u1ED7 tr\u1EE3",
        children: /*#__PURE__*/jsxRuntime.jsx("span", {
          children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
            onClick: supportClick,
            disabled: disabled,
            className: style$b['menu-item'],
            children: /*#__PURE__*/jsxRuntime.jsx(SvgCreateTicket, {})
          })
        })
      }), isShow(SETTING_KEY.EMOJI) && /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
        title: "Bi\u1EC3u t\u01B0\u1EE3ng c\u1EA3m x\xFAc",
        children: /*#__PURE__*/jsxRuntime.jsx("span", {
          children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
            ref: emojiButtonRef,
            onClick: stickerClick,
            sx: {
              position: "relative"
            },
            disabled: disabled,
            children: /*#__PURE__*/jsxRuntime.jsx(SvgEmoji, {})
          })
        })
      })]
    }), isShow(SETTING_KEY.CHAT_BOT) && /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
      title: "H\u1ED7 tr\u1EE3 t\u1EF1 \u0111\u1ED9ng",
      children: /*#__PURE__*/jsxRuntime.jsx("span", {
        children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
          onClick: botClick,
          disabled: disabled,
          children: /*#__PURE__*/jsxRuntime.jsx(SmartToyOutlinedIcon__default["default"], {})
        })
      })
    })]
  });
};

var getCaretPosition = function getCaretPosition(editableDiv) {
  var caretOffset = 0;
  var doc = editableDiv.ownerDocument || editableDiv.document;
  var win = doc.defaultView || doc.parentWindow;
  var sel = null;

  if (typeof win.getSelection != "undefined") {
    sel = win.getSelection();

    if (sel.rangeCount > 0) {
      var range = win.getSelection().getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editableDiv);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type != "Control") {
    var textRange = sel.createRange();
    var preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(editableDiv);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }

  return caretOffset;
};
var focusAtTheEnd = function focusAtTheEnd(el) {
  el.focus();

  if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
};

var css_248z$b = ".MyContentEditable-module_my-content-editable__FIKBn {\n  width: 100%;\n  padding: 8px 14px;\n  max-height: 56px;\n  line-height: 1.2rem;\n  overflow: auto;\n}\n.MyContentEditable-module_my-content-editable__FIKBn:focus {\n  outline: none;\n}\n.MyContentEditable-module_my-content-editable__FIKBn:empty:before {\n  content: attr(placeholder);\n  color: #555;\n  cursor: text;\n}\n.MyContentEditable-module_my-content-editable__FIKBn .MyContentEditable-module_placeholder__k5Dlx {\n  color: #333;\n}";
var style$a = {"my-content-editable":"MyContentEditable-module_my-content-editable__FIKBn","placeholder":"MyContentEditable-module_placeholder__k5Dlx"};
styleInject(css_248z$b);

var MyContentEditable = function MyContentEditable(_ref) {
  var btnSubmitRef = _ref.btnSubmitRef,
      onChange = _ref.onChange,
      onPaste = _ref.onPaste,
      htmlContentToShow = _ref.htmlContentToShow,
      setContentEditable = _ref.setContentEditable,
      handleCaret = _ref.handleCaret,
      contentEditableRef = _ref.contentEditableRef,
      disabled = _ref.disabled;

  var handleInput = function handleInput(e) {
    // const pos = getCaretPosition(e.target);
    onChange(contentEditableRef.current.innerText);
  };

  var handleKeyDown = function handleKeyDown(e) {
    var keyCode = e.keyCode;

    if (keyCode === 13) {
      if (e.shiftKey) ; else {
        e.preventDefault();
        btnSubmitRef.current.click();
      }
    }

    if (e.key === 'PageUp' || e.key === 'PageDown') {
      e.preventDefault();
    }
  };

  var checkcaret = function checkcaret() {
    handleCaret(getCaretPosition(contentEditableRef.current));
  };

  React.useEffect(function () {
    if (contentEditableRef.current) {
      setContentEditable(contentEditableRef.current);
      contentEditableRef.current.addEventListener('keypress', checkcaret); // Every character written

      contentEditableRef.current.addEventListener('mousedown', checkcaret); // Click down

      contentEditableRef.current.addEventListener('touchstart', checkcaret); // Mobile

      contentEditableRef.current.addEventListener('input', checkcaret); // Other input events

      contentEditableRef.current.addEventListener('paste', checkcaret); // Clipboard actions

      contentEditableRef.current.addEventListener('cut', checkcaret);
      contentEditableRef.current.addEventListener('mousemove', checkcaret); // Selection, dragging text

      contentEditableRef.current.addEventListener('select', checkcaret); // Some browsers support this event

      contentEditableRef.current.addEventListener('selectstart', checkcaret); // Some browsers support this event
    }

    return function () {
      if (contentEditableRef.current) {
        contentEditableRef.current.removeEventListener('keypress', checkcaret); // Every character written

        contentEditableRef.current.removeEventListener('mousedown', checkcaret); // Click down

        contentEditableRef.current.removeEventListener('touchstart', checkcaret); // Mobile

        contentEditableRef.current.removeEventListener('input', checkcaret); // Other input events

        contentEditableRef.current.removeEventListener('paste', checkcaret); // Clipboard actions

        contentEditableRef.current.removeEventListener('cut', checkcaret);
        contentEditableRef.current.removeEventListener('mousemove', checkcaret); // Selection, dragging text

        contentEditableRef.current.removeEventListener('select', checkcaret); // Some browsers support this event

        contentEditableRef.current.removeEventListener('selectstart', checkcaret); // Some browsers support this event
      }
    };
  }, []);
  return /*#__PURE__*/jsxRuntime.jsx(ContentEditable__default["default"], {
    className: style$a["my-content-editable"],
    innerRef: contentEditableRef,
    html: htmlContentToShow,
    onChange: handleInput,
    onKeyDown: handleKeyDown,
    placeholder: "G\u1EEDi tin nh\u1EAFn",
    onPaste: onPaste,
    disabled: disabled
  });
};

var ReplyMessage = function ReplyMessage(_ref) {
  var _conversation$custome;

  var replyMessage = _ref.replyMessage,
      removeReplyMessage = _ref.removeReplyMessage,
      conversation = _ref.conversation,
      onContentEditableFocus = _ref.onContentEditableFocus;

  var hasMedia = function () {
    return !!replyMessage.media;
  }();

  React.useEffect(function () {
    onContentEditableFocus();
  }, []);
  return /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
    component: Paper__default["default"],
    variant: "outlined",
    square: true,
    sx: {
      borderBottom: 0,
      padding: 1
    },
    direction: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    spacing: 2,
    children: [/*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
      direction: 'row',
      alignItems: "center",
      spacing: 1,
      sx: {
        width: '100%'
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(ReplyIcon__default["default"], {
        sx: {
          transform: 'scale(-1,1)'
        }
      }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
        sx: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 'calc(100% - 60px)'
        },
        children: [/*#__PURE__*/jsxRuntime.jsx(Typography__default["default"], {
          variant: "caption",
          noWrap: true,
          children: replyMessage.senderID === conversation.customerID ? (_conversation$custome = conversation.customerInfo) === null || _conversation$custome === void 0 ? void 0 : _conversation$custome.name : conversation.conversationName
        }), /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
          direction: "column",
          spacing: 0.5,
          children: [/*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
            alignItems: "center",
            spacing: 0.5,
            direction: "row",
            children: hasMedia && replyMessage.media.map(function (item, index) {
              if (item.type.toUpperCase() === "IMAGE") {
                return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
                  component: "img",
                  sx: {
                    width: '3rem',
                    borderRadius: '5px'
                  },
                  alt: item.name,
                  src: item.url
                }, index);
              } else {
                return /*#__PURE__*/jsxRuntime.jsx(material.Chip, {
                  label: item.name
                }, index);
              }
            })
          }), /*#__PURE__*/jsxRuntime.jsx(Typography__default["default"], {
            variant: "body2",
            noWrap: true,
            children: replyMessage.content
          })]
        })]
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
      size: "small",
      onClick: function onClick() {
        removeReplyMessage();
      },
      sx: {
        width: '30px',
        height: '30px',
        position: 'absolute',
        right: '16px'
      },
      children: /*#__PURE__*/jsxRuntime.jsx(ClearIcon__default["default"], {})
    })]
  });
};

function formatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

var FileItem = function FileItem(_ref) {
  var file = _ref.file,
      removeFile = _ref.removeFile,
      index = _ref.index;
  return /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
    direction: "row",
    alignItems: "center",
    sx: {
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flexShrink: 0
    },
    spacing: 1,
    children: [!file.type.includes("image") ? /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: file.type.includes("mp4") || file.type.includes("ogg") ? /*#__PURE__*/jsxRuntime.jsx(YouTube__default["default"], {
        sx: {
          color: "#15A959",
          width: "2.5rem",
          height: "2.5rem"
        }
      }) : /*#__PURE__*/jsxRuntime.jsx(InsertDriveFileIcon__default["default"], {
        sx: {
          color: "#15A959",
          width: "2.5rem",
          height: "2.5rem"
        }
      })
    }) : /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
      sx: {
        position: 'relative',
        width: '2.5rem',
        height: '2.5rem'
      },
      children: /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        component: "img",
        sx: {
          borderRadius: '5px',
          objectFit: "cover",
          width: "100%",
          height: "100%"
        },
        alt: file.name,
        src: URL.createObjectURL(file)
      })
    }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
      sx: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: "1 1 auto"
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        sx: {
          fontSize: "1rem",
          color: "#000",
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: "490px"
        },
        children: file.name
      }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        sx: {
          fontSize: ".8rem",
          color: "#676565"
        },
        children: formatBytes(file.size)
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
      onClick: function onClick() {
        removeFile(index);
      },
      children: /*#__PURE__*/jsxRuntime.jsx(ClearIcon__default["default"], {})
    })]
  });
};

var FileContainer = function FileContainer(_ref) {
  var files = _ref.files,
      removeFile = _ref.removeFile;
  return /*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
    component: Paper__default["default"],
    variant: "outlined",
    square: true,
    sx: {
      borderBottom: 0,
      padding: 1,
      background: "#F5F5F5",
      height: "100%",
      overflow: "auto",
      minHeight: "58px"
    },
    direction: "column",
    justifyContent: 'space-between',
    alignItems: "center",
    spacing: 1,
    children: files.map(function (file, index) {
      return /*#__PURE__*/jsxRuntime.jsx(FileItem, {
        file: file,
        index: index,
        removeFile: removeFile
      }, index);
    })
  });
};

var TagMenu = function TagMenu(_ref) {
  var handleSelectMenuItem = _ref.handleSelectMenuItem,
      data = _ref.data,
      selectTagMenuItemRef = _ref.selectTagMenuItemRef;

  var _useState = React.useState(data && data.length > 0 ? data[0] : null),
      _useState2 = _slicedToArray(_useState, 2),
      currentTagMenuItem = _useState2[0],
      setCurrentTagMenuItem = _useState2[1];

  selectTagMenuItemRef.current = function () {
    handleSelectMenuItem(currentTagMenuItem);
    return currentTagMenuItem;
  };

  var moveUp = React.useCallback(function () {
    if (data && currentTagMenuItem) {
      var index = data.findIndex(function (item) {
        return item.code === currentTagMenuItem.code;
      });

      if (index > 0) {
        setCurrentTagMenuItem(data[index - 1]);
      }
    }
  }, [data, currentTagMenuItem]);
  var moveDown = React.useCallback(function () {
    if (data && currentTagMenuItem) {
      var index = data.findIndex(function (item) {
        return item.code === currentTagMenuItem.code;
      });

      if (index < data.length - 1) {
        setCurrentTagMenuItem(data[index + 1]);
      }
    }
  }, [data, currentTagMenuItem]);
  var handleKeyPress = React.useCallback(function (e) {
    if (e.keyCode === KEYCODE.DOWN) {
      e.preventDefault();
      e.stopPropagation();
      moveDown();
    } else if (e.keyCode === KEYCODE.UP) {
      e.preventDefault();
      e.stopPropagation();
      moveUp();
    }
  }, [moveUp, moveDown]);
  React.useEffect(function () {
    document.addEventListener("keydown", handleKeyPress);
    return function () {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  React.useEffect(function () {
    if (data && data.length) {
      setCurrentTagMenuItem(data[0]);
    }
  }, [data]);
  return /*#__PURE__*/jsxRuntime.jsx(Paper__default["default"], {
    className: "tagwindows-class",
    variant: "outlined",
    sx: {
      borderBottom: 'none',
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0'
    },
    children: /*#__PURE__*/jsxRuntime.jsx(List__default["default"], {
      disablePadding: true,
      children: data.map(function (item, index) {
        return /*#__PURE__*/jsxRuntime.jsx(ListItem__default["default"], {
          disablePadding: true,
          children: /*#__PURE__*/jsxRuntime.jsxs(ListItemButton__default["default"], {
            selected: !!(currentTagMenuItem && currentTagMenuItem.code === item.code),
            onClick: function onClick() {
              handleSelectMenuItem(item);
            },
            sx: {
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              height: '60px'
            },
            children: [/*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
              sx: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              },
              children: [/*#__PURE__*/jsxRuntime.jsx(material.CardMedia, {
                component: "img",
                src: item.image,
                sx: {
                  width: '2.5rem',
                  height: 'auto',
                  marginRight: '1rem'
                }
              }), /*#__PURE__*/jsxRuntime.jsx("span", {
                style: {
                  fontSize: '14px'
                },
                children: item.title
              })]
            }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
              sx: {
                fontWeight: 'bold'
              },
              children: item.guide
            })]
          })
        }, item.code);
      })
    })
  });
};

var DEFAULT_DELAY = 300;
var useDebounce = function useDebounce(value) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_DELAY;

  // State and setters for debounced value
  var _useState = React.useState(value),
      _useState2 = _slicedToArray(_useState, 2),
      debouncedValue = _useState2[0],
      setDebouncedValue = _useState2[1];

  React.useEffect(function () {
    var handler = setTimeout(function () {
      setDebouncedValue(value);
    }, delay);
    return function () {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

var ProductList = function ProductList(_ref) {
  var productList = _ref.productList,
      handleSelectProduct = _ref.handleSelectProduct,
      currentTagItem = _ref.currentTagItem,
      isEqualItemRef = _ref.isEqualItemRef,
      getItemElementIdRef = _ref.getItemElementIdRef;

  var isEqual = function isEqual(item1, item2) {
    return item1.product.productID === item2.product.productID && item1.skuItem.sku === item2.skuItem.sku && item1.skuItem.itemCode === item2.skuItem.itemCode;
  };

  var elementID = function elementID(item) {
    var _item$product, _item$skuItem;

    return "tag-item-product-".concat(item === null || item === void 0 ? void 0 : (_item$product = item.product) === null || _item$product === void 0 ? void 0 : _item$product.productID, "--").concat(item === null || item === void 0 ? void 0 : (_item$skuItem = item.skuItem) === null || _item$skuItem === void 0 ? void 0 : _item$skuItem.sku);
  };

  isEqualItemRef.current = isEqual;
  getItemElementIdRef.current = elementID;
  return /*#__PURE__*/jsxRuntime.jsx(List__default["default"], {
    disablePadding: true,
    children: productList.map(function (product, index) {
      return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        children: /*#__PURE__*/jsxRuntime.jsx(ListItem__default["default"], {
          disablePadding: true,
          children: /*#__PURE__*/jsxRuntime.jsx(ListItemButton__default["default"], {
            onClick: function onClick() {
              handleSelectProduct(product);
            },
            selected: currentTagItem && isEqual(product, currentTagItem),
            id: elementID(product),
            children: /*#__PURE__*/jsxRuntime.jsx(ProductItem, {
              skuInfo: handleSkuInfo(product)
            })
          })
        })
      }, index);
    })
  });
};

var OrderItem = function OrderItem(_ref) {
  var _order$detailAddress, _order$detailAddress2, _order$detailAddress3;

  var order = _ref.order,
      action = _ref.action,
      isTagItem = _ref.isTagItem;
  var linkRef = React.useRef();
  var address = [];

  if (order.customerShippingAddress) {
    address.push(order.customerShippingAddress);
  }

  if ((_order$detailAddress = order.detailAddress) !== null && _order$detailAddress !== void 0 && _order$detailAddress.ward) {
    address.push(order.detailAddress.ward);
  }

  if ((_order$detailAddress2 = order.detailAddress) !== null && _order$detailAddress2 !== void 0 && _order$detailAddress2.district) {
    address.push(order.detailAddress.district);
  }

  if ((_order$detailAddress3 = order.detailAddress) !== null && _order$detailAddress3 !== void 0 && _order$detailAddress3.province) {
    address.push(order.detailAddress.province);
  }

  return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
    sx: {
      width: "100%",
      "& a": {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }
    },
    children: /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
      direction: "row",
      justifyContent: "space-between",
      sx: {
        width: "100%"
      },
      children: [/*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
        direction: "row" // alignItems="center"
        ,
        spacing: 1,
        sx: {
          width: "100%"
        },
        children: [/*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
          sx: {
            width: "4rem"
          },
          children: /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
            component: "img",
            src: img$k,
            sx: {
              objectFit: "cover",
              width: isTagItem ? "52px" : "100%"
            }
          })
        }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
          sx: {
            width: "100%" // flexShrink: 0

          },
          children: [/*#__PURE__*/jsxRuntime.jsx("p", {
            className: style$e.title,
            children: "#".concat(order.orderId || order.orderID, " (").concat(orderStatus[order.status], ")")
          }), /*#__PURE__*/jsxRuntime.jsxs(Grid__default["default"], {
            container: true,
            direction: isTagItem ? "column" : "row",
            sx: {
              flex: '1 1 auto'
            },
            children: [/*#__PURE__*/jsxRuntime.jsxs(Grid__default["default"], {
              item: true,
              xs: 6,
              md: 6,
              children: [/*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "H\xECnh th\u1EE9c thanh to\xE1n"
                }), ": ", orderPaymentMethod[order.paymentMethod]]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "Ng\xE0y mua"
                }), ": ", ddmmyyyy(new Date(order.createdTime))]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "S\u1ED1 l\u01B0\u1EE3ng s\u1EA3n ph\u1EA9m"
                }), ": ", order.totalItem]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "T\u1ED5ng ti\u1EC1n"
                }), ": ", numberFormatDotSeperated(order.totalPrice)]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: "".concat(style$e.content, " ").concat(style$e.ellipsis),
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "\u0110\u1ECBa ch\u1EC9 giao"
                }), ": ", address.join(", ")]
              })]
            }), /*#__PURE__*/jsxRuntime.jsxs(Grid__default["default"], {
              item: true,
              xs: 6,
              sm: 6,
              sx: _objectSpread2({}, !isTagItem && {
                paddingLeft: "4px"
              }),
              children: [/*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "M\xE3 khuy\u1EBFn m\xE3i"
                }), ": ", order.redeemCode ? /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
                  children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                    className: style$e["discount-code"],
                    children: order.redeemCode.join(", ")
                  }), "  -".concat(numberFormatDotSeperated(order.totalDiscount))]
                }) : "-"]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "T\u1EA1m t\xEDnh"
                }), ": ", numberFormatDotSeperated(order.price)]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "Ph\xED theo h\xECnh th\u1EE9c thanh to\xE1n"
                }), ": ", numberFormatDotSeperated(order.paymentMethodFee)]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "Ph\xED v\u1EADn chuy\u1EC3n"
                }), ": ", numberFormatDotSeperated(order.deliveryMethodFee)]
              }), /*#__PURE__*/jsxRuntime.jsxs("p", {
                className: style$e.content,
                children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                  className: style$e.label,
                  children: "Ph\u1EE5 ph\xED"
                }), ": ", numberFormatDotSeperated(order.extraFee)]
              })]
            })]
          })]
        })]
      }), action && /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
        sx: {
          transform: "translate(1rem, -1rem)"
        },
        direction: "column",
        spacing: 1,
        children: [/*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
          onClick: function onClick() {
            linkRef.current.click();
          },
          size: "small",
          children: /*#__PURE__*/jsxRuntime.jsx(LaunchIcon__default["default"], {
            sx: {
              color: "#15A959"
            }
          })
        }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
          onClick: function onClick() {
            action.openSupportTicketWindow(order);
          },
          size: "small",
          children: /*#__PURE__*/jsxRuntime.jsx(SupportAgentIcon__default["default"], {
            sx: {
              color: "#15A959"
            }
          })
        })]
      })]
    })
  });
};

var OrderList = function OrderList(_ref) {
  var orderList = _ref.orderList,
      handleSelectOrder = _ref.handleSelectOrder,
      currentTagItem = _ref.currentTagItem;
      _ref.setCurrentTagItem;
      var isEqualItemRef = _ref.isEqualItemRef,
      getItemElementIdRef = _ref.getItemElementIdRef;

  var isEqual = function isEqual(item1, item2) {
    return item1.orderId === item2.orderId;
  };

  var elementID = function elementID(item) {
    return "tag-item-order-".concat(item === null || item === void 0 ? void 0 : item.orderId);
  };

  isEqualItemRef.current = isEqual;
  getItemElementIdRef.current = elementID;
  return /*#__PURE__*/jsxRuntime.jsx(List__default["default"], {
    disablePadding: true,
    children: orderList.map(function (order, index) {
      return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        children: /*#__PURE__*/jsxRuntime.jsx(ListItem__default["default"], {
          disablePadding: true,
          children: /*#__PURE__*/jsxRuntime.jsx(ListItemButton__default["default"], {
            selected: currentTagItem && isEqual(order, currentTagItem),
            onClick: function onClick() {
              handleSelectOrder(order);
            },
            id: elementID(order),
            children: /*#__PURE__*/jsxRuntime.jsx(OrderItem, {
              order: order
            })
          })
        })
      }, index);
    })
  });
};

var TicketList = function TicketList(_ref) {
  var ticketList = _ref.ticketList,
      handleSelectTicket = _ref.handleSelectTicket,
      currentTagItem = _ref.currentTagItem;
      _ref.setCurrentTagItem;
      var isEqualItemRef = _ref.isEqualItemRef,
      getItemElementIdRef = _ref.getItemElementIdRef;

  var isEqual = function isEqual(item1, item2) {
    return item1.ticketId === item2.ticketId;
  };

  var elementID = function elementID(item) {
    return "tag-ticket-product-".concat(item === null || item === void 0 ? void 0 : item.ticketId);
  };

  isEqualItemRef.current = isEqual;
  getItemElementIdRef.current = elementID;
  return /*#__PURE__*/jsxRuntime.jsx(List__default["default"], {
    disablePadding: true,
    children: ticketList.map(function (ticket, index) {
      return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
        children: /*#__PURE__*/jsxRuntime.jsx(ListItem__default["default"], {
          disablePadding: true,
          children: /*#__PURE__*/jsxRuntime.jsx(ListItemButton__default["default"], {
            onClick: function onClick() {
              handleSelectTicket(ticket);
            },
            selected: currentTagItem && isEqual(ticket, currentTagItem),
            id: elementID(ticket),
            children: /*#__PURE__*/jsxRuntime.jsx(TicketItem, {
              ticket: ticket
            })
          })
        })
      }, index);
    })
  });
};

var defaultPagination = {
  limit: 5,
  page: 1,
  total: 0,
  isOver: false
};

var TagWindows = function TagWindows(_ref) {
  var handleSelectItem = _ref.handleSelectItem,
      propsText = _ref.text,
      searchTag = _ref.searchTag,
      selectTagItemRef = _ref.selectTagItemRef,
      noDataText = _ref.noDataText,
      type = _ref.type;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      list = _useState2[0],
      setList = _useState2[1];

  var _useState3 = React.useState(_objectSpread2({}, defaultPagination)),
      _useState4 = _slicedToArray(_useState3, 2),
      pagination = _useState4[0],
      setPagination = _useState4[1];

  var debouncedSearchTerm = useDebounce(propsText);

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isSearching = _useState6[0],
      setIsSearching = _useState6[1];

  var _useState7 = React.useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      currentTagItem = _useState8[0],
      setCurrentTagItem = _useState8[1];

  var scrollRef = React.useRef();
  var textRef = React.useRef();
  var isMountedRef = React.useRef(true);
  var isEqualItemRef = React.useRef(null);
  var getItemElementIdRef = React.useRef(null);

  selectTagItemRef.current = function () {
    var item = list ? list.length && !isSearching && currentTagItem : null;
    handleSelectItem(item);
    return item;
  };

  var fetchMore = function fetchMore() {
    getMoreList().then(function () {
      setIsFetching(false);
    });
  };

  var _useInfiniteScroll = useInfiniteScroll(fetchMore, "bottom"),
      isFetching = _useInfiniteScroll.isFetching,
      setIsFetching = _useInfiniteScroll.setIsFetching,
      setElement = _useInfiniteScroll.setElement;

  var getList = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var text,
          res,
          _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = _args.length > 0 && _args[0] !== undefined ? _args[0] : "";
              setIsFetching(false);
              _context.next = 4;
              return searchTag(defaultPagination, text);

            case 4:
              res = _context.sent;

              if (textRef.current === text && isMountedRef.current) {
                if (res.status === "OK") {
                  setList(res.data);
                  setPagination(function (prev) {
                    return _objectSpread2(_objectSpread2({}, prev), {}, {
                      page: 2,
                      isOver: false
                    });
                  });
                  setCurrentTagItem(res.data[0]);
                } else {
                  setCurrentTagItem(null);
                  setList([]);
                  setPagination(function (prev) {
                    return _objectSpread2(_objectSpread2({}, prev), {}, {
                      isOver: true
                    });
                  });
                }
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getList() {
      return _ref2.apply(this, arguments);
    };
  }();

  var getMoreList = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var res;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!pagination.isOver && !isSearching)) {
                _context2.next = 5;
                break;
              }

              _context2.next = 3;
              return searchTag(pagination, debouncedSearchTerm);

            case 3:
              res = _context2.sent;

              if (textRef.current === debouncedSearchTerm && isMountedRef.current) {
                if (res.status === "OK") {
                  setList(function (prev) {
                    if (!prev) {
                      return res.data;
                    }

                    return [].concat(_toConsumableArray(prev), _toConsumableArray(res.data));
                  });
                  setPagination(function (prev) {
                    return _objectSpread2(_objectSpread2({}, prev), {}, {
                      page: prev.page + 1
                    });
                  });
                } else {
                  setPagination(function (prev) {
                    return _objectSpread2(_objectSpread2({}, prev), {}, {
                      isOver: true
                    });
                  });
                }
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function getMoreList() {
      return _ref3.apply(this, arguments);
    };
  }();

  var moveUp = React.useCallback(function () {
    if (isEqualItemRef.current && list) {
      var index = list.findIndex(function (item) {
        return isEqualItemRef.current(item, currentTagItem);
      });

      if (index > 0) {
        setCurrentTagItem(list[index - 1]);
      }
    }
  }, [list, currentTagItem]);
  var moveDown = React.useCallback(function () {
    if (isEqualItemRef.current && list) {
      var index = list.findIndex(function (item) {
        return isEqualItemRef.current(item, currentTagItem);
      });

      if (index < list.length - 1) {
        setCurrentTagItem(list[index + 1]);
      }
    }
  }, [list, currentTagItem]);
  var handleKeyPress = React.useCallback(function (e) {
    if (e.keyCode === KEYCODE.DOWN) {
      e.preventDefault();
      e.stopPropagation();
      moveDown();
    } else if (e.keyCode === KEYCODE.UP) {
      e.preventDefault();
      e.stopPropagation();
      moveUp();
    }
  }, [moveUp, moveDown]);
  React.useEffect(function () {
    if (debouncedSearchTerm !== null) {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }

      setIsSearching(true);
      getList(debouncedSearchTerm).then(function () {
        if (debouncedSearchTerm === textRef.current) {
          setIsSearching(false);
        }
      });
    }

    if (debouncedSearchTerm) {
      textRef.current = debouncedSearchTerm;
    } else {
      textRef.current = "";
    }

    setElement(scrollRef.current);
  }, [debouncedSearchTerm]);
  React.useEffect(function () {
    if (getItemElementIdRef.current) {
      var msgEle = document.getElementById(getItemElementIdRef.current(currentTagItem));
      msgEle && msgEle.scrollIntoView({
        block: 'center'
      });
    }
  }, [currentTagItem]);
  React.useEffect(function () {
    document.addEventListener("keydown", handleKeyPress);
    return function () {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  React.useEffect(function () {
    return function () {
      isMountedRef.current = false;
    };
  }, []);
  return /*#__PURE__*/jsxRuntime.jsx(Paper__default["default"], {
    variant: "outlined",
    sx: {
      borderBottom: 'none',
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
      display: "flex",
      overflowY: 'auto',
      overflowX: "hidden",
      flexDirection: "column",
      height: "24rem",
      minHeight: "24rem"
    },
    ref: scrollRef,
    children: isSearching ? /*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
      justifyContent: "center",
      children: /*#__PURE__*/jsxRuntime.jsx(CircularProgress__default["default"], {
        size: "2rem",
        sx: {
          margin: "1rem auto"
        }
      })
    }) : /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [list && list.length > 0 && /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
        children: [type === "PRODUCT" && /*#__PURE__*/jsxRuntime.jsx(ProductList, {
          isEqualItemRef: isEqualItemRef,
          productList: list,
          handleSelectProduct: handleSelectItem,
          currentTagItem: currentTagItem,
          setCurrentTagItem: setCurrentTagItem,
          getItemElementIdRef: getItemElementIdRef
        }), type === "ORDER" && /*#__PURE__*/jsxRuntime.jsx(OrderList, {
          isEqualItemRef: isEqualItemRef,
          orderList: list,
          handleSelectOrder: handleSelectItem,
          currentTagItem: currentTagItem,
          getItemElementIdRef: getItemElementIdRef,
          setCurrentTagItem: setCurrentTagItem
        }), type === "TICKET" && /*#__PURE__*/jsxRuntime.jsx(TicketList, {
          isEqualItemRef: isEqualItemRef,
          ticketList: list,
          handleSelectTicket: handleSelectItem,
          currentTagItem: currentTagItem,
          getItemElementIdRef: getItemElementIdRef,
          setCurrentTagItem: setCurrentTagItem
        })]
      }), list && !list.length && /*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
        justifyContent: "center",
        sx: {
          padding: "1rem"
        },
        children: /*#__PURE__*/jsxRuntime.jsx("p", {
          children: noDataText
        })
      }), isFetching && !pagination.isOver && /*#__PURE__*/jsxRuntime.jsx(Stack__default["default"], {
        justifyContent: "center",
        children: /*#__PURE__*/jsxRuntime.jsx(CircularProgress__default["default"], {
          size: "2rem",
          sx: {
            margin: "1rem auto"
          }
        })
      })]
    })
  });
};

var SelectedProduct = function SelectedProduct(_ref) {
  var onCloseTag = _ref.onCloseTag,
      product = _ref.product;
  return /*#__PURE__*/jsxRuntime.jsxs(Paper__default["default"], {
    variant: "outlined",
    sx: {
      borderBottom: 'none',
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
      padding: "8px",
      position: "relative",
      paddingRight: "50px"
    },
    children: [/*#__PURE__*/jsxRuntime.jsx(ProductItem, {
      skuInfo: handleSkuInfo(product)
    }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
      size: "small",
      sx: {
        position: 'absolute',
        zIndex: 2,
        top: "4px",
        right: "4px"
      },
      onClick: onCloseTag,
      children: /*#__PURE__*/jsxRuntime.jsx(ClearIcon__default["default"], {})
    })]
  });
};

var Picker = dynamic__default["default"](function () {
  return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@emoji-mart/react')); });
}, {
  ssr: false
});

var EmojiPicker = function EmojiPicker(_ref) {
  var onEmojiSelect = _ref.onEmojiSelect,
      onCloseEmojiPicker = _ref.onCloseEmojiPicker,
      open = _ref.open;
      _ref.clickedOutsideRef;
      var emojiButtonRef = _ref.emojiButtonRef;
  var pickerRef = React.useRef();

  var handleClickOutSide = function handleClickOutSide(e) {
    if (pickerRef.current && !pickerRef.current.contains(e.target) && e.target !== emojiButtonRef.current && !e.target.contains(emojiButtonRef.current) && !emojiButtonRef.current.contains(e.target)) {
      onCloseEmojiPicker();
    }
  };

  React.useEffect(function () {
    document.addEventListener("click", handleClickOutSide, true);
    return function () {
      document.removeEventListener("click", handleClickOutSide, true);
    };
  }, []);

  if (!open) {
    return "";
  }

  return /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
    ref: pickerRef,
    children: /*#__PURE__*/jsxRuntime.jsx(Picker // set="facebook"
    , {
      autoFocus: true,
      onEmojiSelect: onEmojiSelect,
      previewPosition: "none",
      maxFrequentRows: "0",
      theme: "light",
      skinTonePosition: "none",
      categories: ["people", "nature", "foods", "activity", "places", "objects", "symbols", "flags"]
    })
  });
};

var useTag = function useTag(_ref) {
  var caretRef = _ref.caretRef,
      tagDisabled = _ref.tagDisabled,
      getProductBySlug = _ref.getProductBySlug,
      getOrderByID = _ref.getOrderByID,
      getTicketByID = _ref.getTicketByID;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTagItem = _useState2[0],
      setSelectedTagItem = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      openTagMenu = _useState4[0],
      setOpenTagMenu = _useState4[1];

  var _useState5 = React.useState(tagList),
      _useState6 = _slicedToArray(_useState5, 2),
      tagMenu = _useState6[0],
      setTagMenu = _useState6[1];

  var _useState7 = React.useState(""),
      _useState8 = _slicedToArray(_useState7, 2),
      searchText = _useState8[0],
      setSearchText = _useState8[1];

  var _useState9 = React.useState(""),
      _useState10 = _slicedToArray(_useState9, 2),
      textMessage = _useState10[0],
      setTextMessage = _useState10[1];

  var _useState11 = React.useState(null),
      _useState12 = _slicedToArray(_useState11, 2),
      selectedTagMenuItem = _useState12[0],
      setSelectedTagMenuItem = _useState12[1];

  var lastState = React.useRef(null);
  lastState.current = {
    selectedTagItem: selectedTagItem,
    openTagMenu: openTagMenu,
    selectedTagMenuItem: selectedTagMenuItem,
    textMessage: textMessage,
    searchText: searchText,
    tagMenu: tagMenu
  };
  var getState = React.useCallback(function () {
    return lastState.current;
  }, []);

  var handleChangeMessage = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(value) {
      var newValue, chatWebHostHttps, chatWebHostHttp, lines, n, tag, i, linkIndexProduct, linkIndexOrder, linkIndexTicket, slug, ticketIdStr, res, start, tagCode, end, searchString;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newValue = value;

              if (!tagDisabled) {
                _context.next = 4;
                break;
              }

              setTextMessage(value);
              return _context.abrupt("return");

            case 4:
              chatWebHostHttps = getChatConf().clientWebUrl.replace('http://', 'https://');
              chatWebHostHttp = chatWebHostHttps.replace('https://', 'http://'); // const startCommand = startTagMenuCommandAt(value);
              // if (startCommand >= 0) {
              //     const end = newValue.indexOf("\n", startCommand);
              //     let tagCode = [];
              //     if (end <= startCommand) {
              //         tagCode = searchTagCode(newValue.substring(startCommand));
              //     }
              //     else {
              //         tagCode = searchTagCode(newValue.substring(startCommand, end));
              //     }
              //     if (tagCode.length > 0) {
              //         setOpenTagMenu(true);
              //     }
              //     setTagMenu(tagCode)
              // }
              // else {
              //     setOpenTagMenu(false)
              //     setTagMenu(tagList)
              // }

              lines = splitTextMessage(newValue);
              n = lines.length;
              tag = null;
              i = 0;

            case 10:
              if (!(i < n)) {
                _context.next = 18;
                break;
              }

              tag = isStartTag(lines[i]);

              if (!tag) {
                _context.next = 15;
                break;
              }

              setSelectedTagMenuItem(tag);
              return _context.abrupt("break", 18);

            case 15:
              i++;
              _context.next = 10;
              break;

            case 18:
              if (!tag) {
                setSelectedTagMenuItem(null);
              }

              if (newValue.indexOf("".concat(chatWebHostHttp, "/product/")) >= 0) {
                newValue = replaceCaseInsensitiveAll(newValue, "".concat(chatWebHostHttp, "/product/"), "".concat(chatWebHostHttps, "/product/"));
              }

              if (newValue.indexOf("".concat(chatWebHostHttp, "/my-order/")) >= 0) {
                newValue = replaceCaseInsensitiveAll(newValue, "".concat(chatWebHostHttp, "/my-order/"), "".concat(chatWebHostHttps, "/my-order/"));
              }

              if (newValue.indexOf("".concat(chatWebHostHttp, "/users/my-ticket/")) >= 0) {
                newValue = replaceCaseInsensitiveAll(newValue, "".concat(chatWebHostHttp, "/users/my-ticket"), "".concat(chatWebHostHttps, "/users/my-ticket"));
              }

              linkIndexProduct = newValue.indexOf("".concat(chatWebHostHttps, "/product/"));
              linkIndexOrder = newValue.indexOf("".concat(chatWebHostHttps, "/my-order/"));
              linkIndexTicket = newValue.indexOf("".concat(chatWebHostHttps, "/users/my-ticket"));

              if (linkIndexProduct >= 0) {
                slug = newValue.substring(linkIndexProduct + "".concat(chatWebHostHttps, "/product").length + 1);
                getProductBySlug(slug).then(function (product) {
                  if (product.status === "OK") {
                    setSelectedTagItem({
                      item: product.data[0],
                      tag: tagList[0]
                    });
                    setTextMessage("");
                  } else {
                    setTextMessage(value);
                  }
                });
              } else if (linkIndexOrder >= 0) {
                getOrderByID(newValue.substring(linkIndexOrder + "".concat(chatWebHostHttps, "/my-order").length + 1)).then(function (order) {
                  if (order.status === "OK") {
                    setSelectedTagItem({
                      item: order.data[0],
                      tag: tagList[1]
                    });
                    setTextMessage("");
                  } else {
                    setTextMessage(value);
                  }
                });
              } else if (linkIndexTicket >= 0) {
                ticketIdStr = newValue.substring(linkIndexTicket + "".concat(chatWebHostHttps, "/users/my-ticket?id=").length);

                if (isNumeric(ticketIdStr)) {
                  getTicketByID(parseInt(ticketIdStr)).then(function (ticket) {
                    if (ticket.status === "OK") {
                      setSelectedTagItem({
                        item: ticket.data[0],
                        tag: tagList[2]
                      });
                      setTextMessage("");
                    } else {
                      setTextMessage(value);
                    }
                  });
                }
              } else {
                setTextMessage(value);
              }

              res = startTagAt(newValue);

              if (res) {
                start = res.start, tagCode = res.tag;
                end = newValue.indexOf("\n", start);
                searchString = "";

                if (end <= start) {
                  searchString = newValue.substring(start + tagCode.length);
                } else {
                  searchString = newValue.substring(start + tagCode.length, end);
                }

                setSearchText(searchString);
              }

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleChangeMessage(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleSelectTagItem = function handleSelectTagItem(item, text) {
    // setTextMessage(prev => {
    //     let index = 0;
    //     index = startTagAt(prev, selectedTagMenuItem.code).start;
    //     const end = prev.indexOf("\n", index);
    //     const newStr = selectedTagMenuItem.code + text;
    //     if (end <= index) {
    //         return prev.replace(prev.substring(index), newStr) + "\n\n";
    //     }
    //     const old = prev.substring(index, end);
    //     const result = prev.replace(old, newStr);
    //     return result + "\n\n";
    // });
    setTextMessage("");
    setSelectedTagItem({
      item: item,
      tag: selectedTagMenuItem
    });
    setSelectedTagMenuItem(null);
  };

  var handleCloseTag = function handleCloseTag() {
    setSelectedTagItem(null);
    setTextMessage("");
  };

  var closeTagMenu = function closeTagMenu() {
    setOpenTagMenu(false);
    setSelectedTagMenuItem(null);
  };

  var resetState = function resetState() {
    setSelectedTagItem(null);
    setSelectedTagMenuItem(null);
    setTextMessage("");
    setSelectedTagItem(null);
    setSearchText("");
  };

  var toggleTagMenu = function toggleTagMenu() {
    if (!selectedTagMenuItem) {
      setOpenTagMenu(function (prev) {
        return !prev;
      });
    }

    setSelectedTagMenuItem(null);
  };

  var handleSelectMenuItem = function handleSelectMenuItem(item) {
    setSelectedTagMenuItem(item);
    setTextMessage(function (prev) {
      var startCommand = startTagMenuCommandAt(prev);

      if (startCommand >= 0) {
        var end = prev.indexOf("\n", startCommand);

        if (end <= startCommand) {
          return prev.replace(prev.substring(startCommand), item.code);
        } else {
          return prev.replace(prev.substring(startCommand, end), item.code);
        }
      }

      return insertToString(prev, caretRef.current || 0, item.code);
    });
  };

  var changeSearchText = function changeSearchText(value) {
    setTextMessage(function (prev) {
      var newValue = prev;
      var res = startTagAt(newValue);

      if (res) {
        var start = res.start,
            tagCode = res.tag;
        var end = newValue.indexOf("\n", start);
        var searchString = null;

        if (end <= start) {
          searchString = newValue.substring(start);
        } else {
          searchString = newValue.substring(start, end);
        }

        newValue = replaceCaseInsensitive(newValue, searchString, tagCode + value);
        return newValue;
      }
    });
    setSearchText(value);
  };

  React.useEffect(function () {
    if (selectedTagMenuItem) {
      setOpenTagMenu(false);
    }
  }, [selectedTagMenuItem]);
  React.useEffect(function () {
    if (!openTagMenu) {
      setTagMenu(tagList);
    }
  }, [openTagMenu]);
  return {
    resetState: resetState,
    handleChangeMessage: handleChangeMessage,
    handleSelectTagItem: handleSelectTagItem,
    handleSelectMenuItem: handleSelectMenuItem,
    toggleTagMenu: toggleTagMenu,
    handleCloseTag: handleCloseTag,
    textMessage: textMessage,
    openTagMenu: openTagMenu,
    tagMenu: tagMenu,
    searchText: searchText,
    selectedTagItem: selectedTagItem,
    selectedTagMenuItem: selectedTagMenuItem,
    setTextMessage: setTextMessage,
    changeSearchText: changeSearchText,
    getState: getState,
    closeTagMenu: closeTagMenu
  };
};

var SelectedOrder = function SelectedOrder(_ref) {
  var onCloseTag = _ref.onCloseTag,
      order = _ref.order;
  return /*#__PURE__*/jsxRuntime.jsxs(Paper__default["default"], {
    variant: "outlined",
    sx: {
      borderBottom: 'none',
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
      padding: "8px",
      position: "relative"
    },
    children: [/*#__PURE__*/jsxRuntime.jsx(OrderItem, {
      order: order
    }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
      size: "small",
      sx: {
        position: 'absolute',
        zIndex: 2,
        top: "4px",
        right: "4px"
      },
      onClick: onCloseTag,
      children: /*#__PURE__*/jsxRuntime.jsx(ClearIcon__default["default"], {})
    })]
  });
};

var SelectedTicket = function SelectedTicket(_ref) {
  var onCloseTag = _ref.onCloseTag,
      ticket = _ref.ticket;
  return /*#__PURE__*/jsxRuntime.jsxs(Paper__default["default"], {
    variant: "outlined",
    sx: {
      borderBottom: 'none',
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
      padding: "8px",
      position: "relative"
    },
    children: [/*#__PURE__*/jsxRuntime.jsx(TicketItem, {
      ticket: ticket
    }), /*#__PURE__*/jsxRuntime.jsx(IconButton__default["default"], {
      size: "small",
      sx: {
        position: 'absolute',
        zIndex: 2,
        top: "4px",
        right: "4px"
      },
      onClick: onCloseTag,
      children: /*#__PURE__*/jsxRuntime.jsx(ClearIcon__default["default"], {})
    })]
  });
};

function MessageGenerator(_ref) {
  var sendMessage = _ref.sendMessage,
      addFile = _ref.addFile,
      files = _ref.files,
      removeFile = _ref.removeFile,
      replyMessage = _ref.replyMessage,
      removeReplyMessage = _ref.removeReplyMessage,
      conversation = _ref.conversation,
      contentEditableRef = _ref.contentEditableRef,
      disabled = _ref.disabled,
      _ref$tagAPI = _ref.tagAPI,
      getProductBySlug = _ref$tagAPI.getProductBySlug,
      getOrderByID = _ref$tagAPI.getOrderByID,
      getTicketByID = _ref$tagAPI.getTicketByID,
      searchProduct = _ref$tagAPI.searchProduct,
      searchTicket = _ref$tagAPI.searchTicket,
      searchOrder = _ref$tagAPI.searchOrder;

  var _useForm = reactHookForm.useForm(),
      handleSubmit = _useForm.handleSubmit;
      _useForm.control;
      _useForm.setError;
      var reset = _useForm.reset,
      register = _useForm.register,
      getValues = _useForm.getValues,
      setValue = _useForm.setValue;

  var caretRef = React.useRef();
  var btnSubmitRef = React.useRef();

  var _useContext = React.useContext(ChatContext),
      currentConversation = _useContext.currentConversation,
      openSupportTicketCallbackFunc = _useContext.openSupportTicketCallbackFunc;

  var _useTag = useTag({
    caretRef: caretRef,
    tagDisabled: currentConversation.conversationType !== ConversationType.CUSTOMER_WITH_CS,
    getProductBySlug: getProductBySlug,
    getOrderByID: getOrderByID,
    getTicketByID: getTicketByID
  }),
      textMessage = _useTag.textMessage,
      resetTagState = _useTag.resetState,
      handleChangeMessage = _useTag.handleChangeMessage,
      handleSelectTagItem = _useTag.handleSelectTagItem,
      handleSelectMenuItem = _useTag.handleSelectMenuItem,
      toggleTagMenu = _useTag.toggleTagMenu,
      handleCloseTag = _useTag.handleCloseTag,
      openTagMenu = _useTag.openTagMenu,
      tagMenu = _useTag.tagMenu,
      searchText = _useTag.searchText,
      selectedTagItem = _useTag.selectedTagItem,
      selectedTagMenuItem = _useTag.selectedTagMenuItem,
      setTextMessage = _useTag.setTextMessage,
      changeSearchText = _useTag.changeSearchText,
      getState = _useTag.getState,
      closeTagMenu = _useTag.closeTagMenu;

  var _useState = React.useState({
    emoji: false,
    gif: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = React.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      contentEditable = _useState4[0],
      setContentEditable = _useState4[1];

  var emojiButtonRef = React.useRef(null);
  var textMessageRef = React.useRef(null);
  textMessageRef.current = textMessage;
  var inputFileRef = React.useRef();

  var _register = register('files'),
      _onChange = _register.onChange,
      onBlur = _register.onBlur,
      name = _register.name,
      _ref3 = _register.ref;

  register('message');
  var onSubmit = React.useCallback(function (data) {
    var realData = _objectSpread2(_objectSpread2({}, data), {}, {
      message: data.message || textMessageRef.current || ""
    }, getState().selectedTagItem && {
      tagItem: _objectSpread2({}, getState().selectedTagItem)
    });

    resetTagState();
    sendMessage(realData);
    reset({
      files: "",
      message: ""
    });
  }, [reset, resetTagState, selectedTagItem, sendMessage, textMessage]);

  var handlePaste = function handlePaste(e) {
    var a = Array.from(e.clipboardData.items);

    if (a.length > 0) {
      var newFiles = [];

      for (var i = 0; i < a.length; i++) {
        var blob = a[i].getAsFile();

        if (blob) {
          newFiles.push(blob);
        }
      }

      if (newFiles.length) {
        addFile(newFiles);
        e.preventDefault();
      }
    }
  };

  var isTagSearching = React.useMemo(function () {
    if (!selectedTagItem && selectedTagMenuItem) {
      return selectedTagMenuItem.code.toUpperCase();
    }

    return null;
  }, [selectedTagItem, selectedTagMenuItem]);
  var selectTagItemRef = React.useRef(null);
  var selectTagMenuItemRef = React.useRef(null);

  var handleChangeContentEditable = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(value) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              handleChangeMessage(value);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleChangeContentEditable(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var attachClick = function attachClick() {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  var handleCaret = function handleCaret(pos) {
    caretRef.current = pos;
  };

  var onCloseEmojiPicker = function onCloseEmojiPicker() {
    setOpen({
      emoji: false
    });
  };

  var onEmojiSelect = function onEmojiSelect(emoji) {
    setTextMessage(function (prev) {
      return insertToString(prev, caretRef.current || 0, emoji["native"]);
    });
  };

  var toggleEmojiPicker = function toggleEmojiPicker() {
    setOpen(function (prev) {
      return {
        emoji: !prev.emoji
      };
    });
  };

  var onTagClick = function onTagClick(code) {
    var tag = tagMenu.find(function (tag) {
      return tag.code === code;
    });

    if (code === (selectedTagMenuItem === null || selectedTagMenuItem === void 0 ? void 0 : selectedTagMenuItem.code)) {
      closeTagMenu();
    } else {
      handleSelectMenuItem(tag);
    }
  };

  var htmlContentToShow = React.useMemo(function () {
    return messageObjToHTML(textMessage, selectedTagItem);
  }, [textMessage, selectedTagItem]);

  var onContentEditableFocus = function onContentEditableFocus() {
    if (contentEditable) {
      contentEditable.focus();
    }
  };

  var supportCreateTicket = function supportCreateTicket() {
    openSupportTicketCallbackFunc && openSupportTicketCallbackFunc('ANY', null);
  };

  React.useEffect(function () {
    if (!files || files.length === 0) {
      reset(_objectSpread2(_objectSpread2({}, getValues()), {}, {
        files: ""
      }));
    }
  }, [files]);
  React.useEffect(function () {
    setValue("message", textMessage);

    if (contentEditable) {
      caretRef.current = getCaretPosition(contentEditable);
    }
  }, [textMessage, contentEditable]);
  React.useEffect(function () {
    resetTagState();
    setOpen({
      emoji: false,
      gif: false
    });
    reset({
      messsage: "",
      files: ""
    });
  }, [conversation.conversationID]);
  React.useEffect(function () {
    if (open.emoji) {
      closeTagMenu();
    }
  }, [open]);
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [replyMessage && /*#__PURE__*/jsxRuntime.jsx(ReplyMessage, {
      replyMessage: replyMessage,
      removeReplyMessage: removeReplyMessage,
      conversation: conversation,
      onContentEditableFocus: onContentEditableFocus
    }), files.length > 0 && /*#__PURE__*/jsxRuntime.jsx(FileContainer, {
      files: files,
      removeFile: removeFile
    }), isTagSearching === TagCode.SP && /*#__PURE__*/jsxRuntime.jsx(TagWindows, {
      selectTagItemRef: selectTagItemRef,
      changeSearchText: changeSearchText,
      text: searchText,
      handleSelectItem: function handleSelectItem(product) {
        if (product) {
          handleSelectTagItem(product, product.product.name); // onContentEditableFocus();
        }
      },
      searchTag: searchProduct,
      type: "PRODUCT",
      noDataText: "Kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m n\xE0o",
      placeholder: "Nh\u1EADp t\xEAn s\u1EA3n ph\u1EA9m"
    }), isTagSearching === TagCode.DH && /*#__PURE__*/jsxRuntime.jsx(TagWindows, {
      selectTagItemRef: selectTagItemRef,
      changeSearchText: changeSearchText,
      text: searchText,
      handleSelectItem: function handleSelectItem(order) {
        if (order) {
          handleSelectTagItem(order, order.orderId || order.orderID);
          onContentEditableFocus();
        }
      },
      searchTag: searchOrder,
      type: "ORDER",
      noDataText: "Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng n\xE0o",
      placeholder: "Nh\u1EADp m\xE3 \u0111\u01A1n h\xE0ng"
    }), isTagSearching === TagCode.HOTRO && /*#__PURE__*/jsxRuntime.jsx(TagWindows, {
      selectTagItemRef: selectTagItemRef,
      changeSearchText: changeSearchText,
      text: searchText,
      handleSelectItem: function handleSelectItem(ticket) {
        if (ticket) {
          handleSelectTagItem(ticket, ticket.code);
          onContentEditableFocus();
        }
      },
      searchTag: searchTicket,
      type: "TICKET",
      noDataText: "Kh\xF4ng c\xF3 phi\u1EBFu h\u1ED7 tr\u1EE3 n\xE0o",
      placeholder: "Nh\u1EADp m\xE3 phi\u1EBFu h\u1ED7 tr\u1EE3"
    }), !selectedTagItem && !selectedTagMenuItem && openTagMenu && /*#__PURE__*/jsxRuntime.jsx(TagMenu, {
      data: tagMenu,
      selectedTagMenuItem: selectedTagMenuItem,
      handleSelectMenuItem: handleSelectMenuItem,
      selectTagMenuItemRef: selectTagMenuItemRef
    }), selectedTagItem && /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [selectedTagItem.tag.code.toUpperCase() === TagCode.SP && /*#__PURE__*/jsxRuntime.jsx(SelectedProduct, {
        product: selectedTagItem.item,
        onCloseTag: handleCloseTag
      }), selectedTagItem.tag.code.toUpperCase() === TagCode.DH && /*#__PURE__*/jsxRuntime.jsx(SelectedOrder, {
        order: selectedTagItem.item,
        onCloseTag: handleCloseTag
      }), selectedTagItem.tag.code.toUpperCase() === TagCode.HOTRO && /*#__PURE__*/jsxRuntime.jsx(SelectedTicket, {
        ticket: selectedTagItem.item,
        onCloseTag: handleCloseTag
      })]
    }), /*#__PURE__*/jsxRuntime.jsxs(material.Paper, {
      sx: {
        padding: '3px 10px 3px 3px',
        display: 'flex',
        width: '100%',
        height: '100px',
        borderRadius: '0px',
        borderTop: '1px solid #ddd',
        boxShadow: 'none',
        flexDirection: 'column',
        position: 'relative'
      },
      component: "form",
      noValidate: true,
      onSubmit: handleSubmit(onSubmit),
      autoComplete: "off",
      children: [open.emoji && /*#__PURE__*/jsxRuntime.jsx(material.Box, {
        sx: {
          position: 'absolute',
          zIndex: 4,
          transform: "translateY(-100%)",
          top: "-.5rem",
          left: ".5rem"
        },
        children: /*#__PURE__*/jsxRuntime.jsx(EmojiPicker, {
          onEmojiSelect: onEmojiSelect,
          open: open.emoji,
          onCloseEmojiPicker: onCloseEmojiPicker,
          emojiButtonRef: emojiButtonRef
        })
      }), conversation.conversationType !== ConversationType.CUSTOMER_WITH_SELLER && /*#__PURE__*/jsxRuntime.jsx(MessageGeneratorMenu, {
        widgetClick: toggleTagMenu,
        attachClick: attachClick,
        attachDisabled: false,
        widgetDisabled: selectedTagItem,
        stickerClick: toggleEmojiPicker,
        emojiButtonRef: emojiButtonRef,
        disabled: disabled,
        supportClick: supportCreateTicket,
        productTagClick: function productTagClick() {
          return onTagClick(TagCode.SP);
        },
        orderTagClick: function orderTagClick() {
          return onTagClick(TagCode.DH);
        },
        ticketTagClick: function ticketTagClick() {
          return onTagClick(TagCode.HOTRO);
        }
      }), /*#__PURE__*/jsxRuntime.jsxs(material.Box, {
        sx: {
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          borderRadius: '0px',
          boxShadow: 'none'
        },
        onClick: function onClick(e) {
          e.stopPropagation();
        },
        children: [/*#__PURE__*/jsxRuntime.jsx("input", {
          onChange: function onChange(e) {
            _onChange(e);

            if (e.target.files) {
              addFile(Array.from(e.target.files));
            }
          },
          onBlur: onBlur,
          name: name,
          ref: function ref(r) {
            _ref3(r);

            inputFileRef.current = r;
          },
          type: "file",
          style: {
            display: 'none'
          },
          multiple: true,
          disabled: disabled
        }), /*#__PURE__*/jsxRuntime.jsx(MyContentEditable, {
          btnSubmitRef: btnSubmitRef,
          contentEditableRef: contentEditableRef,
          onPaste: handlePaste,
          enterHit: handleSubmit(onSubmit),
          disabled: disabled,
          onChange: handleChangeContentEditable,
          htmlContentToShow: htmlContentToShow,
          setContentEditable: setContentEditable,
          handleCaret: handleCaret
        }), /*#__PURE__*/jsxRuntime.jsx(material.Box, {
          sx: {
            paddingLeft: '5px'
          },
          children: /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
            title: "G\u1EEDi",
            children: /*#__PURE__*/jsxRuntime.jsx("span", {
              children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
                type: "submit",
                sx: {
                  margin: 0,
                  backgroundColor: 'unset',
                  '&:hover': {
                    backgroundColor: 'unset'
                  },
                  '& .MuiSvgIcon-root': {
                    color: "#00b46e"
                  }
                },
                variant: "contained",
                color: "primary",
                disabled: disabled,
                ref: btnSubmitRef,
                children: /*#__PURE__*/jsxRuntime.jsx(SendIcon__default["default"], {
                  sx: {
                    color: 'white'
                  }
                })
              })
            })
          })
        })]
      })]
    })]
  });
}

var MAX_FILE_SEND_AT_TIME = 6;

var MessageBox = function MessageBox(props) {
  var adaptiveMode = props.adaptiveMode,
      selectedMediaId = props.selectedMediaId,
      setSelectedMediaId = props.setSelectedMediaId;

  var _useContext = React.useContext(ChatContext),
      messageListLoading = _useContext.loading.messageList,
      sendMessageToServer = _useContext.sendMessageToServer,
      conversation = _useContext.currentConversation;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      replyMessage = _useState2[0],
      setReplyMessage = _useState2[1];

  var replyMessageRef = React.useRef(null);
  var contentEditableRef = React.useRef(null);

  var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      files = _useState4[0],
      setFiles = _useState4[1];

  var filesRef = React.useRef([]);
  filesRef.current = files;
  replyMessageRef.current = replyMessage;
  var isReadOnlyConversation = React.useMemo(function () {
    if (conversation.conversationType === ConversationType.CUSTOMER_WITH_SELLER) {
      return !(conversation.sellerInfo && conversation.sellerInfo._allowUseBuymedChat);
    }

    return false;
  }, [conversation]);

  var removeReplyMessage = function removeReplyMessage() {
    setReplyMessage(null);
  };

  var addFile = function addFile() {
    var newFiles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    setFiles(function (prev) {
      return [].concat(_toConsumableArray(prev), _toConsumableArray(newFiles));
    });
  };

  var removeFile = function removeFile(index) {
    setFiles(function (prev) {
      var copy = _toConsumableArray(prev);

      copy.splice(index, 1);
      return copy;
    });
  };

  var handleSendMessageWithFiles = function handleSendMessageWithFiles(body, fileArray) {
    var copy = _toConsumableArray(fileArray);

    while (copy.length > MAX_FILE_SEND_AT_TIME) {
      var arr = copy.splice(0, MAX_FILE_SEND_AT_TIME);
      sendMessageToServer({
        message: "",
        files: arr
      });
    }

    sendMessageToServer(_objectSpread2(_objectSpread2({}, body), {}, {
      files: copy
    }));
  };

  var sendMessage = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
      var body, imageArray, fileArray, videoArray, imageLength, fileLength, videoLength, arr;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              body = _objectSpread2(_objectSpread2(_objectSpread2({
                message: data.message || ""
              }, data.tagItem && {
                tag: data.tagItem
              }), filesRef.current && filesRef.current.length > 0 && {
                files: filesRef.current
              }), replyMessageRef.current && {
                replyForMessage: replyMessageRef.current
              });
              imageArray = [];
              fileArray = [];
              videoArray = [];

              if (body.files && body.files.length) {
                body.files.forEach(function (file, index) {
                  if (file.type.includes("image")) {
                    imageArray.push(file);
                  } else if (file.type.includes("mp4") || file.type.includes("ogg")) {
                    videoArray.push(file);
                  } else {
                    fileArray.push(file);
                  }
                });
              }

              imageLength = imageArray.length;
              fileLength = fileArray.length;
              videoLength = videoArray.length;
              setFiles([]);
              removeReplyMessage();

              if (imageLength && !fileLength && !videoLength || !imageLength && fileLength && !videoLength || !imageLength && !fileLength && videoLength || !imageLength && !fileLength && !videoLength) {
                arr = function () {
                  if (imageLength) return imageArray;
                  if (fileLength) return fileArray;
                  if (videoLength) return videoArray;
                  return null;
                }();

                if (arr) {
                  handleSendMessageWithFiles(body, arr);
                } else if (body.message && body.message.replace(/^\s+|\s+$/g, '').length || body.tag) {
                  sendMessageToServer(body);
                }
              } else {
                if (fileLength) {
                  handleSendMessageWithFiles({
                    message: ""
                  }, fileArray);
                }

                if (imageLength) {
                  handleSendMessageWithFiles({
                    message: ""
                  }, imageArray);
                }

                if (videoLength) {
                  handleSendMessageWithFiles({
                    message: ""
                  }, videoArray);
                }

                if (body.message && body.message.replace(/^\s+|\s+$/g, '').length || body.tag) {
                  sendMessageToServer(_objectSpread2(_objectSpread2({}, body), {}, {
                    files: []
                  }));
                }
              }

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function sendMessage(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var dropHandler = function dropHandler(e) {
    e.preventDefault();

    if (isReadOnlyConversation) {
      return;
    }

    var filesDrop = [];

    if (e.dataTransfer.items) {
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          var file = e.dataTransfer.items[i].getAsFile();
          filesDrop.push(file);
        }
      }
    } else {
      for (var _i = 0; _i < e.dataTransfer.files.length; _i++) {
        filesDrop.push(e.dataTransfer.files[_i]);
      }
    }

    if (filesDrop.length > 0) {
      addFile(filesDrop);
    }
  };

  var dragOverHandler = function dragOverHandler(e) {
    e.preventDefault();
  };

  var tagSearchProduct = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(pagination, text) {
      var _conversation$custome;

      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return searchProductV2({
                data: _objectSpread2(_objectSpread2({
                  limit: pagination.limit,
                  page: pagination.page,
                  offset: (pagination.page - 1) * pagination.limit
                }, (text === null || text === void 0 ? void 0 : text.length) && {
                  text: text
                }), {}, {
                  filter: {
                    locationCodes: [(_conversation$custome = conversation.customerInfo) === null || _conversation$custome === void 0 ? void 0 : _conversation$custome.provinceCode],
                    statusIn: ["NORMAL", "LIMIT"],
                    isActive: true
                  }
                }),
                customerID: conversation.customerInfo.customerID,
                accountID: conversation.customerInfo.accountID
              });

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function tagSearchProduct(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  var tagGetProductBySlug = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(slug) {
      var _conversation$custome2;

      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return getProductBySlug({
                data: {
                  slug: slug,
                  filter: {
                    locationCodes: [(_conversation$custome2 = conversation.customerInfo) === null || _conversation$custome2 === void 0 ? void 0 : _conversation$custome2.provinceCode],
                    statusIn: ["NORMAL", "LIMIT"],
                    isActive: true
                  }
                },
                customerID: conversation.customerInfo.customerID
              });

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function tagGetProductBySlug(_x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  var tagSearchOrder = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(pagination, text) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return searchCustomerOrderById({
                params: {
                  limit: pagination.limit,
                  page: pagination.page,
                  offset: (pagination.page - 1) * pagination.limit,
                  q: JSON.stringify(_objectSpread2({
                    customerId: conversation.customerInfo.customerID
                  }, text.length && {
                    search: text
                  }))
                }
              });

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function tagSearchOrder(_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  var tagGetOrderByID = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return searchCustomerOrderById({
                params: {
                  limit: 1,
                  offset: 0,
                  q: JSON.stringify(_objectSpread2({
                    customerID: conversation.customerInfo.customerID
                  }, id.length && {
                    search: id
                  }))
                }
              });

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function tagGetOrderByID(_x7) {
      return _ref5.apply(this, arguments);
    };
  }();

  var tagSearchTicket = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(pagination) {
      var _conversation$custome3;

      var code,
          _args6 = arguments;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              code = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : "";
              _context6.next = 3;
              return integrateSearchTicket({
                params: _objectSpread2({
                  limit: pagination.limit,
                  offset: (pagination.page - 1) * pagination.limit,
                  customerId: conversation === null || conversation === void 0 ? void 0 : (_conversation$custome3 = conversation.customerInfo) === null || _conversation$custome3 === void 0 ? void 0 : _conversation$custome3.customerID
                }, code.length && {
                  search: code.trim()
                })
              });

            case 3:
              return _context6.abrupt("return", _context6.sent);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function tagSearchTicket(_x8) {
      return _ref6.apply(this, arguments);
    };
  }();

  var tagGetTicketByID = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id) {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return integrateSearchTicket({
                params: {
                  customerId: conversation.customerInfo.customerID,
                  ticketId: id
                }
              });

            case 2:
              return _context7.abrupt("return", _context7.sent);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function tagGetTicketByID(_x9) {
      return _ref7.apply(this, arguments);
    };
  }();

  var focusMessageGenerator = function focusMessageGenerator() {
    focusAtTheEnd(contentEditableRef.current);
  };

  React.useEffect(function () {
    setFiles([]);
    removeReplyMessage();
  }, [conversation === null || conversation === void 0 ? void 0 : conversation.conversationID]);

  if (!conversation) {
    return "";
  }

  return /*#__PURE__*/jsxRuntime.jsxs(Stack__default["default"], {
    sx: {
      height: "100%",
      width: "100%",
      backgroundColor: "#f5f5f5",
      position: "absolute"
    },
    onDrop: dropHandler,
    onDragOver: dragOverHandler,
    onClick: function onClick(e) {
      var target = e.target || {};
      var tagName = target.tagName || "";

      if (tagName.toUpperCase() !== "EM-EMOJI-PICKER") {
        focusMessageGenerator();
      }
    },
    children: [messageListLoading ? /*#__PURE__*/jsxRuntime.jsx(CircularProgress__default["default"], {
      size: 30,
      color: "success",
      sx: {
        margin: "10px auto"
      }
    }) : /*#__PURE__*/jsxRuntime.jsx(ListMessage, {
      selectedMediaId: selectedMediaId,
      setSelectedMediaId: setSelectedMediaId,
      adaptiveMode: adaptiveMode,
      setReplyMessage: setReplyMessage
    }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
      sx: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        maxHeight: "90%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        zIndex: 10
      },
      children: /*#__PURE__*/jsxRuntime.jsx(MessageGenerator, {
        files: filesRef.current,
        setFiles: setFiles,
        addFile: addFile,
        removeFile: removeFile,
        sendMessage: sendMessage,
        conversation: conversation,
        replyMessage: replyMessageRef.current,
        removeReplyMessage: removeReplyMessage,
        contentEditableRef: contentEditableRef,
        disabled: messageListLoading || isReadOnlyConversation,
        tagAPI: {
          searchProduct: tagSearchProduct,
          searchOrder: tagSearchOrder,
          getOrderByID: tagGetOrderByID,
          getProductBySlug: tagGetProductBySlug,
          searchTicket: tagSearchTicket,
          getTicketByID: tagGetTicketByID
        }
      })
    })]
  });
};

var css_248z$a = ".RatingPopup-module_rating-popup__tnLNm {\n  position: absolute;\n  bottom: 103px;\n  right: -1px;\n  z-index: 11;\n  background: #FFFFFF;\n  border: 1px solid #15A959;\n  border-radius: 8px;\n  padding: 10px;\n  width: 254px;\n}\n.RatingPopup-module_rating-popup__tnLNm .RatingPopup-module_rating-box__FYpbc {\n  display: flex;\n  flex-direction: column;\n  align-self: baseline;\n  padding: 4px 0 4px 4px;\n}\n.RatingPopup-module_rating-popup__tnLNm .RatingPopup-module_rating-box__FYpbc .RatingPopup-module_rating-caption__v3Ha2 {\n  display: flex;\n  justify-content: space-between;\n  color: #BEBDBD;\n}\n.RatingPopup-module_rating-popup__tnLNm .RatingPopup-module_comment-input__jmJNc {\n  background: #F5F5F5;\n  border-radius: 8px;\n  width: 100%;\n}\n.RatingPopup-module_rating-popup__tnLNm .RatingPopup-module_comment-input__jmJNc > div {\n  padding: 5px 10px;\n}\n.RatingPopup-module_rating-popup__tnLNm .RatingPopup-module_comment-input__jmJNc textarea {\n  font-size: 14px;\n}\n.RatingPopup-module_rating-popup__tnLNm .RatingPopup-module_group-action__3uXAg {\n  display: flex;\n  justify-content: center;\n  margin-top: 12px;\n}\n.RatingPopup-module_rating-popup__tnLNm .RatingPopup-module_btn-comment__i-RoG {\n  background: #15A959;\n  color: #fff;\n  line-height: 14px;\n  font-size: 12px;\n}\n.RatingPopup-module_rating-popup__tnLNm .RatingPopup-module_btn-comment__i-RoG:hover {\n  background: #15A959;\n  color: #fff;\n}\n.RatingPopup-module_rating-popup__tnLNm .RatingPopup-module_btn-close__QltdC {\n  background: #D9D9D9;\n  color: #676565;\n  line-height: 14px;\n  margin-left: 14px;\n  font-size: 12px;\n}\n.RatingPopup-module_rating-popup__tnLNm .RatingPopup-module_btn-close__QltdC:hover {\n  background: #D9D9D9;\n  color: #676565;\n}";
var style$9 = {"rating-popup":"RatingPopup-module_rating-popup__tnLNm","rating-box":"RatingPopup-module_rating-box__FYpbc","rating-caption":"RatingPopup-module_rating-caption__v3Ha2","comment-input":"RatingPopup-module_comment-input__jmJNc","group-action":"RatingPopup-module_group-action__3uXAg","btn-comment":"RatingPopup-module_btn-comment__i-RoG","btn-close":"RatingPopup-module_btn-close__QltdC"};
styleInject(css_248z$a);

var RatingPopup = function RatingPopup(_ref) {
  var onClose = _ref.onClose,
      sendRating = _ref.sendRating;

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      commentValue = _useState2[0],
      setCommentValue = _useState2[1];

  var _useState3 = React.useState(5),
      _useState4 = _slicedToArray(_useState3, 2),
      ratingValue = _useState4[0],
      setRatingValue = _useState4[1];

  var ratingRef = React.useRef(null);

  var handleSubmitComment = function handleSubmitComment() {
    sendRating(ratingValue, commentValue);
  };

  var handleClickOutside = function handleClickOutside(event) {
    var _ratingRef$current;

    if (!((_ratingRef$current = ratingRef.current) !== null && _ratingRef$current !== void 0 && _ratingRef$current.contains(event.target))) {
      onClose();
    }
  };

  React.useEffect(function () {
    document.addEventListener('click', handleClickOutside, true);
    return function () {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
    className: style$9["rating-popup"],
    ref: ratingRef,
    children: [/*#__PURE__*/jsxRuntime.jsx(material.Box, {
      children: "B\u1EA1n c\xF3 h\xE0i l\xF2ng v\u1EC1 nh\xE2n vi\xEAn h\u1ED7 tr\u1EE3?"
    }), /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
      children: [/*#__PURE__*/jsxRuntime.jsxs(material.Box, {
        className: style$9["rating-box"],
        children: [/*#__PURE__*/jsxRuntime.jsx(material.Rating, {
          name: "size-large",
          defaultValue: 5,
          size: "medium",
          onChange: function onChange(evt, newValue) {
            return setRatingValue(newValue);
          }
        }), /*#__PURE__*/jsxRuntime.jsxs(material.Box, {
          className: style$9["rating-caption"],
          children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, {
            variant: "caption",
            display: "block",
            gutterBottom: true,
            children: "Kh\xF4ng t\u1ED1t"
          }), /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
            variant: "caption",
            display: "block",
            gutterBottom: true,
            children: "T\u1ED1t"
          })]
        })]
      }), /*#__PURE__*/jsxRuntime.jsx(material.TextField, {
        placeholder: "Nh\u1EADp \xFD ki\u1EBFn \u0111\xF3ng g\xF3p",
        multiline: true,
        rows: 3,
        maxRows: 4,
        className: style$9["comment-input"],
        onChange: function onChange(e) {
          return setCommentValue(e.target.value);
        }
      }), /*#__PURE__*/jsxRuntime.jsxs(material.Box, {
        className: style$9["group-action"],
        children: [/*#__PURE__*/jsxRuntime.jsx(material.Button, {
          className: style$9["btn-comment"],
          onClick: handleSubmitComment,
          children: "\u0110\xE1nh gi\xE1"
        }), /*#__PURE__*/jsxRuntime.jsx(material.Button, {
          className: style$9["btn-close"],
          onClick: onClose,
          children: "\u0110\xF3ng"
        })]
      })]
    })]
  });
};

var MessageWrapper = function MessageWrapper() {
  var _getRatingStatus, _sendRating;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      selectedMediaId = _useState2[0],
      setSelectedMediaId = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isShowRating = _useState4[0],
      setIsShowRating = _useState4[1];

  var _useContext = React.useContext(ChatContext),
      user = _useContext.user,
      isCustomer = _useContext.isCustomer,
      foundMessage = _useContext.foundMessage,
      currentConversation = _useContext.currentConversation,
      loadMessageInConversation = _useContext.loadMessageInConversation;

  var services = {
    getRatingStatus: (_getRatingStatus = {}, _defineProperty(_getRatingStatus, UserType.CUSTOMER, getRatingStatusCustomer), _defineProperty(_getRatingStatus, UserType.GUEST, getRatingStatusGuest), _getRatingStatus),
    sendRating: (_sendRating = {}, _defineProperty(_sendRating, UserType.CUSTOMER, sendRatingCustomer), _defineProperty(_sendRating, UserType.GUEST, sendRatingGuest), _sendRating)
  };

  var handleSendRating = function handleSendRating(rating, feedback) {
    services.sendRating[user.type](null, _objectSpread2({
      conversationID: currentConversation.conversationID,
      rating: rating,
      feedback: feedback
    }, !isCustomer && {
      guestID: user.accountID
    }));
    setIsShowRating(false);
  };

  React.useEffect(function () {
    if (!foundMessage && !currentConversation.rawID) {
      loadMessageInConversation("top", true);
    }
  }, [currentConversation.conversationID]);
  React.useEffect( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var showRating, conversationStatusesNeedRating, _rating$data, _rating$data$, rating;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showRating = false;
            conversationStatusesNeedRating = [ConversationStatus.WAIT_TO_COMPLETE, ConversationStatus.COMPLETED];

            if (!conversationStatusesNeedRating.includes(currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.conversationStatus)) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return services.getRatingStatus[user.type](null, currentConversation.conversationID);

          case 5:
            rating = _context.sent;

            if ((rating === null || rating === void 0 ? void 0 : rating.status) === APIStatus.OK && !(rating !== null && rating !== void 0 && (_rating$data = rating.data) !== null && _rating$data !== void 0 && (_rating$data$ = _rating$data[0]) !== null && _rating$data$ !== void 0 && _rating$data$.isRealRating) && conversationStatusesNeedRating.includes(rating.data[0].conversationStatus) || (rating === null || rating === void 0 ? void 0 : rating.status) === APIStatus.NOT_FOUND) {
              showRating = true;
            }

          case 7:
            setIsShowRating(showRating);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.conversationStatus]);
  return /*#__PURE__*/jsxRuntime.jsxs(material.Box, {
    sx: {
      position: "relative",
      height: "100%",
      display: "flex",
      alignItems: "center"
    },
    children: [/*#__PURE__*/jsxRuntime.jsx(MessageBox, {
      selectedMediaId: selectedMediaId,
      setSelectedMediaId: setSelectedMediaId
    }), isShowRating && /*#__PURE__*/jsxRuntime.jsx(RatingPopup, {
      onClose: function onClose() {
        return setIsShowRating(false);
      },
      sendRating: handleSendRating
    })]
  });
};

var css_248z$9 = ".TagItem-module_tag-item__uLsRu {\n  cursor: pointer;\n}\n.TagItem-module_tag-item__uLsRu td {\n  padding: 14px;\n}\n.TagItem-module_tag-item__uLsRu .TagItem-module_tag-info__-JQa1 {\n  min-width: 300px;\n}\n.TagItem-module_tag-item__uLsRu .TagItem-module_tag-info__-JQa1 p, .TagItem-module_tag-item__uLsRu .TagItem-module_tag-info__-JQa1 span, .TagItem-module_tag-item__uLsRu .TagItem-module_tag-info__-JQa1 a {\n  font-size: 12px;\n}";
var style$8 = {"tag-item":"TagItem-module_tag-item__uLsRu","tag-info":"TagItem-module_tag-info__-JQa1"};
styleInject(css_248z$9);

var TagItem = function TagItem(_ref) {
  var item = _ref.item,
      conversation = _ref.conversation,
      handleViewMessage = _ref.handleViewMessage;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];

  var menuOpen = Boolean(anchorEl);

  var sendTime = function () {
    if (!item.createdTime) {
      return "-";
    }

    return ddmmyyHHMM(new Date(item.createdTime));
  }();

  var handleClick = function handleClick(event) {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose(event) {
    event.stopPropagation();
    setAnchorEl(null);
  };

  var tagUrl = function () {
    switch (item.type) {
      case 'PRODUCT':
        {
          return productUrl(item.skuInfo);
        }

      case 'ORDER':
        {
          return orderUrl(item.orderInfo);
        }

      case 'TICKET':
        {
          return ticketUrl(item.ticketInfo);
        }

      default:
        return '';
    }
  }();

  return /*#__PURE__*/jsxRuntime.jsxs(material.TableRow, {
    className: style$8["tag-item"],
    onClick: function onClick() {
      return window.open(tagUrl, '_blank');
    },
    children: [/*#__PURE__*/jsxRuntime.jsxs(material.TableCell, {
      className: style$8["tag-info"],
      children: [item.type === "PRODUCT" && /*#__PURE__*/jsxRuntime.jsx(ProductItem, {
        skuInfo: item.skuInfo,
        isTagItem: true
      }), item.type === "ORDER" && /*#__PURE__*/jsxRuntime.jsx(OrderItem, {
        order: item.orderInfo,
        isTagItem: true
      }), item.type === "TICKET" && /*#__PURE__*/jsxRuntime.jsx(TicketItem, {
        ticket: item.ticketInfo
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
      style: {
        minWidth: 98
      },
      children: item.senderID === conversation.customerID ? 'Tôi' : conversation.conversationName
    }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
      style: {
        minWidth: 98
      },
      children: sendTime
    }), /*#__PURE__*/jsxRuntime.jsxs(material.TableCell, {
      children: [/*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
        "aria-label": "more",
        id: "long-button",
        "aria-controls": menuOpen ? 'long-menu' : undefined,
        "aria-expanded": menuOpen ? 'true' : undefined,
        "aria-haspopup": "true",
        onClick: handleClick,
        children: /*#__PURE__*/jsxRuntime.jsx(MoreVertIcon__default["default"], {})
      }), /*#__PURE__*/jsxRuntime.jsx(material.Menu, {
        id: "long-menu",
        MenuListProps: {
          'aria-labelledby': 'long-button'
        },
        anchorEl: anchorEl,
        open: menuOpen,
        disableScrollLock: true,
        onClose: handleClose,
        children: /*#__PURE__*/jsxRuntime.jsx(material.MenuItem, {
          sx: {
            fontSize: '14px'
          },
          onClick: function onClick(e) {
            handleClose(e);
            handleViewMessage(item.messageID);
          },
          children: "Xem trong chat"
        })
      })]
    })]
  });
};

var img$3 = "data:image/png;base64,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";

var css_248z$8 = ".TagList-module_tag-list__wX0QK {\n  padding: 0 8px;\n  max-width: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 100%;\n  max-height: 540px;\n}\n.TagList-module_tag-list__wX0QK .TagList-module_table__gIjmi {\n  width: 100%;\n}\n.TagList-module_tag-list__wX0QK .TagList-module_table__gIjmi.TagList-module_empty__7yxO- {\n  height: 100%;\n}\n.TagList-module_tag-list__wX0QK .TagList-module_table__gIjmi.TagList-module_empty__7yxO- th, .TagList-module_tag-list__wX0QK .TagList-module_table__gIjmi.TagList-module_empty__7yxO- td {\n  border: none;\n}\n.TagList-module_tag-list__wX0QK .TagList-module_table__gIjmi.TagList-module_empty__7yxO- td {\n  padding: 0 16px;\n  color: #717171;\n  vertical-align: top;\n}\n.TagList-module_tag-list__wX0QK .TagList-module_table__gIjmi.TagList-module_empty__7yxO- .TagList-module_empty-box__-qb-k {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.TagList-module_tag-list__wX0QK .TagList-module_table__gIjmi.TagList-module_empty__7yxO- .TagList-module_empty-box__-qb-k img {\n  width: 200px;\n  height: 200px;\n}\n.TagList-module_tag-list__wX0QK .TagList-module_table__gIjmi th {\n  font-weight: 600;\n}";
var style$7 = {"tag-list":"TagList-module_tag-list__wX0QK","table":"TagList-module_table__gIjmi","empty":"TagList-module_empty__7yxO-","empty-box":"TagList-module_empty-box__-qb-k"};
styleInject(css_248z$8);

var TagList = function TagList(_ref) {
  var list = _ref.list,
      loadTag = _ref.loadTag,
      pagination = _ref.pagination,
      conversation = _ref.conversation,
      handleViewMessage = _ref.handleViewMessage;

  var fetchMoreTag = function fetchMoreTag() {
    loadTag().then(function () {
      setIsFetching(false);
    });
  };

  var _useInfiniteScroll = useInfiniteScroll(fetchMoreTag, "bottom"),
      isFetching = _useInfiniteScroll.isFetching,
      setIsFetching = _useInfiniteScroll.setIsFetching,
      setElement = _useInfiniteScroll.setElement;

  var listRef = React.useRef(null);
  React.useEffect(function () {
    setElement(listRef.current);
  }, []);
  return /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
    ref: listRef,
    className: style$7["tag-list"],
    children: [/*#__PURE__*/jsxRuntime.jsxs(material.Table, {
      size: "medium",
      className: "".concat(style$7["table"], " ").concat((list === null || list === void 0 ? void 0 : list.length) === 0 ? style$7["empty"] : ''),
      children: [/*#__PURE__*/jsxRuntime.jsx(material.TableHead, {
        children: /*#__PURE__*/jsxRuntime.jsxs(material.TableRow, {
          children: [/*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
            component: "th",
            scope: "row",
            children: "Tags"
          }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
            children: "Ng\u01B0\u1EDDi g\u1EEDi"
          }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
            children: "Th\u1EDDi gian"
          }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {})]
        })
      }), /*#__PURE__*/jsxRuntime.jsx(material.TableBody, {
        children: list !== null && list !== void 0 && list.length ? list === null || list === void 0 ? void 0 : list.map(function (item, index) {
          return /*#__PURE__*/jsxRuntime.jsx(TagItem, {
            item: item,
            conversation: conversation,
            handleViewMessage: handleViewMessage
          }, index);
        }) : /*#__PURE__*/jsxRuntime.jsx(material.TableRow, {
          children: /*#__PURE__*/jsxRuntime.jsxs(material.TableCell, {
            colSpan: 4,
            children: [/*#__PURE__*/jsxRuntime.jsx("p", {
              children: "Ch\u01B0a c\xF3 li\xEAn k\u1EBFt \u0111\u01B0\u1EE3c chia s\u1EBB trong h\u1ED9i tho\u1EA1i n\xE0y"
            }), /*#__PURE__*/jsxRuntime.jsx("div", {
              className: style$7["empty-box"],
              children: /*#__PURE__*/jsxRuntime.jsx("img", {
                src: img$3
              })
            })]
          })
        })
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(material.CircularProgress, {
      size: 30,
      color: "success",
      sx: {
        margin: "10px auto",
        visibility: isFetching && !pagination.isOver ? "visible" : 'hidden'
      }
    })]
  });
};

var Tags = function Tags(_ref) {
  var handleViewMessage = _ref.handleViewMessage;

  var _useContext = React.useContext(ChatContext),
      tagListLoading = _useContext.loading.tagList,
      listTags = _useContext.listTags,
      pagination = _useContext.tagPagination,
      conversation = _useContext.currentConversation,
      loadTag = _useContext.loadTag;

  React.useEffect(function () {
    loadTag(true);
  }, []);
  return /*#__PURE__*/jsxRuntime.jsx(material.Box, {
    sx: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%'
    },
    children: tagListLoading ? /*#__PURE__*/jsxRuntime.jsx(material.CircularProgress, {
      size: 30,
      color: "success",
      sx: {
        margin: "10px auto"
      }
    }) : /*#__PURE__*/jsxRuntime.jsx(TagList, {
      list: listTags,
      loadTag: loadTag,
      pagination: pagination,
      conversation: conversation,
      handleViewMessage: handleViewMessage
    })
  });
};

var FileMediaItem = function FileMediaItem(_ref) {
  var item = _ref.item,
      conversation = _ref.conversation,
      handleViewMessage = _ref.handleViewMessage;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];

  var menuOpen = Boolean(anchorEl);

  var handleClick = function handleClick(event) {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  var fileType = function () {
    var name = item.fileName;
    var nameSplits = name.split(".");

    if (nameSplits.length) {
      return nameSplits[nameSplits.length - 1].toUpperCase();
    }
  }();

  var sendTime = function () {
    if (!item.createdTime) {
      return "-";
    }

    return ddmmyyHHMM(new Date(item.createdTime));
  }();

  var FileItem = React.useMemo(function () {
    var FileName = /*#__PURE__*/jsxRuntime.jsx(system.Box, {
      sx: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer'
      },
      children: item.fileName
    });

    if (item.type !== "FILE") {
      return /*#__PURE__*/jsxRuntime.jsx(ImagePopupWrapper, {
        media: {
          type: item.type,
          name: item.filename,
          url: item.URLMedia
        },
        children: FileName
      });
    }

    return /*#__PURE__*/jsxRuntime.jsx("a", {
      component: "button",
      href: "".concat(getImageProxy(item.URLMedia)),
      target: "_blank",
      style: {
        display: 'block'
      },
      children: FileName
    });
  }, [item]);
  return /*#__PURE__*/jsxRuntime.jsxs(material.TableRow, {
    children: [/*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
      children: fileType
    }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
      style: {
        maxWidth: 260
      },
      children: FileItem
    }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
      style: {
        minWidth: 100
      },
      children: sendTime
    }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
      style: {
        minWidth: 100
      },
      children: item.senderID === conversation.customerID ? 'Tôi' : conversation.conversationName
    }), /*#__PURE__*/jsxRuntime.jsxs(material.TableCell, {
      children: [/*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
        "aria-label": "more",
        id: "long-button",
        "aria-controls": menuOpen ? 'long-menu' : undefined,
        "aria-expanded": menuOpen ? 'true' : undefined,
        "aria-haspopup": "true",
        onClick: handleClick,
        children: /*#__PURE__*/jsxRuntime.jsx(MoreVertIcon__default["default"], {})
      }), /*#__PURE__*/jsxRuntime.jsx(material.Menu, {
        id: "long-menu",
        MenuListProps: {
          'aria-labelledby': 'long-button'
        },
        anchorEl: anchorEl,
        open: menuOpen,
        disableScrollLock: true,
        onClose: handleClose,
        children: /*#__PURE__*/jsxRuntime.jsx(material.MenuItem, {
          sx: {
            fontSize: '14px'
          },
          onClick: function onClick(e) {
            e.stopPropagation();
            handleClose();
            handleViewMessage(item.messageID);
          },
          children: "Xem trong chat"
        })
      })]
    })]
  });
};

var img$2 = "data:image/png;base64,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";

var css_248z$7 = ".FileMediaList-module_media-list__Xj8ZC {\n  padding: 0 8px;\n  max-width: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 100%;\n  max-height: 540px;\n}\n.FileMediaList-module_media-list__Xj8ZC .FileMediaList-module_table__dBxEq {\n  width: 100%;\n}\n.FileMediaList-module_media-list__Xj8ZC .FileMediaList-module_table__dBxEq td {\n  padding: 14px;\n}\n.FileMediaList-module_media-list__Xj8ZC .FileMediaList-module_table__dBxEq.FileMediaList-module_empty__yy2Lf {\n  height: 100%;\n}\n.FileMediaList-module_media-list__Xj8ZC .FileMediaList-module_table__dBxEq.FileMediaList-module_empty__yy2Lf th, .FileMediaList-module_media-list__Xj8ZC .FileMediaList-module_table__dBxEq.FileMediaList-module_empty__yy2Lf td {\n  border: none;\n}\n.FileMediaList-module_media-list__Xj8ZC .FileMediaList-module_table__dBxEq.FileMediaList-module_empty__yy2Lf td {\n  padding: 0 16px;\n  color: #717171;\n  vertical-align: top;\n}\n.FileMediaList-module_media-list__Xj8ZC .FileMediaList-module_table__dBxEq.FileMediaList-module_empty__yy2Lf .FileMediaList-module_empty-box__CFHJM {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.FileMediaList-module_media-list__Xj8ZC .FileMediaList-module_table__dBxEq.FileMediaList-module_empty__yy2Lf .FileMediaList-module_empty-box__CFHJM img {\n  width: 200px;\n  height: 200px;\n}\n.FileMediaList-module_media-list__Xj8ZC .FileMediaList-module_table__dBxEq th {\n  font-weight: 600;\n}";
var style$6 = {"media-list":"FileMediaList-module_media-list__Xj8ZC","table":"FileMediaList-module_table__dBxEq","empty":"FileMediaList-module_empty__yy2Lf","empty-box":"FileMediaList-module_empty-box__CFHJM"};
styleInject(css_248z$7);

var FileMediaList = function FileMediaList(_ref) {
  var list = _ref.list,
      loadResource = _ref.loadResource,
      pagination = _ref.pagination,
      conversation = _ref.conversation,
      handleViewMessage = _ref.handleViewMessage;

  var fetchMoreConversation = function fetchMoreConversation() {
    loadResource().then(function () {
      setIsFetching(false);
    });
  };

  var _useInfiniteScroll = useInfiniteScroll(fetchMoreConversation, "bottom"),
      isFetching = _useInfiniteScroll.isFetching,
      setIsFetching = _useInfiniteScroll.setIsFetching,
      setElement = _useInfiniteScroll.setElement;

  var listRef = React.useRef(null);
  React.useEffect(function () {
    setElement(listRef.current);
  }, []);
  return /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
    ref: listRef,
    className: style$6["media-list"],
    children: [/*#__PURE__*/jsxRuntime.jsxs(material.Table, {
      size: "medium",
      className: "".concat(style$6["table"], " ").concat((list === null || list === void 0 ? void 0 : list.length) === 0 ? style$6["empty"] : ''),
      children: [/*#__PURE__*/jsxRuntime.jsx(material.TableHead, {
        children: /*#__PURE__*/jsxRuntime.jsxs(material.TableRow, {
          style: {
            fontSize: '12px'
          },
          children: [/*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
            children: "Lo\u1EA1i"
          }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
            children: "T\xEAn"
          }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
            children: "Th\u1EDDi gian"
          }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {
            children: "Ng\u01B0\u1EDDi g\u1EEDi"
          }), /*#__PURE__*/jsxRuntime.jsx(material.TableCell, {})]
        })
      }), /*#__PURE__*/jsxRuntime.jsx(material.TableBody, {
        children: list !== null && list !== void 0 && list.length ? list === null || list === void 0 ? void 0 : list.map(function (item, index) {
          return /*#__PURE__*/jsxRuntime.jsx(FileMediaItem, {
            item: item,
            conversation: conversation,
            handleViewMessage: handleViewMessage
          }, index);
        }) : /*#__PURE__*/jsxRuntime.jsx(material.TableRow, {
          children: /*#__PURE__*/jsxRuntime.jsxs(material.TableCell, {
            colSpan: 5,
            children: [/*#__PURE__*/jsxRuntime.jsx("p", {
              children: "Ch\u01B0a c\xF3 files ho\u1EB7c h\xECnh \u1EA3nh \u0111\u01B0\u1EE3c chia s\u1EBB trong h\u1ED9i tho\u1EA1i n\xE0y"
            }), /*#__PURE__*/jsxRuntime.jsx("div", {
              className: style$6["empty-box"],
              children: /*#__PURE__*/jsxRuntime.jsx("img", {
                src: img$2
              })
            })]
          })
        })
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(material.CircularProgress, {
      size: 30,
      color: "success",
      sx: {
        margin: "10px auto",
        visibility: isFetching && !pagination.isOver ? "visible" : 'hidden'
      }
    })]
  });
};

var FileMedia = function FileMedia(_ref) {
  var handleViewMessage = _ref.handleViewMessage;

  var _useContext = React.useContext(ChatContext),
      resourceListLoading = _useContext.loading.resourceList,
      listResource = _useContext.listResource,
      loadResource = _useContext.loadResource,
      pagination = _useContext.resourcePagination,
      conversation = _useContext.currentConversation;

  React.useEffect(function () {
    loadResource(true);
  }, []);
  return /*#__PURE__*/jsxRuntime.jsx(material.Box, {
    sx: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%'
    },
    children: resourceListLoading ? /*#__PURE__*/jsxRuntime.jsx(material.CircularProgress, {
      size: 30,
      color: "success",
      sx: {
        margin: "10px auto"
      }
    }) : /*#__PURE__*/jsxRuntime.jsx(FileMediaList, {
      list: _toConsumableArray(listResource),
      loadResource: loadResource,
      pagination: pagination,
      conversation: conversation,
      handleViewMessage: handleViewMessage
    })
  });
};

var _userStatus;
var userStatus = (_userStatus = {}, _defineProperty(_userStatus, 'online', {
  status: 'online',
  color: "#15a959"
}), _defineProperty(_userStatus, 'offline', {
  status: 'offline',
  color: "#c1c1c1"
}), _userStatus);

var AvatarStatus = function AvatarStatus(props) {
  var _userStatus$status, _userStatus$status2;

  var status = props.status,
      name = props.name;
      props.active;
      var src = props.src,
      unreadMessage = props.unreadMessage;
  return /*#__PURE__*/jsxRuntime.jsx(Badge__default["default"], {
    overlap: "circular",
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    variant: "dot",
    sx: {
      '&>.MuiBadge-badge': {
        backgroundColor: (_userStatus$status = userStatus[status]) === null || _userStatus$status === void 0 ? void 0 : _userStatus$status.color,
        color: (_userStatus$status2 = userStatus[status]) === null || _userStatus$status2 === void 0 ? void 0 : _userStatus$status2.color
      }
    },
    className: "onlineBadge",
    children: /*#__PURE__*/jsxRuntime.jsx(Badge__default["default"], {
      badgeContent: unreadMessage,
      sx: {
        '& .MuiBadge-badge': {
          top: "2px",
          right: "2px",
          backgroundColor: '#EE4D2D',
          color: 'white',
          fontSize: '9px',
          lineHeight: 0,
          width: '14px',
          height: "14px",
          minWidth: '14px',
          borderRadius: '100%'
        }
      },
      className: "unreadBadge",
      children: /*#__PURE__*/jsxRuntime.jsx(Avatar__default["default"], {
        sx: {
          width: 40,
          height: 40,
          border: '1px solid #d9d9d9',
          padding: "6px",
          backgroundColor: "#ffffff"
        },
        src: src,
        children: name
      })
    })
  });
};

var css_248z$6 = ".ConversationItem-module_conversation-item__Ruely {\n  padding: 6px 8px;\n  color: rgba(0, 0, 0, 0.87);\n  cursor: pointer;\n}\n.ConversationItem-module_conversation-item__Ruely.ConversationItem-module_active__UKumm {\n  background: #00B46E;\n  color: #FCFEFB;\n  cursor: default;\n}";
var style$5 = {"conversation-item":"ConversationItem-module_conversation-item__Ruely","active":"ConversationItem-module_active__UKumm"};
styleInject(css_248z$6);

var ConversationItem = function ConversationItem(_ref) {
  var conversation = _ref.conversation,
      isActive = _ref.isActive,
      onClick = _ref.onClick;
  var time = React.useMemo(function () {
    if (!conversation.lastMessage || !conversation.lastMessage.createdTime) {
      return getFormattedDate$1(new Date(), 'DD/MM/YYYY HH:mm');
    }

    return getFormattedDate$1(new Date(conversation.lastMessage.createdTime), 'DD/MM/YYYY HH:mm');
  }, [conversation === null || conversation === void 0 ? void 0 : conversation.lastMessage]);
  return /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
    direction: "row",
    className: "".concat(style$5["conversation-item"], " ").concat(isActive ? style$5["active"] : ''),
    spacing: 1,
    onClick: isActive ? null : onClick,
    children: [/*#__PURE__*/jsxRuntime.jsx(AvatarStatus, {
      src: conversation.customerSupportAvatar,
      unreadMessage: conversation.unreadMessage
    }), /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
      sx: {
        flexGrow: 1
      },
      spacing: 1,
      children: [/*#__PURE__*/jsxRuntime.jsx(EllipsisText, {
        children: conversation.conversationName
      }), /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
        children: [/*#__PURE__*/jsxRuntime.jsx(material.Rating, {
          name: "read-only",
          value: 5,
          readOnly: true,
          sx: {
            fontSize: "12px"
          }
        }), /*#__PURE__*/jsxRuntime.jsx(material.Box, {
          sx: {
            fontSize: "9px",
            lineHeight: "9px"
          },
          children: time
        })]
      })]
    })]
  });
};

var css_248z$5 = ".ListConversation-module_list-conversation__zBebW {\n  width: 214px;\n  border-right: 1px solid #D9D9D9;\n}";
var style$4 = {"list-conversation":"ListConversation-module_list-conversation__zBebW"};
styleInject(css_248z$5);

var ListConversation = function ListConversation(_ref) {
  var conversations = _ref.conversations;

  var _useContext = React.useContext(ChatContext),
      currentConversation = _useContext.currentConversation,
      handleSelectConversation = _useContext.handleSelectConversation;

  return /*#__PURE__*/jsxRuntime.jsx(material.Stack, {
    className: style$4["list-conversation"],
    children: conversations.map(function (conversation, index) {
      return /*#__PURE__*/jsxRuntime.jsx(ConversationItem, {
        conversation: conversation,
        isActive: (conversation.conversationID || conversation.sellerID) === (currentConversation.conversationID || currentConversation.sellerID),
        onClick: function onClick() {
          return handleSelectConversation(conversation);
        }
      }, index);
    })
  });
};

var _g, _defs;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgSearch = function SvgSearch(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    width: 12,
    height: 12,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _g || (_g = /*#__PURE__*/React__namespace.createElement("g", {
    clipPath: "url(#search_svg__a)"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M8.807 7.758A4.875 4.875 0 1 0 7.76 8.806c.022.03.046.059.073.086l2.888 2.888a.75.75 0 1 0 1.06-1.06L8.894 7.831a.753.753 0 0 0-.086-.075Zm.194-2.883a4.125 4.125 0 1 1-8.25 0 4.125 4.125 0 0 1 8.25 0Z",
    fill: "#D9D9D9"
  }))), _defs || (_defs = /*#__PURE__*/React__namespace.createElement("defs", null, /*#__PURE__*/React__namespace.createElement("clipPath", {
    id: "search_svg__a"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    fill: "#fff",
    d: "M0 0h12v12H0z"
  })))));
};

var img$1 = "data:image/svg+xml,%3csvg width='124' height='22' viewBox='0 0 124 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M36.2009 8.37399V10.4528H32.7808V14.4378C32.7808 14.9154 32.9074 15.2926 33.1645 15.5695C33.4197 15.8464 33.7722 15.9849 34.224 15.9849C34.8336 15.9849 35.4939 15.7963 36.2028 15.4211V17.6243C35.2621 18.0276 34.3506 18.2282 33.4684 18.2282C32.3154 18.2282 31.4195 17.9212 30.7845 17.3072C30.1477 16.6932 29.8302 15.7903 29.8302 14.6024V10.4528H28.4883V9.85885L32.4147 5.33203H32.7828V8.37399H36.2009Z' fill='%2315A959'/%3e%3cpath d='M40.7143 3.73242V9.78623H40.7552C41.5771 8.7067 42.5685 8.16693 43.7273 8.16693C44.7284 8.16693 45.5522 8.494 46.1988 9.14614C46.8454 9.80028 47.1688 10.7072 47.1688 11.8691V18.0412H44.2161V12.5132C44.2161 11.1045 43.7098 10.4002 42.6951 10.4002C42.0251 10.4002 41.3668 10.8898 40.7163 11.867V18.0412H37.7617V3.73242H40.7143Z' fill='%2315A959'/%3e%3cpath d='M56.0657 18.0427V16.6602C55.1971 17.7056 54.1862 18.2273 53.0333 18.2273C52.0127 18.2273 51.185 17.9022 50.5481 17.2541C49.9112 16.606 49.5938 15.707 49.5938 14.5613V8.37305H52.5463V14.3466C52.5463 15.5746 53.0391 16.1886 54.0285 16.1886C54.5855 16.1886 55.0607 15.9659 55.4561 15.5184C55.8495 15.071 56.0482 14.7419 56.0482 14.5312V8.37305H59.0203V18.0427H56.0657Z' fill='%2315A959'/%3e%3cpath d='M66.3092 8.16797C67.7797 8.16797 69.0281 8.61142 70.0526 9.50033C71.077 10.3892 71.5892 11.6273 71.5892 13.2125C71.5892 14.8057 71.0692 16.0397 70.0272 16.9146C68.9872 17.7895 67.7466 18.2269 66.3092 18.2269C64.7511 18.2269 63.4774 17.7594 62.486 16.8263C61.4947 15.8933 61 14.6813 61 13.1924C61 11.6754 61.5044 10.4575 62.5153 9.54247C63.5261 8.62547 64.7901 8.16797 66.3092 8.16797ZM66.3092 16.423C67.7213 16.423 68.4263 15.3254 68.4263 13.1302C68.4263 11.0313 67.7213 9.9799 66.3092 9.9799C65.6334 9.9799 65.1036 10.2568 64.7239 10.8106C64.3421 11.3644 64.1513 12.157 64.1513 13.1904C64.1513 15.3475 64.8699 16.423 66.3092 16.423Z' fill='%2315A959'/%3e%3cpath d='M81.7706 15.3996V17.5807C80.6176 18.0101 79.56 18.2268 78.5979 18.2268C76.9483 18.2268 75.6278 17.7713 74.6403 16.8584C73.6529 15.9454 73.1582 14.7374 73.1582 13.2345C73.1582 11.7657 73.6568 10.5537 74.654 9.6006C75.6512 8.64748 76.923 8.16992 78.4674 8.16992C79.4607 8.16992 80.5163 8.38262 81.6284 8.804V11.0674C80.8143 10.638 80.0119 10.4213 79.2231 10.4213C78.3408 10.4213 77.6358 10.6741 77.106 11.1818C76.5763 11.6874 76.3114 12.3657 76.3114 13.2124C76.3114 14.0672 76.5704 14.7575 77.0866 15.2792C77.6046 15.8029 78.2824 16.0638 79.1257 16.0638C79.747 16.0658 80.6293 15.843 81.7706 15.3996Z' fill='%2315A959'/%3e%3cpath d='M90.1992 8.88431V11.0454C89.0715 10.3351 88.0276 9.9799 87.0674 9.9799C86.3585 9.9799 86.004 10.2287 86.004 10.7283C86.004 10.8588 86.078 10.9872 86.228 11.1116C86.378 11.238 86.9486 11.5049 87.9439 11.9122C88.9372 12.3196 89.6402 12.7911 90.0512 13.3248C90.4621 13.8586 90.6666 14.4425 90.6666 15.0786C90.6666 16.0839 90.3355 16.8584 89.6714 17.4062C89.0092 17.954 88.0646 18.2269 86.8376 18.2269C85.5775 18.2269 84.4576 17.9921 83.478 17.5206V15.3796C84.6835 15.9254 85.6944 16.1983 86.5104 16.1983C87.4647 16.1983 87.9419 15.9595 87.9419 15.4839C87.9419 15.2993 87.8523 15.1267 87.677 14.9622C87.4998 14.7997 86.9097 14.5147 85.9027 14.1094C84.8958 13.7041 84.2083 13.2586 83.8363 12.773C83.4643 12.2875 83.2793 11.7477 83.2793 11.1517C83.2793 10.2709 83.6357 9.5525 84.3485 8.99869C85.0614 8.44487 86.0001 8.16797 87.1668 8.16797C88.2866 8.16797 89.2975 8.40675 90.1992 8.88431Z' fill='%2315A959'/%3e%3cpath d='M92.334 5.22832C92.334 4.76481 92.4937 4.36751 92.8111 4.04044C93.1286 3.71337 93.5104 3.54883 93.9544 3.54883C94.4043 3.54883 94.7899 3.71337 95.1074 4.04044C95.4249 4.36751 95.5846 4.76481 95.5846 5.22832C95.5846 5.68582 95.4249 6.08112 95.1074 6.4122C94.7899 6.74328 94.4043 6.90983 93.9544 6.90983C93.5104 6.90983 93.1286 6.74529 92.8111 6.4122C92.4937 6.07911 92.334 5.68582 92.334 5.22832ZM95.4463 18.0423H92.4937V8.37261H95.4463V18.0423Z' fill='%2315A959'/%3e%3cpath d='M97.7051 16.404C97.7051 15.9064 97.8784 15.477 98.227 15.1178C98.5757 14.7587 98.9905 14.5801 99.4755 14.5801C99.9663 14.5801 100.385 14.7587 100.734 15.1178C101.082 15.477 101.256 15.9044 101.256 16.404C101.256 16.9097 101.082 17.3391 100.734 17.6943C100.385 18.0494 99.9663 18.226 99.4755 18.226C98.9925 18.226 98.5757 18.0474 98.227 17.6943C97.8804 17.3391 97.7051 16.9097 97.7051 16.404Z' fill='%2315A959'/%3e%3cpath d='M106.626 18.2273L102.287 8.37305H105.452L107.441 13.6985L109.466 8.37305H112.596L108.276 18.2273H106.626Z' fill='%2315A959'/%3e%3cpath d='M116.802 8.37264V9.74513C117.671 8.69369 118.688 8.16797 119.854 8.16797C120.828 8.16797 121.642 8.48902 122.295 9.13112C122.947 9.77322 123.274 10.6922 123.274 11.8902V18.0423H120.322V12.145C120.322 10.8528 119.835 10.2066 118.861 10.2066C118.166 10.2066 117.478 10.7404 116.802 11.8039V18.0423H113.85V8.37264H116.802Z' fill='%2315A959'/%3e%3cpath d='M4.80109 12.2461C2.18738 12.2461 0.0683594 14.4292 0.0683594 17.1221V21.998H9.53577V17.1221C9.53382 14.4292 7.4148 12.2461 4.80109 12.2461Z' fill='%2315A959'/%3e%3cpath d='M11.7988 17.126C11.7988 19.8188 13.9178 21.9999 16.5296 21.9999H21.2604V12.25H16.5316C13.9178 12.25 11.7988 14.4331 11.7988 17.126Z' fill='%2315A959'/%3e%3cpath d='M11.8027 0V4.87395C11.8027 7.56676 13.9218 9.7479 16.5335 9.7479C19.1453 9.7479 21.2643 7.56476 21.2643 4.87395V0H11.8027Z' fill='%2315A959'/%3e%3cpath d='M4.74052 0.0078125H0V9.75772H4.74052C7.34839 9.75772 9.46351 7.57859 9.46351 4.8918V4.87374C9.46351 2.18694 7.34839 0.0078125 4.74052 0.0078125Z' fill='%2315A959'/%3e%3c/svg%3e";

var css_248z$4 = ".index-module_conversation__e1Lkr {\n  width: 214px;\n  border-right: 1px solid #D9D9D9;\n}\n.index-module_conversation__e1Lkr .index-module_header__BBlFD {\n  padding: 8px;\n  margin-bottom: 16px;\n}\n.index-module_conversation__e1Lkr .index-module_header__BBlFD .index-module_logo__3qXbm {\n  width: fit-content;\n}\n.index-module_conversation__e1Lkr .index-module_header__BBlFD .index-module_input-search__V3xTr {\n  height: 30px;\n  border-radius: 8px;\n  font-size: 12px;\n  outline: none;\n  padding: 8px;\n}\n.index-module_conversation__e1Lkr .index-module_header__BBlFD .index-module_input-search__V3xTr fieldset {\n  border: 1px solid #D9D9D9;\n}\n.index-module_conversation__e1Lkr .index-module_header__BBlFD .index-module_input-search__V3xTr [class~=MuiInputAdornment-root] {\n  margin-right: 4px;\n}\n.index-module_conversation__e1Lkr .index-module_conversation-list__w-xVe {\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 538px;\n  padding-bottom: 20px;\n}";
var style$3 = {"conversation":"index-module_conversation__e1Lkr","header":"index-module_header__BBlFD","logo":"index-module_logo__3qXbm","input-search":"index-module_input-search__V3xTr","conversation-list":"index-module_conversation-list__w-xVe"};
styleInject(css_248z$4);

var Conversation = function Conversation() {
  var _useContext = React.useContext(ChatContext),
      conversationListLoading = _useContext.loading.conversationList,
      text = _useContext.conversationFilter.text,
      listConversation = _useContext.listConversation,
      pagination = _useContext.conversationPagination,
      listMessage = _useContext.listMessage,
      searchConversation = _useContext.searchConversation;

  var _useState = React.useState(text || null),
      _useState2 = _slicedToArray(_useState, 2),
      search = _useState2[0],
      setSearch = _useState2[1];

  var listRef = React.useRef(null);
  var debouncedSearchTerm = useDebounce(search);

  var fetchMoreConversation = function fetchMoreConversation() {
    if (!pagination.isOver) {
      var _listConversation, _listConversation$las;

      searchConversation(search, listConversation === null || listConversation === void 0 ? void 0 : (_listConversation = listConversation[listConversation.length - 1]) === null || _listConversation === void 0 ? void 0 : (_listConversation$las = _listConversation.lastMessage) === null || _listConversation$las === void 0 ? void 0 : _listConversation$las.messageID).then(function () {
        return setIsFetching(false);
      });
    } else {
      setIsFetching(false);
    }
  };

  var _useInfiniteScroll = useInfiniteScroll(fetchMoreConversation, "bottom"),
      isFetching = _useInfiniteScroll.isFetching,
      setIsFetching = _useInfiniteScroll.setIsFetching,
      setElement = _useInfiniteScroll.setElement;

  var onChangeSearch = function onChangeSearch(data) {
    setSearch(data.target.value);
  };

  React.useEffect(function () {
    if (debouncedSearchTerm !== null) {
      searchConversation(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  React.useEffect(function () {
    setElement(listRef.current);
  }, [setElement]);
  React.useEffect(function () {
    if (listMessage !== null && listMessage !== void 0 && listMessage.length && listMessage[listMessage.length - 1].status === 'RAW') {
      listRef.current.scrollTo(0, 0);
    }
  }, [listMessage === null || listMessage === void 0 ? void 0 : listMessage.length]);
  return /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
    className: style$3["conversation"],
    children: [/*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
      spacing: 2,
      className: style$3["header"],
      children: [/*#__PURE__*/jsxRuntime.jsx("img", {
        src: img$1,
        alt: "thuocsi.vn",
        className: style$3["logo"]
      }), /*#__PURE__*/jsxRuntime.jsx(material.TextField, {
        variant: "outlined",
        placeholder: "T\xECm nh\xE0 b\xE1n h\xE0ng",
        autoComplete: "off",
        InputProps: {
          size: "small",
          className: style$3["input-search"],
          startAdornment: /*#__PURE__*/jsxRuntime.jsx(material.InputAdornment, {
            position: "start",
            children: /*#__PURE__*/jsxRuntime.jsx(SvgSearch, {})
          }),
          endAdornment: search ? /*#__PURE__*/jsxRuntime.jsx(material.InputAdornment, {
            position: "end",
            children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
              sx: {
                padding: "6px"
              },
              onClick: function onClick() {
                return setSearch('');
              },
              children: /*#__PURE__*/jsxRuntime.jsx(ClearIcon__default["default"], {
                sx: {
                  width: "14px",
                  height: "14px"
                }
              })
            })
          }) : null
        },
        value: search || '',
        onChange: onChangeSearch
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(material.Box, {
      className: style$3["conversation-list"],
      ref: listRef,
      children: conversationListLoading ? /*#__PURE__*/jsxRuntime.jsx(material.Box, {
        sx: {
          display: "flex",
          justifyContent: 'center',
          marginTop: "1rem"
        },
        children: /*#__PURE__*/jsxRuntime.jsx(material.CircularProgress, {
          size: 30,
          color: "success"
        })
      }) : /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: (listConversation === null || listConversation === void 0 ? void 0 : listConversation.length) > 0 ? /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [/*#__PURE__*/jsxRuntime.jsx(ListConversation, {
            conversations: listConversation
          }), !pagination.isOver && /*#__PURE__*/jsxRuntime.jsx(material.Box, {
            sx: {
              display: "flex",
              justifyContent: "center"
            },
            children: /*#__PURE__*/jsxRuntime.jsx(material.CircularProgress, {
              size: 30,
              color: "success",
              sx: {
                margin: "10px auto",
                visibility: isFetching ? "visible" : 'hidden'
              }
            })
          })]
        }) : /*#__PURE__*/jsxRuntime.jsx(material.Box, {
          sx: {
            // fontWeight: "bold",
            padding: "0 8px",
            color: "rgba(0, 0, 0, 0.87)",
            textAlign: "center"
          },
          children: "Kh\xF4ng t\xECm th\u1EA5y h\u1ED9i tho\u1EA1i"
        })
      })
    })]
  });
};

var css_248z$3 = ".ChatPopup-module_chat-popup__5f7QG {\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n  overflow: hidden;\n  background-color: white;\n  width: 600px;\n  height: 640px;\n  max-height: 98vh;\n  z-index: 1300;\n  border-radius: 10px;\n  border: 2px solid #00b46e;\n  animation: unset;\n  display: flex;\n  flex-direction: row;\n}\n.ChatPopup-module_chat-popup__5f7QG.ChatPopup-module_has-conversation__XInWy {\n  width: 814px;\n}\n.ChatPopup-module_chat-popup__5f7QG .ChatPopup-module_tabs__oLpen {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n  flex-grow: 1;\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);\n}\n.ChatPopup-module_chat-popup__5f7QG .ChatPopup-module_tab-header__l5UKd {\n  box-shadow: 0px 6px 8px -4px #888;\n  display: flex;\n  align-items: center;\n  position: relative;\n  z-index: 1;\n}\n.ChatPopup-module_chat-popup__5f7QG .ChatPopup-module_tab-content__G2WGq {\n  background-color: #f5f5f5;\n  padding-top: 10px;\n  flex: 1;\n}";
var style$2 = {"chat-popup":"ChatPopup-module_chat-popup__5f7QG","has-conversation":"ChatPopup-module_has-conversation__XInWy","tabs":"ChatPopup-module_tabs__oLpen","tab-header":"ChatPopup-module_tab-header__l5UKd","tab-content":"ChatPopup-module_tab-content__G2WGq"};
styleInject(css_248z$3);

var ChatPopup = function ChatPopup(props) {
  var handleCloseChatPopup = props.handleCloseChatPopup;

  var _useContext = React.useContext(ChatContext),
      isCustomer = _useContext.isCustomer,
      currentConversation = _useContext.currentConversation,
      getReplyMessage = _useContext.getReplyMessage,
      setFoundMessage = _useContext.setFoundMessage;

  var chatPopupRef = React.useRef(null);

  var _useState = React.useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      activeTab = _useState2[0],
      setActiveTab = _useState2[1];

  var prefixId = "chat-tab";

  var CloseButton = function CloseButton() {
    return /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
      title: "\u0110\xF3ng",
      children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
        onClick: handleCloseChatPopup,
        sx: {
          position: 'absolute',
          top: "10px",
          right: "10px"
        },
        children: /*#__PURE__*/jsxRuntime.jsx(ClearIcon__default["default"], {
          sx: {
            color: "#AAA"
          }
        })
      })
    });
  };

  var handleChangeChatTab = function handleChangeChatTab(e, newValue) {
    setActiveTab(newValue);
  };

  var handleViewMessage = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(messageID) {
      var foundMessage;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getReplyMessage(messageID);

            case 2:
              foundMessage = _context.sent;

              if (foundMessage) {
                setFoundMessage(foundMessage);
                handleChangeChatTab(null, 0); // 0 is index of message tab
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleViewMessage(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/jsxRuntime.jsx(ChatOverlay, {
    childrenRef: chatPopupRef,
    handleOutSideClick: handleCloseChatPopup,
    children: /*#__PURE__*/jsxRuntime.jsxs(material.Box, {
      className: "".concat(style$2["chat-popup"], " ").concat(isCustomer ? style$2["has-conversation"] : ''),
      ref: chatPopupRef,
      children: [isCustomer && /*#__PURE__*/jsxRuntime.jsx(Conversation, {}), /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
        className: style$2["tabs"],
        children: [/*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
          className: style$2["tab-header"],
          children: [currentConversation ? /*#__PURE__*/jsxRuntime.jsx(ChatTabHeader, {
            tab: activeTab,
            handleTabChange: handleChangeChatTab,
            conversation: currentConversation
          }) : null, /*#__PURE__*/jsxRuntime.jsx(material.Box, {
            sx: {
              position: 'absolute',
              zIndex: 1,
              top: 0,
              right: 0
            },
            children: /*#__PURE__*/jsxRuntime.jsx(CloseButton, {})
          })]
        }), /*#__PURE__*/jsxRuntime.jsx(material.Stack, {
          className: style$2["tab-content"],
          children: /*#__PURE__*/jsxRuntime.jsxs(material.Box, {
            sx: {
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              maxWidth: '100%'
            },
            children: [/*#__PURE__*/jsxRuntime.jsx(TabPanel, {
              value: activeTab,
              index: 0,
              prefixId: prefixId,
              sx: {
                flex: '1 1 auto'
              },
              children: /*#__PURE__*/jsxRuntime.jsx(MessageWrapper, {
                currentConversation: currentConversation
              })
            }), /*#__PURE__*/jsxRuntime.jsx(TabPanel, {
              value: activeTab,
              index: 1,
              prefixId: prefixId,
              sx: {
                flex: '1 1 auto'
              },
              children: /*#__PURE__*/jsxRuntime.jsx(FileMedia, {
                handleViewMessage: handleViewMessage
              })
            }), /*#__PURE__*/jsxRuntime.jsx(TabPanel, {
              value: activeTab,
              index: 2,
              prefixId: prefixId,
              sx: {
                flex: '1 1 auto'
              },
              children: /*#__PURE__*/jsxRuntime.jsx(Tags, {
                handleViewMessage: handleViewMessage
              })
            })]
          })
        })]
      })]
    })
  });
};

function getCustomerInfo(_x, _x2) {
  return _getCustomerInfo.apply(this, arguments);
}

function _getCustomerInfo() {
  _getCustomerInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(ctx, data) {
    var client;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client = getCustomerClient(ctx, data);
            _context.next = 3;
            return client.getCustomerInfo();

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getCustomerInfo.apply(this, arguments);
}

function getAccountInfo(_x3, _x4) {
  return _getAccountInfo.apply(this, arguments);
}

function _getAccountInfo() {
  _getAccountInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(ctx, data) {
    var client;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            client = getCustomerClient(ctx, data);
            _context2.next = 3;
            return client.getAccountInfo();

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getAccountInfo.apply(this, arguments);
}

var css_248z$2 = ".WidgetChat-module_widget-chat__1zilV {\n  position: fixed !important;\n  right: 10px;\n  z-index: 3;\n}\n.WidgetChat-module_widget-chat__1zilV img {\n  width: auto;\n  cursor: pointer;\n}";
var style$1 = {"widget-chat":"WidgetChat-module_widget-chat__1zilV"};
styleInject(css_248z$2);

var WidgetChat = function WidgetChat(_ref) {
  var onClick = _ref.onClick,
      widgetInfo = _ref.widgetInfo;

  var _ref2 = React.useContext(ChatContext) || {},
      totalUnreadMessage = _ref2.totalUnreadMessage; // const totalUnreadMessage = useMemo(() => {
  //     if(user && listConversation?.length) {
  //         return listConversation.reduce((unreadMessage, conversation) => {
  //             const member = conversation.members.find(member => member.userID === user.accountID && user.type === member.accountType) || {};
  //             const seenMessageOrder = member.seenMessageOrder || 0;
  //             const totalMessage = conversation.totalMessage || 0;
  //             const totalUnreadBuzzMessage = conversation.totalUnreadBuzzMessage || 0;
  //             return (totalMessage - totalUnreadBuzzMessage - seenMessageOrder) + unreadMessage;
  //         }, 0);
  //     }
  //     return 0;
  // }, [user, listConversation])


  return /*#__PURE__*/jsxRuntime.jsx(material.Badge, {
    badgeContent: Math.max(totalUnreadMessage || 0, 0),
    color: "error",
    className: style$1["widget-chat"],
    sx: {
      bottom: widgetInfo.type === 2 ? '20px' : 0
    },
    children: /*#__PURE__*/jsxRuntime.jsx("img", {
      style: {
        maxHeight: widgetInfo.type === 2 ? '60px' : '45px'
      },
      src: getImageProxy(widgetInfo === null || widgetInfo === void 0 ? void 0 : widgetInfo.url),
      alt: "thuocsi.vn",
      onClick: onClick
    })
  });
};

var img = "data:image/svg+xml,%3csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3crect width='40' height='40' fill='url(%23pattern0)'/%3e%3cdefs%3e%3cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3e%3cuse xlink:href='%23image0_1409_21881' transform='scale(0.00195312)'/%3e%3c/pattern%3e%3cimage id='image0_1409_21881' width='512' height='512' xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAgAAAAIAEAQAAAAO4cAyAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfmCAIFOxS2EyjbAABJjElEQVR42u3deZSV1Zku8P2doibmGQQEBFGEIFHThiAah9JoaxkVC6dYptMJSSdtKibpNt2dNqx7k1xMp9O3ekhC30wWRhkSEy3TMatCTGIRRNRWmkkGAZnnoQqogqr3uX9sikMxnqpvn/1%2bw/Nby7X8i9rvu/f3Pe85dep8xhAREVEsQYqKgIceAubPB959F2htBZqbgfXrIfPmAQ8%2bCCku1l4nEREROQApLob89V8DW7bgvDZuhNx7r/aaiYiIqJPsK/7PfAZ4773zB/%2bp/vVfgUxGuwYiIiLKEaSwEPLJTwIbNnQ8%2bE9WXa1dCxEREZ0HpEsX4OMfh6xbFy74TzZ1qnZdREREdAZAQQHk4YeB1avdBX%2bbjRshRUXaNRIREdFxQCYDPPAAZOVK98F/svvv166ViIgo9YAggFRUAMuW5Tf428ydq10zERFRagFBANx1F/D2236C/zhZt067diIiolSClJVBlizxGvwnHDmiXT8REVGqQMrKgMWLdYI/S7sPREREqQCZMgX4/e%2b1g58DABERkQeQKVMgCxZoBz4HACIiIg%2bAyZMhdXXaQc8BgIiIyANg0iSgtlY74DkAEBEReQCZONE%2bgjcetPtFREQUa5AJE2zwi2iHOgcAIiKiPIO8731xDH4OAERERJ0AjBsH1NQAra3aIc4BgIiIKM%2bAsWNt8Le0aIc3BwAiIqI8A0aOBGbNAo4d0w5tDgBERER5BhkxIonB3ybQbjAREVGUQIYPN8GXvmTMpz9tTHGx9nryhQMAERGRMQZy4YUm%2bPKXjZk%2b3ZiSEu315BsHACIiSjXIwIEm%2bOIXjamqSkPwt%2bEAQEREqQQZMMC%2b1f/5zxtTWqq9Ht84ABARUapA%2bve3b/U/%2bqgxXbtqr0cLBwAiIkoFoF8/G/qPPWZMz57a69HGAYCIiBIN0qOHCT77WWP%2b7u%2bM6dVLez1RwQGAiIgSCdK9uwk%2b9zljvvIVY3r31l5P1HAAICKiRMkG/%2bOPG9Onj/Z6oooDABERJQLQrZsxn/ykfat/0CDt9UQdBwAiIoo1oGtXYz71KftW/%2bDB2uuJCw4AREQUS5CiIhN8/OPGfO1rxgwZor2euOEAQEREsZIN/ieeMGboUO31xFUX7QUQERHlAlJYaMwDD9hX/KNGaa8n7vgOABERRVo2%2bJ94wgSjR2uvJyk4ABARUSQBmYzB1Kkm%2bMY3jBkzRns9ScMBgIiIIgUoKDB44AETPPFEfIIfMCaIVaZmtBdARERkjH3FD6moMFi2zASzZ8cj/BcuNOZXv4pb%2bBvDAYCIiJQBQQApLzd44w0TzJtngrFjtdd0fn/6k8HNNxvz3HPG3H679mqIiIhiBVJWBrzxBuJCFi2ClJcbYwzwxS9qLycM7b0nIqIUgpSXxyr48dprwG23nVg/vvQlrz9eXn7Z9T%2bpfQaIiChF7Cv%2bxYu9hmcoS5dCKiqA7O/4gcce87uGV16BdO/u%2bl/VPgtERJQCkClTgN//3m9whrFs2anBb4wxwBe%2b4HcdNvztz3ZL%2b0wQEVGCQaZMgSxY4Dc0w1i%2bHFJZCRQUnFaLYvjbn%2b%2bW9tkgIqIEAiZPhtTV%2bQ3MEGTlyrMFv63Hd/jX10N69Gi/Bre0zwgRESUIMGkSUFvrNyzDWL8emD4d0qXL2WvSD3%2b7Dre0zwoRESUAZOJEyLx5foMyjA0bzhf8xhgDVFUBIv7Wdebwt2txS/vMEBFRjEEmTLDB7zMkw9i4EaiqghQXn7%2b2T386KuFvDAcAIiKKAGD8%2bHgF/6ZN9tV8SUlO9XkP/4ULzxX%2btuduaZ8hIiKKEWDcOKCmBmhp8ReOYezYATz%2beK7Bb2ucPj1q4W/X5Zb2WSIiohgAxo6NV/Dv3GmDv7S0Y3VGM/zt2tzSPlNERBRhwMiRwKxZwLFj/kIxBNm1ywZ/164drlU%2b9amohr/dC7e0zxYREUUQZMSIWAU/du8GZsyA9OzZuXp9h/%2bf/tTRtbpegfYZIyKiCIEMHw5UVwNNTf7CMIyDB4GZMyG9enW%2b5uiHvzEcAIiIKA8gF15og//IEX9BGEZDAzBzJtC7d7i64xH%2bxnAAICIihyADB9ogjVvw9%2bkTvvZPfhJobfW39s6HvzEcAIiIyAHIgAE2SA8f9heAIUhjI1BdDRk0yE39vsP/9dfDDi2uV6R9BomIyCNI//42%2bA8d8hd%2bYRw6ZH81MXiwux7EL/yN4QBARESdAPTrB8yYARw44C/4wmhutn%2bFMGSI2z785V/GMfzt2t3SOYlEROQFpEcP%2b3fx%2b/f7C70w2oJ/6FDnvfAe/m%2b84Sr87frd8nsSiYjIC0j37jb49%2b3zF3hhHD1qv2lw1Ki89EMl/Pv2dVuDW35OIhEReZEN/r17/YVdGG3BP3p03nqCT3wi7uFv63ArvyeRiIi8ALp1s0%2b7277dX9CF0doKmTcPMmZMfvuSjPC3tbiVz74TEVGeAV272uDfts1fyIXRFvyXXJL/3ngOf3nzzXyFv63HrXz3n4iI8gBSVGSfXLdli7eAC%2bV48GPsWC/9SVj425rc8rEPRETkSDb4N2/2Fm7hklGA2lrgiiu89Qh/8RdJC39bl1u%2b9oOIiEKAFBZCKish69Z5C7bQwVhXB1x5pdc%2bqYR/v35%2banPL574QEVEHZYN/7VpvoRY6FOvqIB/4gPde4eMf9xv%2b//3fvsLf1ueW7/0hIqIcAJkMpKICWL3aW6CFDsS6OsjVV%2bv0K9nhb2t0S2OfiIjoLLLB/8473sIstPp64Prr9Xp2//1AS4u3chXC39bpltZ%2bERHRSU4Ev6xc6S3IQquvB268Ubdv6Qh/W6tbmvtGRJR6QBBAysvth8niYuFCSFmZfu/SE/62Xre094%2bIKLUgZWX2m%2bNiQhYtgpSXa/fNGGOA%2b%2b4Djh3zV/xbb2mGv63ZLe09JCJKHUhZGWTJEn/hFdbbb0MqKrT7dqJ/GuEv/fvr1%2b2Wdj1ERKlhX/EvXuwvuMJautR%2bIDEItHt3oocpDX9bu1va9RARJR5kyhTIyy/7C62wli2LWvAbYwwwbVpaw9/W75Z2PUREiWWDf8ECf4EV1vLlkMpKoKBAu3en9dJ7%2bL/9dpTC3/bALe16iIgSB5g82X4NbkzIypVRDX7bT4a/7YNb2vUQESUGMGmSffBNXKxfD0yfDunSRbt3Z%2b%2bp7/BfsQIYPFi77jP3wi3teoiIYg8ycaJ91G1cbNgQ9eC3fa2oYPif1A/HtOshIootyIQJNvhF/IVUGBs3AlVVkOJi7d6dv7eew19Wroxy%2bBvDAYCISB0wfny8gn/TJqCqCigp0e5dTv2Ve%2b9l%2bJ%2bhL45p10NEFBvAuHFATY3Xr58NZccO4PHH4xL8xjD8z9kbx7TrISKKPGDs2HgF/86dNvhLS7V716E%2bq4T/BRdo151zfxzTroeIKLKAkSOBWbP8fhAtTKDt2gXMmAHp0UO7dx3uNcP//D1yTLseIqLIgYwYEavgx%2b7dNvh79tTuXaf6jalTgaNH/fVr1aq4hb/tk1va9RARRQZk%2bHCguhpoavIXRmEcPAjMnAnp1Uu7d53uOcO/A71yS7seIiJ1kGHDbPAfOeIviMJoaABmzgR699buXai%2bM/w72C%2b3tOshIlIDGTjQBmncgr9PH%2b3ehe497rnHf/gPGaJdd7ieuaVdDxGRd5ABA2yQHj7sL4BCkMZGoLoaMmiQdu%2bc9J/h38m%2buaVdDxGRN5D%2b/W3wHzrkL3zCaGqyH0aMx9%2bp57QH3sP/nXeSEP62d25p10NElHdAv37AjBnAgQP%2bgieM5mYb/MkIruw%2bMPzD9c8t7XqIiPIG0qOH/UKc/fv9hU4YbcE/dKh275zvBW6/3e9fVyQr/G0P3dKuh4jIOUj37jb49%2b3zFzhhHD1qv2lw1Cjt3uVlP/Dnf87wd9FHt7TrISJyJhv8e/f6C5sw2oJ/9Gjt3uVtT7yH/%2brVSQx/20u3tOshIgoN6NbNPu1u%2b3Z/QRNGaytk3jzImDHavcvvvmiEf/J%2bfZLtp1va9RARdRrQtasN/m3b/IVMGMeDH5deqt27/O/Nbbcx/F331C3teoiIOgxSVARMnw5s2eIvYMJobQVqayETJ2r3zsv%2bMPzz1Fe3tOshIspZNvg3b/YXLmGIALW1wBVXaPfO2x4x/PPYW7e06yEiOi9IYSGkshKybp2/YAlJ6uqAK6/U7p3XfcJtt/n9WuU1a9IS/ra/bmnXQ0R0VtngX7vWX6iEJHV1kA98QLt33vcKt97qN/zXrwdGjtSu22%2bP3dKuh4joNEAmA6mosG/vxoTU1UGuvlq7dzr7xfD302e3tOshIjohG/zvvOMvTMKqrweuv167d3p75jv8N2xIY/jbXrulXQ8RUTb4ZeVKf0ESVn09cOON2r3T3TeGv99%2bu6VdDxGlGBAEkPJyyJtv%2bguRsBYuhJSXa/dOG%2bQjH2H4e%2b65Y9r1EFFKQcrKgDfe8BcgIcmiRQx%2bSyf8L7pIu25trruqXQ8RpQykrAyyZIm/8Ajr7bchFRXafYsKyC23MPx1uO6sdj1ElBL2Ff/ixf6CI6ylS%2b0HEoNAu3dR4T/8N25k%2bGe57q52PUSUcJApUyAvv%2bwvNMJatozBfzqGvz7XHdauh4gSygb/ggX%2bAiOs5cshlZVAQYF276KG4R8NrrusXQ8RJQwwebL9GtyYkHXr7PMFGPxnArn5ZuDwYX8bwvA/G9ed1q6HiBICmDTJPvgmLtavB6ZPh3Tpot27qNIJ/1GjtOuOKtfd1q6HiGIOcvnl9hn3cbFhA4P//Bj%2b0eO649r1EFFMQSZMsMEv4i8kwgZMVRWkuFi7d1HH8I8m113XroeIYgYYPz5ewb9pE1BVBZSUaPcuDiDXXQdpbPS3P%2b%2b9x/DPjevOa9dDRDEBjBsH1NQALS3%2bwiGMHTuAxx9n8OdOJ/xHj9auOy5cd1%2b7HiKKOGDUKGDWrPgE/86dNvhLS7V7FyeQ664DGhr87RPDv6Nc74B2PUQUUcDIkTb4jx3zFwohyK5dwIwZkB49tHsXN5Brr2X4R5/rXdCuh4giBjJiRKyCH7t32%2bDv2VO7d3HE8I8P1zuhXQ8RRQRk%2bHCguhpoavIXBmEcPAjMnAnp1Uu7d3HlP/w3bWL4d57r3dCuh4iUQYYNs8Hv86tew2hoAGbOBHr31u5dnKmEv1x8sXbdceZ6R7TrISIlkIEDbZDGLfj79tXuXdxBpkxh%2bMeP613RroeIPIMMGGCD1OcXvYQgjY1AdTVk0CDt3iUBwz%2b%2bXO%2bMdj1E5Amkf39gxgz7u/M4aGqyH0YcPFi7d0nhP/y3bQMuu0y77qRwvTva9RBRngH9%2btngP3DA340/jOZmG/xDhmj3Lkls%2bPsc/hj%2brrneIe16iChPID162C/E2b/f300/jLbgHzpUu3dJA1xzjd/w376d4e%2be613SroeIHIN0726Df98%2bfzf8MI4etV8xzO%2bDzwed8B83TrvuJHK9U9r1EJEj2eDfu9ffzT6MtuDn34XnC8M/WVzvlnY9RBQS0K2bfdrd9u3%2bbvRhtLZC5s2DjBmj3bskY/gnj%2bsd066HiDoJUlwMTJ9uP2wVB8eDH5deqt27pAMmT2b4J4/rXdOuh4g6CFJUZIN/yxZ/N/gwWluB2lrIxInavUsDhn9yud457XqIKEfZ4N%2b82d/NPQwRoLYWuOIK7d6lBcM/2VzvnnY9RHQekMJCSGUlZN06fzf2kKSuDrjySu3epQnwoQ/5/a6HHTuA8eO1604T1zuoXQ8RnUU2%2bNeu9XdTD0nq6iAf%2bIB279KG4Z8OrndRux4iOgWQyUAqKoDVq/3d0EOSujrI1Vdr9y6NGP7p4XonteshouOywb9qlb%2bbeVj19cD112v3Lq1Uwl/e9z7tutPK9W5q10OUejb4y8uBt97ydyMPq74euPFG7d6lGXDVVX6/9Inhr831jmrXQ5RaQBBAysshb77p7yYe1sKFkPJy7d6lHcM/nVzvqnY9RKkEKSsD3njD3w08JFm0iMEfDf7Df%2bdOhn80uN5Z7XqIUgVSVgZZssTfzTust9%2bGVFRo940s4Mor/Yf/hAnadZPlene16yFKBfuKf/FifzfusJYutR9IDALt3pFlw3/PHn9ngOEfNa53WLseokSDTJkCefllfzftsJYtY/BHD8OfjOEAQBQLNvgXLPB3ww5r%2bXJIZSVQUKDdO2qP4U9tXO%2b0dj1EiWK/i7221t/NOiRZt84%2bX4DBH0XAFVcw/KmN693WrocoEYBJk2IV/Fi/Hpg%2bHdKli3bv6MwY/nQq1zuuXQ9RrEEuv9w%2b4z4uNmxg8Eef//Dfuxe46irtuuncXO%2b6dj1EsQSZMMEGv4i/m3QYGzcCVVWQ4mLt3tG52fDfvdvf2WD4x4XrndeuhyhWgPHj4xX8mzYBVVVASYl27%2bj8gPe/n%2bFPZ%2bN697XrIYoFYNw4oKYGaGnxd3MOY8cO4PHHGfzxoRL%2bfHRzrLg%2bAdr1EEUaMGoUMGtWfIJ/504b/KWl2r2j3PkP/337GP7x4/oUaNdDFEnAyJE2%2bI8d83dTDkF27QJmzID06KHdO%2boYhj/lyvVJ0K6HKFIgI0bEKvixe7cN/p49tXtHHcfwp45wfRq06yGKBMjw4UB1NdDU5O9mHMbBg8DMmZBevbR7R50DmTjRf/j/2Z9p102d5/pEaNdDpAoybJgN/iNH/N2Iw2hoAGbOBHr31u4ddR5k4kT7axtfGP5J4PpUaNdDpAIycKAN0rgFf9%2b%2b2r2jcBj%2b1FmuT4Z2PUReQQYMsEF6%2bLC/G3AI0tgIVFdDBg3S7h2Fx/CnMFyfDu16iLyA9O8PzJhhf3ceB01N9sOIgwdr947csF8b7Tv8r75au25yx/UJ0a6HKK%2bAfv1s8B844O/GG0Zzsw3%2bIUO0e0fu%2bA///fsZ/snj%2bpRo10OUF5AePewX4uzf7%2b%2bmG0Zb8A8dqt07cgu47DJg2zZ/Z4nhn1SuT4p2PUROQbp3t8G/b5%2b/G24YR4/arxgeNUq7d%2bQew59ccn1atOshciIb/D4foRpGW/CPHq3dO8oPYOxY/%2bH/wQ9q10354/rEaNdDFArQrZt92t327f5utGG0tkLmzYOMGaPdO8ofhj/lg%2btTo10PUadAiouB6dP93mTDOB78uPRS7d5RfjH8KV9cnxzteog6BFJUZIN/yxZ/N9gwWluB2lrIxInavaP8s%2bG/dau/88XwTxPXp0e7HqKcZIN/82Z/N9cwRIDaWuCKK7R7R374D/8DB4BJk7TrJn9cnyDteojOCVJYCKmshKxb5%2b/GGpLU1QFXXqndO/IHuPRShj/lm%2btTpF0P0Rllg3/tWn831ZCkro6PWk0fhj/54vokaddD1A6QyUAqKoDVq/3dUEOSujr%2b7XU6eQ9/aWyEXHeddt2kw/Vx0q6HyBhzcvCvWuXtZhpafT1w/fXavSMdDH/yzfWR0q6HUs4Gf3k58NZb3m6kodXXAzfeqN070mPD3%2bNfokhjI/DhD2vXTbpcHyvteiilgCCAlJdD3nzT2000tIULIeXl2r0jXZBLLmH4kwbXR0u7HkohSFkZ8MYb3m6goW/AixYx%2bMkYhj/pcn28tOuhFIGUlUGWLPF28wzt7bchFRXafaNo0Al/fsaEslwfMe16KAXsK/7Fi73dOENbutR%2bIDEItHtH0cDwpyhwfcy066EEg0yZAnn5ZW83zdCWLWPw06kgY8Yw/CkKXB817XoogWzwL1jg7YYZ2vLlkMpKoKBAu3cULTb8fX799KFDDH86G9enTbseShBg8mT7/fcxIevW2ecLMPjpdDrhf8MN2nVTdLk%2bcdr1UAIAkybFKvixfj0wfTqkSxft3lE0MfwpilyfOu16KMYgl19un3Ev4u9GGcaGDQx%2bOh%2bGP0WV65OnXQ/FEGTChHgF/8aNQFUVpLhYu3cUbZCLL2b4U1S5Pn3a9VCMAOPHxyv4N20CqqqAkhLt3lH02fDftMnf%2bTx0iF8pTR3h%2bgRq10MxAIwbB9TUAC0t/m6OYezYATz%2bOIOfcgWMHGk/G%2bILw586zvUp1K6HIgwYNQqYNSs%2bwb9zpw3%2b0lLt3lF8QEaMYPhTHLg%2bidr1UATZV0OzZgHHjvm7KYYgu3YBM2ZAevTQ7h3FC8Of4sT1adSuhyLE3gxjFPzYvdsGf8%2be2r2j%2bNEJ/5tu0q6b4sv1idSuhyIAMnw4UF0NNDX5uxmGcfAgMHMmpFcv7d5RPPkP/8OHGf4UlutTqV0PKYIMG2aD/8gRfzfCMBoagJkzgd69tXtH8WXD/913/Z3bw4chZWXadVP8uT6Z2vWQAsjAgTZI4xb8fftq947izb7bxfCneHJ9OrXrIY8gAwbYID182N8NMARpbASqqyGDBmn3juKP4U9x5/qEatdDHkD69wdmzLC/O4%2bDpib7YcTBg7V7R8ngP/ybmoDbb9eum5LF9SnVrofyCOjb1wb/gQP%2bbnxhNDfb4B8yRLt3lBwMf0oK1ydVux7KA0iPHvYLcfbt83fTC6Mt%2bIcO1e4dJQtk%2bHD72GdfGP6UP65Pq3Y95BCke/d4Bf/Ro/YrhkeN0u4dJQ/Dn5LG9YnVroccyAb/nj3%2bbnZhtAX/6NHavaNk8h/%2bzc2QO%2b7QrpuSzfWp1a6HQgC6dbNPu9u%2b3d%2bNLozWVsi8eZAxY7R7R8kFufBChj8lkeuTq10PdQKkuBiYPh3YutXfTS6M48GPSy/V7h0lmw3/tWv9ne3mZkh5uXbdlA6uT692PdQBkKIiG/xbtvi7wYXR2grU1kImTtTuHSUfw5%2bSzvUJ1q6HcpAN/s2b/d3cwhABamuBK67Q7h2lA8Of0sD1Kdauh84BUlgIqaz0%2b/vMkKSuDrjySu3eUXow/CktXJ9k7XroDE4EP9as8XdTC0nq6iAf%2bIB27yhdIMOGeQ9/3Hmndt2UTq5Ps3Y9dBIgk4FUVACrV/u7oYUkdXWQq6/W7h2lj32apc8hmeFPulyfaO16yJwc/KtW%2bbuZhVVfD1x/vXbvKJ0Y/pRGrk%2b1dj2pZoO/vBx46y1/N7Kw6uuBG2/U7h2lF8Of0sr1ydauJ5WAIICUl0PefNPfTSyshQv5wSfSBgweDKxY4e/cNzcDH/2odt1ExnAAiD1IWRnw%2buv%2bbmAhyaJFDH6KAoY/pZ3rE65dT2pAysogS5b4u3mF9fbb9nMJQaDdOyKGPxEHgNixr/gXL/Z34wpr6VIGP0UJZNAgv%2bF/9Chw113adROdyvVJ164nsSBTpkBeftnfTSusZcsY/BQ1NvyXL/d3HTD8Kbpcn3btehLHBv%2bCBf5uWGEtX26/dKigQLt3RCdj%2bBO15/rEa9eTGMDkyfb772NC1q2zzxdg8FP0MPyJTuf61GvXE3vApEmxCn6sXw9Mnw7p0kW7d0RnohP%2bd9%2btXTfR%2bbg%2b%2bdr1xBbk8svtM%2b5F/N2owtiwgcFPUec//FtagPvv166bKBeuT792PbEDmTAhXsG/cSNQVQUpLtbuHdG5QAYOBJYt83dtMPwpXlxfAdr1xAYwfny8gn/TJqCqCigp0e4d0fkw/InOz/VVoF1P5AHjxgE1NfaGEQc7dgCPP87gp7jQCf8HHtCum6ijXF8J2vVEFnDRRcCsWfEJ/p07bfCXlmr3jihXDH%2bi3Lm%2bGrTriRxg5Egb/MeO%2bbsphSC7dgEzZkB69NDuHVFH2PD/n//xd7G0tAAPPqhdN1Fnub4itOuJDMiIEbEKfuzebYO/Z0/t3hF1FMOfqONcXxXa9aiDDB8OVFcDTU3%2bbkZhHDwIzJwJ6dVLu3dEncHwJ%2boc11eGdj16jZRhw2zwHzni70YURkMDMHMm0Lu3du%2bIOgsyYID/8H/oIe26iVxwfXVo1%2bO/gTJwoA3Sw4f93YTCaAv%2bvn21e0cUhg3/pUv9XTsMf0oW11eIdj3%2bGicDBsQq%2bKWxEaiuhgwapN07orAY/kThub5KtOvJf8Okf39gxgz7u/M4aGqyH0a84ALt3hG5oBL%2b8rGPaddN5JrrK0W7njw2qm9fG/wHDvi78YTR3GyDf8gQ7d4RucLwJ3LH9dWiXY/7BkmPHvYLcfbt83fTCaMt%2bIcO1e4dkUsMfyK3XF8x2vW4a4x0726Df%2b9efzecMI4etV8xPGqUdu%2bIXAP69AFef93f9cTwp%2bRzfdVo1xO%2bISeCf88efzebMI4Hv1x8sXbviPJBJ/wffli7bqJ8c33laNcTohHdutmn3W3f7u9GE0ZrK2TePMiYMdq9I8oXhj9R/ri%2berTr6XgDpLgYmD4d2LrV300mjOPBj0sv1e4dUT7phH9lpXbdRL64voK068m9cCkqssG/ZYu/G0wYra1AbS1k4kTt3hHlG9C7N2TJEn/XF8Of0sf1VaRdz/kLPhH8mzf7u7mEIQLU1gJXXKHdOyIf/Id/ayvDn9LI9ZWkXc/ZC5XCQkhlJWTdOn83lpCkrg648krt3hH5ohL%2beOQR7bqJNLi%2bmrTrOb3AtuDHmjX%2bbiohSV0d5AMf0O4dkU8MfyK/XF9R2vWcVFgmA6moAFav9ndDCUnq6iBXX63dOyLfgN69gdde83exMfyJXF9V2vWcFPyrVvm7mYRVXw9cf71274g0%2bA9/EcinP61dN5E211eWYiGZDKS8HHjrLX83krDq64Ebb9Q%2bBERaGP5EelxfXQoFBAGkvBzy5pv%2bbiJhLVwIKS/X3nwiTSrhj898RrtuoqhwfYX5XbyUlfn9opCw959Fixj8RMZAevUCFi/2ePEx/IlO4foq87NoKSvz%2b8ohrLfftp9LCALtDSfSxvAnigbXV1p%2bFytlZX5vHGEtXcrgJ8rSCf%2b/%2bivtuomiyPXVlp9FypQpkJdf9nfTCGvZMgY/UXsMf6JocX3FOV7cNddAFizwd8MIa/ly%2b6VDBQXaG0sUJZBevSCvvurvWhQBPvtZ7bqJosz1VedoUZMn2%2b%2b/j4t337XPF2DwE52K4U8UTa6vvJCLmTQpXsG/fj0wfTqkSxftjSSKIoY/UXS5vvo6twi5/HL7jHsRfzeKMDZsYPATnZsN/0WL/F2XDH/yxz5npqICmD0bsnIlpLHR/rdyJVBTA7n3XkhhofY6z1mDYx1s4IQJ8Qr%2bjRuBqipIcbH2xhFFGaRnT//h/7nPaddN6QDcfXduD5hbvRq46y7t9Z69Drdy/KHjx8cr%2bDdtAqqqgJIS7Q0jijqGPyUVkMkATz7Z8TP65JNAJqO9/tPrces8P2zcOKCmBmhp8XdzCGPHDuDxx4HSUu2NIooDoFs34A9/8HeNMvzJH8i3vtX5s/rkk9rrP60ex87yQy69FHjmGfsIzjjYvh34whcY/ES5g/TsCfzpT/6uU/7On/yxb/uHFa1fB7i%2bItv/41JUZCemo0f93RTC2LkT8uUvA127am8MUZxAevQAFi70d60y/MkfSGFhbr/zP5/Vq6P0wUDXV%2bVJDevZE3jlFX83hDB27wa%2b8hVI9%2b7aG0IUNzb86%2bv9Xa9825/8gtx7r7vzO3Wqdj0n6nLseLO6dInHN/jt3Qv56lchPXpobwRRHKmEv/z1X2vXTekCPP20uzNcU6NdT7Yut47/o3/7t/5uCJ2xfz8wYwakVy/tDSCKK51X/o8%2bql03pQ/wzjvuzvGqVdr1ZOty6/gDP/bt83dT6IiGBmDmTKBvX%2b3GE8UZ0K0bvD6gSwTy%2bc9r103pZLPDXQ5p15Otyy0DPPqov5tCjqSxEZg5E9K/v3bDieIO0r078Mc/eryAGf6kCjh40N15PnBAu55sXW4Z4KWX/N0YzufIEci3vw0ZOFC70URJoBL%2bqKrSrpvSDVi1yt2ZTu6vADLGXH65dlFZJSUmuO02E3z2s8Do0dqrIYozoGtXE7zwgjHXXuvvp/7d3wVBdbV27ZR2r73m7t969VXtavIm2n/zv3y5/Wa/IUO0%2b0QUJ0DXrsDvfuf3en38ce26iYzhnwHmytjft0dda6v9utLPfQ4yaJD2JhBFmf1639//3u81%2bthj2nUTtbF/2r5yZfhz/c47UXqKrOur1gDLlvm9UYTV2mr/lKmqisMAUXs6r/y/8hXtuolOBdx1V7hzLQLcead2He1rcssAs2b5vVm41NKSHQb4wUFKN6BrV/9f6MXwp%2bjq3JMA2/yf/6O9/tPrcctAysr83jDypbkZePFFSGUlvzCI0saGv8%2b/8weAL31Ju26ic%2bnc44BF7PfPpORxwJAlS/zeOPKtqQn45S%2bBBx7g8wIo6VTe9pcvf1m7bqJcAR/9KLB69fkP9jvvRO1t//Z1uHX8H73qqmj/NUAYhw8DP/sZpKKCTw2kpNEJ/7/5G%2b26iToKUlho/zqgpsZ%2bQLChAWhosP//1FPA1KlR%2bsDfGWtw7KR/%2bKGH7FsfSXb4MFBbC6msBLp1095MojDs2/6//a3fa%2bjv/167bqK0cn01n/KPP/ggcOSI3xuKlgMHgNmzIeXlkKIi7Y0l6gidD/z97d9q102UZq6v6NN/gFx8MfD88/bP7dJi3z7gxz8Gbr0VUliovclE5wKUlvp/5c8v%2bSHS5vqqPvsPkosvBr72NWDFCr83Gm27d0P%2b3/%2bzfx1RUKC94UQns%2bFfV%2bf3muCf%2bhFFgesrO8cfOn48MGOGm29WipM9e%2bwHRsrLo/7hEEo%2bnfD/h3/QrpuILNdXdycWcHwYyOlPKhJEdu2yw0BZWRT/PpSSDVJcDLz4ot8z/9WvatdNRFmuL/GQi2l7Z2DtWq83JnWbNgHV1ZApU4Ag0D4UlGwMfyIyJmIDQPuFjR9vvz1p82avNyp1773HYYDyRSX88Y//qF03EZ3O9ZWehwVmMjYMq6uBrVv93ri0bdjQNgxoHxSKP4Y/EZ3M9dWe58WePAxs3%2b73Rqbt3Xdt3VdeqX1oKH4gRUVAba3fM8vwJ4oy11e8x4UXFGSHgR07/N7YtC1fbj84OXas9gGi6NMJ/yee0K6biM7N9VWvVETbMDBrFrB/v98bnbbjw4Bccon2YaLoYfgT0dm4vvK167G/55TycqCmxn49b5q0DQMXX6y9D6RPJ/y/9jXtuokoN66vfu16TimupCQ7DDQ0%2bL0Ramv7NcGoUdr7QP7Z8H/hBb9njuFPFCeu7wDa9Zyj0NLSE8OANDb6vTFqam0F6uuBqirgggu094Hyj%2bFPRLlwfRfQrifHort2tV/HO28e0NTk90ap6eRhYPBg7X0g93TCf%2bZM7bqJqONc3wm06%2blEA3r3hlRW2t%2bVNjf7vXFqamk5MQzIwIHa%2b0Dh2fB//nm/54jhTxRXru8G2vWEbEafPtlh4OhRvzdSTScPA/37a%2b8DdZxO%2bD/5pHbdRNR5ru8I2vU4bEzfvtlh4NgxvzdWTU1NQG0tpLIS0rOn9j7Q%2bTH8iagzXN8VtOvJU5MuuAB49FHglVfs79HT4vBhyM9/DkybBnTtqr0PdDqd3/n/7/%2btXTeRNvvV2g8%2bCMydax9gd/iwvWeuXQvMnQs88ACkuFh7neeswTHtevLfMBk2DHjsMcirrwIifm%2b8iqSxEZgzB7jnHqC0VHsfSOuV/9e/rl03kTb7omj9%2bvNfL%2bvXQyoqtNd79jrc0q7Hc/NGjoT8zd8Ar7/u9yas7eBB4Omn7V9SRHvCTSqd8P/GN7TrJtIEFBQA//IvHb505DvfAQoKtNd/ej1uadej10gZMcL%2beV19vd%2bbsrb9%2b%2b13K5SXQ4qKtPchDWz4/%2bIXXrdZ/umftOsm0tap8D9xDX3729rrP70et7TriQRg7FjgiSeAZcu83qTV7dkD/OAHkJtvjuK0mwQ2/H/5S6/bKt/8pnbdRNogFRXhL6Z77tGuo11NjmnXEznA%2bPH2%2b/lXrvR601a3Z0/2nYEuXbT3IQkghYX%2bX/lH71ULkW%2bQoiL74b6w3n03Sr82dX270K4n0oD3vx/yzW9C1q3zehNXt20b8G//Zp/YmMlo70McqYQ/v%2bSHyBhjDHD//e6uq2nTtOvJ1uWWdj2xceKdAaxZ4/OWrm/zZqC62g4DQaC9D3Fgw/%2b557xuE1/5E51g/wLKlZ/%2bVLuebF1uadcTS9lfE6TtnYH33uMwcG464f/P/6xdN1GUuH2htmqVdj3ZutzSrifWgEzGhmF1NbB1q897vr4NG9qGAe19iAr7J0fPPut1Gxj%2bRKdx%2bzj5hgbterJ1uaVdT2K0Hwa2bfOZAfrWr0/7MMDwJ4oO15eadj1JrytRgIKC7DCwY4efNIiK5cvtZyXGjtXeB6/7jWee8dpm%2bc53tOsmiirXl5t2PUmvK7HaDQOya5efdIiK48OAXHKJ9j7kdX8Z/kSR4vqS064n6XWlAqS4GFJeDtTUAAcO%2bEmLqGgbBi6%2bWHsfnO2nRvjjX/5Fu26iqHN91WnXk/S6UgcoKckOAwcP%2bgmPqGj7NcGoUdr70Pn9KygAfvpTv31j%2bBPlwvWVp11P0utKNaC09MQwII2NfsIkKl5/3T6TYcgQ7X3Ifb8Y/kRR5vrq064n6XXRce2GARw65CdcoqC11T6YqaoKGDxYex/Ovj8FBcDTT/vtDcOfqCNcX4Ha9SS9LjoDSK9ekMpKoLYWaG72EzZR0NJyYhiQgQO19%2bHEfqiE///9v/zSJaKOcX0VateT9LroPIA%2bfbLDwNGjfsInCk4eBgYM0Ou/Rvh///sMf6KOc30lateT9LqoA4C%2bfbPDwLFjfsIoCpqagNpaSGUlpGdPf/0uKABmz/ZbK8OfqLNcX43a9SS9LuokoF%2b/7DDQ0uInnKLgyJHsMNCjR/76qxH%2bs2Yx/Ik6z/UVqV1P0usiB4ChQ%2b2H6OrrAREvWRUJJw8D3bu76yfDnyiOXF%2bV2vUkvS5yDHLhhekcBg4fPjEMoGvXTvdPI/zlP/%2bT4U8UnutLU7uepNdFeQQZMSI7DKTJ/v32uxXKyyFFRTn3CwUF9s8wPWL4Eznj%2bvLUrifpdZEnwMiR6RwG9u3LDgOFhWfvD8OfKO5cX6La9SS9LlIAjBtnv5J3xQo/SRcVe/Zkh4EuXbL9KCgAnnrK61IY/kTOub5MtetJel2kDDJxIvCNb0DWrvUSfJGxbRvw7/8Oue4676/88d3vMvyJ3HN9pWrXk6%2b6ePOh0wDjxxtTUWHMQw8Zk5yn90UKfvADE3z600Egor0UoqRxHdpBEI1B3Xld2gVRtJ0YBvDwwyaI79P7IoXhT5RXHAByrEu7IIoP4KqrjKmsNObee42Jz9P7ouWHPzRm%2bnSGP1H%2bcADIsS7tgih%2bgEzGYPJkE1RUGDNtmjHRfXpftDD8iXzgAJBjXdoFUby1Hwbuv9%2bY6Dy9L1oY/kS%2bcADIsS7tgig5gIICgw99yA4DDzxgjN7T%2byIFP/qRCT71KYY/kR8cAHKsS7sgSiY7DNxwgwkqK4356EeN8ff0vkhh%2bBN5xwEgx7q0C6LkA0pKjLntNmOmTTMoLzdBt27aa/JnyRJj5swxmD8/yGzapL0aojTgAJBjXdoFUboAJSUGN99sf01w993GuHt6X/StWGFMTY0xs2cHwdat2qshSioOADnWpV0QpRdQWmpQVmaCigqDe%2b5JzzsDIsYsWmTM/PnGzJ0bBNu3a6%2bIKEk4AORYl3ZBRMYYA3TtanD77fYzA7fcYkzuT%2b%2bLt5OGAcyZE2R27NBeEVHccQDIsS7tgohOBfTubXDnnfbXBB/5iDFnf3pfsrS2GvPqq3YYeOaZILNrl/aKiOKIA0COdWkXRHQuQN%2b%2bBnfckd5hoKbGYO7cIHPggPaKiOKCA0COdWkXRJQroF8/%2b2uCigpjbr3VmOyjfJOtudmYujqD%2bfON%2bcUvgkxDg/aKiKKMA0COdWkXRNQZkP79TXDPPfbZBJMnGxONCzT/mpqM%2be1v7TDw3HNBprFRe0VEUcMBIMe6tAsiCgsybJgJpk61jzBO0zBw5IgxCxYYzJ9vgp//PAgOHdJeEVEUcADIsS7tgohcggwfboK7707fMHD4sMGvfmXM7NnG/OY3QeboUe0VEWnhAJBjXdoFEeULMHKk/RriigpjrrlGez3%2b7N9vTG2t/TUBhwFKHw4AOdalXRCRD8BFF9lHFz/yiDGXXaa9Hn/27TPmxRftMPDSS0Hm2DHtFRHlGweAHOvSLojIN8jEiSZ46y3tdfi3c6cxP/uZMfPmGfPKK3xAESUVB4Ac69IuiMg3SFGRCZqbtdeh24Tdu03w3HMGs2ebYOHCIHB7YyHSxAEgx7q0CyLyjQPAqTZvNua55%2bxfE3AYoPjjAJBjXdoFEfnGAeBc3nvPmF/%2bksMAxRkHgBzr0i6IyDcOALnauNGY5583mD8/yNTXa6%2bGKFccAHKsS7sgIt84AHTG%2bvX2w4M1NUGwYoX2aojOhQNAjnVpF0TkGweAsFasMGb%2bfGPmzAmCVau0V0N0Kg4AOdalXRCRb%2b4HgKNHDaZONcF99xlz553G9OypXaM3%2bO//NsG8ecbMnRsE69drL4fIGA4AOdelXRCRb%2b4HgObmICgpsf92cbExt9xin1h4113G9OihXa8/be8MzJ4dBOvWaa%2bG0osDQI51aRdE5Fs%2bB4B2PwclJQY332yHgbvvNqZ7d%2b3a/VmxwpiaGmOefjoItmzRXg2lCweAHOvSLojIN18DQLufidJSg7IyE1RUGNxzjwm6ddPugx8ixixaZN8ZmDcvCLZt014RJR8HgBzr0i6IyDeNAaDdz0fXrga3326CykpjbrnFmKIi7Z74cdIwgDlzgsyOHdoromTiAJBjXdoFEfmmPQC0Wwt69za48077a4KPfMSYwkLt/vjR2mrMq6/aYeDZZ4PMzp3aK6Lk4ACQY13aBRH5FqUBoN260KePQXl5eoeBmhqDuXODzIED2iuieOMAkGNd2gUR%2bRbVAaDdGtGvn/01QUWFMbfeakyXLr77pKO52Zi6Ovv44l/%2bMsgcPKi9IoofDgA51qVdEJFvcRgA2q%2b3f38T3HOPMZWVxkyebEw0bkb519RkzG9/a4eB554LMo2N2iuieOAAkGNd2gUR%2bRa3AaD92ocNM8HUqcZUVKRrGDhyxJgFC%2bxDin7%2b8yA4dEh7RRRdHAByrEu7ICLf4jwAtK9j%2bHAT3H13%2boaBw4eN%2bd3vDGpqjHnhhSDDr3Wm9jgA5FiXdkFEviVlAGhf04gRJrjrLjsMXHON5lr82r/fmNpa%2b2uC3/wmyBw9qr0i0scBIMe6tAsi8i2JA0C7%2bnDRRcZMm2Y/MzBunPZ6/Nm3z5gXX7TDwEsvBZljx7RXRDo4AORYl3ZBRL4lfQBoVyvGj7fvCtx/vzGXXqq9Hn/27jXmV7%2byw8Cvfx1kWlq0V0T%2bcADIsS7tgoh8S9MA0K7uE8PAgw8aM2aM9nr82bPHmP/6L4OaGhP87ndBIKK9IsovDgA51qVdEJFvaR0A2vWgbRjAxz5mgtGjtdfjz5Ytxvz85/avCRYuDAK3N1SKBg4AOdalXRCRbxwATukHxo835uGH7X9Dhmivx59Nm4z5xS84DCQPB4Ac69IuiMg3DgBnBmQyBpMn228frKgw5oILtNfkz8aNxjz/vMH8%2bUGmvl57NRQOB4Ac69IuiMg3DgDn134YuO8%2bYwYN0l6TP%2bvXG1Nba0xNTRC88Yb2aqjjOADkWJd2QUS%2bcQDoGKCgwOBDH7LDwP33GzNwoPaa/Fmxwpj5842ZMycIVq3SXg3lhgNAjnVpF0TkGweAzssOAw8/bN8Z6NVLe03%2bHB8G8MwzQWb1au3V0NlxAMixLu2CiHzjAOAGpLjYmFtuse8MfPSjxvTsqb0mf9qGgaefDjJr12qvhtrjAJBjXdoFEfnGAcAtSJcuJnj2WWPuvVd7LQrVw2DxYhPMnWvM/PlBsGWL9oqIA0DOdWkXROQbBwB3gIICY2pq7JcLpZ2IMYsW2c8MzJsXBNu2aa8orTgA5FiXdkFEvnEAcANSWGjMnDkmuOce7bVEz8nDwNy5QbB9u/aK0oQDQI51aRdE5BsHgPBsD%2bfONeauu7TXEn2trca8%2bqr9zMCzzwaZnTu1V5R0HAByrEu7ICLfOACEY/s3b5794B91zMnDwE9/GmR279ZeURJxAMixLu2CiHzjANB5tnfz5xtz553aa4m/5mZj6ursEwt/%2bcsgc/Cg9oqSggNAjnVpF0TkGweAzoEUF5vgZz8z5o47tNeSPE1Nxvz2t3YY%2bMUvgkxDg/aK4owDQI51aRdE5BsHgI4DSksNnn/eBDff7O%2bHPvecCerrDaZNM8EHP2hMNG7C%2bXf4sDEvvmjM3LnG/PrXQXDkiPaK4oYDABGdEaSoCE41NWnXlNd%2boWtXSF2d256dz/z59q8M2vbswguBqiqgvh4Q8bsWTYcPA7W1kMpKoGtX7bMQF653QbuefNUViamG9EEuucQEQ4far3bdudNgzZogs2uX9rryUyvfAcgV0LWrwQsvmOCmm/z91HnzDB56KMi0tJxxTTJihAnuuss%2bsfCaa7R75M%2bBA8a88IL9NcFvfhNkjh7VXlFUuQ5tvgNAiQMZNAjy7W8DGzeePhu2tkJefRX4y7%2bEdOmivVa3dfMdgJz6hK5dIQsWuH7VcW5z5nTkvAEjR9p3Bl5/3e86te3dC9TUQMrLT36nhCzX3dauJ%2bl1kWfA5z4HaWzM7ZisWgW8//3aa3ZWOweA8/cI3boBv/ud6xvOuT37bJhhExg/HpgxA7Jypd91a9uzJzsMJGtY7yzXHdauJ%2bl1kSdAQQHw/e93%2bKRIYyOkvFx7/U56wAHg3P1Bt27A73/v%2bmZzbs88Y79W2FUNx4cBvPOO3zq07d59Yhhw2M%2b4cd1V7XqSXhd5YMP/qac6f1wOHwauukq7jtB94ABwjt706gVZtMj1jeac5Ic/BDKZvNV0YhhYs8ZrXeo2bwaqqyFTpgDR%2bB22L647qV1P0uuiPLPhX1MT%2bsTIypVxf5uRA8DZ%2btKrl/3ch08/%2bEE%2bw/%2b0Gk/8mmDdOr91anvvvTQNA667p11P0uuiPHIW/id84hPaNYXqBweA03uC3r2BxYtd32DOSf7zP32Gf/t6MxkbhtXVwNatXutWt3Fj2zCgfe7yt79uadeT9LooT8K/7X8mf/qTdl2hesIBoH0/0Ls38Nprrm8u5zZrVlReibYfBrZt89sHbevXJ3EYcN0l7XqSXhflgftX/m1aWoB%2b/bTr63RfOABke4E%2bfSBLlrg/I%2bfyve9FJfxP70dBQXYY2LHDb1%2b0LV9uPytx2WXa%2bxB%2bH93SrifpdZFj%2bXnlfxL54Ae1a%2bx0bzgAHO/DgAHA22/n7Yyc8dx85ztRDf/T%2bnPyMCC7dnntk7q2YeDSS7X3oXN755Z2PUmvixzK3yv/k8X3aXAcAIyBDBwILF2a3zNyCvnnf9auu/P9Ki62f1pXUwMcOOC1b%2bqODwMyZoz2PuS8X45p15P0usiRvL/yP%2bHDH9autdM9SvkAYMP/f/4n/2fkJPJP/6Rdt7P%2boaQkOwwcPOi1j%2bra3hkYNUp7H869R25p15P0usgBP6/820T7BnDOPqV4AIAMGgQsW%2bbnjBwn3/qWdt156ydKS08MAzl/s2ZSvP66/RrmIUO09%2bH0fXFLu56k10Uh%2bXvlDwDvvqtdb6hepXQAsOG/fLmfM9Jm5kztur319%2bRhAIcO%2be2zptZW%2b5TGqipg8GDtfbB74ZZ2PUmvi0Lw%2b8ofAJ58UrvmUP1K4QAADB7M8PfYb%2bnVyz7Ct7YWaG7223dNJw0DMnCgWv8d0z5PSa%2bLOsnvK38AaGjQvLCd9CxlAwDkwgv9fw3uE09o1x0V9k8t24aBo0f97oOmlpbsMDBggN%2beu6V9hpJeF3WC/1f%2bAOTTn9auO3TfUjQAQIYPh6xd6/WM4B//UbvuqAL69s0OA8eO%2bd0XTS0tkLo6SGUlpGfP/PfZLe1zk/S6qINUwh/f%2b5523U56l5IBwIa/7%2b%2b8/4d/0K47LoB%2b/bLDQEuL333S1NQE1NbaYaBHj/z01i3ts5L0uqgD/L/tD4R9VnuUpGEAgIwYAbz7rt8z8vd/r113XAFDh9oP0dXXAyJ%2b903TkSPZYaB7d3f9dEv7fCS9LsoRw99BDxM%2bAAAjR/oNfxHgC1/Qrjsp7Gc20jgMHD58YhhAt26heuiY9plIel2UA4a/oz4meACAjBkDbNrk73yIQD7/ee26kwoyfHh2GEiTQ4cg8%2bZBysshRUUd7ptj2ucg6XXReTD8HfYyoQMA5JJLgM2b/Z0PEeDRR7XrTgv7zk4ah4F9%2b%2bwXLZWXQwoLc%2buVW9p7n/S66BwY/o77mcABALj0UmDLFn/nQwT43Oe0604rYNw4%2b5W8K1b42/Mo2Ls3l2HA9U/V3u%2bk10VnwfDPQ08TNgAAY8f6D//PflZ7H8kCxo%2b3w8CqVf7OQBTs3p0dBtrfr1z/JO09TnpddAYM/zz1NUEDgA3/rVv9nQ8R4K/%2bSnsP6cyyw4DvL35SJrt2AbNm2cc3B4Hrf157X7P7m8y66BQM/zz2NiEDAOTyy4GdO/2dj5YW4JFHtPePzs%2bG4KRJkO98x%2b%2bHQqNg40bX/6L2fmb3NZl10UkY/nnubwIGAMjEifZVjy8M/zgDrroKqK72%2b6ui5NDev%2bw%2bJrMuOo7h76HHMR8AgPe/33v4y8MPa%2b8bhQdkMvZt8upqYNs2f2co3rT3Lbt/yayLDMPfW59jPAAAV1xhP/zkS0sL5GMf094zcq/9MLBjh78zFT/ae5Xds2TWlXoMf4%2b9jukAAFx5JbBnj7/z0dICPPig9n5R/gEFBdlhwOfnSuJBe3%2by%2b5TMulKN4e%2b53zEcAOzvcH2G/9GjwD33aO8V%2bWeHgbIy%2b7CxAwf8nbno0t6T7N4ks67UYvgr9DxmAwAwebLfG3FzM3D33dr7RPqAkhJIebkdBg4e9HcGo0V7H7L7kcy6Uonhr9T3GA0A9m1ZnzfepiZIebn2HlH0AF27QioqgJ/9zD64J03q64FHHwUuuEB3D9zSPlOpxfBX7H1MBgD/4d/cDNx5p/b%2bUPQBpaXZdwYOHfJ3RrW1ttphoKoKGDzYf9/d0j5HqcTw1xWHAQBy7bVAQ4O/88FX/tQ52XcGamvtEJkWJw0DMmiQn167pX12Uofhry/qAwDkuuv8h/8dd2jvC8Uf0Ls3pLLSDgNHj/o7w9paWrLDwIAB%2beuvW9rnJVUY/tEQ5QEA%2bPCHIY2N/s7HoUOQsjLtPaHkAfr2zQ4Dx475O9PaWlogdXWQykpIz55ue%2bqW9hlJDYZ/dER1AIDccovfD1cdOgTcdJP2flDyAf36pXMYaGoCamvtMNCjR/g%2buqV9LlKB4R8tURwAgFtvBY4c8Xc%2bDh0CbrxRey8ofSD9%2bwPTp9u3zEX8nXltR45kh4Hu3TvVO8e0z0LiMfyjJ2oDAHDbbV7DXxobgRtu0N4HIsiwYfYT9WkbBg4fPjEMoFu3nPvlmPb%2bJxqQyTD8oydKAwDw53/uP/yvv157D4hOBRk%2bPJ3DwKFDkHnzIOXlkKKic/bIMe09Tywb/j/5id%2bDxPDPRVQGAOD22%2b3vCH3Zvx/40Ie0%2b090PsDIkdlhIE327QNqauwwUFh4el/c0t7nRGL4R1sUBgBg6lS/fya1fz8waZJ274k6Chg3DpgxA1ixwt/1EgV79546DLj%2bCdp7mzgM/%2bjTHgCAadP8fhJ6717In/2Zdt%2bJwoJcfjnw9a8Da9b4u36iYPt24D/%2bw/W/qr2ficLwjwfNAcB/%2bO/bB7n6au2eE7kGjB9v3xlYvdrf9ZQs2nuYGAz/%2bNAaAID77uMrfyL3TgwDsnatv%2bsr/rT3LREY/vGiMQAA99/vPfxx1VXavSbyDbjqKqC6Gtiyxd/1Fk/aexV7DP/48T0AAA8%2baL8r3JedOyETJmj3mUgTkMnYJ2pWVwPbtvm7/uJDe49ijeEfTz4HAOATn7BPDfNlxw6GP1F77YeB7dv9XY/Rpr0vscXwjy9fAwDkk5/0G/7bt0Pe9z7t/hJFGVBQkB0Gdu70d31GT6C9GXEEZDLG/OhHxjzyiL%2bfOmeOwcMPB5mWFu364w5SVGSC5mZ3/2JzcxCUlLT/GZ/6lAm%2b/31jMhk/Ve3YYcxNNwXB8uV%2bfh4BpaUG115rzEUXmaB3b2P27TNYv94Er7wSBG4fEU35ARQUGNxwgwkqK4356EeNcfv0PkoYvvKPv3y/A2AfdOLzq0y3bQPGjdPua1pALr4YmD3bPlDpDKSx0d4jRo3SXivlDlJcDCkvB2pqgIMH/V2/erR7HisM/2TI5wAAfOYzfsP/vfcgF1%2bs3dO0AL70pdy/wbG5GfjCF7TXTB0HlJRkh4GGBn/Xs1/afY4Nhn9y5GsAAB57zHv4Y/Ro7X6mgb3%2bf/CDzu3Tv/%2b79vqp84DS0hPDgDQ2%2bru%2b80%2b7t7HA8E%2bWfAwA9pWhTxs3Mvz9cHP9V1Vp10HhAV27QioqgNpa%2bw5PvGn3M/IY/snjfgDw7d13ISNGaPcxDdxd/0ePcmBLFqBPH%2bAv/gJ46SW/X/LljnYPI43hn0zxHgA2bAAuuki7h2lgr/%2bnnnK3dz/5iXZNlB9Anz6Qykr7zoDPp3yGo923yGL4J1d8B4A1ayDDhmn3Lw3ycv1LYyPQ/s9FKXkggwYBn/0s8Ic/%2bP0ekI7in5SfEcM/2eI5ALzzDjB0qHbv0sD9K/%2bTSFmZdn3kD6R/f/tnwfX1fj8gnIuNG7X7EzkM/%2bSL3QAgK1cCQ4Zo9y0N8n79y6c%2bpV0j6YBceKH9sPDixdq3FOuPf9TuSaQw/NMhXgPAqlUMfz/y%2bsr/hK98RbtO0gcZPhyoqlJ9Z0C%2b%2blXtPkQGwz89YjMAyMqVwAUXaPcrDbxd/3wHgE4BGTEiOwx4u7kIP0x8HMM/XeIxACxdChk4ULtXaeDnlf9x/AwAnQNw2WXAjBnAihX5PYc//KF2rZHA8E%2bf6A8Ab70F6d9fu09p4PX6518BUAcA48fbYWDVKrcHcfNmoE8f7frUMfzTKdIDgLz5JtCvn3aP0sDrK38A/B4A6izgiiuAmTOBd98Ndwa3boVcfrl2PeoY/ukV3QHg9deBvn21%2b5MG/q9/fhMguQG5%2bmrIt79tnwXSEcuW8QmVhuGfdtEcAF57jW/L%2baFz/fOpgOQWEATA5MlAdTWwZcvZz96aNUBVFaSw8NR/I9Auwn/TMhljfvQjYx55xN9PnTPH4OGHgwy/eSkKIEVFJmhu1l5HdkGLF5vg1luDYP9%2b7aUknb3%2bf/xjYyor/f3UH/4wCD75Se3aKbmATMbgfe8z5oMfNMHxvxzC1q3GLF5sguXLg0BEe43q%2bMqfjInYOwCyZAlf%2bfvB658opXjxU5voDAALF0J69tTuRxrw%2bidKKV78dLJoDAD19ZAePbR7kQa8/olSihc/nUp/APjjHxn%2bfvD6J0opXvx0JroDwB/%2bAOneXbsHacDrnyilePHT2egNAL//PcPfD17/RCnFi5/ORWcA%2bM1vgNJS7drTgNc/UUrx4qfz8T8AvPQSw98PXv9EKcWLn3LhdwD49a/5ABg/eP0TpZT9WkSfD/YAgJoaoKBAu3bqGG8DgPzXfzH8/WD4E6UY8L/%2bFy9%2byoWfAeDFFyHFxdq1pgHDnyjFIGVlgIi/i5%2bv/OPMvlt07Fj%2bzkdtLcPfD4Y/UYrZm/nixbz4qSOAzZvzcjxk3rwzPXWL3GP4E6UccM01/i5%2bvvJPCuAXv3B/PubMYTj4wfAnIgP55jf9XPwM/ySBVFa6PR9z5zIc/GD4E5ExxhjgV7/ixU8dBZSWuvs1wOzZHA79YPgT0QnA66/n9%2bLnK/%2bkAh54IPz5%2bMlPeD78YPgTUTtAfT0vfuos4Hvf6/TxkB/%2bEMhktGtIA4Y/EZ0GMm9efi5%2bvvJPAxss3/1uB5NfgK9/neHvB8OfiM4IePRRXvwUFjBtGrBx4/nPxqpVkDvu0F5vWjD8ieisICNGAC0t7i5%2bvvJPK0hxMXDffcBPf2qDvrERaGiArFxpv2Z66lQGgz8MfyI6L3c3CV78RFHA8CeinEAuvBCya1e4i5%2bv/ImigOFPRB0CXH89cPQow58ovhj%2bRNQpkClTgO3bc7/wRYCZM/lpbiJ9DH8iCgUybBjwox%2bd/4OBr70G3HCD9nqJiOFPpCHQXkC%2bQEaMMKa83JjrrjPBkCEGxcUm2L7dmKVLjXnxRWNefTUIAO11EqWdfQfuRz8y5pFH/P3UOXMMHn44yLS0aNdPRESUOnzlT0RElDIMfyIiopRh%2bBMREaUMw58oGtQ%2bBAiUlhpce60xF11kgt69jdm3z2D9ehO88koQNDVpN4aI3OMH/ohSDBg9Gqipsd%2bzfgbS2GhfHVx0kfZaicgdvvInSjHIl7%2bc%2b7f1NTcDX/yi9pqJKDyGP1GKAd/7Xucu4u9%2bV3vtRNR5DH%2biFAO%2b%2bMVwF/Njj2nXQEQdx/AnSjHgoovs2/lhNDcDo0dr10JEuWP4E6Uc8NRTbi7sn/xEuxYiyg3DnyjlIMXFQEODk2tbGhuBkhLtmojo3Bj%2bRGQgN9/s9BqXsjLtmojo7Bj%2bRPGRye8/P2qU038ucPzvEZEz/JIfonjJ7wAQ9O3r9h/s1y%2bv6yWiTmH4E8VPnt8B2LPH6T%2bH3bvzu14i6iiGPxGdBlJW5vZ3fTfdpF0TEWXxd/5EdEb2rwAOHnRz0Tc08K8AiKKD4U9E5%2bTuBvHjH2vXQkQWw5%2bIzgsYORJoagp34Tc3A/wLAKIoYPgTUc6Axx4Ld/FXVWnXQEQMfyLqBOC73%2b3cxf8f/6G9diJi%2bBNRCPadgFwfDNTcDHzhC9prJiKGPxE5YJ8O%2bJOfnP0ZAQ0NwI9/DIwcqb1WImL4EyVVoPWDgZISg2uvNWbkSBP07Wuwd68x69cb88orQaa5WbsxRMQv%2bSEiIkodvvInIiJKGYY/ERFRyjD8iYiIUobhT0RElDIMfyIiopSx4f/UU37Dv6YGKCjQrp2IiCi1IN/6Fl/5ExERpQgwdSpf%2bRMREaUIpLAQsnYtX/kTERGlCHD//XzlT0RElDLAM8/wlT8REVHKAGvW8JU/ERFRykAaG/nKn4iIKGXO/lhuhj8REVFi5e9XAHzbn4iIKLKAp5/mK38iIqKUAe67j6/8iYiIUgZSWOju1wB85U9ERBQbwN1385U/ERFRCgFPPslX/kRERCljHwc8c2bHgl/EDg585U9ERBRr9tcBuXwmYM0a4K67tNdLREREjtgPBk6bBsyeDaxaBWlstN8YuGoVMHs2pKICUliovU4iCuf/A5NCG/Vu0X6pAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA4LTAyVDA1OjU5OjIwKzAwOjAwfoWkcgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wOC0wMlQwNTo1OToyMCswMDowMA/YHM4AAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjItMDgtMDJUMDU6NTk6MjArMDA6MDBYzT0RAAAAAElFTkSuQmCC'/%3e%3c/defs%3e%3c/svg%3e";

var css_248z$1 = ".GuestInfoPopup-module_guest-info-popup__LrSyu {\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n  overflow: hidden;\n  background-color: white;\n  width: 500px;\n  height: 400px;\n  z-index: 1300;\n  border-radius: 10px;\n  border: 2px solid #00b46e;\n  animation: unset;\n  padding: 16px 40px;\n}\n.GuestInfoPopup-module_guest-info-popup__LrSyu .GuestInfoPopup-module_header__dUC46 {\n  display: flex;\n}\n.GuestInfoPopup-module_guest-info-popup__LrSyu .GuestInfoPopup-module_header__dUC46 .GuestInfoPopup-module_conversation-info__t1gQD {\n  display: flex;\n  align-items: center;\n  height: 50px;\n  font-size: 20px;\n  color: #000;\n}\n.GuestInfoPopup-module_guest-info-popup__LrSyu .GuestInfoPopup-module_header__dUC46 .GuestInfoPopup-module_conversation-info__t1gQD .GuestInfoPopup-module_avatar-group__1-9Dk {\n  width: 50px;\n  height: 50px;\n  padding: 6px;\n  border: 2px solid #d9d9d9;\n  margin-right: 10px;\n}\n.GuestInfoPopup-module_guest-info-popup__LrSyu .GuestInfoPopup-module_header__dUC46 .GuestInfoPopup-module_conversation-info__t1gQD .GuestInfoPopup-module_real-check__34yAK {\n  width: 24px;\n  height: 24px;\n  margin-left: 10px;\n}\n.GuestInfoPopup-module_guest-info-popup__LrSyu .GuestInfoPopup-module_content__up0Ay {\n  padding-top: 10px;\n  flex: 1;\n}\n.GuestInfoPopup-module_guest-info-popup__LrSyu .GuestInfoPopup-module_content__up0Ay .GuestInfoPopup-module_input-field__eI53f [class~=MuiInputBase-formControl] {\n  height: 40px;\n}";
var style = {"guest-info-popup":"GuestInfoPopup-module_guest-info-popup__LrSyu","header":"GuestInfoPopup-module_header__dUC46","conversation-info":"GuestInfoPopup-module_conversation-info__t1gQD","avatar-group":"GuestInfoPopup-module_avatar-group__1-9Dk","real-check":"GuestInfoPopup-module_real-check__34yAK","content":"GuestInfoPopup-module_content__up0Ay","input-field":"GuestInfoPopup-module_input-field__eI53f"};
styleInject(css_248z$1);

var GuestInfoPopup = function GuestInfoPopup(_ref) {
  var _errors$phoneNumber, _errors$phoneNumber2;

  var handleCloseGuestPopup = _ref.handleCloseGuestPopup,
      handleSendGuestInfoSuccess = _ref.handleSendGuestInfoSuccess,
      handlingError = _ref.handlingError;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSubmitting = _useState2[0],
      setIsSubmitting = _useState2[1];

  var _useForm = reactHookForm.useForm(),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      errors = _useForm.formState.errors;

  var guestInfoPopupRef = React.useRef(null);

  var CloseButton = function CloseButton() {
    return /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
      onClick: handleCloseGuestPopup,
      sx: {
        position: 'absolute',
        top: "10px",
        right: "10px",
        padding: "2px"
      },
      children: /*#__PURE__*/jsxRuntime.jsx(ClearIcon__default["default"], {
        sx: {
          color: "#AAA"
        }
      })
    });
  };

  var handleSendGuestInfo = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
      var _sendGuestInfoRes$dat;

      var sendGuestInfoRes;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsSubmitting(true);
              _context.next = 3;
              return sendGuestInfo({
                params: data
              });

            case 3:
              sendGuestInfoRes = _context.sent;

              if (!(sendGuestInfoRes.status === APIStatus.OK && (_sendGuestInfoRes$dat = sendGuestInfoRes.data) !== null && _sendGuestInfoRes$dat !== void 0 && _sendGuestInfoRes$dat.length)) {
                _context.next = 9;
                break;
              }

              _context.next = 7;
              return handleSendGuestInfoSuccess(sendGuestInfoRes.data[0]);

            case 7:
              _context.next = 11;
              break;

            case 9:
              handlingError('Không tạo được thông tin chat');
              setIsSubmitting(false);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleSendGuestInfo(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/jsxRuntime.jsx(ChatOverlay, {
    childrenRef: guestInfoPopupRef,
    handleOutSideClick: handleCloseGuestPopup,
    children: /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
      className: style["guest-info-popup"],
      ref: guestInfoPopupRef,
      children: [/*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
        className: style["header"],
        children: [/*#__PURE__*/jsxRuntime.jsxs(material.Box, {
          className: style["conversation-info"],
          children: [/*#__PURE__*/jsxRuntime.jsx(material.Avatar, {
            className: style["avatar-group"],
            src: img$n
          }), "H\u1ED7 tr\u1EE3 kh\xE1ch h\xE0ng", /*#__PURE__*/jsxRuntime.jsx("img", {
            className: style["real-check"],
            src: img$o
          })]
        }), /*#__PURE__*/jsxRuntime.jsx(CloseButton, {})]
      }), /*#__PURE__*/jsxRuntime.jsxs(material.Stack, {
        className: style["content"],
        children: [/*#__PURE__*/jsxRuntime.jsx(material.Box, {
          sx: {
            fontSize: '16px',
            fontWeight: 400,
            margin: '20px 0'
          },
          children: "Vui l\xF2ng cung c\u1EA5p th\xF4ng tin \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u cu\u1ED9c tr\xF2 chuy\u1EC7n"
        }), /*#__PURE__*/jsxRuntime.jsxs(material.Box, {
          component: "form",
          onSubmit: handleSubmit(handleSendGuestInfo),
          children: [/*#__PURE__*/jsxRuntime.jsx(material.FormControl, {
            variant: "standard",
            sx: {
              width: '100%'
            },
            children: /*#__PURE__*/jsxRuntime.jsx(material.TextField, _objectSpread2({
              className: style["input-field"],
              variant: "outlined",
              placeholder: "H\u1ECD v\xE0 t\xEAn",
              InputProps: {
                size: "small",
                startAdornment: /*#__PURE__*/jsxRuntime.jsx(material.InputAdornment, {
                  position: "start",
                  children: /*#__PURE__*/jsxRuntime.jsx(AccountCircleOutlinedIcon__default["default"], {})
                })
              },
              error: !!errors.fullName,
              helperText: !!errors.fullName ? "Bạn chưa điền tên" : null
            }, register('fullName', {
              required: true
            })))
          }), /*#__PURE__*/jsxRuntime.jsx(material.FormControl, {
            variant: "standard",
            sx: {
              width: '100%',
              marginTop: '28px'
            },
            children: /*#__PURE__*/jsxRuntime.jsx(material.TextField, _objectSpread2({
              className: style["input-field"],
              variant: "outlined",
              placeholder: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
              InputProps: {
                size: "small",
                startAdornment: /*#__PURE__*/jsxRuntime.jsx(material.InputAdornment, {
                  position: "start",
                  children: /*#__PURE__*/jsxRuntime.jsx(LocalPhoneOutlinedIcon__default["default"], {})
                })
              },
              error: !!errors.phoneNumber,
              helperText: ((_errors$phoneNumber = errors.phoneNumber) === null || _errors$phoneNumber === void 0 ? void 0 : _errors$phoneNumber.type) === 'required' && 'Bạn chưa điền số điện thoại' || ((_errors$phoneNumber2 = errors.phoneNumber) === null || _errors$phoneNumber2 === void 0 ? void 0 : _errors$phoneNumber2.type) === 'pattern' && 'Số điện thoại không đúng định dạng'
            }, register('phoneNumber', {
              required: true,
              pattern: PHONE_PATTERN
            })))
          }), /*#__PURE__*/jsxRuntime.jsx(material.FormControl, {
            variant: "standard",
            sx: {
              width: '100%',
              marginTop: '28px'
            },
            children: /*#__PURE__*/jsxRuntime.jsxs(material.Button, {
              disabled: isSubmitting,
              variant: "contained",
              sx: {
                background: "#00b46e",
                fontWeight: 600,
                fontSize: '24px',
                " &:hover": {
                  background: "#00b46e"
                }
              },
              endIcon: /*#__PURE__*/jsxRuntime.jsx("img", {
                src: img,
                style: {
                  height: '24px'
                }
              }),
              type: "submit",
              children: [isSubmitting ? /*#__PURE__*/jsxRuntime.jsx(material.CircularProgress, {
                size: 24,
                color: "success",
                sx: {
                  marginRight: '14px'
                }
              }) : null, "B\u1EAET \u0110\u1EA6U CHAT"]
            })
          })]
        })]
      })]
    })
  });
};

var css_248z = ".chat-wrapper {\n  font-weight: 400;\n  line-height: 1.43;\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.87);\n  scroll-behavior: smooth;\n}\n.chat-wrapper * {\n  box-sizing: border-box;\n}\n.chat-wrapper p {\n  margin: 0;\n  padding: 0;\n}\n.chat-wrapper ul,\n.chat-wrapper li {\n  list-style-type: none;\n}\n.chat-wrapper button {\n  border: none;\n  outline: none;\n}\n.chat-wrapper ::-webkit-scrollbar {\n  width: 0.4em;\n  height: 0.4em;\n}\n.chat-wrapper ::-webkit-scrollbar-track {\n  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);\n}\n.chat-wrapper ::-webkit-scrollbar-thumb {\n  background-color: #00b46e;\n  outline: 1px solid rgba(0, 0, 0, 0.12);\n}\n.chat-wrapper .MuiTableCell-sizeMedium {\n  font-size: 12px;\n}";
styleInject(css_248z);

var BuyerChat = function BuyerChat(_ref) {
  var accessToken = _ref.accessToken,
      apiChatUrl = _ref.apiChatUrl,
      websocketChatUrl = _ref.websocketChatUrl,
      clientWebUrl = _ref.clientWebUrl,
      ticketData = _ref.ticketData,
      isShowLog = _ref.isShowLog,
      handleAppError = _ref.handleAppError,
      openSupportTicketCallbackFunc = _ref.openSupportTicketCallbackFunc,
      zaloPhone = _ref.zaloPhone;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isShowChatPopup = _useState4[0],
      setIsShowChatPopup = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isShowGuestInfoPopup = _useState6[0],
      setIsShowGuestInfoPopup = _useState6[1];

  var _useState7 = React.useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      user = _useState8[0],
      setUser = _useState8[1];

  var _useState9 = React.useState([]),
      _useState10 = _slicedToArray(_useState9, 2),
      listConversation = _useState10[0],
      setListConversation = _useState10[1];

  var _useState11 = React.useState(null),
      _useState12 = _slicedToArray(_useState11, 2),
      conversation = _useState12[0],
      setConversation = _useState12[1];

  var _useState13 = React.useState(null),
      _useState14 = _slicedToArray(_useState13, 2),
      chatSetting = _useState14[0],
      setChatSetting = _useState14[1];

  var _useState15 = React.useState(null),
      _useState16 = _slicedToArray(_useState15, 2),
      listTags = _useState16[0],
      setListTags = _useState16[1];

  var _useState17 = React.useState(null),
      _useState18 = _slicedToArray(_useState17, 2),
      chatWithSellerCode = _useState18[0],
      setChatWithSellerCode = _useState18[1];

  var _useState19 = React.useState(0),
      _useState20 = _slicedToArray(_useState19, 2),
      totalUnreadMessage = _useState20[0],
      setTotalUnreadMessage = _useState20[1];

  setChatConf({
    version: '1.2.3',
    apiChatUrl: apiChatUrl,
    accessToken: accessToken,
    clientWebUrl: clientWebUrl,
    isShowLog: isShowLog,
    zaloPhone: zaloPhone || DEFAULT_ZALO_PHONE
  });

  var getUserInfo = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _userRes$data;

      var userRes, _userInfo$account, _userInfo$account2, _userInfo$account3, _userInfo$account4, userInfo;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getAccountInfo();

            case 2:
              userRes = _context.sent;

              if (!(userRes.status === APIStatus.OK && userRes !== null && userRes !== void 0 && (_userRes$data = userRes.data) !== null && _userRes$data !== void 0 && _userRes$data.length)) {
                _context.next = 6;
                break;
              }

              userInfo = userRes.data[0];
              return _context.abrupt("return", {
                accountID: userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$account = userInfo.account) === null || _userInfo$account === void 0 ? void 0 : _userInfo$account.accountId,
                fullname: userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$account2 = userInfo.account) === null || _userInfo$account2 === void 0 ? void 0 : _userInfo$account2.fullname,
                username: userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$account3 = userInfo.account) === null || _userInfo$account3 === void 0 ? void 0 : _userInfo$account3.username,
                type: userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$account4 = userInfo.account) === null || _userInfo$account4 === void 0 ? void 0 : _userInfo$account4.type,
                sessionToken: userInfo.session.token
              });

            case 6:
              return _context.abrupt("return", null);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getUserInfo() {
      return _ref2.apply(this, arguments);
    };
  }();

  var getConversations = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(userInfo) {
      var conversations, conversationRes, i, _conversation, _customerRes$data, customerRes, customerInfo;

      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(listConversation !== null && listConversation !== void 0 && listConversation.length)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", listConversation);

            case 2:
              conversations = [];
              _context2.next = 5;
              return getListConversationCustomer({
                params: {
                  page: 1,
                  limit: 10
                }
              });

            case 5:
              conversationRes = _context2.sent;

              if (!conversationRes.length) {
                _context2.next = 23;
                break;
              }

              i = 0;

            case 8:
              if (!(i < conversationRes.length)) {
                _context2.next = 23;
                break;
              }

              _conversation = conversationRes[i];

              if (_conversation.conversationID) {
                _context2.next = 19;
                break;
              }

              _conversation.rawID = uuid.v4();
              _conversation.customerID = userInfo.accountID;
              _conversation.members = [];
              _conversation.conversationStatus = ConversationStatus.WAIT_TO_PROCESS;
              _context2.next = 17;
              return getCustomerInfo();

            case 17:
              customerRes = _context2.sent;

              if (customerRes.status === APIStatus.OK && customerRes !== null && customerRes !== void 0 && (_customerRes$data = customerRes.data) !== null && _customerRes$data !== void 0 && _customerRes$data.length) {
                customerInfo = customerRes.data[0];
                _conversation.customerInfo = {
                  customerID: customerInfo.customerID,
                  provinceCode: customerInfo.provinceCode,
                  name: userInfo.fullname
                };
              }

            case 19:
              conversations.push(_conversation);

            case 20:
              i++;
              _context2.next = 8;
              break;

            case 23:
              return _context2.abrupt("return", conversations);

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function getConversations(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var getGeneralData = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var userInfo, chatMetadata, _ref5, _chatSetting, haveBuzz, _totalUnreadMessage, listProductTags;

      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userInfo = null;

              if (user) {
                _context3.next = 8;
                break;
              }

              _context3.next = 4;
              return getUserInfo();

            case 4:
              userInfo = _context3.sent;

              if (userInfo) {
                setUser(userInfo);
              }

              _context3.next = 9;
              break;

            case 8:
              userInfo = _objectSpread2({}, user);

            case 9:
              if (!userInfo) {
                _context3.next = 14;
                break;
              }

              _context3.next = 12;
              return getChatMetadata();

            case 12:
              chatMetadata = _context3.sent;

              if (chatMetadata) {
                _ref5 = chatMetadata || {}, _chatSetting = _ref5.chatSetting, haveBuzz = _ref5.haveBuzz, _totalUnreadMessage = _ref5.totalUnreadMessage;
                setChatSetting(_chatSetting);
                setTotalUnreadMessage(_totalUnreadMessage);

                if (haveBuzz) {
                  handleShowChatPopup();
                }
              }

            case 14:
              if (listTags !== null && listTags !== void 0 && listTags.length) {
                _context3.next = 19;
                break;
              }

              _context3.next = 17;
              return getTags({});

            case 17:
              listProductTags = _context3.sent;

              if ((listProductTags === null || listProductTags === void 0 ? void 0 : listProductTags.length) > 0) {
                setListTags(listProductTags);
              }

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function getGeneralData() {
      return _ref4.apply(this, arguments);
    };
  }();

  var handleShowChatPopup = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(isReset, sellerCode) {
      var _conversations, conversations, activeConversation;

      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!isReset && user && listConversation !== null && listConversation !== void 0 && listConversation.length)) {
                _context4.next = 4;
                break;
              }

              setIsShowChatPopup(true);
              _context4.next = 37;
              break;

            case 4:
              setLoading(true);
              _context4.next = 7;
              return getConversations(user);

            case 7:
              conversations = _context4.sent;

              if (!((_conversations = conversations) !== null && _conversations !== void 0 && _conversations.length)) {
                _context4.next = 35;
                break;
              }

              conversations = sortConversationList(conversations);

              if (!sellerCode) {
                _context4.next = 33;
                break;
              }

              activeConversation = conversations.find(function (conversation) {
                var _conversation$sellerI;

                return ((_conversation$sellerI = conversation.sellerInfo) === null || _conversation$sellerI === void 0 ? void 0 : _conversation$sellerI.code) === sellerCode;
              });

              if (activeConversation) {
                _context4.next = 29;
                break;
              }

              _context4.next = 15;
              return findConversationBySellerCode({
                data: {
                  sellerCodeInSellerSystem: sellerCode
                }
              });

            case 15:
              _context4.t0 = _context4.sent;

              if (_context4.t0) {
                _context4.next = 20;
                break;
              }

              _context4.next = 19;
              return createSellerConversation({
                data: {
                  code: sellerCode
                }
              });

            case 19:
              _context4.t0 = _context4.sent;

            case 20:
              activeConversation = _context4.t0;

              if (!activeConversation) {
                _context4.next = 27;
                break;
              }

              if (!handleZaloSellerConversation(activeConversation)) {
                _context4.next = 26;
                break;
              }

              setLoading(false);
              setChatWithSellerCode(null);
              return _context4.abrupt("return");

            case 26:
              conversations.splice(1, 0, activeConversation);

            case 27:
              _context4.next = 33;
              break;

            case 29:
              if (!handleZaloSellerConversation(activeConversation)) {
                _context4.next = 33;
                break;
              }

              setLoading(false);
              setChatWithSellerCode(null);
              return _context4.abrupt("return");

            case 33:
              setListConversation(conversations);
              setConversation(activeConversation || conversations[0]);

            case 35:
              setLoading(false);
              setIsShowChatPopup(true);

            case 37:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function handleShowChatPopup(_x2, _x3) {
      return _ref6.apply(this, arguments);
    };
  }();

  var openChatFromExternal = function openChatFromExternal(data) {
    var _ref7 = data || {},
        sellerCode = _ref7.sellerCode;

    if (listConversation.length) {
      setChatWithSellerCode(sellerCode);
    } else {
      handleShowChatPopup(false, sellerCode);
    }
  };

  var handleCloseChatPopup = function handleCloseChatPopup() {
    setIsShowChatPopup(false);
    setChatWithSellerCode(null);
  };

  var handleShowGuestPopup = function handleShowGuestPopup() {
    setIsShowGuestInfoPopup(true);
  };

  var handleCloseGuestPopup = function handleCloseGuestPopup() {
    setIsShowGuestInfoPopup(false);
  };

  var handleSendGuestInfoSuccess = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(guestInfo) {
      var conversations, _conversation2;

      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return getListConversationGuest({
                params: {
                  offset: 0,
                  limit: 5,
                  guestID: guestInfo.guestID
                }
              });

            case 2:
              conversations = _context5.sent;

              if (conversations !== null && conversations !== void 0 && conversations.length) {
                _conversation2 = conversations[0];
                _conversation2.customerInfo = {
                  customerID: guestInfo.guestID,
                  name: guestInfo.fullName
                };

                if (!_conversation2.conversationStatus) {
                  _conversation2.conversationStatus = ConversationStatus.WAIT_TO_PROCESS;
                }

                if (!_conversation2.members) {
                  _conversation2.members = [];
                }

                if (!_conversation2.conversationID) {
                  _conversation2.rawID = uuid.v4();
                }

                setUser({
                  accountID: guestInfo.guestID,
                  fullname: guestInfo.fullName,
                  username: guestInfo.guestCode,
                  phoneNumber: guestInfo.phoneNumber,
                  type: UserType.GUEST,
                  sessionToken: guestInfo.phoneNumber
                });
                setConversation(_conversation2);
                setListConversation([_conversation2]);
                handleCloseGuestPopup();
                setIsShowChatPopup(true);
              }

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function handleSendGuestInfoSuccess(_x4) {
      return _ref8.apply(this, arguments);
    };
  }();

  var handlingError = function handlingError(error) {
    if (handleAppError && error !== null && error !== void 0 && error.message) {
      handleAppError(error.message);
    }
  };

  React.useEffect(function () {
    window.openBuyerChat = openChatFromExternal;
  }, [openChatFromExternal]);
  React.useEffect( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (accessToken) {
              if (isShowGuestInfoPopup) {
                setIsShowGuestInfoPopup(false);
              }

              getGeneralData();
            } else {
              setIsShowChatPopup(false);
              setUser(null);
              setConversation(null);
              setListConversation([]);
            }

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })), [accessToken]);
  React.useEffect( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var _chatSettingRes$data, chatSettingRes;

    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!(apiChatUrl && !accessToken)) {
              _context7.next = 5;
              break;
            }

            _context7.next = 3;
            return getChatConfiguration();

          case 3:
            chatSettingRes = _context7.sent;

            if (chatSettingRes.status === APIStatus.OK && (_chatSettingRes$data = chatSettingRes.data) !== null && _chatSettingRes$data !== void 0 && _chatSettingRes$data.length) {
              setChatSetting(chatSettingRes.data[0]);
            }

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })), [apiChatUrl]); // if (!chatSetting || !accessToken || !apiChatUrl || !websocketChatUrl || !clientWebUrl) {

  if (!chatSetting || !apiChatUrl || !websocketChatUrl || !clientWebUrl) {
    return null;
  }

  return /*#__PURE__*/jsxRuntime.jsx("div", {
    className: "chat-wrapper",
    children: user ? /*#__PURE__*/jsxRuntime.jsx(ChatProvider, {
      websocketChatUrl: websocketChatUrl,
      user: user,
      listConversation: listConversation,
      conversation: conversation,
      chatStarted: isShowChatPopup,
      ticketData: ticketData,
      chatWithSellerCode: chatWithSellerCode,
      totalUnreadMessage: totalUnreadMessage,
      handlingError: handlingError,
      handleShowChatPopup: handleShowChatPopup,
      openSupportTicketCallbackFunc: openSupportTicketCallbackFunc,
      setChatWithSellerCode: setChatWithSellerCode,
      children: /*#__PURE__*/jsxRuntime.jsx(ChatSettingProvider, {
        user: user,
        chatSetting: chatSetting,
        listTags: listTags,
        children: loading ? /*#__PURE__*/jsxRuntime.jsx(material.CircularProgress, {
          size: 30,
          color: "success",
          sx: {
            margin: "10px auto",
            position: "fixed",
            bottom: 0,
            right: 23
          }
        }) : isShowChatPopup ? /*#__PURE__*/jsxRuntime.jsx(ChatPopup, {
          handleCloseChatPopup: handleCloseChatPopup
        }) : /*#__PURE__*/jsxRuntime.jsx(WidgetChat, {
          onClick: function onClick() {
            return handleShowChatPopup();
          },
          widgetInfo: chatSetting.widgetInfo
        })
      })
    }) : isShowGuestInfoPopup ? /*#__PURE__*/jsxRuntime.jsx(GuestInfoPopup, {
      handleCloseGuestPopup: handleCloseGuestPopup,
      handleSendGuestInfoSuccess: handleSendGuestInfoSuccess,
      handlingError: handlingError
    }) : /*#__PURE__*/jsxRuntime.jsx(WidgetChat, {
      onClick: accessToken ? handleShowChatPopup : handleShowGuestPopup,
      widgetInfo: chatSetting.widgetInfo
    })
  });
};

exports.BuyerChat = BuyerChat;
exports.ProductTags = ProductTags;
exports.SellerInfo = SellerInfo;

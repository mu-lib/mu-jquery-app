(function (umd) {
  var bind = Function.prototype.bind;
  var toString = Object.prototype.toString
  var array = Array.prototype;
  var slice = array.slice;
  var concat = array.concat;
  var re_space = /\s+/;
  var CONSTRUCTOR = "constructor";

  function collect() {
    return slice.call(arguments);
  }

  umd("mu-jquery-wire/jquery.wire")(array, function () {
    return function (input, callback) {
      var me = this;
      var $ = me[CONSTRUCTOR];
      var args = slice.call(arguments, 2);
      var resolved = $.Deferred(function (dfd) {
        dfd.resolveWith(me);
      });

      return me.length === 0
        ? resolved
        : $.when.apply(null, $.map(me, function (element, i) {
          var $element = $(element);
          return $.when($.isFunction(input) ? input.apply(me, [$element, i].concat(args)) : input).then(function (_input) {
            return _input === undefined || _input.length === 0
              ? resolved
              : $.when.apply(null, $.map($.makeArray(_input), function (output, index) {
                return $.when(callback.call(me, $element, index, output)).then(function (result) {
                  return arguments.length > 1 ? slice.call(arguments) : result || output;
                });
              })).then(collect);
          });
        })).then(collect);
    }
  });

  umd("mu-jquery-crank/collect")(array, function () {
    return function (fn) {
      return function ($event) {
        return ($event.result || array).concat(fn.apply(this, arguments));
      }
    }
  });

  umd("mu-jquery-crank/jquery.crank")(["mu-jquery-wire/jquery.wire"], function (wire) {
    return function (input, eventType) {
      var args = slice.call(arguments, 2);

      return wire.call(this, input, function ($element, index, ns) {
        return $element[CONSTRUCTOR].when.apply(null, $.makeArray($element.triggerHandler(eventType + "." + ns, args))).then(function (result) {
          return arguments.length > 1 ? slice.call(arguments) : result || ns;
        });
      });
    }
  });

  umd("mu-jquery-loom/create")(array, function () {
    return function (c, args) {
      return new (bind.apply(c, [null].concat(args)))();
    }
  });

  umd("mu-jquery-loom/jquery.twist")(["mu-jquery-wire/jquery.wire", "./create"], function (wire, create) {
    var re_clean = /@\d+$/;

    function clean(value) {
      return !re_clean.test(value);
    }

    return function (attr, callback) {
      var args = slice.call(arguments, 2);
      var count = 0;
      var _create = create;
      var _callback = callback;
      var $ = this[CONSTRUCTOR];

      if (!$.isFunction(callback)) {
        _create = callback.create || _create;
        _callback = callback.callback;
      }

      return wire.call(this,
        function ($element) {
          return ($element.attr(attr) || "").split(re_space).filter(clean);
        },
        function ($element, index, module) {
          var self = this;

          return $.when(_callback.call(self, module, index)).then(function (result) {
            result = _create.call(self, result, [$element, module = module + "@" + ++count].concat(args));

            $element.attr(attr, function (i, value) {
              value = value.split(re_space);
              value[index] = module;
              return value.join(" ");
            });

            return result;
          });
        });
    }
  });

  umd("mu-jquery-loom/jquery.weave")(["./jquery.twist", "mu-jquery-crank/jquery.crank"], function (twist, crank) {
    function ns(widget) {
      return widget.ns;
    }

    return function () {
      var me = this;
      var $ = me[CONSTRUCTOR];

      return twist.apply(me, slice.call(arguments)).then(function (result) {
        return $.when.apply(null, $.map(result, function (widgets, index) {
          var callbacks;
          return widgets && crank.call(widgets[0].$element, $.map(widgets, ns), "initialize", (callbacks = $.Callbacks("once")).add)
            .then(callbacks.fire)
            .then(function () {
              return widgets;
            });
        })).then(collect);
      });
    }
  });

  umd("mu-jquery-loom/jquery.crank")(["mu-jquery-crank/jquery.crank"], function (crank) {
    return function (attr) {
      return crank.apply(this, [function ($element) {
        return ($element.attr(attr) || "").split(re_space);
      }].concat(slice.call(arguments, 1)));
    }
  });

  umd("mu-jquery-loom/jquery.loom")(["./jquery.crank", "./jquery.twist", "./jquery.weave"], function (crank, twist, weave) {
    function find(selector) {
      return this.find(selector).addBack(selector);
    }

    return function (selector) {
      var args = slice.call(arguments, 1);
      var a = args.slice(0, 1);

      this.extend({
        "crank": function () {
          return crank.apply(find.call(this, selector), a.concat(slice.call(arguments)));
        },

        "twist": function () {
          return twist.apply(find.call(this, selector), args.concat(slice.call(arguments)));
        },

        "weave": function () {
          return weave.apply(find.call(this, selector), args.concat(slice.call(arguments)));
        }
      });

      return this;
    }
  });

  umd("mu-create/transform")(array, function () {
    function value(key) {
      return {
        "key": key,
        "value": this[key]
      };
    }

    function transpose(keys) {
      return keys.map(value, this);
    }

    return function (data) {
      var type = toString.call(data);
      var transformed;

      if (type === "[object Arguments]") {
        return {
          "key": "[object Array]",
          "value": slice.call(data)
        };
      }

      if (type === "[object Object]") {
        if (data.hasOwnProperty("key")) {
          return data;
        }

        transformed = transpose.call(data, Object.keys(data));

        if (transformed.length) {
          return transformed;
        }
      }

      return {
        "key": type,
        "value": data
      };
    }
  });

  umd("mu-create/process")(array, function () {
    return function () {
      var self = this;
      var rules = concat.apply(array, arguments);

      return function (input) {
        var skip = false;
        var args = slice.call(arguments, 1);

        return rules.reduce(function (output, rule) {
          var created = skip ? output : rule.apply(self, [output].concat(args));

          if (created !== undefined) {
            if (created === false) {
              skip = true;
            }
            else {
              output = created;
            }
          }

          return output;
        }, input);
      }
    }
  });

  umd("mu-create/create")(["./transform", "./process"], function (transform, process) {
    var root = this;
    var count = 0;
    var prefix = "blueprint-" + count++;

    function clean(data) {
      return !!data;
    }

    function identify(result, data) {
      data[prefix] = count++;
      return result;
    }

    function anonymize(result, data) {
      delete data[prefix];
      return result;
    }

    function unique(data) {
      var me = this;
      var id = data[prefix];

      return me.hasOwnProperty(id)
        ? false
        : me[id] = data;
    }

    return function configure() {
      var rules = slice.call(arguments);

      function create() {
        var config = this === root ? {} : this;
        var result = slice.call(arguments);
        var blueprints;

        // Flatten & Clean
        result = concat.apply(array, result).filter(clean, config);
        // Identify
        result = result.reduce(identify, result);
        // Unique
        result = result.filter(unique, {});
        // Anonymize
        result = result.reduce(anonymize, result);
        // Transform
        result = result.map(config.transform || transform, config);
        // Flatten & Clean
        result = blueprints = concat.apply(array, result).filter(clean, config);
        // Process
        result = result.reduce(process.apply(config, rules), function Constructor() {
          var self = this;

          (this[CONSTRUCTOR].constructors || array).reduce(function (args, c) {
            var r = c.apply(self, args);

            switch (toString.call(r)) {
              case "[object String]":
              case "[object Object]":
              case "[object Number]":
              case "[object Boolean]":
                r = [r];
                break;

              default:
                r = r && r.length ? r : args;
            }

            return r;
          }, arguments);
        });

        result.concat = function () {
          var r = concat.apply(blueprints, arguments);
          r = r.reduce(identify, r);
          r = r.filter(unique, {});
          r = r.reduce(anonymize, r);
          return r;
        };

        result.extend = function () {
          return create.apply(this, result.concat.apply(this, arguments));
        };

        return result;
      }

      create.concat = function () {
        var r = concat.apply(rules, arguments);
        r = r.reduce(identify, r);
        r = r.filter(unique, {});
        r = r.reduce(anonymize, r);
        return r;
      };

      create.extend = function () {
        return configure.apply(this, create.concat.apply(this, arguments));
      };

      return create;
    }
  });

  umd("mu-create/constructor")(array, function () {
    return function (result, data) {
      var key = data.key;

      if (key === "[object Function]") {
        (result.constructors = result.constructors || []).push(data.value);
        return false;
      }
    }
  });

  umd("mu-create/prototype")(array, function () {
    return function (result, data) {
      var value = data.value;

      if (data.key === "prototype") {
        result.prototype = toString.call(value) === "[object Function]"
          ? value.call(this, result)
          : value;
      }
      else {
        result.prototype[data.key] = value;
      }
    }
  });

  umd("mu-create/regexp")(array, function () {
    return function (regexp, callback) {
      return function (result, data) {
        var matches = data.key.match(regexp);

        if (matches) {
          return callback.apply(this, [result, data].concat(matches.slice(1)));
        }
      }
    }
  });

  umd("mu-jquery-widget/dom")(["mu-create/regexp"], function (regexp) {
    var re_on = /^one?$/;

    function copy(o) {
      return Object.keys(o).reduce(function (result, key) {
        if (!result.hasOwnProperty(key)) {
          result[key] = o[key];
        }
        return result;
      }, this);
    }

    return regexp(/^(one?|attr|prop)\/(.+?)(?:\((.*)\))?$/, function (result, data, method, type, args) {
      var dom = toString.call(data.value) === "[object Object]"
        ? data.value
        : re_on.test(method)
          ? { "handler": data.value }
          : { "value": data.value };

      dom = copy.call(dom, re_on.test(method)
        ? {
          "method": method,
          "events": type,
          "selector": args
        }
        : {
          "method": method,
          "name": type
        });

      (result.dom = result.dom || []).push(dom);

      return false;
    });
  });

  umd("mu-jquery-widget/create")(["mu-create/create", "mu-create/constructor", "mu-create/prototype", "./dom"], function (create, construct, proto, dom) {
    return create(construct, dom, proto);
  });

  umd("mu-jquery-widget/widget")(["./create"], function (create) {
    function falsy() {
      return false;
    }

    function name(ns) {
      return this
        .split(re_space)
        .map(function (type) {
          return type + "." + ns;
        })
        .join(" ");
    }

    var widget = {
      "off": function (events, selector, handler) {
        var me = this;
        me.$element.off(name.call(events || "", me.ns), selector, handler);
      },
      "on/_remove": function () {
        var me = this;
        var $element = me.$element;
        var finalized = $element[CONSTRUCTOR].Callbacks("once");
        finalized.fire($element.triggerHandler("finalize." + me.ns, finalized.add));
      }
    };

    ["on", "one"].forEach(function (op) {
      this[op] = function (events, selector, data, handler) {
        var me = this;
        var $element = me.$element;

        switch (arguments.length) {
          case 3:
            handler = data;
            data = undefined;
            break;

          case 2:
            handler = selector;
            selector = undefined;
            data = undefined;
            break;

          case 1:
            throw new Error("not enough arguments");
        }

        $element[op](name.call(events, me.ns), selector, data, $element[CONSTRUCTOR].proxy(handler, me));
      };
    }, widget);

    return create(function ($element, ns) {
      var me = this;
      var $ = me.$ = $element[CONSTRUCTOR];
      var $special = $.event.special;

      $special._remove = $special._remove || {
        "noBubble": true,
        "trigger": falsy,
        "remove": function (handleObj) {
          handleObj.handler($.Event(handleObj.type, {
            "data": handleObj.data,
            "namespace": handleObj.namespace,
            "target": this
          }));
        }
      };

      me.ns = ns;
      me.$element = $element;

      $.each(me[CONSTRUCTOR].dom, function (index, op) {
        switch (op.method) {
          case "on":
          case "one":
            me[op.method](op.events, op.selector, op.data, op.handler);
            break;

          case "attr":
          case "prop":
            $element[op.method](op.name, op.value);
            break;
        }
      });
    }, widget);
  });
})(function (name) {
  var prefix = name.replace(/\/.+$/, "");
  var root = this;

  return function (modules, factory) {
    if (typeof define === "function" && define.amd) {
      define(name, modules, factory);
    } else {
      root[name] = factory.apply(root, modules.map(function (m) {
        return root[m.replace(/^\./, prefix)] || m;
      }));
    }
  }
});
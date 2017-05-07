(function (umd) {
  var undefined;
  var toString = Object.prototype.toString
  var array = Array.prototype;
  var slice = array.slice;
  var concat = array.concat;
  var re_space = /\s+/;
  var CONSTRUCTOR = "constructor";

  function collect() {
    return slice.call(arguments);
  }

  umd("mu-jquery-wire/jquery.wire")([], function () {
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
              : $.when.apply(null, $.makeArray(_input).map(function (output, index) {
                return $.when(callback.call(me, $element, index, output)).then(function (result) {
                  return arguments.length > 1 ? slice.call(arguments) : result || output;
                });
              })).then(collect);
          });
        })).then(collect);
    }
  });

  umd("mu-jquery-capture/capture")([], function () {
    return function ($, fn) {
      function proxy($event) {
        var $result = $event.result;
        var ret = fn.apply(this, arguments);

        if (ret === false) {
          $event.preventDefault();
          $event.stopPropagation();
          ret = undefined;
        }

        return ret === undefined ? $result || [] : ($result || array).concat(ret);
      }

      proxy.guid = fn.guid = fn.guid || $.guid++;

      return proxy;
    }
  });

  umd("mu-jquery-capture/add")(["./capture"], function (capture) {
    return function ($) {
      var add = $.event.add;
      return function (elem, types, handler, data, selector) {
        return add.call(this, elem, types, handler.handler ? $.extend({}, handler, { handler: capture($, handler.handler) }) : capture($, handler), data, selector);
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

  umd("mu-jquery-loom/expr")([], function () {
    function matches($, element, attr, search) {
      var value = $(element).attr(attr);
      return value !== undefined && new RegExp("(?:^|\\s)" + (search || "")).test(value);
    }

    return function ($, attr) {
      return $.expr.createPseudo
        ? $.expr.createPseudo(function (search) {
          return function (element) {
            return matches($, element, attr, search);
          }
        })
        : function (element, index, match) {
          return matches($, element, attr, match[3]);
        };
    }
  });

  umd("mu-jquery-loom/create")([], function () {
    return function (c, args) {
      return new (Function.prototype.bind.apply(c, [null].concat(args)))();
    }
  });

  umd("mu-jquery-loom/jquery.wire")(["mu-jquery-wire/jquery.wire", "./create"], function (wire, create) {
    var re_clean = /(?:^|@\d+)$/;

    function clean(value) {
      return !re_clean.test(value);
    }

    return function (attr, callback) {
      var args = slice.call(arguments, 2);
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
        function ($element, index, name) {
          var self = this;

          return $.when(_callback.call(self, name, index)).then(function (result) {
            result = result && _create.call(self, result, [$element, name = name + "@" + $.guid++].concat(args));

            $element.attr(attr, function (i, value) {
              value = value.split(re_space);
              value[index] = name;
              return value.join(" ");
            });

            return result;
          });
        });
    }
  });

  umd("mu-jquery-loom/jquery.weave")(["./jquery.wire", "mu-jquery-crank/jquery.crank"], function (weave, crank) {
    function ns(widget) {
      return widget.ns;
    }

    return function () {
      var me = this;
      var $ = me[CONSTRUCTOR];

      return weave.apply(me, slice.call(arguments)).then(function (result) {
        return $.when.apply(null, result.map(function (widgets, index) {
          var callbacks;
          return widgets && crank.call(widgets[0].$element, widgets.map(ns), "initialize", (callbacks = $.Callbacks("once")).add)
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

  umd("mu-jquery-loom/jquery.loom")(["./jquery.crank", "./jquery.weave"], function (crank, weave) {
    function find($element, selector) {
      return $element.find(selector).addBack(selector);
    }

    return function (attr) {
      var arg = [attr];
      var args = slice.call(arguments);
      var selector = "[" + attr + "]";

      return this.extend({
        "crank": function () {
          return crank.apply(find(this, selector), arg.concat(slice.call(arguments)));
        },
        "weave": function () {
          return weave.apply(find(this, selector), args.concat(slice.call(arguments)));
        }
      });
    }
  });

  umd("mu-create/transform")([], function () {
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

  umd("mu-create/process")([], function () {
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

  umd("mu-create/constructor")([], function () {
    return function (result, data) {
      var key = data.key;

      if (key === "[object Function]") {
        (result.constructors = result.constructors || []).push(data.value);
        return false;
      }
    }
  });

  umd("mu-create/prototype")([], function () {
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

  umd("mu-create/regexp")([], function () {
    return function (regexp, callback) {
      return function (result, data) {
        var matches = data.key.match(regexp);

        if (matches) {
          return callback.apply(this, [result, data].concat(matches.slice(1)));
        }
      }
    }
  });

  umd("mu-jquery-widget/expr")([], function () {
    function matches($, element, search) {
      search = $.expando + "#" + $.camelCase(search || "");
      return Object.keys($.data(element)).some(function (key) {
        return key.startsWith(search);
      });
    }

    return function ($) {
      return $.expr.createPseudo
        ? $.expr.createPseudo(function (search) {
          return function (element) {
            return matches($, element, search);
          }
        })
        : function (element, index, match) {
          return matches($, element, match[3]);
        };
    }
  });

  umd("mu-jquery-widget/jquery.get")([], function () {
    return function (search) {
      var me = this;
      var $ = me[CONSTRUCTOR];
      var values = {};

      search = $.expando + "#" + $.camelCase(search || "");

      return $.map(me, function (element) {
        return $.map($.data(element), function (value, key) {
          return values.hasOwnProperty(key) ? undefined : values[key] = key.startsWith(search) ? value : undefined;
        });
      });
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
        var finalized = me.$.Callbacks("once");
        finalized.fire(me.triggerHandler("finalize", finalized.add));
      },
      "triggerHandler": function (events, args) {
        var me = this;
        return me.$element.triggerHandler(name.call(events, me.ns), args);
      }
    };

    ["on", "one"].forEach(function (op) {
      this[op] = function (events, selector, data, handler) {
        var me = this;

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

        me.$element[op](name.call(events, me.ns), selector, data, me.$.proxy(handler, me));
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

      me[CONSTRUCTOR].dom.forEach(function (op, index) {
        switch (op.method) {
          case "on":
          case "one":
            me[op.method](op.events, op.selector, op.data, op.handler);
            break;

          case "attr":
          case "prop":
            $element[op.method](op.name, $.isFunction(op.value) ? $.proxy(op.value, me) : op.value);
            break;
        }
      });

      $element.data($.expando + "#" + ns, me);
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
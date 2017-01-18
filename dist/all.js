(function (umd) {
  var bind = Function.prototype.bind;
  var toString = Object.prototype.toString
  var array = Array.prototype;
  var slice = array.slice;
  var concat = array.concat;
  var re_space = /\s+/;

  function collect() {
    return slice.call(arguments);
  }

  umd("mu-jquery-wire/jquery.wire")([], function () {
    return function (input, callback) {
      var me = this;
      var $ = me.constructor;
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
              : $.when.apply(null, $.map($.isArray(_input) ? _input : [_input], function (output, index) {
                return $.when(callback.call(me, $element, index, output)).then(function (result) {
                  return arguments.length > 1 ? slice.call(arguments) : result || output;
                });
              })).then(collect);
          });
        })).then(collect);
    }
  });

  umd("mu-jquery-crank/jquery.crank")(["mu-jquery-wire/jquery.wire"], function (wire) {
    return function (input, eventType) {
      var args = slice.call(arguments, 2);

      return wire.call(this, input, function ($element, index, ns) {
        return $element.constructor.when($element.triggerHandler(eventType + "." + ns, args)).then(function (result) {
          return arguments.length > 1 ? slice.call(arguments) : result || ns;
        });
      });
    }
  });

  umd("mu-jquery-loom/create")([], function () {
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
      var $ = this.constructor;

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
      var $ = me.constructor;

      return twist.apply(me, slice.call(arguments)).then(function (result) {
        return $.when.apply(null, $.map(result, function (widgets, index) {
          return widgets && crank.call(widgets[0].$element, $.map(widgets, ns), "initialize").then(function () {
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
      var rules = concat.apply([], arguments);

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
    function clean(data) {
      return !!data;
    }

    return function configure() {
      var rules = slice.call(arguments);

      function create() {
        var config = this === root ? {} : this;
        var result = slice.call(arguments);
        var blueprints;

        // Flatten & Clean
        result = concat.apply(array, result).filter(clean, config);
        // Transform
        result = result.map(config.transform || transform, config);
        // Flatten & Clean
        result = blueprints = concat.apply(array, result).filter(clean, config);
        // Process
        result = result.reduce(process.apply(config, rules), function () {
          var self = this;

          (this.constructor.constructors || []).reduce(function (args, c) {
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
          return concat.apply(blueprints, arguments);
        };

        result.extend = function () {
          return create.apply(this, result.concat.apply(this, arguments));
        };

        return result;
      }

      create.concat = function () {
        return concat.apply(rules, arguments);
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

  umd("mu-jquery-widget/widget")([], function () {
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
        me.$element.off(name.call(events, me.ns), selector, handler);
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

        $element[op](name.call(events, me.ns), selector, data, $element.constructor.proxy(handler, me));
      };
    }, widget);

    return [function ($element, ns) {
      var me = this;

      me.ns = ns;
      me.$element = $element;

      $element.constructor.each(me.constructor.dom, function (index, op) {
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
    }, widget];
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

  umd("mu-jquery-hub/hub")([], function () {
    return function () {
      var $ = this;
      var args = slice.call(arguments);
      var topics = {};
      var proxied = {};

      function subscribe(add) {
        return function () {
          var me = this;

          return add.apply(me, $.map(arguments, function (arg) {
            proxy = $.proxy(arg, me);
            proxied[proxy.guid] = arg;
            return proxy;
          }));
        }
      }

      function unsubscribe(remove) {
        return function () {
          return remove.apply(this, $.map(arguments, function (arg) {
            return proxied[arg.guid] || arg;
          }));
        }
      }

      return function (id) {
        var callbacks;
        var method;
        var topic = id && topics[id];

        if (!topic) {
          callbacks = $.Callbacks.apply(null, args);

          topic = {
            publish: callbacks.fire,
            subscribe: subscribe(callbacks.add),
            unsubscribe: unsubscribe(callbacks.remove)
          };

          if (id) {
            topics[id] = topic;
          }
        }

        return topic;
      }
    }
  });

  umd("mu-jquery-app/hub")(["mu-create/regexp"], function (regexp) {
    return regexp(/^hub\/(.+)/, function (result, data, topic) {
      (result.hub = result.hub || []).push({
        "topic": topic,
        "handler": data.value
      });

      return false;
    });
  });

  umd("mu-jquery-app/create")(["mu-create/create", "mu-create/constructor", "mu-create/prototype", "mu-jquery-widget/dom", "./hub"], function (create, construct, proto, dom, hub) {
    return create(construct, hub, dom, proto);
  });

  umd("mu-jquery-app/widget")(["mu-jquery-widget/widget"], function (widget) {
    var _remove = {
      "noBubble": true,
      "trigger": function () {
        return false;
      },
      "remove": function (handleObj) {
        var me = this;

        if (handleObj.handler) {
          handleObj.handler.call(me, me.constructor.Event(handleObj.type, {
            "data": handleObj.data,
            "namespace": handleObj.namespace,
            "target": me
          }));
        }
      }
    };

    return concat.call(widget,
      function ($element, ns, opt) {
        var me = this;
        var $ = $element.constructor;
        var hub = opt.hub;
        var subscriptions = [];

        $.event.special._remove = _remove;

        me.subscribe = function (topic, handler) {
          subscriptions.push({
            "topic": topic,
            "handler": handler
          });

          hub(topic).subscribe.call(this, handler);
        };

        me.unsubscribe = function (topic, handler) {
          hub(topic).unsubscribe.call(this, handler);
        };

        me.publish = function (topic) {
          hub(topic).publish.apply(this, slice.call(arguments, 1));
        };

        me.on("finalize", function () {
          $.each(subscriptions, function (index, s) {
            me.unsubscribe(s.topic, s.handler);
          });

          me.off("." + me.ns);
        });
      },
      {
        "on/initialize": function () {
          var me = this;

          me.$element.constructor.each(me.constructor.hub, function (index, op) {
            me.subscribe(op.topic, op.handler);
          });
        },

        "on/_remove": function () {
          this.$element.triggerHandler("finalize." + this.ns);
        }
      });
  });
})(function (name) {
  var prefix = name.replace(/\/.+$/, "");
  var root = this;

  return function (modules, factory) {
    if (typeof define === "function" && define.amd) {
      define(modules, factory);
    } else if (typeof module === "object" && module.exports) {
      module.exports = factory.apply(root, modules.map(require));
    } else {
      root[name] = factory.apply(root, modules.map(function (m) {
        return root[m.replace(/^\./, prefix)] || m;
      }));
    }
  }
});
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

  umd("mu-jquery-wire/jquery.wire")(["jquery"], this, function ($) {
    return function (input, callback) {
      var self = this;
      var args = slice.call(arguments, 2);
      var resolved = $.Deferred(function (dfd) {
        dfd.resolveWith(self);
      });

      return self.length === 0
        ? resolved
        : $.when.apply(null, $.map(self, function (element, i) {
          var $element = self.constructor(element);
          return $.when($.isFunction(input) ? input.apply(self, [$element, i].concat(args)) : input).then(function (_input) {
            return _input === undefined || _input.length === 0
              ? resolved
              : $.when.apply(null, $.map($.isArray(_input) ? _input : [_input], function (output, index) {
                return $.when(callback.call(self, $element, index, output)).then(function (result) {
                  return arguments.length > 1 ? slice.call(arguments) : result || output;
                });
              })).then(collect);
          });
        })).then(collect);
    }
  });

  umd("mu-jquery-crank/jquery.crank")(["jquery", "mu-jquery-wire/jquery.wire"], this, function ($, wire) {
    return function (input, eventType) {
      var args = slice.call(arguments, 2);

      return wire.call(this, input, function ($element, index, ns) {
        return $.when($element.triggerHandler(eventType + "." + ns, args)).then(function (result) {
          return arguments.length > 1 ? slice.call(arguments) : result || ns;
        });
      });
    }
  });

  umd("mu-jquery-loom/create")([], this, function () {
    return function (c, args) {
      return new (bind.apply(c, [null].concat(args)))();
    }
  });

  umd("mu-jquery-loom/jquery.twist")(["jquery", "mu-jquery-wire/jquery.wire", "./create"], this, function ($, wire, create) {
    var re_clean = /@\d+$/;

    function clean(value) {
      return !re_clean.test(value);
    }

    return function (attr, callback) {
      var args = slice.call(arguments, 2);
      var count = 0;
      var _create = create;
      var _callback = callback;

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

  umd("mu-jquery-loom/jquery.weave")(["jquery", "./jquery.twist", "mu-jquery-crank/jquery.crank"], this, function ($, twist, crank) {
    function ns(widget) {
      return widget.ns;
    }

    function initialize(widgets, index) {
      return widgets && crank.call(widgets[0].$element, $.map(widgets, ns), "initialize").then(function () {
        return widgets;
      });
    }

    function weave(result) {
      return $.when.apply(null, $.map(result, initialize)).then(collect);
    }

    return function () {
      return twist.apply(this, slice.call(arguments)).then(weave);
    }
  });

  umd("mu-jquery-loom/jquery.crank")(["jquery", "mu-jquery-crank/jquery.crank"], this, function ($, crank) {
    return function (attr) {
      return crank.apply(this, [function ($element) {
        return ($element.attr(attr) || "").split(re_space);
      }].concat(slice.call(arguments, 1)));
    }
  });

  umd("mu-create/transform")([], this, function () {
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

  umd("mu-create/process")([], this, function () {
    return function () {
      var self = this;
      var rules = concat.apply([], arguments);

      return function (input) {
        var skip = false;
        var args = slice.call(arguments, 1);

        return rules.reduce(function (output, rule) {
          var created = skip ? output : rule.apply(self, concat.call([output], args));

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

  umd("mu-create/create")(["./transform", "./process"], this, function (transform, process) {
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
        result = result.reduce(process.apply(config, rules), function Composition() {
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

  umd("mu-create/constructor")([], this, function () {
    return function (result, data) {
      var key = data.key;

      if (key === "[object Function]") {
        (result.constructors = result.constructors || []).push(data.value);
        return false;
      }
    }
  });

  umd("mu-create/prototype")([], this, function () {
    return function (result, data) {
      if (data.key === "prototype") {
        result.prototype = data.value;
      }
      else {
        result.prototype[data.key] = data.value;
      }
    }
  });

  umd("mu-create/regexp")([], this, function () {
    return function (regexp, callback) {
      return function (result, data) {
        var matches = data.key.match(regexp);

        if (matches) {
          return callback.apply(this, [result, data].concat(matches.slice(1)));
        }
      }
    }
  });

  umd("mu-jquery-widget/widget")(["jquery"], this, function ($) {
    function name(ns) {
      return this
        .split(re_space)
        .map(function (type) {
          return type + "." + ns;
        })
        .join(" ");
    }

    return [function ($element, ns) {
      var me = this;

      me.ns = ns;
      me.$element = $element;

      $.each(me.constructor.dom, function (index, op) {
        switch (op.method) {
          case "on":
            me.on(op.events, op.selector, op.data, op.handler);
            break;

          case "attr":
          case "prop":
            $element[op.method](op.name, op.value);
            break;
        }
      });
    }, {
        "on": function (events, selector, data, handler) {
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

          me.$element.on(name.call(events, me.ns), selector, data, $.proxy(handler, me));
        },
        "off": function (events, selector, handler) {
          var me = this;

          me.$element.off(name.call(events, me.ns), selector, handler);
        }
      }];
  });

  umd("mu-jquery-widget/dom")(["mu-create/regexp"], this, function (regexp) {
    function copy(o) {
      return Object.keys(o).reduce(function (result, key) {
        if (!result.hasOwnProperty(key)) {
          result[key] = o[key];
        }
        return result;
      }, this);
    }

    return regexp(/^(on|attr|prop)\/(.+?)(?:\((.*)\))?$/, function (result, data, method, type, args) {
      var dom = toString.call(data.value) === "[object Object]"
        ? data.value
        : method === "on"
          ? { "handler": data.value }
          : { "value": data.value };

      dom = copy.call(dom, method === "on"
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

  umd("mu-jquery-hub/hub")(["jquery"], this, function ($) {
    return function () {
      var args = slice.call(arguments);
      var topics = {};
      var proxied = {};

      function subscribe(add) {
        return function () {
          var self = this;

          return add.apply(self, $.map(arguments, function (arg) {
            proxy = $.proxy(arg, self);
            proxied[proxy.guid] = arg;
            return proxy;
          }));
        }
      }

      function unsubscribe(remove) {
        return function () {
          var self = this;

          return remove.apply(self, $.map(arguments, function (arg) {
            return proxied[arg.guid] || arg;
          }));
        }
      }

      return function (id) {
        var callbacks,
          method,
          topic = id && topics[id];

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

  umd("mu-jquery-app/hub")(["mu-create/regexp"], this, function (regexp) {
    return regexp(/^hub\/(.+)/, function (result, data, topic) {
      (result.hub = result.hub || []).push({
        "topic": topic,
        "handler": data.value
      });

      return false;
    });
  });

  umd("mu-jquery-app/create")(["mu-create/create", "mu-create/constructor", "mu-create/prototype", "mu-jquery-widget/dom", "./hub"], this, function (create, construct, proto, dom, hub) {
    return create(construct, hub, dom, proto);
  });

  umd("mu-jquery-app/widget")(["jquery", "mu-jquery-widget/widget"], this, function ($, widget) {
    $.event.special._remove = {
      "noBubble": true,
      "trigger": function () {
        return false;
      },
      "remove": function (handleObj) {
        var me = this;

        if (handleObj.handler) {
          handleObj.handler.call(me, $.Event(handleObj.type, {
            "data": handleObj.data,
            "namespace": handleObj.namespace,
            "target": me
          }));
        }
      }
    };

    return concat.call(widget,
      function ($element, ns, hub) {
        var me = this;
        var subscriptions = [];

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

          $.each(me.constructor.hub, function (index, op) {
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

  return function (modules, root, factory) {
    if (typeof define === "function" && define.amd) {
      define(modules, factory);
    } else if (typeof module === "object" && module.exports) {
      module.exports = factory.apply(root, modules.map(require));
    } else {
      root[name] = factory.apply(root, modules.map(function (m) {
        return {
          "jquery": root.jQuery
        }[m] || root[m.replace(/^\./, prefix)];
      }));
    }
  }
});
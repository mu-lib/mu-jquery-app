(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-wire/jquery.wire"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m] || root[m];
    }));
  }
})(["jquery"], this, function($) {
  var slice = Array.prototype.slice;
  var resolved = $.Deferred(function (dfd) {
    dfd.resolve();
  });

  return function(input, callback) {
    var args = slice.call(arguments, 2);

    return this.length === 0 ? resolved : $.when.apply(null, this.map(function(i, element) {
      return $.when.apply(null, input
        .apply(element, args)
        .map(function(output, index) {
          return $.when(callback.call(element, output, index));
        }));
    }));
  };
});
(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-crank/jquery.crank"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m] || root[m];
    }));
  }
})([
  "jquery",
  "mu-jquery-wire/jquery.wire"
], this, function($, wire) {
  var slice = Array.prototype.slice;
  var re = /\s+/;

  function crank(attr, eventType) {
    var args = slice.call(arguments, 2);

    return wire.call(this,
      function(name) {
        return ($(this).attr(name) || "").split(re);
      },
      function(ns) {
        return $.when($(this).triggerHandler(eventType + "." + ns, args)).then(function(result) {
          return arguments.length > 1 ? slice.call(arguments) : result || ns;
        });
      },
      attr);
  }

  return function() {
    var self = this;
    var args = arguments;

    return $.Deferred(function(deferred) {
      try {
        $.when(crank.apply(self, args)).then(
          function() {
            deferred.resolveWith(self, arguments);
          }, function() {
            deferred.rejectWith(self, arguments);
          });
      } catch (e) {
        deferred.rejectWith(self, [e]);
      }
    }).promise();
  };
});

(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-compose/transform"] = factory.apply(root, modules.map(function(m) {
      return root[m.replace(/^\./, "mu-compose")];
    }));
  }
})([], this, function() {
  var slice = Array.prototype.slice;
  var toString = Object.prototype.toString

  function value(key) {
    return {
      "key": key,
      "value": this[key]
    };
  }

  function transpose(keys) {
    return keys.map(value, this);
  }

  return function(data) {
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
(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-compose/process"] = factory.apply(root, modules.map(function(m) {
      return root[m.replace(/^\./, "mu-compose")];
    }));
  }
})([], this, function() {
  var slice = Array.prototype.slice;
  var concat = Array.prototype.concat;

  return function() {
    var self = this;
    var rules = concat.apply([], arguments);

    return function(input) {
      var skip = false;
      var args = slice.call(arguments, 1);

      return rules.reduce(function(output, rule) {
        var composed = skip ? output : rule.apply(self, concat.call([output], args));

        if (composed !== undefined) {
          if (composed === false) {
            skip = true;
          }
          else {
            output = composed;
          }
        }

        return output;
      }, input);
    }
  }
});
(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-compose/compose"] = factory.apply(root, modules.map(function(m) {
      return root[m.replace(/^\./, "mu-compose")];
    }));
  }
})(["./transform", "./process"], this, function(transform, process) {
  var root = this;
  var array = Array.prototype;
  var slice = array.slice;
  var concat = array.concat;

  function clean(data) {
    return !!data;
  }

  return function() {
    var rules = slice.call(arguments);

    return function() {
      var config = this === root ? {} : this;
      var result = slice.call(arguments);

      // Flatten & Clean
      result = concat.apply(array, result).filter(clean, config);
      // Transform
      result = result.map(config.transform || transform, config);
      // Flatten & Clean
      result = concat.apply(array, result).filter(clean, config);
      // Process
      result = result.reduce(process.apply(config, rules), function Composition() {
        var self = this;

        (this.constructor.constructors || []).reduce(function(args, c) {
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

      return result;
    }
  }
});

(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-compose/constructor"] = factory.apply(root, modules.map(function(m) {
      return root[m.replace(/^\./, "mu-compose")];
    }));
  }
})([], this, function() {
  return function(result, data) {
    var key = data.key;

    if (key === "[object Function]") {
      (result.constructors = result.constructors || []).push(data.value);

      return false;
    }
  }
});

(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-compose/prototype"] = factory.apply(root, modules.map(function(m) {
      return root[m.replace(/^\./, "mu-compose")];
    }));
  }
})([], this, function() {
  return function(result, data) {
    result.prototype[data.key] = data.value;
  }
});

(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-compose/regexp"] = factory.apply(root, modules.map(function(m) {
      return root[m.replace(/^\./, "mu-compose")];
    }));
  }
})([], this, function() {
  return function(regexp, callback) {
    return function(result, data) {
      var matches = data.key.match(regexp);

      if (matches) {
        return callback.apply(this, [result, data].concat(matches.slice(1)));
      }
    }
  }
});

(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-hub/hub"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m] || root[m];
    }));
  }
})(["jquery"], this, function($) {
  var slice = Array.prototype.slice;

  return function() {
    var args = slice.call(arguments);
    var topics = {};
    var proxied = {};

    function subscribe(add) {
      return function() {
        var self = this;

        return add.apply(self, $.map(arguments, function (arg) {
          proxy = $.proxy(arg, self);
          proxied[proxy.guid] = arg;
          return proxy;
        }));
      }
    }

    function unsubscribe(remove) {
      return function() {
        var self = this;

        return remove.apply(self, $.map(arguments, function (arg) {
          return proxied[arg.guid] || arg;
        }));
      }
    }

    return function(id) {
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

(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-widget/widget"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m] || root[m];
    }));
  }
})(["jquery"], this, function($) {
  function name(ns) {
    return this
      .split(/\s+/)
      .map(function(type) {
        return type + "." + ns;
      })
      .join(" ");
  }

  return [
    function($element, ns) {
      var me = this;

      me.ns = ns;
      me.$element = $element;

      $.each(me.constructor.dom || false, function(index, op) {
        switch (op.method) {
          case "on":
            me.on(op.type, op.args, op.value);
            break;

          case "attr":
            $element.attr(op.type, op.value);
            break;

          case "prop":
            $element.prop(op.type, op.value);
            break;
        }
      });
    },
    {
      "on": function(events, selector, data, handler) {
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

          default:
            throw new Error("not enough arguments");
        }

        me.$element.on(name.call(events, me.ns), selector, data, $.proxy(handler, me));
      },
      "off": function(events, selector, handler) {
        var me = this;

        me.$element.off(name.call(events, me.ns), selector, handler);
      }
    }
  ]
});

(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-widget/compose"] = factory.apply(root, modules.map(function(m) {
      return root[m];
    }));
  }
})(["mu-compose/regexp"], this, function(regexp) {
  return regexp(/^(on|attr|prop)\/(.+?)(?:\((.*)\))?$/, function(result, data, method, type, args) {
    (result.dom = result.dom || []).push({
      "method": method,
      "type": type,
      "args": args,
      "value": data.value
    });

    return false;
  });
});

(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-widget/jquery.weave"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m] || root[m];
    }));
  }
})([
  "jquery",
  "mu-jquery-wire/jquery.wire"
], this, function($, wire) {
  var slice = Array.prototype.slice;
  var bind = Function.prototype.bind;
  var re_space = /\s+/;
  var re_instance = /@\d+$/;
  var count = 0;

  function create(c, args) {
    return new (bind.apply(c, [null].concat(args)))();
  }

  return function(attr, callback) {
    var args = slice.call(arguments, 2);

    return wire.call(this,
      function(name) {
        return ($(this).attr(name) || "").split(re_space);
      },
      function(module, index) {
        var self = this;

        return re_instance.test(module) ? module : $.when(callback.call(self, module, index)).then(function(result) {
          var $element;

          if ($.type(result) === "function") {
            // create instance and update `$element` and `module`
            result = create(result, [$element = $(self), module = module + "@" + ++count].concat(args));

            // update attribute
            $element.attr(attr, function(i, value) {
              value = value.split(/\s+/);
              value[index] = module;
              return value.join(" ");
            });
          }

          return result;
        });
      },
      attr);
  }
});

(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(function(m) {
      return require(m);
    }));
  } else {
    root["mu-jquery-app/compose"] = factory.apply(root, modules.map(function(m) {
      return root[m];
    }));
  }
})([
  "mu-compose/compose",
  "mu-compose/constructor",
  "mu-compose/prototype",
  "mu-compose/regexp",
  "mu-jquery-widget/compose"
], this, function(compose, construct, proto, regexp, widget) {
  var hub = regexp(/^hub\/(.+)/, function(result, data, topic) {
    (result.hub = result.hub || []).push({
      "topic": topic,
      "handler": data.value
    });

    return false;
  })

  return compose(construct, hub, widget, proto);
});

(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules);
  } else {
    root["mu-jquery-app/hub"] = factory(root.jQuery);
  }
})(["jquery"], this, function($) {
  var slice = Array.prototype.slice;

  return function($element, ns, hub) {
    var me = this;

    me.subscribe = function(topic, handler) {
      return hub(topic).subscribe.call(this, handler);
    };

    me.unsubscribe = function(topic, handler) {
      return hub(topic).unsubscribe.call(this, handler);
    };

    me.publish = function(topic) {
      var t = hub(topic);
      var p = t.publish;

      return p.apply(this, slice.call(arguments, 1));
    };

    $.each(me.constructor.hub || false, function(index, op) {
      me.subscribe(op.topic, op.handler);
    });
  }
});

(function(modules, root, factory) {
  root["mu-jquery-app/jquery.weave"] = factory.apply(root, modules.map(function(m) {
    return {
        "jquery": jQuery
      }[m] || root[m];
  }));
})([
  "jquery",
  "mu-jquery-widget/jquery.weave",
  "mu-jquery-crank/jquery.crank"
], this, function($, weave, crank) {
  var slice = Array.prototype.slice;

  return function(attr) {
    // weave elements from `attr` attribute
    return weave.apply(this, slice.call(arguments))
      // convert widgets to $widgets
      .then(function() {
        return $($.map(slice.call(arguments), function(widget) {
          return ($.isArray(widget) ? widget[0] : widget).$element;
        }));
      })
      // crank `initialize` on `$widgets`
      .then(function($widgets) {
        return crank.call($widgets, attr, "initialize");
      });
  }
});

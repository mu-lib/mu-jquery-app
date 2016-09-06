(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("jquery"));
  } else {
    root["mu-jquery-wire/jquery.wire"] = factory(root.jQuery);
  }
})(this, function($) {
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
    module.exports = factory.apply(root, modules.map(function(m) {
      return require(m);
    }));
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

(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-compose/compose"] = factory();
  }
})(this, function() {
  var w = this;
  var concat = Array.prototype.concat;
  var toString = Object.prototype.toString

  function flip(key) {
    return {
      "key": key,
      "value": this[key]
    };
  }

  function transform(data, index) {
    var type = toString.call(data);

    switch (type) {
      case "[object Object]":
        if (!data.hasOwnProperty("key")) {
          data = Object.keys(data).map(flip, data);
        }
        break;

      default:
        data = {
          "key": type,
          "value": data
        }
    }

    return data;
  }

  function clean(data) {
    return !!data;
  }

  function compose(composers) {
    var config = this;

    return function(instance, data, index, array) {
      var skip = false;

      return composers.reduce(function(result, composer) {
        var composed = skip ? result : composer.call(config, result, data, index, array);

        if (composed !== undefined && composed !== null) {
          if (composed === false) {
            skip = true;
          } else {
            result = composed;
          }
        }

        return result;
      }, instance);
    }
  }

  function Composition() {
    var self = this;

    (this.constructor.constructors || []).reduce(function(args, c) {
      var result = c.apply(self, args);

      switch (toString.call(result)) {
        case "[object String]":
        case "[object Object]":
        case "[object Number]":
        case "[object Boolean]":
          result = [result];
          break;

        case "[object Array]":
        case "[object Arguments]":
          break;

        default:
          result = args;
      }

      return result;
    }, arguments);
  }

  return function() {
    var config = this === w ? {} : this;
    var composers = concat.apply([], arguments);

    return function() {
      var _config = this === w ? config : this;
      var result = arguments;

      // Flatten
      result = concat.apply([], result);
      // Transform
      result = result.map(_config.transform || transform, _config);
      // Flatten
      result = concat.apply([], result);
      // Clean
      result = result.filter(_config.clean || clean, _config);
      // Compose
      return result.reduce(compose.call(_config, composers), _config.composition || Composition);
    }
  }
});

(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-compose/constructor"] = factory();
  }
})(this, function() {
  return function(result, data) {
    var key = data.key;

    if (key === "[object Function]") {
      (result.constructors = result.constructors || []).push(data.value);

      return false;
    }
  }
});

(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-compose/prototype"] = factory();
  }
})(this, function() {
  return function(result, data) {
    result.prototype[data.key] = data.value;
  }
});

(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-compose/regexp"] = factory();
  }
})(this, function() {
  return function(regexp, callback) {
    return function(result, data) {
      var matches = data.key.match(regexp);

      if (matches) {
        return callback.apply(this, [result, data].concat(matches.slice(1)));
      }
    }
  }
});

(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("jquery"));
  } else {
    root["mu-jquery-hub/hub"] = factory(root.jQuery);
  }
})(this, function($) {
  var slice = Array.prototype.slice;

  return function() {
    var args = slice.call(arguments);
    var topics = {};

    return function(id) {
      var callbacks,
        method,
        topic = id && topics[id];

      if (!topic) {
        callbacks = $.Callbacks.apply(null, args);
        topic = {
          publish: callbacks.fire,
          subscribe: callbacks.add,
          unsubscribe: callbacks.remove
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
    module.exports = factory.apply(root, modules);
  } else {
    root["mu-jquery-widget/widget"] = factory(root.jQuery);
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
    module.exports = factory.apply(root, modules.map(function(m) {
      return require(m);
    }));
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
    module.exports = factory.apply(root, modules);
  } else {
    root["mu-jquery-widget/jquery.weave"] = factory.apply(root, modules.map(function(m) {
      return {
          "jquery": jQuery
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
      return hub(topic).subscribe(handler);
    };

    me.publish = function(topic) {
      var t = hub(topic);
      var p = t.publish;

      return p.apply(t, slice.call(arguments, 1));
    }

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

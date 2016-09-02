(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules);
  } else {
    root["mu-jquery-app/jquery.weave"] = factory.apply(root, modules.map(function(m) {
      return {
          "jquery": jQuery
        }[m] || root[m];
    }));
  }
}([
  "jquery",
  "mu-jquery-wire/jquery.wire",
  "mu-jquery-crank/jquery.crank"
], this, function($, wire, crank) {
  var count = 0;

  return function(attr, callback, hub) {
    return wire
      // wire elements from the `mu-wire` attribute
      .call(this, attr, function(module, index) {
        var self = this;

        return $.when(callback(module)).then(function(result) {
          var $element;

          switch ($.type(result)) {
            case "function":
              // create instance and update `$element` and `module`
              result = new result($element = $(self), module = module + "@" + ++count, hub);

              // update attribute
              $element.attr(attr, function(i, value) {
                value = value.split(/\s+/);
                value[index] = module;
                return value.join(" ");
              });
              break;

            case "undefined":
              break;

            default:
              throw new Error(c + " is not a supported type");
          }

          return result;
        });
      })
      .then(function() {
        return $($.map(arguments, function(component) {
          return ($.isArray(component) ? component[0] : component).$element;
        }));
      })
      .then(function($widgets) {
        return crank.call($widgets, attr, "initialize");
      });
  }
}));

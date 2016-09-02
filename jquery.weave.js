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
  "mu-jquery-wire/jquery.wire"
], this, function($, wire) {
  var slice = Array.prototype.slice;
  var bind = Function.prototype.bind;
  var count = 0;

  function create(c, args) {
    return new (bind.apply(c, [null].concat(args)))();
  }

  return function(attr, callback) {
    var args = slice.call(arguments, 2);

    return wire.call(this, attr, function(module, index) {
      var self = this;

      return $.when(callback.call(self, module, index)).then(function(result) {
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
    });
  }
}));

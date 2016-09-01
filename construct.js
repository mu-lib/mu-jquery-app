(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("jquery"));
  } else {
    root["mu-jquery-app/construct"] = factory(root.jQuery);
  }
}(this, function($) {
  return function($element, ns, hub) {
    $.each(this.constructor.hub || false, function(index, op) {
      hub(op.topic).subscribe(op.handler);
    });
  }
}));

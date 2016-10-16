(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/examples/jquery.runkit"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m];
    }, {
        "jquery": root.jQuery,
        "runkit": root.RunKit
      }));
  }
})(["jquery", "runkit"], this, function ($, runkit) {
  return $.fn.runkit = function () {
    return this.each(function (index, element) {
      var $element = $(element);
      var $parent = $element
        .parent()
        .attr("data-runkit", "loading");

      var notebook = runkit.createNotebook({
        "element": $parent.get(0),
        "source": runkit.sourceFromElement(element),
        "onLoad": function () {
          $element.remove();
          $parent
            .attr("data-runkit", "loaded")
            .trigger("runkit", notebook);
        }
      });
    });
  }
});

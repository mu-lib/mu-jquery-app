(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/widget"] = factory.apply(root, modules.map(function (m) {
      return root[m];
    }));
  }
})(["mu-jquery-widget/widget"], this, function (widget) {
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

  return Array.prototype.concat.call(
    widget,
    function ($element) {
      $element.constructor.event.special._remove = _remove;
    },
    {
      "on/_remove": function () {
        this.$element.triggerHandler("finalize." + this.ns);
      }
    });
});

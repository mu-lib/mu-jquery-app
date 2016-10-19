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
  var slice = Array.prototype.slice;
  var concat = Array.prototype.concat;

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
    function ($element, ns, hub) {
      var me = this;
      var $ = $element.constructor;
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

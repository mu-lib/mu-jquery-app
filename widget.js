(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules);
  } else {
    root["mu-jquery-app/widget"] = factory(root.jQuery);
  }
}(["jquery", "mu-jquery-widget"], this, function($) {
  return function($element, ns, hub) {
    var me = this;

    me.ns = ns;
    me.hub = hub;
    me.$widget = $element.widget(this.constructor.dom, ns, this);

    $.each(me.constructor.hub || false, function(index, op) {
      hub(op.topic).subscribe(op.handler);
    });
  }
}));

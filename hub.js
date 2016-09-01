(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("jquery"));
  } else {
    root["mu-jquery-app/hub"] = factory(root.jQuery);
  }
}(this, function($) {
  var topics = {};

  return function(id) {
    var callbacks,
      method,
      topic = id && topics[id];

    if (!topic) {
      callbacks = $.Callbacks();
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
}));

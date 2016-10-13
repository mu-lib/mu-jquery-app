(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/hub"] = factory.apply(root, modules.map(function (m) {
      return root[m];
    }));
  }
})(["mu-create/regexp"], this, function (regexp) {
  return regexp(/^hub\/(.+)/, function (result, data, topic) {
    (result.hub = result.hub || []).push({
      "topic": topic,
      "handler": data.value
    });

    return false;
  });
});

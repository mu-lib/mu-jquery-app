(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/create"] = factory.apply(root, modules.map(function(m) {
      return root[m];
    }));
  }
})([
  "mu-create/create",
  "mu-create/constructor",
  "mu-create/prototype",
  "mu-create/regexp",
  "mu-jquery-widget/dom"
], this, function(create, construct, proto, regexp, dom) {
  var hub = regexp(/^hub\/(.+)/, function(result, data, topic) {
    (result.hub = result.hub || []).push({
      "topic": topic,
      "handler": data.value
    });

    return false;
  });

  return create(construct, hub, dom, proto);
});

var jQuery = require("jquery");
var add = require("mu-jquery-capture/add");
var loom = require("mu-jquery-loom/jquery.loom");

function load(module) {
  return SystemJS.import(module);
}

// Replace jQuery.event.add with a version that captures event results
jQuery.event.add = add(jQuery);

// Extend jQuery.fn with .crank/.twist/.weave
loom.call(jQuery.fn, "[mu-widget]", "mu-widget", load, {});

// Wait for document ready and weave the document element
jQuery(function ($) {
  $(document).weave().fail(console.error.bind(console));
});
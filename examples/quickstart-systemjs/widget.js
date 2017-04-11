var widget = require("mu-jquery-widget/widget");
module.exports = widget.extend({
  "on/click": function ($event) {
    console.log("clicked");
  }
});

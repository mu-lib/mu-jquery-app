var gulp = require("gulp");
var concat = require("gulp-concat");

gulp.task("default", function() {
  return gulp.src([
    "bower_components/mu-jquery-wire/jquery.wire.js",
    "bower_components/mu-jquery-crank/jquery.crank.js",
    "bower_components/mu-compose/transform.js",
    "bower_components/mu-compose/process.js",
    "bower_components/mu-compose/compose.js",
    "bower_components/mu-compose/constructor.js",
    "bower_components/mu-compose/prototype.js",
    "bower_components/mu-compose/regexp.js",
    "bower_components/mu-jquery-hub/hub.js",
    "bower_components/mu-jquery-widget/widget.js",
    "bower_components/mu-jquery-widget/dom.js",
    "bower_components/mu-jquery-widget/compose.js",
    "bower_components/mu-jquery-widget/create.js",
    "bower_components/mu-jquery-widget/jquery.twist.js",
    "bower_components/mu-jquery-widget/jquery.weave.js",
    "bower_components/mu-jquery-widget/jquery.crank.js",
    "./compose.js",
    "./hub.js"
  ])
    .pipe(concat("all.js"))
    .pipe(gulp.dest("./dist/"));
});

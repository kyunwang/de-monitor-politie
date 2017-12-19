// Based on https://gist.github.com/feliperoberto/9793674
var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");

gulp.task("sass", function() {
  gulp
    .src("style/style.scss") // Get the sass/scss file
    .pipe(sass({ includePaths: ["scss"] })) // Pipe the sass/scss through the sass()
    .pipe(gulp.dest("style")); // Output to the destination map style
});

gulp.task("browser-sync", function() {
  browserSync.init(["*.html", "style/*.css", "scripts/*.js"], {
    // Watch all these fiel types for changes
    server: {
      // All the browser-sync configs can be put here
      baseDir: "./"
    }
  });
});

// The default task
// First executing the sass THEN browser-sync
gulp.task("default", ["sass", "browser-sync"], function() {
  gulp.watch("*/*.scss", ["sass"]); // Watching all scss changes on changes in the background
});

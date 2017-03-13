var gulp = require('gulp');
var watch = require('gulp-watch');

var browserSync = require('browser-sync').create();
// Gulp Watch: Watches for changes to the file and triggers task

gulp.task('watch', function() {

  // Automates browser referesh and server
  browserSync.init({
    notify: false, // This hides the browserSync black box in the corner
    server: {
      baseDir: "app"
    }
  })

  // HTML watcher
  watch('./app/index.html', function() {
    // Save changes in index will reload page.
    browserSync.reload();
  });

  // css watcher
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject')
  });

  // This automates webpack and gulp together
  watch('./app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  });

});

// This applies each css update on the fly.
// The array makes sure to process the styles before applying on the fly.
gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

// This refereshes the browser automatically. The dependency makes sure the script file runs first which is synched with webpack.
gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
})

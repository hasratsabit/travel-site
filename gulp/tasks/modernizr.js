
var gulp = require('gulp');
// The modernizr package comes with a lot of browser testing.
var modernizr = require('gulp-modernizr');

// The more options we choose the longer it takes for browsers to finish testing.
// We should only include options that we need to make our package as lighter as possible.
gulp.task('modernizr', function() {
  // We only want the modernizr package to go through our css and js files and look for classes
  return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    }))
    .pipe(gulp.dest('./app/temp/scripts/'));
})

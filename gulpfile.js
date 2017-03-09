var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');


gulp.task('default', () => {
  console.log("Gulp is created");
})

gulp.task('html', () => {
  console.log('html is running');
})

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
})


// Gulp Watch: Watches for changes to the file and triggers task

gulp.task('watch', function() {

  // HTML watcher
  watch('./app/index.html', function() {
    gulp.start('html');
  });

  // css watcher
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('styles')
  });

})

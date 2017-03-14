var gulp = require('gulp');
// Form image optomization
var imagemin = require('gulp-imagemin');
var del = require('del');
var browserSync = require('browser-sync').create();
/*
This package doest three thing:
  1. Pipes file from original folder to the dist folder.
  2. It Compresses the file.
  3. It revisions the file for later updates.
*/
var usemin = require('gulp-usemin');
// The bottom three are the packages that will achieve the above three tasks
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');

/*
This enables preview for dist folder
The initial name was dist. But for github hosting that only accept docs, we change it to docs.
*/
gulp.task('previewDist', function() {
  // Automates browser referesh and server
  browserSync.init({
    notify: false, // This hides the browserSync black box in the corner
    server: {
      baseDir: "docs"
    }
  });

});

/*
First delete the dist folder before pipe the compressed files.
The icons dependency is that every time the build runs, it has the updated icons.
*/
gulp.task('deleteDistFolder', ['icons'], function() {
  return del("./docs");
});

/*
EXCLUDE
In the future if we want transfer new files to the dist folder,
we want to exclude the files that are already transfere
*/

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

/*
Compresses and Optomizes images.
Takes the delete as its dependency
We don't want icons inside the images to be included because we use sprite.
*/
gulp.task('optomizeImages', ['deleteDistFolder'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true,
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

/* This task triggers the usemin task and takes delete as it's dependency*/
gulp.task('useminTrigger', ['deleteDistFolder'], function() {
  gulp.start('usemin');
})
/*
This uses the comments 'build:css, build:js' and the path for the files that we want pipe to the dist folder
It aslo pipes the html file to the dist folder.

The styles and scripts folders are added as dependencies that every time we run the build,
it has the updated styles and scripts.
*/

gulp.task('usemin', ['styles', 'scripts'], function() {
  return gulp.src("./app/index.html")
    .pipe(usemin({
      // css: [rev(), cssnano()],
      //  js: [rev(), uglify()]
      css: [function() {return rev()}, function() {return cssnano()} ],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest('./docs'));
})



gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optomizeImages', 'useminTrigger']);

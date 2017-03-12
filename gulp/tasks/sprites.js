
var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var rename = require('gulp-rename');
var del = require('del');

var config = {
  mode: {
    css: {
      // Cleans the svg name.
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

// Every time the icon folder is updated, new svg with set of icon is created. This deletes the old sprite folder in the root temp when it is updated.
gulp.task('beginClean', function() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
})

// We need to add the beginClean task as dependency to this task so it deletes the older file before creates.
gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    // Squash the icons into one
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

// This copies the icons themselves from the root temp folder to the working folder
gulp.task('copySpriteGraphic', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
})

// Copies the sprite.css file from the compiled temp folder to the modules
// We need to add the createSprite as dependency. So first the file is created and then deleted.
gulp.task('copySpriteCSS', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

// Once everything ran, we no longer need the sprite folder in the root temp. At the end we need to clean it.
// We want this task run after copySpriteGraphic and copySpriteCSS. So we need to add both as dependency
gulp.task('endClean',['copySpriteGraphic', 'copySpriteCSS'], function() {
  return del('./app/temp/sprite');
});

// This initializes all the tasks.
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);

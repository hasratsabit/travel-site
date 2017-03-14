
var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var rename = require('gulp-rename');
var del = require('del');
var svg2png = require('gulp-svg2png');

var config = {
  // This creates space between icons when it is sprite.
  // Otherwise there will be lines over some icons.
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        // This method is added after modernizr config
        // The method is added to gulp template sprite.css file for older browsers when .no-svg is added
        replaceSvgWithPng: function() {
          return function(sprite, render) {
            // Takes any sprite icon and removes the svg addition and adds png
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
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

// Creates svg to png copy to add support for older browser
// It takes the creatSprite as its dependency
gulp.task('createPngCopy', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});
// This copies the icons themselves from the root temp folder to the working folder
// DEPRECATED: First this task had createSprite as its dependency, but after createPngCopy task is created, this is deprecated.
// Instead of createSprite we add createPngCopy as its dependency
gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});



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
gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);

// Variables
var autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  del = require('del'),
  gulp = require('gulp'),
  minifycss = require('gulp-minify-css'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  images = require('gulp-imagemin'),
  browserSync = require('browser-sync').create();

// paths
var styleSrc = 'source/sass/**/*.sass',
  styleDest = 'build/assets/css/',
  htmlSrc = 'source/',
  htmlDest = 'build/',
  vendorSrc = 'source/js/vendors/',
  vendorDest = 'build/assets/js/',
  scriptSrc = 'source/js/*.js',
  scriptDest = 'build/assets/js/';

// SASS Task
gulp.task('sass', function() {
  gulp
    .src('source/sass/**/*.sass')
    .pipe(plumber())
    .pipe(
      sass({
        style: 'compressed'
      })
    )
    .pipe(
      rename({
        basename: 'main',
        suffix: '.min'
      })
    )
    .pipe(autoprefixer())

    .pipe(gulp.dest('build/assets/css'));
});

// Images Task
gulp.task('images', function() {
  gulp
    .src('source/img/*')
    .pipe(images())
    .pipe(gulp.dest('build/assets/img'));
});

// JavaScript Task
gulp.task('scripts', function() {
  gulp
    .src('source/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'));
});

// Vendors Task
gulp.task('vendors', function() {
  gulp
    .src(['source/js/vendors/jquery.min.js', 'source/js/vendors/*.js'])
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'));
});

// Watch Task
gulp.task('watch', function() {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: './build'
    },
    notify: false
  });

  gulp.watch(styleSrc, ['sass']);
  gulp.watch(scriptSrc, ['scripts']);
  gulp.watch(vendorSrc, ['vendors']);
  gulp
    .watch([
      'build/*.html',
      'build/assets/css/*.css',
      'build/assets/js/*.js',
      'build/assets/js/vendors/*.js'
    ])
    .on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'vendors', 'watch'], function() {});

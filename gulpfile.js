'use strict';

// Load plugins
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const webpack = require('webpack');
const webpackconfig = require('./gulpwebpack.js');
const webpackstream = require('webpack-stream');

// BrowserSync
function appSync(done) {
  browsersync.init({
    server: {
      baseDir: './dist/',
      index: 'index.html'
    },
    port: 3000
  });

  done();
};

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
};

// Clean assets
function clean() {
  return del(['./dist/']);
};

// Optimize Images
function images() {
  return gulp
    .src('./src/app/assets/**/*')
    .pipe(newer('./dist/assets'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest('./dist/assets'));
};

// CSS task
function css() {
  return gulp
    .src('./src/app/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browsersync.stream());
};

// Transpile, concatenate and minify scripts
function scripts() {  
  return gulp
      .src(['./src/app/**/**/*.js'])
      .pipe(plumber())
      .pipe(webpackstream(webpackconfig, webpack))
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest('./dist'))
      .pipe(browsersync.stream());
};

// Watch files
function watchFiles() {
  gulp.watch('./src/app/scss/**/**/*.scss', css);
  gulp.watch('./src/app/**/*.js', gulp.series(scripts));
  gulp.watch('./src/app/*.html', gulp.series(browserSyncReload));
  gulp.watch('./src/assets/**/*', images);
};

// Tasks
// gulp.task("images", images);
gulp.task('css', css);
gulp.task('js', gulp.series(scripts));
gulp.task('clean', clean);

// build
gulp.task('build', gulp.series(clean, css, images, gulp.parallel('js')));
 
// watch
gulp.task('watch', gulp.parallel(watchFiles, appSync));
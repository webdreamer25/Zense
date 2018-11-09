const { series } = require('gulp');

function clean(cb) {
  cb();
}

function build(cb) {
  cb();
}

function minify(cb) {
  cb();
}

function transpile(cb) {
  cb();
}

function livereload(cb) {
  cb();
}

if (process.env.NODE_ENV === 'production') {
  exports.build = series(transpile, minify);
  
} else {
  exports.build = series(transpile, livereload);
}

exports.default = series(clean, build);
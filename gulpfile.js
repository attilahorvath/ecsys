const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const del = require('del');

gulp.task('compile', () => {
  gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('compiled'));
});

gulp.task('browserify', () => {
  browserify('compiled/ecsys.js')
  .bundle()
  .pipe(source('ecsys.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
  del('compiled');
  del('dist');
});

gulp.task('default', ['compile', 'browserify']);

const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const del = require('del');

gulp.task('clean', () => {
  return del(['compiled', 'dist']);
});

gulp.task('compile', ['clean'], () => {
  return gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('compiled'));
});

gulp.task('browserify', ['compile'], () => {
  return browserify('compiled/ecsys.js')
  .bundle()
  .pipe(source('ecsys.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['browserify']);

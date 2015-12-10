'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const del = require('del');

gulp.task('clean', () => {
  return del(['lib', 'dist']);
});

gulp.task('compile', ['clean'], () => {
  return gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('lib'));
});

gulp.task('browserify', ['compile'], () => {
  return browserify('lib/lock_smith.js')
  .bundle()
  .pipe(source('lock_smith.js'))
  .pipe(buffer())
  //.pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('default', ['browserify']);

const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber'); // エラー時のタスク停止防止
const debug = require('gulp-debug');
const dartSass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  scss: {
    src: 'css/*.scss', 
    dest: 'css'
  }
}

/**
 * scssタスクで実行する関数
 */
function scss() {
  return gulp.src(paths.scss.src)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(dartSass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(debug({title: 'scss dest:'}));
}

exports.scss = scss; // scssタスク
exports.default = gulp.series(scss); // defaultタスク

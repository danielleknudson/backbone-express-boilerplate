var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');

// Delete the dist directory
gulp.task('clean', function() {
 return gulp.src('./dist')
 .pipe(clean());
});

gulp.task('scripts', function(){
  return gulp.src([
    './site/js/models/*.js',
    './site/js/collections/*.js',
    './site/js/views/*.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

// Copy all other files to dist directly
gulp.task('copy', function() {
  gulp.src('./site/index.html')
      .pipe(gulp.dest('./dist'));

  gulp.src('./site/css/*.css')
      .pipe(gulp.dest('./dist/css'));

  gulp.src(['./site/js/lib/*.js', './site/js/lib/*.map'])
      .pipe(gulp.dest('./dist/js/lib'));
});

gulp.task('watch', function() {
 gulp.watch('site/**/*', ['scripts']);
});

gulp.task('develop', function() {
  gulp.start('scripts');
  nodemon({
    script: './server.js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['./dist']
  })
  .on('start', ['clean', 'scripts', 'copy', 'watch']);
});

gulp.task('default', ['develop']);

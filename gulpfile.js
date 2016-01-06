var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


gulp.task('styles', function() {
  return gulp.src('sass/**.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./css'));
});


gulp.task('browser-sync', function () {
	browserSync.reload()
});


gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['styles']);
  gulp.watch('*.html', ['browser-sync']);
  gulp.watch('css-test/*.css', ['browser-sync']);
});


gulp.task('default', ['styles', 'browser-sync', 'watch'], function() {
    // Serve files from the root of this project
    browserSync.init({
    	server: {
    		port: 80,
    		ui: 81
    	}
    });

});

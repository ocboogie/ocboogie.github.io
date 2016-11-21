'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function() {
    return gulp.src('sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

gulp.task('sass:watch', function() {
    gulp.watch(['sass/**/*.sass'], ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);
/*
gulp.task('styles', function() {
    return gulp.src('sass/styles.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css/'));
});


gulp.task('default',function() {
    gulp.watch('sass/styles.sass',['styles']);
});
*/

var gulp = require('gulp'),
    connect = require('gulp-connect');

var autoprefixer = require('gulp-autoprefixer');
gulp.task('prefix', function() {
    gulp.src('assets/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css'))
    }
);

gulp.task('webserver', function() {
    connect.server();
});

gulp.task('default', ['webserver']);


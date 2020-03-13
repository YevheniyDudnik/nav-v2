const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gulpStylelint = require('gulp-stylelint');
const autoprefixer = require('gulp-autoprefixer');

function style () {
    return gulp.src('./sass/*.scss')
        .pipe(gulpStylelint({
            reporters: [
            {
                formatter: 'string',
                console: true
            }
            ]
        }))
        .pipe(sass({
            outputStyle: 'expanded',
            indentWidth: 4
        }).on('error', sass.logError))
        .pipe(autoprefixer([
            'last 15 versions', '> 1%', 'ie 8', 'ie 7'
        ], { 
            cascade: false 
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
}

function watcher () {
    browserSync.init({
        server: {
            baseDir: './'
        },
        browser: 'chrome'
    })
    gulp.watch('./sass/**/*.scss', style);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watcher;
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fileinclude = require('gulp-file-include');

// SCSS -> CSS
gulp.task('sass', function () {
    return gulp.src('./src/assets/scss/**/*.scss') // Путь исходным SCSS файлам
        .pipe(sass()) // Преобразование SCSS в CSS с помощью gulp-sass
        .pipe(gulp.dest('dist/css')); // Путь к папке, куда сохранять CSS
});

// HTML
gulp.task('fileinclude', function() {
  return gulp.src('src/pages/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', function () {
    gulp.watch('./src/assets/scss/**/*.scss', gulp.series('sass')); // Наблюдение за SCSS файлами
    gulp.watch('./src/**/*.html', gulp.series('fileinclude')); // Наблюдение за HTML файлами
});

// Tasks to run
gulp.task('default', gulp.parallel('sass', 'fileinclude', 'watch'));
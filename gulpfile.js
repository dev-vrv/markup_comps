const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');
const fileinclude = require('gulp-file-include');


// HTML
gulp.task('fileinclude', function() {
  return gulp.src('src/pages/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
});

// SCSS -> CSS
gulp.task('sass', function () {
    return gulp.src('./src/assets/scss/**/*.scss') // Путь исходным SCSS файлам
        .pipe(sass()) // Преобразование SCSS в CSS с помощью gulp-sass
        .pipe(gulp.dest('dist/css')); // Путь к папке, куда сохранять CSS
});

// TypeScript -> JavaScript
gulp.task('typescript', function () {
  return gulp.src('./src/assets/ts/**/*.ts') // Путь к исходным TypeScript файлам
      .pipe(ts()) // Компиляция TypeScript в JavaScript с помощью gulp-typescript
      .pipe(gulp.dest('dist/js')); // Путь к папке, куда сохранять JavaScript
});

// Watch
gulp.task('watch', function () {
  gulp.watch('./src/assets/scss/**/*.scss', gulp.series('sass')); // Наблюдение за SCSS файлами
  gulp.watch('./src/**/*.html', gulp.series('fileinclude')); // Наблюдение за HTML файлами
  gulp.watch('./src/assets/ts/**/*.ts', gulp.series('typescript')); // Наблюдение за TypeScript файлами
});

// Tasks to run
gulp.task('default', gulp.parallel('sass', 'fileinclude', 'typescript', 'watch'));
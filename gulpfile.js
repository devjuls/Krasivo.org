'use strict';

//================== Базовые плагины ===================//
var gulp = require('gulp'),
    watch = require('gulp-watch'), //наблюдение за изменениями файлов
    rename = require("gulp-rename"), //переименование файлов
    include = require('gulp-include'), //инклуд файлов
    rimraf = require('rimraf'), // удаление папок
    argv = require('yargs').argv, // доступ к аргументам команды gulp
    _if = require('gulp-if'), //запуск тасков по условию
    browserSync = require('browser-sync'), //локальный сервер
    reload = browserSync.reload,

//================== Работа с ошибками ===================//
    plumber = require('gulp-plumber'), //отслеживание ошибок
    notify = require('gulp-notify'), //вывод ошибок красиво (всплывающее окно, звук, цвет в консоли)

//================== Работа с CSS ===================//
    sass = require('gulp-sass'), //компиляция SCSS кода
    prefixer = require('gulp-autoprefixer'), //добавление вендорных префиксов к CSS свойствам
    sourcemaps = require('gulp-sourcemaps'), //генерация css sourscemaps
    minify = require("gulp-csso"), //минифицирует css

//================== Работа с JS ===================//
    uglify = require('gulp-uglify'), //сжатие JS

//================== Работа с IMG ===================//
	imagemin = require('gulp-imagemin'), //сжатие картинок
	pngquant = require('imagemin-pngquant'); //сжатие PNG

//================== Отключены но не удалены из json ===================//
    //pug = require('gulp-pug'); //компиляция PUG кода

var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        js: 'build/js/'
    },
    src: {
        //html: 'src/*.pug',
        html: 'src/*.html',
        css: 'src/scss/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        js: 'src/js/main.js'
    },
    watch: {
        //html: 'src/**/*.pug',
        html: 'src/**/*.html',
        css: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: 'build'
};

var config = {
    server: {
        baseDir: "build"
    },
    open: false
},
    configTunnel = {
        server: {
            baseDir: "build"
        },
    tunnel: false,
    browser: 'chrome',
    open: 'tunnel'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(plumber({  //Проверим на ошибки
            errorHandler: notify.onError(function(err){
                return {
                    title: "Html",
                    message: err.message
                }
            })
        }))
        //.pipe(pug({pretty: true}))//Скомпилируем
        .pipe(include()) //Инклудим
            .on('error', console.log)
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .on('end', browserSync.reload) //И перезагрузим сервер
        // .pipe(reload({stream: true})); //И перезагрузим сервер !!!СТАРЫЙ СПОСОБ
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(plumber({  //Проверим на ошибки
            errorHandler: notify.onError(function(err){
                return {
                    title: "JavaScript",
                    message: err.message
                }
            })
        }))
        .pipe(_if(argv.prod, sourcemaps.init())) //Инициализируем sourcemap
        //.pipe(sourcemaps.init()) //Инициализируем sourcemap

        .pipe(include()) //Инклудим
            .on('error', console.log)
        // .pipe(gulp.dest(path.build.js)) //Выплюнем файл в build

        .pipe(_if(argv.prod, uglify())) //Сожмем наш js
        //.pipe(uglify()) //Сожмем наш js
        .pipe(_if(argv.prod, sourcemaps.write('.'))) //Пропишем карты
        //.pipe(sourcemaps.write('.')) //Пропишем карты

        .pipe(rename("main.min.js")) //Переименовываем файл
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .on('end', browserSync.reload) //И перезагрузим сервер
        // .pipe(reload({stream: true})); //И перезагрузим сервер !!!СТАРЫЙ СПОСОБ
});

gulp.task('css:build', function () {
    gulp.src(path.src.css) //Выберем наш main.scss
        .pipe(plumber({ //Проверим на ошибки
            errorHandler: notify.onError(function(err){
                return {
                    title: "CSS",
                    message: err.message
                }
            })
        }))
        .pipe(_if(argv.prod, sourcemaps.init())) //То же самое что и с js
        //.pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass().on('error', sass.logError)) //Скомпилируем
        .pipe(prefixer({ //Добавим вендорные префиксы
                browsers: [
                "last 1 versions",
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Opera versions",
                "last 2 Edge versions",
                "last 4 IE versions"],
                cascade: false}))
        // .pipe(gulp.dest(path.build.css)) //Выплюнем готовый файл в build
        .pipe(_if(argv.prod, minify())) //Минифицируем
        //.pipe(minify()) //Минифицируем
        .pipe(_if(argv.prod, sourcemaps.write('.')))
        //.pipe(sourcemaps.write('.'))
        .pipe(rename("style.min.css")) //Переименовываем файл
        .pipe(gulp.dest(path.build.css)) //Записываем переименованый файл
        .on('end', browserSync.reload) //И перезагрузим сервер
        // .pipe(reload({stream: true})); //И перезагрузим сервер !!!СТАРЫЙ СПОСОБ
});

gulp.task('img:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(_if(argv.prod, imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        })))
        // .pipe(imagemin({ //Сожмем их
        //     progressive: true,
        //     svgoPlugins: [{removeViewBox: false}],
        //     use: [pngquant()],
        //     interlaced: true
        // }))
        .pipe(gulp.dest(path.build.img)) //Бросим в build
        .on('end', browserSync.reload) //И перезагрузим сервер
        // .pipe(reload({stream: true})); //И перезагрузим сервер !!!СТАРЫЙ СПОСОБ
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'css:build',
    'fonts:build',
    'img:build',
    'js:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('webserverTunnel', function () {
    browserSync(configTunnel);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);




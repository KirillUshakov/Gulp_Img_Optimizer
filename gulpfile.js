// Переменные
const { src, dest, parallel, series, watch } = require('gulp')

var defaultpath = 'app/img/default/**/*';
    optimizedpath = 'app/img/optimized/';

var gulp = require("gulp"); // Задаем глобальный gulp
    imagemin = require('gulp-imagemin'), // Сжатие изображений
    imageminJpg = require('imagemin-jpeg-recompress');
    imageminPng = require('imagemin-pngquant');
    removeFiles = require('gulp-remove-files');

// Functions
function images(){
    return src(defaultpath) 
    .pipe(imagemin([
        imageminJpg({
            loops: 5,
            min: 65,
            max: 70,
            quality: 'medium'
        }),
        
        imagemin.gifsicle(),
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    
    .pipe(dest(optimizedpath))
};

function startwatch(){
   watch(defaultpath, images);
};


// Exports
exports.images = images
exports.default  = series(images, startwatch)
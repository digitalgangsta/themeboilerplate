// Gulp 4
var gulp       = require('gulp'); 
var plumber    = require("gulp-plumber");
// var del     = require('del');

// CSS related plugins.
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var mmq          = require('gulp-merge-media-queries');
var cssnano      = require("gulp-cssnano");
var stylelint    = require('gulp-stylelint');
var scsslint     = require('gulp-scss-lint');
var sassLint     = require('gulp-sass-lint');

// JS related plugins.
var concat       = require('gulp-concat'); // Concatenates JS files
var uglify       = require('gulp-uglify'); // Minifies JS files
var eslint       = require("gulp-eslint");
//var amdOptimize  = require('amd-optimize');


// Image realted plugins.
var imagemin     = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin.

// Utility related plugins.
var rename       = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
var sourcemaps   = require('gulp-sourcemaps');
var notify       = require('gulp-notify');

// BrowserSync.
var browserSync  = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronised browser testing.
var reload       = browserSync.reload; // For manual browser reload.

// Project related.
var project                 = 'BestResponseMedia'; // Project Name.
var projectURL              = 'http://localhost/theme/'; // Local project URL of your already running WordPress site. Could be something like local.dev or localhost:8888.
var themeURL                = './'; // Theme/Plugin URL. Leave it like it is, since our gulpfile.js lives in the root folder.

// Style related.
var styleSRC                = './web/css/*.scss'; // Path to main .scss file.
var styleDestination        = './web/css/'; // Path to place the compiled CSS file.

// Images related.
var imagesSRC               = './web/images/raw/**/*.{png,jpg,gif,svg}'; 
var imagesDestination       = './web/images/';

// JS Vendor related.
var jsVendorSRC             = './web/js/lib/**/*.js';
var jsVendorDestination     = './web/js/';
var jsVendorFileName        = 'js-libs';

// JS Custom related.
var jsCustomSRC             = './web/js/src/**/*.js';
var jsCustomDestination     = './web/js/';
//var jsCustomFileName        = 'js-custom';

// Watch files paths.
var styleWatchFiles         = './web/css/**/*.scss'; // Path to all *.scss files inside css folder and inside them.
var vendorJSWatchFiles      = './web/js/lib/**/*.js'; // Path to all vendor JS files.
var customJSWatchFiles      = './web/js/src/**/*.js'; // Path to all custom JS files.

const AUTOPREFIXER_BROWSERS = [
  'last 2 version',
  '> 1%',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4',
  'bb >= 10'
];


// BrowserSync
function browserSyncd(done) {
  browserSync.init({
    proxy: projectURL,
    open: true,
    injectChanges: true,
    // port: 7000,
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

/////////////////////
// CSS task
////////////////////
function styles() {
  return gulp
    .src(styleSRC)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded',
      precision: 10 
    }))

    .on('error', console.error.bind(console))
    .pipe(sourcemaps.write({
      includeContent: false, 
      addComment: false
    }))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(gulp.dest(styleDestination))
    
    //
    // start min version
    //
    .pipe(mmq({
      log: true
    }))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))

    // .pipe(stylelint({
    //   failAfterError: true,
    //   reporters: [{
    //     formatter: 'string',
    //     console: true
    //   }]
    // }))

    .pipe(browserSync.stream()) 
    
    .pipe(cssnano({
      discardComments: {
        removeAll: true
      },
      discardEmpty: {
        removeAll: true
      }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(styleDestination))
    
    .pipe(browserSync.stream())

    .pipe(notify({
      message: 'TASK: "CSS" Completed! 💯',
      onLast: true
    }))
}
/////////////////////
// lint Css
////////////////////

function lintcss() {
  return gulp
  .src(styleDestination + 'styles.css')
  .pipe(stylelint({
      failAfterError: false,
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }))
}

function lintscss() {
  return gulp
  .src(styleWatchFiles)
  .pipe(sassLint())
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
}

/////////////////////
// Images task
////////////////////
function images() {
  return gulp
  .src(imagesSRC)
  .pipe(imagemin( {
    progressive: true,
    optimizationLevel: 3, // 0-7 low-high
    interlaced: true,
    svgoPlugins: [{removeViewBox: false}]
  }))
  .pipe(gulp.dest(imagesDestination))
  .pipe(notify({
    message: 'TASK: "Images" Completed! 💯',
    onLast: true
  }))
}

/////////////////////
// CustomJS task
////////////////////
function customjs() {
  return gulp
  .src(jsCustomSRC)
  
  .pipe(eslint({configFile: 'eslintrc'}))
  .pipe(eslint.format())
  .pipe(eslint.failOnError())
  
  //.pipe(amdOptimize('./web/js/index'))

  //.pipe(concat(jsCustomFileName + '.js'))
  // .pipe(gulp.dest(jsCustomDestination))
  // .pipe(rename({
  //   basename: jsCustomFileName,
  //   suffix: '.min'
  // }))
  .pipe(uglify())
  .pipe(gulp.dest(jsCustomDestination))
  .pipe(notify({
    message: 'TASK: "customJS" Completed! 💯',
    onLast: true
  }))
}

/////////////////////
// vendorsJs task
////////////////////
// function vendorsjs() {
//   return gulp
//   .src(jsVendorSRC)

//   // .pipe(eslint({configFile: 'eslintrc'}))
//   // .pipe(eslint.format())
//   // .pipe(eslint.failOnError())

//   .pipe(concat(jsVendorFileName + '.js'))
//   .pipe(gulp.dest(jsVendorDestination))
//   .pipe(rename({
//     basename: jsVendorFileName,
//     suffix: '.min'
//   }))
//   .pipe(uglify())
//   .pipe(gulp.dest(jsVendorDestination))
//   .pipe(notify({
//     message: 'TASK: "vendorsJs" Completed! 💯',
//     onLast: true
//   }))
// }

/////////////////////
// Watch task o_O
////////////////////
function watchFiles() {
  gulp.watch(styleWatchFiles, styles);
  //gulp.watch(vendorJSWatchFiles, vendorsjs);
  gulp.watch(customJSWatchFiles, customjs);
}

///////////////////////////////////////////
exports.styles = styles;
exports.lintcss = lintcss;
exports.lintscss = lintscss;
exports.images = images;
exports.customjs = customjs;
//exports.vendorsjs = vendorsjs;
exports.watch = gulp.parallel(watchFiles, browserSyncd);
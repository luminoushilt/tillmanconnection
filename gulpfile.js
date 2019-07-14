// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

var gulp 			= require('gulp'),
	pug				= require('gulp-pug'),
	sass        	= require('gulp-sass'),
	plumber 		= require('gulp-plumber'),
	prefix 			= require('gulp-autoprefixer'),
	image 			= require('gulp-imagemin'),
	cleanCSS		= require('gulp-clean-css'),
	uglify 			= require('gulp-uglify'),
	pump			= require('pump'),
	config 			= require('./config.json'), // external config file
	browserSync 	= require('browser-sync').create();


// --------------------------------------------------------------------
// Path Settings
// --------------------------------------------------------------------

var code   = config.code;
var output = config.output;
var uri    = config.config;

// --------------------------------------------------------------------
// Error Handler
// --------------------------------------------------------------------

var onError = function(err) {
	console.log(err);
	this.emit('end');
};


// --------------------------------------------------------------------
// Task: Pug
// --------------------------------------------------------------------

gulp.task('pug', function buildHTML() {

	return gulp.src(code.pug)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(pug())
		.pipe(gulp.dest(output.root))
		.pipe(browserSync.stream());
});

// --------------------------------------------------------------------
// Task: Sass
// --------------------------------------------------------------------

gulp.task('sass', function() {

	return gulp.src(code.sass)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass({
			includePaths: ['css'],
			outputStyle: 'expanded',
			onError: browserSync.notify
		}))
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(gulp.dest(output.cssOut))
		.pipe(browserSync.stream());
});


// --------------------------------------------------------------------
// Task: Image Compression
// --------------------------------------------------------------------

gulp.task('image', function() {
	return gulp.src(code.img)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(image())
		.pipe(gulp.dest(output.img));
});

// --------------------------------------------------------------------
// Task: Move JS
// --------------------------------------------------------------------

gulp.task('js', function() {
	return gulp.src(code.js)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(gulp.dest(output.js));
});

// --------------------------------------------------------------------
// Task: Compress JS
// --------------------------------------------------------------------

gulp.task('compress-js', function() {
	pump([
        gulp.src(code.js),
        uglify(),
        gulp.dest(output.js)
	    ],
	    cb
	);
});

// --------------------------------------------------------------------
// Task: Compress CSS
// --------------------------------------------------------------------

gulp.task('compress-css', function() {
	return gulp.src(output.cssIn)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(cleanCSS({compatibility: 'ie9'}))
		.pipe(gulp.dest(output.cssOut));
});

// --------------------------------------------------------------------
// Task: Browser Sync Server
// --------------------------------------------------------------------

gulp.task('serve', ['pug', 'sass', 'image', 'js'], function() {
	browserSync.init({
		server: {
			baseDir: output.root
		}
	});
});

// --------------------------------------------------------------------
// Task: Watch
// --------------------------------------------------------------------

gulp.task('watch', function() {
	gulp.watch(code.pug, ['pug']);
	gulp.watch([code.sass, code.sassDir], ['sass']);
	gulp.watch(code.img, ['image']);
	gulp.watch(output.php).on('change', browserSync.reload);
	gulp.watch(code.js, ['js']).on('change', browserSync.reload);
});

// --------------------------------------------------------------------
// Task: Build Project
// --------------------------------------------------------------------

gulp.task('build', ['compress-css', 'compress-js']);

// --------------------------------------------------------------------
// Task: Default
// --------------------------------------------------------------------

gulp.task('default', ['serve', 'watch']);
// Based on https://gist.github.com/feliperoberto/9793674
var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');
var uglify = require('gulp-uglify');
var del = require('del');

var browserSync = require('browser-sync');

var bases = {
	dist: 'dist',
};

var paths = {
	// scripts: ['scripts/*.js', 'scripts/*.js'],
	scripts: ['scripts/*.js'],
	libs: ['scripts/local/*.js'],
	html: ['*.html'],
	styles: ['style/*.css'],
	assets: ['assets/**/*'],
	data: ['data/*']
}

gulp.task('sass', function() {
	gulp
		.src('style/style.scss') // Get the sass/scss file
		.pipe(sass({ includePaths: ['scss'] })) // Pipe the sass/scss through the sass()
		.pipe(gulp.dest('style')); // Output to the destination map style
});

gulp.task('browser-sync', function() {
	browserSync.init(['*.html', 'style/*.css', 'scripts/*.js'], {
		// Watch all these fiel types for changes
		server: {
			// All the browser-sync configs can be put here
			baseDir: './'
		}
	});
});



gulp.task('build', ['clean', 'scripts', 'copy']);

gulp.task('clean', function() {
	console.log('Clean all files in build folder');
	// return gulp.src('dist/**/*', { read: false })
	// 	.pipe(clean());

	return del([
		'dist/**/*'
	]);
 });

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(babel({
			presets: ['babel-preset-es2017'],
			plugins: ['babel-plugin-transform-object-rest-spread']
		}))
		.pipe(uglify())
		.pipe(gulp.dest(bases.dist + '/scripts'));
});

// Copy all other files to dist directly
gulp.task('copy', function() {
	// Copy html
	gulp.src(paths.html)
		.pipe(gulp.dest(bases.dist));
  
	// Copy styles
	gulp.src(paths.styles)
		.pipe(gulp.dest(bases.dist + '/style'));
  
	// Copy lib scripts, maintaining the original directory structure
	gulp.src(paths.libs)
		.pipe(gulp.dest(bases.dist + '/scripts/local'));

	// Copy the assets
	gulp.src(paths.assets)
		.pipe(gulp.dest(bases.dist + '/assets'));

		// Copy the assets
	gulp.src(paths.data)
		.pipe(gulp.dest(bases.dist + '/data'));
});
// gulp.task('copy', function() {
// 	// Copy html
// 	gulp.src(paths.html)
// 		.pipe(gulp.dest(bases.dist));
  
// 	// Copy styles
// 	gulp.src(paths.styles)
// 		.pipe(gulp.dest(bases.dist + '/style'));
  
// 	// Copy lib scripts, maintaining the original directory structure
// 	gulp.src(paths.libs)
// 		.pipe(gulp.dest(bases.dist + '/scripts/local'));

// 	// Copy the assets
// 	gulp.src(paths.assets)
// 		.pipe(gulp.dest(bases.dist + '/assets'));
// });


// The default task - dev 
// First executing the sass THEN browser-sync
gulp.task('default', ['sass', 'browser-sync'], function() {
	gulp.watch('*/*.scss', ['sass']); // Watching all scss changes on changes in the background
});

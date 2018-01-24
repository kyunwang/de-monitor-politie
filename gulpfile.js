// Based on https://gist.github.com/feliperoberto/9793674
var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require("gulp-concat");
var browserSync = require('browser-sync');

var bases = {
	dist: 'dist',
};

var paths = {
	// scripts: ['scripts/local/*.js', 'scripts/*.js'],
	scripts: ['scripts/*.js'],
	html: ['*.html'],
	styles: ['style/*.css'],
}

gulp.task('sass', function () {
	gulp
		.src('style/style.scss') // Get the sass/scss file
		.pipe(sass({ includePaths: ['scss'] })) // Pipe the sass/scss through the sass()
		.pipe(gulp.dest('style')); // Output to the destination map style
});

gulp.task('browser-sync', function () {
	browserSync.init(['*.html', 'style/*.css', 'scripts/*.js'], {
		// Watch all these fiel types for changes
		server: {
			// All the browser-sync configs can be put here
			baseDir: './'
		}
	});
});

gulp.task('build', function () {
	// gulp.src(paths.scripts.concat(paths.html))
	// 	.pipe(gulp.dest(paths.dist));

	// gulp.src('src/**/*.js')
	// gulp.src(paths.scripts)
	// 	.pipe(sourcemaps.init())
	// 	.pipe(babel({
	// 		presets: ['@babel/env']
	// 	}))
	// 	// .pipe(concat('all.js'))
	// 	.pipe(sourcemaps.write('.'))
	// 	.pipe(gulp.dest(bases.dist))

	// gulp.src(paths.scripts)
	// 	.pipe(sourcemaps.init())
	// 	.pipe(babel({
	// 		presets: ['babel-preset-es2017'].map(require.resolve)
	// 	}))
	// 	.pipe(concat("all.js"))
	// 	.pipe(sourcemaps.write("."))
	// 	.pipe(gulp.dest("dist"));

		return gulp.src('scripts/**/*.js')
			.pipe(babel())
			.pipe(gulp.dest('build'));
});

// The default task
// First executing the sass THEN browser-sync
gulp.task('default', ['sass', 'browser-sync'], function () {
	gulp.watch('*/*.scss', ['sass']); // Watching all scss changes on changes in the background
});

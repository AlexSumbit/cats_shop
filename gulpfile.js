let gulp            = require('gulp'),
	scss            = require('gulp-sass'),
	browserSync     = require('browser-sync'),
	autoprefixer    = require('gulp-autoprefixer'),
	nunjucks        = require('gulp-nunjucks'),
	concat          = require('gulp-concat'),
	iconfont        = require('gulp-iconfont'),
	iconfontCss     = require('gulp-iconfont-css');


gulp.task('scss', function() {
	return gulp.src('src/style/main.scss')
		.pipe(scss().on( 'error', function( error )
			{console.log( error );} )
		)
		.pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
		.pipe(gulp.dest('src/style'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('nunjucks', function () {
	return gulp.src('src/template/index.html')
		.pipe(nunjucks.compile())
		.pipe(gulp.dest('src'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('iconfont', function(){
	gulp.src(['src/icon/*.svg'])
		.pipe(iconfontCss({
			fontName: 'icons',
			path: 'src/style/templates/_icons.scss',
			targetPath: '../style/_icons.scss',
			fontPath: '../font/'
		}))
		.pipe(iconfont({
			fontName: 'icons',
			normalize: true,
			fontHeight: 1001
		}))
		.pipe(gulp.dest('src/font/')
	);
});

gulp.task('default', ['browser-sync', 'nunjucks', 'scss'], function() {
	gulp.watch('src/style/**/*.scss', ['scss']);
	gulp.watch('src/template/**/*.html', ['nunjucks', browserSync.reload]);
	gulp.watch('src/style/**/*.css', browserSync.reload);
	gulp.watch('src/script/**/*.js', browserSync.reload);
});
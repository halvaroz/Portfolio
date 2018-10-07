let gulp = require('gulp')
let compass = require('gulp-compass')
let useref = require('gulp-useref')
let filter = require('gulp-filter')
let uglify = require('gulp-uglify-es').default
let minifyCss = require('gulp-minify-css')
let livereload = require('gulp-livereload')
let imagemin = require('gulp-imagemin')

let jsFilter = filter('**/*.js',{restore : true})
let cssFilter = filter('**/*.css',{restore : true})

gulp.task('default',function(){
	console.log('here')

	 gulp.src('img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))

    return gulp.src('*.phtml')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(minifyCss())
        .pipe(cssFilter.restore)
        .pipe(gulp.dest('dist'));
})


gulp.task('watch',function(){
	let server = livereload()
	
	gulp.watch(['*.phtml', 'js/*.js', 'css/*.css']).on('change',function(event){
		console.log(event);
		server.changed(event.path)
	})
})
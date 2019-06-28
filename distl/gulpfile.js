const gulp = require("gulp");
const connect = require("gulp-connect");
const scss = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const babel = require("gulp-babel");
//把gulp要实现的功能，放到任务里

gulp.task("copyHtml",function(){
	gulp.src("*.html").pipe(gulp.dest("dist")).pipe(connect.reload());
;
});
gulp.task("copyjs",function(){
	gulp.src("*.js").pipe(gulp.dest("dist")).pipe(connect.reload());
;
});
gulp.task("copyImg",function(){
	gulp.src("imgs/**").pipe(gulp.dest("dist/imgs"));
});
gulp.task("copyData",function(){
	gulp.src(["xml/*.xml","json/*.json"]).pipe(gulp.dest("dist/data"));
});
gulp.task("scss",function(){
	gulp.src("scss/*.scss")
	.pipe(sourcemaps.init())
	.pipe(scss({"outputStyle": 'nested'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"));
});
gulp.task("concat",function(){
	gulp.src(["js/a.js","js/b.js"])
	.pipe(concat("main.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename("main.min.js"))
	.pipe(gulp.dest("dist/js"));
});
gulp.task("uglify",function(){
	gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename({suffix: ".min"}))
	.pipe(gulp.dest("dist/js"));
});
gulp.task("cleanCss",function(){
	gulp.src("css/*.css")
	.pipe(cleanCss())
	.pipe(gulp.dest("dist/css"));
})
gulp.task("babel",function(){
	gulp.src("js/es6.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/js"));
})
gulp.task("watch",function(){
	gulp.watch("*.html",["copyHtml"]);
	gulp.watch("*.js",["copyjs"]);
	gulp.watch("imgs/**",["copyImg"]);
	gulp.watch(["xml/*.xml","json/*.json"],["copyData"]);
	gulp.watch("scss/*.scss",["scss"]);
});

gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true 
	})
})


gulp.task("build",["copyHtml","copyImg","copyData","scss","copyjs"]);

gulp.task("default",["server","watch"]);

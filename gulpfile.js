let gulp = require("gulp");
let ts = require("gulp-typescript");
const tscConfig = require('./tsconfig.json');
const gulpTypescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
let tsProject = ts.createProject("tsconfig.json");

gulp.task("compile", async () => {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(gulpTypescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series("compile"));

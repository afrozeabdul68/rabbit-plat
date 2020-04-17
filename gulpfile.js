const gulp = require('gulp');
const args = require("yargs").argv;
const rename = require('gulp-rename');
const clean = require('gulp-clean');


gulp.task('del', function () {
    return gulp.src('.env', {read: false, allowEmpty: true})
        .pipe(clean());
});

gulp.task('move', function () {
    return gulp
        .src(['env/.env.' + args.env])
        .pipe(rename('.env'))
        .pipe(gulp.dest('./'));
});

gulp.task('set', gulp.series('del', 'move'))



//https://medium.com/commutatus/multi-environment-variable-setup-for-react-native-application-70fde4de657f


// gulp set --env=development
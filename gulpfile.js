const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

gulp.task("default", () => {
  return gulp.watch("css/*.scss", () => {
    return (
      gulp.src("css/*.scss")
          .pipe(sass())
          .pipe(gulp.dest("css"))
          .on("error", sass.logError)
    );
  })
});

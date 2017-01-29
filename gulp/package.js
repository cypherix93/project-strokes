const del = require("del");
const merge = require("merge-stream");
const runSequence = require("run-sequence");

module.exports = function(gulp, plugins, paths, project)
{
    // Deploy App
    gulp.task("package", ["build"], function ()
    {
        var serverPaths = [
            paths.build + "/server/**/*",
            paths.root + "/pacakge.json"
        ];
        
        var clientPaths = [
            paths.build + "/client/**"
        ];
        
        var server = gulp.src(serverPaths)
            .pipe(plugins.zip("server.zip", {compress: true}))
            .pipe(gulp.dest(paths.deploy));
        
        var client = gulp.src(clientPaths)
            .pipe(plugins.zip("client.zip", {compress: true}))
            .pipe(gulp.dest(paths.deploy));
        
        return merge(server, client);
    });
};

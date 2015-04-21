module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            script: {
                files: ["*.js", "**/*.js", "!node_modules/"],
                tasks: ["jshint"]
            }
        },
        jshint: {
            all: ["Gruntfile.js", "asserts/*.js", "rules/*.js"]
        }
    });
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask("default", ["watch"]);
};

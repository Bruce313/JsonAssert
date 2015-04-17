module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            script: {
                files: ["Gruntfile.js", "asserts/*.js", "rules/*.js"],
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

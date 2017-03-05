module.exports = function (grunt) {

    grunt.initConfig({
        copy: {
            files: {
                src: ['CNAME', '**/*.*', '!Gruntfile.*', '!package.json', '!node_modules/**', '!commit/**'],
                dest: './commit/',
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['copy']);
}

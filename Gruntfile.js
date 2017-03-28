module.exports = function (grunt) {

    grunt.initConfig({
        copy: {
            files: {
                src : ['./i/**', './font/**', './js/**', 'index.html', 'CNAME'],
                dest: './public/',
            }
        },

        sass: {
            options: {
                sourceMap  : true,
                outputStyle: 'compressed',
            },
            files: {
                src : './scss/bundle.scss',
                dest: './public/css/bundle.min.css',
            }
        },

        babel: {
            options: {
                sourceMap   : true,
            },
            files: {

            },
        },

        watch: {
            dev: {
                files: ['index.html', './scss/*', './js/*'],
                tasks: ['default'],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', ['sass', 'copy']);
}

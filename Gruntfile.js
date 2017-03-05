module.exports = function (grunt) {
    'use strict';

    let $ = require('jquery');

    console.log($)
    for (var i in $) {
        console.log(i);
    }

    /*
    $.ajax({
        url: 'http://music.163.com/api/playlist/detail?id=427756070',
        type: 'GET',
        dataType: 'JSON',
    })
    .done(console.log)
    */

    grunt.initConfig({
        connect: {
            mirror: {
                options: {
                    base: 'music.163.com',
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', []);
}

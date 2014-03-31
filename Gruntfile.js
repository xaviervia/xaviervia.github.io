// Generated on 2014-03-31 using generator-website 0.1.0
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '*.html',
                    '{.tmp,./}/styles/{,*/}*.css',
                    '{.tmp,./}/js/{,*/}*.js',
                    'css/*.css',
                    'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, '.')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'build')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'build/*',
                            '!build/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'js/{,*/}*.js'
            ]
        },
        rev: {
            dist: {
                files: {
                    src: [
                        'build/js/{,*/}*.js',
                        'build/styles/{,*/}*.css',
                        'build/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        'build/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                dest: 'build'
            },
            html: 'index.html'
        },
        usemin: {
            options: {
                dirs: ['build']
            },
            html: ['build/{,*/}*.html'],
            css: ['build/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'img',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: 'build/img'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'img',
                        src: '{,*/}*.svg',
                        dest: 'build/img'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    'build/styles/main.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [
                    {
                        expand: true,
                        cwd: './',
                        src: '*.html',
                        dest: 'build'
                    }
                ]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: './',
                        dest: 'build',
                        src: [
                            '*.{ico,txt}',
                            '.htaccess',
                            'img/{,*/}*.{webp,gif}',
                            'styles/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/img',
                        dest: 'build/img',
                        src: [
                            'generated/*'
                        ]
                    }
                ]
            }
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'cssmin',
        'concat',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);
};

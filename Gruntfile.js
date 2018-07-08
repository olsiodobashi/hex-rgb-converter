const sass = require('node-sass');

module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass
            },
            dist: {
                files: {
                    'dist/css/style.css': 'scss/style.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 1 version']
                    }),
                    require('cssnano')({
                        preset: 'default'
                    })
                ]
            },
            dist: {
                src: 'dist/css/style.css',
                dest: 'dist/css/style.min.css'
            }
        },
        typescript: {
            options: {
                target: 'es5',
                removeComments: true
            },
            commonjs: {
                options: {
                    rootDir: 'ts/'
                },
                src: [
                    'ts/**/*.ts'
                ],
                dest: 'dist/js/'
            }
        },
        watch: {
            all: {
                options: {
                    livereload: true,
                    port: 8888
                },
                files: ['dist/**/*.php', 'less/**/*.less', 'ts/**/*.ts'],
                tasks: ['sass', 'postcss', 'typescript', 'uglify']
            }
        }
    });

    require('jit-grunt')(grunt);
    grunt.registerTask('default', ['sass', 'postcss', 'typescript', 'watch']);
};

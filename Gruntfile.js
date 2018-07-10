const sass = require('node-sass');

module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass
            },
            dist: {
                files: {
                    'assets/css/style.css': 'src/scss/style.scss'
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
                src: 'assets/css/style.css',
                dest: 'assets/css/style.min.css'
            }
        },
        typescript: {
            options: {
                target: 'es5',
                removeComments: true
            },
            commonjs: {
                options: {
                    rootDir: 'src/ts/'
                },
                src: [
                    'src/ts/**/*.ts'
                ],
                dest: 'assets/js/'
            }
        },
        watch: {
            all: {
                options: {
                    livereload: true,
                    port: 8888
                },
                files: ['src/scss/**/*.scss', 'src/ts/**/*.ts'],
                tasks: ['sass', 'postcss', 'typescript']
            }
        }
    });

    require('jit-grunt')(grunt);
    grunt.registerTask('default', ['sass', 'postcss', 'typescript', 'watch']);
};

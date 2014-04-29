'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      compass: {
        files: 'sass/**/*.scss',
        tasks: ['compass']
      },

      framework: {
        files: [
          'assets/js/components/*.js',
          'assets/js/vendor/*.js'
        ],
        tasks: ['build']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },

      all: [
        'Gruntfile.js'
      ]
    },

    concat: {
      library: {
        src: [
          'assets/js/vendor/jquery-1.7.2.min.js',
          'assets/js/vendor/jquery.easing.1.3.js',
          'assets/js/vendor/waypoints.min.js',
          'assets/js/vendor/jquery.stellar.min.js',
          'assets/js/vendor/iscroll.js'
        ],
        dest: 'assets/js/library.js'
      },
      components: {
        src: ['assets/js/components/*.js'],
        dest: 'assets/js/components.js'
      },
    },

    uglify: {
      dist: {
        files: {
          'assets/js/components.min.js': 'assets/js/components.js',
          'assets/js/library.min.js': 'assets/js/library.js'
        }
      }
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    }
  });

  grunt.registerTask('build', ['concat', 'uglify', 'compass']);
  grunt.registerTask('default', ['build']);
};

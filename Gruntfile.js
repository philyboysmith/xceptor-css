module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	svgstore: {
  		options: {
  		  prefix : 'svg-icon-', // This will prefix each ID
        cleanup: true,
        cleanupdefs: true,
        formatting : {
          indent_size : 2
        }
      },
      default : {
        files: {
          'img/svg-defs.svg': ['icons/*.svg'],
        }
      }
    },
    webfont: {
      icons: {
          src: 'icons/*.svg',
          dest: 'fonts',
          options: {
            stylesheet: 'scss',
            relativeFontPath: '../fonts'
          }
      }
    }


  });
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-webfont');
      
    // Default task(s).
  grunt.registerTask('default', ['webfont']);
};
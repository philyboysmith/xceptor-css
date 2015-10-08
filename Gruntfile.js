module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	svgstore: {
  		options: {
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
    }


  });
  grunt.loadNpmTasks('grunt-svgstore');

};
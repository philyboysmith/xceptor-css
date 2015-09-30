module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	svgstore: {
  		options: {
          prefix : 'icon-', // This will prefix each ID
          svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
            xmlns: 'http://www.w3.org/2000/svg',
            includedemo: true
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
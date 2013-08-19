module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	/*notify:{
		watch: {
			options: {
				title: 'Done Grunting!',
				message: 'Sass complete'
			}
		}
	},*/
	dirs: { /* just defining some properties */
		dest: 'lib',
		scss: 'assets/sass/'//,
		//js: 'js/'
	},
	bower: { /* package management */
		dev: {
			dest: 'lib/', 
			options: {
				stripJSAffix: false
			}
		}
	},
	bowerInstall: {
		install: {
			options: {
				verbose: true,
				layout: 'byType',
				cleanTargetDir: true,
				'targetDir':'sources/'
			}
		}
	},
	rename: { /* move files */
		/*fontawesomeFont: {
			src: 'bower_components/font-awesome/font/',
			dest: 'assets/font/'
		},*/
		jquery: {
			src: 'lib/jquery.js',
			dest: 'assets/js/vendor/jquery.js'
		},
		modernizr: {
			src: 'lib/modernizr.js',
			dest: 'assets/js/vendor/modernizr.dev.js'
		},
		requirejs: {
			src: 'lib/requirejs.js',
			dest: 'assets/js/vendor/requirejs.js'
		}
	},
	concat: { /* concatenate javascript */
		script: {
			files: {
				'assets/js/main.dev.js' : ['assets/js/plugins.js','assets/js/vendor/json2html.js','assets/js/vendor/jquery.json2html.js','assets/js/vendor/bonsai.js','assets/js/vendor/main-min.js'] 
			}
		}
	},
	copy: {
		main: {
			files: [
				{expand:true,cwd:'bower_components/font-awesome/css/',src:['font-awesome-ie7.css'], dest: 'assets/css/'},
				{expand:true,cwd:'bower_components/font-awesome/font/',src:['*'],dest: 'assets/font/'}
			]
		}
	},
    uglify: { /* minify javascript */
      options: {
        banner: ''
      },
      build: {
        //src: 'src/<%= pkg.name %>.js',
        //dest: 'build/<%= pkg.name %>.min.js'
		src: 'assets/js/main.dev.js',
		dest: 'assets/js/main-min.js'
      }
    },
	sass: { /* compile Sass */
		options: {
			trace: true,
			compass: true//,
			/*loadPath: [
				'lib/matter'
			]*/
		},
		dist: {
			options: {
				outputStyle: 'compressed'
			},
			files: {
				'assets/css/main.css' : 'assets/sass/main.scss'
			}
		},
		dev: {
			options: {
				outputStyle: 'expanded'
			},
			files: {
				'assets/css/main.css' : 'assets/sass/main.scss'
			}
		} 
	},
	watch: { /* trigger tasks on save */
		options: {
			livereload: true
		},
		scss: {
			files: 'sass/*',
			tasks: ['sass:dev']
		},
		/*script: {
			files: [ 'assets/js/main.js', 'assets/js/plugins.js' ],
			tasks: [ 'concat:script','uglify' ]
		},*/
		/*uglify: {
			files: 'assets/js/main.js',
			tasks: [ 'uglify' ]
		}*/
	},
	clean: {  /* take out the trash  */
		buildLib: {
			dirs:['lib']
		}
	}
  });

  grunt.loadNpmTasks( 'grunt-bower-task' );
  grunt.renameTask( 'bower', 'bowerInstall' );
  grunt.loadNpmTasks( 'grunt-bower' );
  grunt.loadNpmTasks( 'grunt-rename' );
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks( 'grunt-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks('grunt-cleanx');
  //grunt.loadNpmTasks( 'grunt-notify' );

  // Tasks

  grunt.registerTask('default', ['sass:dev','watch']);
  grunt.registerTask('build', ['bowerInstall','bower','rename','copy','sass:dev','concat','uglify','clean']);
  grunt.registerTask('prod',['sass:dist','concat','uglify']);
};

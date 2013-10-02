module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	dirs: { /* just defining some properties */
		lib: './lib',
		assets: './demo/assets/',
		scss: './_build/sass/',
		js: '<%= dirs.assets %>js/',
		css: '<%= dirs.assets %>css/',
	},
	bower: {
		install: {
			options: {
				targetDir: '<%= dirs.lib %>'
			}
		}
	},
	asciify:{
		myBanner: {
			options:{
				font:'larry3d'
			},
			text: 'bonsai'
		}
	},
	concat: { /* concatenate javascript */
		script: {
			options:{
				
			},
			files: {
				'<%= dirs.js %>main-dev.js' : ['<%= dirs.js %>plugins.js','<%= dirs.js %>vendor/json2html.js','<%= dirs.js %>vendor/jquery.json2html.js','<%= dirs.js %>vendor/bonsai.js','<%= dirs.js %>main.js'] 
			}
		}
	},
	copy: {
		main: {
			files: [
				{expand:true,cwd:'./bower_components/font-awesome/css/',src:['font-awesome-ie7.css'], dest: '<%= dirs.css %>'},
				{expand:true,cwd:'./bower_components/font-awesome/font/',src:['*'],dest: './assets/font/'},
				{src: '<%= dirs.lib %>jquery/jquery.js', dest: '<%= dirs.js %>vendor/jquery.js'},
				{src: '<%= dirs.lib %>modernizr/modernizr.js', dest: '<%= dirs.js %>vendor/modernizr.dev.js'},
				{src: '<%= dirs.lib %>requirejs/require.js', dest: '<%= dirs.js %>vendor/require.js'},
				{src: 'bourbon/**/*',cwd: '<%= dirs.lib %>',dest: '<%= dirs.scss %>',expand: true}
			]
		}
	},
    uglify: { /* minify javascript */
      options: {
        banner: '/*!\n<%= asciify_myBanner %> */\n\n'
      },
      build: {
		src: '<%= dirs.js %>main-dev.js',
		dest: '<%= dirs.js %>main-min.js'
      }
    },
  sass: {                              
    dist: {                            
      options: {                       
        style: 'compressed',
        compass: true,
        banner: '/*!\n<%= asciify_myBanner %> */\n\n'
      },
      files: {                         
				'<%= dirs.css %>bonsai.css' : '<%= dirs.scss %>bonsai.scss',
				'<%= dirs.css %>demo.css' : '<%= dirs.scss %>demo.scss'
      }
    },
    dev: {                            
      options: {                      
        style: 'expanded',
        compass: true,
        banner: '/*!\n<%= asciify_myBanner %> */\n\n'
      },
      files: {                        
				'<%= dirs.css %>bonsai.css' : '<%= dirs.scss %>bonsai.scss',
				'<%= dirs.css %>demo.css' : '<%= dirs.scss %>demo.scss'
      }
    }
  },
	watch: { /* trigger tasks on save */
		options: {
			livereload: true
		},
		scss: {
			files: '<%= dirs.scss %>**/*.scss',  
			tasks: ['sass:dev','growl:sass']
		},
		script: {
			files: [ '<%= dirs.js %>main.js', '<%= dirs.js %>plugins.js', '<%= dirs.js %>vendor/bonsai.js' ],
			tasks: [ 'asciify','concat:script','uglify','growl:js' ]
		}
	},
	clean: {  /* take out the trash  */
		build:['lib'],
		prebuild:['<%= dirs.scss %>bourbon/']
	},
	growl:{
		sass : {
			message : "Sass files created",
			title : "grunt"
		},
		js : {
			message : "JavaScript files minified",
			title : "grunt"
		},
		build : {
			title : "grunt",
			message : "Build complete"
		},
		watch : {
			title : "grunt",
			message : "Watching. Grunt has it's eye on you."
		}
	}
  });

  grunt.loadNpmTasks( 'grunt-bower-task' );
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-asciify');
  grunt.loadNpmTasks('grunt-growl');

  // Tasks
  grunt.registerTask('default', ['sass:dev','growl:sass','concat','uglify','growl:js','watch','growl:watch']);
  grunt.registerTask('build', ['clean:prebuild','bower','copy','asciify','sass:dev','growl:sass','concat','uglify','growl:js','clean:build','growl:build']);
  grunt.registerTask('prod',['asciify','sass:dist','growl:sass','concat','uglify','growl:js']);
};

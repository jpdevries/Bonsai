Bonsai
======

Responsive jQuery Tree

## Requirements
### node.js and npm
_Note: If you haven't already you'll first need to [setup node.js and npm](http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/)._  
If you are using [homebrew](http://github.com/mxcl/homebrew) you can setup node.js and npm with these commands:

    brew install node
    curl https://npmjs.org/install.sh | sh
    git clone http://github.com/isaacs/npm.git
    cd npm
    sudo make install

### grunt
_cd to the demo directory of this repository before installing grunt with the below command._

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

	npm install -g grunt-cli

### using grunt tasks
To fetch and update all project dependencies, move libraries into place, compile the Sass, and concatenate and minify the JavaScript:

    grunt build

To compile the Sass, concatenate and minify the JavaScript, and watch appropriate files for changes to trigger appropriate actions:

    grunt
    
To prepare the project for production by compiling the Sass, concatenating and minifiying the JavaScript and crushing images with ImageOptim:

    grunt prod
    




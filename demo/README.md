Bonsai
======

Responsive jQuery Tree

## Getting Started
### Formatting HTML
Using Bonsai is easy as long as you feed it correctly formmated markup to consume. By default, each expandable item should have a 'folder' class, contain atleast one anchor tag and optionally have child folders.
Each anchor tag should have the i tags displayed below and contain a title.

```html
    <div class="bonsai">
        <ul class="section">
          <li class="folder">
            <a class="" href=""><i class="icon-caret-right"></i><i class="icon-doctype icon-columns"></i>Templates<i class="icon-chevron-sign-right"></i></a>
            <ul class="section">
              <li class="folder">
                <a class="" href=""><i class="icon-caret-right"></i><i class="icon-folder icon-doctype icon-folder-close"></i>Navigation<i class="icon-chevron-sign-right"></i></a>
                <ul class="section">
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>header<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>footer<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>navigation<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>main-nav<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>footer-open<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>footer-close<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>wrapper<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>body-content<i class="icon-chevron-sign-right"></i></a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="folder">
            <a class="" href=""><i class="icon-caret-right"></i><i class="icon-doctype icon-list-alt"></i>Fields<i class="icon-chevron-sign-right"></i></a>
            <ul class="section">
              <li class="folder">
                <a class="" href=""><i class="icon-caret-right"></i><i class="icon-folder icon-doctype icon-folder-close"></i>Product<i class="icon-chevron-sign-right"></i></a>
                <ul class="section">
                  <li><a href=""><i class="icon-filetype icon-doctype icon-list-alt"></i>Price<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-list-alt"></i>Inventory<i class="icon-chevron-sign-right"></i></a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="folder">
            <a class="" href=""><i class="icon-caret-right"></i><i class="icon-doctype icon-code"></i>Snippets<i class="icon-chevron-sign-right"></i></a>
            <ul class="section">
              <li class="folder">
                <a class="" href=""><i class="icon-caret-right"></i><i class="icon-folder icon-doctype icon-folder-close"></i>getResources<i class="icon-chevron-sign-right"></i></a>
                <ul class="section">
                  <li><a href=""><i class="icon-filetype icon-doctype icon-code"></i>getResources<i class="icon-chevron-sign-right"></i></a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
```

## Using the Plugin
Call the bonsai jQuery plugin like so on the element(s) of your choice:

```js
$('.bonsai').bonsai();
````

## Contributing Requirements
bonsai uses grunt.js because it's smart. Here's how to get going with it.

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
To fetch and update all [project dependencies](https://github.com/jpdevries/Bonsai/blob/master/demo/bower.json), move libraries into place, compile the Sass, and concatenate and minify the JavaScript:

    grunt build

To compile the Sass, concatenate and minify the JavaScript, and watch appropriate files for changes to trigger appropriate actions:

    grunt
    
To prepare the project for production by compiling the Sass, concatenating and minifiying the JavaScript and crushing images with ImageOptim:

    grunt prod
    



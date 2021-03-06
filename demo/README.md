bonsai.js
======

Responsive jQuery tree for you and me

Contribution Guide
--------------------------------------

In the spirit of open source software development, we encourage community code contribution. To help you get started and before you jump into writing code, be sure to read these important contribution guidelines thoroughly.

What you need
--------------------------------------

In order to build bonsai front end assets, you need to have Node.js/npm latest and git 1.7 or later.
(Earlier versions might work OK, but are not tested.)

For Windows you have to download and install [git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/download/).

Mac OS users should install [Homebrew](http://mxcl.github.com/homebrew/). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.

Linux/BSD users should use their appropriate package managers to install git and Node.js, or build from source
if you swing that way. Easy-peasy.

Installing Grunt & Grunt Packages
----------------------------

First, clone a copy of this git repo by running:

```bash
git clone git://github.com/jpdevries/Bonsai.git
```

Install the [grunt-cli](http://gruntjs.com/getting-started#installing-the-cli) and [bower](http://bower.io/) packages if you haven't before. These should be done as global installs:

```bash
npm install -g grunt-cli
```

Make sure you have `grunt` installed by testing:

```bash
grunt -version
```

Enter the default template directory and install the Node dependencies, this time *without* specifying a global(-g) install:

```bash
cd Bonsai/demo
npm install
```
_Note: `npm install` updates dependencies and should be run whenever you pull from git._

To enable Growl notifications install [terminal-notifier](https://github.com/alextucker/grunt-growl#getting-started) with RubyGems:
```bash
sudo gem install terminal-notifier
```

Grunt Commands
----------------------------

__Build__<br>
Fetch dependencies, move items into place and compile by running:

```bash
grunt build
```

__Watch__<br>
Compile the Sass and watch files for changes type the following:

```bash
grunt
```
_Note: grunt is now watching files for changes. When Sass files are changed CSS will automatically be generated.<br>Install the LiveReload [browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) to inject CSS changes without a page refresh._

__Ship__<br>
Compile Sass and minify for production by running:

```bash
grunt prod
```

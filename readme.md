# Webbackpack

_first experimental indev version_

Webbackpack provides a scheme for mounting JavaScript,
 TypeScript and React.js components into a backend-generated
 HTML page.

Configuration for Webpack to transpile these Javascript
 dialects into EcmaScript 5, along with SCSS->CSS compilation
 is included.
 
## Implementing into an HTML page

For now, see demo in dist/index.php.

TODO there will be more documentation too.

## Running webpack

There are currently three options:

1. just type `webpack` to quickly transpile sources into
 non-minified dev assest.  
2. run `webpack -w` to watch and auto-compile all changes.
3. run `compile.sh` to purge all old assets and compile a minified,
 production version (do this before committing).

## Troubleshooting

1. If you've installed npm dependencies using yarn, you may 
 get `Error: ENOENT: no such file or directory, scandir '<project-path>/node_modules/node-sass/vendor'`.
 To bypass this error, run `npm rebuild node-sass`, it should fix the node-sass binary.

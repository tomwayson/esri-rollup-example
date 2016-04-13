var fs = require('fs');
var mkdirp = require('mkdirp');
var replace = require('replace');

// copy assets to dist
mkdirp('dist/nls/');
fs.createReadStream('src/nls/strings.js').pipe(fs.createWriteStream('dist/nls/strings.js'));

// TODO: remove once using the correct babel preset
// remove use strict from output
replace({
  regex: '\'use strict\';',
  replacement: '',
  paths: ['dist/bundle.js'],
  recursive: true,
  silent: false
});

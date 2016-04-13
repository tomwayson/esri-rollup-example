import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import string from 'rollup-plugin-string';

export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'amd', // Immediatly invoking function expression
  plugins: [
    // compile future ES 2015 to runnable ES 5
    babel({
      runtimeHelpers: true,
      exclude: 'src/templates/**' // don't compile templates
    }),
    // load templates from files
    string({
      extensions: ['.html']
    })
  ]
};

import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'amd', // Immediatly invoking function expression
  plugins: [
    // compile future ES 2015 to runnable ES 5
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**' // don't compile things in node_modules
    })
  ]
};
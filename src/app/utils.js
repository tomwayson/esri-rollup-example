// with ES2015 dependencies you have the option of
// importing their functions directly and
// Rollup will include the function and others it references
// in the bundled output along with the application code
import capitalize from '../../node_modules/lodash-es/capitalize';

// place stateless utility functions in this file
// they can be imported into other files as needed
export function formatTitle (title) {
  if (!title.replace) {
    // not a string, just return
    return title;
  }

  // replace dashes and underscores w/ spaces
  return title.replace(/-|_/g, ' ').split(' ').map(word => {
    // and capitalize each word
    return capitalize(word);
  }).join(' ');
}

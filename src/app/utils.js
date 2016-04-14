// place stateless utility functions in this file
// they can be imported into other files as needed
export function formatTitle (title) {
  if (!title.replace) {
    // not a string, just return
    return title;
  }

  // replace dashes and underscores w/ spaces
  return title.replace(/-|_/g, ' ');
}

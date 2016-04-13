# Esri Rollup Example

## Life's too short to use Dojo build <sup>TM</sup>

Just an experiment using [Rollup] to bundle ES6 modules that depend on the [ArcGIS API for JavaScript]. Relies on default behavior of [Rollup] to ignore modules it can't find (i.e. anything in the `esri` package) and only bundles application code. Outputs code as AMD module that can be loaded by the Dojo loader that is included in the [ArcGIS API for JavaScript].

## Getting started

Clone this repository and run:

```
npm install
npm run build
```

Serve the folder from any web server and navigate to index.html. Enjoy.

## TODO:
* how to handle other libs (like Bootstrap)? To bundle or not?
* [test w/ React](https://github.com/rollup/rollup/issues/437)?
* [test w/ web components](https://github.com/tomwayson/custom-elements-dev-summit-2016/)?
* add linter, semistandard?
* `npm start` to watch and serve

[Rollup]:http://rollupjs.org
[ArcGIS API for JavaScript]:https://developers.arcgis.com/javascript/

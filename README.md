# Esri Rollup Example

## Life's Too $hort to Use Dojo Build <sup>TM</sup>

An example application using [Rollup] to bundle local ES2015 modules that use CDN hosted modules from the [ArcGIS API for JavaScript].

> TLDR: This provides a fast, flexible, modern way for you to build *just* your application code locally while using the CDN hosted builds of the [ArcGIS API for JavaScript].

## Getting started

1. Clone/download this repository
2. `cd` into the repository root folder and run
`npm install && npm start`
3. Make some changes to the source code and your browser should live reload

## Why?

Ever waited minutes for a Dojo build only to have it fail? If not, you're doing it wrong. Ever not been able to figure out why it failed? [I have](https://github.com/odoe/generator-arcgis-js-app/issues/11). Even when a Dojo build does work, have you ever looked at the size of the optimized output and realize that you saved exactly 0 bytes over the size of the compact build? There's 4 hours of your life you'll never get back. Ever used the [Web Optimizer](https://jso.arcgis.com/)? Please.

If you're like me, you're fed up with that BS. It's time we respect ourselves. Let Esri deal with the Dojo build. We should be able to just build our application code, and now with [Rollup], it looks like we can. Even better, we can do so in a fast, flexible, and modern way!

### Known benefits
* ~10 million times faster than a Dojo build - something that can be used with live reload!
* No need to bower install half the friggin' Internet (i.e. all of Dojo and the [ArcGIS API for JavaScript])
* No _need_ for bower at all, use either npm or bower, or both, or neither! I'd rather not know about how you handle other people's packages.
* No longer dependent on [grunt-dojo](https://www.npmjs.com/package/grunt-dojo), so use whatever build system you prefer: [Gulp], [npm scripts](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/), or [Grunt] - I ain't mad atcha!
* Develop and test off your built code
* ES2015 (required, but that's a good thing)

### Potential benefits
These have not (yet) been tested:
* Use other component frameworks ([React](https://github.com/odoe/esrijs4-vm-react), [Web Components](https://github.com/patrickarlt/custom-elements-dev-summit-2016)) and/or UI library ([Bootstrap]) instead of Dijit, again, I'm not mad at you
* [Tree shaking of 3rd party dependencies like lodash](http://javascriptplayground.com/blog/2016/02/better-bundles-rollup/)

## What's the catch?

Too good to be true? Probably is. So far, so good though with just a few known limitations that either have workarounds or should not be show stoppers.

### Known limitations
* Can't use `dojo/text` plugin (but you can [use Rollup's](https://github.com/tomwayson/esri-rollup-example/blob/4bd1b8819b36a009b70f02ba1e0eb82025f072c7/src/SidePanel.js#L4-L6), or ES2015 template literals)
* Can't inline i18n bundles, but you _can_ [use `dojo/i18n`](https://github.com/tomwayson/esri-rollup-example/blob/4bd1b8819b36a009b70f02ba1e0eb82025f072c7/src/SidePanel.js#L7)!
* Build output is a single AMD module, not a Dojo build layer, so sub modules are not exposed. This should be fine when building apps, but is probably not suitable for building libraries.

### Caveats
* Hasn't been used in a production application (yet - help me fix that!)
* I haven't tried `dojo/has` (yawn)

## How does it work?

This approach relies on default behavior of [Rollup] to ignore modules that it can't resolve (i.e. anything in the `esri` or `dojo` packages) and only bundle our application code into a single AMD module.

```bash
$ rollup -c rollup-config.js
Treating 'dojo/_base/declare' as external dependency
Treating 'dijit/_WidgetBase' as external dependency
Treating 'dijit/_TemplatedMixin' as external dependency
Treating 'dojo/_base/declare' as external dependency
Treating 'esri/Map' as external dependency
Treating 'esri/views/MapView' as external dependency
Treating 'esri/layers/FeatureLayer' as external dependency
Treating 'esri/widgets/BasemapToggle' as external dependency
Treating 'esri/widgets/BasemapToggle/BasemapToggleViewModel' as external dependency
Treating 'dojo/_base/declare' as external dependency
Treating 'dijit/_WidgetBase' as external dependency
Treating 'dijit/_TemplatedMixin' as external dependency
Treating 'dojo/i18n!./nls/strings' as external dependency
```

Rollup's so smart. We didn't even need to tell it to ignore those modules.

We can then use the Dojo loader that is included in the [ArcGIS API for JavaScript] to load and run the bundled output like so:

```js
// index.html
require(['app/bundle']);

```

## FAQ
* What versions of the [ArcGIS API for JavaScript] can I use with this?
  * This has been tested with v3.16 and v4.0 Beta 3
* Should I use the compact build?
  * Depends. You should use the [compact build](https://developers.arcgis.com/javascript/jshelp/intro_accessapi.html#compact-build) unless you are going to use modules that aren't included in it (i.e. `esri/dijit/...`), in which case you should use the full build
* Shouldn't I be able to do the same thing with [webpack](https://webpack.github.io/)?
  * Go for it. Let me know how that works out for ya.
* Are you mad at me?
  * No
* You seem mad, who are you mad at?
  * Not mad, only bitter, but things are looking up!

[Rollup]:http://rollupjs.org
[ArcGIS API for JavaScript]:https://developers.arcgis.com/javascript/
[Grunt]:http://gruntjs.com/
[Gulp]:http://gulpjs.com/
[Bootstrap]:http://getbootstrap.com/

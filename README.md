# Esri Rollup Example

## Life's Too $hort to Use Dojo Build <sup>TM</sup>

**TLDR: An example of a fast, flexible, modern way for you to build *just* your application code locally while using the CDN hosted builds of the [ArcGIS API for JavaScript].**

This is an example application using [Rollup] to bundle local ES2015 modules that use CDN hosted modules from the [ArcGIS API for JavaScript].

You can view the site created by this repo [live](http://tomwayson.github.io/esri-rollup-example/), and see the (unminified) [bundled source code](http://tomwayson.github.io/esri-rollup-example/app/bundle.js).

This example application also uses [Gulp] to minify the bundled code and manage static assets, but you can [use Rollup with whatever build system you prefer](https://github.com/rollup/rollup/wiki/Build-tools). Earlier versions of the application simply [used npm scripts as a build tool](https://github.com/tomwayson/esri-rollup-example/blob/v0.0.8/package.json#L17-L21).

## Getting started

1. Clone/download this repository
2. `cd` into the repository root folder and run
`npm install && npm start`
3. Make some changes to the source code and browser will live reload the newly built code

## Why?

Ever waited minutes for a Dojo build only to have it fail? If not, you're doing it wrong. Ever not been able to figure out why it failed? [I have](https://github.com/odoe/generator-arcgis-js-app/issues/11). Even when a Dojo build does work, have you ever looked at the size of the optimized output and realize that you saved exactly 0 bytes over the size of the compact build? There's 4 hours of your life you'll never get back. Ever used the [Web Optimizer](https://jso.arcgis.com/) and wonder why part of your build process involves visiting a web site?

If you're like me, you're fed up with all that. It's time we respect ourselves and take back our valuable time. Esri's already done the Dojo builds for us and left them on a CDN. We should be able to pull in any of those and just build our own application code. Now with [Rollup], it looks like we can. Even better, we can do so in a fast, flexible, and modern way!

### Known benefits
* ~10 million times faster than a Dojo build - something that can be used with live reload!
* No need to bower install half the Internet (i.e. all of Dojo and the [ArcGIS API for JavaScript])
* No _need_ for bower at all, use either npm or bower, or both, or neither! I'd rather not know about how you handle other people's packages.
* No longer dependent on [grunt-dojo](https://www.npmjs.com/package/grunt-dojo), so use whatever build system you prefer: [Gulp], [npm scripts](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/), or [Grunt] - I ain't mad atcha!
* Develop and test off your _built_ code
* Your users' browsers may already have the CDN build of the [ArcGIS API for JavaScript] cached

### Potential benefits
These have not (yet) been tested:
* Use other component frameworks ([React](https://github.com/odoe/esrijs4-vm-react), [Web Components](https://github.com/patrickarlt/custom-elements-dev-summit-2016)) and/or UI library ([Bootstrap]) instead of Dijit, again, I'm not mad at you
* [Tree shaking of 3rd party dependencies like lodash](http://javascriptplayground.com/blog/2016/02/better-bundles-rollup/)

## What's the catch?

Too good to be true? Probably is. So far, so good though with just a few known limitations that either have workarounds or should not be show stoppers.

### Known limitations
* Can't use `dojo/text` plugin (but you can [use Rollup's](https://github.com/tomwayson/esri-rollup-example/blob/4bd1b8819b36a009b70f02ba1e0eb82025f072c7/src/SidePanel.js#L4-L6), or [ES2015 template literals](https://github.com/tomwayson/esri-rollup-example/blob/e7f239c5e042ba2fc68d40093a10aa01a6176585/src/app/App.js#L13-L20))
* Can't inline i18n bundles, but you _can_ [use `dojo/i18n`](https://github.com/tomwayson/esri-rollup-example/blob/4bd1b8819b36a009b70f02ba1e0eb82025f072c7/src/SidePanel.js#L7)!
* Build output is a single AMD module, not a Dojo build layer, so sub modules are not exposed. This should be fine when building apps, but is probably not suitable for building libraries.

### Caveats
* Hasn't been used in a production application yet (help me fix that!), so not sure how it scales.
* ES2015 required. That's a good thing, but it means you can't use this with pre-existing ES5 applications unless you use something like [amd-to-as6](https://github.com/jonbretman/amd-to-as6) first.
* This is not an [official build solution from Esri](https://developers.arcgis.com/javascript/jshelp/inside_bower_custom_builds.html), so support means [people helping people](https://github.com/tomwayson/esri-rollup-example/issues).

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
* I used to (twitter/facebook/read War and Peace/prep for the Bar exam/crochet) while I was waiting for the Dojo build to finish, when can I do that now?
  * Now you can do your hobbies after you've shipped!

[Rollup]:http://rollupjs.org
[ArcGIS API for JavaScript]:https://developers.arcgis.com/javascript/
[Grunt]:http://gruntjs.com/
[Gulp]:http://gulpjs.com/
[Bootstrap]:http://getbootstrap.com/

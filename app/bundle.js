define(['dojo/_base/declare', 'dijit/_WidgetBase', 'dijit/_TemplatedMixin', 'esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/BasemapToggle', 'esri/widgets/BasemapToggle/BasemapToggleViewModel', 'dojo/i18n!./nls/strings'], function (declare, _WidgetBase, _TemplatedMixin, Map, MapView, FeatureLayer, BasemapToggle, BasemapToggleVM, strings) { 

    declare = 'default' in declare ? declare['default'] : declare;
    _WidgetBase = 'default' in _WidgetBase ? _WidgetBase['default'] : _WidgetBase;
    _TemplatedMixin = 'default' in _TemplatedMixin ? _TemplatedMixin['default'] : _TemplatedMixin;
    Map = 'default' in Map ? Map['default'] : Map;
    MapView = 'default' in MapView ? MapView['default'] : MapView;
    FeatureLayer = 'default' in FeatureLayer ? FeatureLayer['default'] : FeatureLayer;
    BasemapToggle = 'default' in BasemapToggle ? BasemapToggle['default'] : BasemapToggle;
    BasemapToggleVM = 'default' in BasemapToggleVM ? BasemapToggleVM['default'] : BasemapToggleVM;
    strings = 'default' in strings ? strings['default'] : strings;

    var babelHelpers = {};
    babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };
    babelHelpers;

    var config = {
      mapProps: {
        center: [-122.33, 37.75],
        zoom: 11,
        basemap: 'dark-gray'
      },
      secondaryBasemap: 'streets',
      fuelingStationLayerProps: {
        url: 'https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Alternative_Fueling_Stations/FeatureServer/0',
        popupTemplate: {
          title: '{Station_Na}',
          content: '\n        <p>{Street_Add}<br>\n        {City}, {State}, {ZIP}</p>\n\n        <p><b>Fuel Type:</b> {Fuel_Type}</p>\n        <p><b>Phone:</b> <a href="tel:{Station_Ph}">{Station_Ph}</a></p>\n        <p><b>Open to:</b> {Groups_Wit}</p>\n        <p><b>Hours:</b> {Access_Day}</p>'
        },
        outFields: ['Station_Na', 'Street_Add', 'City', 'State', 'ZIP', 'Fuel_Type', 'Station_Ph', 'Groups_Wit', 'Access_Day']
      }
    };

    // define a stateful service to manage the map
    var MapService = declare([], {
      // create a map and map view
      init: function init(options) {
        this.map = new Map({
          basemap: options.basemap
        });
        delete options.basemap;
        options.map = this.map;
        this.view = new MapView(options);
      },

      createBasemapToggle: function createBasemapToggle(node, secondaryBasemap) {
        if (!node || !secondaryBasemap || !this.view) {
          return;
        }

        return new BasemapToggle({
          // Setting widget properties via viewModel is subject to
          // change for the 4.0 final release
          viewModel: new BasemapToggleVM({
            view: this.view,
            secondaryBasemap: secondaryBasemap
          })
        }, node);
      },


      // add a feature layer to the map
      addFeatureLayer: function addFeatureLayer(props) {
        if (!this.map) {
          return;
        }

        var featureLayer = new FeatureLayer(props);
        this.map.add(featureLayer);
        return featureLayer;
      }
    });

    // return a singleton instance of this service
    if (!_instance) {
      var _instance = new MapService();
    }

    var template = "<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\">\r\n    <h4 class=\"panel-title\">\r\n      <span class=\"glyphicon glyphicon-chevron-up\"></span>\r\n      <a role=\"button\" data-toggle=\"collapse\" data-dojo-attach-point=\"titleNode\" data-target=\".info-panel\" aria-expanded=\"false\" aria-controls=\"collapseOne\"></a>\r\n    </h4>\r\n  </div>\r\n  <div class=\"panel-collapse collapse in info-panel\" role=\"tabpanel\">\r\n    <div class=\"panel-body\">\r\n      <h4>${nls.About}</h4>\r\n      <p>${nls.sidePanelMessage}</p>\r\n    </div>\r\n  </div>\r\n</div>\r\n";

    var SidePanel = declare([_WidgetBase, _TemplatedMixin], {

      baseClass: 'side-panel',
      nls: strings,
      templateString: template,

      // set panel header title
      _setTitleAttr: { node: 'titleNode', type: 'innerHTML' },

      // wire up events
      postCreate: function postCreate() {
        var domNodeId = '#' + this.domNode.id;
        // update chevron icon when panel collapses/expands
        $(domNodeId + ' .collapse').on('hide.bs.collapse show.bs.collapse', function () {
          $(domNodeId + ' .panel-title .glyphicon').toggleClass('glyphicon-chevron-up glyphicon-chevron-down');
        });
      }
    });

    /**
     * Checks if `value` is a global object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {null|Object} Returns `value` if it's a global object, else `null`.
     */
    function checkGlobal(value) {
      return value && value.Object === Object ? value : null;
    }

    /** Used to determine if values are of the language type `Object`. */
    var objectTypes = {
      'function': true,
      'object': true
    };

    /** Detect free variable `exports`. */
    var freeExports = objectTypes[typeof exports === 'undefined' ? 'undefined' : babelHelpers.typeof(exports)] && exports && !exports.nodeType ? exports : undefined;

    /** Detect free variable `module`. */
    var freeModule = objectTypes[typeof module === 'undefined' ? 'undefined' : babelHelpers.typeof(module)] && module && !module.nodeType ? module : undefined;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = checkGlobal(freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : babelHelpers.typeof(global)) == 'object' && global);

    /** Detect free variable `self`. */
    var freeSelf = checkGlobal(objectTypes[typeof self === 'undefined' ? 'undefined' : babelHelpers.typeof(self)] && self);

    /** Detect free variable `window`. */
    var freeWindow = checkGlobal(objectTypes[typeof window === 'undefined' ? 'undefined' : babelHelpers.typeof(window)] && window);

    /** Detect `this` as the global object. */
    var thisGlobal = checkGlobal(objectTypes[babelHelpers.typeof(this)] && this);

    /**
     * Used as a reference to the global object.
     *
     * The `this` value is used if it's the global object to avoid Greasemonkey's
     * restricted `window` object, otherwise the `window` object is used.
     */
    var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();

    /** Built-in value references. */
    var _Symbol = root.Symbol;

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) == 'object';
    }

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = _Symbol ? _Symbol.prototype : undefined;
    var symbolToString = symbolProto ? symbolProto.toString : undefined;
    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (value == null) {
        return '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = value + '';
      return result == '0' && 1 / value == -INFINITY ? '-0' : result;
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return !start && end >= length ? array : baseSlice(array, start, end);
    }

    /** Used to compose unicode character classes. */
    var rsAstralRange = '\\ud800-\\udfff';
    var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23';
    var rsComboSymbolsRange = '\\u20d0-\\u20f0';
    var rsVarRange = '\\ufe0e\\ufe0f';
    /** Used to compose unicode capture groups. */
    var rsZWJ = '\\u200d';

    /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
    var reHasComplexSymbol = RegExp('[' + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

    /** Used to compose unicode character classes. */
    var rsAstralRange$1 = '\\ud800-\\udfff';
    var rsComboMarksRange$1 = '\\u0300-\\u036f\\ufe20-\\ufe23';
    var rsComboSymbolsRange$1 = '\\u20d0-\\u20f0';
    var rsVarRange$1 = '\\ufe0e\\ufe0f';
    var rsAstral = '[' + rsAstralRange$1 + ']';
    var rsCombo = '[' + rsComboMarksRange$1 + rsComboSymbolsRange$1 + ']';
    var rsFitz = '\\ud83c[\\udffb-\\udfff]';
    var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
    var rsNonAstral = '[^' + rsAstralRange$1 + ']';
    var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
    var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
    var rsZWJ$1 = '\\u200d';
    var reOptMod = rsModifier + '?';
    var rsOptVar = '[' + rsVarRange$1 + ']?';
    var rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
    var reComplexSymbol = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

    /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function stringToArray(string) {
        return string.match(reComplexSymbol);
    }

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new function.
     */
    function createCaseFirst(methodName) {
      return function (string) {
        string = toString(string);

        var strSymbols = reHasComplexSymbol.test(string) ? stringToArray(string) : undefined;

        var chr = strSymbols ? strSymbols[0] : string.charAt(0);

        var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = createCaseFirst('toUpperCase');

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }

    // place stateless utility functions in this file
    // they can be imported into other files as needed
    function formatTitle(title) {
      if (!title.replace) {
        // not a string, just return
        return title;
      }

      // replace dashes and underscores w/ spaces
      return title.replace(/-|_/g, ' ').split(' ').map(function (word) {
        // and capitalize each word
        return capitalize(word);
      }).join(' ');
    }

    var App = declare([_WidgetBase, _TemplatedMixin], {

      baseClass: 'app',
      // using an inline template
      templateString: '\n    <div>\n      <div data-dojo-attach-point="mapNode" class="map-container">\n        <div data-dojo-attach-point="sidePanelNode"></div>\n        <div data-dojo-attach-point="basemapToggleNode" class="basemap-toggle" />\n      </div>\n    </div>\n  ',

      // kick off app once this component has been created
      postCreate: function postCreate() {
        var _this = this;

        this.inherited(arguments);

        // initialize map
        config.mapProps.container = this.mapNode;
        _instance.init(config.mapProps);

        // initialize side panel
        this.sidePanel = new SidePanel({}, this.sidePanelNode);

        // initialize the basemap toggle
        this.basemapToggle = _instance.createBasemapToggle(this.basemapToggleNode, config.secondaryBasemap);

        // add feature layer and once loaded
        // set side title of side panel
        _instance.addFeatureLayer(config.fuelingStationLayerProps).then(function (layer) {
          _this.sidePanel.set('title', formatTitle(layer.title || layer.name));
        });
      },


      // you gotta start me up
      startup: function startup() {
        this.sidePanel.startup();
        this.basemapToggle.startup();
      }
    });

    // initialize app to global var for debugging
    window.app = new App({}, 'app');
    window.app.startup();

});
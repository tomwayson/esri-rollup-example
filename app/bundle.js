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

  var template = "<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\" data-dojo-attach-point=\"titleNode\"></h3>\r\n  </div>\r\n  <div class=\"panel-body\">\r\n    <h4>${nls.About}</h4>\r\n    <p>${nls.sidePanelMessage}</p>\r\n  </div>\r\n</div>\r\n";

  var SidePanel = declare([_WidgetBase, _TemplatedMixin], {

    baseClass: 'side-panel',
    nls: strings,
    templateString: template,

    // set panel header title
    _setTitleAttr: { node: 'titleNode', type: 'innerHTML' }
  });

  // place stateless utility functions in this file
  // they can be imported into other files as needed
  function formatTitle(title) {
    if (!title.replace) {
      // not a string, just return
      return title;
    }

    // replace dashes and underscores w/ spaces
    return title.replace(/-|_/g, ' ');
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
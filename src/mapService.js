import declare from 'dojo/_base/declare';
import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import FeatureLayer from 'esri/layers/FeatureLayer';

// define a stateful service to manage the map
const MapService = declare([], {
  // create a map and map view
  init: function (options) {
    this.map = new Map({
      basemap: options.basemap
    });
    delete options.basemap;
    options.map = this.map;
    this.view = new MapView(options);
  },

  // add a feature layer to the map
  addFeatureLayer: function (props) {
    if (!this.map) {
      return;
    }

    const featureLayer = new FeatureLayer(props);
    this.map.add(featureLayer);
    return featureLayer;
  }
});

// return a singleton instance of this service
if (!_instance) {
  var _instance = new MapService();
}
export default _instance;

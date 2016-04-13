import declare from 'dojo/_base/declare';
import Map from 'esri/map';
import FeatureLayer from 'esri/layers/FeatureLayer';

// define a stateful service to manage the map
const MapService = declare([], {
  init: function (id, options) {
    this.map = new Map(id, options);
  },
  addFeatureLayer: function (url, options) {
    if (!this.map) {
      return;
    }

    this.map.addLayer(new FeatureLayer(url, options));
  }
});

// return a singleton instance of this service
if (!_instance) {
  var _instance = new MapService();
}
export default _instance;

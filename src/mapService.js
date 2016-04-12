import Map from 'esri/map';

export default {
  createMap: function(id, options) {
    return new Map(id, options);
  }
}

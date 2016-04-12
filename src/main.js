import mapService from './mapService';

const map = mapService.createMap('map', {
  center: [-118, 34.5],
  zoom: 8,
  basemap: "topo"
});

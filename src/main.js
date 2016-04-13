import mapService from './mapService';
import SidePanel from './SidePanel';

mapService.createMap('map', {
  center: [-118, 34.5],
  zoom: 8,
  basemap: 'topo'
});

const sidePanel = new SidePanel();
sidePanel.placeAt('sidePanel');

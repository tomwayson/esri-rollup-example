import mapService from './mapService';
import SidePanel from './SidePanel';

mapService.init('map', {
  center: [-122.33, 37.75],
  zoom: 11,
  basemap: 'dark-gray'
});
mapService.addFeatureLayer('http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Alternative_Fueling_Stations/FeatureServer/0');

const sidePanel = new SidePanel();
sidePanel.placeAt('sidePanel');

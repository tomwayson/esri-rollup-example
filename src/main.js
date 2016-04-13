import mapService from './mapService';
import TimeWidget from './TimeWidget';

mapService.createMap('map', {
  center: [-118, 34.5],
  zoom: 8,
  basemap: 'topo'
});

const timeWidget = new TimeWidget();
timeWidget.placeAt('time');

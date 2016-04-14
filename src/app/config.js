export default {
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
      content: `
        <p>{Street_Add}<br>
        {City}, {State}, {ZIP}</p>

        <p><b>Fuel Type:</b> {Fuel_Type}</p>
        <p><b>Phone:</b> <a href="tel:{Station_Ph}">{Station_Ph}</a></p>
        <p><b>Open to:</b> {Groups_Wit}</p>
        <p><b>Hours:</b> {Access_Day}</p>`
    },
    outFields: ['Station_Na', 'Street_Add', 'City', 'State', 'ZIP', 'Fuel_Type', 'Station_Ph', 'Groups_Wit', 'Access_Day']
  }
};

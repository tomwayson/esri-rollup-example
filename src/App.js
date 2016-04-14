import declare from 'dojo/_base/declare';
import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';
import config from './config';
import mapService from './mapService';
import SidePanel from './SidePanel';
import { formatTitle } from './utils';

export default declare([_WidgetBase, _TemplatedMixin], {

  baseClass: 'app',
  // using an inline template
  templateString: `
    <div>
      <div data-dojo-attach-point="mapNode" class="map-container">
        <div data-dojo-attach-point="sidePanelNode"></div>
      </div>
    </div>
  `,

  // kick off app once this component has been created
  postCreate () {
    this.inherited(arguments);

    // initialize map
    config.mapProps.container = this.mapNode;
    mapService.init(config.mapProps);

    // initialize side panel
    this.sidePanel = new SidePanel({}, this.sidePanelNode);

    // add feature layer and once loaded
    // set side title of side panel
    mapService.addFeatureLayer(config.fuelingStationLayerProps).then(layer => {
      this.sidePanel.set('title', formatTitle(layer.title || layer.name));
    });
  }
});

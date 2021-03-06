// NOTE: using jQuery global intead of importing
// because it is included it in vendor.js
// and we don't want it bundled with our application code
/* global $:false */
import declare from 'dojo/_base/declare';
import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';
// NOTE: we're using Rollup's string plugin to load
// the template which will be inlined into the build output
import template from './templates/SidePanel.html';
import strings from 'dojo/i18n!./nls/strings';

export default declare([_WidgetBase, _TemplatedMixin], {

  baseClass: 'side-panel',
  nls: strings,
  templateString: template,

  // set panel header title
  _setTitleAttr: { node: 'titleNode', type: 'innerHTML' },

  // wire up events
  postCreate () {
    this.inherited(arguments);
    let domNodeId = '#' + this.domNode.id;
    // update chevron icon when panel collapses/expands
    $(domNodeId + ' .collapse').on('hide.bs.collapse show.bs.collapse', () => {
      $(domNodeId + ' .panel-title .glyphicon').toggleClass('glyphicon-chevron-up glyphicon-chevron-down');
    });
  }
});

import declare from 'dojo/_base/declare';
import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';
import _Container from 'dijit/_Container';
// NOTE: we're using Rollup's string plugin to load template
// this will be inlined into the build output
import template from './templates/SidePanel.html';
import strings from 'dojo/i18n!./nls/strings';
import TimeWidget from './TimeWidget';

export default declare([_WidgetBase, _Container, _TemplatedMixin], {

  baseClass: 'side-panel',
  nls: strings,
  templateString: template,

  postCreate () {
    this.inherited(arguments);

    // side panel
    this.titleNode.innerHTML = strings.sidePanelTitle;

    // add time widget
    this.addChild(new TimeWidget());
  }
});

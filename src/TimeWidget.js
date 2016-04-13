import moment from 'moment/moment';
import declare from 'dojo/_base/declare';
import _TemplatedMixin from 'dijit/_TemplatedMixin';
import _WidgetBase from 'dijit/_WidgetBase';
// whoa, plugins? not just any plugin, but i18n!
import strings from 'dojo/i18n!./nls/strings';

export default declare([_WidgetBase, _TemplatedMixin], {

  baseClass: 'time-widget',
  nls: strings,
  // using an inline template here, but this probably
  // could have been brought in via dojo/text plugin
  templateString: `<div>
    ${strings.timeMessage} <span data-dojo-attach-point="timeNode"></span>
  </div>`,

  postCreate() {
    this.inherited(arguments);

    this.timeNode.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
  }
});

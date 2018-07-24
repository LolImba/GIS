/***
 * Consumed by the Unplanned Task Grid
 */
Ext.define('Sch.examples.eventeditor.store.UnplannedTaskStore', {
    extend      : 'Ext.data.Store',
    model       : 'Sch.examples.eventeditor.model.UnplannedTask',
    requires    : [
        'Sch.examples.eventeditor.model.UnplannedTask'
    ],

    autoLoad    : true,

    proxy       : {
        url     : 'data/unplanned.json',
        type    : 'ajax',
        reader  : { type : 'json' }
    }
});
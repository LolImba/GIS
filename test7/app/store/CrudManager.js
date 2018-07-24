Ext.define('Sch.examples.eventeditor.data.CrudManager', {
    extend          : 'Sch.data.CrudManager',
    alias           : 'crudmanager.eventeditor-crudmanager',
    autoLoad        : true,
    transport       : {
        load : {
            // method      : 'GET',
            // paramName   : 'q',
            url         : 'data/load.json'
        }
    }
});

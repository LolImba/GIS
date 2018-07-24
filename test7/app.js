Ext.application({
    name : 'Sch.examples.eventeditor',

    requires : [
        'Sch.examples.eventeditor.view.MainView'
    ],

    launch : function() {
        Ext.QuickTips.init();

        Ext.create('Ext.Viewport', {
            layout : 'border',

            items : [
                {
                    xtype  : 'events-mainview',
                    region : 'center'
                }, {
                    xtype : 'details'
                }
            ]
        });
    }
});
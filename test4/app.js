Ext.application({
    name : 'Sch.examples.eventeditor',

    requires : [
        'Sch.examples.eventeditor.view.Scheduler'
    ],

    launch : function() {
        Ext.QuickTips.init();

        Ext.create('Ext.Viewport', {
            layout : 'border',

            items : [
                {
                    xtype  : 'eventeditor-maintabs',
                    region : 'center'
                }, {
                    xtype : 'details'
                }
            ]
        });
    }
});
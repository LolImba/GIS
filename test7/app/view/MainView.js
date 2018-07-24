Ext.define('Sch.examples.eventeditor.view.MainView', {
    extend : 'Ext.container.Container',
    xtype  : 'events-mainview',

    requires : [
        'Sch.examples.eventeditor.view.Scheduler',
        'Sch.examples.eventeditor.view.UnplannedTaskGrid',
        'Sch.examples.eventeditor.controller.Scheduler'
        //'Sch.examples.eventeditor.model.UnplannedTasks'
        // 'Sch.examples.eventeditor.data.CrudManager'
        //'Sch.examples.eventeditor.view.Workers'
    ],

    layout : 'border',
    //border : false,

    initComponent : function() {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'eventeditorscheduler',
                    region: 'center',
                    //title : 'Scheduler',
                    //height: 700,
                    //width  : 500
                    //weight               : -2
                    // split     : false,
                    // closable  : false
                },
                {
                    xtype: 'unplannedtaskgrid',
                    width  : 300,
                    split  : true,
                    region: 'east',
                    weight : 20
                }
                //{
                // xtype  : 'workersType',
                // title : 'Workers',
                // split     : false,
                // closable  : false
                //layout : { type : 'hbox', align : 'stretch' },
                // height : 250,

                // items : [
                //     {
                //         xtype       : 'form',
                //         title       : 'Some stats',
                //         itemId      : 'details',
                //         //width       : 200,
                //         cls         : 'detailsform',
                //         bodyPadding : '20 0 0 20',
                //         items       : [
                //             {
                //                 xtype      : 'textfield',
                //                 fieldLabel : 'Number of incidents',
                //                 anchor     : '90%',
                //                 readOnly   : false
                //             },
                //             {
                //                 xtype      : 'textfield',
                //                 fieldLabel : 'Incidents / day',
                //                 anchor     : '90%',
                //                 readOnly   : false
                //             }
                //         ]
                //     }
                // ]
                //}
            ],
        });
        this.callParent(arguments);
    }
    // initComponent : function () {
    //     Ext.apply(this, {
    //         crudManager : new Sch.examples.eventeditor.data.CrudManager({
    //             eventStore    : new Sch.data.EventStore(),
    //             resourceStore : new Sch.data.ResourceStore()
    //         })
    //     })
    // }
});
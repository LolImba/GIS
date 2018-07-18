Ext.define('Sch.examples.eventeditor.view.MainTabs', {
    extend : 'Ext.tab.Panel',
    xtype  : 'eventeditor-maintabs',

    requires : [
        'Sch.examples.eventeditor.view.Scheduler',
        'Sch.examples.eventeditor.view.Workers'
    ],

    items : [
        {
            xtype     : 'graph',
            split     : false,
            title     : 'Main graph',
            startDate : new Date(2017, 1, 7, 8),
            endDate   : new Date(2017, 1, 7, 18),
            closable  : false
        },
        {
            xtype     : 'workers',
            split     : false,
            title     : 'Workers table',
            startDate : new Date(2017, 1, 7, 8),
            endDate   : new Date(2017, 1, 7, 18),
            closable  : false
        }
    ]
});
Ext.define('Sch.examples.eventeditor.view.Scheduler', {
    extend: 'Sch.panel.SchedulerGrid',
    xtype: 'eventeditorscheduler',

    requires: [
        'Sch.examples.eventeditor.view.DemoEditor',
        'Sch.examples.eventeditor.view.Scheduler'
    ],

    title: 'Workers',
    rowHeight: 40,
    snapToIncrement: true,
    border: false,
    colorResources: false,
    forceFit: true,
    viewPreset: 'hourAndDay',

    lockedGridConfig: {
        width: 300
    }
});

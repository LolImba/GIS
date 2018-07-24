Ext.define('Sch.examples.eventeditor.view.Worker', {
    extend: 'Sch.panel.SchedulerGrid',
    xtype: 'workersType',

    defaults       : {
        tpl        : new Ext.Template(
            '<div class="evt-row">',
            '<span class="evt-id">{id}</span>','</div>',
            '<div class="evt-row">',
            '<span class="evt-name">{name}</span>','</div>',
            '<div class="evt-row">',
            '<span class="evt-description">{description} </span>','</div>',
            '<div class="evt-row">',
            '<span class="evt-args">{parentId}</span>',
            '</div>'
        )
    },


});

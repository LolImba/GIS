/**
 * Basic grid panel, which is associated with a DragZone. See the GridPanel class in the Sencha API docs for configuration options.
 */
Ext.define('Sch.examples.eventeditor.view.UnplannedTaskGrid', {
    extend : 'Ext.grid.GridPanel',
    alias  : 'widget.unplannedtaskgrid',

    requires : [
        'Sch.examples.eventeditor.store.UnplannedTaskStore',
        'Sch.examples.eventeditor.view.UnplannedTaskDragZone'
    ],
    cls      : 'taskgrid',
    title    : 'Unplanned Tasks',

    initComponent : function () {
        Ext.apply(this, {
            viewConfig : { columnLines : false },

            store   : new Sch.examples.eventeditor.store.UnplannedTaskStore(),
            columns : [
               // {header : 'Id', sortable : true, flex : 1, dataIndex : 'Id'},
                {header : 'Task', sortable : true, flex : 1, dataIndex : 'Name'},
                {header : 'Duration', sortable : true, width : 100, dataIndex : 'Duration'},
                {header : 'Location', sortable : true, width : 100, dataIndex : 'Location'}
            ]
        });

        this.callParent(arguments);
    },

    afterRender : function () {
        this.callParent(arguments);

        // Setup the drag zone
        new Sch.examples.eventeditor.view.UnplannedTaskDragZone(this.getEl(), {
            grid : this
        });
    },

    onDestroy: function() {
        this.store.destroy();
        this.callParent();
    }
});
    
Ext.define('Sch.examples.test3.view.SchedulerController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.scheduler',

    requires : [
        'Robo.Manager'
    ],

    // Create UndoManager after render to make sure stores are registered
    onSchedulerRender : function() {
        this.undoManager = new Robo.Manager({
            transactionBoundary : 'timeout',
            stores              : [
                'events',
                'resources',
                'zones'
            ]
        });
        this.undoManager.start();
    },

    // Shortcut to get zone store from other functions
    getZoneStore : function() {
        return this.getView().findPlugin('scheduler_zones').store;
    },

    // Toggle Holiday zone
    onZoneAddPress : function(btn, pressed) {
        var store = this.getZoneStore();

        if (pressed) {
            btn.zone = store.add({
                Type      : 'Holiday',
                StartDate : new Date(2017, 0, 8),
                EndDate   : new Date(2017, 0, 9)
            })[0];
        } else {
            store.remove(btn.zone);
        }
    },

    // Toggle Out of office zone
    onZone2AddPress : function(btn, pressed) {
        var store = this.getZoneStore();

        if (pressed) {
            btn.zone = store.add({
                Type      : 'Out of office',
                StartDate : new Date(2017, 0, 3),
                EndDate   : new Date(2017, 0, 4),
                Cls       : 'customZoneStyle'
            })[0];
        } else {
            store.remove(btn.zone);
        }
    },

    // Add resource
    onRowAddPress : function(btn) {
        this.getView().getResourceStore().add({
            Name : 'New person'
        });
    },

    // Toggle orientation to horizontal
    onHorizontalPress : function() {
        this.getView().setMode('horizontal');
    },

    // Toggle orientation to vertical
    onVerticalPress : function() {
        this.getView().setMode('vertical');
    },

    undo : function() {
        this.undoManager.undo();
    },

    redo : function() {
        this.undoManager.redo();
    }
});
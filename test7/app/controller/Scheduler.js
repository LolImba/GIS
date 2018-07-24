/***
 * This controller glues together the application and handles the 'drop' event from the drop zone.
 * When the drop happens it simply removes it from one store, and inserts the task into the event store of the EmployeeScheduler.
 */
Ext.define('Sch.examples.eventeditor.controller.Scheduler', {
    extend : 'Ext.app.Controller',

    // refs : [
    //     // This auto-generates a 'getEmployeeScheduler' getter for this ComponentQuery selector
    //     // See http://docs.sencha.com/ext-js/4-1/#!/api/Ext.app.Controller-cfg-refs
    //     { ref : 'scheduler', selector : 'scheduler' }
    // ],

    init : function() {
        console.log('Initialized Users! This happens before ' +
            'the Application launch() function is called');
        this.control({
            // We should react to task drops coming from the external grid
            'scheduler schedulergridview' : {
                unplannedtaskdrop : this.onUnplannedTaskDrop
            }
        });
    },

    onUnplannedTaskDrop : function(scheduler, droppedTask, targetResource, date){
        var Scheduler   = this.getScheduler();

        // Remove this task from the store it currently belongs to - the unassigned grid store
        droppedTask.store.remove(droppedTask);

        // Apply the start and end date values
        droppedTask.setStartEndDate(date, Sch.util.Date.add(date, Sch.util.Date.HOUR, droppedTask.get('Duration')));

        // And finally assign it to the resource
        scheduler.eventStore.assignEventToResource(droppedTask, targetResource);

        Sscheduler.eventStore.add(droppedTask);
    }
});
/**
 * This class is a drop zone, allowing you to drop elements on the configured target element (see the constructor in the
 * Sencha API docs: http://docs.sencha.com/ext-js/4-1/#!/api/Ext.dd.DropTarget-method-constructor).
 * When the drop happens, the onNodeDrop callback is called and the dropzone simply fires an event on behalf of the scheduler view
 * to let the world know about the drop.
 * */
Ext.define('Sch.examples.eventeditor.view.UnplannedTaskDropZone', {
    extend      : 'Sch.examples.eventeditor.view.SchedulerDropZone',
    ddGroup     : 'unplannedtasks',

    // This method is called as mouse moves during a drag drop operation of an unplanned task over the schedule area
    validatorFn     : function(draggedEventRecords, resource, date, durationMs) {
        return this.isValidDrop(resource, date, durationMs);
    },

    isValidDrop : function(resource, startDate, durationMs) {
        //return resource.isAvailable(startDate, Sch.util.Date.add(startDate, Sch.util.Date.MILLI, durationMs));
        return true;
    },

    onNodeDrop  : function(target, dragSource, e, data){
        var view                = this.schedulerView,
            resource            = view.resolveResource(target),
            date                = view.getDateFromDomEvent(e, 'round'),
            task                = data.records[0];

        if (!this.isValidDrop(resource, date, data.duration)) {
            return false;
        }

        //view.fireEvent('unplannedtaskdrop', view, task, resource, date);
        //view.unplannedtaskdrop(view, task, resource, date);
        // Remove this task from the store it currently belongs to - the unassigned grid store
        task.store.remove(task);

        // Apply the start and end date values
        task.setStartEndDate(date, Sch.util.Date.add(date, Sch.util.Date.HOUR, task.get('Duration')));

        // And finally assign it to the resource
        view.eventStore.assignEventToResource(task, resource);

        view.eventStore.add(task);
    }
});
    
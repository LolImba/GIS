Ext.define('Sch.examples.eventeditor.store.EventStore', {
    extend  : 'Sch.data.EventStore',
    storeId : 'events',
    data    : [
        {
            ResourceId : '9',
            StartDate  : '2017-02-16 12:00',
            EndDate    : '2017-02-16 16:00',
            Name       : 'Some task'
        },
        {
            ResourceId : '2',
            StartDate  : '2017-02-17 08:00',
            EndDate    : '2017-02-17 14:00',
            Name       : 'Other task'

        },
        {
            ResourceId : '10',
            StartDate  : '2017-02-15 08:00',
            EndDate    : '2017-02-15 14:00',
            Name       : 'Important task'
        }
    ]
});

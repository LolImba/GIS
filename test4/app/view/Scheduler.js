// Ext.define('Sch.examples.eventeditor.view.MainTabs', {
//     extend : 'Ext.tab.Panel',
//     xtype  : 'eventeditor-maintabs',
//
//     requires : [
//         //'Sch.examples.eventeditor.view.Scheduler',
//         'Sch.examples.eventeditor.view.Workers'
//     ],
//
//     items : [
//         {
//             xtype     : 'graph',
//             split     : false,
//             title     : 'Main graph',
//             startDate : new Date(2017, 1, 7, 8),
//             endDate   : new Date(2017, 1, 7, 18),
//             closable  : false
//         },
//         {
//             xtype     : 'workers',
//             split     : false,
//             title     : 'Workers table',
//             startDate : new Date(2017, 1, 7, 8),
//             endDate   : new Date(2017, 1, 7, 18),
//             closable  : false
//         }
//     ]
// });
Ext.define('Sch.examples.eventeditor.view.Scheduler', {
    extend : 'Sch.panel.SchedulerGrid',
    xtype  : 'eventeditorscheduler',

    requires : [
        'Sch.examples.eventeditor.view.DemoEditor',
        'Sch.examples.eventeditor.model.Event',
        'Sch.examples.eventeditor.model.Resource',
        'Sch.data.CrudManager',
        'Ext.grid.plugin.CellEditing'
    ],

    title           : 'Scheduler with event editor',
    rowHeight       : 40,
    snapToIncrement : true,
    border          : false,
    colorResources  : false,
    forceFit        : true,
    viewPreset      : 'hourAndDay',

    lockedGridConfig : {
        width : 300
    },

    columns : [
        {
            header    : 'Staff',
            sortable  : true,
            minWidth  : 80,
            dataIndex : 'Name',
            field     : { xtype : 'textfield' },
            flex      : 1
        },
        {
            header    : 'Type',
            sortable  : true,
            width     : 120,
            dataIndex : 'Type',
            field     : {
                xtype          : 'combobox',
                store          : [ 'Sales', 'Developer', 'Marketing', 'Product manager' ],
                typeAhead      : true,
                forceSelection : true,
                triggerAction  : 'all',
                selectOnFocus  : true
            }
        },
        {
            header    : 'Task Color',
            sortable  : false,
            width     : 100,
            dataIndex : 'Color',
            field     : {
                xtype : 'textfield',
                // match from start to end that each char is not double quote
                regex : /^[^"]*$/
            }
        },
        {
            xtype    : 'actioncolumn',
            sortable : false,
            align    : 'center',
            tdCls    : 'sch-valign',
            width    : 70,
            position : 'right',
            items    : [
                {
                    iconCls : 'icon-delete',
                    tooltip : 'Clear row',
                    handler : function (view, rowIndex, colIndex, btn, e, resource) {
                        var events    = resource.getEvents(),
                            toRemove  = [],
                            viewStart = view.timeAxis.getStart(),
                            viewEnd   = view.timeAxis.getEnd();

                        Ext.each(events, function (ev) {
                            if (Sch.util.Date.intersectSpans(viewStart, viewEnd, ev.getStartDate(), ev.getEndDate())) {
                                toRemove.push(ev);
                            }
                        });

                        view.eventStore.remove(toRemove);
                    }
                },
                {
                    iconCls : 'icon-add',
                    tooltip : 'Add new event',
                    handler : function (view, rowIndex, colIndex, btn, e, resource) {
                        view.up('schedulergrid').addTask(resource);
                    }
                }
            ]
        }
    ],

    tooltipTpl : '<dl class="eventTip">' +
    '<dt>Time</dt><dd>{[Ext.Date.format(values.StartDate, "Y-m-d G:i")]}</dd>' +
    '<dt>Task</dt><dd>{Title}</dd>' +
    '<dt>Location</dt><dd>{Location}</dd>' +
    '</dl>',

    // Specialized body template with header and footer
    eventBodyTemplate : '<div class="sch-event-header">{headerText}</div><div class="sch-event-footer">{footerText}</div>',

    eventRenderer : function (item, resourceRec, tplData) {
        var bookingStart = item.getStartDate();

        tplData.style = 'background-color:' + resourceRec.get('Color');

        return {
            headerText : Ext.Date.format(bookingStart, this.getDisplayDateFormat()),
            footerText : item.getName()
        };
    },

    initComponent : function () {
        var me = this;

        // Store holding all the resources
        var resourceStore = new Sch.data.ResourceStore({
            model    : 'Sch.examples.eventeditor.model.Resource',
            sortInfo : { field : 'Id', direction : 'ASC' }
        });

        // Store holding all the events
        var eventStore = new Sch.data.EventStore({
            model : 'Sch.examples.eventeditor.model.Event'
        });

        var zoneStore = new Sch.data.EventStore({
            autoDestroy : true,
            storeId     : 'zones'
        });

        var start = new Date(2017, 1, 7, 8);

        Ext.apply(me, {
            crudManager : {
                autoLoad      : true,
                eventStore    : eventStore,
                resourceStore : resourceStore,
                transport     : {
                    load : {
                        url : 'data/data.json'
                    }
                },
                stores        : [ zoneStore ]
            },
            startDate   : start,
            endDate     : Sch.util.Date.add(start, Sch.util.Date.HOUR, 12),

            header : {
                items : [
                    {
                        xtype : 'button',
                        text  : 'Select Date...',
                        scope : me,
                        menu  : Ext.create('Ext.menu.DatePicker', {
                            handler : function (dp, date) {
                                var D = Ext.Date;

                                me.setViewPreset('hourAndDay', D.add(date, D.HOUR, 8), D.add(date, D.HOUR, 18));
                            },
                            scope   : me
                        })
                    },
                    {
                        xtype : 'button',
                        text  : 'Add worker',
                        scope : me,
                        handler : function () {
                            resourceStore.add({
                                Name : 'New person',
                                Type       : 'Developer',
                                ImgUrl      : 'resources/images/dave.jpg',
                                Color       : '#1e6fb7'
                            });
                        }
                    },
                    {
                        xtype   : 'button',
                        cls     : 'btn-left',
                        iconCls : 'x-fa fa-arrow-circle-left',
                        scope   : me,
                        handler : function () {
                            me.shiftPrevious();
                        }
                    },
                    {
                        xtype   : 'button',
                        cls     : 'btn-right',
                        iconCls : 'x-fa fa-arrow-circle-right',
                        scope   : me,
                        handler : function () {
                            me.shiftNext();
                        }
                    },
                    {
                        xtype   : 'button',
                        cls     : 'btn-clear',
                        iconCls : 'x-fa fa-trash',
                        tooltip : 'Clear database',
                        scope   : me,
                        handler : function () {
                            me.eventStore.removeAll();
                        }
                    },
                    {
                        xtype   : 'button',
                        text    : 'Add new task',
                        handler : function () {
                            me.addTask(me.resourceStore.first());
                        }
                    }
                ]
            },

            plugins : [
                {
                    ptype     : 'myeditor',
                    listeners : {
                        show  : me.onEditorShow,
                        scope : me
                    }
                    // Editor configuration goes here
                },

                {
                    ptype        : 'cellediting',
                    clicksToEdit : 1
                },

                {
                    ptype : 'scheduler_zones',
                    store : zoneStore
                }
            ]
        });

        me.on({
            eventcontextmenu  : me.onEventContextMenu,
            beforetooltipshow : me.beforeTooltipShow,
            scope : me
        });

        me.callParent(arguments);
    },

    onEventCreated : function (newEventRecord) {
        // Overridden to provide some default values
        newEventRecord.set({
            Title     : 'New task...',
            Location  : 'Local office',
            EventType : 'Meeting'
        });
    },


    onEventContextMenu : function (s, rec, e) {
        e.stopEvent();

        if (!s.ctx) {
            s.ctx = new Ext.menu.Menu({
                items : [ {
                    text    : 'Delete event',
                    iconCls : 'icon-delete',
                    handler : function () {
                        s.eventStore.remove(s.ctx.rec);
                    }
                } ]
            });
        }
        s.ctx.rec = rec;
        s.ctx.showAt(e.getXY());
    },

    // Don't show tooltip if editor is visible
    beforeTooltipShow : function (s, r) {
        return !s.getEventEditor().isVisible(true);
    },

    addTask : function (resource) {
        var editor = this.normalGrid.findPlugin('myeditor');

        var newTask = this.eventStore.add({
            ResourceId : resource.getId(),
            Title      : 'New Task',
            StartDate  : this.getStart(),
            EndDate    : Sch.util.Date.add(this.getStart(), Sch.util.Date.HOUR, 3)
        })[ 0 ];

        editor.showForEvent(newTask);
    },

    onEditorShow : function () {
        this.getSchedulingView().tip && this.getSchedulingView().tip.hide();
    },

    onDestroy : function () {
        this.crudManager.destroy();
        this.callParent();
    }
});

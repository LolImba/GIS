// A simple preconfigured editor plugin
Ext.define('Sch.examples.eventeditor.view.DemoEditor', {
    extend : 'Sch.plugin.EditorWindow',
    alias  : 'plugin.myeditor',

    // modal    : true,

    // panel with form fields
    editorConfig : {
        // buttonAlign : 'center',

        showResourceField : true,

        startTimeConfig : {
            minValue : '08:00',
            maxValue : '18:00'
        },

        endTimeConfig : {
            minValue : '08:00',
            maxValue : '18:00'
        },

        fieldsPanelConfig : {
            xtype   : 'container',
            padding : 5,
            layout  : {
                type           : 'card',
                deferredRender : true
            },

            items : [
                // form for "Meeting" EventType
                {
                    EventType : 'Meeting',
                    xtype     : 'form',
                    items     : [
                        {
                            xtype      : 'textfield',
                            name       : 'Location',
                            fieldLabel : 'Location',
                            anchor     : '100%'
                        }
                    ]
                },
                // eof form for "Meeting" EventType

                // form for "Appointment" EventType
                {
                    EventType : 'Appointment',
                    xtype     : 'form',
                    defaults  : {
                        anchor : '100%'
                    },
                    items     : [
                        {
                            xtype      : 'textfield',
                            name       : 'Location',
                            fieldLabel : 'Location'
                        },
                        {
                            xtype      : 'combo',
                            store      : ['Dental', 'Medical'],
                            // Prevent clicks on the bound list to close the editor
                            listConfig : { cls : 'sch-event-editor-ignore-click' },
                            name       : 'Type',
                            fieldLabel : 'Type'
                        }
                    ]
                }
                // eof form for "Appointment" EventType
            ]
        }
    },

    showForEvent : function (eventRecord) {
        // var resource = eventRecord.getResource() || this.editor.resourceRecord;

        // Do any custom processing here before editor is shown

        this.callParent(arguments);
    }
});
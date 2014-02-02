(function (core) {

    'use strict';

    var eventEngine = function() {
        var eventsStack = {},
            getEventAndNamespace = function (events) {
                var eventList = events.split(' '),
                    result = [];

                for (var i = 0; i < eventList.length; i++) {
                    var item = eventList[i],
                        namespace = '*',
                        eventNamespace;

                    if (item) {
                        eventNamespace = item.split('.');

                        if (eventNamespace.length > 1) {
                            namespace = eventNamespace[1];
                        }

                        result.push({
                            event: eventNamespace[0],
                            namespace: namespace
                        });
                    }
                }

                return result;
            },
            getEventList = function (eventName, eventNamespace) {
                if (!eventsStack[eventName]) {
                    eventsStack[eventName] = {};
                }

                if (!eventsStack[eventName][eventNamespace]) {
                    eventsStack[eventName][eventNamespace] = [];
                }

                return eventsStack[eventName][eventNamespace];
            };

        return {
            eventsStack: eventsStack,
            bind: function (events, callback) {
                if (typeof events === 'string' && typeof callback === 'function') {
                    var eventList = getEventAndNamespace(events);

                    for (var i = 0, eventItem, eventInStack; i < eventList.length; i++) {
                        eventItem = eventList[i];
                        eventInStack = getEventList(eventItem.event, eventItem.namespace);

                        if (eventInStack) {
                            eventInStack.push(callback);
                        }
                    }
                }

                return this;
            },
            unbind: function(events, callback) {
                if (typeof events === 'string') {
                    var eventList = getEventAndNamespace(events);

                    for (var i = 0, eventItem, eventInStack, callbackIndex; i < eventList.length; i++) {
                        eventItem = eventList[i];
                        eventInStack = getEventList(eventItem.event, eventItem.namespace);

                        if (eventInStack) {
                            if (callback) {
                                callbackIndex = eventInStack.indexOf(callback);

                                if (callbackIndex !== -1) {
                                    eventInStack.splice(callbackIndex, 1);
                                }
                            } else {
                                eventInStack.splice(0);
                            }
                        }
                    }
                }

                return this;
            },
            unbindAllNamespace: function(namespace) {
                var eventList;
                for (var eventName in eventsStack) {
                    if (eventsStack.hasOwnProperty(eventName)) {
                        eventList = eventsStack[eventName];
                        if (eventList[namespace]) {
                            eventList[namespace] = [];
                        }
                    }
                }

                return this;
            },
            trigger: function(events, data) {
                if (typeof events === 'string') {
                    var eventList = getEventAndNamespace(events);

                    for (var i = 0, eventItem, eventInStack; i < eventList.length; i++) {
                        eventItem = eventList[i];
                        eventInStack = getEventList(eventItem.event, eventItem.namespace);

                        if (eventInStack) {
                            for (var j = 0; j < eventInStack.length; j++) {
                                eventInStack[j](eventItem.event, data);
                            }
                        }
                    }
                }

                return this;
            }
        };
    }();

    core.addPartNamespace('Engines', 'EventEngine', eventEngine);

})(ApplicationCore);

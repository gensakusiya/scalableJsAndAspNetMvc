(function (core) {

    'use strict';

    var coreEngine = function (description) {
        return {
            getCoreExportFunction: function (eventEngine) {
                var bind = function(func, context) {
                    return function() {
                        return func.apply(context, arguments);
                    };
                };

                return {
                    bind: bind(eventEngine.bind, eventEngine),
                    unbind: bind(eventEngine.unbind, eventEngine),
                    unbindAllNamespace: bind(eventEngine.unbindAllNamespace, eventEngine),
                    trigger: bind(eventEngine.trigger, eventEngine),
                    
                    getDomMeans: function () {
                        if (jQuery) {
                            return jQuery;
                        }
                        
                        //TODO выброс исключения
                    },
                    
                    getMvMeans: function () {
                        if (Backbone) {
                            return Backbone;
                        }
                        
                        //TODO выброс исключения
                    },
                    
                    getTemplateById: function(templateId) {
                        return document.getElementById(templateId).innerHTML;
                    },
                    
                    getBox: function(rootEl) {
                        return document.getElementById(rootEl);
                    },
                    
                    setSandboxTemplate: function (el, template) {
                        var child = document.createElement('div');
                        child.innerHTML = template;
                        
                        el.appendChild(child);
                    }
                };
            }
        };
    }(core.Descriptions.Core);

    core.addPartNamespace('Engines', 'CoreEngine', coreEngine);

})(ApplicationCore);

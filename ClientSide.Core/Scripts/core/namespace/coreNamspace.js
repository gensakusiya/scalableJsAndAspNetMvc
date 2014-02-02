(function (rootNamespace) {

    'use strict';

    rootNamespace.ApplicationCore = function () {

        var getPartNamespace = function (obj, path) {
                var parts = path.split('.');
            
                if (parts.length > 1) {
                    var result = null;
                
                    for (var i = 0; i < parts.length; i++) {
                        result = getFieldNamespace(result || obj, parts[i]);
                    }

                    return result;
                }

                return getFieldNamespace(obj, parts[0]);
            },
            getFieldNamespace = function (namespace, field) {
                if (!namespace[field]) {
                    namespace[field] = {};
                }

                return namespace[field];
            };

        return {
            Engines: {},
            Descriptions: {
                Core: {},
                Sandboxes: {},
                Modules: {},
                Routing: [] // array of routing applications
            },
            Sandboxes: {},
            Modules: {},
            Libraries: {},
            Extensions: {
                Utils: {},
                Mixins: {}
            },
            addPartNamespace: function (rootElement, namePart, addObj) {
                var namespace = getPartNamespace(this, rootElement);
                namespace[namePart] = addObj;
            }
        };
        
    }();

})(window);

(function (rootNamespace) {

    'use strict';
    
    rootNamespace.getNamespace = function (name) {
        rootNamespace[name] = rootNamespace[name] || {};
        return rootNamespace[name];
    };

})(window);

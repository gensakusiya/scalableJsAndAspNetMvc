(function (core) {

    'use strict';

    var moduleEngine = function () {
        var modules = {},
            descriptions = {},
            runModules = {};

        function getDescriptionModule(moduleName, sandbox) {
            var descriptionName = sandbox.getDescriptionName(moduleName);
            
            if (descriptionName === undefined || descriptionName === null) {
                return descriptions[moduleName];
            }

            return descriptions[descriptionName];
        }

        return {
            initializeModules: function(modulesList) {
                for (var moduleName in modulesList.Implementations) if (modulesList.Implementations.hasOwnProperty(moduleName)) {
                    modules[moduleName] = modulesList.Implementations[moduleName];
                }
                
                for (var moduleDescription in modulesList.Descriptions) if (modulesList.Descriptions.hasOwnProperty(moduleDescription)) {
                    descriptions[moduleDescription] = modulesList.Descriptions[moduleDescription];
                }

                return this;
            },
            createModule: function (moduleName, sandbox) {
                var module = modules[moduleName],
                    description = getDescriptionModule(moduleName, sandbox),
                    workingModule = runModules[moduleName];
                
                //TODO if description === null or undefined throw exception

                if (module) {
                    if (workingModule && typeof workingModule.refresh === 'function') {
                        workingModule.refresh(sandbox, description);
                    } else {
                        runModules[moduleName] = new module(sandbox, description);
                    }
                }

                return this;
            },
            deleteModule: function (nameModule) {

            },
            deleteAllRunningModules: function () {

            }
        };
    }();

    core.addPartNamespace('Engines', 'ModuleEngine', moduleEngine);

})(ApplicationCore);
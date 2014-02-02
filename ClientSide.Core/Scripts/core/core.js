(function(core) {

    'use strict';

    core.Core = (function () {
        var coreEngines = core.Engines,
            coreExport = coreEngines.CoreEngine.getCoreExportFunction(coreEngines.EventEngine),
            coreInstance;

        //TODO check availability all engines

        var coreInitialize = function (instanceOptions) {
            
            // function for core instance
            var changeRoute = function (options) {
                console.log('url changed');
                console.log(options);

                var sandbox = coreEngines.SandboxEngine.createSandbox(options.settings.Sandbox, coreExport, options);
                console.log('working sandbox - ' + sandbox.description.Name);

                initializeModules(sandbox);
            };
            
            // Initialize ALL Engine
            coreEngines.RoutingEngine.initializeRouting(changeRoute);

            coreEngines.SandboxEngine.initializeSandboxes(instanceOptions.Sandboxes.Descriptions);
            coreEngines.ModuleEngine.initializeModules(instanceOptions.Modules);

            // Initialize core instance
            coreInstance = {
                startApplication: function () {
                    coreEngines.RoutingEngine.startRouting();
                },
                stopApplication: function() {},
                destroyApplication: function () {},
                changeRoute: changeRoute
            };
        };
        
        function initializeModules(sandbox) {
            var modulesName = sandbox.description.Modules;
            for (var i = 0, module = modulesName[0]; i < modulesName.length; i++, module = modulesName[i]) {
                initializeModule(module.Name, sandbox);
            }
        }
        
        function initializeModule(moduleName, sandbox) {
            coreEngines.ModuleEngine.createModule(moduleName, sandbox);
        }
        
        return {
            getInstance: function (options) {
                if (!coreInstance) {
                    coreInitialize(options);
                }

                return coreInstance;
            }
        };
    })();

})(ApplicationCore);
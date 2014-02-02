(function(core) {

    'use strict';

    var sandboxEngine = function() {

        var sandboxes = {},
            workingSadbox;

        function createSandboxInstance(description, coreExport) {
            
            function Sandbox(settings) {
                this.description = settings;

                if (this.description.EnterTemplate) {
                    var sandboxTemplate = coreExport.getTemplateById(this.description.TemplateId),
                        parent = coreExport.getBox(this.description.InsertionPoint);
                    
                    coreExport.setSandboxTemplate(parent, sandboxTemplate);
                }
            }

            function getModuleDescription(moduleName) {
                for (var i = 0, module = this.description.Modules[0]; i < this.description.Modules.length; i++, module = this.description.Modules[i]) {
                    if (module.Name === moduleName) {
                        return module;
                    }
                }

                return null;
            }

            Sandbox.prototype.getIdRootElement = function (moduleName) {
                var module = getModuleDescription.call(this, moduleName);

                if (module) {
                    return module.InsertionPoint;
                }

                return null;
            };

            Sandbox.prototype.getMvPattern = function() {
                return coreExport.getMvMeans();
            };

            Sandbox.prototype.getDomMeans = function () {
                return coreExport.getDomMeans();
            };

            Sandbox.prototype.getTemplate = function(templateId) {
                return coreExport.getTemplateById(templateId);
            };

            Sandbox.prototype.getBox = function (moduleName) {
                var rootEl = this.getIdRootElement(moduleName);
                
                if (rootEl) {
                    return coreExport.getBox(rootEl);
                }
                
                //TODO exception rootEl not find
            };

            Sandbox.prototype.getDescriptionName = function(moduleName) {
                var module = getModuleDescription.call(this, moduleName);

                if (module) {
                    return module.DescriptionName;
                }

                return null;
            };

            Sandbox.prototype.bind = function (event, callback) {
                coreExport.bind(event, callback);
                return this;
            };
            
            Sandbox.prototype.unbindAllNamespace = function (namespace) {
                coreExport.unbindAllNamespace(namespace);
                return this;
            };
            
            Sandbox.prototype.unbind = function (event, callback) {
                coreExport.unbind(event, callback);
                return this;
            };
            
            Sandbox.prototype.trigger = function (event, data) {
                coreExport.trigger(event, data);
                return this;
            };

            return new Sandbox(description);
        }

        return {
            initializeSandboxes: function (sandboxesList) {
                for (var sandboxName in sandboxesList) if (sandboxesList.hasOwnProperty(sandboxName)) {
                    sandboxes[sandboxName] = sandboxesList[sandboxName];
                }
                
                return this;
            },
            initializeSandbox: function(sandboxDescription) {
                var box = sandboxes[sandboxDescription.Name];

                if (!box) {
                    sandboxes[sandboxDescription.Name] = sandboxDescription;
                }

                return this;
            },
            getSandboxInstance: function (nameSandbox) {},
            createSandbox: function (nameSandbox, coreExport, dataRequest) {
                if (!coreExport) {
                    //TODO исключение, нельзя создавать песочницу не пробросив объект ядра для экспорта    
                }

                var sandbox = sandboxes[nameSandbox];
                
                if (sandbox) {
                    //TODO уничтноение текущей песочницы, если она на момент создания сущесвтует

                    workingSadbox = createSandboxInstance(sandbox, coreExport);
                    return workingSadbox;
                }

                return null;
            },
            deleteSandbox: function (nameSandbox) {

            },
            deleteAllRunningSandboxes: function () {

            }
        };
    }();

    core.addPartNamespace('Engines', 'SandboxEngine', sandboxEngine);

})(ApplicationCore);
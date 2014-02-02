(function (core) {

    'use strict';

    var routingEngine = function(routingDescription) {
        var routes = {},
            initializeRoutesObject = function () {
                if (routingDescription.length) {
                    for (var i = 0, pathItem, pathPattern; i < routingDescription.length; i++) {
                        pathItem = routingDescription[i];
                        pathPattern = pathItem.Path.toString();
                        routes[pathPattern] = getCallbackRoutingFunction(pathItem, pathPattern);
                    }
                }
            },
            callbackRoutingFunction = function (pathOptions, pathReg, pathArguments) {
                var pathNames = pathReg.match(/:\w/g),
                    options = {
                        settings: pathOptions,
                        params: {}
                    };
            
                if (pathNames && pathNames.length) {
                    for (var i = 0, item; i < pathNames.length; i++) {
                        item = pathNames[i];
                        options.params[item.replace(':', '')] = pathArguments[i];
                    }
                }

                changeRouteFunctionCallback(options);
            },
            getCallbackRoutingFunction = function (pathItem, pathPattern) {
                return function () {
                    var paramName = pathPattern,
                        pathOptions = pathItem;
                
                    callbackRoutingFunction(pathOptions, paramName, arguments);
                };
            },
            router,
            changeRouteFunctionCallback;

        return {
            initializeRouting: function (changeRouteFunction) {
                if (!changeRouteFunction) {
                    //TODO throw exception - appCoreGenerateExceprionEngine
                }
                
                changeRouteFunctionCallback = changeRouteFunction;
                initializeRoutesObject();
                router = Router(routes);
            },
            startRouting: function () {
                router.init();
            },
            stopRouting: function () {}
        };

    }(core.Descriptions.Routing);

    core.addPartNamespace('Engines', 'RoutingEngine', routingEngine);

})(ApplicationCore);
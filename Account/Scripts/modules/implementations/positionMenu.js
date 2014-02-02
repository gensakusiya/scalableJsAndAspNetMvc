(function (app) {

    'use strict';

    app.PositionMenu = function (sandbox, description) {
        console.log('create position menu module');

        var template = sandbox.getTemplate(description.TemplateId),
            box = sandbox.getBox(description.Name),
            $ = sandbox.getDomMeans(),
            $box = $(box);

        $box.append(template);
    };

})(Application.Modules.Implementations);
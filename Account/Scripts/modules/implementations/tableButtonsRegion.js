(function (app) {

    'use strict';

    app.TableButtonsRegion = function (sandbox, description) {
        console.log('create table buttons module');

        var template = sandbox.getTemplate(description.TemplateId),
            box = sandbox.getBox(description.Name),
            $ = sandbox.getDomMeans(),
            $box = $(box);

        $box.append(template);

        var $addButton = $box.find('#AddTransferButton');
        $addButton.on('click', function() {
            sandbox.trigger('AddTransfer.' + description.Name);
        });
    };

})(Application.Modules.Implementations);
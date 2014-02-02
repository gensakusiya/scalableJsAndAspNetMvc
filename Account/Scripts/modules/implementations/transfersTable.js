(function (app) {

    'use strict';

    app.TransfersTable = function (sandbox, description) {
        console.log('create transfers table module');

        var template = sandbox.getTemplate(description.TemplateId),
            box = sandbox.getBox(description.Name),
            $ = sandbox.getDomMeans(),
            $box = $(box);

        $box.append(template);

        sandbox.bind('AddTransferPlayer.AddTransferDialog', function (e, data) {
            console.log(data);
            var tr = '<tr><td>' + data.Surname + ' ' + data.Name + '</td><td>' + data.Age + '</td>' +
                '<td>' + data.Nation + '</td><td>' + data.Club + '</td><td>' + data.Amount + '</td></tr>';

            $box.find('table tbody').append(tr);
        });
    };

})(Application.Modules.Implementations);
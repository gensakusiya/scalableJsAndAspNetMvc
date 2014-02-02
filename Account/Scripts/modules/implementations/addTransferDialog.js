(function(app) {

    'use strict';

    app.AddTransferDialog = function (sandbox, description) {
        console.log('create add transfer dialog module');

        var template = sandbox.getTemplate(description.TemplateId),
            $ = sandbox.getDomMeans();

        sandbox.bind('AddTransfer.TableButtonsRegion', function () {
            $.Dialog({
                overlay: true,
                shadow: true,
                flat: true,
                content: '',
                padding: 10,
                width: 500,
                onShow: function(dialog){
                    var content = template;
 
                    $.Dialog.title("Добавить трансфер игрока");
                    $.Dialog.content(content);
                    $.Metro.initInputs();

                    var $button = dialog.find('#AddTransferButton');
                    $button.on('click', function(e) {
                        var $form = dialog.find('form'),
                            surname = $form.find('[name=surname]').val(),
                            name = $form.find('[name=name]').val(),
                            age = $form.find('[name=age]').val(),
                            club = $form.find('[name=club]').val(),
                            amount = $form.find('[name=amount]').val(),
                            nation = $form.find('[name=nation]').val(),
                            data = {
                                Surname: surname,
                                Name: name,
                                Age: age,
                                Nation: nation,
                                Club: club,
                                Amount: amount
                            };

                        sandbox.trigger('AddTransferPlayer.' + description.Name, data);

                        e.preventDefault();
                        e.stopPropagation();

                        $.Dialog.close();
                    });
                }
            });
        });
    };

})(Application.Modules.Implementations);
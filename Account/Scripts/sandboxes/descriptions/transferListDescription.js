(function (descriptionsModule) {

    'use strict';

    descriptionsModule.TransfersList = function () {

        return {
            Name: 'TransfersList',
            Version: 0.1,
            
            EnterTemplate: true,
            TemplateId: 'TransfersListSandbox',
            InsertionPoint: 'PageContent',

            Modules: [
                {
                    Name: 'PositionMenu',
                    Version: 0.1,
                    InsertionPoint: 'TransferMenu',
                    DescriptionName: null
                },
                {
                    Name: 'TableButtonsRegion',
                    Version: 0.1,
                    InsertionPoint: 'TableButtonsRegion',
                    DescriptionName: 'TransfersButtonsRegion'
                },
                {
                    Name: 'TransfersTable',
                    Version: 0.1,
                    InsertionPoint: 'PlayersTable',
                    DescriptionName: null
                },
                {
                    Name: 'AddTransferDialog',
                    Version: 0.1,
                    InsertionPoint: '',
                    DescriptionName: null
                }
            ],
            
            NecessaryParts: {
                events: ['bind', 'unbind', 'unbindAllNamespace', 'trigger'],
                templateLoader: true,
                mvFramework: false
            }
        };

    }();

})(Application.Sandboxes.Descriptions);
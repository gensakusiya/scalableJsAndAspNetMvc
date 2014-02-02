(function (core) {

    'use strict';

    var templateEngine = function() {

        return {
            getTemplateId: function(templateId) {
                return document.getElementById(templateId);
            }  
        };
    }();

    core.addPartNamespace('Engines', 'TemplateEngine', templateEngine);

})(ApplicationCore);
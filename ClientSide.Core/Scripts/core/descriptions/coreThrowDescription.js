(function (core) {

    var description = {
        Сriticality: {
            Not: 0,
            Low: 1,
            Mid: 2,
            Max: 3
        }
    };

    core.addPartNamespace('Descriptions.Core', 'ThrowEnum', description);

})(ApplicationCore);
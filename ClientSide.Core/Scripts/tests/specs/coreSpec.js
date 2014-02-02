describe('core spec', function () {

    it('core object exsist', function() {
        expect(ApplicationCore.Core).not.toBeUndefined();
    });

    it('core singleton instance', function () {
        var core, newCore;

        core = ApplicationCore.Core.getInstance();
        newCore = ApplicationCore.Core.getInstance();

        expect(core).toBe(newCore);
    });

    it('core object gives to the managment interface', function () {
        var core = ApplicationCore.Core.getInstance();

        expect(typeof core.startApplication).toBe('function');
        expect(typeof core.stopApplication).toBe('function');
        expect(typeof core.destroyApplication).toBe('function');
    });

});
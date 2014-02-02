describe('event engine spec', function () {
    it('initialize event engine', function() {
        expect(ApplicationCore.Engines.EventEngine).not.toBeUndefined();
    });

    it('bind click event', function () {
        ApplicationCore.Engines.EventEngine.bind('click', function() {});
        
        var event = ApplicationCore.Engines.EventEngine.eventsStack['click'];
        expect(event).not.toBeUndefined();
        expect(event['*'].length).toBe(1);
    });
    
    it('unbind click event', function () {
        ApplicationCore.Engines.EventEngine.unbind('click');

        var event = ApplicationCore.Engines.EventEngine.eventsStack['click'];
        expect(event).not.toBeUndefined();
        expect(event['*'].length).toBe(0);
    });

    it('trigger event', function () {
        var callbackObj = {
            callback: function () { }
        };
        spyOn(callbackObj, 'callback');
        
        ApplicationCore.Engines.EventEngine.bind('click.testNamespace', callbackObj.callback);
        ApplicationCore.Engines.EventEngine.trigger('click.testNamespace', {});
        
        expect(callbackObj.callback).toHaveBeenCalled();
        expect(callbackObj.callback.calls.length).toEqual(1);
    });
    
    it('bind many events', function () {
        ApplicationCore.Engines.EventEngine.bind('click mouseenter.Module1 focusOut.Module2', function () { });

        var eventStack = ApplicationCore.Engines.EventEngine.eventsStack;
        
        expect(eventStack['click']['*'].length).toBe(1);
        expect(eventStack['mouseenter']['Module1'].length).toBe(1);
        expect(eventStack['focusOut']['Module2'].length).toBe(1);
    });
});

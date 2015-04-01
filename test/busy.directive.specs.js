'use strict';

describe('the busy indicator', function () {
    var $compile,
        $rootScope,
        el;

    beforeEach(module('me.busy'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        el = $compile("<me-busy busy='busy'></me-busy>")($rootScope);
    }));

    it('should initially be hidden', function () {
        $rootScope.$digest();
        expect(el.hasClass('invisible')).toEqual(true);
    });

    it('should show when busy', function () {
        $rootScope.busy = true;
        $rootScope.$digest();
        expect(el.hasClass('invisible')).toEqual(false);
    });

    it('should hide when not busy', function () {
        $rootScope.busy = false;
        $rootScope.$digest();
        expect(el.hasClass('invisible')).toEqual(true);
    });
});


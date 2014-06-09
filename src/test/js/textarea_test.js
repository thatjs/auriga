/*globals inject,module */
describe('Testing modules', function () {

    describe('thatjs module:', function () {
        var module;

        beforeEach(function () {
            module = angular.module('thatjs');
        });

        it('should be registered', function () {
            expect(module).not.toBe(null);
        });

        it('should have a headerNavCtrl controller', function () {
            expect(module.headerNavCtrl).not.toBe(null);
        });
    });

    describe('urlDecode module:', function () {
        var module;

        beforeEach(function () {
            module = angular.module('urlDecode');
        });

        it('should be registered', function () {
            expect(module).not.toBe(null);
        });

        it('should have a decode controller', function () {
            expect(module.decode).not.toBe(null);
        });
    });

    describe('thatjs twinTextarea directive:', function () {
        var $compile,
            $rootScope;

        // Load the thatjs module, which contains the directive
        beforeEach(module('urlDecode'));

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(
            ['$compile', '$rootScope', function ($c, $r) {
                $compile = $c;
                $rootScope = $r;
            }]
        ));

        it("should display two different textarea elements", function () {
            var element = $compile('<div twin-textarea ng-controller="decode"></div>')($rootScope);
            // template is formatted correctly
            expect(element.html()).toMatch(/js-src/i);
            expect(element.html()).toMatch(/js-test/i);
        });

    });
});

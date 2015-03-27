/* jshint -W097 */
'use strict';
angular.module('me.busy', [])
    .directive('meBusy', function(){
        return {
            restrict: 'E',
            replace: true,
            template: "<div class='wrap go'><div class='loader bar'><div class='one'/><div class='two'/><div class='three'/><div class='four'/></div></div>",
            scope: {
                busy: '='
            },
            link: function(scope, el){
                el.addClass('invisible');
                scope.$watch('busy', function(busy){
                    if (busy === true){
                        el.removeClass('invisible');
                    } else {
                        el.addClass('invisible');
                    }
                }, true);
            }
        };
    });
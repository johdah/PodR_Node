'use strict';

angular.module('podr').directive('holderFix', function() {
    return {
        link: function (scope, element, attrs) {
            Holder.run({images:element.get(0), nocss:true});
        }
    };
});
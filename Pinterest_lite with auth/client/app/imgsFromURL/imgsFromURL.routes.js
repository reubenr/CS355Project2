(function() {
    'use strict';

    angular.module('app.imgsFromURL')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/imgsFromURL', {
                    templateUrl: 'imgsFromURL/imgsFromURL.html',
                    controller: 'ImgsFromURL',
                    controllerAs: 'vm',
                    access: {requiredLogin: false}
                });
            }])
})();

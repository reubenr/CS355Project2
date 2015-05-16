(function() {
    'use strict';

    angular.module('app.about')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/about', {
                    templateUrl: 'about/about.html'
                });
            }])

})();


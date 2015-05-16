(function() {
    'use strict';

    angular.module('app.user')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/login', {
                    templateUrl: 'user/login.html',
                    access: {requiredLogin: false}
                });
            }])

})();

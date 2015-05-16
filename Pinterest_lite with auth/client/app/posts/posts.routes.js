(function() {
    'use strict';

angular.module('app.posts')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/posts', {
                templateUrl: 'posts/posts.html',
                controller: 'Posts',
                controllerAs: 'vm',
                access: {requiredLogin: false}
            })
}])

})();
app.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
    function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
        $scope.user = {
            username: '',
            password: ''
        };

        $scope.login = function() {
            console.log('in login function');

            var username = $scope.user.username,
                password = $scope.user.password;

            if (username !== undefined && password !== undefined) {
                UserAuthFactory.login(username, password).success(function(data) {

                    AuthenticationFactory.isLogged = true;
                    AuthenticationFactory.user = data.user;
                    AuthenticationFactory.userRole = data.user.role;

                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.user = data.user; // to fetch the user details on refresh
                    $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh
                    console.log('logged '+AuthenticationFactory.isLogged + ' AF user '+AuthenticationFactory.user+' sS token '+  $window.sessionStorage.token+' sS user '+ $window.sessionStorage.user);

                    $location.path("/posts");

                }).error(function(status) {
                    alert('Oops something went wrong!');
                });
            } else {
                alert('Invalid credentials');
            }

        };

    }
]);
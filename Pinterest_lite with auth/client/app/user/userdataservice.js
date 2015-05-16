(function() {
    'use strict';
    angular
        .module('app.user')
        .factory('userdataservice', userdataservice);

    userdataservice.$inject = ['$http', '$location', '$route'];

    function userdataservice($http, $location, $route) {
        return {
            createUser: createUser,
            getUsers: getUsers,
            deleteUser: deleteUser,
            updateUser: updateUser
        };



        function createUser (Fname, Lname, Email, Password) {
            $http({
                url: 'http://localhost:3000/users/createUser',
                method: "POST",
                data: {Fname: Fname, Lname: Lname, Email: Email, Password: Password}
            })
                .then(createUserComplete)
                .catch(createUserFailed);

            function createUserComplete(data) {
                console.log(data);
                if (data.data === 'true') {
                    window.alert('Success!');
                }
            }

            function createUserFailed(error) {
                console.log('XHR Failed for createUser.' + error.data);
            }
        }

        function getUsers() {
            return $http.get('http://localhost:3000/users/getUsers')
                .then(getUserComplete)
                .catch(getUserFailed);

            function getUserComplete(data) {
                return data.data.users;
            }

            function getUserFailed(error) {
                console.log('XHR Failed for getUsers.' + error.data);
            }
        }

        function deleteUser( UserID) {
            $http({
                url: 'http://localhost:3000/users/deleteUser',
                method: "GET",
                params: {UserID: UserID}
            })
                .then(deleteUserComplete)
                .catch(deleteUserFailed);

            function deleteUserComplete(data) {
                console.log("successfully deleted user with id: " + UserID);
                if (data.data === 'true') {
                    $route.reload();
                }
            }

            function deleteUserFailed(error) {
                console.log('XHR Failed for deleteUser.' + error.data);
            }
        }

        function updateUser(UserID, NewEmail, NewFname, NewLname) {
            $http({
                url: 'http://localhost:3000/users/updateUser',
                method: "POST",
                data: {UserID: UserID, NewEmail: NewEmail, NewFname: NewFname, NewLName: NewLname}
            })
                .then(updateUserComplete)
                .catch(updateUserFailed);

            function updateUserComplete(data) {
                console.log("successfully updated user with id: " + UserID);
                console.log(data.data);
                if (data.data === 'true') {
                    $route.reload();
                }
            }

            function updateUserFailed(error) {
                console.log('XHR Failed for updateUser.' + error.data);
            }
        }
    }
})();

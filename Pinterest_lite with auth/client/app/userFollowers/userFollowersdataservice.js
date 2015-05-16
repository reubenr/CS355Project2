(function() {
    'use strict';
    angular
        .module('app.userFollowers')
        .factory('userFollowersdataservice', userFollowersdataservice);

    userFollowersdataservice.$inject = ['$http', '$location', '$route'];

    function userFollowersdataservice($http, $location, $route) {

        return {
            createFollower: createFollower,
            getFollowees: getFollowees,
            getNumFollowees: getNumFollowees,
            deleteFollowee: deleteFollowee
        };


        function createFollower (FollowedUserID, FollowingUserID) {
            $http({
                url: 'http://localhost:3000/api/v1/followers/createFollower',
                method: "GET",
                params: {FollowedUserID: FollowedUserID, FollowingUserID: FollowingUserID}
            })
                .then(createFollowerComplete)
                .catch(createFollowerFailed);

            function createFollowerComplete(data) {
                getFollowees(FollowingUserID);
                console.log(data);
                if (data.data === 'true') {
                    window.alert("you are now following that user");
                }
            }

            function createFollowerFailed(error) {
                console.log('XHR Failed for createFollower.' + error.data);
            }
        }

        function getFollowees(FollowingUserID) {
            return $http({
                url: 'http://localhost:3000/api/v1/followers/getFollowees',
                method: "GET",
                params: {FollowingUserID: FollowingUserID}
            })
                .then(getFolloweesComplete)
                .catch(getFolloweesFailed);

            function getFolloweesComplete(data) {
                console.log(data.data.user);
                return data.data.user;
            }

            function getFolloweesFailed(error) {
                console.log('XHR Failed for getFollowees.' + error.data);
            }
        }


        function getNumFollowees(FollowingUserID) {
            return $http({
                url: 'http://localhost:3000/api/v1/followers/getNumFollowees',
                method: "GET",
                params: {FollowingUserID: FollowingUserID}
            })
                .then(getNumFolloweesComplete)
                .catch(getNumFolloweesFailed);

            function getNumFolloweesComplete(data) {
                console.log(data.data.user);
                return data.data.user;
            }

            function getNumFolloweesFailed(error) {
                console.log('XHR Failed for getNumFollowees.' + error.data);
            }
        }

        function deleteFollowee(FollowedUserID, FollowingUserID) {
            return $http({
                url: 'http://localhost:3000/api/v1/followers/deleteFollowee',
                method: "GET",
                params: {FollowedUserID: FollowedUserID, FollowingUserID: FollowingUserID}
            })
                .then(deleteFolloweeComplete)
                .catch(deleteFolloweeFailed);

            function deleteFolloweeComplete(data) {
                console.log("successfully deleted followee with id: " + FollowedUserID);
            }

            function deleteFolloweeFailed(error) {
                console.log('XHR Failed for deleteFollowee.' + error.data);
            }
        }

    }
})();

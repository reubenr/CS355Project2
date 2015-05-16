(function() {
    'use strict';

    angular
        .module('app.userFollowers')
        .controller('UserFollowers', UserFollowers);

    function UserFollowers($location, userFollowersdataservice, AuthenticationFactory) {
        var vm = this;
        vm.UserID = '';
        vm.followees = [];
        vm.followeeInfo = [];
        vm.activateFollowees = activateFollowees;
        vm.stopFollowing = stopFollowing;
        vm.showUserPosts = showUserPosts;



        function activateFollowees(){
            console.log('in activate followees userID is ' + AuthenticationFactory.user);
            return getFollowees()
                .then(getNumFollowees());
        }



        function getNumFollowees() {
            if (AuthenticationFactory.isLogged) {
                return userFollowersdataservice.getNumFollowees(AuthenticationFactory.user)
                    .then(function (data) {
                        vm.numFollowees = data[0].count;
                        console.log(vm.numFollowees);
                        return vm.numFollowees;
                    });
            }
        }




        function getFollowees() {
            if (AuthenticationFactory.isLogged) {
                return userFollowersdataservice.getFollowees(AuthenticationFactory.user)
                    .then(function (data) {
                        vm.followees = data;
                        console.log(vm.followees);
                        return vm.followees;
                    });
            }
            else{
                window.alert("You must be logged in to see friends");
            }
        }


        function stopFollowing(UserID){
            return userFollowersdataservice.deleteFollowee(AuthenticationFactory.user, UserID)
                .then(function(data){
                    activateFollowees();
                });
        }

        function showUserPosts(Data) {
            $location.path('/posts').search({param: Data});
        }

    }

})();

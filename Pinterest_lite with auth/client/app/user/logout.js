(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('Logout', Logout);
    function Logout(UserAuthFactory){
        var vm = this;
        vm.LogoutNow = logoutNow;
        function logoutNow(){
            UserAuthFactory.logout();
            window.alert("you are logged out");
        }
    }

})();

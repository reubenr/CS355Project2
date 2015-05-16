(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('Login', Login);

    function Login(userdataservice) {
        var vm = this;
        vm.email = '';
        vm.pass = '';
        vm.fname = '';
        vm.lname = '';
        vm.logInEmail = '';
        vm.logInPass = '';
        vm.createUser = createUser;


        function resetForm(){
            vm.email = '';
            vm.pass = '';
            vm.fname = '';
            vm.lname = '';
            vm.logInEmail = '';
            vm.logInPass = '';
        }

        function createUser(){
            userdataservice.createUser(vm.fname, vm.lname, vm.email, vm.pass);
            resetForm();
        }


    }

})();

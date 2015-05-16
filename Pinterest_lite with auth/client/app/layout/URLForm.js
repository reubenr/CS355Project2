(function() {
    'use strict';

    angular
        .module('app.layout')

        .controller('URLForm', URLForm);


    function URLForm(Data, $location, $route) {
        var vm = this;
        vm.url = Data;
        vm.submit = submit;
        function submit(){
            $location.url("/imgsFromURL");
            console.log('data ' + JSON.stringify(Data));
            $route.reload();
        }
    }

})();




(function() {
    'use strict';

    angular
        .module('app.imgsFromURL')
        .controller('ImgsFromURL', ImgsFromURL);

    function ImgsFromURL(URLdataservice, Data, postdataservice, AuthenticationFactory){
        var vm = this;
        vm.images = [];
        vm.url = Data;
        vm.createPost = createPost;
        console.log("images: " + vm.url.url);

        activate();

        function activate(){
            return getURLs()
                .then(function(){

            });
        }

       function getURLs(){
            return URLdataservice.getURLs(vm.url.url)
                .then(function(data){
                    vm.url.url = '';
                    vm.images = data;
                    console.log(vm.images);
                    return vm.images;
                });
        }

        function createPost(OrigImgURL, ImgURL, Description){
            if (AuthenticationFactory.isLogged) {
                postdataservice.createPost(AuthenticationFactory.user, OrigImgURL, ImgURL, Description);
            }
            else{
                window.alert("You must be logged in to create a post");
            }
        }
    }
})();



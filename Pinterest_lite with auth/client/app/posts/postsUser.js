(function() {
    'use strict';

    angular
        .module('app.posts')
        .controller('PostsUser', PostsUser);
    function PostsUser(postdataservice, $routeParams){
        var vmuser = this;
        vmuser.posts = [];
        var param1= $routeParams.param;
        console.log('param '+ param1);
        activate();

        function activate(){
            return getPostsByUser(param1)
                .then(function(){

                });
        }


        function getPostsByUser(user){
            console.log('user ' + user);
            return postdataservice.getPostsByUser(user)
                .then(function(data){
                    vmuser.posts = data;
                    console.log(vmuser.posts[0]);
                    return vmuser.posts;
                });
        }
    }

})();

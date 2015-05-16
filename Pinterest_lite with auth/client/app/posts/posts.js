(function() {
    'use strict';

    angular
        .module('app.posts')
        .controller('Posts', Posts);
    function Posts(postdataservice, userFollowersdataservice, $routeParams, AuthenticationFactory){
        var vm = this;
        var param1= $routeParams.param;
        console.log(param1);
        vm.posts = [];
        vm.comments = [];
        vm.editorEnabled = [];
        vm.commentsEnabled = [];
        vm.deletePost = deletePost;
        vm.updatePost = updatePost;
        vm.enableEditor = enableEditor;
        vm.hideComments = hideComments;
        vm.disableEditor = disableEditor;
        vm.followPoster = followPoster;
        vm.getComments = getComments;
        vm.tagComment = tagComment;
        vm.clearComment = clearComment;
        vm.makeComment = '';
        vm.makeTag = '';

        activate();

        function activate(){
            if (param1 === undefined) {
                return getPosts()
                    .then(function(){

                    });
            }
            else {
                return getPostsByUser(param1)
                    .then(function(){

                    });
            }

        }

        function getComments(postID, $index){
            if (vm.comments.length == 0){
                return postdataservice.getComments(postID)
                .then(function(data){
                    for (var i in data){
                        vm.comments.push(data[i].Comment);
                    }
                    console.log(vm.comments.Comment);
                    for (var post in vm.posts){
                        if (vm.posts[post].PostID == postID){
                            vm.posts[post].comments = vm.comments;
                            console.log(vm.posts[post] , ' post');
                        }

                    }
                        vm.commentsEnabled[$index] = true;
                        console.log(vm.comments[0]);
                    return vm.comments;
                });
            }
            else{
                vm.commentsEnabled[$index] = true;
            }
        }



        function getPosts(){
            return postdataservice.getPosts()
                .then(function(data){
                    vm.posts = data;
                    for (var each in vm.posts){
                        if (vm.posts[each].UserID == AuthenticationFactory.user){
                            vm.posts[each].owned = true;
                        }
                        else{
                            vm.posts[each].owned = false;
                        }

                    }
                    console.log(vm.posts[0]);
                    return vm.posts;
                });
        }

        function getPostsByUser(user){
            return postdataservice.getPostsByUser(user)
                .then(function(data){
                    vm.posts = data;
                    for (var each in vm.posts){
                        if (vm.posts[each].UserID === AuthenticationFactory.user){
                            vm.posts[each].owned = true;
                        }
                        else{
                            vm.posts[each].owned = false;
                        }
                    }
                    console.log(vm.posts[0]);
                    return vm.posts;
                });
        }

        function hideComments($index){
            vm.commentsEnabled[$index] = false;
        }


        function deletePost(PostID, UserID){
            postdataservice.deletePost(PostID, UserID);
        }

        function updatePost(PostID, UserID){
            postdataservice.updatePost(PostID, UserID, vm.editableDesc);
            disableEditor();
        }

        function tagComment(PostID){
            console.log(vm.makeTag, vm.makeComment);
            postdataservice.tagComment(PostID, vm.makeTag, vm.makeComment);
            vm.makeComment = '';
            vm.makeTag = '';
            vm.getComments(PostID);
        }

        function clearComment(){
            vm.makeComment = '';
            vm.makeTag = '';
        }

        function enableEditor($index){
            vm.editorEnabled[$index] = true;
            vm.editableDesc = vm.posts.Description;
        }

        function disableEditor($index){
            vm.editorEnabled[$index] = false;
        }

        function followPoster(UserID){
            if (AuthenticationFactory.isLogged) {
                userFollowersdataservice.createFollower(UserID, AuthenticationFactory.user);
            }
            else{
                window.alert("you must be logged in to follow somebody");
            }
        }
    }

})();
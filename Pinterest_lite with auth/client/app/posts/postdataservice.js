(function() {
    'use strict';
    angular
        .module('app.posts')
        .factory('postdataservice', postdataservice);

    postdataservice.$inject = ['$http', '$location', '$route'];

    function postdataservice($http, $location, $route) {

        return {
            createPost: createPost,
            getPosts: getPosts,
            getPostsByUser: getPostsByUser,
            deletePost: deletePost,
            updatePost: updatePost,
            tagComment: tagComment,
            getComments: getComments
        };

        function createPost (UserID, OrigImgURL, ImgURL, Description) {
            $http({
                url: 'http://localhost:3000/api/v1/post/createPost',
                method: "POST",
                data: {UserID: UserID, OrigImgURL: OrigImgURL, ImgURL: ImgURL, Description: Description }
            })
                .then(createPostComplete)
                .catch(createPostFailed);

            function createPostComplete(data) {
                console.log(data);
                if (data.data === 'true') {
                    $location.url('posts');
                }
            }

            function createPostFailed(error) {
                console.log('XHR Failed for createPosts.' + error.data);
            }
        }

        function getPosts() {
            return $http.get('http://localhost:3000/post/getPosts')
                .then(getPostComplete)
                .catch(getPostFailed);

            function getPostComplete(data) {
                return data.data.posts;
            }

            function getPostFailed(error) {
                console.log('XHR Failed for getPosts.' + error.data);
            }
        }

        function getComments(PostID) {
            return $http.get('http://localhost:3000/post/getComments?postID='+ PostID)
                .then(getCommentsComplete)
                .catch(getCommentsFailed);

            function getCommentsComplete(data) {
                return data.data.comments;
            }

            function getCommentsFailed(error) {
                console.log('XHR Failed for getComments.' + error.data);
            }
        }

        function getPostsByUser(UserID) {
            return $http.get('http://localhost:3000/api/v1/post/getPostsByUser?userID='+ UserID)
                .then(getPostComplete)
                .catch(getPostFailed);

            function getPostComplete(data) {
                return data.data.posts;
            }

            function getPostFailed(error) {
                console.log('XHR Failed for getPosts.' + error.data);
            }
        }


        function deletePost(PostID, UserID) {
            $http({
                url: 'http://localhost:3000/api/v1/post/deletePost',
                method: "GET",
                params: {PostID: PostID, UserID: UserID}
            })
                .then(deletePostComplete)
                .catch(deletePostFailed);

            function deletePostComplete(data) {
                console.log("successfully deleted post with id: " + PostID);
                if (data.data === 'true') {
                    $route.reload();
                }
            }

            function deletePostFailed(error) {
                console.log('XHR Failed for deletePosts.' + error.data);
            }
        }


        function tagComment(PostID, tag, comment) {
            console.log(PostID, tag, comment);
            $http({
                url: 'http://localhost:3000/post/tagComment',
                method: "GET",
                params: {PostID: PostID, TagText: tag, CommentText: comment}
            })
                .then(tagCommentComplete)
                .catch(tagCommentFailed);

            function tagCommentComplete(data) {
                console.log("successfully inserted comments and tags for post with id: " + PostID);
                if (data.data === 'true') {
                    $route.reload();
                }
            }

            function tagCommentFailed(error) {
                console.log('XHR Failed for tagComments.' + error.data);
            }
        }



        function updatePost(PostID, UserID, Description) {
            $http({
                url: 'http://localhost:3000/api/v1/post/updatePost',
                method: "POST",
                data: {PostID: PostID, UserID: UserID, Description: Description}
            })
                .then(updatePostComplete)
                .catch(updatePostFailed);

            function updatePostComplete(data) {
                console.log("successfully updated post with id: " + PostID);
                console.log(data.data);
                if (data.data === 'true') {
                    $route.reload();
                }
            }

            function updatePostFailed(error) {
                console.log('XHR Failed for updatePosts.' + error.data);
            }
        }
    }
})();

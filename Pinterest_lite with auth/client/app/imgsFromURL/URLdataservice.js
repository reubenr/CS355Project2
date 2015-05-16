(function() {
    'use strict';
    angular
    .module('app.imgsFromURL')
    .factory('URLdataservice', URLdataservice);

URLdataservice.$inject = ['$http'];

function URLdataservice($http) {
    return {
        getURLs: getURLs
    };

    function getURLs(url) {
        return $http.get('http://localhost:3000/images/imagesFromURL?url='+ url)
            .then(getURLComplete)
            .catch(getURLFailed);

        function getURLComplete(data) {
            console.log(data.data[0]);
            return data.data;
        }

        function getURLFailed(error) {
            console.log('XHR Failed for getURL.' + error.data);
        }
    }
}
})();
'use restrict';

testapp.factory("apiHandler",['$http','url',
function($http,url){
	var obj = {};
	obj.get = function (q) {
            return $http.get(url.base_url + q);
        };
	obj.post = function (q, object) {
            return $http.post(url.base_url + q, object);
        };
    obj.delete = function (q) {
            return $http.delete(url.base_url + q);
        };
    obj.put = function (q, object) {
            return $http.put(url.base_url + q, object);
        };
	return obj;
	
}]);




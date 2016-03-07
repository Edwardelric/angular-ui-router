require.config({
    paths:{
        'jquery':'../libs/jquery-1.11.3.min',
        'angular':'../libs/angular-1.4.7/angular',
        'ui.router':'../libs/angular-1.4.7/angular-ui-router',
        'ocLazyLoad':'../libs/ocLazyLoad/ocLazyLoad',
        'router':'approuter'
    },
    shim:{
        'angular':{
            exports:'angular'
        },
        'ui.router':['angular'],
        'ocLazyLoad':['angular'],
        'router':['angular']
    }
})
require(['jquery','angular','ui.router','ocLazyLoad'],function(jquery,angular){
    angular.module('app.home',[]);
    angular.module('app.case',[]);
    angular.module('app.concat',[]);
    angular.module('app.cooperate',[]);
    angular.module('app.service',[]);
    angular.module('app',[
    	'ui.router',
    	'oc.lazyLoad',
    	'app.home',
    	'app.case',
    	'app.concat',
    	'app.cooperate',
    	'app.service'
    ]).config(['$httpProvider',function($httpProvider){
        $httpProvider.interceptors.push(['$q','$location','$rootScope','$injector',function($q,$location,$rootScope,
            $injector){
            var pending = 0;
           	$rootScope.$watch(
                function (){
                	return pending;
                },
                function (loading){
                	$rootScope.loading = loading;
                }
            );
            return {
                request : function(config){
                	if(config.headers['NoLoadingBar'] != 'NoLoadingBar')
                    pending++;
                    return config;
                },
                requestError: function(config){
                    if(config.headers['NoLoadingBar'] != 'NoLoadingBar')
                    pending++;
                },
                response: function(response){
                	if(response.config.headers['NoLoadingBar'] != 'NoLoadingBar')
                    pending--;
                    return response;
                },
                responseError : function(response){
                    if(response.config.headers['NoLoadingBar'] != 'NoLoadingBar')
                    pending--;
                    return $q.reject(response);
                }
            };
        }]);
    }]).config(['$ocLazyLoadProvider',function($ocLazyLoadProvider){
        console.log('config');
    }]).constant('appConfig',{
    	time:123
    }).run(['$rootScope',function($rootScope){

    }]);
    $(function(){
        require(['router'],function(router){
            angular.bootstrap(document,['app']);
        })
    });
});
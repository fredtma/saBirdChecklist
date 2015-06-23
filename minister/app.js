(function(){//Use javasctipr Closures, Immediately Invoked Function Expression (IIFE) to prevent global conflicts
'use strict'
   angular.module('saBirdChecklist', ['ionic', 'saBirdChecklist.controllers','saBirdChecklist.services','saBirdChecklist.directives']).config(config).run(run);

   config.$inject = ["$stateProvider","$urlRouterProvider","$httpProvider","$ionicConfigProvider","$compileProvider"];
   function config($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, $compileProvider) {

      $httpProvider.defaults.withCredentials = true;//allow cookies
      $ionicConfigProvider.tabs.position("bottom");
      $ionicConfigProvider.templates.maxPrefetch(15);
      //$ionicConfigProvider.views.forwardCache(false);
      $ionicConfigProvider.views.maxCache(10);//@todo: production(10)
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
      $stateProvider
      .state('main', {url: "/main",abstract: true,templateUrl: "cera/main.html",controller: 'mainCtrl'})
      .state('main.dashboard', {url: "/dashboard",views: {'mainContent': {templateUrl: "cera/dashboard.html",controller: 'dashboardCtrl'}}})
      .state('main.birds', {url: "/birds",views: {'mainContent': {templateUrl: "cera/mensa/birds.html",controller: 'birdsCtrl'}}})
      .state('main.lists', {url: "/lists/:jesua/:view",views: {'mainContent': {templateUrl: "cera/mensa/lists.html",controller: 'listsCtrl'}},cache:false})
      .state('main.list', {url: "/list/:jesua",views: {'mainContent': {templateUrl: "cera/mensa/list.html",controller: 'listCtrl'}},cache:false})
      .state('main.profile', {url: "/profile/:jesua",views: {'mainContent': {templateUrl: "cera/mensa/profile.html",controller: 'profileCtrl'}}});
      $urlRouterProvider.otherwise('/main/dashboard');
   };

   run.$inject = ["$ionicPlatform","$rootScope","$state"];
   function run($ionicPlatform,$rootScope,$state) {

      $ionicPlatform.ready(function () {
         ionic.Platform.isFullScreen = true;//also set the config.xml to fullscreen
         // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
         if (window.cordova && window.cordova.plugins.Keyboard) {cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);}
         // org.apache.cordova.statusbar required
         if (window.StatusBar) {StatusBar.styleDefault();}
         if(ionic.Platform.isWebView() && isset(navigator.splashscreen)) navigator.splashscreen.hide();
         //document.addEventListener("resume",function(){ iyona.info("Resuming from background"); });
         //document.addEventListener("pause",function(){ iyona.info("Application is in the background"); });
         document.addEventListener("online",function(){
            iyona.info("Application is in back Online");
            sessionStorage.SITE_ONLINE=true;
            onlineSync.call(this,'up')//@onlineSync in lib.muneris.js
         });
         document.addEventListener("offline",function(){
            iyona.info("Application is Offline");
            sessionStorage.SITE_ONLINE=false;
            localStorage.offline= new Date().format('isoDateTime');
            iyona.msg("Your are currently working offline",false,true);
         });
         if (ionic.Platform.isAndroid()){
            var body = document.getElementsByTagName("body")[0];
            window.addEventListener("native.showkeyboard", function () {if (body.className.indexOf("keyboard-body") === -1){body.className += " keyboard-body";}});//this event tends to fire multiple times, so we just add the class if it's not already there.
            window.addEventListener("native.hidekeyboard", function () {body.className = body.className.replace("keyboard-body", "");}); //show stuff on keyboard hide
         }
      });
      $rootScope.$on("$stateChangeStart",function(event,toState,toStateParams){
         var row = impetroUser();
         iyona.off("StateChange",$state.current,toState,toState.name,row===false,toState.name!=="main.dashboard");
         if(row===false && toState.name!=="main.dashboard" && toState.name!=="main.profile"){
            event.preventDefault();
            $state.go('main.dashboard',{},{notify:true,reload:true});//state change. reload:do not transition, notify: do not notify $stateChange
         }
      });
   }
})();
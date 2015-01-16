(function(){//Use javasctipr Closures, Immediately Invoked Function Expression (IIFE) to prevent global conflicts
   angular.module('saBirdChecklist', ['ionic', 'saBirdChecklist.controllers','saBirdChecklist.services']).config(config).run(run);

   config.$inject = ["$stateProvider","$urlRouterProvider","$httpProvider","$ionicConfigProvider","$compileProvider"];
   function config($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, $compileProvider) {

      $httpProvider.defaults.withCredentials = true;//allow cookies
      $ionicConfigProvider.platform.android.tabs.position("bottom");
      $ionicConfigProvider.tabs.position("bottom");
      $ionicConfigProvider.templates.maxPrefetch(15);
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

   run.$inject = ["$ionicPlatform"];
   function run($ionicPlatform) {
      ionic.Platform.isFullScreen = true;//also set the config.xml to fullscreen
      $ionicPlatform.ready(function () {
         // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
         if (window.cordova && window.cordova.plugins.Keyboard) {cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);}
         // org.apache.cordova.statusbar required
         if (window.StatusBar) {StatusBar.styleDefault();}
         if(ionic.Platform.isWebView() && isset(navigator.splashscreen)) navigator.splashscreen.hide();
         //document.addEventListener("resume",function(){ iyona.info("Resuming from background"); });
         //document.addEventListener("pause",function(){ iyona.info("Application is in the background"); });
         document.addEventListener("online",function(){ iyona.info("Application is in back Online"); sessionStorage.SITE_ONLINE=false; iyona.msg("Your are currently working offline",false,true); });
         document.addEventListener("offline",function(){ iyona.info("Application is Offline"); sessionStorage.SITE_ONLINE=true; });
      });
   }
})();
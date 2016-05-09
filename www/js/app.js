// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'wechat.controllers' is found in controllers.js
angular.module('wechat', ['ionic', 'wechat.routes', 'wechat.controllers', 'wechat.services', 'wechat.directives', 'monospaced.elastic'])

  .run(function($ionicPlatform, $http, messageService, dateService) {
      var url = "";
      if(ionic.Platform.isAndroid()){
          url = "/android_asset/www/";
      }
      $http.get(url + "data/json/messages.json").then(function(response){
          messageService.init(response.data.messages);
      });
      $http.get(url + "data/json/friends.json").then(function(response){
          console.log(response.data.results);
      });
      $ionicPlatform.ready(function() {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
          if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
          }
      });
  })
  .config(['$ionicConfigProvider', function($ionicConfigProvider){
      // 此处config防止在android下tabs移位至顶部
      $ionicConfigProvider.tabs.position('bottom');
  }]);

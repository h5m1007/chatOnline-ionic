angular.module('wechat.routes', [])
	.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/tab/message");
		$stateProvider
			.state("tab", {
				url: "/tab",
				// 此处abstract指明tab只在子状态显示时才显示
				// 自身不能主动被激活
				abstract: true,
				templateUrl: "templates/tabs.html"
			})
			.state("tab.message", {
				url: "/message",
				views: {
					// 此处views的tab-message需与
					// tabs.html的ion-nav-view的name保持一致
					"tab-message": {
						templateUrl: "templates/tab-message.html",
						controller: "messageCtrl"
					}
				}
			})
			.state('messageDetail', {
				url: '/messageDetail/:messageId',
				templateUrl: "templates/message-detail.html",
				controller: "messageDetailCtrl"
			})
			.state("tab.friends", {
				url: '/friends',
				views: {
					"tab-friends": {
						templateUrl: "templates/tab-friends.html",
						controller: "friendsCtrl"
					}
				}
			})
			.state('tab.find', {
				url: '/find',
				views: {
					'tab-find': {
						templateUrl: 'templates/tab-find.html',
						controller: "findCtrl"
					}
				}
			})
			.state('tab.setting', {
				url: "/setting",
				views: {
					'tab-setting': {
						templateUrl: 'templates/tab-setting.html',
						controller: 'settingCtrl'
					}
				}
			});
	});
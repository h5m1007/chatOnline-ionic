angular.module('wechat.controllers', [])

    .controller('findCtrl', function($scope, $state) {
        $scope.onSwipeLeft = function(){
            $state.go("tab.setting");
        };
        $scope.onSwipeRight = function(){
            $state.go("tab.friends");
        };
    })

    .controller('ChatsCtrl', function($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })

    .controller('messageCtrl', function($scope, $state, $ionicPopup, localStorageService, messageService){
        // $scope.popup = {
        //   isPopup: false,
        //   index: 0
        // };
        $scope.onSwipeLeft = function(){
          $state.go("tab.friends");
        };

        $scope.popupMessageOpthis = function(message){
            $scope.popup.index = $scope.message.indexOf(message);
            $scope.popup.optionsPopup = $ionicPopup.show({
                templateUrl: "templates/popup.html",
                scope: $scope
            });
            $scope.popup.isPopup = true;
        };

        // $scope.popupMessageOpthis = function($index){
        //   // $index 触发该方法的条目item下标
        //   $scope.popup.index = $index;

        //   $scope.popup.optionsPopup = $ionicPopup.show({
        //     // 用$ionicPopup.show()创建自定义popup
        //     templateUrl: "templates/popup.html",
        //     scope: $scope
        //   });
        //   $scope.popup.isPopup = true;
        // };

        $scope.markMessage = function(){
            // 标记已读/未读
            var index = $scope.popup.index;
            var message = $scope.message[index];
            if(message.showHints){
                message.showHints = false;
                message.noReadMessages = 0;
            }else{
                message.showHints = true;
                message.noReadMessages = 1;
            }
            $scope.popup.optionsPopup.close();
            $scope.popup.isPopup = false;
            messageService.updateMessage(message);
        };

        $scope.deleteMessage = function(){
            var index = $scope.popup.index;
            var message = $scope.message[index];
            $scope.message.splice(index, 1);
            $scope.popup.optionsPopup.close();
            $scope.popup.isPopup = false;
            messageService.deleteMessageId(message.id);
            messageService.clearMessage(message);
        };

        $scope.topMessage = function(){
            var index = $scope.popup.index;
            var message = $scope.messages[index];
            if(message.isTop){
                message.isTop = 0;
            }else{
                message.isTop = new Date().getTime();
            }
            $scope.popup.optionsPopup.close();
            $scope.popup.isPopup = false;
            messageService.updateMessage(message);
        };

        $scope.messageDetils = function(message){
            $state.go("messageDetail", {
                "messageId": message.id
            });
        };

        $scope.$on("$ionicView.beforeEnter", function(){
            $scope.messages = messageService.getAllMessages();
            $scope.popup = {
                isPopup: false,
                index: 0
            };
        });
    })

    .controller('friendsCtrl', function($scope, $state){
        $scope.onSwipeLeft = function(){
            $state.go("tab.find");
        };
        $scope.onSwipeRight = function(){
            $state.go("tab.message");
        };
        $scope.contacts_right_bar_swipe = function(e){
            console.log(e);
        };
    })

    .controller('settingCtrl', function($scope, $state){
        $scope.onSwipeRight = function(){
            $state.go("tab.find");
        };
    })

    .controller('messageDetailCtrl', ['$scope', '$stateParams',
        'messageService', '$ionicScrollDelegate', '$timeout',
        function($scope, $stateParams, messageService, $ionicScrollDelegate, $timeout){
            var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
            // $getByHandle控制特定滚动区域
            // 特定区域由delegate-handle在html标记
            $scope.doRefresh = function(){
                $scope.messageNum += 5;
                $timeout(function(){
                    $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
                        $stateParams.messageId);
                    $scope.$broadcast('scroll.refreshComplete');
                }, 200);
            };

            $scope.$on("$ionicView.beforeEnter", function(){
                // $ionicView.beforeEnter 视图即将被打开变成活动页面
                $scope.message = messageService.getMessageById($stateParams.messageId);
                $scope.message.noReadMessages = 0;
                $scope.message.showHints = false;
                messageService.updateMessage($scope.message);
                $scope.messageNum = 10;
                $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
                    $stateParams.messageId);
                $timeout(function(){
                    viewScroll.scrollBottom();
                }, 0);
            });

            window.addEventListener("native.keyboardshow", function(e){
                viewScroll.scrollBottom();
            });
        }
    ]);

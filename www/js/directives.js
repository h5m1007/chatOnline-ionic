angular.module('wechat.directives', [])

	.directive('rjCloseBackDrop', [function(){
		return{
			scope: false,
			restrict: 'A',
			replace: false,
			link: function(scope, iElm, iAttrs, controller){
				// 实现点击弹出的popup以外区域，popup消失
				var htmlEl = angular.element(document.querySelector('html'));
				htmlEl.on("click", function(event){
					if(event.target.nodeName === "HTML" &&
						scope.popup.optionsPopup &&
						scope.popup.isPopup){
						// 判断目前窗口有弹出popup
						scope.popup.optionsPopup.close();
						scope.popup.isPopup = false;
					}
				})
			}
		}
	}])
	.directive('rjHoldActive', ['$ionicGesture', '$timeout', '$ionicBackdrop',
		function($ionicGesture, $timeout, $ionicBackdrop){
			return {
				scope: false,
				restrict: 'A',
				replace: false,
				link: function(scope, iElm, iAttrs, controller){
					$ionicGesture.on("hold", function(){
						// $ionicGesture 监听手势服务
						// $ionicGesture(事件, 回调, 监听元素)
						iElm.addClass('active');
						$timeout(function(){
							iElm.removeClass('active');
						}, 300);
					}, iElm);
				}
			};
	}])
	.directive('resizeFootBar', ['$ionicScrollDelegate', function($ionicScrollDelegate){
		return{
			replace: false,
			link: function(scope, iElm, iAttrs, controller){
				scope.$on("taResize", function(e, ta){
					if(!ta) return;
					var scroll = document.body.querySelector("#message-detail-content");
					var scrollBar = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
					// $getByHandle控制特定滚动区域
            		// 特定区域由delegate-handle在html标记
            		var taHeight = ta[0].offsetHeight;
					var newFooterHeight = taHeight + 10;
					newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

					// 调整ion-footer-bar高度
					iElm[0].style.height = newFooterHeight + 'px';

					// 解决手机弹出键盘挡住聊天内容bug
					scroll.style.bottom = newFooterHeight + 'px';// 增加内容区域高
					scrollBar.scrollBottom();// 滑至底部
				})
			}
		};
	}])
	.directive('rjPositionMiddle', ['$window', function($window){
		return{
			replace: false,
			link: function(scope, iElm, iAttrs, controller){
				var height = $window.innerHeight - 44 - 49 -iElm[0].offsetHeight;
				if(height >= 0){
					iElm[0].style.top = (height / 2 + 44) + 'px';
				}else{
					iElm[0].style.top = 44 + 'px';
				}
			}
		};
	}]);
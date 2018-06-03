var cartApp = angular.module('cartApp', []);

cartApp.controller("cartCtrl", function($scope, $http) {
	$scope.initCartId = function(cartId) {
		$scope.cartId = cartId;
		$scope.refreshCart();
	};

	$scope.refreshCart = function() {
		$http.get('/eStore/api/cart/' + $scope.cartId).then(
				function successCallback(response) {
					$scope.cart = response.data;
				});
	};

	$scope.clearCart = function() {

		$scope.setCsrfToken();

		$http({
			method : 'DELETE',
			url : '/eStore/api/cart/' + $scope.cartId
		}).then(function successCallback() {
			$scope.refreshCart();
		}, function errorCallback(response) {
			console.log(response.data);
		});
	};

	$scope.addToCart = function(productId) {
		
		$scope.setCsrfToken();
		
		$http.put('/eStore/api/cart/add/' + productId).then(
				function successCallback() {
					alert("Product successfully added to the cart!");
				}, function errorCallback() {
					alert("Adding to the cart failed")
				});
	};

	$scope.removeFromCart = function(productId) {
		
		$scope.setCsrfToken();
		
		$http({
			method : 'DELETE',
			url : '/eStore/api/cart/cartItem/' + productId
		}).then(function successCallback() {
			$scope.refreshCart();
		}, function errorCallback(response) {
			console.log(response.data);
		});
	};

	$scope.addQuantity = function(productId) {
		$scope.setCsrfToken();
		$http({
			method : 'PUT',
			url : '/eStore/api/cart/editAdd/' + productId
		}).then(function successCallbak() {
			$scope.refreshCart();
		}, function errorCallback(response) {
			alert("재고가 남아있지 않습니다.");
			console.log(response.data);
		});
	};
	
	$scope.subQuantity = function(productId) {
		$scope.setCsrfToken();
		$http({
			method : 'PUT',
			url : '/eStore/api/cart/editSub/' + productId
		}).then(function successCallbak() {
			$scope.refreshCart();
		}, function errorCallback(response) {
			alert("삭제 실패");
			console.log(response.data);
		});
	};

	$scope.calGrandTotal = function() {
		var grandTotal = 0;

		for (var i = 0; i < $scope.cart.cartItems.length; i++) {
			grandTotal += $scope.cart.cartItems[i].totalPrice;
		}
		return grandTotal;
	};

	//hader에 csrf를 넣음.
	$scope.setCsrfToken = function() {
		var csrfToken = $("meta[name='_csrf']").attr("content");
		var csrfHeader = $("meta[name='_csrf_header']").attr("content");

		$http.defaults.headers.common[csrfHeader] = csrfToken; 
	}

});
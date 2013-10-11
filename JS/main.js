function MainListController($scope) {
	
	$scope.totalCost = 0;
	
	$scope.items = [{itemName: 'itemName', url: 'http://www.google.com', price: 100, selected: false}];
	
	$scope.addItem = function() {
		$scope.items.push({itemName: 'test', url: 'http://www.google.com', price: 111, selected: false});
		$scope.updateTotalCost();
	};
	
	$scope.deleteSelectedItems = function() {
		$scope.items = _.filter($scope.items, function(item) {
			return !item.selected;
		});
		$scope.updateTotalCost();
	};
	
	$scope.updateTotalCost = function() {
		var cost = 0;
		$.each( $scope.items, function(key, value) {
			cost += value.price;
		});
		$scope.totalCost = cost;
	};
	
	$scope.init = function() {
		$scope.updateTotalCost();
	};
		
	$scope.init();
}

$(document).ready( function() {
	
});
function MainListController($scope) {

	$scope.addItemDialog = $("#add-item-dialog");
	$scope.modalShield = $("#modal-shield");
	$scope.modalShield.click( function() {
		$scope.closeOpenModal();
	});
	$scope.openModal = null;
	$scope.items = [{itemName: 'itemName', url: 'http://www.google.com', price: 100, brand: 'blah', selected: false}];

	$scope.toggleAddItem = function() {
		$scope.addItemDialog.show();
		$scope.modalShield.show();
		$scope.openModal = $scope.addItemDialog;
	};
	
	$scope.closeOpenModal = function() {
		$scope.openModal.hide();
		$scope.modalShield.hide()
		$scope.openModal = null;
	};
	
	$scope.addItem = function() {
		$scope.items.push({itemName: $scope.itemName, url: $scope.itemUrl, price: $scope.itemPrice, brand: $scope.itemBrand, selected: false});
	};
	
	$scope.deleteSelectedItems = function() {
		$scope.items = _.filter($scope.items, function(item) {
			return !item.selected;
		});
	};
	
	$scope.totalCost = function() {
		var cost = 0;
		$.each( $scope.items, function(key, value) {
			cost += value.price;
		});
		return cost;
	};
	
	$scope.init = function() {
	
	};
		
	$scope.init();
}

$(document).ready( function() {

});
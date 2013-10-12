function MainListController($scope) {

	$scope.addItemDialog = $("#add-item-dialog");
	$scope.modalShield = $("#modal-shield");
	$scope.modalShield.click( function() {
		$scope.closeOpenModal();
	});
	$scope.openModal = null;
	$scope.items = [];

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
		$scope.closeOpenModal();
		$scope.clearAddForm();
		$scope.saveData();
	};
	
	$scope.clearAddForm = function() {
		$scope.itemName = '';
		$scope.itemUrl = '';
		$scope.itemPrice = 0;
		$scope.itemBrand = '';
	};
	
	$scope.deleteSelectedItems = function() {
		$scope.items = _.filter($scope.items, function(item) {
			return !item.selected;
		});
		$scope.saveData();
	};
	
	$scope.totalCost = function() {
		var cost = 0;
		$.each( $scope.items, function(key, value) {
			cost += value.price;
		});
		return cost;
	};
	
	$scope.saveData = function() {
		localStorage.setItem('INeedDis-mainListData', JSON.stringify($scope.items));
	}
	
	$scope.init = function() {
		if (localStorage.getItem('INeedDis-mainListData')) {
			$scope.items = JSON.parse(localStorage.getItem('INeedDis-mainListData'));
		}
	};
		
	$scope.init();
}

$(document).ready( function() {

});
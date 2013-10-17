function MainListController($scope) {

	$scope.addItemDialog = $("#add-item-dialog");
	$scope.modalShield = $("#modal-shield");
    
	$scope.modalShield.click(function () {
		$scope.closeOpenModal();
	});
    
	$scope.openModal = null;
	$scope.items = [];
    
    //General Methods
    
	$scope.closeOpenModal = function () {
		$scope.openModal.hide();
		$scope.modalShield.hide();
		$scope.openModal = null;
	};
    
    //Add Item
    
	$scope.toggleAddItem = function () {
		$scope.addItemDialog.show();
		$scope.modalShield.show();
		$scope.openModal = $scope.addItemDialog;
	};
	
	$scope.addItem = function () {
		$scope.items.push({itemName: $scope.itemName, url: $scope.itemUrl, price: $scope.itemPrice, brand: $scope.itemBrand, selected: false, itemType: "wantedItem" });
		$scope.closeOpenModal();
		$scope.clearAddItemForm();
		$scope.saveData();
	};
    
	$scope.clearAddItemForm = function () {
		$scope.itemName = '';
		$scope.itemUrl = '';
		$scope.itemPrice = 0;
		$scope.itemBrand = '';
	};
    
    //Add Folder
    
    $scope.toggleAddFolder = function () {
		$scope.addItemDialog.show();
		$scope.modalShield.show();
		$scope.openModal = $scope.addItemDialog;
	};
    
    $scope.addFolder = function (items) {
        if (typeof items === "undefined") {
            items = [];   
        }
        //TODO: add total folder price
        $scope.items.push({itemName: $scope.folderName, itemType: "folder", folderItems: items });
		$scope.closeOpenModal();
		$scope.clearAddFolderForm();
		$scope.saveData();
    };
    
    $scope.clearAddFolderForm = function () {
        
    };
	
    
    //Deprecated and Dev methods
    
    $scope.devDeleteAllItems = function () {
        $scope.items = [];
        $scope.saveData();
    }
    
	$scope.deleteSelectedItems = function () {
		$scope.items = _.filter($scope.items, function(item) {
			return !item.selected;
		});
		$scope.saveData();
	};
	
	$scope.totalCost = function () {
		var cost = 0;
		$.each( $scope.items, function(key, value) {
			cost += value.price;
		});
		return cost;
	};
	
	$scope.saveData = function () {
		localStorage.setItem('INeedDis-mainListData', JSON.stringify($scope.items));
	}
	
	$scope.init = function () {
		if (localStorage.getItem('INeedDis-mainListData')) {
			$scope.items = JSON.parse(localStorage.getItem('INeedDis-mainListData'));
		}
	};
    
	$scope.init();
}

$(document).ready( function () {
//    var draggableOptions = { axis: "y", connectToSortable: ".sortable", containment: "parent" };
//    $(".draggable").draggable(draggableOptions);
    var mainSortableOptions = { placeholder: "ui-state-highlight",  connectWith: ".sort-item" };
    var itemSortableOptions = { placeholder: "ui-state-highlight" };
    $(".main-sortable").sortable( mainSortableOptions );
    $("sort-item").sortable( itemSortableOptions );
    
    //Listen for DOM changes
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    
    var mutObserver = new MutationObserver(function (mutations) {
//        $(".draggable").draggable();
        $(".main-sortable").sortable();
    });
    
    var config = { childList: true };
    var target = document.querySelector('#main-list');
    
    mutObserver.observe(target, config);
});
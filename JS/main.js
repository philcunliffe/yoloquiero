function MainListController($scope) {

	$scope.addItemDialog = $("#add-item-dialog");
    $scope.addFolderDialog = $("#add-folder-dialog");
	$scope.modalShield = $("#modal-shield");
    
	$scope.modalShield.click(function () {
		$scope.closeOpenModal();
	});
    
	$scope.openModal = null;
    $scope.currentFolder = [ "Home" ];
    $scope.location = [];
    
    //Objects
    
    $scope.ItemFolder = function (name, items) {
        this.folderName = name;
        this.folderItems = items;
    };
    
    $scope.ItemFolder.prototype = {
        folderName: '',
        itemType: "folder",
        cost: function () {
            var cost = 0;
            if (this.folderItems) {
                $.each(this.folderItems, function (key, value) {
                    if (typeof value.cost === "function") { //It's a folder
                        cost += value.cost();   
                    }
                    else {
                        cost += value.cost;
                    }
                });
            }
            return cost;
        }
    };

    
    //General Methods
    
	$scope.closeOpenModal = function () {
		$scope.openModal.hide();
		$scope.modalShield.hide();
		$scope.openModal = null;
	};
    
    //Navigation
    
    $scope.openFolder = function (folder) {
        //TODO: animation
        $scope.currentFolder.unshift($scope.location[0][folder.$index].folderName);
        $scope.location.unshift($scope.location[0][folder.$index].folderItems);
    };
    
    $scope.openParent = function () {
        //TODO: animation
        $scope.location.shift();
        $scope.currentFolder.shift();
    }
    
    //Add Item
    
	$scope.toggleAddItem = function () {
		$scope.addItemDialog.show();
		$scope.modalShield.show();
		$scope.openModal = $scope.addItemDialog;
	};
	
	$scope.addItem = function () {
		$scope.location[0].push({itemName: $scope.itemName, url: $scope.itemUrl, cost: $scope.itemCost, brand: $scope.itemBrand, selected: false, itemType: "wantedItem" });
		$scope.closeOpenModal();
		$scope.clearAddItemForm();
		$scope.saveData();
	};
    
	$scope.clearAddItemForm = function () {
		$scope.itemName = '';
		$scope.itemUrl = '';
		$scope.itemCost = 0;
		$scope.itemBrand = '';
	};
    
    //Add Folder
    
    $scope.toggleAddFolder = function () {
		$scope.addFolderDialog.show();
		$scope.modalShield.show();
		$scope.openModal = $scope.addFolderDialog;
	};
    
    $scope.addFolder = function (items) {
        if (typeof items === "undefined") {
            items = [];   
        }
        $scope.location[0].push(new $scope.ItemFolder($scope.folderName, items));
		$scope.closeOpenModal();
		$scope.clearAddFolderForm();
		$scope.saveData();
    };
    
    $scope.clearAddFolderForm = function () {
        $scope.folderName = '';
    };
	
    
    //Deprecated and Dev methods
    
    $scope.devDeleteAllItems = function () {
        $scope.location = $scope.location.slice(0, 1);
        $scope.location[0] = [];
        $scope.saveData();
    };
    
	$scope.deleteSelectedItems = function () {
		$scope.location[0] = _.filter($scope.location[0], function(item) {
			return !item.selected;
		});
		$scope.saveData();
	};
    
    //Live functions
	
	$scope.totalCost = function () {
 		var cost = 0;
 		$.each( $scope.location[0], function(key, value) {
            if (typeof value.cost === "function") {
                cost += value.cost();   
            }
            else {
                cost += value.cost;
            }
 		});
 		return cost;
 	};
    
    $scope.backSidebarVisible = function () {
        if ($scope.location.length > 1) {
            return "";
        }
        else {
            return "invisible";
        }
    }
    
    $scope.parentFolderName = function () {
        if ($scope.currentFolder.length > 1) {
            return $scope.currentFolder[1];
        }
        else {
            return "";
        }
    }
    
    //Save / load
    
	$scope.saveData = function () {
		localStorage.setItem('INeedDis-mainListData', JSON.stringify($scope.location[0]));
	};
	
	$scope.init = function () {
		if (localStorage.getItem('INeedDis-mainListData')) {
			$scope.location[0] = JSON.parse(localStorage.getItem('INeedDis-mainListData'));
		}
        if ($scope.location[0]) {
            $scope.initObjects($scope.location[0]);
        }
	};
    
    $scope.initObjects = function (loc) {
        $.each( loc, function (key, value) {
            if (value.folderName) {
                loc[key] = new $scope.ItemFolder(value.folderName, value.folderItems);
                $scope.initObjects(loc[key].folderItems);
            }
        });
    };
    
	$scope.init();
}

$(document).ready( function () {
//    var draggableOptions = { axis: "y", connectToSortable: ".sortable", containment: "parent" };
//    $(".draggable").draggable(draggableOptions);
//    var mainSortableOptions = { placeholder: "ui-state-highlight",  connectWith: ".sort-item" };
//    var itemSortableOptions = { placeholder: "ui-state-highlight" };
//    $(".main-sortable").sortable( mainSortableOptions );
//    $("sort-item").sortable( itemSortableOptions );
//    
//    //Listen for DOM changes
//    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
//    
//    var mutObserver = new MutationObserver(function (mutations) {
////        $(".draggable").draggable();
//        $(".main-sortable").sortable();
//    });
//    
//    var config = { childList: true };
//    var target = document.querySelector('#main-list');
//    
//    mutObserver.observe(target, config);
});
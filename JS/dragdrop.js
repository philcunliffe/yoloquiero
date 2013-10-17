var dragNDrop = angular.module('DragNDrop', []);

//Draggable
dragNDrop.directive('draggable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.draggable({
                revert: "invalid",
                helper: "clone",
                connectToSortable: ".sortable"
            });
        }
    };
});

//Item dropped on item
dragNDrop.directive('dropFolderCreate', function () {
   return {
       restrict: 'A',
       link: function (scope, element, attrs) {
            var options = {
                hoverClass: "folderCreate-hover",
                drop: function ( event, ui ) {
                    //Convert to folder
                }
            }
       }
});

//Item dropped on folder
dragNDrop.directive('addToFolder', function () {
   return {
       restrict: 'A',
       link: function (scope, element, attrs) {
            var options = {
                hoverClass: "addTo-hover",
                drop: function ( event, ui ) {
                    //Convert to folder
                }
            }
       }
});



    
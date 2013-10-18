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
dragNDrop.directive('dropItem', function () {
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
   }
});

//Item dropped on folder
dragNDrop.directive('dropFolder', function () {
   return {
       restrict: 'A',
       link: function (scope, element, attrs) {
            var options = {
                hoverClass: "addTo-hover",
                drop: function ( event, ui ) {
                    var drag = angular.element(ui.draggable),
                        drop = angular.element(this),
                        dragIndex = drag.scope().$index,
                        dropIndex = drop.scope().$index,
                        itemsArray = drag.scope()[$(this).attr("ng-model")];
                    itemsArray[dropIndex].folderItems.push(itemsArray[dragIndex]);
                    itemsArray.splice(dragIndex, 1);
                    
                    drop.scope().$apply();
                }
            }
            element.droppable(options);
       }
   }
});



    
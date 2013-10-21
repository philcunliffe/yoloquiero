var dragNDrop = angular.module('DragNDrop', []);

//Draggable
dragNDrop.directive('draggable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.draggable({
                revert: "invalid",
                helper: "clone",
                connectToSortable: ".sortable",
//                drag: function ( event, ui ) {
//                    var drag = angular.element(ui.helper),
//                        dragListItem = angular.element(event.target),
//                        dragIndex = dragListItem.scope().$index,
//                        sourceArray = drag.scope()["location"][0],
//                        targetArray = drag.scope()["location"][1], //BUGPROOF
//                        saveFunction = drag.scope()["saveData"],
//                        goToParentFunction = drag.scope()["openParent"],
//                        backbar = $("#back-sidebar"),
//                        backbarOffset = backbar.offset(),
//                        backbarRightEdge = backbarOffset.left + 150,
//                        backbarBottomEdge = backbarOffset.top + backbar.height();
//                    if (ui.offset.left > backbar.offset().left && ui.offset.left < backbarRightEdge && ui.offset.top > backbar.offset().top && ui.offset.top < backbarBottomEdge && backbar.css("visibility") != "hidden") {
//                        if (!backbar.hasClass("backbar-dragHover")) {
//                            //TODO: Show progress in sidebar until folder-up happens
//                            backbar.addClass("backbar-dragHover");
//                            window.setTimeout(function () {
//                                //Add flash to indicate folder changing
//                                if (ui.offset.left > backbar.offset().left && ui.offset.left < backbarRightEdge && ui.offset.top > backbar.offset().top && ui.offset.top < backbarBottomEdge && backbar.css("visibility") != "hidden") {
//                                    targetArray.push(sourceArray[dragIndex]);
//                                    sourceArray.splice(dragIndex, 1);
//                                    goToParentFunction();
//                                    backbar.removeClass("backbar-dragHover");
//                                    saveFunction();
//                                    drag.scope().$apply();
//                                    drag.scope().$digest();
//                                }
//                            }, 500);
//                        }
//                    }
//                    else {
//                        backbar.removeClass("backbar-dragHover");
//                    }
//                }
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
                        itemsArray = drag.scope()["location"][0],
                        saveFunction = drop.scope()["saveData"];
                    itemsArray[dropIndex].folderItems.push(itemsArray[dragIndex]);
                    itemsArray.splice(dragIndex, 1);
                    drop.scope().$apply();
                    saveFunction();
                }
            }
            element.droppable(options);
       }
   }
});



    
var dragNDrop = angular.module('DragNDrop', []);

dragNDrop.directive('draggable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.draggable({
                revert: "invalid",
                helper: "clone"
            });
        }
    };
});

dragNDrop.directive('dropFolderCreate', function () {
   return {
       restrict: 'A',
       link: function (scope, element, attrs) {
            var options = {
                   
            }
       }
});


    
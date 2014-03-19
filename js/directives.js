builder.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    compile: function(element, attrs) {
        console.log(element);
    },
    link: function(scope, element, attrs) {
        scope.hideModal = function() {
            scope.show = false;
        };
    },
    templateUrl: 'views/dialog.html'
  };
});
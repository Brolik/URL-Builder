builder.directive('modalDialog', function() {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {
            scope.hideModal = function() {
                scope.show = false;
            };
        },
        templateUrl: 'views/dialog.html'
    };
});

builder.directive('validBlur', function () {
    var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return {
        restrict: 'A',
        require:'ngModel',
        link: function (scope, element, attr, ctrl) {
            element.bind('blur', function () {
                scope.$apply(function() {

                    // If its the URL
                    if(attr.name == 'url') {
                        if(!urlRegex.test(element.val())) {
                            ctrl.$setValidity('url', false);
                        } else {
                            ctrl.$setValidity('url', true);
                        }
                    }

                    // If its the Term (for Bing)
                    if(attr.name == 'term') {
                        if(scope.urlPart.source == 'bing') {
                            ctrl.$setValue('{QueryString}');
                           console.log(ctrl);
                           console.log(element);
                        }
                    }
                });
            });
        }
    };
});
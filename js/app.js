var builder = angular.module('builder', [] );

builder.controller('ctrl', ['$scope','$http','$sce', function ($scope,$http,$sce) {

    $scope.sources = [
        { value:'newsletter',       title:'Newsletter'},
        { value:'facebook.com',     title:'Facebook'  },
        { value:'google',           title:'google'    },
        { value:'bing',             title:'bing'      },
        { value:'twitter.com',      title:'twitter'   },
        { value:'yahoo',            title:'yahoo'     },
        { value:'youtube.com',      title:'youtube'   },
        { value:'linkedin.com',     title:'linkedin'  },
        { value:'pinterest.com',    title:'pinterest' }
    ];

    $scope.mediums = [
        { value:'cpm',      title:'CPM'      },
        { value:'cpa',      title:'CPA'      },
        { value:'cpc',      title:'CPC'      },
        { value:'referral', title:'Referral' },
        { value:'organic',  title:'organic'  },
        { value:'email',    title:'email'    }
    ];

    // Handle the popup.
    $scope.modalShow = false;
    $scope.toggleModal = function (type, content) {
        $scope.modalShown = !$scope.modalShown;
        if(type === 'help') {
            var httpRequest = $http({
                method: 'POST',
                url:'js/data.json',
                dataType: 'json'
            }).success(function (data, status) {
                var response = data[0].sections;

                for(var i = 0; i < response.length; i++) {
                    if(response[i].ID === content) {
                        $scope.dialogTitle = $sce.trustAsHtml(response[i].title);
                        $scope.dialogContent = $sce.trustAsHtml(response[i].content);
                    }
                }
            }).error(function (data, status) {
                $scope.dialogTitle = "Error";
                $scope.dialogContent = $sce.trustedAsHtml("There was an error communicating with the server and getting the information you requested.");
            });
        } else {

        }
    };

    $scope.generate = function () {
        var generatedURL = '';

        if($scope.urlBuilder.URL.$viewValue.substr(0,4) != 'http') {
            generatedURL = generatedURL + "http://";
        }
        generatedURL = generatedURL + $scope.urlBuilder.URL.$viewValue;

        // Scope
        if($scope.urlBuilder.source.$viewValue) {
            generatedURL = generatedURL + "?utm_source=" + $scope.urlBuilder.source.$viewValue;
        }

        // Medium
        if($scope.urlBuilder.medium.$viewValue) {
            generatedURL = generatedURL + "&utm_medium=" + $scope.urlBuilder.medium.$viewValue;
        }

        // Keywords
        if($scope.urlBuilder.keyword.$viewValue) {
            if($scope.urlBuilder.source.$viewValue == 'bing') {
                generatedURL = generatedURL + "&utm_term=" + $scope.urlBuilder.keyword.$viewValue;
            } else {
                generatedURL = generatedURL + "&utm_term=" + encodeURIComponent($scope.urlBuilder.keyword.$viewValue);
            }
        }

        // Content
        if($scope.urlBuilder.content.$viewValue) {
            generatedURL = generatedURL + "&utm_content=" + encodeURIComponent($scope.urlBuilder.content.$viewValue);
        }

        // Campaign Name
        if($scope.urlBuilder.cName.$viewValue) {
            generatedURL = generatedURL + "&utm_campaign=" + encodeURIComponent($scope.urlBuilder.cName.$viewValue);
        }

        $scope.generated = generatedURL;
    };

    $scope.addEntry = function (list, value, title) {
        if(list == 1) {
            $scope.sources.push({ 'value':value, 'title': title });
            $scope.showSource = false;
            $scope.source = "";
        } else {
            $scope.mediums.push({ 'value':value, 'title':title });
            $scope.showMedium = false;
            $scope.medium = false;
        }

        $scope.showAdd = false;
    };

    $scope.sourceCheck = function (source,string) {
        if(source == 'bing') {
            $scope.website.keyword = '{QueryString}';
        }
    };
    $scope.keywordCheck = function (source, string) {
        if(source == 'bing') {
            if(string && string != '{QueryString}') {
                $scope.website.keyword = '{QueryString}';
            }

            $scope.showBingError = true;
        }
    };

}]);

/* == Filters ================================================ */
builder.filter('capitalize', function () {
    return function(input, scope) {
        return input.substring(0,1).toUpperCase()+input.substring(1);
    };
});

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
        templateUrl: 'help.html'
    };
});
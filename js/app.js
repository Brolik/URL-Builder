var builder = angular.module('builder', ['ngRoute'] );

builder.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/help', {
            templateUrl: 'views/fullHelp.html',
            controller: 'helpCtrl'
        }).
        when('/', {
            templateUrl: 'views/form.html'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

builder.controller('mainCtrl', ['$scope','$http','$sce', function($scope,$http, $sce) {
    $scope.urlPart = {};
    $scope.generated = "";

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

    $scope.validateData = function () {
        console.log('do something');
    };

    $scope.generate = function () {
        var generatedURL = "";

        // URL
        if($scope.urlPart.url) {
            if($scope.urlPart.url.substr(0,4) != 'http') {
                generatedURL = "http://";
            }
            generatedURL = generatedURL + $scope.urlPart.url;
        } else {
            return false;
        }

        // Source
        if($scope.urlPart.source) {
            generatedURL = generatedURL + "?utm_source=" + $scope.urlPart.source;
        }

        // Medium
        if($scope.urlPart.medium) {
            generatedURL = generatedURL + "&utm_medium=" + $scope.urlPart.medium;
        }

        // Keywords
        if($scope.urlPart.term) {
            if($scope.urlPart.medium === "bing") {
                generatedURL = generatedURL + "&utm_term=" + $scope.urlPart.term;
            } else {
                generatedURL = generatedURL + "&utm_term=" + encodeURIComponent($scope.urlPart.term);
            }
        }

        // Content
        if($scope.urlPart.content) {
            generatedURL = generatedURL + "&utm_content=" + encodeURIComponent($scope.urlPart.term);
        }

        // Name
        if($scope.urlPart.campaign) {
            generatedURL = generatedURL + "&utm_campaign=" + encodeURIComponent($scope.urlPart.campaign);
        }

        // Return the generated URL
        console.log(generatedURL);
        $scope.generated = generatedURL;

    };

    // Display each of the fields
    $scope.fields = [
        { type: 'input' , title: 'Campaign URL', required: true, model: 'url', custom: false },
        { type: 'select', title: 'Campaign Source', required: true, model: 'source', custom: true },
        { type: 'select', title: 'Campaign Medium', required: true, model: 'medium', custom: true },
        { type: 'input',  title: 'Campaign Name' , required: true, model: 'campaign', custom: false },
        { type: 'input',  title: 'Campaign Term', required: false, model: 'term', custom: false },
        { type: 'input',  title: 'Campaign Content', required: false, model: 'content', custom: false }
    ];

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
        { value:'cpc',      title:'CPC'      },
        { value:'cpm',      title:'CPM'      },
        { value:'cpa',      title:'CPA'      },
        { value:'referral', title:'Referral' },
        { value:'organic',  title:'organic'  },
        { value:'email',    title:'email'    }
    ];

}]);

// Help Page
builder.controller('helpCtrl', ['$scope', function($scope) {

}]);

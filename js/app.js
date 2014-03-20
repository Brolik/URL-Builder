var builder = angular.module('builder', ['ngRoute'] );

builder.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/help', {
            templateUrl: 'views/fullHelp.html',
            controller: 'helpCtrl'
        }).
        when('/', {
            templateUrl: 'views/form.html',
            controller: 'mainCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

builder.controller('mainCtrl', ['$scope','$http','$sce', function($scope,$http, $sce) {

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

    // Display each of the fields
    $scope.fields = [
        { type: 'input' , title: 'Campaign URL', required: true, model: 'url', custom: false },
        { type: 'select', title: 'Campaign Source', required: true, model: 'source', custom: true },
        { type: 'select', title: 'Campaign Medium', required: true, model: 'medium', custom: true },
        { type: 'input',  title: 'Campaign Name' , required: true, model: 'campaign', cusom: false },
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

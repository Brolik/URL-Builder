var builder = angular.module('builder', [] );

builder.controller('ctrl', function ($scope) {

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
        { value:'referral', title:'Referral' },
        { value:'organic',  title:'organic'  },
        { value:'email',    title:'email'    }
    ];

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
            generatedURL = generatedURL + "&utm_term=" + encodeURIComponent($scope.urlBuilder.keyword.$viewValue);
        }

        // Content
        if($scope.urlBuilder.content.$viewValue) {
            generatedURL = generatedURL + "&utm_term=" + encodeURIComponent($scope.urlBuilder.content.$viewValue);
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

});

/* == Filters ================================================ */
builder.filter('capitalize', function () {
    return function(input, scope) {
        return input.substring(0,1).toUpperCase()+input.substring(1);
    };
});


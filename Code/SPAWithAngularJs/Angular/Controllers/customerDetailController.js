app.controller("customerDetailController", function ($scope, $http, $routeParams) {

    $http.get('api/Customers/' + $routeParams.id).success(function (data, status) {
        $scope.customer = data;
        $scope.status = status;
    })
    .error(function (data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    });

});
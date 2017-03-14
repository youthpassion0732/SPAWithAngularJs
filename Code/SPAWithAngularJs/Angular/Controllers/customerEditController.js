app.controller("customerEditController", function ($scope, $http, $routeParams, $location, $modal) {

    //Open Model Function
    var openModel = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            size: size
        });
    };

    //Handle Buttons on Model
    var ModalInstanceCtrl = function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close();
            $location.path('Customer/List');
        };
    };

    //Get Customer Record From Database Against Id
    $http.get('api/Customers/' + $routeParams.id).success(function (data) {
        $scope.customer = data;
    })
    .error(function (data, status) {
        $scope.customer = data;
        $scope.status = status;
    });

    //Save Customer Record into Database 
    $scope.save = function () {
        $scope.submitted = true;

        if ($scope.editForm.$valid) {
            var data = {};
            data.firstName = $scope.customer.FirstName;
            data.lastName = $scope.customer.LastName;
            data.phoneNumber = $scope.customer.PhoneNumber;
            data.country = $scope.customer.Country;
            data.state = $scope.customer.State;
            data.streetAddress = $scope.customer.StreetAddress;

            $http.put('api/Customers/' + $routeParams.id, data).success(function () {
                openModel();
            });
        }
    }

    //Redirect To List Page
    $scope.cancel = function () {
        $location.path('Customer/List');
    }

});
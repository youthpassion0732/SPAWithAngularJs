app.controller("customerAddController", function ($scope, $http, $location, $modal) {

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

    //Save Form Values Into Database
    $scope.save = function () {
        $scope.submitted = true;

        if ($scope.addForm.$valid) {
            var data = {};
            data.firstName = $scope.customer.FirstName;
            data.lastName = $scope.customer.LastName;
            data.phoneNumber = $scope.customer.PhoneNumber;
            data.country = $scope.customer.Country;
            data.state = $scope.customer.State;
            data.streetAddress = $scope.customer.StreetAddress;

            $http.post('api/Customers', data).success(function () {
                openModel();
            });
        }
    }

    //Redirect To List Page
    $scope.cancel = function () {
        $location.path('Customer/List');
    }

});


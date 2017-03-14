app.controller("customerListController", function ($scope, $http, $location, $modal, $timeout) {

    //Initialize variables
    var selectedCustomerId = null;
    $scope.alerts = [];

    //Getting All Customers List
    //$http({ method: 'GET', url: 'api/customers' }).
    //success(function (data, status) {
    //    $scope.status = status;
    //    $scope.data = data;
    //}).
    //error(function (data, status) {
    //    $scope.data = data || "Request failed";
    //    $scope.status = status;
    //});

    //Set value of "selectedCustomerId" on "Delete Click" And Open Modal
    $scope.SetSelectedValue = function (id) {
        selectedCustomerId = id;
        openModel('sm');
    }

    //Open Confirm Delete Modal
    var openModel = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            size: size
        });
    };

    //Handle Buttons on Confirm Delete Modal
    var ModalInstanceCtrl = function ($scope, $modalInstance) {
        $scope.delete = function () {
            deleteCustomer(selectedCustomerId, $modalInstance);
        };
        $scope.cancel = function () {
            $modalInstance.close();
        };
    };

    //Deleting Customer Record from database And Show Alert Message
    var deleteCustomer = function (id, modalInstance) {
        if (id > 0) {
            $http.delete('api/Customers/' + id).success(function () {
                //Show Delete Alert Message
                $scope.addAlert('success', 'Customer Deleted Successfully');

                //Wait for 2 Seconds and then "remove message, close Modal and Reload Customers List"
                $timeout(function () {
                    $scope.closeAlert();
                    modalInstance.close();
                    $location.path('Customer/List');
                }, 500);

            });
        }
    }

    //Show Alert Message
   $scope.addAlert = function (messageType, messagetext) {
       $scope.alerts.push({ type: messageType, msg: messagetext });
   };

    //Close Alert Message
   $scope.closeAlert = function (index) {
       $scope.alerts.splice(index, 1);
   };


   //****************ngGrid Start*************************

   $scope.filterOptions = {
       filterText: "",
       useExternalFilter: true
   };

   //Setting Page Size Options
   $scope.totalServerItems = 0;
   $scope.pagingOptions = {
       pageSizes: [5, 10, 20],
       pageSize: 10,
       currentPage: 1
   };

   $scope.setPagingData = function (data, page, pageSize) {
       var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
       $scope.myData = pagedData;
       $scope.totalServerItems = data.length;
       if (!$scope.$$phase) {
           $scope.$apply();
       }
   };

   $scope.getPagedDataAsync = function (pageSize, page, searchText) {
       setTimeout(function () {
           var data;
           if (searchText) {
               var ft = searchText.toLowerCase();
               //Getting Searched Customers List
               $http.get('api/customers').success(function (largeLoad) {
                   data = largeLoad.filter(function (item) {
                       return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                   });
                   $scope.setPagingData(data, page, pageSize);
               });
           } else {
               //Getting All Customers List
               $http.get('api/customers').success(function (largeLoad) {
                   $scope.gridLoaded = true;
                   $scope.setPagingData(largeLoad, page, pageSize);
               });
           }
       }, 100);
   };

   $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

   //Handling Paging
   $scope.$watch('pagingOptions', function (newVal, oldVal) {
       if (newVal !== oldVal) {
           $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
       }
   }, true);

  //Handling Sorting
   $scope.$watch('filterOptions', function (newVal, oldVal) {
       if (newVal !== oldVal) {
           $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
       }
   }, true);

   //Setting Grid Columns and other features
   $scope.customerGrid = {
       data: 'myData',
       columnDefs: [
           { field: 'CustomerId', displayName: 'Id', width: '0%', visible: false },
           { field: 'FirstName', displayName: 'First Name', width: '10%' },
           { field: 'LastName', displayName: 'Last Name', width: '10%' },
           { field: 'PhoneNumber', displayName: 'Phone Number', width: '15%' },
           { field: 'Country', displayName: 'Country', width: '10%' },
           { field: 'State', displayName: 'State', width: '10%' },
           { field: 'StreetAddress', displayName: 'Street Address', width: '20%' },
           { field: '', displayName: '', width: '25%', cellTemplate: '<a href=#Customer/Detail/{{row.entity.CustomerId}}>View Detail</a>&nbsp;&nbsp;<a href="#Customer/Edit/{{row.entity.CustomerId}}">Edit</a>&nbsp;&nbsp;<a href="#/{{row.entity.CustomerId}}" ng-click="SetSelectedValue(row.entity.CustomerId)">Delete</a>' }
       ],
       multiSelect: false,
       enablePaging: true,
       showFooter: true,
       totalServerItems: 'totalServerItems',
       pagingOptions: $scope.pagingOptions,
       filterOptions: $scope.filterOptions
   };

    //****************ngGrid End*************************

});


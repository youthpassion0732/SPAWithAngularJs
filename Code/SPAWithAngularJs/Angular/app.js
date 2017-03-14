
var app = angular.module("mycustomers", ['ngRoute', 'ui.bootstrap', 'ngGrid'])

app.config(function ($routeProvider) {

    $routeProvider
     .when("/", {
         templateUrl: "Customer/List",
         controller: "customerListController"
     })
     .when("/Customer/List", {
         templateUrl: "Customer/List",
         controller: "customerListController"
     })
    .when("/Customer/Add", {
        templateUrl: "Customer/Add",
        controller: "customerAddController"
    })
    .when("/Customer/Detail/:id", {
        templateUrl: "Customer/Detail",
        controller: "customerDetailController"
    })
    .when("/Customer/Edit/:id", {
        templateUrl: "Customer/Edit",
        controller: "customerEditController"
    })
    .otherwise({
        templateUrl: "Home/NotFound"
    });

});
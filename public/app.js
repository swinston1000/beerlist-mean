angular.module('myApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode({ enabled: true, requireBase: true }).hashPrefix('!');

        $stateProvider
            .state('home', {
                url: '/',
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                templateUrl: '/templates/home.html'
            })
            .state('beers', {
                url: '/beers/:id',
                controller: 'BeerController',
                controllerAs: 'beerCtrl',
                templateUrl: '/templates/beer.html'

                // // allows to dynamically load html
                // templateUrl: function($stateParams) {
                //     console.log($stateParams)
                //     return '/templates/beer.html'
                // }

            });

        $urlRouterProvider.otherwise('/');
    })

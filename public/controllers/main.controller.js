angular.module("myApp").controller('MainController', function(beerService) {

    var mainCtrl = this;

    mainCtrl.beer = {};

    beerService.getBeers().then(function() {
        mainCtrl.beers = beerService.beers
    })

    mainCtrl.addBeer = function() {
        beerService.addBeer(mainCtrl.beer);
        mainCtrl.beer = {};
    };

    mainCtrl.removeBeer = function(beer) {
        if (confirm("Are you sure you want to delete this beer?")) {
            beerService.removeBeer(beer);
        }
    };

});

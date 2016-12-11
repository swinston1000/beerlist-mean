angular.module('myApp').controller('BeerController', function(beerService, $stateParams) {

    var bCtrl = this;
    bCtrl.beer = {}
    bCtrl.review = {}

    beerService.getBeers().then(function() {
        bCtrl.beer = beerService.beers.items.filter(function(beer) {
            return $stateParams.id === beer._id
        })[0];
        //bCtrl.beer = $filter("filter")(beerService.beers.items, { _id: $stateParams.id }, true)[0];
    })



    bCtrl.addReview = function() {
        beerService.addReview(bCtrl.beer, bCtrl.review)
        bCtrl.review = {}
    }

    bCtrl.removeReview = function(review) {
        beerService.removeReview(bCtrl.beer, review)
    }

});

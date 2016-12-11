angular.module("myApp").service('httpService', function($http) {

    this.getBeers = function() {
        return $http.get('/beers');
    }

    this.updateBeer = function(item) {
        return $http.put('beers/' + item._id, item);
    }

    this.addBeer = function(item) {
        return $http.post('beers/', item);
    }

    this.deleteBeer = function(id) {
        return $http.delete('beers/' + id);
    }

    this.addReview = function(beerID, review) {
        return $http.post('beers/' + beerID + '/reviews', review);

    }

    this.deleteReview = function(beerID, reviewID) {
        return $http.delete('beers/' + beerID + '/reviews/' + reviewID);
    }

})

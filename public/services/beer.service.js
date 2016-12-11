angular.module("myApp").factory('beerService', function(httpService) {


    var beers = { items: [] }

    var getBeers = function() {
        return httpService.getBeers()
            .then(function(data) {
                angular.copy(data.data, beers.items)
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    var addBeer = function(beer) {

        httpService.addBeer(beer)
            .then(function(data) {
                beers.items.push(data.data);
            })
            .catch(function(error) {
                console.log(error);
            })
    };

    var removeBeer = function(beer) {
        httpService.deleteBeer(beer._id)
            .then(function(data) {
                beers.items.splice(beers.items.indexOf(beer), 1);
            })
            .catch(function(error) {
                console.log(error);
            });;
    };

    var addReview = function(beer, review) {
        httpService.addReview(beer._id, review)
            .then(function(newBeer) {

                // //if server returns review and not beer
                // beers.items[beers.items.indexOf(beer)].reviews.push(review.data);
                console.log(beer);
                //if server returns updated beer
                var beerIndex = beers.items.indexOf(beer)
                angular.copy(newBeer.data, beers.items[beerIndex])


            })
            .catch(function(error) {
                console.log(error);
            })
    };

    var removeReview = function(beer, review) {
        httpService.deleteReview(beer._id, review._id)
            .then(function(newBeer) {
                console.log(newBeer);
                var beerIndex = beers.items.indexOf(beer)
                angular.copy(newBeer.data, beers.items[beerIndex]);
                // var reviewIndex = beers.items[beerIndex].reviews.indexOf(review)
                // beers.items[beerIndex].reviews.splice(reviewIndex, 1)
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    //var editing = {}

    // var update = function(todo) {
    //     httpService.updateBeer(todo).then(function(data) {
    //         editing[todo._id] = undefined;
    //     }).catch(function(data, status) {
    //         console.log(data, status);
    //     });
    // }

    // var startEditing = function(todo) {
    //     editing[todo._id] = angular.copy(todo)
    // }

    // var cancelEditing = function(todo) {
    //     var _index = todos.items.indexOf(todo)
    //     todos.items[_index] = angular.copy(editing[todo._id]);
    //     editing[todo._id] = undefined;
    // }

    return {
        getBeers: getBeers,
        beers: beers,
        addBeer: addBeer,
        removeBeer: removeBeer,
        addReview: addReview,
        removeReview: removeReview,
        //cancelEditing: cancelEditing,
        //update: update,
        //startEditing: startEditing,
        //editing: editing
    }
});

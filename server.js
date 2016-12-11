var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/beers', function(err, success) {
    if (err) { console.log("Error: " + err); }
    console.log("db on");
});

var Beer = require("./models/BeerModel");
var Review = require("./models/ReviewModel");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/beers', function(req, res) {
    Beer.find(function(err, beers) {
        if (err) {
            return next(err);
        }
        res.send(beers);
    });
});

app.post('/beers', function(req, res, next) {
    var beer = new Beer(req.body);
    beer.save(function(err, beer) {
        if (err) {
            return next(err);
        }
        res.json(beer);
    });
});

app.delete('/beers/:id', function(req, res, next) {
    Beer.findByIdAndRemove(req.params.id, function(err, data) {
        if (err) {
            return next(err);
        }
        res.send(data);
    });
});

app.post('/beers/:id/reviews', function(req, res, next) {
    Beer.findById(req.params.id, function(err, beer) {
        if (err) {
            return next(err);
        }
        var review = new Review(req.body);
        beer.reviews.push(review);
        beer.save(function(err, beer) {
            if (err) {
                return next(err);
            }
            res.json(beer);
        });
    });
});


app.delete('/beers/:beerID/reviews/:reviewID', function(req, res, next) {
    // Beer.findById(req.params.beerID, function(err, beer) {
    //     if (err) {
    //         return next(err);
    //     }

    //     beer.reviews = beer.reviews.filter(function(review) {
    //         return review._id != req.params.reviewID
    //     })

    //     beer.save(function(err, edittedBeer) {
    //         res.json(edittedBeer)
    //     })

    // });

    var review_Id = mongoose.mongo.ObjectID(req.params.reviewID);
    //console.log(typeof review_Id);  //object
    var update = { $pull: { "reviews": { "_id": review_Id } } }
    var options = { new: true }
    Beer.findByIdAndUpdate(req.params.beerID, update, options, function(err, beer) {
        if (err) {
            return next(err);
        }

        beer.reviews.id(35435)
        res.json(beer)
    })
});


//see https://github.com/angular-ui/ui-router/issues/372
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
})

app.listen(8000, function() {
    console.log("listening on 8000");
});

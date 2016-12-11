var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;


var BeerSchema = new Schema({
    name: String,
    style: String,
    image_url: String,
    abv: Number,
    reviews: []
});

var Beer = mongoose.model('Beer', BeerSchema);

module.exports = Beer;

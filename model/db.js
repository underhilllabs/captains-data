var mongoose = require( 'mongoose' );

var cptnSchema = new mongoose.Schema({
 name: String,
 source: String,
 votes: Number,
 index: Number,
 image: String,
 ship: String
});
mongoose.model( 'Captain', cptnSchema );

mongoose.connect( 'mongodb://localhost/captains' );



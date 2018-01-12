const mongoose= require('mongoose');
const Schema = mongoose.Schema;

//the blueprint of the object in your mongodb
const videoSchema = new Schema({
  title: String,
  url: String,
  description: String
});

module.exports = mongoose.model('video', videoSchema, 'videos');

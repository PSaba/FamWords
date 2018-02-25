import mongoose, { Schema } from 'mongoose';

// Define movie schema
var flashcardSchema = new Schema({
  picture: {
    data: Buffer,
    contentType: String
  },
  word: String,

});

// Export Mongoose model
module.exports =  mongoose.model('flashcard', flashcardSchema);
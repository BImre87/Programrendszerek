const mongoose = require('mongoose');

const sutiSchema = new mongoose.Schema({
  megnevezes: {
    type: String,
    required: true,
  },
  suly: {
    type: Number,
    required: true,
  },
  cukortartalom: {
    type: String,
    required: true,
  },
  ar: {
    type: Number,
    required: true,
  },
});

  // Sutemenyek modell
  const Suti = mongoose.model('suti', sutiSchema);
  
  module.exports = Suti;
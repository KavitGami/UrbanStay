const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: String,
    url: {
        type: String,
    default:
      "https://unsplash.com/photos/a-very-tall-building-sitting-on-top-of-a-body-of-water-4NeuZU-ynnw",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/a-very-tall-building-sitting-on-top-of-a-body-of-water-4NeuZU-ynnw"
        : v,
    },
    
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

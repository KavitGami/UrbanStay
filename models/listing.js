const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
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
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },

});
listingSchema.index({ title: 'text', description: 'text' });

listingSchema.post("findOneAndDelete", async(listing) => {
  if (listing){
  await Review.deleteMany({reviews: {$in: listing.reviews}})
  }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  details: { type: String, required: true }
});

const tripSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true }, // e.g., "3D/2N" => 3days 2 nights
    imageUrls: [
        {
            url: { type: String, required: true },
            public_id: { type: String, required: true } // for deletion purposes
        }
    ],
    category: [{ type: String }],
    itinerary: [itinerarySchema],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports =  mongoose.model("Trip", tripSchema);

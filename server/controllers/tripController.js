const { cloudinary } = require("../storage/cloudinary");
const Trip = require("../models/Trip");



exports.createTrip = async (req, res) => {
  try {
    const { title, location, price, duration, category, itinerary } = req.body;
    const imageUrls = req.files ? 
                                req.files.map((file) => ({
                                    url : file.path,
                                    public_id : file.filename
                                })) : [];

    if(!imageUrls || imageUrls.length === 0) {
      return res.status(400).json({ 
        message: "At least one image is required"
      });
    }

    const newTrip = new Trip({
        title,
        location,
        price: parseFloat(price,10),
        duration,
        imageUrls,
        category: Array.isArray(category)? category : [category],
        itinerary: JSON.parse(itinerary),
        createdBy: req.user._id
    });
    await newTrip.save();

    return res.status(201).json({
      message: "Trip created successfully",
      trip: newTrip
    });
  } catch (error) {
    console.error("Error creating trip:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
}


exports.getAllTrips = async(req,res)=>{
    try {
        const trips = await Trip.find({});
        return res.status(200).json({
            message: "Trips fetched successfully",
            trips
        });
    } catch (error) {
        console.error("Error fetching trips:", error);
        return res.status(500).json({
            message: error.message,
        });
        
    }
}

exports.getTripById = async(req,res) =>{
    try {
        const { id } = req.params;

        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found",
            });
        }
        return res.status(200).json({
            message: "Trip fetched successfully",
            trip
        });
    } catch (error) {
        console.error("Error fetching trip:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
}


exports.deleteTrip = async(req,res) =>{
    try {
        const { id } = req.params;

        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found",
            });
        }

        for(const image of trip.imageUrls){
            if(image.public_id){
                await cloudinary.uploader.destroy(image.public_id)
            }
        }

        await Trip.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Trip deleted successfully",
            trip
        });
    } catch (error) {
        console.error("Error deleting trip:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
}
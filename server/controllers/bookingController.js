const Booking = require('../models/Booking.js');



exports.createBooking = async (req,res) =>{
    const { trip, name, email, phone, travellers, notes, cost, startDate } = req.body;
    const user = req.user._id;

    try {
        const newBooking = new Booking({
            trip,
            user,
            name,
            email,
            phone,
            travellers,
            notes,
            cost: parseFloat(cost),
            startDate
        });
        await newBooking.save();

        return res.status(201).json({ booking : newBooking });



    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({ message: error.message });
        
    }
}

exports.markAsPaid = async (req, res) =>{
    const { bookingId, paymentId } = req.body;

    if(!bookingId || !paymentId) {
        return res.status(400).json({ message: "Booking ID and Payment ID are required" });
    }

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        
        booking.isPaid = true;
        booking.paymentId = paymentId;
        await booking.save();

        return res.status(200).json({ message: "Booking's payment is done" , booking});

    } catch (error) {
        console.error("Error marking booking as paid:", error);
        return res.status(500).json({ message: error.message });
    }
}

exports.getMyBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('trip', 'title price location image');


    if(booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to view this booking" });
    }

    return res.status(200).json({ booking });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: error.message });
  }
};


exports.getAllBookings = async(req,res) =>{
    try {
        const bookings = await Booking.find({ user: req.user._id})
           .populate('trip','title price').sort({ createdAt: -1 });

        return res.status(200).json({ bookings });

    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({ message: error.message });
    }
}
const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({
    trip:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: String,
    email: String,
    phone: String,
    travellers: String,
    notes: String,
    isPaid:{
        type: Boolean,
        default: false
    },
    paymentId:{
        type: String,
        default: null
    },
    startDate: {
        type: Date,
        required: true
    }
},{
    timestamps: true
})


module.exports = mongoose.model('Booking', bookingSchema);
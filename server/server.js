const express = require("express");
const cors = require("cors");
const config = require('./config/config');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const app = express();

app.use(cors());
app.use(express.json());


app.use('/users', userRoutes);
app.use('/trips', tripRoutes);
app.use('/bookings', bookingRoutes);
app.get("/",()=> {
    console.log("Welcome to the Travel App API");
})

connectDB();
app.listen(config.port, () => {
    console.log(`Server running in ${config.env} mode on port ${config.port}`);
});

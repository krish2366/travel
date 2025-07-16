const express = require("express");
const cors = require("cors");
const config = require('./config/config');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);

connectDB();
app.listen(config.port, () => {
    console.log(`Server running in ${config.env} mode on port ${config.port}`);
});

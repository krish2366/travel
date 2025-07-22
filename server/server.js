const express = require("express");
const cors = require("cors");
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const config = require('./config/config');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { googleAuthCallback } = require("./controllers/userController");
const app = express();

app.use(cors({
    origin: "http://localhost:5173", // exact frontend origin
    credentials: true
}));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// google Oauth

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } 
    })
)

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
                clientID: config.google.client_id,
                clientSecret:config.google.secret,
                callbackURL: `/users/google/callback`,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await googleAuthCallback(accessToken, refreshToken, profile);
                    done(null, user);
                } catch (error) {
                    done(error, null);
                }
            }
        )
)

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

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

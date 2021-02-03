const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require('./server/models/user.model');

//Dotenv - allows you to separate secrets from your source code (passwords etc)
dotenv.config();

//Define paths for express config
const publicDirectory = path.join(__dirname, './public');

//Initiate app
let app = express();
app.use(express.urlencoded({ extended: true })); //to support URL-encoded bodies
app.use(express.json()); // to support JSON-encoded bodies 

//CORS 
app.use(cors());


//Setup static directory to serve
app.use(express.static(publicDirectory));

//View engine config
app.set("view engine", "ejs");

//Config sessions
app.use(require("express-session")({
    secret: "Rollotjetjetje is eating your toe",
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));

//In production set 'cookies secure = true' 
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

//Passport config
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//Routes
const taskRoutes = require('./server/routes/task.route');
const userRoutes = require('./server/routes/user.route');

app.use(taskRoutes);
app.use(userRoutes);

//404 page
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

//Connection MongoDB
mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error MongoDB", err);
        process.exit();
    });

//Config of Heroku port
let port = process.env.PORT;

//Connect port (local and heroku)
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log("Server started on port 3000")
});
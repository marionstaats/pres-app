const express = require("express"); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');

//Dotenv - allows you to separate secrets from your source code (passwords etc)
dotenv.config();

//Define paths for express config
const publicDirectory = path.join(__dirname, './public');

//Initiate app
let app = express();
app.use(express.urlencoded({extended: true}));  //to support URL-encoded bodies
app.use(express.json());       // to support JSON-encoded bodies 

//Setup static directory to serve
app.use(express.static(publicDirectory));

//View engine config
app.set("view engine", "ejs");

//Connection MongoDB
mongoose.connect(process.env.DB_CONNECT, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true })
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
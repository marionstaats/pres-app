const User = require('../models/user.model');
const passport = require("passport");
const Payment = require('../models/payment.model');


//Get form to register
exports.getRegisterForm = (req, res) => {
    res.render('register')
}

//Register new user
exports.saveUser = async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    
    try {
        User.register(new User({ username: username, email: email }), 
                password, function (err, user) { 
            if (err) { 
                res.render('register', { 
                    error: err.message
                });
                res.send(err.message);
                return;
            } 

            passport.authenticate("local")( 
                req, res, function () { 
                // res.render("profile"); 
                res.status(201).send();
            }); 

        })
    }
    catch (e) {
        res.status(500).send(e);
    }
}

//Get the form to login
exports.getLoginForm = (req, res) => {
    res.render('login');
}

//Login
exports.loginUser =
    passport.authenticate("local", {
        successRedirect: "profile",
        failureRedirect: "login",
        failureFlash: true
    }), (req, res) => {
            if (err) {
                res.send(err.message);
                return;
            }
            res.send(200).send('logged in');
        };


//Logout
exports.logoutUser = (req, res) => {
    req.logout(); 
    res.redirect("/"); 
    // res.status(200).send();
}

//Get user account
exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username }); //req.session.passport.user
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }
    catch(e) { res.status(500).send(e); }

}

//Delete account
exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({username: req.session.passport.user });
        res.status(204).send();

    }
    catch(e) { res.status(500).send(e); }
}

//Add money to wallet
exports.paymentToWallet = async (req, res) => {
    try {
        const payment = new Payment({
            amount: req.body.amount,
            username: 'marion' //req.session.passport.user
        })
        await payment.save();
        await User.findOneAndUpdate({username: 'marion' }, {$inc : {walletAmount: req.body.amount} });
        res.status(201).send(payment);
    }
    catch (e) { res.status(500).send(e); }

}
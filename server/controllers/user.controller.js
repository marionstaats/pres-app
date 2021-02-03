const User = require('../models/user.model');
const passport = require("passport");
const Payment = require('../models/payment.model');

//Register new user
exports.saveUser = async(req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let sortUser = req.body.sortUser;

    try {
        User.register(new User({ username: username, email: email, sortUser: sortUser }),
            password,
            function(err, user) {
                if (err) {
                    res.status(401).send(err);
                    return;
                }

                passport.authenticate("local")(
                    req, res,
                    function() {
                        res.status(201).send();
                    });

            })
    } catch (e) {
        res.status(500).send(e);
    }
}

//Login
exports.loginUser =
    passport.authenticate("local", {
        successRedirect: "http://localhost:8080/dashboard"
    }), (req, res) => {
        // res.setHeader({ 'Access-Control-Allow-Origin': '*' })
        if (err) {
            res.status(401).send(err);
            return;
        }
        res.send(200).send();
    };


//Logout
exports.logoutUser = (req, res) => {
    req.logout();
    // res.redirect("/"); 
    res.status(200).send();
}

//Get user account
exports.getUser = async(req, res) => {
    try {
        const user = await User.findOne({ username: req.session.passport.user });
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) { res.status(500).send(e); }

}

//Delete account
exports.deleteUser = async(req, res) => {
    try {
        await User.findOneAndDelete({ username: req.session.passport.user });
        res.status(204).send();

    } catch (e) { res.status(500).send(e); }
}

//Add money to wallet
exports.paymentToWallet = async(req, res) => {
    try {
        const payment = new Payment({
            amount: req.body.amount,
            username: req.session.passport.user
        })
        await payment.save();
        await User.findOneAndUpdate({ username: req.session.passport.user }, { $inc: { walletAmount: req.body.amount } });
        res.status(201).send(payment);
    } catch (e) { res.status(500).send(e); }

}
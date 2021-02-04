const Task = require('../models/task.model');
const User = require('../models/user.model');

//Get list all tasks for specific user
exports.getTasks = async(req, res) => {
    try {
        let tasks = await Task.find({ username: 'marion' }, null, { //req.session.passport.user
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip)
        });
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
}

//Save new task in database
exports.saveTask = async(req, res) => {
    try {
        const task = new Task({
            username: 'marion', //req.session.passport.user,
            relationship: req.body.relationship,
            nameReceiver: req.body.nameReceiver,
            birthdayReceiver: req.body.birthdayReceiver,
            genderReceiver: req.body.genderReceiver,
            occasion: req.body.occasion,
            dateDelivery: req.body.dateDelivery,
            placeDelivery: req.body.placeDelivery,
            budget: req.body.budget,

            //Sliders/radiobutton:
            approvalNeeded: req.body.approvalNeeded,
            wrapped: req.body.wrapped,
            acceptAnyUser: req.body.acceptAnyUser,
            postcard: req.body.postcard,

            //Optional:
            suggestions: req.body.suggestions,
            notBuy: req.body.notBuy,
            interestsReceiver: req.body.interestsReceiver,
            note: req.body.note
        });
        await task.save();
        await res.status(201).send(task);
        //Saving task id in User document
        await User.updateOne({ username: 'marion' }, { $push: { tasks: task._id } });
    } catch (e) {
        res.status(500).send(e)
        console.log(e);
    }
}

//Update task page
exports.editTask = async(req, res) => {
    try {
        let updatedTask = await Task.findOneAndUpdate({ _id: req.body._id }, {
            relationship: req.body.relationship
        }, { new: true });

        res.status(200).send(updatedTask);

    } catch (e) {
        res.status(500).send(e);
    }

}

//Delete task
exports.deleteTask = async(req, res) => {
    try {
        let deletedTask = await Task.findOneAndDelete({ _id: req.body._id });
        if (!deletedTask) {
            return res.status(404).send()
        }
        res.status(204).send();

    } catch (e) {
        res.status(500).send(e);
    }

}

//Complete task
exports.completeTask = async(res, req) => {
    try {
        let updatedTask = await Task.updateOne({ _id: req.body._id }, { completed: true });
        if (!updatedTask) {
            return res.status(404).send()
        }

        res.status(204).send();
    } catch (e) {
        res.status(500).send(e);
    }

}

//Pickup task as shopper
exports.pickupTask = async(req, res) => {
    try {
        let pickedupTask = await Task.updateOne({ _id: req.body._id }, { pickedup: true });
        if (!pickedupTask) {
            return res.status(404).send()
        }
        res.status(204).send();
    } catch (e) { res.status(500).send(e) }
}
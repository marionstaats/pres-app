const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/tasks', taskController.getTasks);

router.get('/add-task', taskController.getTaskForm);
router.post('/add-task', taskController.saveTask);

router.get('/edit-task/:nameReceiver', taskController.editTaskPage);
router.post('/edit-task/:nameReceiver', taskController.editTask);

router.post('/delete-task/:nameReceiver', taskController.deleteTask);

router.post('/complete-task/:nameReceiver', taskController.completeTask);

router.post('/pickup-task/:nameReceiver', taskController.pickupTask);

module.exports = router;
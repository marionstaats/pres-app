const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/api/tasks', taskController.getTasks);

router.post('/api/add-task', taskController.saveTask);

router.post('/api/edit-task', taskController.editTask);

router.post('/api/delete-task', taskController.deleteTask);

router.post('/api/complete-task', taskController.completeTask);

router.post('/api/pickup-task', taskController.pickupTask);

module.exports = router;
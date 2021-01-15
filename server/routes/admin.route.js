const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');


router.get('/add-student', adminController.getStudentForm);
router.post('/add-student', adminController.saveStudent);

router.get('/edit-student/:lName', adminController.editStudentPage);
router.post('/edit-student/:lName', adminController.editStudent);

// router.post('/delete-student', adminController.deleteStudent);


module.exports = router;
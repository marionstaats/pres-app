const Student = require('../models/student.model');

//Get the form to add a student
exports.getStudentForm = (req, res) => {
    res.render('add-student');
}

//Save new student in database
exports.saveStudent = (req, res) => {
    const student = new Student({
        fName: req.body.fName,
        lName: req.body.lName,
        birthday: req.body.birthday,
        currentClass: req.body.currentClass,
        previousClass: req.body.previousClass,
        currentTeacher: req.body.currentTeacher,
        previousTeacher: req.body.previousTeacher,
        problems: req.body.problem,
        contactOne: {
            parentNameOne: req.body.parentNameOne,
            parentPhoneOne: req.body.parentPhoneOne,
            parentEmailOne: req.body.parentEmailOne,
        },
        contactTwo: {
            parentNameTwo: req.body.parentNameTwo,
            parentPhoneTwo: req.body.parentPhoneTwo,
            parentEmailTwo: req.body.parentEmailTwo,
        },
        notes: {
            note: req.body.note,
        } 
    });
    student.save()
        .then( () => {res.redirect('/')})
        .catch(err => console.log(err));
}

//Get page to edit a student
exports.editStudentPage = (req, res) => {
    Student.findOne({lName: req.params.lName})
        .then((student) => {
            res.render('edit-student', {
                fName : student.fName,
                lName: student.lName,
                birthday: student.birthday,
                currentClass: student.currentClass,
                previousClass: student.previousClass,
                currentTeacher: student.currentTeacher,
                previousTeacher: student.previousTeacher,
                parentNameOne: student.contactOne.parentNameOne,
                parentPhoneOne: student.contactOne.parentPhoneOne,
                parentEmailOne: student.contactOne.parentEmailOne,
                parentNameTwo: student.contactTwo.parentNameTwo,
                parentPhoneTwo: student.contactTwo.parentPhoneTwo,
                parentEmailTwo: student.contactTwo.parentEmailTwo,
                problems: student.problems,
                notes: student.notes,
                documents: student.documents
            });
        })
        .catch(err => console.log(err));
}

//Update student page
exports.editStudent = (req, res) => {

    Student.updateOne({ lName: req.body.lName }, 
        { 
            $set: { 
                fName: req.body.fName, 
                currentClass: req.body.currentClass, 
                previousClass: req.body.previousClass,
                currentTeacher: req.body.currentTeacher,
                previousTeacher: req.body.previousTeacher,
                parentNameOne: req.body.parentNameOne,
                parentPhoneOne: req.body.parentPhoneOne,
                parentEmailOne: req.body.parentEmailOne,
                parentNameTwo: req.body.parentNameTwo,
                parentPhoneTwo: req.body.parentPhoneTwo,
                parentEmailTwo: req.body.parentEmailTwo,
                problems: req.body.problem
            },
            $push: {notes: {note: req.body.note}} //Should not add empty note!!
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
}
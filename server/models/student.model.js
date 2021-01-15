const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
        fName: String,
        lName: String,
        birthday: Date,
        currentClass: String,
        previousClass: String,
        currentTeacher: String,
        previousTeacher: String,
        problems: [{type:String}],
        contactOne: {
            parentNameOne: String,
            parentPhoneOne: String,
            parentEmailOne: String,
        },
        contactTwo: {
            parentNameTwo: String,
            parentPhoneTwo: String,
            parentEmailTwo: String,
        },
        notes: [{            
            note: String,
            dateNoteAdded: {type: Date, default: Date.now},
            nameAdmin: String,
        }],
        documents: [{
            documentName: String,
            dateAddedDatabase: {type: Date, default: Date.now},
            documentDate: Date,

        }],
        dateAdded: {
            type: Date,
            default: Date.now
        },

});

module.exports = mongoose.model("Student", StudentSchema);

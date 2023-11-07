const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student_name: { type: String, required: true },
    intake: { type: String, required: true },
    joined_date: { type: Date, required: true },
    courses: [{ type: String, required: false }],
    created_at: { type: Date, required: true },
})

module.exports = mongoose.model("Student", studentSchema);
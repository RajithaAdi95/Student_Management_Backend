const { default: mongoose} = require("mongoose");

const StudentModel = require("../model/student");

exports.create_student = (req, res, next) => {
    const student_details = new StudentModel({
        _id: new mongoose.Types.ObjectId,
        student_name: req.body.student_name,
        intake: req.body.intake,
        joined_date: req.body.joined_date,
        courses: req.body.courses,
        created_at: new Date()
    })
    student_details.save()
    .then(() => {
        res.status(201).json({
            message: "Student details added successfully"
        })
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        });
    })
}

exports.get_all_students = (req, res, next) => {
    StudentModel.find()
    .then((stu_res) => {
        res.send(stu_res);
    })
    .catch((err) => {
        res.status(400).send(err);
    })
}

exports.get_single_student = (req, res, next) => {
    StudentModel.findById({ _id: req.params.studentId })
    .then((stu) => {
        if(stu) {
            res.send(stu);
        }
        else {
            res.status(409).send("Student not found");
        }
    })
    .catch((err) => {
        res.status(400).send("Something is wrong");
    })
}

exports.update_student_details = (req, res, next) => {
    StudentModel.findById({ _id: req.params.studentId })
    .then((stu) => {
        if(stu) {
            const student_details = ({
                student_name: req.body.student_name,
                intake: req.body.intake,
                joined_date: req.body.joined_date,
                courses: req.body.courses
            })
            StudentModel.updateOne({ _id: req.params.id }, student_details)
            .then(() => {
                res.status(201).json({
                    message: "Successfully updated the student details!"
                })
            })
            .catch((err) => {
                res.status(400).send(err);
            })
        }
        else {
            res.status(409).send("Student not found");
        }
    })
}

exports.delete_student = (req, res, next) => {
    StudentModel.findById({ _id: req.params.studentId })
    .then((stu) => {
        if(stu) {
            StudentModel.findOneAndDelete({ _id: req.params.id })
            .then((del_stu) => {
                res.status(201).json({
                    message: "Successfully deleted the Student! "
                })
            })
            .catch((err) => {
                res.status(400).send("Error in deleting employee", err);
            })
        }
        else {
            res.status(409).send("Student not found");
        }
    })
}
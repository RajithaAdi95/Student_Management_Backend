const express = require("express");
const router = express();

const StudentController = require("../controllers/StudentController");

router.post("/students", StudentController.create_student);
router.get("/students", StudentController.get_all_students);
router.get("/students/:studentId", StudentController.get_single_student);
router.put("/students/:studentId", StudentController.update_student_details);
router.delete("/students/:studentId", StudentController.delete_student);

module.exports = router;
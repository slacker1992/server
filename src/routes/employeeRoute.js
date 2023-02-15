const express = require("express");
const {
  createEmployee,
  getAllEmployee,
  deleteOneEmployee,
  getOneEmployee,
  updateEmployee,
} = require("../controller/employeeController");
const router = express.Router();

router
  .post("/create", createEmployee)
  .get("/list", getAllEmployee)
  .delete("/delete/:id", deleteOneEmployee)
  .get("/singleEmployee/:id", getOneEmployee)
  .put("/:id", updateEmployee);

// router.get("/maxid", getMaxId);

module.exports = router;

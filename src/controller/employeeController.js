const express = require("express");
const Employee = require("../model/employee");
const ApiFeatures = require("../utils/apiFeatures");

exports.createEmployee = async (req, res) => {
  try {
    // req.body.technicianAssigned = req.user.username;
    const formData = req.body;

    if (!formData) {
      return res.status(404).json({ error: "Data not found" });
    } else {
      await Employee.create(formData, (err, data) => {
        if (err) {
          return res.status(201).json({
            success: false,
            message: err,
          });
        } else {
          return res.status(201).json({
            success: true,
            message: "Employee created successfully",
          });
        }
      });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};

exports.getAllEmployee = async (req, res) => {
  try {
    // const resultPerPage = 3;
    // const apiFeature = new ApiFeatures(Employee.find(), req.query)
    //   .search()
    //   .pagination(resultPerPage);
    // const employee = await apiFeature.query;

    const page = Number(req.query.page) - 1 || 0;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";

    const employee = await Employee.find({
      first_name: { $regex: search, $options: "i" },
    })
      .skip(page * limit)
      .limit(limit);

    const total = await Employee.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    const pages = Math.ceil(total / limit);
    if (employee.length === 0) {
      return res.status(404).json({ error: "No Data" });
    } else {
      return res.status(200).json({
        success: true,
        employee,
        page: page + 1,
        pages,
        limit,
        total,
      });
    }
  } catch (error) {
    return res.status(404).json({ error: "Error While Fetching Data" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const formData = req.body;

    await Employee.findByIdAndUpdate(id, formData);
    return res.status(200).json({
      success: true,
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

exports.deleteOneEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await Employee.findOneAndDelete({
        id: id,
      });
      return res.status(200).json(`Deleted successfully`);
    } else {
      return res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};

exports.getOneEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const job = await Employee.findOne({
        id: id,
      });
      return res.status(200).json(job);
    } else {
      return res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    return res.status(404).json({ error: "Error While Fetching Data" });
  }
};

exports.getMaxId = async (req, res) => {
  try {
    const maxId = await Employee.findOne({}).sort({ jobNo: -1 }).limit(1);
    if (!maxId) {
      return res.status(404).json({ error: "Data not found" });
    } else {
      return res.status(200).json(maxId.jobNo);
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};

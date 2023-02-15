const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Please enter ID"],
  },
  first_name: {
    type: String,
    required: [true, "Please enter first name"],
  },
  last_name: {
    type: String,
    required: [true, "Please enter last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email address"],
  },
  number: {
    type: Number,
    required: [true, "Please enter contact no"],
    maxlength: [10, "contact no cannot exceed 10 characters"],
    minLength: [10, "contact no should have more than 10 characters"],
  },

  gender: {
    type: String,
    required: [true, "Please select gender"],
  },
  photo: String,
});

module.exports = mongoose.model("Employee", employeeSchema);

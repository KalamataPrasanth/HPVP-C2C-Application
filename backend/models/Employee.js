import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    staffno: {type: String, required: true, unique: true},
    telephone: {type: String, required: true},
    mobile: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    password: {type: String, required: true},
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
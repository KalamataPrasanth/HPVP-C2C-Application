import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import Employee from "./models/Employee.js";

dotenv.config({ path: "../.env" });

console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI);

await connectDB();

const employees = [
    { name: "Prasanth", staffno: "4747474", telephone: "4747", mobile: "+91 8247355855", email: "prasanth@example.com", address: "Madhurwada, Visakhapatnam - 530048" },
    { name: "Rajesh", staffno: "1234567", telephone: "1234", mobile: "9876543210", email: "rajesh@example.com", address: "Kurmannapalem, Visakhapatnam - 530047" },
    { name: "Sasi", staffno: "2345678", telephone: "2345", mobile: "9876543201", email: "sasi@example.com", address: "PM Palem, Visakhapatnam - 530048" },
    { name: "Rohit", staffno: "3456789", telephone: "3456", mobile: "9876543120", email: "rohit@example.com", address: "Marathahalli, Bangaluru - 560037" },
    { name: "Sai", staffno: "4567890", telephone: "4567", mobile: "7674945612", email: "sai@example.com", address: "Marathahalli, Bangalore - 560037" },
    { name: "Likhit", staffno: "5678901", telephone: "5678", mobile: "9898789879", email: "bear@example.com", address: "Akkayyapalem, Visakhapatnam - 530013" },
    { name: "Aishanya Pattanaik", staffno: "6789012", telephone: "6789", mobile: "9898989898", email: "fox@example.com", address: "TCS opposite, Bhubaneshwar - 760001" },
    { name: "Hyena", staffno: "7890123", telephone: "7890", mobile: "8798879887", email: "hyena@example.com", address: "Hafeezpet, Hyderabad - 500049" },
    { name: "Ram", staffno: "8901234", telephone: "8901", mobile: "767491234", email: "ram@example.com", address: "Mahipalpur, New Delhi - 110037" },
    { name: "Hero", staffno: "9012345", telephone: "9012", mobile: "9876543211", email: "hero@example.com", address: "Heropur, New Hero - 900009" },
];

const seedEmployees = async () => {
    try {
        console.log("🚀 Seeding employee data...");

        await Employee.deleteMany();

        const hashedEmployees = await Promise.all(
            employees.map(async (employee) => {
                const password = `${employee.name.toLowerCase()}@123`;
                return {
                    ...employee,
                    password: await bcrypt.hash(password, 10),
                };
            })
        );

        await Employee.insertMany(hashedEmployees);
        console.log("Sample Employee Table inserted successfully");
    } catch (error) {
        console.error("Error inserting dummy employees:", error);
    } finally {
        mongoose.connection.close();
        console.log("MongoDB connection closed");
    }
};

seedEmployees();

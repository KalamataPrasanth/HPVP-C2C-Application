import express from 'express';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

const decryptPassword = (encryptedPassword) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

router.post('/login', async (req, res) => {
    const { staffno, password: encryptedPassword } = req.body;
    try{
        const employee = await Employee.findOne({staffno});
        if (!employee){
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        const decryptedPassword = decryptPassword(encryptedPassword);

        const isMatch = await bcrypt.compare(decryptedPassword, employee.password);
        if (!isMatch){
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        const token = jwt.sign(
            { staffno: employee.staffno, name: employee.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token, name: employee.name, staffno: employee.staffno });
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
const userModal = require("../models/userModel");

// Login Callback
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        const user = await userModal.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(404).json({ success: false, message: 'Invalid email or password' });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Register Callback
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
        }

        const existingUser = await userModal.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const newUser = new userModal({ name, email, password });
        await newUser.save();

        res.status(201).json({
            success: true,
            newUser,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { loginController, registerController };

/**
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { sendError } = require('../utils/helper');

// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return sendError(res, 'This email already exists!');

    // Validate role (optional, if role is required)
    const validRoles = ['user', 'admin', 'instructor', 'student']; // Example roles
    if (role && !validRoles.includes(role)) {
      return sendError(res, 'Invalid role provided.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, // Default or specified role
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'User created successfully!',
      user: { id: newUser._id, role: newUser.role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error creating user.', error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return sendError(res, 'Invalid email or password.');

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendError(res, 'Invalid email or password.');

    // Generate a token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Ensure role is included in the token
      process.env.JWT_SECRET, // Ensure this is the correct environment variable
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,  // Return the token to the user
     // role: user.role, // Include role in the response
      user: { id: user._id, role: user.role }, // Ensure this is included
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error logging in user.', error: error.message });
  }
};
*/

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Student = require('../model/student'); // Import the Student model
const { sendError } = require('../utils/helper');

// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return sendError(res, 'This email already exists!');

    // Validate role (optional, if role is required)
    const validRoles = ['user', 'admin', 'instructor', 'student']; // Example roles
    if (role && !validRoles.includes(role)) {
      return sendError(res, 'Invalid role provided.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, // Default or specified role
    });

    await newUser.save();

    // Automatically add student to the `students` collection if the role is 'student'
    if (role === 'student') {
      const newStudent = new Student({
        userId: newUser._id, // Link the user ID from the `users` collection
        enrolledCourses: [], // Initialize with no courses
        progress: {}, // Initialize progress as an empty map
      });

      await newStudent.save();
    }

    return res.status(201).json({
      success: true,
      message: 'User created successfully!',
      user: { id: newUser._id, role: newUser.role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error creating user.', error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return sendError(res, 'Invalid email or password.');

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendError(res, 'Invalid email or password.');

    // Generate a token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Ensure role is included in the token
      process.env.JWT_SECRET, // Ensure this is the correct environment variable
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token, // Return the token to the user
      user: { id: user._id, role: user.role }, // Ensure this is included
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error logging in user.', error: error.message });
  }
};


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../utils/userOp.js';
import { sendError } from '../utils/helper.js';

// Create User
export const createUser = async (req, res) => {
  /*
  json 
  {
    "name": "Ahmed Hisham",
    "email": "ahmed.aalmakki@example.com",
    "password": "Ahmed5122096@",
    "role": "instructor"
  }
  */
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // Check if the email already exists
    const existingUser = await User.retriveUser({ email });
    if (existingUser) return sendError(res, 'This email already exists!');

    // Validate role (optional, if role is required)
    const validRoles = ['student', 'admin', 'instructor']; // Example roles
    if (role && !validRoles.includes(role)) {
      return sendError(res, 'Invalid role provided.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.createUser({
      name,
      email,
      password: hashedPassword,
      role, // Default or specified role
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully!',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error creating user.', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  /*
  json
  {
    "email": "ahmed.aalmakki@example.com",
    "password": "Ahmed441996@"
  }
  */
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.retriveUser({ email });
    if (!user) return sendError(res, 'Invalid email or password.');

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return sendError(res, 'Invalid email or password.');

    // Generate a token
    const token = jwt.sign(
      { id: user[0]._id, role: user[0].role }, // Ensure role is included in the token
      process.env.JWT_SECRET, // Ensure this is the correct environment variable
      { expiresIn: '1h' },
    );

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token, // Return the token to the user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error logging in user.', error: error.message });
  }
};

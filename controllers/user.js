const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { sendError } = require('../utils/helper');

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return sendError(res, 'This email already exists!');
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();
  return res.send(newUser);
};

exports.signin = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  if (!email.trim() || !password) {
    return sendError(res, 'email/password missing!');
  }
  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, 'User not found!');
  }
  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return sendError(res, 'password is incorrect!');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return res.json({
    success: true,
    user: {
      id: user._id, name: user.name, email: user.email, token,
    },
  });
};

import User from '../models/users.js';
import { sendError } from '../utils/helper.js';

export const createUser = async (req, res) => {
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

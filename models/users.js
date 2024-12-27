import mongoose from 'mongoose';

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  verified: { type: Boolean, default: false, required: true },
},
{ timestamps: true },
{ versionKey: false });

export default mongoose.model('User', User);

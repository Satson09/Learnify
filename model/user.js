const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  verified: { type: Boolean, default: false, required: true },
}, { versionKey: false });

userSchema.pre('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, await bcrypt.genSalt());
    this.password = hash;
  }

  next();
});

userSchema.methods.comparePassword = async function compare(password) {
  const result = await bcrypt.compare(password, this.password);

  return result;
};

module.exports = mongoose.model('User', userSchema);

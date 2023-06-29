import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface User extends mongoose.Document {
  email: string;
  password: string;
  validatePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.validatePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;

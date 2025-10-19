import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timezone: { type: String, default: 'UTC' }
}, { timestamps: true });

export default mongoose.model('Profile', ProfileSchema);

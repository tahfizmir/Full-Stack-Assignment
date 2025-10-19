import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  timezone: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  createdAtUserTz: { type: Date },
  updatedAtUserTz: { type: Date }
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);

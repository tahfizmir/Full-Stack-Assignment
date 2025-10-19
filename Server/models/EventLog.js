import mongoose from 'mongoose';

const EventLogSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  before: { type: Object },
  after: { type: Object },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('EventLog', EventLogSchema);

import express from 'express';
import Event from '../models/Event.js';
import EventLog from '../models/EventLog.js';

const router = express.Router();

// Create event (admin or user)
router.post('/', async (req, res) => {
  try {
    const { title, description, profiles, timezone, start, end, createdBy } = req.body;
    if (new Date(end) <= new Date(start)) return res.status(400).json({ error: 'End must be after start' });

    const ev = new Event({ title, description, profiles, timezone, start, end });
    ev.createdAtUserTz = ev.createdAt; // default, frontend may override with user's tz
    await ev.save();
    res.status(201).json(ev);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const before = await Event.findById(req.params.id).lean();
    if (!before) return res.status(404).json({ error: 'Not found' });

    const update = req.body;
    if (update.end && update.start && new Date(update.end) <= new Date(update.start)) return res.status(400).json({ error: 'End must be after start' });

    const ev = await Event.findByIdAndUpdate(req.params.id, update, { new: true });

    // log
    await EventLog.create({ event: ev._id, changedBy: req.body.changedBy, before, after: ev.toObject(), timestamp: new Date() });

    ev.updatedAtUserTz = ev.updatedAt;
    await ev.save();
    res.json(ev);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get events for a profile
router.get('/byProfile/:profileId', async (req, res) => {
  const ev = await Event.find({ profiles: req.params.profileId }).populate('profiles').sort({ start: 1 });
  res.json(ev);
});

// Get single event
router.get('/:id', async (req, res) => {
  const ev = await Event.findById(req.params.id).populate('profiles');
  if (!ev) return res.status(404).json({ error: 'Not found' });
  res.json(ev);
});

// Get logs for event
router.get('/:id/logs', async (req, res) => {
  const logs = await EventLog.find({ event: req.params.id }).populate('changedBy').sort({ timestamp: -1 });
  res.json(logs);
});

export default router;

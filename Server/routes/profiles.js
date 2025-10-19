import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();

// Create profile
router.post('/', async (req, res) => {
  try {
    const { name, timezone } = req.body;
    const p = new Profile({ name, timezone });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List profiles
router.get('/', async (req, res) => {
  const profiles = await Profile.find().sort({ createdAt: -1 });
  console.log(profiles);
  res.json(profiles);
});

export default router;

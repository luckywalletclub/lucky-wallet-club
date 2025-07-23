require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());

// MongoDB bağlantısı
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Kullanıcı şeması ve modeli
const userSchema = new mongoose.Schema({
  telegram_id: { type: String, required: true, unique: true },
  username: String,
  first_name: String,
  last_name: String,
  points: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Kullanıcı kaydet/güncelle endpoint'i
app.post('/api/user', async (req, res) => {
  const { telegram_id, username, first_name, last_name, points } = req.body;
  if (!telegram_id) return res.status(400).json({ error: 'telegram_id required' });
  try {
    const user = await User.findOneAndUpdate(
      { telegram_id },
      {
        username,
        first_name,
        last_name,
        updated_at: new Date(),
        ...(typeof points === 'number' ? { points } : {})
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'DB error', details: err.message });
  }
});

// Kullanıcıyı id ile getir endpoint'i
app.get('/api/user/:telegram_id', async (req, res) => {
  try {
    const user = await User.findOne({ telegram_id: req.params.telegram_id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'DB error', details: err.message });
  }
});

// Kullanıcıya puan ekle endpoint'i
app.post('/api/user/:telegram_id/points', async (req, res) => {
  const { points } = req.body;
  if (typeof points !== 'number') return res.status(400).json({ error: 'points (number) required' });
  try {
    const user = await User.findOneAndUpdate(
      { telegram_id: req.params.telegram_id },
      { $inc: { points }, updated_at: new Date() },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'DB error', details: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
}); 
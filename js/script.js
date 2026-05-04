const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // serve frontend


let notes = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create note
app.post('/notes', (req, res) => {
    const { id, content } = req.body;

    const note = { id, content };
    notes.push(note);

    res.json({ message: 'Note added!', note });
});

// Get all notes
app.get('/notes', (req, res) => {
    res.json(notes);
});

// Delete note
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id !== id);

    res.json({ message: 'Note deleted!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
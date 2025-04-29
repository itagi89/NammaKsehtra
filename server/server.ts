import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

const pool = require('./db')
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Your Next.js frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));


app.get('/zilla-panchayat', async (req, res) => {
  try {
  console.log("api called")
  const result = await pool.query("SELECT id, name, description, createdat FROM zilapanchayat")
  console.log(result)
  return res.status(200).json({records:result.rows, total: result.rowCount});
}
catch (error) {
  console.log(error)
  res.status(500).json({ error: 'Failed to fetch records' });
}
});

// // Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

//create
app.post('/api/zilla-panchayat', async (req, res) => {
  try {
    console.log('request received')
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: "Name and description are required" });
    }

    const result = await pool.query(
      'INSERT INTO zilapanchayat (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    var newPanchayat = result.rows[0];
    res.status(201).json(newPanchayat);
  } catch (error) {
    console.error("Error creating Zilla Panchayat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//edit
app.put('/api/zilla-panchayat/:id', async (req, res) => {
  try {
    console.log('request received')
    const { name, description } = req.body;
    const {id} = req.params;

    if (!name || !description) {
      return res.status(400).json({ error: "Name and description are required" });
    }
    
    const result = await pool.query(
      'UPDATE zilapanchayat SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Zilla Panchayat not found' });
    }
    var updatedZillaPanchayat = result.rows[0];
    res.status(201).json(updatedZillaPanchayat);
  } catch (error) {
    console.error("Error updating Zilla Panchayat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete('/api/zilla-panchayat/:id', async (req, res) => {
  try {
    console.log('delete request received')
    const {id} = req.params;
    const result = await pool.query('DELETE FROM zilapanchayat WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Zilla Panchayat not found' });
    }
    var deleteditem = result.rows[0]
    res.status(201).json(deleteditem);
  } catch (error) {
    console.error("Error deleting Zilla Panchayat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

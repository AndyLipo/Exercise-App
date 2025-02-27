
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

// const BASE_URL = 'https://exercisedb-api.vercel.app/api/v1'; // ✅ Nueva URL correcta
app.get('/api/exercises', async (req, res) => {
  try {
    const response = await axios.get('https://exercisedb-api.vercel.app/api/v1/exercises');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los ejercicios', error: error.message });
  }
});
app.listen(5000, () => console.log('Servidor corriendo en http://localhost:5000'));

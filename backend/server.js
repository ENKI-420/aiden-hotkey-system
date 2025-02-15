require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Proxy route to call Streamlit API
app.post('/api/fetch-beaker', async (req, res) => {
    const { patient_id } = req.body;
    try {
        const response = await axios.get(`http://localhost:8501/fetch_beaker_report?patient_id=${patient_id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Beaker data" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

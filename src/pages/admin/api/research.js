const express = require('express');
const router = express.Router();

// Sample research data
const researchData = [
  {
    id: '1',
    title: 'Cancer Research Study',
    status: 'Active',
    participants: 150,
    completion: '75%',
    endDate: '2025-12-31',
  },
  {
    id: '2',
    title: 'Lung Cancer Clinical Trial',
    status: 'Recruiting',
    participants: 50,
    completion: '20%',
    endDate: '2026-06-30',
  },
  // Add more research data as needed
];

// GET /api/research
router.get('/research', (req, res) => {
  res.json(researchData);
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const researchRouter = require('./pages/admin/api/research');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use the research router
app.use('/api', researchRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
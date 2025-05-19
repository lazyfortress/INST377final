// remember to change fetch locations in home.js and main.js
// current locations are accurate for Vercel deployment
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = 3001;

// Enable JSON parsing and CORS; run via live
app.use(cors());
app.use(express.json());

// Supabase setup
const supabaseUrl = "https://vaqvxzwnnxgmrcmmqxug.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcXZ4endubnhnbXJjbW1xeHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1Mzg3NTUsImV4cCI6MjA2MzExNDc1NX0.Bv_QDtrAgjUlZYpxQQNegaiB5JyQUkb8kzQ-lvH8Og4";
const supabase = createClient(supabaseUrl, supabaseKey);

// POST /api/logInteraction
app.post('/api/logInteraction', async (req, res) => {
    const {action, reit, year} = req.body;

    const { data, error } = await supabase
        .from('reit_logs')
        .insert([{action, reit, year}]);

    if (error) {
        console.error(error);
        return res.status(500).json({error});
    }

    res.status(200).json({message: 'Interaction logged', data});
});

// GET /api/reitLogs
app.get('/api/reitLogs', async (req, res) => {
    const { data, error } = await supabase
        .from('reit_logs')
        .select('*')
        .order('timestamp', {ascending: false});

    if (error) {
        console.error(error);
        return res.status(500).json({error});
    }

    res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

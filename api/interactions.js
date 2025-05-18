export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({error: "Only POST allowed"});

    const {action, reit, year} = req.body;

    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcXZ4endubnhnbXJjbW1xeHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1Mzg3NTUsImV4cCI6MjA2MzExNDc1NX0.Bv_QDtrAgjUlZYpxQQNegaiB5JyQUkb8kzQ-lvH8Og4";
    const supabaseUrl = "https://vaqvxzwnnxgmrcmmqxug.supabase.co";

    // GET is default, clearly define as POST only
    const response = await fetch(`${supabaseUrl}/rest/v1/reit_logs`, {
        method: "POST",
        headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            timestamp: new Date().toISOString(),
            action,
            reit,
            year
        })
    });

    const result = await response.json();
    res.status(200).json(result);
}

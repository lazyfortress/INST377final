export default async function handler(req, res) {
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcXZ4endubnhnbXJjbW1xeHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1Mzg3NTUsImV4cCI6MjA2MzExNDc1NX0.Bv_QDtrAgjUlZYpxQQNegaiB5JyQUkb8kzQ-lvH8Og4";
    const supabaseUrl = "https://vaqvxzwnnxgmrcmmqxug.supabase.co";
  
    const response = await fetch(`${supabaseUrl}/rest/v1/reit_logs?select=*`, {
        headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`
        }
    });
  
    const result = await response.json();
    res.status(200).json(result);
}
  
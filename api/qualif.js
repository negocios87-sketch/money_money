export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const token = process.env.PIPEDRIVE_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'PIPEDRIVE_TOKEN não configurado' });
  }

  try {
    const url = `https://boardacademy.pipedrive.com/api/v1/dealFields/12528?api_token=${token}`;
    const r   = await fetch(url);
    const d   = await r.json();
    res.status(200).json(d);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const token    = process.env.PIPEDRIVE_TOKEN;
  const filterId = process.env.PIPEDRIVE_FILTER_ID;
  const limit    = req.query.limit || 10;

  if (!token || !filterId) {
    return res.status(500).json({ error: 'Variáveis de ambiente não configuradas' });
  }

  try {
    const url = `https://api.pipedrive.com/v1/deals?filter_id=${filterId}&status=won&sort=won_time%20DESC&limit=${limit}&api_token=${token}`;
    const r   = await fetch(url);
    const d   = await r.json();
    res.status(200).json(d);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

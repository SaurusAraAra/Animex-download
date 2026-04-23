export default async function handler(req, res) {
  const REPO = "SaurusAraAra/animex-app"

  try {
    const r = await fetch("https://api.github.com/repos/" + REPO + "/releases/latest", {
      headers: { "User-Agent": "Animex-Web/1.0" }
    })
    const d = await r.json()

    const apk = (d.assets || []).find(x => x.name.toLowerCase().endsWith(".apk"))

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate")
    res.status(200).json({
      version: d.tag_name || "v1.0.2",
      name: d.name || "Animex",
      changelog: d.body || "",
      size: apk ? apk.size : 0,
      url: apk ? apk.browser_download_url : null,
      date: d.published_at || null,
      downloads: apk ? apk.download_count : 0
    })
  } catch (e) {
    res.status(500).json({ error: true, message: e.message })
  }
}

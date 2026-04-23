export default async function handler(req, res) {
  const REPO = "SaurusAraAra/animex-app"

  try {
    const r = await fetch("https://api.github.com/repos/" + REPO + "/releases/latest")
    const d = await r.json()

    const apk = (d.assets || []).find(x => x.name.toLowerCase().endsWith(".apk"))

    res.status(200).json({
      version: d.tag_name,
      name: d.name,
      changelog: d.body,
      size: apk ? apk.size : 0,
      url: apk ? apk.browser_download_url : null,
      date: d.published_at
    })
  } catch {
    res.status(500).json({ error: true })
  }
}

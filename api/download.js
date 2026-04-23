export default async function handler(req, res) {
  const REPO = "SaurusAraAra/animex-app"

  try {
    const r = await fetch("https://api.github.com/repos/" + REPO + "/releases/latest", {
      headers: { "User-Agent": "Animex-Web/1.0" }
    })
    const d = await r.json()
    const apk = (d.assets || []).find(x => x.name.toLowerCase().endsWith(".apk"))

    if (!apk) {
      res.status(404).json({ error: "APK not found in latest release" })
      return
    }

    res.redirect(302, apk.browser_download_url)
  } catch (e) {
    res.status(500).json({ error: true, message: e.message })
  }
}

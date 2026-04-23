export default async function handler(req, res) {
  const REPO = "SaurusAraAra/animex-app"

  try {
    const r = await fetch("https://api.github.com/repos/" + REPO + "/releases/latest")
    const d = await r.json()

    const apk = (d.assets || []).find(x => x.name.toLowerCase().endsWith(".apk"))

    if (!apk) {
      res.status(404).send("not found")
      return
    }

    res.redirect(302, apk.browser_download_url)
  } catch {
    res.status(500).send("error")
  }
}

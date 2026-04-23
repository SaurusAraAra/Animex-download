function formatBytes(bytes) {
  if (!bytes) return "Unknown"
  const sizes = ["B","KB","MB","GB"]
  const i = Math.floor(Math.log(bytes)/Math.log(1024))
  return (bytes/Math.pow(1024,i)).toFixed(2) + " " + sizes[i]
}

async function load() {
  const r = await fetch("/api/release")
  const d = await r.json()

  document.getElementById("version").innerText = d.version
  document.getElementById("size").innerText = formatBytes(d.size)
  document.getElementById("changelog").innerText = d.changelog || "No changelog"
}

load()

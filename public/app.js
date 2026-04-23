function formatBytes(bytes) {
  if (!bytes) return "Unknown"
  const sizes = ["B","KB","MB","GB"]
  const i = Math.floor(Math.log(bytes)/Math.log(1024))
  return (bytes/Math.pow(1024,i)).toFixed(2) + " " + sizes[i]
}

function parseDesc(input) {
  if (!input) return ""

  const lines = input.split("\n")
  let html = ""

  lines.forEach(line => {
    const t = line.trim()
    if (!t) return

    if (t.startsWith("<img")) {
      html += t
    } else if (t.startsWith("**") && t.endsWith("**")) {
      const text = t.replace(/\*\*/g,"")
      html += `<div class="bold">${text}</div>`
    } else {
      html += `<div class="text">${t}</div>`
    }
  })

  return html
}

async function load() {
  const r = await fetch("/api/release")
  const d = await r.json()

  document.getElementById("version").innerText = d.version
  document.getElementById("size").innerText = formatBytes(d.size)

  document.getElementById("desc").innerHTML = parseDesc(d.changelog)
}

load()

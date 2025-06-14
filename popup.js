function msToTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

chrome.storage.local.get(null, (data) => {
  const list = document.getElementById("siteList");
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);

  for (const [site, time] of sorted) {
    const li = document.createElement("li");
    li.textContent = `${site}: ${msToTime(time)}`;
    list.appendChild(li);
  }
});

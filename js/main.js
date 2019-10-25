async function urlToColor(url) {
  const urlUint8 = new TextEncoder().encode(url);
  const hashBuffer = await crypto.subtle.digest("SHA-256", urlUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => { return (b % 0xcc).toString(16).padStart(2, "0"); }).join("");
  return "#" + hashHex.substr(0, 6);
}

async function doMagic(className) {
  const boxes = document.getElementsByClassName(className);
  for (let i = 0; i < boxes.length; ++i) {
    const box = boxes[i];
    const url = box.dataset.url;
    const color = await urlToColor(url);
    box.style.backgroundColor = color;
  }
}

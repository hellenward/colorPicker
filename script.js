const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const historyArray = [];

function makeImage(image) {
  const base_image = new Image();
  base_image.src = image;
  base_image.onload = function() {
    ctx.drawImage(base_image, 0, 0, 400, 300);
  }
}

makeImage('INFOGRAPHIC_04C.png');

function RGBToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

document.getElementById('file').onchange=function(event) {
  const reader = new FileReader();
  const file = event.target.files[0];
  reader.onload = () => {
    const picUrl = reader.result;
    makeImage(picUrl);
  }
  reader.readAsDataURL(file);
}


canvas.onclick=function(event) {
  const myImageData = ctx.getImageData(event.offsetX, event.offsetY, 1, 1);
  const red = myImageData.data[0];
  const green = myImageData.data[1];
  const blue = myImageData.data[2];
  const alpha = myImageData.data[3];
  const rgba = `rgb(${red}, ${green}, ${blue})`;
  const toShow = document.querySelectorAll(".hidden");
  document.querySelector(".resultBox").style.backgroundColor = rgba;
  document.querySelector(".RGBP").innerText = `RGBA: ${rgba}`;
  document.querySelector(".hexP").innerText = `Hex: ${RGBToHex(red, green, blue)}`;
  toShow.forEach(function(element) {element.classList.remove('hidden')});
  const historyInsert = document.querySelector('.history');
  historyInsert.insertAdjacentHTML('afterend', `<div class="historyStyling" title="${RGBToHex(red, green, blue)} ${rgba}" style="background-color:${RGBToHex(red, green, blue)}"></div>`);
//  const lastHistoryStylingList = document.querySelectorAll(".historyStyling");
//  const lastHistoryStyling = lastHistoryStylingList.item(lastHistoryStylingList.length-1);
//  console.log(lastHistoryStyling);
}

canvas.onmousemove=function(event) {
  var myImageData = ctx.getImageData(event.offsetX, event.offsetY, 1, 1);
  const red = myImageData.data[0];
  const green = myImageData.data[1];
  const blue = myImageData.data[2];
  const alpha = myImageData.data[3];
  const rgba = `rgb(${red}, ${green}, ${blue})`
  document.querySelector(".hoverBox").style.backgroundColor = rgba;
  document.querySelector(".RGBPHover").innerText = `RGBA: ${rgba}`;
  document.querySelector(".hexPHover").innerText = `Hex: ${RGBToHex(red, green, blue)}`;
}

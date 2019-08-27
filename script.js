const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const historyArray = [];

function makeImage(image) {
  const base_image = new Image();
  base_image.src = image;
  base_image.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const imageRatio = base_image.width/base_image.height;
    if(base_image.width > base_image.height) {
      ctx.drawImage(base_image, 0, (404-404/imageRatio)/2, 404, 404/imageRatio);
    } else {
      ctx.drawImage(base_image, (404-404*imageRatio)/2, 0, 404*imageRatio, 404);
    }
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
  historyInsert.classList.remove("hidden");
  historyInsert.insertAdjacentHTML(
    'afterend',
    `<div
      class="historyStyling copyRgb"
      title="${RGBToHex(red, green, blue)} ${rgba}"
      data-hex="${RGBToHex(red, green, blue)}"
      style="background-color:${RGBToHex(red, green, blue)}"
    >
    </div>`);
    const insertedList = document.querySelectorAll('.copyRgb');
    const lastInserted = insertedList[0];
    console.log(lastInserted);
    lastInserted.onclick=copyToClipboard;
}

function fadeIn(el) {
  el.classList.add('show');
  el.classList.remove('hide');
};

function fadeOut(el) {
  setTimeout(function() {
    el.classList.add('hide');
    el.classList.remove('show');
  }, 1500)
};

function copyToClipboard(event) {
  const historyInsert = document.body;
  historyInsert.insertAdjacentHTML(
    'afterend',
    `<textarea class="copyText">${event.currentTarget.dataset.hex}</textarea>`
  )
  const textCopyArea = document.querySelector(".copyText");
  textCopyArea.select();
  document.execCommand("copy");
  textCopyArea.parentNode.removeChild(textCopyArea);
  const alertBox = document.querySelector('.alertboxCopy');
  fadeIn(alertBox);
  fadeOut(alertBox);
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


const fillGrid = function(hue, opacity) {
console.log("fillign now!", hue, opacity);
//  const table = document.getElemntById('swatchTable')
  for(let x=1; x<9; x++) {

    let row = document.getElementById(`row-${x}`);

    while (row.hasChildNodes()) {
    row.removeChild(row.lastChild);
    }

    let sat = (x*8)+4;

    for(let y=1; y<9; y++) {
      let light = (y*8)+4;
      let hslaString = `hsla(${hue}, ${sat}%, ${light}%, ${opacity})`;
      let rgb = hslToRgb(hue, sat, light);
      let rgbString = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`


      let singleSwatch = document.createElement("TD")

      singleSwatch.style.backgroundColor = hslaString

      setAttributes(singleSwatch, {"rbg": rgbString, "hsla": hslaString});

      singleSwatch.addEventListener('click', function() {

        let rbg = singleSwatch.getAttribute('rgb');
        let hsla = singleSwatch.getAttribute('hsla');

        const clickedDisplay = document.getElementById('clickedDisplay');
        clickedDisplay.style.backgroundColor = hslaString;
        const colorInfo = document.getElementById('colorInfo')
        colorInfo.innerHTML = `<p>${hslaString}</p> <p>${rgbString}</p>`;
      });
      row.appendChild(singleSwatch);
    }
  }
}


function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

//convert hsl to Rgb
function hslToRgb(h, s, l){
  let r, g, b;

  if(s == 0){
      r = g = b = l; // achromatic
  }else{
    const hue2rgb = function hue2rgb(p, q, t){
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}



const userValues = document.getElementById('userValues')

userValues.addEventListener('input', function(e) {
  e.preventDefault();
  console.log( userValues.firstChild);
  var hue = userValues.firstChild.value;
  console.log(hue);
  let opacity = opacity.value;
  filGrid(hue, opacity);
})

window.onload = fillGrid(170, 1);

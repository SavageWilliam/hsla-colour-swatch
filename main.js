
let hue = 170, opacity = 1;
const toolbar = document.getElementById('toolbar')

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

const tableSwatch = document.getElementById('table-swatch');

const fillGrid = function(hue, opacity) {

  for(let x=1; x<9; x++) {
    let row = document.getElementById(`row-${x}`);
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

        let colour = singleSwatch.getAttribute('colour-data');

        let colorInfo = document.createElement("DIV");
        console.log(colorInfo);
        colorInfo.style.backgroundColor = hslaString;
        colorInfo.setAttribute('colour', hslaString);

        toolbar.appendChild(singleSwatchDiv);
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

function gettAttributes(el, attrs) {
  for(var key in attrs) {
    el.getAttribute(key, attrs[key]);
  }
}

window.onload = fillGrid(170, 1);

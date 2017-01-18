
const fillGrid = (hue, opacity) => {
  hue = (!hue) ? 170 : hue;
  opacity = (!opacity) ? 1 : opacity;

  for(let x=1; x<10; x++) {

    let row = document.getElementById(`row-${x}`);

    while (row.hasChildNodes()) {
    row.removeChild(row.lastChild);
    }

    for(let y=1; y<10; y++) {
      let light = (y*8)+4;
      let sat = (x*8)+4;
      let rgb = hslToRgb(hue, sat, light);
      let hslaString = `hsla(${hue}, ${sat}%, ${light}%, ${opacity})`;
      let rgbString = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`

      let singleSwatch = document.createElement("TD")

      singleSwatch.style.backgroundColor = hslaString

      setAttributes(singleSwatch, {"rbg": rgbString, "hsla": hslaString});

      singleSwatch.addEventListener('click', () => {

        let rbg = singleSwatch.getAttribute('rgb');
        let hsla = singleSwatch.getAttribute('hsla');

        setColorDisplay(rgbString, hslaString);

      });
      row.appendChild(singleSwatch);
    }
  }
}

setAttributes =  (el, attrs) => {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

hslToRgb = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if(s == 0){
      r = g = b = l; // achromatic
  }else{
    const hue2rgb = (p, q, t) => {
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = parseInt(hue2rgb(p, q, h+1/3)*255),
    g = parseInt(hue2rgb(p, q, h)*255),
    b = parseInt(hue2rgb(p, q, h-1/3)*255);
  }
  return [r, g, b];
}


const userValues = document.getElementById('userValues')

userValues.addEventListener('input', e => {
  e.preventDefault();
  var hue = document.getElementById('hueValue').value;
  var opacity = document.getElementById('opacityValue').value;

    fillGrid(hue, opacity);

})

setColorDisplay = (rgbString, hslaString) => {
  console.log("color display");
  const clickedDisplay = document.getElementById('clickedDisplay');
  clickedDisplay.style.backgroundColor = hslaString;
  const colorInfo = document.getElementById('colorInfo')
  colorInfo.innerHTML = `<p>${hslaString}</p> <p>${rgbString}</p>`;
}

window.onLoad = setColorDisplay( 'rgba(68, 196, 175, 1)', 'hsla(170, 52%, 52%, 1)')
window.onload = fillGrid(170, 1);

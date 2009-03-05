function displayImage(data, pixels) {
    var i = 0;
    while(i < data.length) {
        var pixel = data[i++];
        var x = pixel[0];
        var y = pixel[1];
        var rgba = pixel.slice(2);
        Element.prototype.setRGB.apply(pixels[y][x], rgba);
    }
}

Number.prototype.toHex = function() {
    var n = this;
    var hex = n.toString(16);
    if(hex.length == 1)
        hex = "0" + hex;
    return hex;
};

Element.prototype.setRGB = function (r,g,b,a) {
    var elt = this;
    var opacity = a == 0 ? 1.0 : a / 255;
    var bg = a == 0 ? "" : "#" + r.toHex() + g.toHex() + b.toHex();

    elt.style.backgroundColor = bg;
    elt.style.opacity = opacity;
};

function drawBoxes(w,h,xoff,yoff,boxw) {
    function createDiv(x, y) {
        var div = document.createElement('div');
        div.style.top = (y * (boxw + 1)) + yoff;
        div.style.left = (x * (boxw + 1)) + xoff;
        document.body.appendChild(div);

        return div;
    }

    var array = new Array(h);
    for(var y = 0; y < h; y++) {
        array[y] = new Array(w);
        for(var x = 0; x < w; x++) {
            array[y][x] = createDiv(x, y);
        }
    }

    return array;
}

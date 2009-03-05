function displayImage(data, pixels) {
    var i = 0;
    for(var y = 0; y < 32; y++) {
        for(var x = 0; x < 32; x++) {
            var rgba = data[i++];
            pixels[y][x].setRGB(rgba.r, rgba.g, rgba.b, rgba.a);
        }
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
    elt.style.backgroundColor = "#" + r.toHex() + g.toHex() + b.toHex();
    elt.style.opacity = a / 255;
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

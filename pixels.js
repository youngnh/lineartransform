function displayImage(data, pixels) {
    var i = 0;
    while(i < data.length) {
        var pixel = data[i++];
        var x = pixel[0];
        var y = pixel[1];
        var rgba = pixel.slice(2);
        if(y < pixels.length && x < pixels[y].length)
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

function translate(dx,dy) {
    var a = new Array(7);
    for(var x = 0; x < 7; x++) {
        a[x] = new Array(7);
        for(var y = 0; y < 7; y++) {
            a[x][y] = 0;
        }
    }
    for(var x = 0, y = 0; x < 7 && y < 7; x++, y++) {
        a[x][y] = 1;
    }
    a[0][6] = dx;
    a[1][6] = dy;

    return a;
}

function mMult(rmatrix, cmatrix) {
    var arr = new Array();
    for(var i = 0; i < rmatrix.length; i++) {
        arr[i] = new Array();
        for(var j = 0; j < cmatrix.length; j++) {
            arr[i][j] = dot(rmatrix[i], cmatrix[j]);
        }
    }

    return arr;
}

function dot(v, w) {
    var sum = 0;
    for(var i = 0; i < v.length; i++) {
        sum += v[i] * w[i];
    }
    return sum;
}

function swallowHandler(event) {
    event.stopPropagation();
}

function makeEditable(td) {
    var input = document.createElement('input');
    input.type = "text";
    input.value = td.textContent;
    input.size = 1;
    input.addEventListener('click', swallowHandler, false);

    var newtd = document.createElement('td');
    newtd.appendChild(input);

    td.parentNode.replaceChild(newtd, td);

    function handler(event) {
        window.removeEventListener('click', handler, false);
        unmakeEditable(newtd);
    }
    window.addEventListener('click', handler, false);
}

function unmakeEditable(td) {
    var input = td.firstChild;

    var newtd = document.createElement('td');
    newtd.textContent = input.value;
    newtd.addEventListener('click', editableHandler, false);

    td.parentNode.replaceChild(newtd, td);
}

function editableHandler(event) {
    makeEditable(event.target);
    event.stopPropagation();
    return event;
}

function collectArrayFromTable(table) {
    var arr = new Array();
    for(var c = 0; c < 7; c++) {
        arr[c] = new Array();
        for(var r = 0; r < 7; r++) {
            arr[c][r] = parseInt(table.rows[r].cells[c].textContent);
        }
    }

    return arr;
}
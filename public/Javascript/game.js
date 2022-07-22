var valofintvl = 0;
var expandsize = true;
var intervalId;
var shapes = [];
var tally = 0;
var start = false;
var canvasposclick = new Array;

function showCoords(canvas, event) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var Rectangle = canvas.getBoundingClientRect();
    var x = (event.clientX - Rectangle.left) / (Rectangle.right - Rectangle.left) * canvas.width;
    var y = (event.clientY - Rectangle.top) / (Rectangle.bottom - Rectangle.top) * canvas.height;
    if (tally < 4) {
        canvasposclick[tally++] = [x, y];
    }
}

function StartGame() {
    var errormsg = document.getElementById("game_error");
    errormsg.style.padding = "10px";
    errormsg.style.display = "block";
    errormsg.style.background = "#fe8b8e";

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var Rectangle = canvas.getBoundingClientRect();

    let totalShapes = [1, 2, 3, 4];
    for (var i = 0; i < tally; i++) {
        var random = Math.floor(Math.random() * totalShapes.length - 1) + 1;
        let current = totalShapes.splice(random, 1)[0];
        shapes.push(current);
    }

    if (tally == 4) {
        game_error.style.display = "none";
        intervalId = setInterval(function () {
            figurescaling(context, canvas, canvasposclick, Rectangle);
            if (expandsize) {
                valofintvl += 4;
            } else {
                valofintvl -= 4;
            }
        }, 700);
    }
    else {
        textMessage = "Please click on more " + (4 - tally) + " spots";
        errormsg.innerHTML = textMessage;

    }
}

function StopGame() {
    var errormsg = document.getElementById("game_error");
    game_error.style.display = "none";
    var canvas = document.getElementById("canvas");
    var context= canvas.getContext("2d");
    clearInterval(intervalId);
    context.clearRect(0, 0, canvas.width, canvas.height);
    tally = 0;
    coordinates = [];
    valofintvl = 0;
    expandsize = true;
    start = false;
}

function Changeinscale(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; 
        break;
        case 1: r = q, g = v, b = p; 
        break;
        case 2: r = p, g = v, b = t; 
        break;
        case 3: r = p, g = q, b = v; 
        break;
        case 4: r = t, g = p, b = v; 
        break;
        case 5: r = v, g = p, b = q; 
        break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function figurescaling(context, canvas, canvasposclick, Rectangle) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    l = 20 + valofintvl;
    w = 25 + valofintvl;
    if (l >= 100) {
        expandsize = false;
    }
    if (l <= 20) {
        expandsize = true;
    }

    for (i = 0; i < 4; i++) {
        x = canvasposclick[i][0];
        y = canvasposclick[i][1];
        var click1 = unicorn((Math.random() * 255) + 1);
        var click2 = unicorn((Math.random() * 255) + 1);
        var click3 = unicorn((Math.random() * 255) + 1);
        var click4 = unicorn((Math.random() * 255) + 1);

        switch (shapes[i]) {
            case 1: triangle(context, canvas, l, w, x, y, click1); 
            break;
            case 2: circle(context, canvas, l, w, x, y, click2); 
            break;
            case 3: Oval(context, canvas, l, w, x, y, click3); 
            break;
            case 4: Arc(context, canvas, l, w, x, y, click4); 
            break;
            default: Rectangle(context, canvas, l, w, x, y, click4); 
            
        }
    }

}

function unicorn(p) {
    var rgb = Changeinscale(p / 100.0 * 0.85, 1.0, 1.0);
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
}

function colorSelect() {

    var caseNo = Math.floor(Math.random() * 7) + 1;
    switch (caseNo % 7) {
        case 1: return "Electric Blue"; break;
        case 2: return "Hot Pink"; break;
        case 3: return "Shocking Yellow"; break;
        case 4: return "Darkest Gray"; break;
        case 5: return "Chartreuse-ish"; break;
        case 6: return "purple"; break;
        case 7: return "red"; break;
        default: return "white"; break;
    }

}

function Rectangle(context, canvas, l, w, x, y, colourOfRectangle) {
    context.Rectangle(x, y, l, w);
    context.fillStyle = colourOfRectangle;
    context.fill();
    context.strokeStyle = 'black';
    context.stroke();
}

function circle(context, canvas, l, w, x, y, colourOfRectangle) {
    context.beginPath();
    context.arc(x, y, l, 0, 2 * Math.PI);
    context.fillStyle = colourOfRectangle;
    context.fill();
    context.strokeStyle = 'black';
    context.stroke();
}

function triangle(context, canvas, l, w, x, y, colourOfRectangle) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + l, y);
    context.lineTo(x + l, y + w);
    context.closePath();
    context.fillStyle = colourOfRectangle;
    context.fill();
    context.strokeStyle = 'black';
    context.stroke();
}


function Arc(context, canvas, l, w, x, y, colourOfRectangle) {
    context.beginPath();
    context.arc(x, y, l, 0, Math.PI, false);
    context.closePath();
    context.fillStyle = colourOfRectangle;
    context.fill();
    context.strokeStyle = 'black';
    context.stroke();
}

function Oval(context, canvas, l, w, x, y, colourOfRectangle) {
    context.beginPath();
    context.ellipse(x, y, l, w, Math.PI / 4, 0, 2 * Math.PI);
    context.fillStyle = colourOfRectangle;
    context.fill();
    context.strokeStyle = 'black';
    context.stroke();
}


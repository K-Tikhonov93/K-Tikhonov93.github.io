var cvs = document.getElementById("canvas1");
var ctx = cvs.getContext("2d");
let name = document.getElementById("name");
localStorage.setItem('lvl1', 0);
localStorage.setItem('lvl2', 0);
localStorage.setItem('lvl3', 0);

let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
localStorage.setItem('counter1', 0);
localStorage.setItem('counter2', 0);
localStorage.setItem('counter3', 0);

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
localStorage.setItem('theme1', 'assets/css/light.css');

function start() {
    if (isEmpty(name.value)) {
        alert("Нужно ввести имя!");
    }
    else {
        localStorage.setItem('name', name.value);
        document.location.href = "pages/level1.html";
    }
}

function isEmpty(str) {
    return str.trim() == '';
}

var numbers = getNumbers();

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}


function random() {
    return Math.floor(Math.random() * (numbers.length))
}

var gap = 100;

var numbers = getNumbers();
var fillRect = function(img, x, y) {
    ctx.drawImage(img, x, y);
};
var strokeRect = function(x, y, w, h) {
    ctx.strokeRect(x, y, 90, 130);
};
var Rect = function(x, y, rnd) {
    this.x = x;
    this.y = y;
    this.w = numbers[rnd].width;
    this.h = numbers[rnd].height;
    this.rnd = rnd;
    this.img = numbers[rnd];
};
Rect.prototype = {
    returnRnd: function() {
        return this.rnd;
    },
    returnImg: function() {
        return this.img;
    },
    returnX: function() {
        return this.x;
    },
    returnY: function() {
        return this.y;
    },
    update: function(x_coord, y_coord) {
        this.x = this.x + x_coord;
        this.y = this.y + y_coord;
    },
    draw: function() {
        fillRect(this.img, this.x, this.y);
    },
    stroke: function() {
        strokeRect(this.x, this.y, this.w, this.h);
    },
    select: function() {
        this.selected = !this.selected;
    }
};

var i = 0,
    rect = [];
for (i = 0; i < 1000; i++) {
    rect.push(new Rect(randomInteger(0, cvs.width),randomInteger(0, cvs.height), random()));
};

var counter = 0;

setInterval (function () {
      rect[counter].draw();
      counter++;
},100)

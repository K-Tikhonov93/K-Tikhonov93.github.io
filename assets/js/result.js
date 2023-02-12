var cvs = document.getElementById("canvas2");
var ctx = cvs.getContext("2d");
let reset = document.getElementById("reset");
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
let name = localStorage.getItem('name');
let save = document.getElementById("save");

let x = localStorage.getItem('lvl1');
let b = localStorage.getItem('lvl2');
let c = localStorage.getItem('lvl3');

let score = Number(x) + Number(b) + Number(c);

var sum = document.getElementById('sum');
var lev1 = document.getElementById('lvl1');
var lev2 = document.getElementById('lvl2');
var lev3 = document.getElementById('lvl3');
var name1 = document.getElementById('name');
sum.innerHTML="Всего: "+score;
lev1.innerHTML="Уровень 1: "+x;
lev2.innerHTML="Уровень 2: "+b;
lev3.innerHTML="Уровень 3: "+c;

name1.innerHTML = "Отличная работа, " + name + "!";
reset.onclick = function reset() {
    localStorage.setItem('counter1', 0);
    localStorage.setItem('counter2', 0);
    localStorage.setItem('counter3', 0);
    localStorage.setItem('theme1', 'assets/css/lignt.css');
    document.location.href = "level1.html";
}

var date = new Date();

var hrs = date.getHours();
var mins = date.getMinutes();


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

let theme = document.getElementById("theme");
let theme1 = localStorage.getItem("theme1");
var color = localStorage.getItem('color');
var color1 = localStorage.getItem('color1');
if (theme1 == 'assets/css/dark.css') {
  theme1 = 'assets/css/dark.css';
  theme.href = 'assets/css/dark.css';
  localStorage.setItem('theme1', theme1);
} else {
  theme1 = 'assets/css/lignt.css';
  theme.href = 'assets/css/light.css';
  localStorage.setItem('theme1', theme1);
}

let data = name+" "+"\nРезультат: " + score + "\nУровень 1: " + x + "\nУровень 2: " + b + "\nУровень 3: " + c;
let filename = name+"_"+date.getDay()+"."+date.getMonth()+"_"+hrs+"."+mins"_";
let type = "txt";
console.log(filename);

save.onclick = function () {
    download(data, filename, type);

    function download(data, filename, type) {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, filename);
        else {
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
    localStorage.setItem('theme1', 'assets/css/lignt.css');
    document.location.href = "index.html";
    
}

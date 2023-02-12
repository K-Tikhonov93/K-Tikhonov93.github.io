var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
let button_clear = document.getElementById("clear_scales");
let timer = document.getElementById('timer');
let maxTime = 1000 * 15 * 2;

let counter2 = localStorage.getItem("counter2");

var level = Number(counter2)+Number(1);

let div = document.createElement('div');
div.className = "rules";
div.innerHTML = "<h3>Попытка №"+ level + "</h3><ul><li>При нажатии на левую гирю вес увеличивается</li><li>Игра продолжается до истечения времени</li><li>Если левая гиря тяжелее правой, ее вес можно сбросить кнопкой Очистить весы</li></ul>";
document.body.append(div);

let button_theme = document.getElementById("change_theme");
let theme = document.getElementById("theme");
let theme1 = localStorage.getItem("theme1");
var color = localStorage.getItem('color');
var color1 = localStorage.getItem('color1');
if (theme1 == '../assets/css/dark.css'|| theme1 == 'assets/css/dark.css') {
  theme1 = '../assets/css/dark.css';
  theme.href = '../assets/css/dark.css';
  localStorage.setItem('theme1', theme1);
  ctx.fillStyle = "black";
  color = "black";
  localStorage.setItem('color', color);
  ctx.fillRect(canvas.width / 3, 0, 2 * canvas.width / 3, canvas.height);
  color1 = "#56548c";
  localStorage.setItem('color1', color1);
  ctx.fillRect(0, 0, canvas.width / 3, canvas.height);
} else {
  theme1 = '../assets/css/lignt.css';
  theme.href = '../assets/css/light.css';
  localStorage.setItem('theme1', theme1);
  ctx.fillStyle = "#f0f4ef";
  color = "#f0f4ef";
  localStorage.setItem('color', color);
  ctx.fillRect(canvas.width / 3, 0, 2 * canvas.width / 3, canvas.height);
  color1 = "#d9dbf1";
  localStorage.setItem('color1', color1);
  ctx.fillRect(0, 0, canvas.width / 3, canvas.height);
}
button_theme.onclick = function changeTheme() {
    if (theme1 != '../assets/css/dark.css' && theme1 != '/assets/css/dark.css') {
        theme1 = '../assets/css/dark.css';
        theme.href = '../assets/css/dark.css';
        localStorage.setItem('theme1', theme1);
        ctx.fillStyle = "black";
        color = "black";
        localStorage.setItem('color', color);
        ctx.fillRect(canvas.width / 3, 0, 2 * canvas.width / 3, canvas.height);
        color1 = "#56548c";
        localStorage.setItem('color1', color1);
        ctx.fillRect(0, 0, canvas.width / 3, canvas.height);
    } else {
        theme1 = '../assets/css/lignt.css';
        theme.href = '../assets/css/light.css';
        ctx.fillStyle = "#f0f4ef";
        localStorage.setItem('theme1', theme1);
        color = "#f0f4ef";
        localStorage.setItem('color', color);
        ctx.fillRect(canvas.width / 3, 0, 2 * canvas.width / 3, canvas.height);
        color1 = "#d9dbf1";
        localStorage.setItem('color1', color1);
        ctx.fillRect(0, 0, canvas.width / 3, canvas.height);
    }
}

cvs.width = window.innerWidth;
cvs.height = 5 * window.innerHeight / 6;
ctx.fillStyle = '#d9dbf1';
ctx.strokeStyle = '#56548c';
ctx.lineWidth = 4;

function formatTime(time) {
    let minutes = Math.floor(time / 1000 / 60);
    let seconds = Math.floor(time / 1000 % 60);
    return minutes + ':' + seconds;
}
var support = new Image();
var arm = new Image();
var left_scale = new Image();
var right_scale = new Image();
left_scale.src = "../assets/img/left.png";
right_scale.src = "../assets/img/right.png";
support.src = "../assets/img/support.png";
arm.src = "../assets/img/arm.png";
var armAngle = 0;
var leftWeight = -1;
var rightWeight = -1


function maxWeight(x, y) {
    return Math.max(x, y);
}



function getNumbers() {
    for (var image, array = [], i = 1; i <= 9; i++) {
        image = new Image;
        image.src = "../assets/img/" + i + ".png";
        array.push(image);
    };
    return array;
}

function random() {
    return Math.floor(Math.random() * (numbers.length-2))
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}
var mouse = {
    x: 0,
    y: 0,
    down: false
};
var gap = 100;
var selected = false;
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
var isCursorInRect = function(rect) {
    return mouse.x > rect.x && mouse.x < rect.x + 90 && mouse.y > rect.y && mouse.y < rect.y + 130;
};
var i = 0,
    rect = [];
for (i = 0; i < 100; i++) {
    rect.push(new Rect(randomInteger(0, 4) * gap, 40, random()));
};
var counter = 0;
var TO_RADIANS = Math.PI / 180;

leftWeight = 1;
rightWeight = randomInteger(2, 9);

function drawArm() {
    ctx.save();
    ctx.translate((2 * canvas.width / 3), canvas.height - 6 * support.height / 7);
    armAngle = 40 * (rightWeight - leftWeight) / maxWeight(rightWeight, leftWeight);
    ctx.rotate(armAngle * TO_RADIANS);
    ctx.drawImage(arm, -(arm.width / 2), -(arm.height / 2));
    ctx.rotate(-armAngle * TO_RADIANS);
    if (armAngle >= 0) {
        ctx.drawImage(left_scale, -(arm.width / 2) - left_scale.width / 2 + armAngle, -(6 * arm.height) - armAngle * 4.5 + 80);
        ctx.drawImage(numbers[leftWeight -1], -(arm.width / 2) - left_scale.width / 2 + armAngle - 30 + 70, -(6 * arm.height) - armAngle * 4 + 200)
        ctx.drawImage(numbers[rightWeight - 1], (arm.width / 2) - left_scale.width / 2 - armAngle - 30 + 70 * 1, -(6 * arm.height) + armAngle * 4 + 200)
        ctx.drawImage(right_scale, (arm.width / 2) - left_scale.width / 2 - armAngle, -(6 * arm.height) + armAngle * 4 + 80);
            }
    if (armAngle < 0) {
        ctx.drawImage(left_scale, -(arm.width / 2) - left_scale.width / 2 - armAngle, -(6 * arm.height) - armAngle * 4 + 80);
        ctx.drawImage(numbers[leftWeight - 1], -(arm.width / 2) - left_scale.width / 2 - armAngle - 30 + 70 , -(6 * arm.height) - armAngle * 4 + 200)
        ctx.drawImage(numbers[rightWeight - 1], (arm.width / 2) - left_scale.width / 2 - armAngle - 30 + 70 * 1, -(6 * arm.height) + armAngle * 4 + 200)
        ctx.drawImage(right_scale, (arm.width / 2) - left_scale.width / 2 + armAngle, -(6 * arm.height) + armAngle * 4.5 + 80);
            }
    ctx.restore();
    ctx.drawImage(support, 2 * canvas.width / 3 - support.width / 2, canvas.height - support.height);
}
let startTime = null;
let timerId = setInterval(function() {
    if (startTime === null) {
        startTime = Date.now()
    }
    let now = Date.now();
    if (now - startTime >= maxTime) {
        clearInterval(timerId);
        let div = document.createElement('div');
            div.className = "center";
            rect = [];
            div.innerHTML = "<h1>Время вышло :(</h1>";
            document.body.append(div);
            setTimeout(function() {
                        if (counter2<2){
                         counter2++;
                        localStorage.setItem('counter2', counter2);
                        localStorage.setItem('lvl3', 0);
                        document.location.href = 'level3.html';
                    }
                    else{
                        localStorage.setItem('lvl3', 0);
                        document.location.href = 'results.html';
                    }
                    }, (2 * 1000));
    } else {
        if (leftWeight == rightWeight && !isDown) {
            clearInterval(timerId);
                       
            if (counter2==0){
                localStorage.setItem('lvl3', 600);
                document.location.href = 'results.html';
            }
            if (counter2==1){
                localStorage.setItem('lvl3', 400);
                document.location.href = 'results.html';
            }
            if (counter2==2){
                localStorage.setItem('lvl3', 200);
                document.location.href = 'results.html';
            }
            
            let div = document.createElement('div');
            div.className = "center";
            rect = [];
            div.innerHTML = "<h1>Уровень пройден!</h1>";
            document.body.append(div);
            setTimeout(function() {
                        document.location.href = 'level3.html'
                    }, (2 * 1000));
        }
    }
    timer.innerText = formatTime(maxTime - (Date.now() - startTime));
}, 100);

var pr = false;

function increase(d) {
    if (leftWeight < 9 && d) {
        sleep(500);
        leftWeight += 1;
        if (leftWeight > rightWeight) {
            pr = true;
        }
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function fail() {
    increase(isDown);
    ctx.fillStyle = color;
    ctx.fillRect(canvas.width / 3, 0, 2 * canvas.width / 3, canvas.height);
    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, canvas.width / 3, canvas.height);
    drawArm();
    if (selected) {
        selected.x = mouse.x - 45;
        selected.y = mouse.y - 65;
    }
    requestAnimationFrame(fail);
}
arm.onload = fail();
button_clear.onclick = function () {
    leftWeight = 1;
    armAngle = 40 * (rightWeight - leftWeight) / maxWeight(rightWeight, leftWeight);
}
var isDown = false;
window.onmousemove = function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
};
window.onmousedown = function(e) {
    mouse.down = true;
    if (mouse.x > 2 * canvas.width / 3 - arm.width / 2 - left_scale.width / 2 && mouse.x < 2 * canvas.width / 3 - arm.width / 2 - left_scale.width / 2 + left_scale.width) {
        isDown = true;
    };
};
window.onmouseup = function (e) {
    isDown = false;
    mouse.down = false;
    selected = false;
};

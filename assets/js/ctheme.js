let button_theme = document.getElementById("change_theme");
let theme = document.getElementById("theme");
let theme1 = 'assets/css/light.css';
let color = "#f0f4ef";
let color1 = "#d9dbf1";


button_theme.onclick = function changeTheme() {
    if (theme1 != 'assets/css/dark.css') {
        theme1 = 'assets/css/dark.css';
        localStorage.setItem('theme1', theme1);
        theme.href = 'assets/css/dark.css';
        //ctx.fillStyle = "black";
        color = "black";
        localStorage.setItem('color', color);
        //ctx.fillRect(canvas.width / 3, 0, 2 * canvas.width / 3, canvas.height);
        color1 = "#56548c";
        localStorage.setItem('color1', color1);
        //ctx.fillRect(0, 0, canvas.width / 3, canvas.height);
    } else {
        theme1 = 'assets/css/lignt.css';
        localStorage.setItem('theme1', theme1);
        theme.href = 'assets/css/light.css';
        //ctx.fillStyle = "#f0f4ef";
        color = "#f0f4ef";
        localStorage.setItem('color', color);
        //ctx.fillRect(canvas.width / 3, 0, 2 * canvas.width / 3, canvas.height);
        color1 = "#d9dbf1";
        localStorage.setItem('color1', color1);
        //ctx.fillRect(0, 0, canvas.width / 3, canvas.height);
    }
}

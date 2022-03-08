const MINUS = document.getElementById("reduceBtn")
const SIZE = document.getElementById("sizeBtn")
const CLOSE_APP = document.getElementById("closeBtn")

MINUS.addEventListener("click", reduce_app)
SIZE.addEventListener("click", size_app)
CLOSE_APP.addEventListener("click", close_app)

function close_app () {
    app.window.close();
}

function size_app () {
    app.window.size();
}

function reduce_app () {
    app.window.minimize();
}
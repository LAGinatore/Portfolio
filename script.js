function info(id) {
    const dec = document.getElementById(id);
    if (dec.classList.contains('hidden')) {
        dec.classList.remove('hidden');
    }
    else {
        dec.classList.add('hidden');
    }
}
function Navbar() {
    const nav = document.getElementById("navbar-list");
    nav.classList.toggle("active");
}

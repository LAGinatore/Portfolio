function info(id) {
    const dec = document.getElementById(id);
    if (dec.classList.contains('hidden')) {
        dec.classList.remove('hidden');
    }
    else {
        dec.classList.add('hidden');
    }
}
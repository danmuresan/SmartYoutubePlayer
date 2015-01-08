var links = document.querySelectorAll('.playlist_tiles > ul > li'), el = null;
var msie = /*@cc_on!@*/0;

for (var i = 0; i < links.length; i++) {
    el = links[i];

    el.setAttribute('draggable', 'true');

    el.addEventListener('dragstart', function (e) {
        e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
        e.dataTransfer.setData('Text', this.innerHTML); // required otherwise doesn't work
    }, false);
}

var bin = document.querySelector('#playlist_box');

bin.addEventListener('dragover', function (e) {
    if (e.preventDefault) e.preventDefault(); // allows us to drop
    this.className = 'over';
    e.dataTransfer.dropEffect = 'copy';
    return false;
}, false);

// to get IE to work
bin.addEventListener('dragenter', function (e) {
    this.className = 'over';
    return false;
}, false);

bin.addEventListener('dragleave', function () {
    this.className = '';
}, false);

bin.addEventListener('drop', function (e) {
    if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???

    var el = document.getElementById(e.dataTransfer.getData('Text'));

    el.parentNode.removeChild(el);

    // stupid nom text + fade effect
    bin.className = '';
    bin.appendChild(y);

    setTimeout(function () {
        var t = setInterval(function () {
            if (y.style.opacity <= 0) {
                if (msie) { // don't bother with the animation
                    y.style.display = 'none';
                }
                clearInterval(t);
            } else {
                y.style.opacity -= 0.1;
            }
        }, 50);
    }, 250);

    return false;
}, false);
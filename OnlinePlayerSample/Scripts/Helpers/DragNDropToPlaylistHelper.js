﻿var links = document.querySelectorAll('.playlist_tiles > ul > li'), el = null;
var msie = /*@cc_on!@*/0;
var elementNode = null;

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
    e.dataTransfer.dropEffect = 'move';
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

    var elementText = e.dataTransfer.getData('Text');
    var el = document.getElementById(elementText);


    var htmlElementBox = "<div class='vid-item' id='track" + elementText + "'><div class='thumb'><img src='Content/themes/base/images/Desert.jpg'></div><div class='desc'>Track no. " + elementText + "</div></div>";
    elementNode = document.createElement('div');
    elementNode.innerHTML = htmlElementBox;
    //el.parentNode.removeChild(el);

    // stupid nom text + fade effect
    bin.className = '';

    if ($(bin).children('#track' + elementText).length === 0) {
        console.log('Track ' + elementText + ' added to playlist...');
        bin.appendChild(elementNode);
    }
    else {
        console.log('Track ' + elementText + ' already exists in playlist');
    }


    setTimeout(function () {
        var t = setInterval(function () {
            if (elementNode.style !== undefined && elementNode.style.opacity <= 0) {
                if (msie) { // don't bother with the animation
                    elementNode.style.display = 'none';
                }
                clearInterval(t);
            } else {
                elementNode.style.opacity -= 0.1;
            }
        }, 50);
    }, 250);

    return false;
}, false);
var links = document.querySelectorAll('.playlist_tiles > ul > li'), el = null;
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

    // stupid nom text + fade effect
    bin.className = '';

    if ($('.horizontal_box > #track' + elementText).length == 0) {
        console.log('Track ' + elementText + ' added to playlist...');
        $('.horizontal_box').append("<div class='vid-item' id='track" + elementText + "'><div class='thumb'><img src='Content/themes/base/images/Desert.jpg'></div><div class='desc'>Track no. " + elementText + "</div></div>");
    }
    else {
        console.log('Track ' + elementText + ' already exists in playlist');
    }

    var elementNode = $('.horizontal_box > #track' + elementText).get(0);
    $(elementNode).css('opacity', '0.5').show().animate({ opacity: 1 }, 250, 'linear');


    return false;
}, false);
var links = document.querySelectorAll('.playlist_tiles > ul > li'), el = null;
var msie = /*@cc_on!@*/0;
var elementNode = null;

for (var i = 0; i < links.length; i++) {
    el = links[i];

    el.setAttribute('draggable', 'true');

    el.addEventListener('dragstart', function (e) {
        var id = $(this).attr('id');

        e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
        e.dataTransfer.setData('Text', this.innerHTML); // required otherwise doesn't work
        e.dataTransfer.setData('Source', id);
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

    var elementTextRough = '<div class="thumb">' + e.dataTransfer.getData('Text');
    elementTextRough = elementTextRough.replace('<p>', '</div><div class="desc">');
    var elementText = elementTextRough.replace('</p>', '</div>');
    var elementId = e.dataTransfer.getData('Source');

    // stupid nom text + fade effect
    bin.className = '';

    if ($('.horizontal_box > #' + elementId).length == 0) {
        console.log('Track ' + elementText + ' added to playlist...');
        $('.horizontal_box').append("<div class='vid-item' id='" + elementId + "'>" + elementText + "</div>");
    }
    else {
        console.log('Track ' + elementText + ' already exists in playlist');
    }

    var elementNode = $('.horizontal_box > #' + elementId).get(0);
    $(elementNode).css('opacity', '0.5').show().animate({ opacity: 1 }, 100, 'linear');


    return false;
}, false);
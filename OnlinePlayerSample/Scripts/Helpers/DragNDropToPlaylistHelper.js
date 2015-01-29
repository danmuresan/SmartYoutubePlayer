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

    bin.className = '';

    if ($('.horizontal_box > #' + elementId).length == 0) {
        console.log('Track ' + elementText + ' added to playlist...');
        $('.horizontal_box').append("<div class='vid-item' id='" + elementId + "'>" + elementText + "</div>");
        addTrackToPlaylist(elementId);
    }
    else {
        console.log('Track ' + elementText + ' already exists in playlist');
    }

    var elementNode = $('.horizontal_box > #' + elementId).get(0);
    $(elementNode).css('opacity', '0.5').show().animate({ opacity: 1 }, 100, 'linear');


    return false;
}, false);

function addTrackToPlaylist(elementMarkupId) {
    var elementId = elementMarkupId.replace(/[^\d.]/g, '');

    $.ajax({
        url: '/Player/GetTrackById',
        type: "GET",
        dataType: "json",
        data: { trackId: elementId },
        success: function (data) {
            console.log(data);
            var trackName = data.TrackName;
            var trackUrl = data.TrackStreamUrl;
            var trackId = data.Id;

            appendNewTrackToDropDownPlaylist(trackUrl, trackName);

            var newTrack = createNewTrack(trackId, trackUrl);
        },
        error: function (xhr, stats, errorMessage) {
            alert('Error retrieving track with Id: ' + elementId);
            console.log(errorMessage + ' (Error getting track Id: ' + elementId + ')');
        }
    });
}

function appendNewTrackToDropDownPlaylist(trackUrl, trackName) {
    var trackListItemHtml = '<li><a href="' + trackUrl + '"><b>' + trackName + '</b></a></li>';
    $('#full_width_player .sm2-playlist-wrapper .sm2-playlist-bd').append(trackListItemHtml);
}

function createNewTrack(trackId, trackUrl) {
    var newTrack = soundManager.createSound({
        id: trackId,
        url: trackUrl,
        autoLoad: true,
        autoPlay: false,
        onload: function () {
            console.log('Track ' + trackId + ' loaded successfully!');
        }
    });

    return newTrack;
}

$('.vid-item .thumb').hover(
    function () {
        $(this).append('<span id="play_btn_overlay">+</span>');
        console.log(this);
    },
    function() {
        $("#play_btn_overlay").remove();
        console.log(this);
    }
);

function beginPlayTrack() {
    document.getElementById('selected_track_link').click();
}

$(".vid-item .thumb").live('click', function () {
    $('.vid-item').removeClass('selected');
    $(this).parent().addClass('selected');
    
    // link selection to the other playlist as well (somehow signal selection of corresponding element in the dropdown playlist as well)
    var trackId = $(this).parent().attr('id');
    $('#full_width_player .sm2-playlist-wrapper .sm2-playlist-bd li').removeClass('selected');
    $('#full_width_player .sm2-playlist-wrapper .sm2-playlist-bd li a').removeAttr('id');
    $('#full_width_player .sm2-playlist-wrapper .sm2-playlist-bd #' + trackId).addClass('selected');
    $('#full_width_player .sm2-playlist-wrapper .sm2-playlist-bd #' + trackId + ' a').attr('id', 'selected_track_link');

    // begin play (simply call the newly added + selected element in the playlist)
    document.getElementById('selected_track_link').click();

    //...
});
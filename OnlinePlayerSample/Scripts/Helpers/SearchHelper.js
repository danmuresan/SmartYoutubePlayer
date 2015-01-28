$(document).on('submit', '#navbar_search_form', function (e) {
    e.preventDefault();
    postAjaxForm(e.target);


});

function createFilterMenuArray() {
    var menuItemsArray = ['Everything', 'Tracks', 'Artists', 'Genre'];
    return menuItemsArray;
}

var postAjaxForm = function (form) {
    var updateElement = $('#main_track_tiles_container');

    if (!$(updateElement).length) {
        alert('Unable to find update element');
        return false;
    }

    // declare empty variable for holding play bar data from static partial view
    var playBar = null;

    // retrieve static partial view via a simple ajax call (for play toolbar on search)
    $.ajax({
        type: 'GET',
        url: "/Player/GetTrackToolbar",
        success: function (response) {
            playBar = response;
        }
    }).done(function () {

        // on complete of get request for static partial view, retrieve the actual data via another GET ajax call with form submit
        if ($(form).valid()) {
            $.ajax({
                type: $(form).attr('method'),
                url: $(form).attr('action'),
                data: $(form).serialize(),
                contentType: 'application/json; charset=utf-8',
                success: function (response) {

                    console.log(response);

                    // create the left side menu section for special filter actions on the searched tracks
                    var responseHtml = '<section id="search_filter_menu_section"><h2>Filter</h2><ul class="search_filter_menu">';
                    var menuItemsArray = createFilterMenuArray();
                    for (var i = 0; i < menuItemsArray.length - 1; i++) {
                        var menuItemHash = "#" + menuItemsArray[i].toLowerCase();
                        responseHtml += '<a class="search_filter_menu_item_link" href="' + menuItemHash + '"><li class="search_filter_menu_item">' + menuItemsArray[i] + '</li></a>';
                    }

                    // handle special case of last menu item (for border style of menu)
                    var lastMenuItem = menuItemsArray[menuItemsArray.length - 1];
                    var lastMenuItemHash = "#" + lastMenuItem.toLowerCase();
                    responseHtml += '<a class="search_filter_menu_item_link" href="' + lastMenuItemHash + '"><li class="search_filter_menu_item" id="search_filter_menu_item_last">' + lastMenuItem + '</li></a>';
                    responseHtml += '</ul></section>';

                    // create the right side section for displaying the searched track list
                    responseHtml += '<section id="search_results_section">';

                    // append the retrieved static partial view
                    console.log(playBar);
                    responseHtml += playBar;

                    // create the search track list container and append tracks to it based on the received JSON
                    responseHtml += '<div id="search_results_container"><ul id="search_results_track_list">';
                    for (var i = 0; i < response.length; i++) {
                        responseHtml += '<li class="search_list_item"><div class="search_item">';
                        responseHtml += '<img src=' + response[i].ImageUrl + '>';
                        responseHtml += '<div class="search_item_content">' + '<h2>' + response[i].TrackName + '</h2><h3>' + response[i].TrackDescription + '</h3><div class="search_item_stats">Rating and stats here...</div></div>';
                        responseHtml += '</div></li>';
                    }
                    responseHtml += '</ul></div></section>';

                    if (response.redirect) {
                        window.location = response.redirectUrl;
                    } else {
                        // how to do update more elegantly instead of building html by hand ('@{Html.RenderPartial("~/Views/Tracks/_SearchedTrackList.cshtml")}') ???
                        $(updateElement).html(responseHtml);
                        $.validator.unobtrusive.parse($(updateElement).find('form'));
                    }

                    // register filter menu actions
                    $('.search_filter_menu_item_link:first-child').addClass('active');
                    registerFilterMenuClicks();

                    // filter tracks according to the menu entry
                    var filteredList = response;

                    // register PlayAll button click
                    registerPlayAllButtonClick(filteredList);

                },
                error: function (xhr, stats, errorMessage) {
                    alert('Error loading homepage tracks...');
                    console.log(errorMessage);
                }
            });
        }

    });

    return true;
};

function registerFilterMenuClicks() {
    $('.search_filter_menu_item_link').click(function () {

        //remove old active class
        $('.search_filter_menu_item_link').removeClass('active');

        // setup new active class
        $(this).addClass('active');

    });
}

function registerPlayAllButtonClick(filteredList) {

    $('#search_toolbar_playall').click(function () {
        playAll(filteredList);
    });
}

function playAll(filteredList) {
    
    console.log('Begin play all searched tracks...');
    var trackIdToJumpTo = 0;

    for (var i = 0; i < filteredList.length; i++) {
        var elementId = filteredList[i].Id;
        var elementText = filteredList[i].TrackName;
        $('.horizontal_box').append("<div class='vid-item' id='track_" + elementId + "'>" + elementText + "</div>");
        
        // set first track of the search list as the next to play
        var selectedToPlayNext = false;
        if (i == 0) {
            selectedToPlayNext = true;
            trackIdToJumpTo = elementId;
        }
        
        // add track to playlist (and mark the first track as selected)
        addTracksToPlaylist(elementId, selectedToPlayNext);
    }
    
    // jump to first track in playlist
    

    // begin play on jumped track
    playTrack(trackIdToJumpTo);
}

function addTracksToPlaylist(elementId, selectedToPlayNext) {

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

            var trackListItemHtml = '';

            if (selectedToPlayNext) {
                $('.sm2-playlist-bd li').removeClass('selected');
                trackListItemHtml = '<li class="selected"><a id="selected_track_link"  href="' + trackUrl + '"><b>' + trackName + '</b></a></li>';
            } else {
                trackListItemHtml = '<li><a href="' + trackUrl + '"><b>' + trackName + '</b></a></li>';
            }
            
            // append new track to our playlists
            $('#full_width_player .sm2-playlist-wrapper .sm2-playlist-bd').append(trackListItemHtml);
            //TODO sync with horizontal playlist as well (append to it)

            // create the newly added track
            var newTrack = createTrack(trackId, trackUrl);
        },
        error: function (xhr, stats, errorMessage) {
            alert('Error retrieving track with Id: ' + elementId);
            console.log(errorMessage + ' (Error getting track Id: ' + elementId + ')');
        }
    });
}

function createTrack(trackId, trackUrl) {
    var newTrack = soundManager.createSound({
        id: trackId,
        url: trackUrl,
        autoLoad: true,
        autoPlay: false,
        onload: function() {
            console.log('Track ' + trackId + ' loaded successfully!');
            
        }
    });

    playAddedTrack();

    return newTrack;
}

function playAddedTrack() {
    console.log('Track clicked...');
    
    // see http://stackoverflow.com/questions/5811122/how-to-trigger-a-click-on-a-link-using-jquery for explanations
    document.getElementById('selected_track_link').click();
}
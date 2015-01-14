$(document).on('submit', '#navbar_search_form', function (e) {
    e.preventDefault();
    postAjaxForm(e.target);
});

function createFilterMenuArray() {
    var menuItemsArray = ['foo', 'bar', 'foobar', 'haha'];
    return menuItemsArray;
}

var postAjaxForm = function(form) {
    var updateElement = $('#main_track_tiles_container');

    if (!$(updateElement).length) {
        alert('Unable to find update element');
        return false;
    }

    if ($(form).valid()) {
        $.ajax({
            type: $(form).attr('method'),
            url: $(form).attr('action'),
            data: $(form).serialize(),
            contentType: 'application/json; charset=utf-8',
            success: function(response) {

                console.log(response);

                var responseHtml = '<section id="search_filter_menu_section"><h2>Filter</h2><ul class="search_filter_menu">';
                var menuItemsArray = createFilterMenuArray();
                for (var i = 0; i < menuItemsArray.length - 1; i++) {
                    responseHtml += '<a class="search_filter_menu_item_link" href="#"><li class="search_filter_menu_item">' + menuItemsArray[i] + '</li></a>';
                }
                responseHtml += '<a class="search_filter_menu_item_link" href="#"><li class="search_filter_menu_item" id="search_filter_menu_item_last">' + menuItemsArray[menuItemsArray.length - 1] + '</li></a>';
                responseHtml += '</ul></section>';


                responseHtml += '<section id="search_results_section"><div id="search_results_container"><ul id="search_results_track_list">';

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
            },
            error: function (xhr, stats, errorMessage) {
                alert('Error loading homepage tracks...');
                console.log(errorMessage);
            }
        });
    }
    return true;
};


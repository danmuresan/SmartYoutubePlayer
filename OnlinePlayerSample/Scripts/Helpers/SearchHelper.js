$(document).on('submit', '#navbar_search_form', function (e) {
    e.preventDefault();
    postAjaxForm(e.target);
});

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
                var responseHtml = '<div id="search_results_container"><ul id="search_results_track_list">';
                
                for (var i = 0; i < response.length; i++) {
                    responseHtml += '<li>';
                    responseHtml += response[i].TrackName;
                    responseHtml += '</li>';
                }

                responseHtml += '</ul></div>';

                if (response.redirect) {
                    window.location = response.redirectUrl;
                } else {
                    // how to do update('@{Html.RenderPartial("~/Views/Tracks/_SearchedTrackList.cshtml")}') ???
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


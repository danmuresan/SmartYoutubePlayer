$("#navbar_search_form input").autocomplete({
    source: function(request, response) {
        var suggestedTracks = new Array();
        $.ajax({
            async: false,
            cache: false,
            contentType: 'application/json; charset=utf-8',
            type: $('#navbar_search_form').attr('method'),
            url: $('#navbar_search_form').attr('action'),
            data: { "term": request.term },
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    suggestedTracks[i] = { label: data[i].TrackName, value: data[i].TrackName };
                }
            }
        });
        response(suggestedTracks);
    }
});

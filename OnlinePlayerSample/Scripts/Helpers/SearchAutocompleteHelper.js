//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 1600;  //time in ms, 5 second for example
var textboxInput = '#navbar_search_form input';

//on keyup, start the countdown
$(textboxInput).keyup(function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$(textboxInput).keydown(function () {
    clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping() {
    
    //do automcomplete
    $(textboxInput).autocomplete({
        source: function (request, response) {
            var suggestedTracks = new Array();
            $.ajax({
                async: false,
                cache: false,
                contentType: 'application/json; charset=utf-8',
                type: $('#navbar_search_form').attr('method'),
                url: $('#navbar_search_form').attr('action'),
                data: { "searchString": request.term },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.TrackName, value: item.TrackName };
                    }));
                }
            });
            //response(suggestedTracks);
        }
    });
    
}



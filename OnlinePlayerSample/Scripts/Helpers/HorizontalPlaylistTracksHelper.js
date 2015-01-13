$(document).ready(function ()
{
    $("#Id").change(function ()
    {
        var id = $("#Id").val();
        var playlistContainer = $(".horizontal_box");
        $.ajax({
            cache: false,
            type: "GET",
            url: '@(Url.RouteUrl("HorizontalPlaylist"))',
            data: { "id": id },
        success: function (data) {
            alert('Playlist Loaded Successfully...');
            //playlistContainer.html('<div class="vid-item"><div class="thumb"><img src="~/Content/themes/base/images/Desert.jpg"></div><div class="desc">Jessica Hernandez & the Deltas - Dead Brains</div></div>');
            //booksDiv.html(data);
        },
        error: function (xhr, ajaxOptions, thrownError)
        {
            alert('Failed to load playlist...');                    
        }
    });
});
});      
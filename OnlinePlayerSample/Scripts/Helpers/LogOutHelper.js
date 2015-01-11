$(function () {
    $('#navbar_logout_btn').click(function () {
        console.log('clicked...');
        $('#logout_form').submit();
    });
});
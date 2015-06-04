$(document).ready(function() {
    $('#main-menu a').click(function (event) {
        // Prevents the default behavior which is
        // to load the page synchronously
        event.preventDefault();
        var input = $('#textId').val();

        //$('#main').load(this.href + ' #sharemenu *', function (data, status) {
        $('#main').load("jsonDemo.html #"+input, function (data, status) {
            $bar = $('#notification-bar');

            if (status === 'success') {
                $bar.text('The page has been successfully loaded.');
                console.log(data);
            } else {
                $bar.text('An error occurred.');
            }

            $bar.slideDown('normal')
                .delay(2000)
                .slideUp('fast');
        });
    });

    $("button").click(function(){
        $("#div1").load("../../data/jsonData");
    });


    /*$('#main-menu a').click(function (event) {
        // Prevents the default behavior which is
        // to load the page synchronously
        event.preventDefault();

        $('#main').load("jsonDemo.html", function (data, status) {
            $bar = $('#notification-bar');

            if (status === 'success') {
                $bar.text('The page has been successfully loaded.');
            } else {
                $bar.text('An error occurred.');
            }

            $bar.slideDown('normal')
                .delay(2000)
                .slideUp('fast');
        });
    });*/


});
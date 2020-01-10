$(document).ready(function () {

    changeBackground()

    $('#changebg').click(function () {
        changeBackground()
    })

    function changeBackground() {
        var min = 1
        var max = 19;

        var randomnumber = (Math.floor(Math.random() * (max - min + 1)) + min)

        $('.fullbg').css('background-image', 'url("./assets/BG' + randomnumber + '.jpeg")')
    }

    $('#moveUp').click(function () {
        $('.staticInfoContainer').toggleClass('movedUp')
        $('.detailedViewContainer').slideToggle()
        if ($('#moveUp').text() == 'Show Detailed System Information') {
            $('#moveUp').text('Hide Detailed System Information')
        } else {
            $('#moveUp').text('Show Detailed System Information')
        }
    })

    $('#quit').click(function(e) {
        var remote = require('electron').remote;
        var bw = remote.BrowserWindow;
        var window = bw.getFocusedWindow();
        window.close();
    })

})
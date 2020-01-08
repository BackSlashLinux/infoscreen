$(document).ready(function() {
    $('#moveUp').click(function(){
        $('.staticInfoContainer').toggleClass('movedUp')
        if ($('#moveUp').text() == 'Show Detailed System Information') {
            $('#moveUp').text('Hide Detailed System Information')
        } else {
            $('#moveUp').text('Show Detailed System Information')
        }
    })
})
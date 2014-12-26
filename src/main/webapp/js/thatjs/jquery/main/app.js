$(document).ready(function () {

    // can conditionally add event listeners, to mql objects that will fire when
    // media query changes (orientation: profile) for ex.
    var mql = window.matchMedia("only screen and (max-width: 760px)");

    if (mql.matches) {
        //Conditional script here
        $('#content').html('injected jquery max-width < 760px');
    } else {
        $('#content').html('injected jquery max-width > 760px');
    }

});

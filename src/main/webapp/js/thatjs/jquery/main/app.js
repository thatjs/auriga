$(document).ready(function () {

    // declare namespace
    var th = {};

    };
    // can conditionally add event listeners, to mql objects that will fire when
    // media query changes (orientation: profile) for ex.

    // should be a registration service pub/sub that will fire an event based on
    // changes to the browser (width, orientation ... )

    // using media queries, we dynamically load the
    mqLayout = window.matchMedia("only screen and (max-width: 760px)");

    if (mqLayout.matches) {
        //Conditional script here
        $('#content').html('injected jquery max-width < 760px');
    } else {
        $('#content').html('injected jquery max-width > 760px');
    }

});

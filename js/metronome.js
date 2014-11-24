// on window load
window.onload = function() {



    ////////////////////////////////////////////
    // FastClick (removes 300ms delay on mobile)
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }



    ////////////////////
    // number formatting
    function format(num) {
        if (num > 0) {
            return '+' + (num / 1000).toFixed(3);
        } else if (num < 0) {
            return (num / 1000).toFixed(3);
        } else {
            document.getElementsByClassName('scores')[0].className = document.getElementsByClassName('scores')[0].className + ' win';
            return '±0.000';
        }
    }



    ///////////////
    // find trigger

    // find all possible triggers
    var trigger = document.getElementsByClassName('trigger')[0];
    var flash = document.getElementsByClassName('flash')[0];



    ///////////////////////////////
    // clock, timestamp, last, best
    var clock = new Date().getTime();
    var timestamp = '';
    var last = '';
    var best = 500;



    /////////////
    // game clock

    // set up 1Hz clock
    window.setInterval(function() {

        // update clock
        clock = new Date().getTime();

        // add active class to flash
        flash.className = flash.className + ' active';
        // after 10 ms...
        setTimeout(function() {
            // ...remove active class from flash
            flash.className = flash.className.replace(/\b\ active\b/, '');
        }, 10);
    }, 1000);



    //////////////////
    // click/tap event

    // add listeners
    trigger.addEventListener('click', trigger_event);
    trigger.addEventListener('touchstart', trigger_event);

    // event function
    function trigger_event(e) {

        // avoid double triggering on touch and click
        e.preventDefault();

        // get new timestamp
        timestamp = new Date().getTime();

        // only allow attempts every 250ms
        if ((timestamp - last) > 250) {

            // compare timestamp to clock
            var difference = timestamp - clock;

            // if difference is more than 500, consider it early for next
            if (difference > 500) {
                difference = - (1000 - difference);
            }

            // update last
            document.getElementsByClassName('last')[0].innerHTML = format(difference);

            // if improved
            if (Math.abs(difference) < Math.abs(best)) {

                // update best
                best = difference;
                document.getElementsByClassName('best')[0].innerHTML = format(best);
            }

            // save new last attempt
            last = timestamp;
        }
    };



}

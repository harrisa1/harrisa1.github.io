var Clock = (function() {
    var svgURI = 'http://www.w3.org/2000/svg';

    function GetClock() {
        var html = '\
                <circle class="clockFace" cx="50" cy="50" r="45"/>\
                <g id="hands">\
                    <rect id="hour" class="hand" x="47.5" y="22.5" width="5" height="30" rx="2.5" ry="2.5"/>\
                    <rect id="min" class="hand" x="48.5" y="12.5" width="3" height="40" rx="2" ry="2"/>\
                    <line id="sec" class="hand sec" x1="50" y1="50" x2="50" y2="12.5"/>\
                </g>\
                <circle cx="50" cy="50" r="1" fill="#ff1a1a"/>\
                <g id="ticks"></g>\
                <g id="dots"></g>\
            ';
        $('#Clock').html(html);
    }

    function Rotate(element, degree) {
        $('#' + element).attr('transform', 'rotate(' + degree + ' 50 50)');
    }

    function GetMyClock() {
        SetTicks();
        SetDots();
        setInterval(function() {
            var d = new Date();
            Rotate('sec', 6 * d.getSeconds());
            Rotate('min', 6 * d.getMinutes());
            Rotate('hour', 30 * (d.getHours() % 12) + d.getMinutes() / 2);
        }, 1000);
    }

    function SetTicks() {
        for (var i = 0; i < 12; i++) {
            var tick = document.createElementNS(svgURI, 'line');
            tick.setAttribute('id', 'tick' + i);
            tick.setAttribute('x1', 50);
            tick.setAttribute('y1', 8);
            tick.setAttribute('x2', 50);
            tick.setAttribute('y2', 12);
            tick.setAttribute('class', 'tick');
            $('#ticks').append(tick);
            Rotate('tick' + i, i * 30);
        }
    }

    function SetDots() {
        for (var i = 0; i < 60; i++) {
            var dot = document.createElementNS(svgURI, 'circle');
            dot.setAttribute('id', 'dot' + i);
            dot.setAttribute('cx', 50);
            dot.setAttribute('cy', 8);
            dot.setAttribute('r', 0.5);
            dot.setAttribute('class', 'dot');
            $('#dots').append(dot);
            Rotate('dot' + i, i * 6);
        }
    }

    return {
        Init: function() {
            GetClock();
            GetMyClock();
        }
    };
})();
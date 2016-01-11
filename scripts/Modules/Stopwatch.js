var Stopwatch = (function() {
    var i = 0;
    var timer;
    var interval = 100;
    var before = new Date();
    var buttons = {
        'Start': {},
        'Stop': {},
        'Reset': {}
    };

    function GetStopwatch() {
        var html = '\
            <span id="timer_out" class="timer">0</span>\
            <span id="label_out" class="timerLabel">Sec</span>\
            <div class="flexbox row justifyCenter">\
                <button id="Start">Start</button>\
                <button id="Stop">Stop</button>\
                <button id="Reset">Reset</button>\
            </div>\
            ';
        $('#Stopwatch').html(html);
    }

    function increment() {
        var now = new Date();
        var elapsedTime = (now.getTime() - before.getTime());
        var newI = Math.floor(elapsedTime / interval);
        i += Math.max(newI, 1);
        var hours = Math.floor(i / 10 / 60 / 60);
        var mins = Math.floor(i / 10 / 60);
        mins = hours < 1 ? mins : mins % 60;
        var secs = Math.floor(i / 10) % 60;
        secs = secs < 10 && (mins > 0 || hours > 0) ? "0" + secs : secs;
        var tnths = i % 10;
        var time = (hours < 1 ? "" : hours + ":");
        time += (mins < 1 ? "" : mins + ":");
        time += secs + "." + tnths;
        var label = (hours < 1 ? "" : "Hr:");
        label += (mins < 1 ? "" : "Min:") + "Sec";
        $('#timer_out').text(time);
        $('#label_out').text(label);
        before = new Date();
    }

    return {
        Init: function() {
            GetStopwatch();
            UpdateButtons(buttons, RegisterButtonClick, function(button) {
                return Stopwatch.OnClick;
            });
        },
        OnClick: function() {
            DisableButton(event.target, buttons);
            clearInterval(timer);
            timer = null;
            Stopwatch[event.target.id]();
        },
        Start: function() {
            before = new Date();
            timer = self.setInterval(increment, interval);
        },
        Stop: function() {},
        Reset: function() {
            i = 0;
            $('#timer_out').text('0');
            $('#label_out').text('Sec');
        }
    };
})();
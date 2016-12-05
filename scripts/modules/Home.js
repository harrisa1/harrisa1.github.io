var Home = (function() {
    var name = 'Home';
    var containerClasses = [
        'home', 'flexbox', 'row', 'alignCenter', 'justifyCenter'
    ];

    function GetHTML() {
        var html = '\
            <div id="' + name + 'Header"></div>\
            <div class="flex1 flexbox column alignCenter justifyCenter">\
            </div>\
            <svg id="Clock" class="clock flex1" viewBox="0 0 100 100"></svg>\
            <div id="Stopwatch" class="stopwatch flex1 flexbox column alignCenter justifyCenter"></div>\
            ';
        $('#' + name + 'Container').html(html);
    }

    return {
        Init: function() {
            GetHTML();
            SetContainerClasses(name, containerClasses);
            Clock.Init();
            Stopwatch.Init();
        },
        OnClick: function() {
        }
    };
})();
var Vacations = (function() {
    var name = 'Vacations';
    var containerClasses = [
        'flexbox', 'column', 'alignCenter'
    ];
    var sheetsURL = 'https://docs.google.com/spreadsheets/d/';
    var sheetID = '1rYyCg0VnkIg750Le1HBwZkJxRxaDVNDzIRZW3XC5qro';
    var sheetURL = sheetsURL + sheetID;
    var buttons = {
        'Timeoff': {
            gid: '0'
        },
        'Vacation Ideas': {
            gid: '107241447'
        }
    };

    function GetHTML() {
        var html = GetHTMLHeader();
        html += '<iframe id="' + name + 'Sheet"></iframe>';
        $('#' + name + 'Container').html(html);
    }

    function GetHTMLHeader() {
        var html = '<div id="' + name + 'Header">';
        for (var prop in buttons) {
            html += '<button id="' + prop + '">' + prop + '</button>';
        }
        html += '</div>';
        return html;
    }

    return {
        Init: function() {
            GetHTML();
            SetContainerClasses(name, containerClasses);
            UpdateButtons(buttons, RegisterButtonClick, function(button) {
                return Vacations.OnClick;
            });
            var url = sheetURL + '/edit#gid=0';
            $('#' + name + 'Sheet').attr('src', url);
            this.Resize();
            $('#Timeoff').prop("disabled", true);
        },
        OnClick: function() {
            var id = event.target.id;
            DisableButton(event.target, buttons);
            var url = sheetURL + '/edit#gid=' + buttons[id].gid;
            $('#' + name + 'Sheet').attr('src', url);
        },
        Resize: function() {
            ResizeIFrame(name);
        }
    };
})();
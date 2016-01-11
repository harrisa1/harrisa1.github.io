var WishList = (function() {
    var name = 'WishList';
    var containerClasses = [
        'flexbox', 'column', 'alignCenter'
    ];
    var sheetsURL = 'https://docs.google.com/spreadsheets/d/';
    var sheetID = '1TOIZNFwo44yPB0p__H3xneqL2dpn_SQHUo4wULRaNPM';
    var sheetURL = sheetsURL + sheetID;
    var buttons = {
        'Andrew': {
            gid: '0'
        },
        'Maisey': {
            gid: '2114405360'
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
                return WishList.OnClick;
            });
            var url = sheetURL + '/edit#gid=0';
            $('#' + name + 'Sheet').attr('src', url);
            this.Resize();
            $('#Andrew').prop("disabled", true);
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
var Vacations = (function() {
    var name = 'Vacations';
    var containerClasses = [
        'flexbox', 'column', 'alignCenter'
    ];
    var sheetsURL = 'https://docs.google.com/spreadsheets/d/';
    var sheetID = '1rYyCg0VnkIg750Le1HBwZkJxRxaDVNDzIRZW3XC5qro';
    var sheetURL = sheetsURL + sheetID;
    var buttons = {
        'Vacation Ideas': {
            gid: '107241447'
        },
        'Camping Ideas': {
            gid: '704998962'
        }
    };

    function GetHTML() {
        var html = GetHTMLHeader();
        html += '<iframe id="' + name + 'Sheet"></iframe>';
        $('#' + name + 'Container').html(html);
    }

    function GetHTMLHeader() {
        var html = '<div id="' + name + 'Header"></div>';
        return html;
    }

    return {
        Init: function() {
            GetHTML();
            SetContainerClasses(name, containerClasses);
            var url = sheetURL + '/edit#gid=107241447';
            $('#' + name + 'Sheet').attr('src', url);
            this.Resize();
        },
        Resize: function() {
            ResizeIFrame(name);
        }
    };
})();
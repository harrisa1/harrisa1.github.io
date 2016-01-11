var Meals = (function() {
    var name = 'Meals';
    var containerClasses = [
        'flexbox', 'column', 'alignCenter'
    ];
    var sheetsURL = 'https://docs.google.com/spreadsheets/d/';
    var sheetID = '1ZGvaS7b_FYvJeS7stmTUX5NMBoDlwNQ_SSmSw_aFEYc';
    var sheetURL = sheetsURL + sheetID;

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
            var url = sheetURL + '/edit#gid=0';
            $('#' + name + 'Sheet').attr('src', url);
            this.Resize();
        },
        Resize: function() {
            ResizeIFrame(name);
        }
    };
})();
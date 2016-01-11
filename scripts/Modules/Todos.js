var Todos = (function() {    
    var name = 'Todos';
    var containerClasses = [
        'notes', 'flexbox', 'column', 'alignCenter'
    ];
    var buttons = {
        'Save': {
            url: 'https://docs.google.com/document/d/',
            sheetID: '1S3yHhXHUKrhKRorO6_vyyf4oy4XpudjRoEU1zyd0kfE',
            url2: '/edit'
        },
        'Projects': {
            url: 'https://docs.google.com/spreadsheets/d/',
            sheetID: '1oNt4FKpDgFJEhEgo9wP9ASE8WbaVewPV8zJGNKpsQ9c',
            url2: '/edit#gid=0'
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
                return Todos.OnClick;
            });
            var id = 'Save';
            var url = buttons[id].url + buttons[id].sheetID + buttons[id].url2;
            $('#' + name + 'Sheet').attr('src', url);
            this.Resize();
            $('#' + id).prop("disabled", true);
        },
        OnClick: function() {
            var id = event.target.id;
            DisableButton(event.target, buttons);
            var url = buttons[id].url + buttons[id].sheetID + buttons[id].url2;
            $('#' + name + 'Sheet').attr('src', url);
        },
        Resize: function() {
            ResizeIFrame(name);
        }
    };
})();
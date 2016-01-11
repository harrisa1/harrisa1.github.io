var Notes = (function() {
    var name = 'Notes';
    var containerClasses = [
        'notes', 'flexbox', 'column', 'alignCenter'
    ];
    var CLIENT_ID = '599846796786-utqs24o9ecae4ibcgiujq0nclpco6j4s.apps.googleusercontent.com';
    var SCOPES = ['https://www.googleapis.com/auth/drive'];
    var authorized = true;
    var timer;
    var notes = [];
    var parentFolder;
    var currentNoteId = 0;
    var nextNoteId = 0;
    var buttons = {
        'Create': {
            image: '0BxRDplunxMIZcFZZaHhJY2VrQ2s'
        },
        'Save': {
            image: '0BxRDplunxMIZUXdxLVNmWjJOU2M'
        },
        'Delete': {
            image: '0BxRDplunxMIZQWNubDZTZ21fTGM'
        }
    };

    function GetHTML() {
        var html = GetHTMLHeader();
        html += '\
            <div class="flexbox row alignCenter">\
                <div id="noteButtons" class="flexbox column alignStretch"></div>\
                <div class="note">\
                    <div class="noteHeader"></div>\
                    <div class="noteBody"></div>\
                    <div class="noteFooter"></div>\
                    <input type="text" id="noteTitle" class="noteTitle" maxlength="30"/>\
                    <textarea id="noteArea" class="editor"></textarea>\
                </div>\
            </div>\
            ';
        $('#' + name + 'Container').html(html);
    }

    function GetHTMLHeader() {
        var html = '<div id="' + name + 'Header">';
        for (var prop in buttons) {
            html += '<button id="' + prop + '" onclick="Notes.' + prop + '()">\
                    <img src="' + host + buttons[prop].image + '" alt="' + prop + '" class="image">\
                </button>';
        }
        html += '</div>';
        return html;
    }

    function Authorize() {
        gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: authorized
        }, LoadNotes);
    }

    function LoadNotes(response) {
        if (response) {
            console.log("gapi authorized");
            authorized = true;
            if (timer){
                clearInterval(timer);
                timer = null;
            }
            var interval = parseInt(response.expires_in, 10)*500;
            timer = self.setInterval(Reauthorize, interval);
            gapi.client.load('drive', 'v2', FindNotes);
        } else {
            authorized = false;
            Authorize();
        }
    }
    
    function Reauthorize() {
        SaveNote();
        authorized = true;
        Authorize();
    }

    function FindNotes() {
        var request = gapi.client.drive.files.list({
            'maxResults': 50,
            'q': "title contains 'websitenote' and trashed != true"
        });
        request.execute(GetNotes);
    }

    function GetNotes(response) {
        notes = response.items;
        notes.sort(SortingFunction);
        CreateButtons(notes);
        if (notes.length > 0) {
            if (currentNoteId === 0) {
                currentNoteId = notes[0].id;
            }
            GetParent(currentNoteId);
            DownloadFile(currentNoteId, SetNote);
        } else {
            $('#noteTitle').val('');
            $('#noteArea').val('');
        }
    }

    function SortingFunction(note1, note2) {
        return (note1.title.toLowerCase() > note2.title.toLowerCase()) - (note1.title.toLowerCase() < note2.title.toLowerCase());
    }

    function CreateButtons() {
        $('#noteButtons').html('');
        for (var i = 0; i < notes.length; i++) {
            CreateButtonForNote(notes[i]);
        }
    }

    function CreateButtonForNote(note) {
        var title = SetTitle(note);
        var html = '<button id="' + note.id + '" class="noteButton" onclick="Notes.DownloadNote()">' + title + '</button>';
        $('#noteButtons').html($('#noteButtons').html() + html);
    }

    function SetTitle(note) {
        var title = 'New Note';
        if (note && note.title) {
            title = note.title.substring(0, note.title.indexOf('.websitenote'));
        }
        return title;
    }

    function GetParent(id) {
        var request = gapi.client.drive.parents.list({
            'fileId': id
        });
        request.execute(function(response) {
            parentFolder = response.items;
        });
    }

    function DownloadFile(id, callback) {
        var note = GetClickedNote(id);
        if (note.downloadUrl) {
            var accessToken = gapi.auth.getToken().access_token;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', note.downloadUrl);
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            xhr.onload = function() {
                callback(id, xhr.responseText);
            };
            xhr.onerror = function() {
                callback(null);
            };
            xhr.send();
        } else {
            callback(null);
        }
    }

    function GetClickedNote(id) {
        if (notes.length === 0) {
            return {
                title: $('#noteTitle').val(),
                id: 0,
                text: $('#noteArea').val()
            };
        }
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id === id) {
                return notes[i];
            }
        }
    }

    function SetNote(id, text) {
        var note = GetClickedNote(id);
        $('#noteTitle').val(SetTitle(note));
        $('#noteArea').val(text);
        DisableClickedNoteButton(GetNoteButton(id));
    }

    function GetNoteButton(id) {
        var noteButtons = document.getElementsByClassName('noteButton');
        for (var i = 0; i < noteButtons.length; i++) {
            if (noteButtons[i].id === id) {
                return noteButtons[i];
            }
        }
    }

    function DisableClickedNoteButton(noteButton) {
        var noteButtons = document.getElementsByClassName('noteButton');
        DisableButton(noteButton, noteButtons);
    }

    function SaveNote() {
        var note = GetClickedNote(currentNoteId);
        currentNoteId = nextNoteId;
        if (note.id !== 0) {
            UpdateNote(note.id, FindNotes);
        } else {
            SaveNewNote(note, FindNotes);
        }
    }

    function UpdateNote(id, callback) {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var reader = new FileReader();
        var text = $('#noteArea').val();
        var myBlob = new Blob([text], {
            type: "text/plain"
        });
        reader.readAsBinaryString(myBlob);
        reader.onload = function(e) {
            var contentType = 'text/plain';
            var metadata = {
                'title': $('#noteTitle').val() + '.websitenote',
                'mimeType': contentType
            };

            var base64Data = btoa(reader.result);
            var multipartRequestBody =
                delimiter +
                'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(metadata) +
                delimiter +
                'Content-Type: ' + contentType + '\r\n' +
                'Content-Transfer-Encoding: base64\r\n' +
                '\r\n' +
                base64Data +
                close_delim;

            var request = gapi.client.request({
                'path': '/upload/drive/v2/files/' + id,
                'method': 'PUT',
                'params': {
                    'uploadType': 'multipart',
                    'alt': 'json'
                },
                'headers': {
                    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
                },
                'body': multipartRequestBody
            });
            if (!callback) {
                callback = function(file) {
                    console.log(file);
                };
            }
            request.execute(callback);
        };
    }

    function SaveNewNote(note, callback) {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var reader = new FileReader();
        var text = note.text || '';
        var myBlob = new Blob([text], {
            type: "text/plain"
        });
        reader.readAsBinaryString(myBlob);
        reader.onload = function(e) {
            var contentType = 'text/plain';
            var metadata = {
                'title': note.title + '.websitenote',
                'mimeType': contentType,
                'parents': parentFolder
            };

            var base64Data = btoa(reader.result);
            var multipartRequestBody =
                delimiter +
                'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(metadata) +
                delimiter +
                'Content-Type: ' + contentType + '\r\n' +
                'Content-Transfer-Encoding: base64\r\n' +
                '\r\n' +
                base64Data +
                close_delim;

            var request = gapi.client.request({
                'path': '/upload/drive/v2/files',
                'method': 'POST',
                'params': {
                    'uploadType': 'multipart'
                },
                'headers': {
                    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
                },
                'body': multipartRequestBody
            });
            if (!callback) {
                callback = function(file) {
                    console.log(file);
                };
            }
            request.execute(callback);
        };
    }

    function CreateNote() {
        var note = {};
        var title = SetTitle(note);
        note = {
            id: 0,
            title: title
        };
        notes.push(note);
        currentNoteId = nextNoteId = 0;
        SaveNote();
    }

    function DeleteNote() {
        var id = currentNoteId;
        currentNoteId = 0;
        TrashNote(id, FindNotes);
    }

    function TrashNote(id, callback) {
        var request = gapi.client.drive.files.trash({
            'fileId': id
        });
        request.execute(callback);
    }

    return {
        Init: function() {
            GetHTML();
            SetContainerClasses(name, containerClasses);
            Authorize();
        },
        Save: function() {
            nextNoteId = currentNoteId;
            SaveNote();
        },
        Create: function() {
            CreateNote();
        },
        Delete: function() {
            DeleteNote();
        },
        DownloadNote: function() {
            var id = event.target.id;
            DisableClickedNoteButton(GetNoteButton(id));
            nextNoteId = id;
            SaveNote();
        },
        Resize: function() {
            MoveHeader(name + 'Header');
        }
    };
})();
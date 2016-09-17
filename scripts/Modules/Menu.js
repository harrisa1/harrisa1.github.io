var Menu = (function() {
    var name = 'Menu';
    var buttons = {};

    function GetHTML() {
        var html = '<div id="' + name + 'Header">';
        for (var prop in buttons) {
            if (buttons[prop].image !== '/images/icons') {
                var title = prop === 'WishList' ? 'Wish List' : prop;
                html += '\
                        <button id="' + prop + '" title="' + title + '">\
                            <img src="/images/icons/' + modules[prop].image + '" alt="' + prop + '" class="image">\
                        </button>\
                        ';
            } else {
                html += '<button id="' + prop + '">' + prop + '</button>';
            }
        }
        html += '</div>';
        $('#' + name).html(html);
    }

    function GetCalculator() {
        var html = '\
                <button id="CalcButton">\
                    <img src="/images/icons/' + modules.Calculator.image + '" alt="Calculator" class="image">\
                </button>\
                ';
        $('#' + name + 'Header').html($('#' + name + 'Header').html() + html);
        $('#CalcButton').click(function() {
            $('#Calculator').toggleClass('hidden');
        });
    }

    function GetMenuButtons() {
        for (var module in modules) {
            if (modules[module].level === 0) {
                buttons[module] = {};
            }
        }
    }

    function MenuButtonClick(button) {
        if ($(button).get(0).tagName === 'IMG') {
            button = $(button).parent()[0];
        }
        var title = button.id;
        if (title === 'WishList') {
            document.title = 'Wish List';
        } else {
            document.title = title;
        }
        $('#favicon').remove();
        $('head').append('<link id="favicon" rel="icon" type="image/x-icon" href="/images/icons/'+ modules[title].image + '"/>');
        ToggleVisibility(title);
        DisableButton(button, buttons);
        return title;
    }

    return {
        Init: function() {
            GetMenuButtons();
            GetHTML();
            GetCalculator();
            UpdateButtons(buttons, RegisterButtonClick, function(button) {
                return Menu.OnClick;
            });
            ToggleVisibility('Home');
            $('#Home').prop("disabled", true);
        },
        OnClick: function() {
            switch (MenuButtonClick(event.target)) {
                case 'Home':
                    Home.OnClick();
                    break;
                case 'Finances':
                    Finances.Resize();
                    break;
                case 'Vacations':
                    Vacations.Resize();
                    break;
                case 'Wish List':
                    WishList.Resize();
                    break;
                default:
                    break;
            }
        }
    };
})();
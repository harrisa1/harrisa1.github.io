/* Global Variables*/
var marginBuffer = 8;

/* Sizing Methods */
function SetHeight(element, buffer, margins) {
    var height = $(document).height();
    height -= buffer + marginBuffer * margins;
    height = height < 0 ? 0 : height;
    $('#' + element).height(height + 'px');
}

function ResizeIFrame(container) {
    var headerMoved = MoveHeader(container + 'Header');
    var header = document.getElementById(container + 'Header');
    var menu = document.getElementById('Menu');
    var headerHeight = header.offsetHeight;
    var headerLeft = header.offsetLeft;
    var menuWidth = menu.offsetWidth;
    var menuHeight = menu.offsetHeight;

    if (headerMoved && headerLeft < menuWidth + marginBuffer) {
        SetHeight(container + 'Sheet', headerHeight + menuHeight, 3);
    } else {
        SetHeight(container + 'Sheet', Math.max(headerHeight, menuHeight), 2);
    }
}

function MoveHeader(element) {
    var moveVertical = false;
    var menu = document.getElementById('Menu');
    var width = $(document).width() - marginBuffer * 2;
    var elemWidth = GetElementWidth(element);
    var menuWidth = menu.offsetWidth;
    var menuHeight = menu.offsetHeight;
    var remainingWidth = width - menuWidth - marginBuffer - elemWidth;
    var marginTop, marginLeft;
    if (menuWidth < remainingWidth) {
        marginTop = 0;
        marginLeft = 0;
    } else if (remainingWidth > 0) {
        marginTop = 0;
        marginLeft = menuWidth - remainingWidth + marginBuffer;
    } else {
        marginTop = menuHeight + marginBuffer;
        marginLeft = 0;
        moveVertical = true;
    }
    $('#' + element).css('margin-left', marginLeft + 'px');
    $('#' + element).css('margin-top', marginTop + 'px');
    return moveVertical;
}

function GetElementWidth(element) {
    var elem = document.getElementById(element);
    for (var module in modules) {
        if (module + 'Header' === element) {
            modules[module].headerWidth = elem.offsetWidth > modules[module].headerWidth ? elem.offsetWidth : modules[module].headerWidth;
            return modules[module].headerWidth;
        }
    }
}

/* Button Methods */
function UpdateButtons(buttons, func, func2) {
    var pageButtons = document.getElementsByTagName('button');
    for (var i = 0; i < pageButtons.length; i++) {
        if (buttons[pageButtons[i].id]) {
            func(pageButtons[i], func2);
        }
    }
}

function RegisterButtonClick(button, func) {
    button.onclick = func(button);
}

function DisableButton(button, buttons) {
    UpdateButtons(buttons, EnableButton);
    button.disabled = true;
}

function EnableButton(button) {
    button.disabled = false;
}

function EnterKey(element, textarea) {
    var code = (element.keyCode ? element.keyCode : element.which);
    if (code == 13) { //Enter keycode
        Calculator.Answer();
        element.preventDefault();
        PlaceCaretAtEnd($('#CalculatorText').get(0));
    }
}

function PlaceCaretAtEnd(element) {
    element.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(element);
        textRange.collapse(false);
        textRange.select();
    }
}

/* Page Events */
function LoadScripts() {
    for (var module in modules) {
        $.getScript("/scripts/Modules/" + modules[module].file);
    }
}

function SetContainerClasses(name, containerClasses) {
    for (var i = 0; i < containerClasses.length; i++) {
        $('#' + name + 'Container').addClass(containerClasses[i]);
    }
}

function GetBodyHTML() {
    var html = '<div id="Menu" class="menu"></div>';
    html += '<div id="Calculator" class="calculator hidden"></div>';
    for (var module in modules) {
        if (modules[module].level === 0) {
            html += '<div id="' + module + 'Container"></div>';
        }
    }
    $('body').html($('body').html() + html);
}

function ToggleVisibility(container) {
    var divs = $('[id$=Container]').toArray();
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].id === container + 'Container') {
            if ($('#' + divs[i].id).hasClass('hidden')) {
                $('#' + divs[i].id).toggleClass('hidden');
            }
        } else {
            if (!$('#' + divs[i].id).hasClass('hidden')) {
                $('#' + divs[i].id).toggleClass('hidden');
            }
        }
    }
}

function MyOnLoadEvent(func) {
    var oldOnLoad = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldOnLoad();
            func();
        };
    }
}

function MyOnResizeEvent(func) {
    var oldOnResize = window.onresize;
    if (typeof window.onresize != 'function') {
        window.onresize = func;
    } else {
        window.onresize = function() {
            oldOnResize();
            func();
        };
    }
}
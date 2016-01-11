var Calculator = (function() {
    var ops = [];
    var empty = '';
    var validZeroLeaders = ['zero', 'decimal', 'digit'];
    var validDecimalLeaders = ['zero', 'digit'];
    var validDecimalLeadersWithZero = ['basic', 'level2'];
    var validDigitLeaders = ['zero', 'decimal', 'digit', 'basic', 'level2'];
    var validExtraLeaders = ['basic', 'level2'];
    var validBasicLeaders = ['zero', 'decimal', 'digit', 'extra', 'level1', 'level3'];
    var validLevel1Leaders = ['zero', 'decimal', 'digit', 'level2'];
    var validLevel2Leaders = ['basic', 'advanced', 'level2'];
    var validLevel3Leaders = ['zero', 'decimal', 'digit', 'extra', 'level3'];
    var validAdvancedLeaders = ['basic', 'level2'];
    var buttons = {
        //zero
        '0': {
            type: 'zero'
        },
        //decimal
        '.': {
            type: 'decimal'
        },
        //digits
        '1': {
            type: 'digit'
        },
        '2': {
            type: 'digit'
        },
        '3': {
            type: 'digit'
        },
        '4': {
            type: 'digit'
        },
        '5': {
            type: 'digit'
        },
        '6': {
            type: 'digit'
        },
        '7': {
            type: 'digit'
        },
        '8': {
            type: 'digit'
        },
        '9': {
            type: 'digit'
        },
        'pi': {
            type: 'extra'
        },
        'e': {
            type: 'extra'
        },
        'i': {
            type: 'extra'
        },
        //basic operations
        '/': {
            type: 'basic'
        },
        '+': {
            type: 'basic'
        },
        '-': {
            type: 'basic'
        },
        '*': {
            type: 'basic'
        },
        '^': {
            type: 'basic'
        },
        ',': {
            type: 'basic'
        },
        //level1 operations
        '!': {
            type: 'level1'
        },
        //level2 operations
        '(': {
            type: 'level2'
        },
        //level3 operations
        ')': {
            type: 'level3'
        },
        //advanced operations
        'sqrt': {
            type: 'advanced'
        },
        '%': {
            text: 'mod',
            type: 'advanced'
        },
        'mod': {
            type: 'advanced'
        },
        'log': {
            text: 'log10',
            type: 'advanced'
        },
        'log10': {
            type: 'advanced'
        },
        'ln': {
            text: 'log',
            type: 'advanced'
        },
        'sin': {
            type: 'advanced'
        },
        'cos': {
            type: 'advanced'
        },
        'tan': {
            type: 'advanced'
        },
        'sinh': {
            type: 'advanced'
        },
        'cosh': {
            type: 'advanced'
        },
        'tanh': {
            type: 'advanced'
        },
        //level0 operations
        '+/-': {
            type: 'level0'
        },
        '1/x': {
            type: 'level0'
        },
        //necessary operations        
        'C': {
            type: 'necessary'
        },
        '<': {
            type: 'necessary'
        },
        '=': {
            type: 'necessary'
        }
    };

    function GetCalculator() {
        var html = '\
                    <div class="flexbox column alignStretch">\
                        <p id="CalculatorText" class="calculatorText" contenteditable="true" onKeyPress="EnterKey(event, this)"></p>\
                        <div class="flexbox row">\
                            <div class="flexbox column alignStretch">\
                                <button id="1/x">1/x</button>\
                                <button id="+/-">+/-</button>\
                                <button id=",">,</button>\
                                <button id="(">(</button>\
                                <button id=")">)</button>\
                            </div>\
                            <div class="flexbox column alignStretch">\
                                <button id="^">^</button>\
                                <button id="ln">ln</button>\
                                <button id="sinh">sinh</button>\
                                <button id="cosh">cosh</button>\
                                <button id="tanh">tanh</button>\
                            </div>\
                            <div class="flexbox column alignStretch">\
                                <button id="sqrt">sqrt</button>\
                                <button id="log">log</button>\
                                <button id="sin">sin</button>\
                                <button id="cos">cos</button>\
                                <button id="tan">tan</button>\
                            </div>\
                            <div class="flexbox column alignStretch">\
                                <button id="%">%</button>\
                                <button id="!">!</button>\
                                <button id="pi">pi</button>\
                                <button id="e">e</button>\
                                <button id="i">i</button>\
                            </div>\
                            <div class="flexbox column alignStretch">\
                                <div class="flex4 flexbox row alignStretch">\
                                    <div class="flexbox column alignStretch">\
                                        <button id="+">+</button>\
                                        <button id="7">7</button>\
                                        <button id="4">4</button>\
                                        <button id="1">1</button>\
                                    </div>\
                                    <div class="flexbox column alignStretch">\
                                        <button id="-">-</button>\
                                        <button id="8">8</button>\
                                        <button id="5">5</button>\
                                        <button id="2">2</button>\
                                    </div>\
                                </div>\
                                <div class="flexbox row alignStretch">\
                                    <button id="0" class="flex2">0</button>\
                                </div>\
                            </div>\
                            <div class="flexbox column alignStretch">\
                                <button id="*">*</button>\
                                <button id="9">9</button>\
                                <button id="6">6</button>\
                                <button id="3">3</button>\
                                <button id=".">.</button>\
                            </div>\
                            <div class="flexbox column alignStretch">\
                                <button id="/">/</button>\
                                <button id="C">C</button>\
                                <button id="<"><</button>\
                                <button id="=" class="flex2">=</button>\
                            </div>\
                        </div>\
                    </div>\
                    ';
        $('#Calculator').html(html);
    }

    function UpdateText(text, add) {
        if (add) {
            var textToAdd = empty;
            if (buttons[text].type === 'zero') {
                textToAdd = InsertZero(text);
            } else if (buttons[text].type === 'decimal') {
                textToAdd = InsertDecimal(text);
            } else if (buttons[text].type === 'digit') {
                textToAdd = InsertDigit(text);
            } else if (buttons[text].type === 'extra') {
                textToAdd = InsertExtra(text);
            } else if (buttons[text].type === 'basic') {
                textToAdd = InsertBasic(text);
            } else if (buttons[text].type === 'level1') {
                textToAdd = InsertLevel1(text);
            } else if (buttons[text].type === 'level2') {
                textToAdd = InsertLevel2(text);
            } else if (buttons[text].type === 'level3') {
                textToAdd = InsertLevel3(text);
            } else if (buttons[text].type === 'advanced') {
                textToAdd = InsertAdvanced(text);
            }
            if (textToAdd !== empty) {
                ops.push(textToAdd);
            }
        } else if (ops.length > 0) {
            ops.pop();
        }
        if (ops.length > 0) {
            $('#CalculatorText').text(ops.join(''));
        } else {
            $('#CalculatorText').text('');
        }
    }

    function InsertZero(text) {
        var validLeader = $.inArray(buttons[ops[ops.length - 1]].type, validZeroLeaders);
        if (validLeader >= 0) {
            return text;
        }
        return empty;
    }

    function InsertDecimal(text) {
        var validLeader = $.inArray(buttons[ops[ops.length - 1]].type, validDecimalLeaders);
        var needsZero = $.inArray(buttons[ops[ops.length - 1]].type, validDecimalLeadersWithZero);
        if (validLeader >= 0) {
            return text;
        }
        if (needsZero >= 0) {
            ops.push('0');
            return text;
        }
        return empty;
    }

    function InsertDigit(text) {
        if (ops.length > 0) {
            var validLeader = $.inArray(buttons[ops[ops.length - 1]].type, validDigitLeaders);
            if (validLeader >= 0) {
                return text;
            }
            return empty;
        }
        return text;
    }

    function InsertExtra(text) {
        if (ops.length > 0) {
            var validLeader = $.inArray(buttons[ops[ops.length - 1]].type, validExtraLeaders);
            if (validLeader >= 0) {
                return text;
            }
            return empty;
        }
        return text;
    }

    function InsertBasic(text) {
        if (buttons[text].text && buttons[text].text !== null) {
            text = buttons[text].text;
        }
        if (ops.length > 0) {
            if (buttons[ops[ops.length - 1]].type === 'decimal') {
                ops.pop();
            }
            var validLeader = $.inArray(buttons[ops[ops.length - 1]].type, validBasicLeaders);
            if (validLeader >= 0) {
                return text;
            }
            return empty;
        }
        return empty;
    }

    function InsertLevel1(text) {
        if (ops.length > 0) {
            if (buttons[ops[ops.length - 1]].type === 'decimal') {
                ops.pop();
            }
            var validLeader = $.inArray(buttons[ops[ops.length - 1]].type, validLevel1Leaders);
            if (validLeader >= 0) {
                return text;
            }
            return empty;
        }
        return empty;
    }

    function InsertLevel2(text) {
        if (ops.length > 0) {
            if (buttons[ops[ops.length - 1]].type === 'decimal') {
                ops.pop();
            }
            var validLeader = $.inArray(buttons[ops[ops.length - 1]].type, validLevel2Leaders);
            if (validLeader >= 0) {
                return text;
            }
            return empty;
        }
        return text;
    }

    function InsertLevel3(text) {
        if (ops.length > 0) {
            if (buttons[ops[ops.length - 1]].type === 'decimal') {
                ops.pop();
            }
            var validLeader = $.inArray(buttons[ops[ops.length - 1]].type, validLevel3Leaders);
            if (validLeader >= 0) {
                return text;
            }
            return empty;
        }
        return empty;
    }

    function InsertAdvanced(text) {
        if (buttons[text].text && buttons[text].text !== null) {
            text = buttons[text].text;
        }
        if (ops.length > 0) {
            var validLeader = $.inArray(buttons[ops[ops.length - 1]].type, validAdvancedLeaders);
            if (validLeader >= 0) {
                ops.push(text);
                return '(';
            }
            return empty;
        }
        ops.push(text);
        return '(';
    }

    function ClearText() {
        ops = [];
        $('#CalculatorText').text('');
    }

    function Invert() {
        if (ops.length > 0) {
            ops.push(')');
            ops.unshift('1', '/', '(');
            $('#CalculatorText').text(ops.join(''));
        }
    }

    function Negate() {
        if (ops.length > 0) {
            ops.push(')');
            ops.unshift('-', '1', '*', '(');
            $('#CalculatorText').text(ops.join(''));
        }
    }

    function AddAnswer(answer) {
        var arr = answer.toString().split("");
        for (var i = 0; i < arr.length; i++) {
            ops.push(arr[i]);
        }
    }

    function GetAllIndexes(arr, val) {
        var indexes = [],
            i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                indexes.push(i);
            }
        }
        return indexes.length;
    }

    function FixBrackets() {
        var leftBrackets = GetAllIndexes(ops, '(');
        var rightBrackets = GetAllIndexes(ops, ')');
        if (leftBrackets > rightBrackets) {
            ops.push(')');
            FixBrackets();
        } else if (rightBrackets > leftBrackets) {
            ops.unshift('(');
            FixBrackets();
        }
    }

    function EvaluateText() {
        FixBrackets();
        $('#CalculatorText').text(ops.join(''));
        //mathjs.org
        var answer;
        try {
            answer = math.eval($('#CalculatorText').text());
            ops = [];
            AddAnswer(answer);
            $('#CalculatorText').text(ops.join(''));
        } catch (e) {
            //do nothing
        }
    }

    function EnterKeyHit() {
        var answer;
        try {
            answer = math.eval($('#CalculatorText').text());
            ops = [];
            AddAnswer(answer);
            $('#CalculatorText').text(ops.join(''));
        } catch (e) {
            //do nothing
        }
    }

    return {
        Init: function() {
            GetCalculator();
            UpdateButtons(buttons, RegisterButtonClick, function(button) {
                return Calculator.OnClick;
            });
        },
        OnClick: function() {
            var id = event.target.id;
            switch (id) {
                case '=':
                    EvaluateText();
                    break;
                case '<':
                    UpdateText('', false);
                    break;
                case 'C':
                    ClearText();
                    break;
                case '+/-':
                    Negate();
                    break;
                case '1/x':
                    Invert();
                    break;
                default:
                    UpdateText(id, true);
                    break;
            }
        },
        Answer: function() {
            EnterKeyHit();
        }
    };
})();
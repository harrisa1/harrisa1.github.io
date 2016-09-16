var Finances = (function() {
    var name = 'Finances';
    var containerClasses = [
        'flexbox', 'column', 'alignCenter'
    ];
    var sheetsURL = 'https://docs.google.com/spreadsheets/d/';
    var sheetID = '1n-6gH28rVQ2dkCzSVgwoxqV3rIfA6Rou4fMkGj_UhdY';
    var sheetURL = sheetsURL + sheetID;
    var buttons = {
        'Budget': {
            gid: '0'
        },
        'Accounts': {
            gid: '2051460691'
        },
        'Expenses': {
            gid: '1496123519',
            image: '0BxRDplunxMIZcGo0SmI3VUhWcTA'
        },
        'Utilities': {
            gid: '1987066953',
            image: '0BxRDplunxMIZMDdvcEV5VzRJX2M'
        },
        'Insurance': {
            gid: '164749290',
            image: '0BxRDplunxMIZTE1UREtfcGpvdEU'
        },
        'Debts': {
            gid: '396222271'
        },
        'Taxes': {
            gid: '354483430'
        },
        'Tax Rate': {
            gid: '1663324892'
        },
        'Assets': {
            gid: '1525886805'
        },
        'Furniture': {
            gid: '1295148257',
            image: '0BxRDplunxMIZcWtFNEJyYnNISVE'
        },
        'Jewelry': {
            gid: '1563014550',
            image: '0BxRDplunxMIZd0hFTkhKSWJmbEk'
        },
        'Electronics': {
            gid: '736964413',
            image: '0BxRDplunxMIZWmQyektUZVdCdHc'
        },
        'Currency': {
            gid: '268614037',
            image: '0BxRDplunxMIZbjRWVnh2V1FSaWs'
        },
        'Coin Collections': {
            gid: '1980886027',
            image: '0BxRDplunxMIZOWVNTFZ0UmRfS00'
        },
        'Foreign Currency': {
            gid: '689492229',
            image: '0BxRDplunxMIZOFRQVkc4RHA2RVU'
        },

    };

    function GetHTML() {
        var html = GetHTMLHeader();
        html += '<iframe id="' + name + 'Sheet"></iframe>';
        $('#' + name + 'Container').html(html);
    }

    function GetHTMLHeader() {
        var html = '\
            <div id="' + name + 'Header" class="flexbox row justifyCenter">\
                <div class="flexbox column alignStretch">\
                    <button id="Budget">Budget</button>\
                    <button id="Tax Rate">Tax Rate</button>\
                </div>\
                <div class="flexbox column alignStretch">\
                    <div class="flexbox row alignStretch justifyCenter">\
                        <div class="flexbox column alignStretch">\
                            <button id="Accounts">Accounts</button>\
                            <div class="flexbox row alignStretch">\
                                <button id="Expenses" title="Expenses">\
                                    <img src="' + host + buttons.Expenses.image + '" alt="Expenses" class="image">\
                                </button>\
                                <button id="Utilities" title="Utilities">\
                                    <img src="' + host + buttons.Utilities.image + '" alt="Utilities" class="image">\
                                </button>\
                                <button id="Insurance" title="Insurance">\
                                    <img src="' + host + buttons.Insurance.image + '" alt="Insurance" class="image">\
                                </button>\
                            </div>\
                        </div>\
                        <div class="flexbox column alignStretch">\
                            <button id="Assets">Assets</button>\
                            <div class="flexbox row alignStretch">\
                                <button id="Furniture" title="Furniture">\
                                    <img src="' + host + buttons.Furniture.image + '" alt="Furniture" class="image">\
                                </button>\
                                <button id="Jewelry" title="Jewelry">\
                                    <img src="' + host + buttons.Jewelry.image + '" alt="Jewelry" class="image">\
                                </button>\
                                <button id="Electronics" title="Electronics">\
                                    <img src="' + host + buttons.Electronics.image + '" alt="Electronics" class="image">\
                                </button>\
                                <button id="Currency" title="Currency">\
                                    <img src="' + host + buttons.Currency.image + '" alt="Currency" class="image">\
                                </button>\
                                <button id="Coin Collections" title="Coin Collections">\
                                    <img src="' + host + buttons['Coin Collections'].image + '" alt="Coin Collections" class="image">\
                                </button>\
                                <button id="Foreign Currency" title="Foreign Currency">\
                                    <img src="' + host + buttons['Foreign Currency'].image + '" alt="Foreign Currency" class="image">\
                                </button>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="flexbox column alignStretch">\
                    <button id="Debts">Debts</button>\
                    <button id="Taxes">Taxes</button>\
                </div>\
            </div>\
            ';
        return html;
    }

    return {
        Init: function() {
            GetHTML();
            SetContainerClasses(name, containerClasses);
            UpdateButtons(buttons, RegisterButtonClick, function(button) {
                return Finances.OnClick;
            });
            var url = sheetURL + '/edit#gid=0&output=embed';
            $('#' + name + 'Sheet').attr('src', url);
            this.Resize();
            $('#Budget').prop("disabled", true);
        },
        OnClick: function() {
            var button = event.target;
            if ($(button).get(0).tagName === 'IMG') {
                button = $(button).parent()[0];
            }
            var id = button.id;
            DisableButton(button, buttons);
            var url = sheetURL + '/edit#gid=' + buttons[id].gid + '&output=embed';
            $('#' + name + 'Sheet').attr('src', url);
        },
        Resize: function() {
            ResizeIFrame(name);
        }
    };
})();
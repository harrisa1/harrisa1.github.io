var Home = (function() {
    var name = 'Home';
    var containerClasses = [
        'home', 'flexbox', 'row', 'alignCenter', 'justifyCenter'
    ];

    function GetHTML() {
        var html = '\
            <div id="' + name + 'Header"></div>\
            <div class="flex1 flexbox column alignCenter justifyCenter">\
                <span id="StockTicker" class="stockTicker">NA</span>\
                <span id="StockShares" class="stockTicker">Unvested Shares: ' + modules[name].unvested_shares + '</span>\
                <span id="UnvestedStockValue" class="stockTicker"></span>\
                <span id="StockShares" class="stockTicker">Vested Shares: ' + modules[name].vested_shares + '</span>\
                <span id="VestedStockValue" class="stockTicker"></span>\
            </div>\
            <svg id="Clock" class="clock flex1" viewBox="0 0 100 100"></svg>\
            <div id="Stopwatch" class="stopwatch flex1 flexbox column alignCenter justifyCenter"></div>\
            ';
        $('#' + name + 'Container').html(html);
    }

    function GetININStock() {
        var path = 'https://finance.google.com/finance/info?client=ig&q=NSDQ:ININ&callback=?';
        $.getJSON(path, function(response) {
            var stockInfo = response[0];
            var text = stockInfo.t + ' ' + parseFloat(stockInfo.l, 10).FormatMoney() + ' ' + stockInfo.c;
            $('#StockTicker').text(text);
            var color = 'black';
            if (stockInfo.c < 0) {
                color = '#ff1a1a';
            } else if (stockInfo.c > 0) {
                color = '#07C700';
            }
            $('#StockTicker').css('color', color);
            var vval = stockInfo.l * modules[name].vested_shares;
            $('#VestedStockValue').text('Vested Value: ' + vval.FormatMoney());
            var uval = stockInfo.l * modules[name].unvested_shares;
            $('#UnvestedStockValue').text('Unvested Value: ' + uval.FormatMoney());
        });
    }

    Number.prototype.FormatMoney = function() {
        var n = this,
            c = 2,
            d = ".",
            t = ",",
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + '$' + (j ? i.substr(0, j) + t : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
            (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    return {
        Init: function() {
            GetHTML();
            SetContainerClasses(name, containerClasses);
            GetININStock();
            Clock.Init();
            Stopwatch.Init();
        },
        OnClick: function() {
            GetININStock();
        }
    };
})();
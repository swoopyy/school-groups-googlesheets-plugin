function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function nameSheet() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var name = ss.getName().split('_')[1];
    ss.renameActiveSheet(name);
}

function numberToR1C1(number) {
    var s = '';
    var digit;
    var n = number;
    while (n > 0) {
        digit = (n - 1) % 26;
        s = String.fromCharCode(65 + digit) + s;
        n = parseInt((n - digit) / 26);
    }
    return s;
}
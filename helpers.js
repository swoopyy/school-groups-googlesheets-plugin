function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function nameSheetAsCurrentYear() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var currentYear = new Date().getFullYear();
    var nextYear = currentYear + 1;
    ss.renameActiveSheet(currentYear + "-" + nextYear);
}
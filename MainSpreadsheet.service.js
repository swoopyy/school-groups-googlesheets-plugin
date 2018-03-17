function MainSpreadsheetService(yearRange) {
    var userProperties = PropertiesService.getUserProperties();
    this.mainSpreadsheetUrl = userProperties.getProperty("main_spreadsheet");
    this.mainSpreadsheet = SpreadsheetApp.openByUrl(this.mainSpreadsheetUrl);
    this.yearRange = yearRange || SpreadsheetApp.getActiveSheet().getName();

    this.getSpreadsheetUrl = function(key) {
        var sheet = this.mainSpreadsheet.getSheetByName(this.yearRange);
        var values = sheet.getDataRange().getValues();
        for (var i = 0; i < values.length; ++i) {
            if (values[i][0] === key) {
                return values[i][1];
            }
        }
    };

    this.getData = function(key) {
        return this.getFirstSheet(key).getDataRange().getValues();
    };

    this.getFirstSheet = function(key) {
        var url = this.getSpreadsheetUrl(key);
        var ss = SpreadsheetApp.openByUrl(url);
        return ss.getSheets()[0];
    }

}
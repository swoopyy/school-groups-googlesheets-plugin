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
        var data = this.getFirstSheet(key).getDataRange().getValues();
        return data.slice(1);
    };

    this.getFirstSheet = function(key) {
        var url = this.getSpreadsheetUrl(key);
        var ss = SpreadsheetApp.openByUrl(url);
        return ss.getSheets()[0];
    };

    this.getSheetByName = function(key, name) {
        var url = this.getSpreadsheetUrl(key);
        var ss = SpreadsheetApp.openByUrl(url);
        return ss.getSheetByName(name);
    };

    this.createSheetIfNotExist = function(key, name) {
        var url = this.getSpreadsheetUrl(key);
        var ss = SpreadsheetApp.openByUrl(url);
        if (!ss.getSheetByName(name)) {
           return ss.insertSheet(name);
        } else {
            ss.getSheetByName(name)
        }
    }
}
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}


function MainSpreadsheetService() {
  var userProperties = PropertiesService.getUserProperties();
  this.mainSpreadsheetUrl = userProperties.getProperty("main_spreadsheet");
  this.mainSpreadsheet = SpreadsheetApp.openByUrl(this.mainSpreadsheetUrl);
  
  this.getSpreadsheetUrl = function(sheetName, key) {
    var sheet = this.mainSpreadsheet.getSheetByName(sheetName);
    var values = sheet.getDataRange().getValues();
    for (var i = 0; i < values.length; ++i) {
      if (values[i][0] === key) {
        return values[i][1];
      }
    }
  };
  
  this.getData = function(sheetName, key) {
    var url = this.getSpreadsheetUrl(sheetName, key);
    Logger.log(url);
    var ss = SpreadsheetApp.openByUrl(url);
    return ss.getSheets()[0].getDataRange().getValues();
  }
  
  this.getTeachersMatrix = function(sheetName) {
    return this.getData(sheetName, "Преподаватели");
  }
  
  this.getClassroomTeachersMatrix = function(sheetName) {
    return this.getData(sheetName, "Классные руководители");
  }
  
  this.getСurriculumsMatrix = function(sheetName) {
    return this.getData(sheetName, "Учебные планы");
  }
  
  this.getIndividualСurriculumsMatrix = function(sheetName) {
    return this.getData(sheetName, "ИУПы");
  }
  
  this.getIndividualCurriculumsUrl = function(yearRange) {
    return this.getSpreadsheetUrl(yearRange, "ИУПы");
  }
  
}
function DisciplinesNamesService(yearRange) {
   var userProperties = PropertiesService.getUserProperties();
    this.mainSpreadsheetUrl = userProperties.getProperty("main_spreadsheet");
    this.ms = SpreadsheetApp.openByUrl(this.mainSpreadsheetUrl);
    this.yearRange = yearRange || SpreadsheetApp.getActiveSheet().getName();

    this.getData = function() {
    
      var sheet = this.ms.getSheetByName('Список предметов'); 
      var out = [];
      
      for (var i = 1; i <= sheet.getLastRow(); i++){
          out.push(sheet.getRange('A' + i).getValue());
      }
        
      return out;
  }
  
}

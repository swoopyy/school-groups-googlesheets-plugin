function curriculumsMenu(newlyCreated) {
    if (newlyCreated) {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var currentYear = new Date().getFullYear();
        var nextYear = currentYear + 1;
        ss.renameActiveSheet(currentYear + "-" + nextYear);    
    }
    
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Плагин ВШЭ")
      .addItem("Добавить учебный план", "addCurriculumMenu")
      .addToUi();
    
  
}

function addCurriculumMenu() {
   var html = HtmlService.createTemplateFromFile('Curriculums')
        .evaluate()
        .setWidth(400);
    SpreadsheetApp.getUi()
        .showSidebar(html);
}

function addCurriculum(profile, classNumber, disciplinesInfo){
   
  
    new CurriculumsService().add(profile, classNumber, disciplinesInfo);
  new CurriculumsService().getData();
  
    
    
}
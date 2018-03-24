function curriculumsMenu(newlyCreated) {
    if (newlyCreated) {
        nameSheet();
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
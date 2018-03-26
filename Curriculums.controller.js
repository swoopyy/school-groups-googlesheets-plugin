function curriculumsMenu(newlyCreated) {
    if (newlyCreated) {
        nameSheet();
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    if(sheet.getLastRow() == 0){
        sheet.appendRow(["Профиль", "Класс", "Предмет", "Кол-во. часов в неделю", "Уровень изучения", "Статус предмета", "Преподаватели"]);
        sheet.getRange('A1:G1').setFontWeight('bold');
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

function handleClick(){
  new CurriculumsService().getObligatory();
}

function addCurriculum(profile, classNumber, disciplinesInfo){
   
    new CurriculumsService().add(profile, classNumber, disciplinesInfo);
     
    
}
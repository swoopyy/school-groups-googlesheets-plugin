function individualCurriculumsMenu(newlyCreated) {
    if (newlyCreated) {
        nameSheet();
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    if(sheet.getLastRow() == 0){
        sheet.appendRow(["ФИО", "Класс", "Буква", "Профиль", "Спорт", "Преподаватели"]);
        sheet.getRange('A1:F1').setFontWeight('bold');
    }
  
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Плагин ВШЭ")
        .addItem("Добавить ИУП", "addICurriculumMenu")
        .addToUi();
}

function addICurriculumMenu() {
    var html = HtmlService.createTemplateFromFile('IndividualCurriculums')
        .evaluate()
        .setWidth(400);
    SpreadsheetApp.getUi()
        .showSidebar(html);
}

function addICurriculum(name, number, letter, curriculum, sport, preferences) {
    new IndividualCurriculumsService().add(name, number, letter, curriculum, sport, preferences);
}




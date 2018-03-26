function individualCurriculumsMenu(newlyCreated) {
    if (newlyCreated) {
        nameSheet();
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    if(sheet.getLastRow() == 0){
        var row = ["ФИО", "Класс", "Буква", "Профиль", "Спорт"];
        var disciplines = getDisciplines();

        for(var i in disciplines){
            row.push(disciplines[i]);
        }

        sheet.appendRow(row);
        sheet.getRange('A1:AH1').setFontWeight('bold');
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

function getDisciplines(){
    return new DisciplinesNamesService().getData();
}

function addICurriculum(name, number, letter, curriculum, sport, preferences) {
    new IndividualCurriculumsService().add(name, number, letter, curriculum, sport, preferences);
}




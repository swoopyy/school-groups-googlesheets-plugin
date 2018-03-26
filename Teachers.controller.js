function teachersMenu(newlyCreated) {
    if (newlyCreated) {
        nameSheet();    
    }
  
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    if(sheet.getLastRow() == 0){
        sheet.appendRow(["ФИО", "E-mail", "Предмет", "Макс.учеников в группе", "Мин.кол-во групп", "Макс.кол-во групп"]);
        sheet.getRange('A1:F1').setFontWeight('bold');
    }
  
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Плагин ВШЭ")
        .addItem("Добавить преподавателя", "addTeacherMenu")
        .addToUi();
}

function addTeacherMenu() {
    var html = HtmlService.createTemplateFromFile('Teachers')
        .evaluate()
        .setWidth(400);
    SpreadsheetApp.getUi()
        .showSidebar(html);
}


function addTeacher(name, email, discipline, maxStudents, minGroups, maxGroups) {
    new TeachersService().add(name, email, discipline, maxStudents, minGroups, maxGroups)
}
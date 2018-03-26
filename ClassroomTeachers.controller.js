function classroomTeachersMenu(newlyCreated) {
    if (newlyCreated) {
        nameSheet();
    }
  
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    if(sheet.getLastRow() == 0){
        sheet.appendRow(["ФИО", "Номер класса", "Буква"]);
        sheet.getRange('A1:С1').setFontWeight('bold');
    }
  
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Плагин ВШЭ")
        .addItem("Добавить классного руководителя", "addСlassroomTeacherMenu")
        .addItem("Отправить email-ы", "sendEmails")
        .addToUi();
}

function addСlassroomTeacherMenu() {
    var html = HtmlService.createTemplateFromFile('ClassroomTeachers')
        .evaluate()
        .setWidth(400);
    SpreadsheetApp.getUi()
        .showSidebar(html);
}

function sendEmails() {
    new ClassroomTeachersService().sendEmails();
}

function addClassroomTeacher(teacher, letter, number) {
    new ClassroomTeachersService().add(teacher, letter, number);
}


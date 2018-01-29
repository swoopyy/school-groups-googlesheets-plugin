function teachersMenu(newlyCreated) {
    if (newlyCreated) {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        if (newlyCreated) {
            var currentYear = new Date().getFullYear();
            var nextYear = currentYear + 1;
            ss.renameActiveSheet("Преподаватели " + currentYear + "-" + nextYear);
        }
    }
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Плагин ВШЭ")
        .addItem("Добавить учителя", "addTeacherMenu")
        .addToUi();
}

function addTeacherMenu() {
    var html = HtmlService.createTemplateFromFile('Teachers')
        .evaluate()
        .setWidth(400);
    SpreadsheetApp.getUi()
        .showSidebar(html);
}

function addTeacher(name, email, discipline, maxStudents) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    sheet.appendRow([name, email, discipline, maxStudents]);
}
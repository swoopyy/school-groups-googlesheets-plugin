function teachersMenu(newlyCreated) {
    if (newlyCreated) {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        if (newlyCreated) {
            var currentYear = new Date().getFullYear();
            var nextYear = currentYear + 1;
            ss.renameActiveSheet(currentYear + "-" + nextYear);
        }
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


function addTeacher(name, email, discipline, maxStudents) {
    new TeachersService().add(name, email, discipline, maxStudents)
}
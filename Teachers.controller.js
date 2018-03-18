function teachersMenu(newlyCreated) {
    if (newlyCreated) {
        nameSheetAsCurrentYear();
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
function classroomTeachersMenu(newlyCreated) {
    if (newlyCreated) {
        nameSheetAsCurrentYear();
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


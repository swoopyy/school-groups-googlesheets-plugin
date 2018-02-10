function classroomTeachersMenu(newlyCreated) {
    if (newlyCreated) {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      if (newlyCreated) {
        var currentYear = new Date().getFullYear();
        var nextYear = currentYear + 1;
        ss.renameActiveSheet("Классные руководители " + currentYear + "-" + nextYear);
      }
    }
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Плагин ВШЭ")
      .addItem("Добавить классного руководителя", "addСlassroomTeacherMenu")
      .addToUi();
}

function addСlassroomTeacherMenu() {
   var html = HtmlService.createTemplateFromFile('ClassroomTeachers')
        .evaluate()
        .setWidth(400);
    SpreadsheetApp.getUi()
        .showSidebar(html);
}

function addClassroomTeacher(teacher, letter, number) {
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var sheet = ss.getSheets()[0];
   sheet.appendRow([teacher, number, letter]);
}
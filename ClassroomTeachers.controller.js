function classroomTeachersMenu(newlyCreated) {
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
  var yearRange = getActiveSheetName();
  var mainspreadsheetService = new MainSpreadsheetService();
  var data = mainspreadsheetService.getClassroomTeachersMatrix(yearRange);
  for (var i = 0; i < data.length; ++i) {
    var emailAddress = getTeacherEmailFromName(data[i][0], yearRange);
    var subject = "ИУПы на " + yearRange + " учебный год";
    var message = "Пожалуйста, заполните ИУПы по ссылке " + mainspreadsheetService.getIndividualCurriculumsUrl(yearRange);
    MailApp.sendEmail(emailAddress, subject, message);
  }
}

function addClassroomTeacher(teacher, letter, number) {
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var sheet = ss.getSheets()[0];
   sheet.appendRow([teacher, number, letter]);
}
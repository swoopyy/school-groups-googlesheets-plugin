function individualCurriculumsMenu(newlyCreated) {
    if (newlyCreated) {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var currentYear = new Date().getFullYear();
      var nextYear = currentYear + 1;
      ss.renameActiveSheet(currentYear + "-" + nextYear);
    }
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Плагин ВШЭ")
      .addItem("Добавить ИУП", "addICurriculum")
      .addItem("Отправить email-ы", "sendEmails")
      .addToUi();
}

function addICurriculum() {
   getTeachersBySubject();
   var html = HtmlService.createTemplateFromFile('IndividualCurriculums')
        .evaluate()
        .setWidth(400);
    SpreadsheetApp.getUi()
        .showSidebar(html);
}


function getTeachersBySubject(subject) {
   var yearRange = getActiveSheetName();
   var mainspreadsheetService = new MainSpreadsheetService();
   var data = mainspreadsheetService.getTeachersMatrix(yearRange);
   var teachers = [];
   for (var i = 0; i < data.length; ++i) {
     if (data[i][2] === subject) {
       teachers.push(data[i][2]);
     }
   }
  return teachers;
}

function addICurriculum() {
  Logger.log("student add dialog");
  
}




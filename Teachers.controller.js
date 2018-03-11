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
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var sheet = ss.getSheets()[0];
   sheet.appendRow([name, email, discipline, maxStudents]);
}

function getAllTeachers(yearRange) {
  var mainspreadsheetService = new MainSpreadsheetService();
  var data = mainspreadsheetService.getTeachersMatrix(yearRange);
  var arr = [];
  for(var i = 0; i < data.length; ++i) {
    arr.push(data[i][0])
  }
  return arr;
}

function getTeacherEmailFromName(name, yearRange) {
  var mainspreadsheetService = new MainSpreadsheetService();
  var data = mainspreadsheetService.getTeachersMatrix(yearRange);
  for(var i = 0; i < data.length; ++i) {
    if (data[i][0] === name) {
      return data[i][1];
    }
  }
}
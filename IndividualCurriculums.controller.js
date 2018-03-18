function individualCurriculumsMenu(newlyCreated) {
    if (newlyCreated) {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var currentYear = new Date().getFullYear();
        var nextYear = currentYear + 1;
        ss.renameActiveSheet(currentYear + "-" + nextYear);
    }
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Плагин ВШЭ")
        .addItem("Добавить ИУП", "addICurriculumMenu")
        .addItem("Отправить email-ы", "sendEmails")
        .addToUi();
}

function addICurriculumMenu() {
    var html = HtmlService.createTemplateFromFile('IndividualCurriculums')
        .evaluate()
        .setWidth(400);
    SpreadsheetApp.getUi()
        .showSidebar(html);
}

function addICurriculum(name, curriculum, sport, teachers) {
    Logger.log(teachers);
    new IndividualCurriculumsService().add(name, curriculum, sport, teachers);
}




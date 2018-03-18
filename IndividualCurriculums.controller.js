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
        .addToUi();
}

function addICurriculumMenu() {
    var html = HtmlService.createTemplateFromFile('IndividualCurriculums')
        .evaluate()
        .setWidth(400);
    SpreadsheetApp.getUi()
        .showSidebar(html);
}

function addICurriculum(name, number, letter, curriculum, sport, teachers) {
    Logger.log(teachers);
    new IndividualCurriculumsService().add(name, number, letter, curriculum, sport, teachers);
}




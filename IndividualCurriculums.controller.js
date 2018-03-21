function individualCurriculumsMenu(newlyCreated) {
    if (newlyCreated) {
        nameSheet();
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

function addICurriculum(name, number, letter, curriculum, sport, preferences) {
    new IndividualCurriculumsService().add(name, number, letter, curriculum, sport, preferences);
}




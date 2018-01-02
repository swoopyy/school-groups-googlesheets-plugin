function onOpen(e) {
    var documentProperties = PropertiesService.getDocumentProperties();
    documentProperties.deleteAllProperties();
    if (documentProperties.getProperty("main_spreadsheet")) {
        mainSpreadsheetMenu(false);
    } else if (documentProperties.getProperty("classroom_teachers")) {
        classroomTeachersMenu(false);
    } else if (documentProperties.getProperty("curriculums")) {
        curriculumsMenu(false);
    } else if (documentProperties.getProperty("teachers")) {
        teachersMenu(false);
    } else if (documentProperties.getProperty("individual_curriculums")) {
        individualCurriculumsMenu(false);
    } else if (documentProperties.getProperty("groups")) {
        groupsMenu(false);
    } else {
        newlyCreatedDoc();
    }
}

function newlyCreatedDoc() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var documentProperties = PropertiesService.getDocumentProperties();
    var name = ss.getName();
    if (name.indexOf("Преподаватели") !== -1) {
        documentProperties.setProperty("teachers", "true");
        teachersMenu(true);
    } else if (name.indexOf("Классные руководители") !== -1) {
        documentProperties.setProperty("classroom_teachers", "true");
        classroomTeachersMenu(true);
    } else if (name.indexOf("Учебные планы") !== -1) {
        documentProperties.setProperty("curriculum", "true");
        curriculumsMenu(true);
    } else if (name.indexOf("Подгруппы") !== -1) {
        documentProperties.setProperty("groups", "true");
        groupsMenu(true);
    } else if (name.indexOf("ИУПы") !== -1) {
        documentProperties.setProperty("individual_curriculums", "true");
        individualCurriculumsMenu(true);
    } else {
        var userProperties = PropertiesService.getUserProperties();
        documentProperties.setProperty("main_spreadsheet", "true");
        userProperties.setProperty("main_spreadsheet", ss.getUrl());
        mainSpreadsheetMenu(true);
    }
}

function onInstall(e) {
    onOpen(e);
}

function mainSpreadsheetMenu(newlyCreated) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (newlyCreated) {
        var currentYear = new Date().getFullYear();
        ss.renameActiveSheet(currentYear + "-" + (currentYear + 1));
    }
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Плагин ВШЭ")
        .addItem("Создать таблицу", "createTableMenuItem")
        .addItem("Создать документы", "createDocsForActiveSheet")
        .addToUi();
}


function createTableMenuItem() {

}

function createDocsForActiveSheet() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    createDocsForSheet(sheet);
}

function createDocsForSheet(sheet) {
    var teachersDoc = openOrCreateDoc("Преподаватели", sheet);
    var classroomTeachersDoc = openOrCreateDoc("Классные руководители", sheet);
    var curriculumsDoc = openOrCreateDoc("Учебные планы", sheet);
    var individualCurriculumsDoc = openOrCreateDoc("ИУПы", sheet);
    var groupsDoc = openOrCreateDoc("Подгруппы", sheet);
    return [teachersDoc, classroomTeachersDoc, curriculumsDoc, individualCurriculumsDoc, groupsDoc];
}

function openOrCreateDoc(name, sheet) {
    var row = findRowByName(name, sheet);
    var url = !!row ? row[1] : null;
    if (!url) {
        var doc = SpreadsheetApp.create(name + "_" + sheet.getName()); // Преподаватели_2018-2019
        url = doc.getUrl();
        sheet.appendRow([name, url, doc.getId()]);
    }
    return SpreadsheetApp.openByUrl(url);
}

function findRowByName(name, sheet) {
    var range = sheet.getDataRange();
    var values = range.getValues();

    for (var i = 0; i < values.length; i++) {
        if (values[i][0]  === name) {
            return values[i];
        }
    }
}

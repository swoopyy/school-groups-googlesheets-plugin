function onOpen(e) {
    var documentProperties = PropertiesService.getDocumentProperties();
    // documentProperties.deleteAllProperties();
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
        documentProperties.setProperty("curriculums", "true");
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
        userProperties.setProperty("main_spreadsheet", ss.getUrl()); //url for main spreadsheat is stored in userProps
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
        
        ss.insertSheet('Названия учебных планов');
        var sheet = ss.getSheetByName('Названия учебных планов');
        for(var i in CURRICULUMS){
            sheet.appendRow([CURRICULUMS[i]]);
        }
      
        ss.insertSheet('Список предметов');
        var sheet = ss.getSheetByName('Список предметов');
        for(var i in getDisciplines()){
            sheet.appendRow([getDisciplines()[i]]);
        }
    }
    
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Плагин ВШЭ")
        .addItem("Создать таблицу", "createSheetMenuItem")
        .addItem("Создать документы", "createDocsForActiveSheet")
        .addItem("Сформировать подгруппы", "createGroups")
        .addToUi();
}


function createSheetMenuItem() {
    var html = HtmlService.createTemplateFromFile('Years.dialog')
        .evaluate()
        .setWidth(500)
        .setHeight(300);
    SpreadsheetApp.getUi()
        .showModalDialog(html, 'Введите учебный год');
}

function createMainSpreadsheetSheet(fromYear, toYear) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.insertSheet(fromYear + '-' + toYear);
}
function createGroups() {
    var ts = new TeachersService();
    var ics = new IndividualCurriculumsService();
    var gs = new GroupsService();
    var cs = new CurriculumsService();

    var teachers = ts.serialize();
    var major_lessons = cs.getObligatory();
    var lessons = ts.serializeLessons();
    var pupils = ics.serialize();

    gs.write(groups(pupils, lessons, major_lessons, teachers));
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
        sheet.appendRow([name, url]);
    }
    return SpreadsheetApp.openByUrl(url);
}

function findRowByName(name, sheet) {
    var range = sheet.getDataRange();
    var values = range.getValues();

    for (var i = 0; i < values.length; i++) {
        if (values[i][0] === name) {
            return values[i];
        }
    }
}

function getActiveSheetName() {
  return SpreadsheetApp.getActiveSheet().getName();
}

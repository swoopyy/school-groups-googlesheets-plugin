function TeachersService(yearRange) {
    this.yearRange = yearRange || SpreadsheetApp.getActiveSheet().getName();
    this.ms = new MainSpreadsheetService(this.yearRange);
    this.key = "Преподаватели";

    this.getMatrix = function() {
        return this.ms.getData(this.key);
    };

    this.getData = function() {
        var matrix = this.getMatrix();
        var out = [];
        for (var i = 0; i < matrix.length; ++i) {
            out.push(Teacher.fromRow(matrix[i]));
        }
        return out;
    };

    this.getSheet = function()  {
        return this.ms.getFirstSheet(this.key);
    };

    this.getUrl = function () {
        return this.ms.getSpreadsheetUrl(this.key);
    };

    this.add = function(name, email, discipline, maxStudents) {
        this.getSheet().appendRow([name, email, discipline, maxStudents]);
    };

    this.getNames = function() {
        var names = [];
        var teachers = this.getData();
        for (var i = 0; i < teachers.length; ++i) {
            names.push(teachers[i].name);
        }
        return names;
    };

    this.getEmailFromName = function(name) {
        var data = this.getData();
        for (var i = 0; i < data.length; ++i) {
            if (data[i].name === name) {
                return data[i].email;
            }
        }
    };

    this.getNamesByDiscipline = function(discipline) {
        var names = [];
        var teachers = this.getData();
        for (var i = 0; i < teachers.length; ++i) {
            if (discipline === teachers[i].discipline) {
                names.push(teachers[i].name);
            }
        }
        return names;
    };
}
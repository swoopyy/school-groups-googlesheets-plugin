function IndividualCurriculumsService(yearRange) {
    this.ms = new MainSpreadsheetService(yearRange);
    this.key = "ИУПы";

    this.getMatrix = function () {
        return this.ms.getData(this.key);
    };

    this.getData = function () {
        var matrix = this.getMatrix();
        var out = [];
        for (var i = 0; i < matrix.length; ++i) {
            out.push(IndividualCurriculum.fromRow(matrix[i], i));
        }
        return out;
    };

    this.getSheet = function () {
        return this.ms.getFirstSheet(this.key);
    };

    this.getUrl = function () {
        return this.ms.getSpreadsheetUrl(this.key);
    };

    this.add = function (name, number, letter, curriculum, sport, teachers) {
        var arr = [name, number, letter, curriculum, sport];
        for (var i = 0; i < getDisciplines().length; ++i) {
            arr.push(teachers[i][1]);
        }
        this.getSheet().appendRow(arr);
    };

    this.serialize = function() {
        out = [];
        var ic = this.getData();
        var ts = new TeachersService();
        for (var i = 0; i < ic.length; ++i) {
            var obj = {
                preferences: [],
                name: ic[i].name,
                gradeName: ic[i].number + ic[i].letter,
                major: ic[i].curriculum
            };
            var prefs = ic[i].preferences;

            for (var j = 0; j < prefs.length; ++j) {
                if (!!prefs[j][1]) {
                    obj.preferences.push({
                        teacherId: ts.getByName(prefs[j][1]).rowId,
                        lessonId: getDisciplines().indexOf(prefs[j][0])
                    });
                }
            }
            out.push(obj);
        }
        return out;
    }
}
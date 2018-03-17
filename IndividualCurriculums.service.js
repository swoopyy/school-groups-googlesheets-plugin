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
            out.push(IndividualCurriculum.fromRow(matrix[i]));
        }
        return out;
    };

    this.getSheet = function () {
        return this.ms.getFirstSheet(this.key);
    };

    this.getUrl = function () {
        return this.ms.getSpreadsheetUrl(this.key);
    };

    this.add = function (teacher, letter, number) {
        this.getSheet().appendRow([teacher, number, letter]);
    };
}
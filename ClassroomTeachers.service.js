function ClassroomTeachersService(yearRange) {
    this.ms = new MainSpreadsheetService(yearRange);
    this.key = "Классные руководители";

    this.getMatrix = function () {
        return this.ms.getData(this.key);
    };

    this.getData = function () {
        var matrix = this.getMatrix();
        var out = [];
        for (var i = 0; i < matrix.length; ++i) {
            out.push(ClassroomTeacher.fromRow(matrix[i], i));
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

    this.sendEmails = function () {
        var data = this.getData();
        for (var i = 0; i < data.length; ++i) {
            var emailAddress = new TeachersService(this.yearRange).getEmailFromName(data[i].name);
            var subject = "ИУПы на " + this.yearRange + " учебный год";
            var message = "Пожалуйста, заполните ИУПы по ссылке " + new IndividualCurriculumsService(this.yearRange).getUrl();
            MailApp.sendEmail(emailAddress, subject, message);
        }
    }
}
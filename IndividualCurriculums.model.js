function IndividualCurriculum(name, number, letter, curriculum, sport, teachers) {
    this.name = name;
    this.number = number;
    this.letter = letter;
    this.curriculum = curriculum;
    this.sport = sport;
    this.russianTeacher = teachers[0];
    this.literatureTeacher = teachers[1];
    this.algebraTeacher = teachers[2];
    this.geometryTeacher = teachers[3];
    this.physicsTeacher = teachers[4];
    this.chemistyTeacher = teachers[5];
    this.biologyTeacher = teachers[6];
    this.historyTeacher = teachers[7];
    this.englishTeacher = teachers[8];
    this.germanTeacher = teachers[9];
    this.sportTeacher = teachers[10];
    this.objTeacher = teachers[11];
    this.informaticsTeacher = teachers[12];
    this.geographyTeacher = teachers[13];
    this.historyTeacher = teachers[14];
    this.projectTeacher = teachers[15]
}

IndividualCurriculum.fromRow = function (row) {
    var name = row[0],
        number = row[1],
        letter = row[2],
        curriculum = row[3],
        sport = row[4];
    var teachers = [];
    for (var i = 5; i < row.length; ++i) {
        teachers.push(row[i]);
    }
    return new IndividualCurriculum(name, number, letter, curriculum, sport, teachers);
};
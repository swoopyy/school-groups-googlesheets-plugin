function IndividualCurriculum(name, number, letter, curriculum, sport, preferences, rowId) {
    this.name = name;
    this.number = number;
    this.letter = letter;
    this.curriculum = curriculum;
    this.sport = sport;
    this.preferences = preferences;
    this.rowId = rowId;
}

IndividualCurriculum.fromRow = function (row, rowId) {
    var name = row[0],
        number = row[1],
        letter = row[2],
        curriculum = row[3],
        sport = row[4];
    var preferences = [];
    for (var i = 5; i < row.length; ++i) {
        preferences.push([getDisciplines()[i - 5], row[i]]);
    }
    return new IndividualCurriculum(name, number, letter, curriculum, sport, preferences, rowId);
};
function ClassroomTeacher(name, letter, number, rowId) {
    this.name = name;
    this.letter = letter;
    this.number = number;
    this.rowId = rowId;

    this.toRow = function () {
        return [this.name, this.letter, this.number];
    }
};

ClassroomTeacher.fromRow = function (row, rowId) {
    return new ClassroomTeacher(row[0], row[1], row[2], rowId);
};
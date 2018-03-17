function ClassroomTeacher(name, letter, number) {
    this.name = name;
    this.letter = letter;
    this.number = number;

    this.toRow = function () {
        return [this.name, this.letter, this.number];
    }
};

ClassroomTeacher.fromRow = function (row) {
    return new ClassroomTeacher(row[0], row[1], row[2]);
};
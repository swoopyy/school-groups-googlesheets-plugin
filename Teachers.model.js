function Teacher(name, email, discipline, maxStudents) {
    this.name = name;
    this.email = email;
    this.discipline = discipline;
    this.maxStudents = maxStudents;

    this.toRow = function () {
        return [name, email, discipline, maxStudents];
    }
};

Teacher.fromRow = function (row) {
    return new Teacher(row[0], row[1], row[2], row[3]);
};
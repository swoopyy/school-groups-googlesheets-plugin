function Teacher(name, email, discipline, maxStudents, minGroups, maxGroups, rowId) {
    this.name = name;
    this.email = email;
    this.discipline = discipline;
    this.maxStudents = maxStudents;
    this.minGroups = minGroups;
    this.maxGroups = maxGroups;
    this.rowId = rowId;
    this.toRow = function () {
        return [name, email, discipline, maxStudents, minGroups, maxGroups];
    }
};

Teacher.fromRow = function (row, rowId) {
    return new Teacher(row[0], row[1], row[2], row[3], row[4], row[5], rowId);
};
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
            out.push(Teacher.fromRow(matrix[i], i));
        }
        return out;
    };

    this.getSheet = function()  {
        return this.ms.getFirstSheet(this.key);
    };

    this.getUrl = function () {
        return this.ms.getSpreadsheetUrl(this.key);
    };

    this.add = function(name, email, discipline, maxStudents, minGroups, maxGroups) {
        this.getSheet().appendRow([name, email, discipline, maxStudents, minGroups, maxGroups]);
    };

    this.getByName = function(name) {
        var teachers = this.getData();
        for(var i = 0; i < teachers.length; ++i) {
            if (teachers[i].name === name) {
                return teachers[i];
            }
        }
        Logger.log("not found");
        Logger.log(name);
    };

    this.getTeachersByDiscipline = function(discipline) {
        var out = [];
        var teachers = this.getData();
        for(var i = 0; i < teachers.length; ++i) {
            if (teachers[i].discipline === discipline) {
                out.push(teachers[i]);
            }
        }
        return out;
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

    this.serialize = function() {
        var out = [];
        var data = this.getData();
        for (var i = 0; i < data.length; ++i) {
            out.push({
                maxGroups: data[i].maxGroups,
                teacherId: i,
                teacherName: data[i].name,
                minGroups: data[i].minGroups
            })
        }
        return out;
    };

    this.serializeLessons = function() {
        var out = [];
        for (var i = 0; i < DISCIPLINES_LIST.length; ++i) {
            var obj = {
                teacherIds: [],
                lessonName: DISCIPLINES_LIST[i],
                lessonId: i
            };
            var teachers = this.getTeachersByDiscipline(DISCIPLINES_LIST[i]);
            if (teachers.length !== 0) {
                obj.groupMaxPupils = teachers[0].maxStudents;
                obj.groupMinPupils = 0;
                for (var j = 0; j < teachers.length; ++j) {
                    obj.teacherIds.push(teachers[j].rowId);
                }
                out.push(obj);
            }
        }
        return out;
    }
}
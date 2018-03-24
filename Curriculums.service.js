function CurriculumsService(yearRange) {
    this.yearRange = yearRange || SpreadsheetApp.getActiveSheet().getName();
    this.ms = new MainSpreadsheetService(this.yearRange);
    this.key = "Учебные планы";

    this.getMatrix = function() {
        return this.ms.getData(this.key);
    };

    this.getData = function() {
      console.log("get data epta");
        var matrix = this.getMatrix();
        var data = [];
        
      //заполняем профили
        for (var i = 0; i < matrix.length; ++i) {
          if(matrix[i][0] !== ""){
            
            if((i>0 || i== matrix.length -1) && data.length > 0){
              data[data.length -1].finish = i;
            }
            
            data.push({
              "name": matrix[i][0],
              "classNumber": matrix[i][1],
              "start": i
            });       
            
           
            
          }
          
        }      
        
      console.log("disciplines", data);
      //заполняем дисциплины
          for (var i=0; i<data.length; i++){
            
            var s = data[i].start;
            var f = data[i].finish;
            
            data[i].disciplines = [];
            
            for(var j = s; j<f; j++){
             
              if(matrix[j][2] !== ""){
                
                if((j>s || j == f-1) && data[i].disciplines.length > 0){
                  data[i].disciplines[data[i].disciplines.length-1].finish = j;
                }
                
                data[i].disciplines.push({
                  name: matrix[j][2],
                  start: i
                });
                
            
              } 
            }
            
            
            
              var disciplines = data[i].disciplines;
              for(var j in disciplines) {
                var sd = disciplines[j].start;
                var fd = disciplines[j].finish; 
                
                disciplines[j].hours = matrix[sd][3];
                disciplines[j].mode = matrix[sd][4];
                disciplines[j].status = matrix[sd][5];
              
              //заполняем преподавателей
                disciplines[j].teachers = [];
                for(var k=sd; k<fd; k++){
                  disciplines[j].teachers.push(matrix[k][6]);                
                }
                
              }
            
          }
      
       console.log('DATA', data[11]);
       console.log("DISCIPLINES", data[11].disciplines);
          
          
      
        
        return data;
    };

    this.getSheet = function()  {
        return this.ms.getFirstSheet(this.key);
    };

    this.getUrl = function () {
        return this.ms.getSpreadsheetUrl(this.key);
    };

    this.add = function(profile, classNumber, disciplinesInfo) {
        this.getSheet().appendRow([profile, classNumber]);
        console.log("LAST ROW", this.getSheet().getLastRow());
        
        var c = this.getSheet().getLastRow();
        
        var startCell = c;
        for(var i in disciplinesInfo){
            var discipline = disciplinesInfo[i];
            
            var range = 
            this.getSheet().getRange('C' + c + ':F' + c).setValues([[discipline.name,discipline.hours, discipline.mode, discipline.status]]);
            this.getSheet().getRange('C' + c + ':C' + (c + discipline.teachers.length - 1)).merge();
            this.getSheet().getRange('D' + c + ':D' + (c + discipline.teachers.length - 1)).merge();
            this.getSheet().getRange('E' + c + ':E' + (c + discipline.teachers.length - 1)).merge();
            this.getSheet().getRange('F' + c + ':F' + (c + discipline.teachers.length - 1)).merge();
          
            for(var j in discipline.teachers){
                this.getSheet().getRange('G' + c).setValue([discipline.teachers[j]]);
                c++;
            }
        }
        this.getSheet().getRange('A' + startCell + ':A' + (c-1)).merge();
        this.getSheet().getRange('B' + startCell + ':B' + (c-1)).merge();
       
    };
  
    this.getMandatoryDisciplines = function() {
        var mandatoryDisciplines
    }

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
}
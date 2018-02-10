var arr_slice = function(arr,field,unique,sort) {
  // gathers all "field" from arr to separate list [arr[0]["field"],arr[1]["field"],...]
  var ret = []
  if (unique) {
     for (i = 0; i != arr.length; ++i) {
      val = arr[i][field]
      if (ret.indexOf(val) == -1) {
        ret.push(val)
      }
    }
  } else {
    for (i = 0; i != arr.length; ++i) {
      ret.push(arr[i][field])
    }
  }
  if (sort) {
    ret.sort()
  }
  return ret
}

var get_pupils_by_grade_name = function( pupils, grade_name ) {
  
}

var get_lesson_by_id = function( lessons, lesson_id ) { 
//  Logger.log("Getting lesson by id "+lesson_id)
  for (i = 0; i != lessons.length; ++i) {
//    Logger.log(lessons[i]["lessonId"])
    if (lessons[i]["lessonId"] == lesson_id) {
      return lessons[i]
    }
  }
}

var get_teacher_by_id = function( teachers, teacher_id ) {
  for (i = 0; i != lessons.length; ++i) {
    if (teachers[i]["teacherId"] == teacher_id) {
      return teachers[i]
    }
  }
}

function groups(pupils, lessons, major_lessons, teachers) {

  // TODO - функция должна возвращать объект, с инфой по подгруппам (структуру объекта надо продумать)
  Logger.log("Hello boiz");
  
  
  // Create output data to fill
  groups_output = []
  
  // for each grade name
  arr_slice(pupils,"gradeName",true,true).forEach( function(gradeName) {
    
    // Create grade data
    grade_data = {}
    grade_data["gradeName"] = gradeName
    grade_data["lessons"] = []
    
    // For each major
    for (var majorName in major_lessons[gradeName]) {

      // for each lesson in current major
      for ( var lessonId in major_lessons[gradeName][majorName] ) {
        // add to lessons of current grade if not already there
        if ( grade_data["lessons"].indexOf(lessonId) == -1 ) {
          
          Logger.log("get lesson by id "+lessonId)
          lesson = get_lesson_by_id(lessons,lessonId)
          Logger.log( lesson )
          if (lesson) {
            grade_data["lessons"].push( lesson["lessonName"] )
          }
        }
      }
    }
    
    groups_output.push( grade_data )
  });                         
  
  Logger.log( groups_output );
}

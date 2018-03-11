function force_push1(d,k1,item) {
  // Push item to list at specific key at dictionary
	if (!(k1 in d)) {
    	d[k1] = []
    }
    d[k1].push(item)
}

function force_push2(d,k1,k2,item) {
	if (!(k1 in d)) {
    	d[k1] = {}
    }
    force_push1(d[k1],k2,item)
}

function force_push3(d,k1,k2,k3,item) {
	if (!(k1 in d)) {
    	d[k1] = {}
    }
    force_push2(d[k1],k2,k3,item)
}

function force_push4(d,k1,k2,k3,k4,item) {
	if (!(k1 in d)) {
    	d[k1] = {}
    }
    force_push3(d[k1],k2,k3,k4,item)
}

function arr_slice(arr,field,unique,sort) {
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

function get_lesson_by_id( lessons, lesson_id ) { 
//  Logger.log("Getting lesson by id "+lesson_id)
  for (i = 0; i != lessons.length; ++i) {
//    Logger.log(lessons[i]["lessonId"])
    if (lessons[i]["lessonId"] == lesson_id) {
      return lessons[i]
    }
  }
}

function get_teacher_by_id( teachers, teacher_id ) {
  for (i = 0; i != lessons.length; ++i) {
    if (teachers[i]["teacherId"] == teacher_id) {
      return teachers[i]
    }
  }
}

function get_major_lessons(pupil,major_lessons) {
	// Get major lessons for specific pupil
	pupil_major_lessons = major_lessons[pupil['gradeName']][pupil['major']]
	return pupil_major_lessons
}

function get_lessons( pupil, major_lessons ) {
  // Get all lessons for specific pupil
  lessons = []
  prefs = pupil["preferences"]
  for (var pref_id in prefs) {
  	t_id = prefs[pref_id]["teacherId"]
    // avoid duplicates
   	if (!(t_id in lessons)) {
  		lessons.push(t_id)
    }
  }
  
  // Add major lessons to pupil lesson list
  pupil_major_lessons = get_major_lessons( pupil, major_lessons ) 
  for ( var l_id in pupil_major_lessons) {
  	t_id = pupil_major_lessons[l_id]
    // avoid duplicates
   	if (!(t_id in lessons)) {
  		lessons.push(t_id)
    }
  }
  
  return lessons
}

function parse_grade_num(str) {
	return parseInt( str.replace(/[^0-9]/i,'') )
}

function get_grade_num(pupil) {
	return parse_grade_num(pupil["gradeName"])
}


function get_lesson_teachers(lesson_id, lessons) {
	return get_lesson_by_id(lessons, lesson_id)['teacherIds']
}

function get_teachers(pupil, lesson_id, major_lessons, lessons) {
	// Get child-specified teachers
	teachers = []
    
    prefs = pupil['preferences']
    
    for (var pref_i in prefs) {
	    if (prefs[pref_i]['lessonId'] == lesson_id) {
        	t_id = prefs[pref_i]['teacherId']
            
            // skip if t_id is not defined
            if (t_id) {
        		teachers.push(t_id)
            }
        }
	}
    
    // looks like it's a major or teacher is not specified
    if (teachers.length == 0) {
    	//major_lessons = get_major_lessons(pupil, major_lessons)
        //println(get_lesson_by_id(lessons, lesson_id))
        teachers = get_lesson_teachers(lesson_id,lessons)
    }
    
    return teachers
}


function put_record(group_data, pupil, grade_num, lesson_id, teacher_ids ) {
	pupil_data = {
    	"name" : pupil["name"],
        "gradeName" : pupil["gradeName"],
        "major" : pupil["major"]
    }
    
    // TODO: improve teacher assignment algorithm
    
    // by now: select random teacher of specified
    t_id = teacher_ids[ Math.floor( Math.random()*teacher_ids.length ) ]
    
    // by default, put to the 0-th group
    group_id = 0
    
    force_push4( group_data, grade_num, lesson_id, t_id, group_id, pupil_data )
}

function put_pupil(group_data, pupil,lessons,major_lessons, teachers) {

        pupil_name = pupil["name"]
        pupil_grade_name = pupil["gradeName"]
        pupil_grade_num = get_grade_num(pupil)
        pupil_lessons = get_lessons(pupil,major_lessons)
        
    	//println("Name: "+pupil_name)
        //println("Grade number: "+pupil_grade_num )
        //println("Grade name: "+pupil_grade_name )
        for (var i in pupil_lessons) {
        	lesson_id = pupil_lessons[i]
        	//print("Lesson ")
        	//println(lesson_id+" teachers:")
            teacher_ids = get_teachers(pupil,lesson_id,major_lessons,lessons)
            put_record(group_data, pupil, pupil_grade_num, lesson_id, teacher_ids )
            for (var teacher_i in teacher_ids) {
            	teacher_id = teacher_ids[teacher_i]
                //print(teacher_id+", ")
            }
            //println('')
        }
        //println('')
        //println('')
        
}

function groups(pupils, lessons, major_lessons, teachers) {

	group_data = {}
    
	for (var pupil_id in pupils) {
    	// Put info about pupil into groups data
    	put_pupil(group_data, pupils[pupil_id], lessons, major_lessons, teachers )
    }
  
  // TODO: emplement splitting large groups to smaller ones
  // Also, since pupils are assigned to random teachers, shit may happen
    
    Logger.log(group_data)
    // return group data to be used later in code
    return group_data
}


function generate_report(group_data, grade_name) {
  // TODO:
  // Write function for report generation based on group_data
}

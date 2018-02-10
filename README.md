# school-groups-googlesheets-plugin

# Test data description
```javascript
function groups( pupils, lessons, major_lessons, teachers ) {
...
	return groups;
}
```
## Input
### Pupils
```json
pupils = [pupil1, pupil2, ..., pupil_n];
pupil_i = {
	"name" : "Valentin Belov",
	"gradeName" : "11a",
	"major" : "chemistry",
	"preferences" : {pref1, pref2, ..., pref_n}
}

pref_i = { 
	"lessonId" : 0,
	"teacherId" : 0,
}
```
### Lessons
```json
lessons = [lesson1, lesson2, ..., lesson_n]
lesson_i = {
	"lessonId" : 0,
	"lessonName" : "math",
	"teacherIds" : [teacherId1, teacherId2, ..., teacherId_n],
	// Extended features
	"groupMaxPupils" : 30,
	"groupMinPupils" : 10,
}
```

### Major lessons
```json
major_lessons = {
	grade_name1 : {
		major1 : [ lessonId1, lessonId2, ..., lessonId_n],
		major2 : [ lessonId1, lessonId2, ..., lessonId_n],
		...
		major_n : []
	}
	grade_name2 : { major1:[...], ..., major_n:[...] },
	...
	grade_name_n : {...},
}
```

### Teachers
```json
teachers = [teacher1,teacher2, teacher3, ..., teacher_n]
teacher_i = {
	"teacherId" : 0,
	"teacherName" : "Natalia Belova",
	// Extended features
	"maxGroups" : 10,
	"minGroups" : 5,
}
```
## Output  - ???
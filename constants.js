var DISCIPLINES_LIST = [
    "Русский язык",
    "Литература",
    "Алгебра и нач. матанализа",
    "Геометрия",
    "Физика",
    "Химия",
    "Биология",
    "История",
    "Английский",
    "Немецкий",
    "Физкультура",
    "ОБЖ",
    "Информатика и ИКТ",
    "География",
    "История",
    "Индивидуальный проект"
];

var CURRICULUMS = [
   "Физико-математический",
   "Химико-биологический",
   "Информатический",
   "Инженерный",
   "Гуманитарный"
];

var SPORTS = [
   "Шахматы",
   "Баскетбол",
   "Волейбол"
];

var MAX_STUDENTS = [15, 30];

var CLASS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

var HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var DISCIPLINE_MODE = [ "базовый", "углубленный" ];

var DISCIPLINE_STATUS = [ "Обязательный", "Обязательный по выбору", "Дополнительный по выбору" ];

var CLASS_LETTERS = [
  'A', 
  'Б', 
  'В', 
  'Г', 
  'Д', 
  'E', 
  'Ж', 
  'З', 
  'И', 
  'К', 
  'Л', 
  'М', 
  'Н', 
  'О', 
  'П', 
  'Р', 
  'С', 
  'Т', 
  'У', 
  'Ф', 
  'Х', 
  'Ш',
  'Э', 
  'Ю', 
  'Я'
];

function getDisciplines() {
    return DISCIPLINES_LIST;
}

function getDisciplineId(disp) {
    for(var i = 0; i < DISCIPLINES_LIST.length; ++i) {
        if (DISCIPLINES_LIST[i] === disp) {
            return i;
        }
    }
}
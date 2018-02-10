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

function groups(pupils, lessons, major_lessons, teachers) {

  // TODO - функция должна возвращать объект, с инфой по подгруппам (структуру объекта надо продумать)
  Logger.log("Hello boiz");
  
  
  // Create output data to fill
  groups_output = {}
  arr_slice(pupils,"gradeName",true,true).forEach( function(elem) {
    groups_output[elem] = {}
  });                         
  
  Logger.log( groups_output );
}

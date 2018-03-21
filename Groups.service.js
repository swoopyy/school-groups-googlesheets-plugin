function GroupsService(yearRange) {
    this.ms = new MainSpreadsheetService(yearRange);
    this.key = "Подгруппы";

    this.getSheet = function () {
        return this.ms.getFirstSheet(this.key);
    };

    this.getUrl = function () {
        return this.ms.getSpreadsheetUrl(this.key);
    };

   function countLeafs(obj) {
        var out = 0;
        if (Array.isArray(obj) || !obj) {
            return 1;
        }
        for(var key in obj) {
            if (typeof obj[key] === "object") {
                out += countLeafs(obj[key]);
            }
        }
        return out;
    }

    function rec(obj, sheet, depth, from) {
       var head = from;
       if (Array.isArray(obj) || !obj) {
         var col = numberToR1C1(head);
         for (var i = 0; i < obj.length; ++i) {
           sheet.getRange(col + (depth + i)).setValue(obj[i].name);
         }
       } else {
        for (var key in obj) {
          var child = obj[key];
          var leafsCount = countLeafs(child);
          var left = numberToR1C1(head) + depth;
          var right = numberToR1C1(head + leafsCount - 1) + depth;
          sheet.getRange(left).setValue(key);
          sheet.getRange(left + ':' + right).merge();
          rec(child, sheet, depth + 1, head);
          head += leafsCount + 1;
         }
       }
    }

    this.write = function(data) {
      for (var i = 1; i < 12; ++i) {
          var sheet = this.ms.createSheetIfNotExist(this.key, i + " класс");
          if (i in data) {
              rec(data[i], sheet, 1, 1);
          }
      }
    };
}
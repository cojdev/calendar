interface DateObject {
  day: number,
  month: number,
  year: number
}

// Converts date from a 'yyyy-mm-dd' string to an object {day: dd, month: mm, year: yyyy}
function _parseDate(str: string): DateObject {
  var arr = str.split('-');
  return {
    day: parseInt(arr[2], 10),
    // convert month to 0-11 format
    month: parseInt(arr[1], 10) - 1,
    year: parseInt(arr[0], 10)
  };
}

function _ordinalSuffix(num: number): string {
  var suffixes = ['st', 'nd', 'rd', 'th'];
  if (num % 100 < 10 || num % 100 > 13) {
    switch (num % 10) {
      case 1:
        return suffixes[0];
      case 2:
        return suffixes[1];
      case 3:
        return suffixes[2];
      default:
        return suffixes[3];
    }
  } else {
    return suffixes[3];
  }
}

/**
 * Convert from date object to 12th August, 2019 format
 * @param {DateObject} obj Date object {day, month, year}
 */
function _formatDate(obj: DateObject): string {
  var dateObject = new Date(obj.year, obj.month, obj.day);
  return cal.weekdays[dateObject.getDay()] + " " + obj.day + _ordinalSuffix(obj.day) + " " + cal.months[obj.month] + ", " + obj.year;
}

/**
 * Convert from date object to 2019-08-12
 * @param {DateObject} obj Date object {day, month, year}
 */
function _formatDateInput(obj: DateObject): string {
  return obj.year + "-" + (obj.month + 1) + "-" + (obj.day < 10 ? "0" + obj.day : obj.day);
}

/**
 * Check if the supplied date occurred before today
 * @param {DateObject} obj 
 */
function _isPast(obj: DateObject): boolean {
  var today = {
    day: (new Date()).getDate(),
    month: (new Date()).getMonth(),
    year: (new Date()).getFullYear()
  };

  return (new Date(obj.year, obj.month, obj.day)).getTime() < (new Date(today.year, today.month, today.day)).getTime() ? true : false;
}
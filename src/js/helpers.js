import cal from './cal';

/**
 * Converts date from a 'yyyy-mm-dd' string to an object {day: dd, month: mm, year: yyyy}
 * @param {string} str sql date string
 * @returns {object} {day: dd, month: mm, year: yyyy}
 */
export function parseDate(str) {
  const arr = str.split(' ')[0].split('-');
  return {
    day: parseInt(arr[2], 10),
    // convert month to 0-11 format
    month: parseInt(arr[1], 10) - 1,
    year: parseInt(arr[0], 10),
  };
}

/**
 * Return the 2 letter ordinal suffix
 * @param {number} num number
 */
export function ordinalSuffix(num) {
  const suffixes = ['st', 'nd', 'rd', 'th'];
  let key = 3;

  if (num % 100 < 10 || num % 100 > 13) {
    const key2 = (num % 10) - 1;
    key = Math.min(key2 >= 0 ? key2 : 3, 3);
  }

  return suffixes[key];
}

/**
 * Convert from date object to 12th August, 2019 format
 * @param {DateObject} obj Date object {day, month, year}
 */
export function formatDate(obj) {
  const dateObject = new Date(obj.year, obj.month, obj.day);
  return `${cal.days[dateObject.getDay()].substr(0, 3)} ${obj.day}${ordinalSuffix(obj.day)} ${cal.months[obj.month].substr(0, 3)}, ${obj.year}`;
}

/**
 * Convert from date object to 2019-08-12
 * @param {DateObject} obj Date object {day, month, year}
 */
export function formatDateInput(obj) {
  return `${obj.year}-${obj.month + 1}-${obj.day < 10 ? `0${obj.day}` : obj.day}`;
}

/**
 * Check if the supplied date occurred before today
 * @param {DateObject} obj
 */
export function isPast(obj) {
  const today = {
    day: (new Date()).getDate(),
    month: (new Date()).getMonth(),
    year: (new Date()).getFullYear(),
  };

  const objTime = (new Date(obj.year, obj.month, obj.day)).getTime();
  const todayTime = (new Date(today.year, today.month, today.day)).getTime();

  return objTime < todayTime;
}


export function ajax(url, method, requestBody = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        // Success!
        resolve({
          raw: xhr.responseText,
          parsed: JSON.parse(xhr.responseText),
        });
      } else {
        // We reached our target server, but it returned an error
        reject({
          raw: xhr.responseText,
          parsed: JSON.parse(xhr.responseText),
        });
      }
    };

    xhr.open(method, url);
    if (requestBody) {
      console.log(requestBody);
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.send(JSON.stringify(requestBody));
  });
}

/* eslint-disable no-unused-vars */
function ajax(url, method, requestBody = null) {
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


    console.log(method);

    if (['POST', 'PATCH'].includes(method)) {
      console.log(method);
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.send(JSON.stringify(requestBody));
  });
}

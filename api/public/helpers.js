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
    
    // if (method === 'POST') {
      xhr.setRequestHeader("Content-Type", "application/json");
    // }

    xhr.send(JSON.stringify(requestBody));
  });
}
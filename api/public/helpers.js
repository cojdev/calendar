function ajax(url, method, requestBody = null) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.onload = () => {
      if (req.status >= 200 && req.status < 400) {
        // Success!
        resolve(req.responseText);
      } else {
        // We reached our target server, but it returned an error
        reject(req.responseText);
      }
    };

    req.open(method, url);
    
    if (method === 'POST') {
      req.setRequestHeader("Content-Type", "application/json");
    }

    req.send(JSON.stringify(requestBody));
  });
}
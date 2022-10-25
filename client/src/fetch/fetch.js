const fetchLogin = (email, username) => {
  fetch("http://localhost:3001/", {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, username})
  })
  .then(res => {
    return res.json();
  })
  .then(res => {
    console.log("RESULT", res)
  })
  .catch(err => {
    console.error("ERROR", err)
  })
}

const fetchSetToken = (email, username) => {
  fetch(`http://localhost:3001/api/token/${email}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, username})
  })
  .then(res => {
    if (res) return true;
  })
  .catch(err => console.error("SET ERROR", err))
}

export {fetchLogin, fetchSetToken};
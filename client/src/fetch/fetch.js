const fetchLogin = (email) => {
  fetch("http://localhost:3001/", {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
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

const fetchSet = (email) => {
  fetch("http://localhost:3001/api/post/user/authenticate/set", {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  })
  .catch(err => console.error("SET ERROR", err))
}

export {fetchLogin, fetchSet};
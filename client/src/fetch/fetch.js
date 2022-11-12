const fetchSetToken = (email, username) => {
  return fetch(`http://localhost:3001/api/login/${email}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, username })
  })
};

const fetchAuth = (token) => {
  return fetch(`http://localhost:3001/api/auth/${token}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
};

const fetchMap = () => {
  return fetch(`http://localhost:3001/api/map/`, {
    method: "POST",
    header: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
}


export { fetchSetToken, fetchAuth, fetchMap };
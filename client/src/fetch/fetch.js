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

export { fetchSetToken };
const fetchSetToken = (email, username) => {
  fetch(`http://localhost:3001/api/login/${email}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, username })
  })
    .then(res => {
        console.log(res)
      //   return
      
      // if (res) {
        // res.redirected("/main")
        // res.writeHead(301, {
        //   Location: "/main"
        // })
        // return true;

      // }
    })
    .catch(err => console.error("SET ERROR", err));
};

export { fetchSetToken };
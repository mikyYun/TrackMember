
const Main = ({cookie}) => {
  const queryParams = new URLSearchParams(window.location.search)
  // When Main component rendering, check params for userInfo 
  // If no params, check cookies

  console.log(queryParams.get("user"))
  const userInfo = cookie.get("TrackOwner");
  console.log("UER", userInfo)
  return (
    <div>
      MAIN
    </div>
  )
}

export default Main;
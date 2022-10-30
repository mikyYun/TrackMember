const Main = ({cookie}) => {
  const userInfo = cookie.get("TrackOwner");
  console.log("UER", userInfo)
  return (
    <div>
      MAIN
    </div>
  )
}

export default Main;
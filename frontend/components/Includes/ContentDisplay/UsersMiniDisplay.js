import UserMiniProfileDisplay from "../UserProfileDisplay/UserMiniProfileDisplay"

export default function UsersMiniDisplay(props) {
    console.log('the users mini display page',props)
      return (
        <div>
            {props.users.map((user,index) => {
                const thisIsMyAccount= props.loggedInUser.user.id === user.id
                if(user.status !== "published"){
                   return null
                }
                return <UserMiniProfileDisplay key={index}  user={user} loggedInUser={props.loggedInUser} thisIsMyAccount={thisIsMyAccount}/>
            })}
        </div>
      )
}
import { SignedIn, UserButton, SignInButton, SignedOut } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const  ProfileAvatar = () =>{
    const {user,isLoaded} = useUser();
    return(
        <div>
            <div>{UserButton}</div>
            <div></div>
        </div>
    )
}

export default ProfileAvatar;
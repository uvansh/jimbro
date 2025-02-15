import {auth, currentUser} from '@clerk/nextjs/server'
export default async function Home() {
  const { userId } = await auth()
  const user = await currentUser()
  if (!userId) {
    return <div>Sign in to view this page</div>
  }

  // Protect the route by checking if the user is signed in

  // Get the Backend API User object when you need access to the user's information
  // Use `user` to render user details or create UI elements
  return (
    <div className="font-bold text-2xl text-neutral-100">
      Welcome, <span className='text-red-400'>{user.firstName}!</span> 
    </div>
    )
}
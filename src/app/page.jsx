import {auth, currentUser} from '@clerk/nextjs/server'
import {Card,CardDescription,CardContent,CardHeader,CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { BrainCircuit, SeparatorHorizontal } from 'lucide-react';
import Image from 'next/image';
export default async function Home() {
  const { userId } = await auth()
  const user = await currentUser()
  const lastDayOfYear = new Date(new Date().getFullYear(),11,31);
  const currentDayOfYear = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
  const DaysLeft = Math.ceil((lastDayOfYear - currentDayOfYear) / (1000 * 60 * 60 * 24));

  if (!userId) {
    return <div>Sign in to view this page</div>
  }

  const cards = [
    {
      id:1,
      title:"Routine",
      description:"Manage your routine",
      link:"https://theenterpriseworld.com/wp-content/uploads/2024/10/1-Boost-Your-Fitness-With-the-Trending-4-2-1-Workout-Plan.jpg",
      url:'/routine'
    },
    {
      id:2,
      title:"Workout",
      description:"Plan your workout",
      link:"https://t4.ftcdn.net/jpg/03/03/27/83/360_F_303278340_KmeegCDEhkLAgTwJah69wQ2nXjHwmFnw.jpg",
      url:'/workout'
    },
    {
      id:3,
      title:"Progress",
      description:"View your progress",
      link:"https://image1.masterfile.com/getImage/NjQ5LTAzNDE3NjkzZW4uMDAwMDAwMDA=AA$cm3/649-03417693en_Masterfile.jpg",
      url:'/progress'
    },
  ]
  // Protect the route by checking if the user is signed in

  // Get the Backend API User object when you need access to the user's information
  // Use `user` to render user details or create UI elements
  return (
    <div className="font-bold text-2xl text-neutral-100">
      Welcome, <span className='text-red-400'>{user.firstName}!</span> 
      <div className="flex w-full shadow-lg justify-center bg-black rounded-lg p-2 mt-5 text-white">You have <span className="text-red-400 px-1">{DaysLeft}</span> days left</div>
      <div className='container mx-auto flex justify-center'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 w-full mt-10'>
          {cards.map((card)=>(
            <Card key={card.id}>
            <CardHeader>
              <CardTitle className="font-bold">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img className='w-full h-full rounded-lg' src={card.link}/>
            </CardContent>
            <CardContent>
              <Button><a href={card.url}>View</a></Button>
            </CardContent>
          </Card>
          ))}
        </div>
      </div>
      <a href="/ask-ai"><Button variant="outline" className="text-black absolute bottom-3 right-6"><BrainCircuit/> Ask AI</Button></a>
    </div>
    )
}
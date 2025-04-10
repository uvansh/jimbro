import {Card,CardDescription,CardContent,CardHeader,CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import {currentUser} from '@clerk/nextjs/server'

export default async function Home() {
  const lastDayOfYear = new Date(new Date().getFullYear(),11,31);
  const currentDayOfYear = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
  const DaysLeft = Math.ceil((lastDayOfYear - currentDayOfYear) / (1000 * 60 * 60 * 24));
  
  const user = await currentUser()
  
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
    <div className="font-bold relative  text-2xl text-neutral-100 ">
      <h1 className='text-3xl'>Welcome, <span className='text-green-400'>{user.firstName}! 😊</span></h1> 
      <div className="flex w-full shadow-lg justify-center bg-black rounded-lg p-2 mt-5 text-white">This year has<span className="text-green-400 px-1">{DaysLeft}</span> days left {DaysLeft>200?"😁":"😬"}</div>
      <div className='mx-auto flex justify-center'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4  mt-10'>
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
              <Button><Link href={card.url}>View</Link></Button>
            </CardContent>
          </Card>
          ))}
        </div>
        <Link href="/ask-ai" className="text-black fixed bottom-3 right-4"><Button variant="outline" className="border-2 border-black" ><BrainCircuit/> Ask AI</Button></Link>
      </div>
      </div>
    )
}

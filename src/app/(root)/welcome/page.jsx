'use client'

import { SignInButton, useUser, SignUpButton } from '@clerk/nextjs';
import {Button} from '@/components/ui/button'; 

export default function Welcome() {
  const { isSignedIn } = useUser();

  return (
    <div className="text-white">
      <section>
        <img className='lg:hidden block rounded-xl mb-5'  src="https://www.fedhealth.co.za/wp-content/uploads/2024/06/Combating-gym-anxiety.webp"/>
        <div className='grid lg:grid-cols-2 h-full'>
        <div className='flex flex-col'>
        <h1 className='font-bold mb-5 text-3xl text-neutral-100 '>Welcome to JimBro - Your <span className="text-green-500">AI-Powered</span> Gym Companion</h1>
        <p className='mb-5 text-neutral-400 text-sm'>Sign in to JimBro, the ultimate AI-powered web app designed to revolutionize your gym experience. 
        <br/>Take control of your fitness journey with personalized workout routines, seamless goal tracking, and expert exercise guidance tailored just for you.
         Whether you're a beginner or a seasoned lifter, JimBro’s intelligent system adapts to your needs, delivering efficient and effective solutions to help you stay on top of your fitness goals. 
         <br/>
         <span className="text-green-500 font-bold">Log in now and let JimBro power up your workouts!</span></p>
        {!isSignedIn && (
            <div className='flex gap-2'>
          <SignInButton mode="modal">
            <Button variant="secondary">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="ghost" className="border border-2">Sign Up</Button>
          </SignUpButton>
            </div>
        )}
        </div>
        </div>
      </section>
    </div>
  );
}
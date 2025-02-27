'use client'

import { SignInButton, useUser, SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export default function Welcome() {
  const { isSignedIn } = useUser();

  return (
      <div className='flex'>
        <section className="text-white">
        <img className='lg:hidden block rounded-xl mb-5 shadow-lg' src="https://www.fedhealth.co.za/wp-content/uploads/2024/06/Combating-gym-anxiety.webp" />
        <div className='grid lg:grid-cols-2 lg:mt-20 flex flex-col items-center lg:h-full'>
          <div className='flex flex-col relative z-0  h-full justify-center'>
            <h1 className='font-bold mb-5 text-3xl text-neutral-100 '>Welcome to <span className="text-green-400">JimBro
            </span> - Your <span className="text-green-300 italics font-normal">AI-Powered </span> Gym Companion</h1>
            <p className='mb-5 text-neutral-400 text-sm'>Sign in to JimBro, the ultimate AI-powered web app designed to revolutionize your gym experience.
              <br />Take control of your fitness journey with personalized workout routines, seamless goal tracking, and expert exercise guidance tailored just for you.<br />
              Whether you're a beginner or a seasoned lifter, JimBro’s intelligent system adapts to your needs, delivering efficient and effective solutions to help you stay on top of your fitness goals.
              <br />
              <span className="text-green-400 font-bold italic">Sign Up now and let JimBro power up your workouts!</span></p>
            {!isSignedIn && (
              <div className='flex gap-2'>
                <SignInButton mode="modal">
                  <Button variant="secondary" className="hover:transoform hover:translate">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="ghost" className="border border-2">Sign Up</Button>
                </SignUpButton>
              </div>
            )}
          </div>
          <div className='relative flex flex-col h-full'>
            <div className='hidden lg:block absolute top-40 -left-20 inset-0 z-0'>
              <svg xmlns="http://www.w3.org/2000/svg" width="250" height="350" viewBox="0 0 64 64"><path id="Layer_9" d="M4 15.51a1 1 0 0 0 .71-.29L15.22 4.71a1 1 0 1 0-1.42-1.42L3.29 13.8a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.38a1 1 0 0 0 .71-.29L26.6 4.71a1 1 0 1 0-1.42-1.42L3.29 25.18a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.36a1 1 0 0 0 .71-.25L38 4.71a1 1 0 1 0-1.42-1.42L3.29 36.54a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.38a1 1 0 0 0 .71-.29L49.34 4.71a1 1 0 1 0-1.42-1.42L3.29 47.92a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zM60.71 3.29a1 1 0 0 0-1.42 0l-56 56a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l56-56a1 1 0 0 0 0-1.42zm-1.42 11.37L14.66 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l44.63-44.63a1 1 0 0 0-1.42-1.42zm0 11.34L26 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l33.29-33.25A1 1 0 0 0 59.29 26zm0 11.4L37.4 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l21.89-21.89a1 1 0 0 0-1.42-1.42zm0 11.38L48.78 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L60.71 50.2a1 1 0 0 0-1.42-1.42z" data-name="Layer 9" fill="url(&quot;#SvgjsLinearGradient1051&quot;)"></path><defs><linearGradient id="SvgjsLinearGradient1051"><stop stopColor="#dfe9f3" offset="0"></stop><stop stopColor="#8fa8c9" offset="1"></stop></linearGradient></defs></svg>
            </div>
            <div className='absolute inset-0 z-10'>
              <img className='hidden lg:block rounded-xl shadow-xl' src="https://www.fedhealth.co.za/wp-content/uploads/2024/06/Combating-gym-anxiety.webp" />
            </div>
          </div>
        </div>
      </section>
      </div>
  );
}
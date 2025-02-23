'use client'

import { SignIn } from '@clerk/nextjs'
export default function SignInPage() {


  return (
    <div>
      <div className='hidden flex items-center justify-center h-full'>
        <SignIn />
      </div>
    </div>
  )
};
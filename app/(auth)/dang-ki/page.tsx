import React from 'react'
import AuthForm from '@/components/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import Image from 'next/image';

const SignUp = async () => {
  // const loggedInUser = await getLoggedInUser();

  // console.log(loggedInUser)
  // Check for if loggedInUser Info are stored and worked or not
  return (
    <div className='flex min-h-screen w-full font-sans justify between'>
      <div className="auth-asset">
            <div>
              <Image src="/icons/auth-image.svg" width={500} height={600} alt='SignUp + Product preview'/>
            </div>
      </div>
      <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type="sign-up"/>
      </section>
    </div>
  )
}

export default SignUp
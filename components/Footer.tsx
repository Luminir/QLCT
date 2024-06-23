import { logoutAccount } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const Footer = ({user, type = 'computer'}: FooterProps) => {
    const currentRouter = useRouter();
    const handleLogOut = async () => {
        const loggedOutProperly = await logoutAccount();
        if(loggedOutProperly){
            currentRouter.push('/dang-nhap');
        }
    }
  return (
    <footer className='footer'>
        <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
            <p className='text-xl font-bold text-gray-600'>
                {user?.firstName[0]}
            </p>
        </div>

        <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
            <h1 className=' text-13 truncate font-semibold text-green-800'>
                {user?.firstName}
            </h1>
            <p className=' text-13 truncate font-normal text-gray-500'>
                {user?.email}
            </p>
        </div>

        <div className="footer_image" onClick={handleLogOut}>
            <Image src="icons/logout.svg" fill alt="logout"/>
        </div>
    </footer>
  )
}

export default Footer
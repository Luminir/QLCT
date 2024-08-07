'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const SideBar = ({user}: SiderbarProps) => {
    // return current pathname
    const pathname = usePathname();
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className="flex mb-12 cursor-pointer items-center gap-2">
                <Image src="/icons/logo.svg" 
                width={34} height={34}
                alt='Jobie logo'
                className=' size-7 max-xl:size-14'
                ></Image>
                <h1 className='sidebar-logo'>Jobie</h1>
            </Link>

            {sidebarLinks.map((item) => {
                // Hiển thị khi nào:
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                return(
                    <Link href={item.route} key={item.label}
                    className={cn('sidebar-link', {'bg-green-500': isActive})}>
                        {/* return {item.label} */}
                        <div className="relative size-6">
                            <Image src={item.imgURL} alt={item.label} fill
                            className={cn({' brightness-[3] invert-0': isActive})}></Image>
                        </div>
                        <p className={cn('sidebar-label', {'!text-white': isActive})}>
                            {item.label}
                        </p>
                        {/* return {item.label} */}
                    </Link>
                )
            })}
            {/* USER */}
            <PlaidLink user={user}/>
        </nav>
        {/* FOOTER */}
        <Footer user={user} type='computer'/>
    </section>
  )
}

export default SideBar
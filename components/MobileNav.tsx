'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNav = ({user}: MobileNavProps) => {
    const pathname = usePathname();
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger>
                <Image src="/icons/hamburger.svg"
                width={30} height={30}
                alt="Menu"
                className="cursor-pointer"></Image>
            </SheetTrigger>
            <SheetContent side="left" className='border-none bg-white'>
                <Link href="/" className="flex px-[16px] cursor-pointer items-center gap-2">
                    <Image src="/icons/logo.svg" 
                    width={34} height={34}
                    alt='Jobie logo'
                    ></Image>
                    <h1 className='text-26 font-ibm-serif font-bold text-black-1'>Jobie</h1>
                </Link>
                <div className="mobilenav-sheet">
                    <SheetClose asChild>
                        <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                            {sidebarLinks.map((item) => {
                            // Hiển thị khi nào:
                            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                            return(
                                <SheetClose asChild key={item.route}>
                                    <Link href={item.route} key={item.label}
                                    className={cn('mobilenav-sheet_close w-full', {'bg-green-500': isActive})}>
                                        {/* return {item.label} */}
                                        <div className="relative size-6 py-4">
                                            <Image src={item.imgURL} alt={item.label} fill
                                            className={cn({' brightness-[3] invert-0': isActive})}></Image>
                                        </div>
                                        <p className={cn('text-18 font-semibold text-black-1', {'text-white': isActive})}>
                                            {item.label}
                                        </p>
                                        {/* return {item.label} */}
                                    </Link>
                                </SheetClose>
                            )
                        })}
                        USER
                        </nav>
                    </SheetClose>
                    FOOTER
                </div>
                
            </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav
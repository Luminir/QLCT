import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BankCard from './BankCard'

const RightSidebar = ({user, transactions, banks}: RightSidebarProps) => {
  return (
    <aside className='right-sidebar'>
        <section className='flex flex-col pb-8'>
            <div className="profile-banner"></div>
                <div className='profile'>
                    {/* RENDERING a profile picture */}
                    <div className="profile-img">
                        <span className='text-5xl font-bold text-green-500'>{user.name[0]}</span>
                    </div>
                    <div className='profile-details'>
                        <h1 className='profile-name'>
                            {user.name}
                        </h1>
                        <p className="profile-email">
                            {user.email}
                        </p>
                    </div>
                </div>
        </section>

        {/* All current banks */}
        <section className='banks'>
            <div className=' flex w-full justify-between'>
                <h2 className='header-2'>Các tài khoản tôi quản lí:</h2>
                <Link href="/" className="flex gap-2">
                    <Image src="/icons/plus.svg"
                     width={20} height={20} alt="Thêm tài khoản" />
                     <h2 className='text-14 font-semibold text-gray-500'>
                        Thêm
                     </h2>
                </Link>
            </div>

            {/* If we have banks, THEN (&&) loop through them to show the name */}
            {banks?.length > 0 && (
                <div className='relative flex flex-1 flex-col items-center justify-center gap-5'>
                        <div className='relative z-10'>
                            {/* THẺ NGÂN HÀNG 1 */}
                            <BankCard
                            key={banks[0].$id}
                            account={banks[0]}
                            userName={`${user.lastName} ${user.firstName}`}
                            showBalance={false}/>
                        </div>
                    {/* if we have a SECOND bank */}
                    {banks[1] && (
                        <div className="absolute w-[90%] right-0 top-8 z-0">
                            {/* THẺ NGÂN HÀNG 2 */}
                            <BankCard
                            key={banks[1].$id}
                            account={banks[1]}
                            userName={`${user.lastName} ${user.firstName}`}
                            showBalance={false}/>
                        </div>
                    )}
                    {/* if we have a SECOND bank */}
                </div>
            )}
        </section>
    </aside>
  )
}

export default RightSidebar
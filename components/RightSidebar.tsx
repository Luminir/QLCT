import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BankCard from './BankCard'
import { countTransactionCategories } from '@/lib/utils'
import Category from './Category'

const RightSidebar = ({user, transactions, banks}: RightSidebarProps) => {
    // COUNT how much we spend
    const categories: CategoryCount[] = countTransactionCategories(transactions);
  return (
    <aside className='right-sidebar'>
        <section className='flex flex-col pb-8'>
            <div className="profile-banner"></div>
                <div className='profile'>
                    {/* RENDERING a profile picture */}
                    <div className="profile-img">
                        <span className='text-5xl font-bold text-green-500'>{user.firstName[0]}</span>
                    </div>
                    <div className='profile-details'>
                        <h1 className='profile-name'>
                            {user.lastName} {user.firstName}
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
            <div className=" mt-10 flex flex-1 flex-col gap-6">
                <h2 className=' header-2'>Chi tiêu nhiều nhất:</h2>
                <div className=" space-y-5">
                    {/* know how much you spend */}
                    {categories.map((category, i) => (
                        <Category key={category.name} category={category}/>
                    ))}
                </div>
            </div>
        </section>
    </aside>
  )
}

export default RightSidebar
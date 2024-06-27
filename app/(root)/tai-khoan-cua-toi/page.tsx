import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const TaiKhoanCuaToi = async () => {
  // loop through your accounts CARDS // from (root)/Home?page.tsx
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({userId: loggedIn.$id});
  return (
    <section className=' flex'>
      <div className="my-banks">
        <HeaderBox title='Tài khoản tôi quản lí' subtext='quản lí tất cả các tài khoản ngân hàng mà bạn muốn' />
        <div className="space-y-4">
          <div className='w-full flex justify-between'>
            <h2 className=' header-2'>Các thẻ của bạn - your cards</h2>
            <Link href="/" className="flex gap-2 hover:underline">
                    <Image src="/icons/plus.svg"
                     width={20} height={20} alt="Thêm tài khoản" />
                     <h2 className='text-18 font-semibold text-green-500'>
                        Thêm/Add
                     </h2>
            </Link>
          </div>
          <div className=" flex flex-wrap gap-5">
            {accounts && accounts.data.map((a: Account) => (
              <BankCard key={accounts.id} account={a} userName={loggedIn?.firstName} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TaiKhoanCuaToi
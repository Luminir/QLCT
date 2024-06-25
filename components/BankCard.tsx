import React from 'react'
import Link from 'next/link'
import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import Copy from './Copy'

const BankCard = ({account, userName, showBalance = true}: CreditCardProps) => {
  return (
    <div className='flex flex-col'>
        <Link href={`/lich-su-giao-dich/?id=${account.appwriteItemId}`} className='bank-card'>
            <div className="bank-card_content">
                <div>
                    <h1 className='text-16 font-semibold text-white'>
                        {account?.name}
                    </h1>
                    <p className="font-ibm-plex-sans font-black text-white">
                        {formatAmount(account.currentBalance)}
                    </p>
                </div>
                <article className='flex flex-col gap-2'>
                    <div className="flex justify-content">
                        <h1 className='text-12 font-semibold text-white'>
                            {userName}
                        </h1>
                        <h2 className='text-12 font-semibold text-white flex ml-auto'>
                        &#9830;&#9830; / &#9830;&#9830;
                        </h2>
                    </div>
                    <p className='text-14 font-semibold tracking-[1.1px] text-white'>
                    &#9830;&#9830;&#9830;&#9830; &#9830;&#9830;&#9830;&#9830; &#9830;&#9830;&#9830;&#9830; 
                    <span className='text-16'> {account?.mask}</span>
                    </p>
                </article>
            </div>
            <div className="bank-card_icon">
                <Image src="/icons/Paypass.svg" alt='pay'
                    width={20} height={24}/>
                <Image src="icons/mastercard.svg" alt='Visa-card'
                    width={45} height={50}/>
                <Image src="/icons/lines.png" alt='lines'
                    width={400} height={300} className='absolute top-0 left-0'/>
            </div>
        </Link>

        {/* COPY CARD'S NUMBERS */}
        {showBalance && <Copy title={account?.sharableId} />}
    </div>
  )
}

export default BankCard
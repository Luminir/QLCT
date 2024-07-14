import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import TotalAmountbox from '@/components/TotalAmountBox';
import TotalAmountboxMonth from '@/components/TotalAmountBoxMonth';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const phanTich = async ({searchParams: {id, page}}: SearchParamProps) => {
    const currentPage = Number(page as string) || 1; // set to 1 by default
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({userId: loggedIn.$id});
  
    // if dont get accounts, exit
    if(!accounts){
      return;
    }
   // returning the accounts' data
    const accountsData = accounts?.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
    
    const account = await getAccount({appwriteItemId})
  return (
   <>
    <div className=' mx-4 my-6'>
        <TotalAmountbox transactions={account?.transactions}/>
        <TotalAmountboxMonth transactions={account?.transactions}/>
    </div>
   </>
  )
}

export default phanTich
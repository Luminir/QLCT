import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const ChuyenTien = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({userId: loggedIn.$id});

  // if dont get accounts, exit
  if(!accounts){
    return;
  }

  const accountsData = accounts?.data;
  return (
    <section className="payment-transfer">
      <HeaderBox title="Chuyển khoản" subtext='Thông tin chuyển khoản'/>
      <section className='pt-5 size-full'>
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  )
}

export default ChuyenTien
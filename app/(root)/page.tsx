import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions'
import RightSidebar from '@/components/RightSidebar'
import TotalAmountbox from '@/components/TotalAmountBox'
import TotalBalancebox from '@/components/TotalBalancebox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async ({searchParams: {id, page}}: SearchParamProps) => {
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
  console.log({
    accountsData,
    account,
  })
  console.log(account?.transactions)
  return (
    <section className='home'>
      <div className="home-content">
        <header className="home-header">
          {/* Xin chào, Sơn */} 
          {/* Cái HeaderBox là component riêng dể "xin chào + tên người" */}
          <HeaderBox
            type="greeting"
            title="Xin Chào,"
            user={loggedIn?.firstName || "Khách"}
            subtext = "Truy cập và quản lý tài khoản và giao dịch một cách hiệu quả"
          />
          <TotalBalancebox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
          <TotalAmountbox transactions={account?.transactions}
          />
        </header>

        {/* GIAO DỊCH GẦN ĐÂY */}
        <RecentTransactions accounts={accountsData} transactions={account?.transactions} appwriteItemId={appwriteItemId} page={currentPage} />
      </div>

      <RightSidebar user={loggedIn} transactions={account?.transactions} banks={accountsData?.slice(0, 2)}/>

    </section>
  )
}

export default Home
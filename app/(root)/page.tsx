import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalancebox from '@/components/TotalBalancebox'
import React from 'react'

const Home = () => {
  const loggedIn = {firstName: "Sơn", lastName: "Trần", email:"MRthinhthao@gmail.com"}
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
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1000000}
          />
        </header>

        GIAO DỊCH GẦN ĐÂY
      </div>

      <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 100000}, {currentBalance: 300000}]}/>

    </section>
  )
}

export default Home
import HeaderBox from '@/components/HeaderBox'
import TotalBalancebox from '@/components/TotalBalancebox'
import React from 'react'

const Home = () => {
  const loggedIn = {firstName: "Sơn"}
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
      </div>
    </section>
  )
}

export default Home
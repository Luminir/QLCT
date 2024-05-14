// Số dư hiện có trong tài khoản
import { formatAmount } from '@/lib/utils'
import React from 'react'
import CountUp from 'react-countup'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'

const TotalBalancebox = ({accounts= [], totalBanks, totalCurrentBalance}: TotlaBalanceBoxProps) => {
  return (
    <section className='total-balance'>
        <div className="total-balance-chart">
            {/* Sơ đồ Doughnut */}
            <DoughnutChart accounts={accounts}/>
        </div>
        <div className="flex flex-col gap-6">
            <h2 className="header-2">
                Tài khoản ngân hàng: {totalBanks}
            </h2>
            <div className="flex flex-col gap-2">
                <p className='total-balance-label'>
                    Số dư hiện tại
                </p>
                <div className='total-balance-amount flex-center gap-2'>
                <AnimatedCounter amount={totalCurrentBalance}/>
                    {/* Thêm VND và dấu phẩy sau các hàng trăm */}
                    {/* {formatAmount(totalCurrentBalance)} */}
                </div>
            </div>
        </div>
    </section>
  )
}

export default TotalBalancebox
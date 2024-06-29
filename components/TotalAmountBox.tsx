import { countTransactionCategories, formatAmount } from '@/lib/utils'
import React from 'react'
import CountUp from 'react-countup'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'
import Category from './Category'
import AmountCategorySpent from './AmountCategorySpent'
import AmountCategoryReceived from './AmountCategoryReceived'
import AmountTotal from './AmountTotal'

const TotalAmountbox = ({ transactions }: TotalAmountBoxProps) => {
    // COUNT how much we spend
    const categories: CategoryCount[] = countTransactionCategories(transactions);
  return (
    <section className='custom-totalAmount-bigScreen custom-totalAmount-smallScreen justify-between'>
        <div className="w-full">
            <div className=" mt-10 flex flex-1 flex-col gap-6">
                <div className=" space-y-2">
                    <p className='header-2'>Total Amount:</p>
                    {/* know how much you spend */}
                    <AmountTotal transactions={transactions}  />
                </div>
                <h2 className=' header-2'>Chi tiêu nhiều nhất:</h2>
                <div className=" space-y-3">
                    {/* know WHAT you spend */}
                    {categories.map((category, i) => (
                        <Category key={category.name} category={category}/>
                    ))}
                </div>
            </div>
        </div>
        <div className=" w-full">
            <div className=" mt-10 flex flex-1 flex-col gap-6">
                
                <div className=" space-y-2">
                    <p className='header-2'>Amount received:</p>
                    {/* know how much you receive FROM BEGINNING */}
                    {categories.map((category, i) => (
                        // create customize category, rename to <AmountCategory/> prop: category too / prop: transaction: transactionProps(line 66)
                        <AmountCategoryReceived key={category.name} category={category} transactions={transactions}  />
                    ))}
                </div>
                <div className=" space-y-2">
                    <p className='header-2'>Amount Spent:</p>
                    {/* know how much you spend FROM BEGINNING*/}
                    {categories.map((category, i) => (
                        // create customize category, rename to <AmountCategory/> prop: category too / prop: transaction: transactionProps(line 66)
                        <AmountCategorySpent key={category.name} category={category} transactions={transactions}  />
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default TotalAmountbox
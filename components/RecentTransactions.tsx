import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'
import { Pagination } from './Pagination'

const RecentTransactions = ({accounts, transactions= [], appwriteItemId, page = 1}: RecentTransactionsProps) => {
  // caculate when to show pagination:
  const rowsPerPage = 10; // show 10 rows/page
  const totalPages = Math.ceil(transactions.length/ 10); // how many page we MIGHT have
  const indexOfLastTransaction = page * rowsPerPage; // know which page you r on
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransaction = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction); // show the data of current page, only 10, not more

  return (
    <>
        <section className='recent-transactions'>
            <header className='flex items-center justify-between'>
                <h4 className='recent-transactions-label'>
                GIAO DỊCH GẦN ĐÂY
                </h4>
                <Link href={`/lich-su-giao-dich/?id=${appwriteItemId}`} className=' text-emerald-600 underline'> {/* specific id for a transaction */}
                    View All
                </Link>
            </header>

            <Tabs defaultValue={appwriteItemId} className="w-full">
            <TabsList className='recent-transactions-tablist'>
              {accounts.map((account: Account) => (
                <TabsTrigger key={account.id} value={account.appwriteItemId}>
                  <BankTabItem key={account.id} account={account} appwriteItemId={appwriteItemId} />
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* show tabs content */}
            {accounts.map((account: Account) => (
              <TabsContent value={account.appwriteItemId} key={account.id} className=' space-y-4'>
                <BankInfo account={account} appwriteItemId={appwriteItemId} type='full' />
                <TransactionsTable transactions={currentTransaction} />

                {/* current page = page */}
                {/* only show pagination button when there are more than 1 page */}
                {totalPages > 1 && (
                  <div className="my-3">
                    <Pagination totalPages={totalPages} page={page} />
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

        </section>
    </>
  )
}

export default RecentTransactions
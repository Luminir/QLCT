import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import React from 'react'

const LichSuGiaoDich = async ({searchParams: { id, page}}: SearchParamProps) => {
  // GET TRANSACTIONS INFO
  const currentPage = Number(page as string) || 1; // set to 1 by default
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({userId: loggedIn.$id});

  // if dont get accounts, exit
  if(!accounts){
    return;
  }

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  
  const account = await getAccount({appwriteItemId})

  // caculate when to show pagination:
  const rowsPerPage = 10; // show 10 rows/page
  const totalPages = Math.ceil(account?.transactions.length/ 10); // how many page we MIGHT have
  const indexOfLastTransaction = currentPage * rowsPerPage; // know which page you r on
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransaction = account?.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction); // show the data of current page, only 10, not more
  return (
    <div className='transactions'> 
      <div className="transactions-header">
        <HeaderBox title='Lịch sử giao dịch' subtext='see your banky details and transactions'/>
      </div>
      <div className=" space-y-6">
        <div className="transactions-account">
          <div className=" gap-2 flex flex-col">
              <h2 className=' text-18 font-bold text-white'>{account?.data.name}</h2>
              <p className='text-14 text-white'>{account?.data.officalName}</p>
              <p className='text-14 font-semibold tracking-[1.1px] text-white'>
                    &#9830;&#9830;&#9830;&#9830; &#9830;&#9830;&#9830;&#9830; &#9830;&#9830;&#9830;&#9830; 
                    <span className='text-16'> {account?.data.mask}</span>
              </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current Balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>

        <section className=" w-full flex flex-col gap-6">
          <TransactionsTable transactions={currentTransaction} />
          {/* current page = page */}
                {/* only show pagination button when there are more than 1 page */}
                {totalPages > 1 && (
                  <div className="my-3">
                    <Pagination totalPages={totalPages} page={currentPage} />
                  </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default LichSuGiaoDich
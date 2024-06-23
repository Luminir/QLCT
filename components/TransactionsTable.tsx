import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from '@/lib/utils'
import { transactionCategoryStyles } from '@/constants'

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]

const StatusBadge = ({ category }: CategoryBadgeProps) => {
  // change the color of status and category base on the words, category
  const { borderColor, backgroundColor, textColor, chipBackgroundColor} = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;
  return(
    <div className={cn('status-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)} />
      <p className={cn('text-[12px] font-medium', textColor)}> { category } </p>
    </div>
  )
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  // change the color of status and category base on the words, category
  const { borderColor, textColor, chipBackgroundColor} = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;
  return(
    <div className={cn('category-badge shadow-lg', borderColor, chipBackgroundColor)}>
      <p className={cn('text-[12px] font-medium', textColor)}> { category } </p>
    </div>
  )
}

const TransactionsTable = ({transactions}: TransactionTableProps) => {
  return (
    <div>
        <Table>
      <TableHeader className=' bg-green-300'>
        <TableRow>
          <TableHead className="px-1">Transaction</TableHead>
          <TableHead className="px-1">Amount</TableHead>
          <TableHead className="px-1">Status</TableHead>
          <TableHead className="px-1 max-md:hidden">Date</TableHead>
          <TableHead className="px-1 max-md:hidden">Channel</TableHead>
          <TableHead className="px-1">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: Transaction) => {
            const status = getTransactionStatus(new Date(transaction.date));
            const amount = formatAmount(transaction.amount);
            const isDebit = transaction.type === 'debit';
            const isCredit = transaction.type === 'credit';
            return(
                <TableRow key={transaction.$id} className={`${isDebit || amount[0] === '-' ? 'bg-[#e4a494]' : 'bg-[#97e8b4]'} !over:bg-none rounded-lg !border-b-DEFAULT`}>
                    {/* Transactions */}
                    <TableCell className='max-w-[225px] pl-1.5 pr-10'>
                        <div className='flex items-center gap-3'>
                            <h1 className='text-14 truncate '>
                                {removeSpecialCharacters(transaction.name)}
                            </h1>
                        </div>
                    </TableCell>
                    {/* Amount */}
                    <TableCell className={`pl-2 pr-8 font-semibold ${isDebit || amount[0] === '-' ? ' text-red-600' : 'text-green-600'}`}>
                        {isDebit ? `-${amount}` : isCredit ? amount : amount}
                    </TableCell>

                    <TableCell className='pl-1.5 pr-8'>
                        <StatusBadge category={status} />
                    </TableCell>

                    <TableCell className='pl-1.5 pr-8 min-w-32 max-md:hidden'>
                        {formatDateTime(new Date(transaction.date)).dateTime}
                    </TableCell>

                    <TableCell className='pl-1.5 pr-8 min-w-24 max-md:hidden'>
                        {transaction.paymentChannel}
                    </TableCell>

                    <TableCell className='pl-1.5 pr-8'>
                        <CategoryBadge category={transaction.category} />
                    </TableCell>
                </TableRow>
            )
        })}
      </TableBody>
    </Table>
    </div>
  )
}

export default TransactionsTable
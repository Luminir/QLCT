// total Amount SPENT & total Amount RECEIVED from the BEGINNING OF TIME
export const countTotalAmountEachCard = ({transactions}: TransactionTableProps) => {
    // count total spend and receive
    // Initialize total variables
    let totalSpent: number = 0.00;
    let totalReceived: number = 0.00;
    transactions.forEach((transaction) => {
    const amountNumber = typeof transaction.amount === 'number' ? transaction.amount : parseFloat(transaction.amount); // Convert to number

    if (!isNaN(amountNumber)) { // Ensure it's a valid number
      // console.log(amountNumber)
        if (amountNumber <= 0) { // when SPEND $
            totalSpent += amountNumber;
        } else if (amountNumber > 0) { // when RECEIVE $
            totalReceived += amountNumber;
        }
    } else {
        console.warn(`Invalid amount detected: ${transaction.amount}`);
    }
    })
    // Output the totals
    // console.log(`Total spent: $${totalSpent.toFixed(2)}`);
    // console.log(`Total received: $${totalReceived.toFixed(2)}`);
    const totalAmountSpent = totalSpent.toFixed(2);
    const totalAmountReceived = totalReceived.toFixed(2);
    return{
        totalAmountSpent,
        totalAmountReceived,
    }   
}

// total Amount SPENT & total Amount RECEIVED from each category: "Travel", "Food & Drink", "Transfer", "Payment"
export const countTotalAmountCategory = ({transactions}: TransactionTableProps) => {
    // Initialize total variables for each category
    let totals = {
        Travel: { spent: 0.00, received: 0.00 },
        FoodAndDrink: { spent: 0.00, received: 0.00 },
        Transfer: { spent: 0.00, received: 0.00 },
        Payment: { spent: 0.00, received: 0.00 },
    };

    // Filter and sum amounts for specific categories
    const filteredTransactions = transactions.filter(transaction => 
        transaction.category === 'Travel' ||
        transaction.category === 'Food and Drink' ||
        transaction.category === 'Transfer' ||
        transaction.category === 'Payment'
    ).forEach((transaction) => {
        // if it number ? number:YES : (notNumber ? does it have (-) ? -number : (does it have .category=Transfer ? yes : no /
        const amountNumber = typeof transaction.amount === 'number' ? transaction.amount : (transaction.amount as string).includes('-') ? 
                            0 - parseFloat(transaction.amount) : transaction.category === 'Transfer'?
                            0 - parseFloat(transaction.amount) : parseFloat(transaction.amount); // Convert to number
        // console.log(amountNumber)
        if (!isNaN(amountNumber)) { // Ensure it's a valid number
            if (amountNumber <= 0) { // when SPEND $
                if(transaction.category === 'Travel'){
                    totals.Travel.spent += amountNumber;
                } else if (transaction.category === 'Food and Drink'){
                    totals.FoodAndDrink.spent += amountNumber;
                } else if (transaction.category === 'Transfer'){
                    totals.Transfer.spent += amountNumber;
                } else if (transaction.category === 'Payment'){
                    totals.Payment.spent += amountNumber;
                }
            } else if (amountNumber > 0) { // when RECEIVE $
                if(transaction.category === 'Travel'){
                    totals.Travel.received += amountNumber;
                } else if (transaction.category === 'Food and Drink'){
                    totals.FoodAndDrink.received += amountNumber;
                } else if (transaction.category === 'Transfer'){
                    totals.Transfer.received += amountNumber;
                } else if (transaction.category === 'Payment'){
                    totals.Payment.received += amountNumber;
                }
            }
          } else {
            console.warn(`Invalid amount detected: ${transaction.amount}`);
          }
    });

    // console.log(" travel spent: $" + totals.Travel.spent.toFixed(2) + "/ travel receive: $" + totals.Travel.received.toFixed(2))
    // console.log(" F&D spent: $" + totals.FoodAndDrink.spent.toFixed(2) + "/ F&D receive: $" + totals.FoodAndDrink.received.toFixed(2))
    // console.log(" transfer spent: $" + totals.Transfer.spent.toFixed(2) + "/ transfer receive: $" + totals.Transfer.received.toFixed(2))
    // console.log(" payment spent: $" + totals.Payment.spent.toFixed(2) + "/ payment receive: $" + totals.Payment.received.toFixed(2))
    const totalCategorySpent = {
        Travel: totals.Travel.spent.toFixed(2),
        FoodAndDrink: totals.FoodAndDrink.spent.toFixed(2),
        Transfer: totals.Transfer.spent.toFixed(2),
        Payment: totals.Payment.spent.toFixed(2),
    }

    const totalCategoryReceived = {
        Travel: totals.Travel.received.toFixed(2),
        FoodAndDrink: totals.FoodAndDrink.received.toFixed(2),
        Transfer: totals.Transfer.received.toFixed(2),
        Payment: totals.Payment.received.toFixed(2),
    }

    return{
        totalCategorySpent,
        totalCategoryReceived
    }
}
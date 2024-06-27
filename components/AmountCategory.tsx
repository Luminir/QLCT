import Image from "next/image";

import { topCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";
import { countTotalAmountCategory } from "@/lib/actions/counting.actions";

const AmountCategory = ({category, transactions}: AmountCategory) => {
    const {
    bg,
    circleBg,
    text: { main, count },
    progress: { bg: progressBg, indicator },
    icon,
    } = topCategoryStyles[category.name as keyof typeof topCategoryStyles] ||
    topCategoryStyles.default;

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
        const amountNumber = typeof transaction.amount === 'number' ? transaction.amount : parseFloat(transaction.amount); // Convert to number
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

    const {totalCategorySpent, totalCategoryReceived} = countTotalAmountCategory({transactions})
    // // console.log(" travel spent: $" + totals.Travel.spent.toFixed(2) + "/ travel receive: $" + totals.Travel.received.toFixed(2))
    // // console.log(" F&D spent: $" + totals.FoodAndDrink.spent.toFixed(2) + "/ F&D receive: $" + totals.FoodAndDrink.received.toFixed(2))
    // // console.log(" transfer spent: $" + totals.Transfer.spent.toFixed(2) + "/ transfer receive: $" + totals.Transfer.received.toFixed(2))
    // // console.log(" payment spent: $" + totals.Payment.spent.toFixed(2) + "/ payment receive: $" + totals.Payment.received.toFixed(2))
    // console.log(" travel spent func: $" + totalCategorySpent.Travel + "/ travel receive: $" + totalCategoryReceived.Travel)
    // console.log(" FDrink spent func: $" + totalCategorySpent.FoodAndDrink + "/ FDrink receive: $" + totalCategoryReceived.FoodAndDrink)
    // console.log(" transfer spent: $" + totalCategorySpent.Transfer + "/ transfer receive: $" + totalCategoryReceived.Transfer)
    // console.log(" payment spent: $" +totalCategorySpent.Payment + "/ payment receive: $" + totalCategoryReceived.Payment)

    return (
    <div className={cn("gap-[18px] flex p-4 rounded-xl", bg)}>
        <figure className={cn("flex-center size-10 rounded-full", circleBg)}>
        <Image src={icon} width={20} height={20} alt={category.name} />
        </figure>
        <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-14 flex justify-between">
            <h2 className={cn("font-medium", main)}>{category.name}</h2>
            <h3 className={cn("font-normal", count)}>{category.count}</h3>
        </div>
        <Progress
            value={(category.count / category.totalCount) * 100}
            className={cn("h-2 w-full", progressBg)}
            indicatorClassName={cn("h-2 w-full", indicator)} // indicatorClassname is fixed, no need to alter
        />
        </div>
    </div>
    );
}

export default AmountCategory
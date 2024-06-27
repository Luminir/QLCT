import Image from "next/image";

import { topCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";
import { countTotalAmountCategory, countTotalAmountEachCard } from "@/lib/actions/counting.actions";

const AmountCategoryReceived = ({category, transactions}: AmountCategory) => {
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

    // amount received on Category
    const {totalCategoryReceived} = countTotalAmountCategory({transactions})
    // Normalize category name to match keys in totalCategorySpent: 'Food and Drink' ==> 'FoodAndDrink'
    const normalizedCategoryName = category.name.replace(/ and /g, "And"); // Remove spaces to match keys
    const categoryReceivedAmount = parseFloat(totalCategoryReceived[normalizedCategoryName as keyof typeof totalCategoryReceived]); // turn string to number by parseFloat

    // total Amount received:
    const {totalAmountReceived} = countTotalAmountEachCard({transactions});
    const totalAmountReceivedNumber = parseFloat(totalAmountReceived);

    return (
    <div className={cn("gap-[18px] flex p-4 rounded-xl", bg)}>
        <figure className={cn("flex-center size-10 rounded-full", circleBg)}>
        <Image src={icon} width={20} height={20} alt={category.name} />
        </figure>
        <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-14 flex justify-between">
            <h2 className={cn("font-medium", main)}>{category.name}</h2>
            <h3 className={cn("font-normal", count)}>${categoryReceivedAmount}</h3>
        </div>
        <Progress
            value={(categoryReceivedAmount / totalAmountReceivedNumber) * 100}
            className={cn("h-2 w-full", progressBg)}
            indicatorClassName={cn("h-2 w-full", indicator)} // indicatorClassname is fixed, no need to alter
        />
        </div>
    </div>
    );
}

export default AmountCategoryReceived
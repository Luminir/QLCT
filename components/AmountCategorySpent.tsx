import Image from "next/image";

import { topCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";
import { countTotalAmountCategory, countTotalAmountEachCard } from "@/lib/actions/counting.actions";

const AmountCategorySpent = ({category, transactions}: AmountCategory) => {
    const {
    bg,
    circleBg,
    text: { main, count },
    progress: { bg: progressBg, indicator },
    icon,
    } = topCategoryStyles[category.name as keyof typeof topCategoryStyles] ||
    topCategoryStyles.default;

    // amount spent on Category
    const {totalCategorySpent} = countTotalAmountCategory({transactions})
    // Normalize category name to match keys in totalCategorySpent: 'Food and Drink' ==> 'FoodAndDrink'
    const normalizedCategoryName = category.name.replace(/ and /g, "And"); // Remove spaces to match keys
    const categorySpentAmount = parseFloat(totalCategorySpent[normalizedCategoryName as keyof typeof totalCategorySpent]); // turn string to number by parseFloat

    // total Amount spent:
    const {totalAmountSpent} = countTotalAmountEachCard({transactions});
    const totalAmountSpentNumber = parseFloat(totalAmountSpent);

    return (
    <div className={cn("gap-[18px] flex p-4 rounded-xl", bg)}>
        <figure className={cn("flex-center size-10 rounded-full", circleBg)}>
        <Image src={icon} width={20} height={20} alt={category.name} />
        </figure>
        <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-14 flex justify-between">
            <h2 className={cn("font-medium", main)}>{category.name}</h2>
            <h3 className={cn("font-normal", count)}>${categorySpentAmount}</h3>
        </div>
        <Progress
            value={(categorySpentAmount / totalAmountSpentNumber) * 100}
            className={cn("h-2 w-full", progressBg)}
            indicatorClassName={cn("h-2 w-full", indicator)} // indicatorClassname is fixed, no need to alter
        />
        </div>
    </div>
    );
}

export default AmountCategorySpent
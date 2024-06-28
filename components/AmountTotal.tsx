import Image from "next/image";

import { topCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";
import { countTotalAmountCategory, countTotalAmountEachCard } from "@/lib/actions/counting.actions";

const AmountTotal = ({ transactions }: AmountTotalProps) => {
    // total Amount received:
    const {totalAmountReceived, totalAmountSpent} = countTotalAmountEachCard({transactions});
    const totalAmountReceivedNumber = parseFloat(totalAmountReceived);
    const totalAmountSpentNumber = parseFloat(totalAmountSpent);

    return (
    <div className=" gap-[3px] flex flex-col">
        <div className="w-full flex-1 bg-green-200 p-4 rounded-xl">
            <div className=" flex text-14 justify-between mx-2">
                <h2 className=" header-1">Received:</h2>
                <h3 className=" font-medium text-green-600">${totalAmountReceivedNumber}</h3>
            </div>
        </div>
        <div className=" w-full flex-1 bg-red-200 p-4 rounded-xl mt-1">
            <div className=" flex text-14 justify-between mx-2">
                <h2 className=" header-1">Spent:</h2>
                <h3 className=" font-medium text-red-600">${totalAmountSpentNumber}</h3>
            </div>
        </div>
    </div>
    );
}

export default AmountTotal
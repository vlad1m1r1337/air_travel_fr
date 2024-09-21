import {Sort} from "./Sort.tsx";
import {FilterByTransfer} from "./FilterByTransfer.tsx";
import {FilterByPrice} from "./FilterByPrice.tsx";
import {FilterByCompany} from "./FilterByCompany.tsx";

export const SortFilter = () => {
    return (
        <div>
            <div className="w-full h-8 bg-gray-300"/>
            <div className="p-4">
                <Sort />
                <FilterByTransfer />
                <FilterByPrice />
                <FilterByCompany />
            </div>
            <div className="w-full h-28 bg-gray-300"/>
        </div>
    )
}
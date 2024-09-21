import {useFilterPriceStore} from "../store/useSortStore.ts";

export const FilterByPrice = () => {
    const { minPrice, setMinPrice, maxPrice, setMaxPrice } = useFilterPriceStore();
    return (
        <>
            <h2 className="py-3 font-medium">Цена</h2>
            <label className="flex">
                От
                <input
                    className="border ml-2"
                    type="number"
                    value={minPrice ?? ''}
                    onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : undefined)}
                    min="0"
                />
            </label>
            <label className="flex mt-3">
                До
                <input
                    className="border ml-2"
                    type="number"
                    value={maxPrice ?? ''}
                    onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : undefined)}
                />
            </label>
        </>
    )
}
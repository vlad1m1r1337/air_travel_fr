import {useFilterStore} from "../store/useSortStore.ts";

export const FilterByTransfer = () => {
    const { transferType, setTransferType } = useFilterStore();

    return(
        <>
            <h2 className="py-3 font-medium">Фильтровать</h2>
            <label className="flex">
                <input
                    type="checkbox"
                    checked={transferType === 'direct'}
                    onChange={() => setTransferType(transferType === 'direct' ? '' : 'direct')}
                />
                Без пересадок
            </label>
            <label className="flex">
                <input
                    type="checkbox"
                    checked={transferType === 'one-stop'}
                    onChange={() => setTransferType(transferType === 'one-stop' ? '' : 'one-stop')}
                />
                1 пересадка
            </label>
        </>
    )
}
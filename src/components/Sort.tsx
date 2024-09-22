import {useSortStore} from "../store/useSortStore.ts";

export const Sort = () => {
    const { sortBy, setSortBy } = useSortStore();

    return (
        <>
            <h2 className="py-3 font-medium">Сортировать</h2>
            <label className="flex">
                <input
                    type="radio"
                    name="sort"
                    className="mr-2"
                    checked={sortBy === 'asc'}
                    onChange={() => setSortBy('asc')}
                />
               - по возрастанию цены
            </label>
            <label className="flex">
                <input
                    type="radio"
                    name="sort"
                    className="mr-2"
                    checked={sortBy === 'desc'}
                    onChange={() => setSortBy('desc')}
                />
                - по убыванию цены
            </label>
            <label className="flex">
                <input
                    type="radio"
                    name="sort"
                    className="mr-2"
                    checked={sortBy === 'duration'}
                    onChange={() => setSortBy('duration')}
                />
                - по времени в пути
            </label>
        </>
    )
}
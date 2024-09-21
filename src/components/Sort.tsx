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
                    checked={sortBy === 'asc'}
                    onChange={() => setSortBy('asc')}
                />
                По возрастанию цены
            </label>
            <label className="flex">
                <input
                    type="radio"
                    name="sort"
                    checked={sortBy === 'desc'}
                    onChange={() => setSortBy('desc')}
                />
                По убыванию цены
            </label>
            <label className="flex">
                <input
                    type="radio"
                    name="sort"
                    checked={sortBy === 'duration'}
                    onChange={() => setSortBy('duration')}
                />
                По времени в пути
            </label>
        </>
    )
}
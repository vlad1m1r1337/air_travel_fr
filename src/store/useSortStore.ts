import { create } from 'zustand';

interface SortState {
    sortBy: string;
    setSortBy: (sortBy: string) => void;
}

interface FilterState {
    transferType: 'direct' | 'one-stop' | '';
    setTransferType: (transferType: 'direct' | 'one-stop' | '') => void;
}

export const useSortStore = create<SortState>((set) => ({
    sortBy: 'asc',
    setSortBy: (sortBy) => set({ sortBy }),
}));

export const useFilterStore = create<FilterState>((set) => ({
    transferType: '',
    setTransferType: (transferType) => set({ transferType }),
}));

interface FilterPriceState {
    minPrice: number | undefined;
    maxPrice: number | undefined;
    setMinPrice: (minPrice: number | undefined) => void;
    setMaxPrice: (maxPrice: number | undefined) => void;
}

export const useFilterPriceStore = create<FilterPriceState>((set) => ({
    minPrice: undefined,
    maxPrice: undefined,
    setMinPrice: (minPrice) => set({ minPrice }),
    setMaxPrice: (maxPrice) => set({ maxPrice }),
}));

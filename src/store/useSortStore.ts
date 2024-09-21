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

export interface Company {
    name: string;
    price: number;
    id: string;
    active: boolean;
}

interface CompanyStoreState {
    activeCompany: Company | null;
    companies: Company[];
    setCompanies: (company: Company[]) => void;
    setActiveCompany: (company: Company) => void;
}

export const useCompanyStore = create<CompanyStoreState>((set) => ({
    activeCompany: null,
    companies: [],
    setCompanies: (companies) => set({ companies }),
    setActiveCompany: (company) => set((state) => {
        const isActive = state.activeCompany?.id === company.id;
        return {
            companies: state.companies.map((c) => ({
                ...c,
                active: c.id === company.id ? !c.active : c.active,
            })),
            activeCompany: isActive ? null : company,
        };
    }),
}));

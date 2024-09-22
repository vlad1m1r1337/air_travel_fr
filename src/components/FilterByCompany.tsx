import { useCompanyStore } from "../store/useSortStore.ts";

export const FilterByCompany = () => {
    const { companies, setActiveCompany } = useCompanyStore();

    return (
        <div className="mt-5">
            <h2 className="py-3 font-medium">Авиакомпании</h2>
            {companies.length && companies.map((company) => (
                <label className="flex " key={company.id}>
                    <input
                        type="checkbox"
                        checked={company.active}
                        onChange={() => setActiveCompany(company)}
                    />
                    <div className="flex justify-between w-full ">
                        <span
                            className="pl-2">{company.name.length > 14 ? company.name.slice(0, 14) + '...' : company.name}</span>
                        <span> от {company.price} р.</span>
                    </div>
                </label>
            ))}
        </div>
    );
};
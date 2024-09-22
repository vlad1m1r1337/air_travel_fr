import mock from "./server/flights.json";
import {formatDate, formatDuration} from "./utils";
import {SortFilter} from "./components/SortFilter.tsx";
import {useEffect, useState} from "react";
import {Clock4, MoveRight} from 'lucide-react';
import {useCompanyStore, useFilterPriceStore, useSortStore} from "./store/useSortStore.ts";
import {useFilterStore} from "./store/useSortStore.ts";
import {sortFlightsByPrice} from "./ranging/sorting.ts";
import {filterFlightsByTransfer} from "./ranging/filter_transfer.ts";
import {filterFlightsByPrice} from "./ranging/filter_price.ts";
import { useMemo } from "react";
import {nanoid} from "nanoid";

function App() {
    const obj = (mock as any).result.flights;
    const [flightsEnd, setFlightsEnd] = useState(2);
    const { sortBy } = useSortStore();
    const { transferType } = useFilterStore();
    const { minPrice, maxPrice } = useFilterPriceStore();
    const { companies, setCompanies } = useCompanyStore();
    const {activeCompany} = useCompanyStore();

    const displayedFlights = useMemo(() => {
        return obj
            .sort((a: any, b: any) => sortFlightsByPrice(a, b, sortBy))
            .filter((flight: any) => filterFlightsByTransfer([flight.flight], transferType)[0])
            .filter((flight: any) => filterFlightsByPrice([flight.flight], minPrice, maxPrice)[0])
            .slice(0, flightsEnd)

    }, [obj, sortBy, transferType, minPrice, maxPrice, flightsEnd, activeCompany]);

    useEffect(() => {
        const obj = displayedFlights.map((flight: any) => ({
            name: flight.flight.carrier.caption,
            price: parseInt(flight.flight.price.total.amount, 10),
            id: nanoid(),
            active: ((activeCompany?.name === flight.flight.carrier.caption && activeCompany?.price === Number(flight.flight.price.total.amount))) || false,
        }));
        setCompanies(obj);
    }, [displayedFlights, setCompanies, activeCompany]);
    console.log(companies)
    return (
        <>
            <div className="flex flex-row">
                <SortFilter />
                <div className="flex flex-col w-full p-4">
                    {displayedFlights.filter((flight: any) => !activeCompany || flight.flight.carrier.caption === activeCompany.name && activeCompany?.price === Number(flight.flight.price.total.amount)).map((flight: any) => {
                        return (
                            <div key={flight.flightToken}>
                                <div className="flex flex-col items-end bg-sky-600 w-full p-4">
                                    <p className="text-white">{`${parseInt(flight.flight.price.passengerPrices[0].singlePassengerTotal.amount, 10)} ₽`}</p>
                                    <p className="text-white">Стоимость для одного взрослого пассажира</p>
                                </div>
                                {flight.flight.legs.map((leg: any, legIndex: number) => {
                                    const firstSegment = leg.segments[0];
                                    const lastSegment = leg.segments.at(-1);
                                    const [departureTime, departureDay, departureMonth, departureWeekday] = formatDate(firstSegment.departureDate);
                                    const [arrivalTime, arrivalDay, arrivalMonth, arrivalWeekday] = formatDate(lastSegment.arrivalDate);

                                    return (
                                        <div key={legIndex} className="flex flex-col p-4">
                                                <div className="flex flex-col">
                                                    <div className="flex gap-2 ml-3">
                                                        <p>{firstSegment.departureCity?.caption}, {firstSegment.departureAirport.caption} <span className="text-sky-400">({firstSegment.departureAirport.uid})</span></p>
                                                        <MoveRight className="text-sky-400 stroke-[1]"/>
                                                        <p>{lastSegment.arrivalCity?.caption}, {lastSegment.arrivalAirport.caption} <span className="text-sky-400">({lastSegment.arrivalAirport.uid})</span></p>
                                                    </div>
                                                    <hr className="my-2"/>
                                                    <div className="flex gap-4 justify-between items-center">
                                                        <time dateTime={firstSegment.departureDate}>
                                                            {departureTime} <span className="text-sky-400">{departureDay} {departureMonth} {departureWeekday}</span>
                                                        </time>
                                                        <div className="flex gap-2 my-3">
                                                            <Clock4 className="stroke-[1]" />
                                                            <p>{formatDuration(leg.duration)}</p>
                                                        </div>
                                                        <time dateTime={lastSegment.arrivalDate}>
                                                            {arrivalTime} <span className="text-sky-400">{arrivalDay} {arrivalMonth} {arrivalWeekday}</span>
                                                        </time>
                                                    </div>
                                                    <div className="flex items-center m-2">
                                                        <hr className="flex-grow border-t border-gray-300 ml-7"/>
                                                        { leg.segments.length !== 1 && <p className="text-orange-500">{`${leg.segments.length - 1} пересадка`}</p>}
                                                        <hr className="flex-grow border-t border-gray-300 mr-7"/>
                                                    </div>
                                                    <p>{`Рейс выполняет: ${firstSegment.airline.caption}`}</p>
                                                    { legIndex === 0 && <hr className="border-t-[3px] my-3 border-sky-400 mx-[-1rem]"/>}
                                                </div>
                                        </div>
                                    )
                                })}
                                <button className=" h-10 w-full mt-2 mb-4 bg-orange-300 text-white hover:bg-orange-400 active:bg-orange-500">Выбрать</button>
                            </div>
                        )
                    })}
                    <button onClick={() => setFlightsEnd((prev) => prev + 1)} className="self-center border-2 border-black bg-black bg-opacity-5 mb-6 w-[200px] hover:bg-opacity-10 active:bg-opacity-15 disabled:opacity-25" disabled={!!activeCompany}>Показать ещё</button>
                </div>
            </div>
        </>
    )
}

export default App

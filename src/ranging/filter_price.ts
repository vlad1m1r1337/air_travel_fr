export const filterFlightsByPrice = (flights: any[], minPrice?: number, maxPrice?: number) => {
    return flights.filter(flight => {
        console.log(flight.price.total)
        const price = parseInt(flight.price.total.amount, 10);
        return (minPrice === undefined || price >= minPrice) && (maxPrice === undefined || price <= maxPrice);
    });
};

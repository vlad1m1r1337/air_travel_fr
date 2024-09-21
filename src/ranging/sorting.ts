export const sortFlightsByPrice = (a: any, b: any, sortBy: string) => {
    if (sortBy === 'asc' || sortBy === 'desc') {
        const priceA = parseInt(a.flight.price.passengerPrices[0].singlePassengerTotal.amount, 10);
        const priceB = parseInt(b.flight.price.passengerPrices[0].singlePassengerTotal.amount, 10);
        return sortBy === 'asc' ? priceA - priceB : priceB - priceA;
    }
    else if (sortBy === 'duration') {
        const durationA = a.flight.legs.reduce((acc: number, leg: any) => acc + leg.duration, 0);
        const durationB = b.flight.legs.reduce((acc: number, leg: any) => acc + leg.duration, 0);
        return durationA - durationB;
    }
};
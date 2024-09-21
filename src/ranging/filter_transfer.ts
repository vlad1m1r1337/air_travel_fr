export const filterFlightsByTransfer = (flights: any[], transferType: 'direct' | 'one-stop' | '') => {
    return flights.filter(flight => {
        if (!flight.legs) return false;
        if (transferType === 'direct') {
            return flight.legs.every((leg: any) => leg.segments.length === 1);
        } else if (transferType === 'one-stop') {
            return flight.legs.reduce((acc: number, leg: any) => leg.segments.length + acc, 0) === 3;
        }
        return true;
    });
};
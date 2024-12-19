/**
 * Recommends the best available seats based on user preferences and historical feedback data.
 * @param userPreferences User preferences for seat selection
 * @param availableSeats List of available seats
 * @param historicalFeedback Historical feedback data
 * @param seatNumber Seat number to get previous opinion on
 * @returns List of recommended seats
 */
export function recommendSeats(userPreferences, availableSeats, historicalFeedback, seatNumber) {
    const filteredSeats = availableSeats.filter(seat => (userPreferences.windowSeat && seat.isWindow) ||
        (userPreferences.aisleSeat && seat.isAisle) ||
        (userPreferences.extraLegroom && seat.hasExtraLegroom));
    const rankedSeats = rankSeats(filteredSeats, historicalFeedback);
    const sortedSeats = rankedSeats.sort((a, b) => {
        const aHasFeedback = getPreviousFeedback(a.id, historicalFeedback) ? 1 : 0;
        const bHasFeedback = getPreviousFeedback(b.id, historicalFeedback) ? 1 : 0;
        return bHasFeedback - aHasFeedback;
    });
    return sortedSeats.map(seat => {
        const similarSeats = getSimilarSeats(seat, sortedSeats);
        const previousFeedback = getPreviousFeedback(seat.id, historicalFeedback);
        return Object.assign(Object.assign({}, seat), { similarSeats: similarSeats.map(s => s.id), previousFeedback: previousFeedback ? {
                rating: previousFeedback.rating,
                comments: previousFeedback.comments
            } : null, previousOpinionOnSeatInQuestion: seatNumber === seat.id ? previousFeedback : null });
    });
}
/**
 * Ranks the seats based on historical feedback data.
 * @param seats List of seats to be ranked
 * @param historicalFeedback Historical feedback data
 * @returns List of ranked seats
 */
export function rankSeats(seats, historicalFeedback) {
    return seats.sort((a, b) => countPositiveFeedback(b, historicalFeedback) - countPositiveFeedback(a, historicalFeedback));
}
/**
* Counts positive feedback for a specific seat and user.
* @param seat Seat to count feedback for
* @param historicalFeedback Historical feedback data
* @returns Number of positive feedbacks
*/
export function countPositiveFeedback(seat, historicalFeedback) {
    return historicalFeedback.filter(feedback => feedback.seatId === seat.id && feedback.rating > 4).length;
}
/**
* Retrieves previous feedback for a specific seat and user.
* @param seatId Seat identifier
* @param historicalFeedback Historical feedback data
* @returns Previous feedback for the seat and user
*/
export function getPreviousFeedback(seatId, historicalFeedback) {
    return historicalFeedback.find(feedback => feedback.seatId === seatId);
}
/**
 * Finds similar seats based on seat properties and previous feedback.
 * @param seat Seat to compare
 * @param recommendedSeats List of recommended seats
 * @returns List of similar seats
 */
export function getSimilarSeats(seat, recommendedSeats) {
    return recommendedSeats.filter(s => s.id !== seat.id &&
        s.isWindow === seat.isWindow &&
        s.isAisle === seat.isAisle &&
        s.hasExtraLegroom === seat.hasExtraLegroom);
}

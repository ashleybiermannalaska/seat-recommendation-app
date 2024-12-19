import { FeedbackData, Seat, UserPreferences } from "./types";

/**
 * Recommends the best available seats based on user preferences and historical feedback data.
 * @param userPreferences User preferences for seat selection
 * @param availableSeats List of available seats
 * @param historicalFeedback Historical feedback data
 * @param seatNumber Seat number to get previous opinion on
 * @returns List of recommended seats
 */
export function recommendSeats(userPreferences: UserPreferences, availableSeats: Seat[], historicalFeedback: FeedbackData[], seatNumber: string): Seat[] {
  const filteredSeats = availableSeats.filter(seat => 
      (userPreferences.windowSeat && seat.isWindow) ||
      (userPreferences.aisleSeat && seat.isAisle) ||
      (userPreferences.extraLegroom && seat.hasExtraLegroom)
  );
  const rankedSeats = rankSeats(filteredSeats, historicalFeedback);

  const sortedSeats = sortSeatsByPreferencesAndFeedback(rankedSeats, userPreferences, historicalFeedback);

  return sortedSeats.map(seat => {
      const similarSeats = getSimilarSeats(seat, sortedSeats);
      const previousFeedback = getPreviousFeedback(seat.id, historicalFeedback);
      return {
          ...seat,
          similarSeats: similarSeats.map(s => s.id),
          previousFeedback: previousFeedback ? {
              rating: previousFeedback.rating,
              comments: previousFeedback.comments
          } : null,
          previousOpinionOnSeatInQuestion: seatNumber === seat.id ? previousFeedback : null
      };
  });
}

/**
 * Sorts seats based on user preferences and historical feedback.
 * Seats with more matching preferences are ranked higher.
 * If the match count is the same, seats with previous feedback are ranked higher.
 * 
 * @param {Seat[]} seats - List of seats to be sorted.
 * @param {UserPreferences} userPreferences - User preferences for seat selection.
 * @param {FeedbackData[]} historicalFeedback - Historical feedback data.
 * @returns {Seat[]} Sorted list of seats.
 */
function sortSeatsByPreferencesAndFeedback(seats: Seat[], userPreferences: UserPreferences, historicalFeedback: FeedbackData[]): Seat[] {
  return seats.sort((a, b) => {
    const aMatchCount = (a.isWindow === userPreferences.windowSeat ? 1 : 0) +
      (a.isAisle === userPreferences.aisleSeat ? 1 : 0) +
      (a.hasExtraLegroom === userPreferences.extraLegroom ? 1 : 0);

    const bMatchCount = (b.isWindow === userPreferences.windowSeat ? 1 : 0) +
      (b.isAisle === userPreferences.aisleSeat ? 1 : 0) +
      (b.hasExtraLegroom === userPreferences.extraLegroom ? 1 : 0);

    if (bMatchCount !== aMatchCount) {
      return bMatchCount - aMatchCount;
    }

    const aHasFeedback = getPreviousFeedback(a.id, historicalFeedback) ? 1 : 0;
    const bHasFeedback = getPreviousFeedback(b.id, historicalFeedback) ? 1 : 0;
    return bHasFeedback - aHasFeedback;
  });
}

/**
 * Ranks the seats based on historical feedback data.
 * @param seats List of seats to be ranked
 * @param historicalFeedback Historical feedback data
 * @returns List of ranked seats
 */
export function rankSeats(seats: Seat[], historicalFeedback: FeedbackData[]): Seat[] {
  return seats.sort((a, b) =>
      countPositiveFeedback(b, historicalFeedback) - countPositiveFeedback(a, historicalFeedback));
}

/**
* Counts positive feedback for a specific seat and user.
* @param seat Seat to count feedback for
* @param historicalFeedback Historical feedback data
* @returns Number of positive feedbacks
*/
export function countPositiveFeedback(seat: Seat, historicalFeedback: FeedbackData[]): number {
  return historicalFeedback.filter(feedback => feedback.seatId === seat.id && feedback.rating > 4).length;
}

/**
* Retrieves previous feedback for a specific seat and user.
* @param seatId Seat identifier
* @param historicalFeedback Historical feedback data
* @returns Previous feedback for the seat and user
*/
export function getPreviousFeedback(seatId: string, historicalFeedback: FeedbackData[]): FeedbackData | undefined {
  return historicalFeedback.find(feedback => feedback.seatId === seatId);
}

/**
 * Finds similar seats based on seat properties and previous feedback.
 * @param seat Seat to compare
 * @param recommendedSeats List of recommended seats
 * @returns List of similar seats
 */
export function getSimilarSeats(seat: Seat, recommendedSeats: Seat[]): Seat[] {
  return recommendedSeats.filter(s => 
      s.id !== seat.id && 
      s.isWindow === seat.isWindow && 
      s.isAisle === seat.isAisle && 
      s.hasExtraLegroom === seat.hasExtraLegroom 
  );
}

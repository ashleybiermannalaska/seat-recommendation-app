// This code was generated by an Alaska Airlines operated instance of Azure OpenAI using the GPT 4o model.

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { UserPreferences, Seat, FeedbackData } from './types';

// Define the JSON file for the database
interface DatabaseSchema {
    users: { id: number, preferences: UserPreferences, feedback: FeedbackData[] }[];
    seats: Seat[];
}
const db = new Low<DatabaseSchema>(new JSONFile('db.json'), {users: [], seats: []});

// Load the database
await db.read();

// Get the userId from command-line arguments
const userId = parseInt(process.argv[2]);

if (!userId) {
    console.error('Please provide a userId as a command-line argument.');
    process.exit(1);
}

/**
 * Recommends the best available seats based on user preferences and historical feedback data.
 * @param userPreferences User preferences for seat selection
 * @param availableSeats List of available seats
 * @param historicalFeedback Historical feedback data
 * @param userId User identifier
 * @returns List of recommended seats
 */
function recommendSeats(userPreferences: UserPreferences, availableSeats: any[], historicalFeedback: FeedbackData[], userId: number) {
    const filteredSeats = availableSeats.filter(seat => 
        (userPreferences.windowSeat && seat.isWindow) ||
        (userPreferences.aisleSeat && seat.isAisle) ||
        (userPreferences.extraLegroom && seat.hasExtraLegroom)
    );
    const rankedSeats = rankSeats(filteredSeats, historicalFeedback, userId);
    return rankedSeats.sort((a, b) => {
        const aHasFeedback = getPreviousFeedback(a.id, userId, historicalFeedback) ? 1 : 0;
        const bHasFeedback = getPreviousFeedback(b.id, userId, historicalFeedback) ? 1 : 0;
        return bHasFeedback - aHasFeedback;
    });
}

/**
 * Ranks the seats based on historical feedback data.
 * @param seats List of seats to be ranked
 * @param historicalFeedback Historical feedback data
 * @param userId User identifier
 * @returns List of ranked seats
 */
function rankSeats(seats: Seat[], historicalFeedback: FeedbackData[], userId: number): Seat[] {
    return seats.sort((a, b) =>
        countPositiveFeedback(b, historicalFeedback, userId) - countPositiveFeedback(a, historicalFeedback, userId));
}

/**
 * Counts positive feedback for a specific seat and user.
 * @param seat Seat to count feedback for
 * @param historicalFeedback Historical feedback data
 * @param userId User identifier
 * @returns Number of positive feedbacks
 */
function countPositiveFeedback(seat: Seat, historicalFeedback: FeedbackData[], userId: number): number {
    return historicalFeedback.filter(feedback => feedback.seatId === seat.id && feedback.userId === userId && feedback.rating > 4).length;
}

/**
 * Retrieves previous feedback for a specific seat and user.
 * @param seatId Seat identifier
 * @param userId User identifier
 * @param historicalFeedback Historical feedback data
 * @returns Previous feedback for the seat and user
 */
function getPreviousFeedback(seatId: number, userId: number, historicalFeedback: FeedbackData[]): FeedbackData | undefined {
    return historicalFeedback.find(feedback => feedback.seatId === seatId);
}

/**
 * Finds similar seats based on seat properties and previous feedback.
 * @param seat Seat to compare
 * @param recommendedSeats List of recommended seats
 * @returns List of similar seats
 */
function getSimilarSeats(seat: Seat, recommendedSeats: Seat[]): Seat[] {
    return recommendedSeats.filter(s => 
        s.id !== seat.id && 
        s.isWindow === seat.isWindow && 
        s.isAisle === seat.isAisle && 
        s.hasExtraLegroom === seat.hasExtraLegroom 
    );
}

// Main function to run the app
/**
 * @param userId User identifier
 */
async function main(userId: number) {
    if (!db.data) {
        throw new Error('Database not loaded');
    }
    const user = db.data.users.find((user: any) => user.id === userId);
    const userPreferences: UserPreferences = user!.preferences;
    const historicalFeedback: FeedbackData[] = user!.feedback;
    const availableSeats: Seat[] = db.data.seats;

    const recommendedSeats = recommendSeats(userPreferences, availableSeats, historicalFeedback, userId);

    console.log('Recommended Seats:');
    recommendedSeats.forEach(seat => {
        console.log(`Seat ID: ${seat.id}, Window: ${seat.isWindow}, Aisle: ${seat.isAisle}, Extra Legroom: ${seat.hasExtraLegroom}`);
        const previousFeedback = getPreviousFeedback(seat.id, userId, historicalFeedback);
        if (previousFeedback) {
            console.log(`Previous Feedback for Seat ID ${seat.id}: Rating: ${previousFeedback.rating}, Comments: ${previousFeedback.comments}`);
        }
        const similarSeats = getSimilarSeats(seat, recommendedSeats);
        if (similarSeats.length > 0) {
            const similarSeatIds = similarSeats.map(similarSeat => similarSeat.id).join(', ');
            console.log(`Other seats similar to this seat: Seat ID: ${similarSeatIds}`);
        }
    });
}

main(userId);
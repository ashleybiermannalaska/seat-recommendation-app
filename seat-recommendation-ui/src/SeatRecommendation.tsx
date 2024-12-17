import React, { useState } from "react";
import axios from "axios";
// @ts-ignore
import UserIntakeForm from "./UserIntakeForm.tsx";

interface Seat {
  id: number;
  isWindow: boolean;
  isAisle: boolean;
  hasExtraLegroom: boolean;
  previousFeedback?: FeedbackData;
  similarSeats?: number[];
  previousOpinionOnSeatInQuestion: FeedbackData | null;
}

interface FeedbackData {
  seatId: number;
  userId: number;
  rating: number;
  comments: string;
}

const SeatRecommendation: React.FC = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [seatInQuestion, setSeatInQuestion] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userId && seatInQuestion) {
      axios
        .get(
          `/api/recommendations?userId=${userId}&seatNumber=${seatInQuestion}`
        )
        .then((response) => {
          setSeats(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the recommendations!",
            error
          );
        });
    } else {
      alert("Please enter both User ID and Seat Number.");
    }
  };

  const seatInQuestionFeedback = seats.find(
    (seat) => seat.id === parseInt(seatInQuestion)
  );

  return (
    <div>
      <UserIntakeForm
        seatNumber={seatInQuestion}
        userId={userId}
        onSeatChange={setSeatInQuestion}
        onUserIdChange={setUserId}
        onSubmit={onFormSubmit}
      />
      <div>
        <h1>Your Previous Opinions on Seat</h1>
        {seatInQuestionFeedback ? (
          seatInQuestionFeedback.previousOpinionOnSeatInQuestion ? (
            <div key={seatInQuestionFeedback.id}>
              <div>
                Seat Number:{" "}
                {seatInQuestionFeedback.previousOpinionOnSeatInQuestion.seatId}
              </div>
              <div>
                Rating:{" "}
                {seatInQuestionFeedback.previousOpinionOnSeatInQuestion.rating}
              </div>
              <div>
                Comments:{" "}
                {
                  seatInQuestionFeedback.previousOpinionOnSeatInQuestion
                    .comments
                }
              </div>
            </div>
          ) : (
            <div key={seatInQuestionFeedback.id}>
              No previous feedback for this seat
            </div>
          )
        ) : (
          <div>No previous feedback for this seat</div>
        )}
        <h1>Recommended Seats:</h1>
        <ul>
          {seats.map((seat) => (
            <li key={seat.id}>
              <div>Seat ID: {seat.id}</div>
              <div>Window: {seat.isWindow ? "Yes" : "No"}</div>
              <div>Aisle: {seat.isAisle ? "Yes" : "No"}</div>
              <div>Extra Legroom: {seat.hasExtraLegroom ? "Yes" : "No"}</div>
              {seat.previousFeedback && (
                <div>
                  Previous Feedback: Rating: {seat.previousFeedback.rating},
                  Comments: {seat.previousFeedback.comments}
                </div>
              )}
              {seat.similarSeats && (
                <div>
                  Other seats similar to this seat: Seat ID:{" "}
                  {seat.similarSeats.map((id) => id).join(", ")}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeatRecommendation;

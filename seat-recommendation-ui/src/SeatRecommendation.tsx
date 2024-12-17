import React, { useState } from "react";
import axios from "axios";
// @ts-ignore
import UserIntakeForm from "./UserIntakeForm.tsx";
// @ts-ignore
import UserPreferencesForm, { UserPreferences } from "./UserPreferencesForm.tsx";
import { FeedbackData, SeatForUI as Seat } from "../../types.js";

const SeatRecommendation: React.FC = () => {
  // UserIntakeForm.tsx
  const [seats, setSeats] = useState<Seat[]>([]);
  const [seatInQuestion, setSeatInQuestion] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  // UserPreferencesForm.tsx
  const [userIdForPreferences, setUserIdForPreferences] = useState<string>("");
  const [preferences, setPreferences] = useState<UserPreferences>({
    windowSeat: false,
    aisleSeat: false,
    extraLegroom: false,
  });
  const [feedback, setFeedback] = useState<FeedbackData>({
    seatId: 0,
    rating: 0,
    comments: "",
  });  

  const handleUserIntakeFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userId && seatInQuestion) {
      axios
        .get(
          `/api/recommendations?userId=${userId}&seatNumber=${seatInQuestion}`
        )
        .then((response) => {
          setSeats(response.data.recommendedSeats);
          setPreferences(response.data.preferences);
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


  const handleUserPreferencesFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userIdForPreferences) {
      axios
        .post("/api/preferences", { userId: userIdForPreferences, preferences, feedback })
        .then((response) => {
          console.log(response.data);
          alert("Preferences updated successfully!");
        })
        .catch((error) => {
          console.error("There was an error updating the preferences!", error);
          alert("There was an error updating the preferences.");
        });
    } else {
      alert("Please enter User ID.");
    }
  };

  // Other code
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
        onSubmit={handleUserIntakeFormSubmit}
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
      <UserPreferencesForm
        userIdForPreferences={userIdForPreferences}
        preferences={preferences}
        feedback={feedback}
        onUserIdForPreferencesChange={setUserIdForPreferences}
        onPreferencesChange={setPreferences}
        onFeedbackChange={setFeedback}
        onSubmit={handleUserPreferencesFormSubmit}
      />
    </div>
  );
};

export default SeatRecommendation;

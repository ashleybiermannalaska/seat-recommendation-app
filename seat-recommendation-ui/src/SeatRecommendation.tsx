import React, { useState } from "react";
import axios from "axios";
// @ts-ignore
import UserIntakeForm from "./UserIntakeForm.tsx";
// @ts-ignore
import UserPreferencesForm, { UserPreferences } from "./UserPreferencesForm.tsx";
// @ts-ignore
import AddSeatFeedbackForm from "./AddSeatFeedbackForm.tsx";
import { FeedbackData, SeatForUI as Seat } from "../../types.js";

const SeatRecommendation: React.FC = () => {
  // UserIntakeForm.tsx
  const [seats, setSeats] = useState<Seat[]>([]);
  const [seatInQuestion, setSeatInQuestion] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  /// AddSeatFeedbackForm.tsx
  const [feedbackForSeat, setFeedbackForSeat] = useState<FeedbackData>();
  const [feedback, setFeedback] = useState<FeedbackData>({
    seatId: "",
    rating: 0,
    comments: "",
  });

  // UserPreferencesForm.tsx
  const [preferences, setPreferences] = useState<UserPreferences>({
    windowSeat: false,
    aisleSeat: false,
    extraLegroom: false,
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
          setFeedbackForSeat(response.data.feedbackForSeat);
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
    if (userId) {
      axios
        .post("/api/preferences", { userId, preferences })
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

  const handleUserFeedbackFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userId) {
      axios
        .post("/api/feedback", { userId, feedback })
        .then((response) => {
          console.log(response.data);
          alert("Feedback updated successfully!");
        })
        .catch((error) => {
          console.error("There was an error updating the feedback!", error);
          alert("There was an error updating the feedback.");
        });
    } else {
      alert("Please enter User ID.");
    }
  };

  return (
    <div className="seat-recommendation-container">
      <div className="forms-container">
        <UserIntakeForm
          userId={userId}
          seatNumber={seatInQuestion}
          onUserIdChange={setUserId}
          onSeatChange={setSeatInQuestion}
          onSubmit={handleUserIntakeFormSubmit}
          />
        <AddSeatFeedbackForm
          userId={userId}
          feedback={feedback}
          onUserIdChange={setUserId}
          onFeedbackChange={setFeedback}
          onSubmit={handleUserFeedbackFormSubmit}
        />
      </div>
      <div className="content-container">
        {/* @ts-ignore */}
        <auro-header display="600">Your Previous Opinions on Seat</auro-header>
        {feedbackForSeat ? (
          <div key={feedbackForSeat.seatId}>
            <div>Seat Number: {feedbackForSeat.seatId}</div>
            <div>Rating: {feedbackForSeat.rating}</div>
            <div>Comments: {feedbackForSeat.comments}</div>
          </div>
        ) : (
          <div>No previous feedback for this seat</div>
        )}
        {/* @ts-ignore */}
        <auro-header display="600">Recommended Seats</auro-header>
        <ul>
          {seats.map((seat) => (
            <li key={seat.id}>
              <div>{seat.id}</div>
              <div>Window: {seat.isWindow ? "Yes" : "No"}</div>
              <div>Aisle: {seat.isAisle ? "Yes" : "No"}</div>
              <div>Extra Legroom: {seat.hasExtraLegroom ? "Yes" : "No"}</div>
              {seat.previousFeedback && (
                <div>
                  Your previous rating of this seat: {seat.previousFeedback.rating},
                  Comments: {seat.previousFeedback.comments}
                </div>
              )}
              {seat.similarSeats && (
                <div>
                  Other seats similar to this seat:{" "}
                  {seat.similarSeats.map((id) => id).join(", ")}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="forms-container">
        <UserPreferencesForm
          userId={userId}
          preferences={preferences}
          onUserIdChange={setUserId}
          onPreferencesChange={setPreferences}
          onSubmit={handleUserPreferencesFormSubmit}
        />
      </div>
    </div>
  );
};

export default SeatRecommendation;

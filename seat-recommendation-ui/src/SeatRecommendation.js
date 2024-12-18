import React, { useState } from "react";
import axios from "axios";
// @ts-ignore
import UserIntakeForm from "./UserIntakeForm.tsx";
// @ts-ignore
import UserPreferencesForm from "./UserPreferencesForm.tsx";
const SeatRecommendation = () => {
    // UserIntakeForm.tsx
    const [seats, setSeats] = useState([]);
    const [seatInQuestion, setSeatInQuestion] = useState("");
    const [userId, setUserId] = useState("");
    /// hmm? other?
    const [feedbackForSeat, setFeedbackForSeat] = useState({
        seatId: 0,
        rating: 0,
        comments: "",
    });
    ;
    // UserPreferencesForm.tsx
    const [preferences, setPreferences] = useState({
        windowSeat: false,
        aisleSeat: false,
        extraLegroom: false,
    });
    const [feedback, setFeedback] = useState({
        seatId: 0,
        rating: 0,
        comments: "",
    });
    const handleUserIntakeFormSubmit = (event) => {
        event.preventDefault();
        if (userId && seatInQuestion) {
            axios
                .get(`/api/recommendations?userId=${userId}&seatNumber=${seatInQuestion}`)
                .then((response) => {
                setSeats(response.data.recommendedSeats);
                setPreferences(response.data.preferences);
                setFeedbackForSeat(response.data.feedbackForSeat);
                console.log("feedbackFroSeat", response.data.feedbackForSeat);
            })
                .catch((error) => {
                console.error("There was an error fetching the recommendations!", error);
            });
        }
        else {
            alert("Please enter both User ID and Seat Number.");
        }
    };
    const handleUserPreferencesFormSubmit = (event) => {
        event.preventDefault();
        if (userId) {
            axios
                .post("/api/preferences", { userId, preferences, feedback })
                .then((response) => {
                console.log(response.data);
                alert("Preferences updated successfully!");
            })
                .catch((error) => {
                console.error("There was an error updating the preferences!", error);
                alert("There was an error updating the preferences.");
            });
        }
        else {
            alert("Please enter User ID.");
        }
    };
    // Other code
    const seatInQuestionInRecommendedSeats = seats.find((seat) => seat.id === parseInt(seatInQuestion));
    // TODO: still show the feedback EVEN if the seat in question does not apppear in the recommendations
    return (React.createElement("div", { className: "seat-recommendation-container" },
        React.createElement("div", { className: "forms-container" },
            React.createElement(UserIntakeForm, { seatNumber: seatInQuestion, userId: userId, onSeatChange: setSeatInQuestion, onUserIdChange: setUserId, onSubmit: handleUserIntakeFormSubmit })),
        React.createElement("div", { className: "content-container" },
            React.createElement("h1", null, "Your Previous Opinions on Seat"),
            seatInQuestionInRecommendedSeats ? (seatInQuestionInRecommendedSeats.previousOpinionOnSeatInQuestion ? (React.createElement("div", { key: seatInQuestionInRecommendedSeats.id },
                React.createElement("div", null,
                    "Seat Number:",
                    " ",
                    seatInQuestionInRecommendedSeats.previousOpinionOnSeatInQuestion.seatId),
                React.createElement("div", null,
                    "Rating:",
                    " ",
                    seatInQuestionInRecommendedSeats.previousOpinionOnSeatInQuestion.rating),
                React.createElement("div", null,
                    "Comments:",
                    " ",
                    seatInQuestionInRecommendedSeats.previousOpinionOnSeatInQuestion
                        .comments))) : (React.createElement("div", { key: seatInQuestionInRecommendedSeats.id }, "No previous feedback for this seat"))) : (React.createElement("div", null, "No previous feedback for this seat")),
            React.createElement("h1", null, "Recommended Seats:"),
            React.createElement("ul", null, seats.map((seat) => (React.createElement("li", { key: seat.id },
                React.createElement("div", null,
                    "Seat ID: ",
                    seat.id),
                React.createElement("div", null,
                    "Window: ",
                    seat.isWindow ? "Yes" : "No"),
                React.createElement("div", null,
                    "Aisle: ",
                    seat.isAisle ? "Yes" : "No"),
                React.createElement("div", null,
                    "Extra Legroom: ",
                    seat.hasExtraLegroom ? "Yes" : "No"),
                seat.previousFeedback && (React.createElement("div", null,
                    "Previous Feedback: Rating: ",
                    seat.previousFeedback.rating,
                    ", Comments: ",
                    seat.previousFeedback.comments)),
                seat.similarSeats && (React.createElement("div", null,
                    "Other seats similar to this seat: Seat ID:",
                    " ",
                    seat.similarSeats.map((id) => id).join(", ")))))))),
        React.createElement("div", { className: "forms-container" },
            React.createElement(UserPreferencesForm, { userIdForPreferences: userId, preferences: preferences, feedback: feedback, onUserIdForPreferencesChange: setUserId, onPreferencesChange: setPreferences, onFeedbackChange: setFeedback, onSubmit: handleUserPreferencesFormSubmit }))));
};
export default SeatRecommendation;

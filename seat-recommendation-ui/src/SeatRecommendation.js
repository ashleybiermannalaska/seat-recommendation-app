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
    const handleUserIntakeFormSubmit = (event) => {
        event.preventDefault();
        if (userId && seatInQuestion) {
            axios
                .get(`/api/recommendations?userId=${userId}&seatNumber=${seatInQuestion}`)
                .then((response) => {
                setSeats(response.data);
            })
                .catch((error) => {
                console.error("There was an error fetching the recommendations!", error);
            });
        }
        else {
            alert("Please enter both User ID and Seat Number.");
        }
    };
    // UserPreferencesForm.tsx
    const [userIdForPreferences, setUserIdForPreferences] = useState("");
    const [preferences, setPreferences] = useState({
        windowSeat: false,
        aisleSeat: false,
        extraLegroom: false,
    });
    const handleUserPreferencesFormSubmit = (event) => {
        event.preventDefault();
        if (userIdForPreferences) {
            axios
                .post("/api/preferences", { userId: userIdForPreferences, preferences })
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
    const seatInQuestionFeedback = seats.find((seat) => seat.id === parseInt(seatInQuestion));
    return (React.createElement("div", null,
        React.createElement(UserIntakeForm, { seatNumber: seatInQuestion, userId: userId, onSeatChange: setSeatInQuestion, onUserIdChange: setUserId, onSubmit: handleUserIntakeFormSubmit }),
        React.createElement("div", null,
            React.createElement("h1", null, "Your Previous Opinions on Seat"),
            seatInQuestionFeedback ? (seatInQuestionFeedback.previousOpinionOnSeatInQuestion ? (React.createElement("div", { key: seatInQuestionFeedback.id },
                React.createElement("div", null,
                    "Seat Number:",
                    " ",
                    seatInQuestionFeedback.previousOpinionOnSeatInQuestion.seatId),
                React.createElement("div", null,
                    "Rating:",
                    " ",
                    seatInQuestionFeedback.previousOpinionOnSeatInQuestion.rating),
                React.createElement("div", null,
                    "Comments:",
                    " ",
                    seatInQuestionFeedback.previousOpinionOnSeatInQuestion
                        .comments))) : (React.createElement("div", { key: seatInQuestionFeedback.id }, "No previous feedback for this seat"))) : (React.createElement("div", null, "No previous feedback for this seat")),
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
        React.createElement(UserPreferencesForm, { userIdForPreferences: userIdForPreferences, preferences: preferences, onUserIdForPreferencesChange: setUserIdForPreferences, onPreferencesChange: setPreferences, onSubmit: handleUserPreferencesFormSubmit })));
};
export default SeatRecommendation;

import React, { useState } from "react";
import axios from "axios";
// @ts-ignore
import UserIntakeForm from "./UserIntakeForm.tsx";
// @ts-ignore
import UserPreferencesForm from "./UserPreferencesForm.tsx";
// @ts-ignore
import AddSeatFeedbackForm from "./AddSeatFeedbackForm.tsx";
const SeatRecommendation = () => {
    // UserIntakeForm.tsx
    const [seats, setSeats] = useState([]);
    const [seatInQuestion, setSeatInQuestion] = useState("");
    const [userId, setUserId] = useState("");
    /// AddSeatFeedbackForm.tsx
    const [feedbackForSeat, setFeedbackForSeat] = useState();
    const [feedback, setFeedback] = useState({
        seatId: 0,
        rating: 0,
        comments: "",
    });
    // UserPreferencesForm.tsx
    const [preferences, setPreferences] = useState({
        windowSeat: false,
        aisleSeat: false,
        extraLegroom: false,
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
            })
                .catch((error) => {
                console.error("There was an error fetching the recommendations!", error);
            });
        }
        else {
            alert("Please enter both User ID and Seat Number.");
        }
    };
    // TODO: sep preferences updates and feedback updates. may also need a different endpoint for feedback
    const handleUserPreferencesFormSubmit = (event) => {
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
        }
        else {
            alert("Please enter User ID.");
        }
    };
    const handleUserFeedbackFormSubmit = (event) => {
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
        }
        else {
            alert("Please enter User ID.");
        }
    };
    return (React.createElement("div", { className: "seat-recommendation-container" },
        React.createElement("div", { className: "forms-container" },
            React.createElement(UserIntakeForm, { userId: userId, seatNumber: seatInQuestion, onUserIdChange: setUserId, onSeatChange: setSeatInQuestion, onSubmit: handleUserIntakeFormSubmit }),
            React.createElement(AddSeatFeedbackForm, { userId: userId, seatNumber: seatInQuestion, feedback: feedback, onUserIdChange: setUserId, onSeatChange: setSeatInQuestion, onFeedbackChange: setFeedback, onSubmit: handleUserFeedbackFormSubmit })),
        React.createElement("div", { className: "content-container" },
            React.createElement("h1", null, "Your Previous Opinions on Seat"),
            feedbackForSeat ? (React.createElement("div", { key: feedbackForSeat.seatId },
                React.createElement("div", null,
                    "Seat Number: ",
                    feedbackForSeat.seatId),
                React.createElement("div", null,
                    "Rating: ",
                    feedbackForSeat.rating),
                React.createElement("div", null,
                    "Comments: ",
                    feedbackForSeat.comments))) : (React.createElement("div", null, "No previous feedback for this seat")),
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
            React.createElement(UserPreferencesForm, { userId: userId, preferences: preferences, onUserIdChange: setUserId, onPreferencesChange: setPreferences, onSubmit: handleUserPreferencesFormSubmit }))));
};
export default SeatRecommendation;

import React, { useState } from "react";
import axios from "axios";
// @ts-ignore
import UserIntakeForm from "./UserIntakeForm.tsx";
const SeatRecommendation = () => {
    const [seats, setSeats] = useState([]);
    const [seatInQuestion, setSeatInQuestion] = useState("");
    const [userId, setUserId] = useState("");
    const onFormSubmit = (event) => {
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
    return (React.createElement("div", null,
        React.createElement(UserIntakeForm, { seatNumber: seatInQuestion, userId: userId, onSeatChange: setSeatInQuestion, onUserIdChange: setUserId, onSubmit: onFormSubmit }),
        React.createElement("div", null,
            React.createElement("h1", null,
                "Your Previous Opinions on Seat ",
                seatInQuestion),
            seats.map((seat) => {
                if (seat.previousOpinionOnSeatInQuestion) {
                    return (React.createElement("div", { key: seat.id },
                        React.createElement("div", null,
                            "Rating: ",
                            seat.previousOpinionOnSeatInQuestion.rating),
                        React.createElement("div", null,
                            "Comments: ",
                            seat.previousOpinionOnSeatInQuestion.comments)));
                }
                return null;
            }),
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
                    seat.similarSeats.map((id) => id).join(", "))))))))));
};
export default SeatRecommendation;

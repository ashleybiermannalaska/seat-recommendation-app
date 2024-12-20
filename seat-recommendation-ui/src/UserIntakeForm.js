import React from "react";
const UserIntakeForm = ({ seatNumber, userId, onSeatChange, onUserIdChange, onSubmit, }) => {
    return (React.createElement("form", { onSubmit: onSubmit },
        React.createElement("div", null,
            React.createElement("auro-header", { display: "500" }, "Get Recommendations and Preferences:"),
            React.createElement("label", { htmlFor: "userId" }, "User ID:"),
            React.createElement("input", { type: "text", id: "userId", value: userId || "", onChange: (event) => onUserIdChange(event.target.value) }),
            React.createElement("label", { htmlFor: "seatNumber" }, "Seat Number:"),
            React.createElement("input", { type: "text", id: "seatNumber", value: seatNumber || "", onChange: (event) => onSeatChange(event.target.value) })),
        React.createElement("auro-button", { onclick: onSubmit }, "Get Recommendations")));
};
export default UserIntakeForm;

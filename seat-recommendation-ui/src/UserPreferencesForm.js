import React from "react";
import "./UserPreferencesForm.css";
const UserPreferencesForm = ({ userIdForPreferences, preferences, feedback, onUserIdForPreferencesChange, onPreferencesChange, onFeedbackChange, onSubmit, }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "Update Your Preferences"),
        React.createElement("form", { onSubmit: onSubmit },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "userIdForPreferences" }, "User ID:"),
                React.createElement("input", { type: "text", id: "userIdForPreferences", value: userIdForPreferences, onChange: (e) => onUserIdForPreferencesChange(e.target.value) })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Window Seat"),
                React.createElement("input", { type: "checkbox", name: "windowSeat", checked: preferences.windowSeat, onChange: (e) => onPreferencesChange(Object.assign(Object.assign({}, preferences), { windowSeat: e.target.checked })) })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Aisle Seat"),
                React.createElement("input", { type: "checkbox", name: "aisleSeat", checked: preferences.aisleSeat, onChange: (e) => onPreferencesChange(Object.assign(Object.assign({}, preferences), { aisleSeat: e.target.checked })) })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Extra Legroom"),
                React.createElement("input", { type: "checkbox", name: "extraLegroom", checked: preferences.extraLegroom, onChange: (e) => onPreferencesChange(Object.assign(Object.assign({}, preferences), { extraLegroom: e.target.checked })) })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "seatNumber" }, "Seat Number:"),
                React.createElement("input", { type: "number", id: "seatNumber", onChange: (e) => onFeedbackChange(Object.assign(Object.assign({}, feedback), { seatId: parseInt(e.target.value) })) })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "rating" }, "Rating:"),
                React.createElement("input", { type: "number", id: "rating", min: "0", max: "5", step: "1", onChange: (e) => onFeedbackChange(Object.assign(Object.assign({}, feedback), { rating: parseInt(e.target.value) })) })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "comments" }, "Comments:"),
                React.createElement("input", { type: "text", id: "comments", onChange: (e) => onFeedbackChange(Object.assign(Object.assign({}, feedback), { comments: e.target.value })) })),
            React.createElement("button", { type: "submit" }, "Update preferences"))));
};
export default UserPreferencesForm;

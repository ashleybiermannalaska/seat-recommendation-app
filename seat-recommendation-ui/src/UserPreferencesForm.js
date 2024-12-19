import React from "react";
import "./UserPreferencesForm.css";
const UserPreferencesForm = ({ userId, preferences, onUserIdChange, onPreferencesChange, onSubmit, }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("auro-header", { display: "500" }, "Update Your Preferences"),
        React.createElement("form", { onSubmit: onSubmit },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "userId" }, "User ID:"),
                React.createElement("input", { type: "text", id: "userId", value: userId, onChange: (e) => onUserIdChange(e.target.value) })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Window Seat"),
                React.createElement("input", { type: "checkbox", name: "windowSeat", checked: preferences.windowSeat, onChange: (e) => onPreferencesChange(Object.assign(Object.assign({}, preferences), { windowSeat: e.target.checked })) })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Aisle Seat"),
                React.createElement("input", { type: "checkbox", name: "aisleSeat", checked: preferences.aisleSeat, onChange: (e) => onPreferencesChange(Object.assign(Object.assign({}, preferences), { aisleSeat: e.target.checked })) })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Extra Legroom"),
                React.createElement("input", { type: "checkbox", name: "extraLegroom", checked: preferences.extraLegroom, onChange: (e) => onPreferencesChange(Object.assign(Object.assign({}, preferences), { extraLegroom: e.target.checked })) })),
            React.createElement("auro-button", { onclick: onSubmit }, "Update preferences"))));
};
export default UserPreferencesForm;

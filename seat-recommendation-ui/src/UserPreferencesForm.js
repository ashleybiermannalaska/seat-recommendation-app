import React from "react";
const UserPreferencesForm = ({ userIdForPreferences, preferences, onUserIdForPreferencesChange, onPreferencesChange, onSubmit, }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "User Preferences Form"),
        React.createElement("form", { onSubmit: onSubmit },
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "userId" }, "User ID:"),
                React.createElement("input", { type: "text", id: "userId", value: userIdForPreferences, onChange: (e) => onUserIdForPreferencesChange(e.target.value) })),
            React.createElement("div", null,
                React.createElement("label", null,
                    React.createElement("input", { type: "checkbox", name: "windowSeat", checked: preferences.windowSeat, onChange: (e) => onPreferencesChange(Object.assign(Object.assign({}, preferences), { windowSeat: e.target.checked })) }),
                    "Window Seat")),
            React.createElement("div", null,
                React.createElement("label", null,
                    React.createElement("input", { type: "checkbox", name: "aisleSeat", checked: preferences.aisleSeat, onChange: (e) => onPreferencesChange(Object.assign(Object.assign({}, preferences), { aisleSeat: e.target.checked })) }),
                    "Aisle Seat")),
            React.createElement("div", null,
                React.createElement("label", null,
                    React.createElement("input", { type: "checkbox", name: "extraLegroom", checked: preferences.extraLegroom, onChange: (e) => onPreferencesChange(Object.assign(Object.assign({}, preferences), { extraLegroom: e.target.checked })) }),
                    "Extra Legroom")),
            React.createElement("button", { type: "submit" }, "Submit"))));
};
export default UserPreferencesForm;

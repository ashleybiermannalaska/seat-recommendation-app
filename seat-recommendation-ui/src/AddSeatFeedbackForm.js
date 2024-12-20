import React from "react";
const AddSeatFeedbackForm = ({ userId, feedback, onUserIdChange, onFeedbackChange, onSubmit, }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("auro-header", { display: "500" }, "Change or Add Seat Feedback"),
        React.createElement("form", { onSubmit: onSubmit },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "userId" }, "User ID:"),
                React.createElement("input", { type: "text", id: "userId", value: userId, onChange: (e) => onUserIdChange(e.target.value) })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "seatNumber" }, "Seat Number:"),
                React.createElement("input", { type: "text", id: "seatNumber", onChange: (e) => {
                        onFeedbackChange(Object.assign(Object.assign({}, feedback), { seatId: e.target.value }));
                    } })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "rating" }, "Rating:"),
                React.createElement("input", { type: "number", id: "rating", min: "0", max: "5", step: "1", onChange: (e) => onFeedbackChange(Object.assign(Object.assign({}, feedback), { rating: parseInt(e.target.value) })) })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "comments" }, "Comments:"),
                React.createElement("input", { type: "text", id: "comments", onChange: (e) => onFeedbackChange(Object.assign(Object.assign({}, feedback), { comments: e.target.value })) })),
            React.createElement("auro-button", { onclick: onSubmit }, "Update seat feedback"))));
};
export default AddSeatFeedbackForm;

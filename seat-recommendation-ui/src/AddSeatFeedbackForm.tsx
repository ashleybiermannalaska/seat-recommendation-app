import React from "react";
import { AddSeatFeedbackFormProps } from "../../types";

const AddSeatFeedbackForm: React.FC<AddSeatFeedbackFormProps> = ({
  userId,
  seatNumber,
  feedback,
  onUserIdChange,
  onSeatChange,
  onFeedbackChange,
  onSubmit,
}) => {
  return (
    <>
    {/* @ts-ignore */}
      <auro-header display="500">Change or Add Seat Feedback</auro-header>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => onUserIdChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="seatNumber">Seat Number:</label>
          <input
            type="number"
            id="seatNumber"
            // value={seatNumber}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              // onSeatChange(value);
              onFeedbackChange({
                ...feedback,
                seatId: value,
              });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            min="0"
            max="5"
            step="1"
            onChange={(e) =>
              onFeedbackChange({
                ...feedback,
                rating: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <input
            type="text"
            id="comments"
            onChange={(e) =>
              onFeedbackChange({
                ...feedback,
                comments: e.target.value,
              })
            }
          />
        </div>
        {/* @ts-ignore */}
        <auro-button onclick={onSubmit}>Update seat feedback</auro-button>
      </form>
    </>
  );
};

export default AddSeatFeedbackForm;

import React from "react";
import "./UserPreferencesForm.css";
import { UserPreferencesFormProps } from "../../types";

const UserPreferencesForm: React.FC<UserPreferencesFormProps> = ({
  userIdForPreferences,
  preferences,
  feedback,
  onUserIdForPreferencesChange,
  onPreferencesChange,
  onFeedbackChange,
  onSubmit,
}) => {
  return (
    <>
      <h1>Update Your Preferences</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="userIdForPreferences">User ID:</label>
          <input
            type="text"
            id="userIdForPreferences"
            value={userIdForPreferences}
            onChange={(e) => onUserIdForPreferencesChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Window Seat</label>
          <input
            type="checkbox"
            name="windowSeat"
            checked={preferences.windowSeat}
            onChange={(e) =>
              onPreferencesChange({
                ...preferences,
                windowSeat: e.target.checked,
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Aisle Seat</label>
          <input
            type="checkbox"
            name="aisleSeat"
            checked={preferences.aisleSeat}
            onChange={(e) =>
              onPreferencesChange({
                ...preferences,
                aisleSeat: e.target.checked,
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Extra Legroom</label>
          <input
            type="checkbox"
            name="extraLegroom"
            checked={preferences.extraLegroom}
            onChange={(e) =>
              onPreferencesChange({
                ...preferences,
                extraLegroom: e.target.checked,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="seatNumber">Seat Number:</label>
          <input
            type="number"
            id="seatNumber"
            onChange={(e) =>
              onFeedbackChange({
                ...feedback,
                seatId: parseInt(e.target.value),
              })
            }
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
        <button type="submit">Update preferences</button>
      </form>
    </>
  );
};

export default UserPreferencesForm;

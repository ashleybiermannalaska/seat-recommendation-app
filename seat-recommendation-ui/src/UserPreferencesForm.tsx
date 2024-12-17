import React from "react";
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
      <h1>User Preferences Form</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userIdForPreferences}
            onChange={(e) => onUserIdForPreferencesChange(e.target.value)}
          />
        </div>
        <div>
          <label>
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
            Window Seat
          </label>
        </div>
        <div>
          <label>
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
            Aisle Seat
          </label>
        </div>
        <div>
          <label>
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
            Extra Legroom
          </label>
        </div>
        <div>
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

          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            onChange={(e) =>
              onFeedbackChange({
                ...feedback,
                rating: parseInt(e.target.value),
              })
            }
          />

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
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UserPreferencesForm;

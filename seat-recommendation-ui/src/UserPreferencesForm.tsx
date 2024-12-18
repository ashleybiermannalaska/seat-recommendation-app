import React from "react";
import "./UserPreferencesForm.css";
import { UserPreferencesFormProps } from "../../types";

const UserPreferencesForm: React.FC<UserPreferencesFormProps> = ({
  userId,
  preferences,
  onUserIdChange,
  onPreferencesChange,
  onSubmit,
}) => {
  return (
    <>
      <h1>Update Your Preferences</h1>
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
        <button type="submit">Update preferences</button>
      </form>
    </>
  );
};

export default UserPreferencesForm;

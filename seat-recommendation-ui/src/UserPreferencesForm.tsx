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
      {/* @ts-ignore */}
      <auro-header display="500">Update Your Preferences</auro-header>
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
        {/* @ts-ignore */}
        <auro-button secondary onclick={onSubmit}>Update preferences</auro-button>
      </form>
    </>
  );
};

export default UserPreferencesForm;

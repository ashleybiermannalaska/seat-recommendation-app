import React from "react";

interface UserPreferencesFormProps {
  userIdForPreferences: string | "";
  preferences: UserPreferences;
  onUserIdForPreferencesChange: (userId: string) => void;
  onPreferencesChange: (preferences: UserPreferences) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export interface UserPreferences {
  windowSeat: boolean;
  aisleSeat: boolean;
  extraLegroom: boolean;
}

const UserPreferencesForm: React.FC<UserPreferencesFormProps> = ({
  userIdForPreferences,
  preferences,
  onUserIdForPreferencesChange,
  onPreferencesChange,
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
              onChange={(e) => onPreferencesChange({ ...preferences, windowSeat: e.target.checked })}
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
              onChange={(e) => onPreferencesChange({ ...preferences, aisleSeat: e.target.checked })}
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
              onChange={(e) => onPreferencesChange({ ...preferences, extraLegroom: e.target.checked })}
            />
            Extra Legroom
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UserPreferencesForm;

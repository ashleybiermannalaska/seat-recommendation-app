import React from "react";
import { UserIntakeFormProps } from "../../types";

const UserIntakeForm: React.FC<UserIntakeFormProps> = ({
  seatNumber,
  userId,
  onSeatChange,
  onUserIdChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <h1>Get Recommendations and Preferences:</h1>

        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId || ""}
          onChange={(event) => onUserIdChange(event.target.value)}
        />

        <label htmlFor="seatNumber">Seat Number:</label>
        <input
          type="text"
          id="seatNumber"
          value={seatNumber || ""}
          onChange={(event) => onSeatChange(event.target.value)}
        />
      </div>
      <button type="submit">Get feedback and recommendations</button>
    </form>
  );
};

export default UserIntakeForm;

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
        {/* @ts-ignore */}
        <auro-header display="500">Get Recommendations and Preferences:</auro-header>

        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId || ""}
          onChange={(event: any) => onUserIdChange(event.target.value)}
        />

        <label htmlFor="seatNumber">Seat Number:</label>
        <input
          type="text"
          id="seatNumber"
          value={seatNumber || ""}
          onChange={(event) => onSeatChange(event.target.value)}
        />
      </div>
      {/* @ts-ignore */}
      <auro-button onclick={onSubmit}>Get Recommendations</auro-button>
    </form>
  );
};

export default UserIntakeForm;

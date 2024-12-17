import React from "react";

interface UserIntakeFormProps {
  seatNumber: string | "";
  userId: string | "";
  onSeatChange: (seatNumber: string) => void;
  onUserIdChange: (userId: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

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
        <h1>Enter your UserId and SeatNumber:</h1>

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
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserIntakeForm;
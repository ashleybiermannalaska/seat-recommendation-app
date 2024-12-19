// Example interfaces for UserPreferences, Seat, and FeedbackData
export interface UserPreferences {
  windowSeat: boolean;
  aisleSeat: boolean;
  extraLegroom: boolean;
}

export interface Seat {
  id: string;
  isWindow: boolean;
  isAisle: boolean;
  hasExtraLegroom: boolean;
}

export interface FeedbackData {
  seatId: string;
  rating: number;
  comments: string;
}

export interface UserIntakeFormProps {
  userId: string | "";
  seatNumber: string | "";
  onUserIdChange: (userId: string) => void;
  onSeatChange: (seatNumber: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export interface UserPreferencesFormProps {
  userId: string | "";
  preferences: UserPreferences;
  onUserIdChange: (userId: string) => void;
  onPreferencesChange: (preferences: UserPreferences) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export interface AddSeatFeedbackFormProps {
  userId: string;
  // seatNumber: string | "";
  feedback: FeedbackData;
  onUserIdChange: (userId: string) => void;
  // onSeatChange: (seatNumber: string) => void;
  onFeedbackChange: (feedback: FeedbackData) => void;
  onSubmit: (event: React.FormEvent) => void;
};

export interface UserPreferences {
  windowSeat: boolean;
  aisleSeat: boolean;
  extraLegroom: boolean;
}

export interface SeatForUI {
  id: number;
  isWindow: boolean;
  isAisle: boolean;
  hasExtraLegroom: boolean;
  previousFeedback?: FeedbackData;
  similarSeats?: number[];
  previousOpinionOnSeatInQuestion: FeedbackData | null;
}

export interface DatabaseSchema {
    users: { id: number, preferences: UserPreferences, feedback: FeedbackData[] }[];
    seats: Seat[];
}

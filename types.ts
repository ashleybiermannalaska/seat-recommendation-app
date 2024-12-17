// Example interfaces for UserPreferences, Seat, and FeedbackData
export interface UserPreferences {
  windowSeat: boolean;
  aisleSeat: boolean;
  extraLegroom: boolean;
}

export interface Seat {
  id: number;
  isWindow: boolean;
  isAisle: boolean;
  hasExtraLegroom: boolean;
}

export interface FeedbackData {
  seatId: number;
  rating: number;
  comments: string;
}

export interface UserPreferencesFormProps {
  userIdForPreferences: string | "";
  preferences: UserPreferences;
  feedback: FeedbackData;
  onUserIdForPreferencesChange: (userId: string) => void;
  onPreferencesChange: (preferences: UserPreferences) => void;
  onFeedbackChange: (feedback: FeedbackData) => void;
  onSubmit: (event: React.FormEvent) => void;
}

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

export interface UserIntakeFormProps {
  seatNumber: string | "";
  userId: string | "";
  onSeatChange: (seatNumber: string) => void;
  onUserIdChange: (userId: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}
